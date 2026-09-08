(function () {
  const theme = localStorage.getItem("pst_theme") || "light";
  document.documentElement.classList.toggle("dark", theme === "dark");
})();