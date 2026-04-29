const medsForm = document.querySelector("#meds-form");

if (medsForm) {
  const STORAGE_KEY = "elder_meds";
  const medsList = document.querySelector("#meds-list");
  const medsSummary = document.querySelector("#meds-summary");
  const clearButton = document.querySelector("#meds-clear");
  const nameInput = document.querySelector("#med-name");
  const timeInput = document.querySelector("#med-time");
  const notesInput = document.querySelector("#med-notes");

  let meds = loadItems();

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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meds));
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

  function createId() {
    if (window.crypto && "randomUUID" in window.crypto) {
      return window.crypto.randomUUID();
    }

    return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function formatTime(time) {
    if (!time) {
      return "未设置";
    }

    const [hour = "", minute = ""] = time.split(":");
    return `${hour}:${minute}`;
  }

  function getSortedItems() {
    return [...meds].sort((first, second) => {
      if (first.time === second.time) {
        return second.createdAt - first.createdAt;
      }

      return first.time.localeCompare(second.time);
    });
  }

  function render() {
    const sortedItems = getSortedItems();

    medsSummary.textContent = sortedItems.length
      ? `已保存 ${sortedItems.length} 条提醒，数据只保存在当前浏览器。`
      : "还没有添加提醒。";

    if (!sortedItems.length) {
      medsList.innerHTML = `
        <div class="empty-state">
          还没有提醒项。<br />
          可以先把每天固定服用的药整理进去。
        </div>
      `;
      return;
    }

    medsList.innerHTML = sortedItems
      .map(
        (item) => `
          <article class="list-card">
            <div class="list-card-head">
              <div>
                <p class="item-title">${escapeHtml(item.name)}</p>
                <p class="item-meta">服用时间：${escapeHtml(formatTime(item.time))}</p>
              </div>
            </div>
            ${
              item.notes
                ? `<p class="item-note">备注：${escapeHtml(item.notes)}</p>`
                : ""
            }
            <div class="inline-actions">
              <button class="text-button" type="button" data-delete-id="${item.id}">删除这条提醒</button>
            </div>
          </article>
        `
      )
      .join("");
  }

  medsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const time = timeInput.value;
    const notes = notesInput.value.trim();

    if (!name || !time) {
      return;
    }

    meds.unshift({
      id: createId(),
      name,
      time,
      notes,
      createdAt: Date.now(),
    });

    saveItems();
    medsForm.reset();
    render();
    nameInput.focus();
  });

  medsList.addEventListener("click", (event) => {
    const target = event.target.closest("[data-delete-id]");

    if (!target) {
      return;
    }

    const itemId = target.getAttribute("data-delete-id");
    meds = meds.filter((item) => item.id !== itemId);
    saveItems();
    render();
  });

  clearButton.addEventListener("click", () => {
    if (!meds.length) {
      return;
    }

    const shouldClear = window.confirm("确定清空全部提醒吗？");
    if (!shouldClear) {
      return;
    }

    meds = [];
    saveItems();
    render();
  });

  render();
}
