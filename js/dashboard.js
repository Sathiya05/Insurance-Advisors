/* dashboard.js — dashboard chrome: sidebar, section switching, theme/dir toggles */
window.__DASH_CHROME__ = 1;
(function () {
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  function themeIcon(dark) {
    if (dark) {
      return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  }

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("site-theme"); } catch (e) {}
    if (saved === "dark") document.documentElement.classList.add("dark");
    var btns = $$("[data-theme-toggle]");
    function paint() {
      var dark = document.documentElement.classList.contains("dark");
      btns.forEach(function (b) { b.innerHTML = themeIcon(dark); });
    }
    paint();
    btns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var isDark = document.documentElement.classList.toggle("dark");
        try { localStorage.setItem("site-theme", isDark ? "dark" : "light"); } catch (e) {}
        paint();
      });
    });
  }

  function initDir() {
    var saved = null;
    try { saved = localStorage.getItem("site-direction"); } catch (e) {}
    document.documentElement.dir = saved === "rtl" ? "rtl" : "ltr";
    $$("[data-rtl-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var toRtl = document.documentElement.dir !== "rtl";
        document.documentElement.dir = toRtl ? "rtl" : "ltr";
        try { localStorage.setItem("site-direction", toRtl ? "rtl" : "ltr"); } catch (e) {}
      });
    });
  }

  function closeSidebar() {
    var side = $("#dash-sidebar"), backdrop = $("#dash-backdrop");
    if (side) side.classList.add("-translate-x-full");
    if (backdrop) backdrop.classList.add("hidden");
  }
  function openSidebar() {
    var side = $("#dash-sidebar"), backdrop = $("#dash-backdrop");
    if (side) side.classList.remove("-translate-x-full");
    if (backdrop) backdrop.classList.remove("hidden");
  }

  function initSidebar() {
    var btn = $("#dash-menu-btn"), backdrop = $("#dash-backdrop");
    if (!btn || !$("#dash-sidebar")) return;
    btn.addEventListener("click", function () {
      if ($("#dash-sidebar").classList.contains("-translate-x-full")) openSidebar();
      else closeSidebar();
    });
    $$("#dash-sidebar [data-close-sidebar]").forEach(function (b) { b.addEventListener("click", closeSidebar); });
    if (backdrop) backdrop.addEventListener("click", closeSidebar);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeSidebar(); });
    function sync() {
      if (window.innerWidth >= 1100) {
        $("#dash-sidebar").classList.remove("-translate-x-full");
        if (backdrop) backdrop.classList.add("hidden");
      } else closeSidebar();
    }
    window.addEventListener("resize", sync);
    sync();
  }

  function initSections() {
    var links = $$("[data-section]");
    var sections = $$(".dash-section");
    if (!links.length || !sections.length) return;
    function show(id) {
      var found = sections.some(function (s) { return s.id === id; });
      if (!found) id = sections[0].id;
      sections.forEach(function (s) { s.classList.toggle("hidden", s.id !== id); });
      links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("data-section") === id); });
      try { history.replaceState(null, "", "#" + id); } catch (e) {}
    }
    links.forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        show(a.getAttribute("data-section"));
        if (window.innerWidth < 1100) closeSidebar();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
    show((location.hash || "#overview").slice(1));
  }

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }
  ready(function () { initTheme(); initDir(); initSidebar(); initSections(); });
})();
