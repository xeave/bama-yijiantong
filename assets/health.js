const healthForm = document.querySelector("#health-form");

if (healthForm) {
  const STORAGE_KEY = "elder_health_records";
  const healthList = document.querySelector("#health-list");
  const healthSummary = document.querySelector("#health-summary");
  const healthCount = document.querySelector("#health-count");
  const latestBp = document.querySelector("#latest-bp");
  const latestGlucose = document.querySelector("#latest-glucose");
  const clearButton = document.querySelector("#health-clear");
  const dateInput = document.querySelector("#record-date");
  const systolicInput = document.querySelector("#systolic");
  const diastolicInput = document.querySelector("#diastolic");
  const glucoseInput = document.querySelector("#glucose");
  const notesInput = document.querySelector("#health-notes");

  let records = loadItems();

  if (!dateInput.value) {
    dateInput.value = new Date().toISOString().slice(0, 10);
  }

  function loadItems() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function saveItems() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }

  function createId() {
    if (window.crypto && "randomUUID" in window.crypto) {
      return window.crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (char) => {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };

      return map[char];
    });
  }

  function formatDate(date) {
    if (!date) {
      return "";
    }

    const [year, month, day] = date.split("-");
    return `${year}年${month}月${day}日`;
  }

  function getSortedItems() {
    return [...records].sort((first, second) => {
      if (first.date === second.date) {
        return second.createdAt - first.createdAt;
      }

      return second.date.localeCompare(first.date);
    });
  }

  function updateStats(sortedItems) {
    healthCount.textContent = `${sortedItems.length}`;

    if (!sortedItems.length) {
      latestBp.textContent = "暂无";
      latestGlucose.textContent = "暂无";
      return;
    }

    const latest = sortedItems[0];
    latestBp.textContent = `${latest.systolic}/${latest.diastolic} mmHg`;
    latestGlucose.textContent = `${latest.glucose} mmol/L`;
  }

  function render() {
    const sortedItems = getSortedItems();
    updateStats(sortedItems);

    healthSummary.textContent = sortedItems.length
      ? `已保存 ${sortedItems.length} 条记录，最近一条会显示在上方。`
      : "还没有保存任何健康记录。";

    if (!sortedItems.length) {
      healthList.innerHTML = `
        <div class="empty-state">
          还没有记录。<br />
          可以从今天的测量数据开始添加。
        </div>
      `;
      return;
    }

    healthList.innerHTML = sortedItems
      .map(
        (item) => `
          <article class="list-card">
            <div class="list-card-head">
              <div>
                <p class="item-title">${escapeHtml(formatDate(item.date))}</p>
                <p class="item-meta">血压：${escapeHtml(item.systolic)}/${escapeHtml(item.diastolic)} mmHg　血糖：${escapeHtml(item.glucose)} mmol/L</p>
              </div>
            </div>
            ${
              item.notes
                ? `<p class="item-note">备注：${escapeHtml(item.notes)}</p>`
                : ""
            }
            <div class="inline-actions">
              <button class="text-button" type="button" data-delete-id="${item.id}">删除这条记录</button>
            </div>
          </article>
        `
      )
      .join("");
  }

  healthForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const date = dateInput.value;
    const systolic = systolicInput.value.trim();
    const diastolic = diastolicInput.value.trim();
    const glucose = glucoseInput.value.trim();
    const notes = notesInput.value.trim();

    if (!date || !systolic || !diastolic || !glucose) {
      return;
    }

    if (Number(systolic) <= Number(diastolic)) {
      window.alert("收缩压通常应大于舒张压，请检查输入。");
      return;
    }

    records.unshift({
      id: createId(),
      date,
      systolic,
      diastolic,
      glucose,
      notes,
      createdAt: Date.now(),
    });

    saveItems();
    healthForm.reset();
    dateInput.value = new Date().toISOString().slice(0, 10);
    render();
    systolicInput.focus();
  });

  healthList.addEventListener("click", (event) => {
    const target = event.target.closest("[data-delete-id]");

    if (!target) {
      return;
    }

    const itemId = target.getAttribute("data-delete-id");
    records = records.filter((item) => item.id !== itemId);
    saveItems();
    render();
  });

  clearButton.addEventListener("click", () => {
    if (!records.length) {
      return;
    }

    const shouldClear = window.confirm("确定清空全部健康记录吗？");
    if (!shouldClear) {
      return;
    }

    records = [];
    saveItems();
    render();
  });

  render();
}
