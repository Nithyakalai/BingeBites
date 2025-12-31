const tabs = document.querySelectorAll(".tab");
const menus = document.querySelectorAll(".menu-grid");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    menus.forEach(menu => {
      menu.classList.remove("active");
      if (menu.id === tab.dataset.tab) {
        menu.classList.add("active");
      }
    });
  });
});
