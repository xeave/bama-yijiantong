const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));

revealItems.forEach((item, index) => {
  item.style.setProperty("--delay", `${Math.min(index * 60, 360)}ms`);
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("is-visible");
  });
}

const copyButtons = Array.from(document.querySelectorAll("[data-copy]"));

async function copyText(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}

copyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.getAttribute("data-copy") || "";
    const targetSelector = button.getAttribute("data-copy-target");
    const statusNode = targetSelector ? document.querySelector(targetSelector) : null;

    if (!value) {
      return;
    }

    try {
      const copied = await copyText(value);
      if (!copied) {
        throw new Error("Copy failed");
      }

      if (statusNode) {
        statusNode.textContent = "已复制到剪贴板";
      }
    } catch (error) {
      if (statusNode) {
        statusNode.textContent = "复制失败，请手动复制";
      }
    }

    if (statusNode) {
      window.setTimeout(() => {
        statusNode.textContent = "";
      }, 2200);
    }
  });
});
