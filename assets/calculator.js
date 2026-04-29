const calcDisplay = document.querySelector("#calc-display");

if (calcDisplay) {
  const calcGrid = document.querySelector("#calc-grid");
  const calcHistory = document.querySelector("#calc-history");
  const operators = new Set(["+", "-", "*", "/"]);

  let expression = "";
  let lastExpression = "";

  function prettify(value) {
    return value.replace(/\*/g, "×").replace(/\//g, "÷");
  }

  function currentSegment() {
    const segments = expression.split(/[+\-*/]/);
    return segments[segments.length - 1] || "";
  }

  function render(message) {
    calcDisplay.textContent = expression ? prettify(expression) : "0";

    if (message) {
      calcHistory.textContent = message;
      return;
    }

    if (expression) {
      calcHistory.textContent = `当前算式：${prettify(expression)}`;
      return;
    }

    calcHistory.textContent = lastExpression
      ? `上次算式：${prettify(lastExpression)}`
      : "支持键盘输入";
  }

  function appendNumber(input) {
    if (input === ".") {
      const segment = currentSegment();
      if (segment.includes(".")) {
        return;
      }

      if (!segment) {
        expression += "0.";
      } else {
        expression += ".";
      }

      render();
      return;
    }

    if (expression === "0" && input !== "0") {
      expression = input;
      render();
      return;
    }

    expression += input;
    render();
  }

  function appendOperator(operator) {
    if (!expression) {
      if (operator === "-") {
        expression = "-";
        render();
      }
      return;
    }

    if (operators.has(expression.at(-1))) {
      expression = `${expression.slice(0, -1)}${operator}`;
    } else {
      expression += operator;
    }

    render();
  }

  function backspace() {
    expression = expression.slice(0, -1);
    render();
  }

  function clearAll() {
    expression = "";
    render("已清空");
  }

  function calculate() {
    if (!expression) {
      return;
    }

    let sanitized = expression;
    if (operators.has(sanitized.at(-1)) || sanitized.endsWith(".")) {
      sanitized = sanitized.slice(0, -1);
    }

    if (!sanitized || sanitized === "-") {
      render("请继续输入数字");
      return;
    }

    if (!/^[\d+\-*/. ]+$/.test(sanitized)) {
      render("输入内容无效");
      return;
    }

    try {
      const result = Function(`"use strict"; return (${sanitized});`)();
      if (!Number.isFinite(result)) {
        throw new Error("Invalid result");
      }

      lastExpression = sanitized;
      expression = Number(result.toFixed(10)).toString();
      render(`结果已更新：${prettify(lastExpression)}`);
    } catch (error) {
      render("表达式有误，请修改后再试");
    }
  }

  calcGrid.addEventListener("click", (event) => {
    const button = event.target.closest("button");

    if (!button) {
      return;
    }

    const input = button.getAttribute("data-input");
    const operator = button.getAttribute("data-operator");
    const action = button.getAttribute("data-action");

    if (input) {
      appendNumber(input);
      return;
    }

    if (operator) {
      appendOperator(operator);
      return;
    }

    if (action === "backspace") {
      backspace();
      return;
    }

    if (action === "clear") {
      clearAll();
      return;
    }

    if (action === "equals") {
      calculate();
    }
  });

  document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (/^\d$/.test(key)) {
      appendNumber(key);
      return;
    }

    if (key === ".") {
      appendNumber(".");
      return;
    }

    if (operators.has(key)) {
      appendOperator(key);
      return;
    }

    if (key === "Backspace") {
      event.preventDefault();
      backspace();
      return;
    }

    if (key === "Escape") {
      clearAll();
      return;
    }

    if (key === "Enter" || key === "=") {
      event.preventDefault();
      calculate();
    }
  });

  render();
}
