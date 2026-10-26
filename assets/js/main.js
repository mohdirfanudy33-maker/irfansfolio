const menuToggle = document.querySelector(".nav__toggle");
const navMenu = document.querySelector(".nav__menu");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navMenu.classList.toggle("is-open", !isOpen);
});

navMenu.addEventListener("click", (event) => {
  if (event.target.closest(".nav__link")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navMenu.classList.remove("is-open");
  }
});

const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTab = button.dataset.tab;

    tabButtons.forEach((tab) => {
      const isSelected = tab === button;
      tab.classList.toggle("is-active", isSelected);
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
    });

    tabPanels.forEach((panel) => {
      panel.hidden = panel.dataset.panel !== selectedTab;
    });
  });
});

document.querySelector("[data-copy-email]").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  const status = document.querySelector(".copy-status");

  try {
    await navigator.clipboard.writeText(button.dataset.copyEmail);
    status.textContent = "Email copied to clipboard.";
  } catch {
    status.textContent = "Copy isn’t available here. Use the email link above instead.";
  }
});

document.querySelector("[data-current-year]").textContent = new Date().getFullYear();

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", isCurrent);
        if (isCurrent) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}
