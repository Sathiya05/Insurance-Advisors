/* navbar.js — ONLY navbar markup + injection + navbar behavior */
(function () {
  function currentPage() {
    var p = (location.pathname.split("/").pop() || "index.html").split("?")[0].split("#")[0];
    return p || "index.html";
  }
  var page = currentPage();
  function activeFor(list) { return list.indexOf(page) !== -1 ? " active-nav" : ""; }
  function themeIcon(theme) {
    if (theme === "dark") {
      return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';
  }

  var html = ''
  + '<header class="sticky top-0 z-50 bg-white/90 dark:bg-[#15272D]/90 backdrop-blur border-b border-[#e3ecec] dark:border-[#2e4f58]">'
  + '<nav aria-label="Primary" class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">'
  + '<a href="index.html" class="flex items-center gap-2.5 shrink-0" aria-label="ClearPath Insurance Advisors home">'
  + '<span class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#174A5B] text-white" aria-hidden="true">'
  + '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></span>'
  + '<span class="leading-tight"><span class="block font-heading text-[1.05rem] font-800 font-extrabold tracking-wide text-[#174A5B] dark:text-white">CLEARPATH</span>'
  + '<span class="block text-[.7rem] font-medium tracking-[.18em] uppercase text-[#5FA8A0]">Insurance Advisors</span></span></a>'

  + '<ul class="hidden lg:flex items-center gap-1 text-[.95rem] font-medium text-[#24343A] dark:text-[#F4F8F8]">'
  + '<li class="nav-dropdown" data-dropdown><button type="button" aria-haspopup="true" aria-expanded="false" data-dropdown-btn class="nav-link flex items-center gap-1 rounded-lg px-3 py-2 hover:bg-[#F4F8F8] dark:hover:bg-[#203940] hover:text-[#174A5B] dark:hover:text-white' + activeFor(["index.html","home2.html",""]) + '">Home'
  + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>'
  + '<div class="dropdown-panel" role="menu"><a role="menuitem" href="index.html">Home</a><a role="menuitem" href="home2.html">Home 2</a></div></li>'
  + '<li><a href="about.html" class="block rounded-lg px-3 py-2 hover:bg-[#F4F8F8] dark:hover:bg-[#203940] hover:text-[#174A5B]' + activeFor(["about.html"]) + '">About</a></li>'
  + '<li><a href="plans.html" class="block rounded-lg px-3 py-2 hover:bg-[#F4F8F8] dark:hover:bg-[#203940] hover:text-[#174A5B]' + activeFor(["plans.html"]) + '">Plans</a></li>'
  + '<li><a href="claims.html" class="block rounded-lg px-3 py-2 hover:bg-[#F4F8F8] dark:hover:bg-[#203940] hover:text-[#174A5B]' + activeFor(["claims.html"]) + '">Claims Assistance</a></li>'
  + '<li><a href="contact.html" class="block rounded-lg px-3 py-2 hover:bg-[#F4F8F8] dark:hover:bg-[#203940] hover:text-[#174A5B]' + activeFor(["contact.html"]) + '">Contact</a></li>'
  + '<li class="nav-dropdown" data-dropdown><button type="button" aria-haspopup="true" aria-expanded="false" data-dropdown-btn class="flex items-center gap-1 rounded-lg px-3 py-2 hover:bg-[#F4F8F8] dark:hover:bg-[#203940] hover:text-[#174A5B]' + activeFor(["dashboard.html","admin-dashboard.html"]) + '">Dashboard'
  + '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>'
  + '<div class="dropdown-panel" role="menu"><a role="menuitem" href="dashboard.html">User Dashboard</a><a role="menuitem" href="admin-dashboard.html">Admin Dashboard</a></div></li>'
  + '</ul>'

  + '<div class="flex items-center gap-1.5 sm:gap-2">'
  + '<div class="hidden lg:flex items-center gap-1">'
  + '<button data-nav-theme type="button" aria-label="Toggle color theme" title="Toggle color theme" class="rounded-lg p-2 text-[#174A5B] dark:text-[#F4F8F8] hover:bg-[#F4F8F8] dark:hover:bg-[#203940]"></button>'
  + '<button data-nav-rtl type="button" aria-label="Toggle text direction" title="Toggle text direction (LTR/RTL)" class="rounded-lg p-2 text-[#174A5B] dark:text-[#F4F8F8] hover:bg-[#F4F8F8] dark:hover:bg-[#203940]">'
  + '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg></button>'
  + '</div>'
  + '<a href="login.html" class="hidden lg:inline-flex items-center gap-1.5 rounded-xl border-2 border-[#174A5B] dark:border-[#5FA8A0] px-4 py-2 text-sm font-semibold text-[#174A5B] dark:text-white hover:bg-[#174A5B] hover:text-white transition">Login</a>'
  + '<a href="plans.html#compare-tool" class="hidden lg:inline-flex items-center gap-1.5 rounded-xl bg-[#174A5B] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0f3540] transition">Compare Plans</a>'
  + '<button id="nav-hamburger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" class="lg:hidden rounded-lg p-2 text-[#174A5B] dark:text-white hover:bg-[#F4F8F8] dark:hover:bg-[#203940]">'
  + '<svg id="hamburger-icon-open" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>'
  + '<svg id="hamburger-icon-close" class="hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>'
  + '</button></div></nav>'

  + '<div id="mobile-menu" class="hidden-menu lg:hidden border-t border-[#e3ecec] dark:border-[#2e4f58] bg-white dark:bg-[#15272D]">'
  + '<div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 space-y-1 text-[#24343A] dark:text-[#F4F8F8]">'
  + '<button type="button" data-m-dropdown-btn aria-expanded="false" class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-semibold hover:bg-[#F4F8F8] dark:hover:bg-[#203940]">Home'
  + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>'
  + '<div data-m-dropdown class="hidden ps-3 space-y-1"><a href="index.html" class="block rounded-lg px-3 py-2 hover:bg-[#F4F8F8] dark:hover:bg-[#203940]">Home</a><a href="home2.html" class="block rounded-lg px-3 py-2 hover:bg-[#F4F8F8] dark:hover:bg-[#203940]">Home 2</a></div>'
  + '<a href="about.html" class="block rounded-lg px-3 py-2.5 font-semibold hover:bg-[#F4F8F8] dark:hover:bg-[#203940]">About</a>'
  + '<a href="plans.html" class="block rounded-lg px-3 py-2.5 font-semibold hover:bg-[#F4F8F8] dark:hover:bg-[#203940]">Plans</a>'
  + '<a href="claims.html" class="block rounded-lg px-3 py-2.5 font-semibold hover:bg-[#F4F8F8] dark:hover:bg-[#203940]">Claims Assistance</a>'
  + '<a href="contact.html" class="block rounded-lg px-3 py-2.5 font-semibold hover:bg-[#F4F8F8] dark:hover:bg-[#203940]">Contact</a>'
  + '<button type="button" data-m-dropdown-btn aria-expanded="false" class="flex w-full items-center justify-between rounded-lg px-3 py-2.5 font-semibold hover:bg-[#F4F8F8] dark:hover:bg-[#203940]">Dashboard'
  + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>'
  + '<div data-m-dropdown class="hidden ps-3 space-y-1"><a href="dashboard.html" class="block rounded-lg px-3 py-2 hover:bg-[#F4F8F8] dark:hover:bg-[#203940]">User Dashboard</a><a href="admin-dashboard.html" class="block rounded-lg px-3 py-2 hover:bg-[#F4F8F8] dark:hover:bg-[#203940]">Admin Dashboard</a></div>'
  + '<a href="login.html" class="mt-2 flex items-center justify-center rounded-xl border-2 border-[#174A5B] dark:border-[#5FA8A0] px-4 py-3 font-semibold text-[#174A5B] dark:text-white">Login</a>'
  + '<a href="plans.html#compare-tool" class="mt-2 flex items-center justify-center rounded-xl bg-[#174A5B] px-4 py-3 font-semibold text-white">Compare Plans</a>'
  + '<div class="flex items-center gap-2 px-3 pt-3">'
  + '<span class="text-sm font-semibold text-[#5b6f76] dark:text-[#B7C7C8]">Settings</span>'
  + '<button data-nav-theme type="button" aria-label="Toggle color theme" title="Toggle color theme" class="rounded-lg border border-[#e3ecec] dark:border-[#2e4f58] p-2 text-[#174A5B] dark:text-[#F4F8F8] hover:bg-[#F4F8F8] dark:hover:bg-[#203940]"></button>'
  + '<button data-nav-rtl type="button" aria-label="Toggle text direction" title="Toggle text direction (LTR/RTL)" class="rounded-lg border border-[#e3ecec] dark:border-[#2e4f58] p-2 text-[#174A5B] dark:text-[#F4F8F8] hover:bg-[#F4F8F8] dark:hover:bg-[#203940]">'
  + '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg></button>'
  + '</div>'
  + '</div></div></header>'
  + '<style>.active-nav{color:#174A5B!important;font-weight:700}.dark .active-nav{color:#5FA8A0!important}.nav-link{}</style>';

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem("site-theme"); } catch (e) {}
    if (saved === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    var themeBtns = document.querySelectorAll("[data-nav-theme]");
    themeBtns.forEach(function (b) { b.innerHTML = themeIcon(saved === "dark" ? "dark" : "light"); });
  }
  function initDir() {
    var saved = null;
    try { saved = localStorage.getItem("site-direction"); } catch (e) {}
    document.documentElement.dir = saved === "rtl" ? "rtl" : "ltr";
  }

  function mount() {
    var slot = document.getElementById("navbar");
    if (!slot) return;
    slot.innerHTML = html;
    initTheme(); initDir();

    function paintTheme() {
      var isDark = document.documentElement.classList.contains("dark");
      document.querySelectorAll("[data-nav-theme]").forEach(function (b) { b.innerHTML = themeIcon(isDark ? "dark" : "light"); });
    }
    document.querySelectorAll("[data-nav-theme]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var isDark = document.documentElement.classList.toggle("dark");
        try { localStorage.setItem("site-theme", isDark ? "dark" : "light"); } catch (e) {}
        paintTheme();
      });
    });
    document.querySelectorAll("[data-nav-rtl]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var toRtl = document.documentElement.dir !== "rtl";
        document.documentElement.dir = toRtl ? "rtl" : "ltr";
        try { localStorage.setItem("site-direction", toRtl ? "rtl" : "ltr"); } catch (e) {}
      });
    });

    // desktop dropdowns
    document.querySelectorAll("[data-dropdown]").forEach(function (dd) {
      var btn = dd.querySelector("[data-dropdown-btn]");
      if (!btn) return;
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var wasOpen = dd.classList.contains("open");
        document.querySelectorAll("[data-dropdown].open").forEach(function (o) {
          o.classList.remove("open");
          var b = o.querySelector("[data-dropdown-btn]");
          if (b) b.setAttribute("aria-expanded", "false");
        });
        if (!wasOpen) { dd.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
      });
      dd.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { dd.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); });
      });
    });
    document.addEventListener("click", function (e) {
      document.querySelectorAll("[data-dropdown].open").forEach(function (o) {
        if (!o.contains(e.target)) { o.classList.remove("open"); var b = o.querySelector("[data-dropdown-btn]"); if (b) b.setAttribute("aria-expanded", "false"); }
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.querySelectorAll("[data-dropdown].open").forEach(function (o) { o.classList.remove("open"); });
        closeMobile();
      }
    });

    // mobile
    var ham = document.getElementById("nav-hamburger");
    var menu = document.getElementById("mobile-menu");
    var io = document.getElementById("hamburger-icon-open");
    var ic = document.getElementById("hamburger-icon-close");
    function closeMobile() {
      if (!menu) return;
      menu.classList.add("hidden-menu");
      if (ham) ham.setAttribute("aria-expanded", "false");
      if (io) io.classList.remove("hidden"); if (ic) ic.classList.add("hidden");
    }
    function toggleMobile() {
      if (!menu) return;
      var closed = menu.classList.toggle("hidden-menu");
      if (ham) ham.setAttribute("aria-expanded", String(!closed));
      if (io) io.classList.toggle("hidden", !closed);
      if (ic) ic.classList.toggle("hidden", closed);
    }
    if (ham) ham.addEventListener("click", function (e) { e.stopPropagation(); toggleMobile(); });
    document.querySelectorAll("[data-m-dropdown-btn]").forEach(function (b) {
      b.addEventListener("click", function () {
        var panel = b.nextElementSibling;
        if (!panel) return;
        var hidden = panel.classList.toggle("hidden");
        b.setAttribute("aria-expanded", String(!hidden));
      });
    });
    if (menu) menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMobile); });
    document.addEventListener("click", function (e) {
      if (menu && !menu.classList.contains("hidden-menu") && !menu.contains(e.target) && ham && !ham.contains(e.target)) closeMobile();
    });
    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 1100px)").matches) closeMobile();
    });
    window.__closeMobileNav = closeMobile;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
