(function () {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  if (currentPage === "login.html") {
    return;
  }

  const isAuthenticated = localStorage.getItem("pst_logged_in") === "true";

  if (!isAuthenticated) {
    const redirectTarget = "login.html";
    const currentUrl = window.location.href;
    window.location.replace(`${redirectTarget}?next=${encodeURIComponent(currentUrl)}`);
  }
})();
