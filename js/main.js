/* main.js — ALL general website logic (navbar/footer stay in their own files) */
(function () {
  "use strict";
  function $(s, c) { return (c || document).querySelector(s); }
  function $all(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ---------- Toast ---------- */
  function ensureToastWrap() {
    var w = $("#toast-wrap");
    if (!w) { w = document.createElement("div"); w.id = "toast-wrap"; w.setAttribute("aria-live", "polite"); document.body.appendChild(w); }
    return w;
  }
  window.showToast = function (msg, type) {
    var w = ensureToastWrap();
    var t = document.createElement("div");
    t.className = "toast " + (type || "success");
    t.setAttribute("role", "status");
    t.innerHTML = '<span style="flex:1">' + msg + '</span><button type="button" aria-label="Dismiss notification">&times;</button>';
    var btn = t.querySelector("button");
    function dismiss() { t.classList.add("hide"); setTimeout(function () { t.remove(); }, 320); }
    btn.addEventListener("click", dismiss);
    w.appendChild(t);
    setTimeout(dismiss, 3800);
  };

  /* ---------- Back to top + reveal ---------- */
  function initBackTop() {
    var b = document.createElement("button");
    b.id = "back-top"; b.type = "button"; b.setAttribute("aria-label", "Back to top");
    b.className = "rounded-full bg-[#174A5B] p-3 text-white shadow-lg hover:bg-[#0f3540]";
    b.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m18 15-6-6-6 6"/></svg>';
    document.body.appendChild(b);
    b.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    window.addEventListener("scroll", function () { b.classList.toggle("show", window.scrollY > 500); }, { passive: true });
  }
  function initReveal() {
    var els = $all(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) { els.forEach(function (e) { e.classList.add("visible"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- FAQ ---------- */
  function initFaq() {
    $all("[data-faq-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".faq-item");
        if (!item) return;
        var open = item.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(open));
      });
    });
  }

  /* ---------- Demo data ---------- */
  var PLANS = [
    { id: "p1", insurer: "EverCare Insurance", plan: "EverCare Essential Health", type: "Health", audience: "Individual", coverage: "$250,000 annual cover", premium: "$185/mo sample", term: "1 yr renewable", benefits: "Preventive care, hospitalization, telehealth", waiting: "30 days general", exclusions: "Pre-existing (limited period), cosmetic", support: "24/7 claim helpline", renewal: "Yearly, guaranteed review" },
    { id: "p2", insurer: "Northstar Life", plan: "Northstar Term Protect 20", type: "Life", audience: "Family", coverage: "$500,000 term cover", premium: "$42/mo sample", term: "20 years", benefits: "Level term, convertible, family rider option", waiting: "None (after underwriting)", exclusions: "As per policy terms, suicide clause yr 1", support: "Dedicated claim manager", renewal: "Convertible at term end" },
    { id: "p3", insurer: "Harbor Health", plan: "Harbor Family Plus", type: "Health", audience: "Family", coverage: "$750,000 family floater", premium: "$310/mo sample", term: "1 yr renewable", benefits: "Family floater, maternity option, wellness", waiting: "90 days select treatments", exclusions: "Waiting-period conditions and terms & policy apply", support: "In-app tracking + advisor help", renewal: "Yearly with wellness review" },
    { id: "p4", insurer: "Summit Assurance", plan: "Summit Whole Life Secure", type: "Life", audience: "Individual", coverage: "$300,000 whole life", premium: "$210/mo sample", term: "Lifetime", benefits: "Lifetime cover, cash value component", waiting: "Underwriting period", exclusions: "Non-disclosure, policy terms apply", support: "Advisor-led claim support", renewal: "Lifetime (premiums per schedule)" },
    { id: "p5", insurer: "Harbor Health", plan: "Harbor Senior Care 65+", type: "Health", audience: "Senior", coverage: "$200,000 senior cover", premium: "$265/mo sample", term: "1 yr renewable", benefits: "Senior-focused OP/IP, home care option", waiting: "90 days general", exclusions: "Age/eligibility criteria apply", support: "Phone + in-person help", renewal: "Yearly eligibility review" },
    { id: "p6", insurer: "Northstar Life", plan: "Northstar Critical Shield", type: "Health", audience: "Individual", coverage: "$150,000 lump-sum benefit", premium: "$58/mo sample", term: "10 yrs renewable", benefits: "36 critical illnesses listed in terms", waiting: "90 days from issue", exclusions: "Illness definitions per policy", support: "Fast-track documentation help", renewal: "Renewable to age 70" }
  ];
  window.CLEARPATH_PLANS = PLANS;

  /* ---------- Plan filters (plans.html) ---------- */
  function initPlanFilters() {
    var grid = $("#plan-grid");
    if (!grid) return;
    var pills = $all("[data-filter]");
    function render(f) {
      grid.innerHTML = "";
      PLANS.filter(function (p) { return f === "All" || p.type === f || p.audience === f; }).forEach(function (p) {
        var card = document.createElement("article");
        card.className = "lift rounded-2xl border border-[#e3ecec] bg-white p-6 dark:border-[#2e4f58] dark:bg-[#203940] reveal visible";
        card.innerHTML = '<span class="badge-gold">' + p.insurer + ' · Demo data</span>'
          + '<h3 class="mt-3 font-heading text-lg font-bold">' + p.plan + '</h3>'
          + '<p class="mt-1 text-sm text-[#5b6f76] dark:text-[#B7C7C8]">' + p.type + ' · ' + p.audience + ' · ' + p.coverage + '</p>'
          + '<ul class="mt-3 space-y-1.5 text-sm"><li><strong>Benefits:</strong> ' + p.benefits + '</li>'
          + '<li><strong>Considerations:</strong> ' + p.exclusions + '</li>'
          + '<li><strong>Sample premium:</strong> ' + p.premium + '</li></ul>'
          + '<div class="mt-4 flex flex-wrap gap-2"><button type="button" data-compare-add="' + p.id + '" class="rounded-xl bg-[#174A5B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0f3540]">Compare</button>'
          + '<a href="quote.html?plan=' + p.id + '" class="rounded-xl border border-[#174A5B] px-4 py-2 text-sm font-semibold text-[#174A5B] dark:text-white dark:border-[#5FA8A0]">Get Quote</a></div>';
        grid.appendChild(card);
      });
      $all("[data-compare-add]", grid).forEach(function (b) {
        b.addEventListener("click", function () { toggleCompare(b.getAttribute("data-compare-add")); });
      });
      if (!grid.children.length) grid.innerHTML = '<p class="text-sm">No plans match this filter in the demo set.</p>';
    }
    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        pills.forEach(function (x) {
          x.classList.remove("bg-[#174A5B]", "text-white");
          x.classList.add("bg-white", "dark:bg-[#203940]");
          x.setAttribute("aria-pressed", "false");
        });
        pill.classList.remove("bg-white", "dark:bg-[#203940]");
        pill.classList.add("bg-[#174A5B]", "text-white");
        pill.setAttribute("aria-pressed", "true");
        render(pill.getAttribute("data-filter"));
      });
    });
    $all("[data-filter-link]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var target = link.getAttribute("data-filter-link");
        pills.forEach(function (p) {
          if (p.getAttribute("data-filter") === target) p.click();
        });
        grid.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    render("All");
  }

  /* ---------- Compare tool ---------- */
  var compareSet = [];
  function toggleCompare(id) {
    var i = compareSet.indexOf(id);
    if (i !== -1) compareSet.splice(i, 1);
    else { if (compareSet.length >= 3) compareSet.shift(); compareSet.push(id); }
    renderCompare(); syncCompareBoxes();
    showToast("Comparison updated.");
  }
  function syncCompareBoxes() {
    $all("[data-compare-add]").forEach(function (b) {
      var on = compareSet.indexOf(b.getAttribute("data-compare-add")) !== -1;
      b.textContent = on ? "Added ✓" : "Compare";
    });
  }
  function renderCompare() {
    var wrap = $("#compare-result");
    if (!wrap) return;
    var rows = [["Coverage", "coverage"], ["Sample premium", "premium"], ["Term", "term"], ["Benefits", "benefits"], ["Waiting period", "waiting"], ["Exclusions", "exclusions"], ["Claim support", "support"], ["Renewal", "renewal"]];
    if (!compareSet.length) { wrap.innerHTML = '<p class="text-sm text-[#5b6f76] dark:text-[#B7C7C8]">Select up to 3 plans to compare. Differences are highlighted.</p>'; return; }
    var sel = compareSet.map(function (id) { return PLANS.find(function (p) { return p.id === id; }); }).filter(Boolean);
    var h = '<div class="table-scroll rounded-2xl border border-[#e3ecec] dark:border-[#2e4f58]"><table class="compare-table bg-white dark:bg-[#203940]"><thead><tr><th>Feature</th>';
    sel.forEach(function (p) { h += "<th>" + p.plan + "<br><span style='font-weight:400;opacity:.8'>" + p.insurer + "</span></th>"; });
    h += "</tr></thead><tbody>";
    rows.forEach(function (r) {
      var vals = sel.map(function (p) { return p[r[1]]; });
      var diff = new Set(vals).size > 1;
      h += "<tr><td data-label='Feature'><strong>" + r[0] + "</strong></td>";
      vals.forEach(function (v) { h += '<td data-label="' + r[0] + '" class="' + (diff ? "diff-cell" : "") + '">' + v + "</td>"; });
      h += "</tr>";
    });
    h += '</tbody></table></div><p class="mt-2 text-xs">Demo data — sample comparison for demonstration purposes.</p>';
    wrap.innerHTML = h;
  }
  function initCompareTool() {
    var selects = [$all('[data-plan-select]')[0], $all('[data-plan-select]')[1], $all('[data-plan-select]')[2]].filter(Boolean);
    if (!selects.length && !$("#compare-result")) return;
    selects.forEach(function (s) {
      PLANS.forEach(function (p) { var o = document.createElement("option"); o.value = p.id; o.textContent = p.plan + " — " + p.insurer; s.appendChild(o); });
      s.addEventListener("change", function () {
        compareSet = selects.map(function (x) { return x.value; }).filter(Boolean).slice(0, 3);
        compareSet = Array.from(new Set(compareSet));
        renderCompare();
      });
    });
    renderCompare();
  }

  /* ---------- Saved quotes compare (dashboard) ---------- */
  function initSavedQuotes() {
    var body = $("#saved-quotes-body");
    if (!body) return;
    var saved = PLANS.slice(0, 3);
    function draw() {
      body.innerHTML = "";
      saved.forEach(function (p, idx) {
        var tr = document.createElement("tr");
        tr.className = "border-b border-[#eef4f4] dark:border-[#2e4f58]";
        tr.innerHTML = "<td class='py-3 pe-3' data-label='Insurer'>" + p.insurer + "</td><td class='py-3 pe-3 font-semibold' data-label='Plan'>" + p.plan + "</td>"
          + "<td class='py-3 pe-3' data-label='Coverage'>" + p.coverage + "</td><td class='py-3 pe-3' data-label='Sample Premium'>" + p.premium + "</td>"
          + "<td class='py-3 pe-3' data-label='Status'><span class='badge-gold'>Comparison Ready</span></td>"
          + "<td class='py-3' data-label='Action'><div class='flex gap-2'><button class='rounded-lg bg-[#174A5B] px-3 py-1.5 text-xs font-semibold text-white' data-qview='" + idx + "'>View Details</button>"
          + "<button class='rounded-lg border px-3 py-1.5 text-xs' data-qdel='" + idx + "'>Remove</button></div></td>";
        body.appendChild(tr);
      });
      $all("[data-qdel]", body).forEach(function (b) { b.addEventListener("click", function () { saved.splice(Number(b.getAttribute("data-qdel")), 1); draw(); showToast("Quote removed."); }); });
      $all("[data-qview]", body).forEach(function (b) { b.addEventListener("click", function () { openQuoteModal(saved[Number(b.getAttribute("data-qview"))]); }); });
    }
    draw();
  }
  function openQuoteModal(p) {
    if (!p) return;
    var m = $("#quote-modal");
    if (!m) return;
    $("#quote-modal-body").innerHTML = "<h3 class='font-heading text-xl font-bold'>" + p.plan + "</h3>"
      + "<p class='text-sm opacity-70'>" + p.insurer + " · Demo data</p>"
      + "<dl class='mt-4 grid gap-2 text-sm'><dt><strong>Coverage:</strong> " + p.coverage + "</dt><dt><strong>Benefits:</strong> " + p.benefits + "</dt>"
      + "<dt><strong>Sample premium:</strong> " + p.premium + "</dt><dt><strong>Term:</strong> " + p.term + "</dt>"
      + "<dt><strong>Waiting period:</strong> " + p.waiting + "</dt><dt><strong>Exclusions:</strong> " + p.exclusions + "</dt>"
      + "<dt><strong>Claim support:</strong> " + p.support + "</dt></dl>";
    m.classList.add("open");
  }

  /* ---------- Claim checklist ---------- */
  function initChecklist() {
    var list = $("#doc-checklist");
    if (!list) return;
    var boxes = $all('input[type="checkbox"]', list);
    var label = $("#checklist-count"), bar = $("#checklist-bar");
    function upd() {
      var done = boxes.filter(function (b) { return b.checked; }).length;
      if (label) label.textContent = done + " / " + boxes.length + " completed";
      if (bar) bar.style.width = (boxes.length ? (done / boxes.length) * 100 : 0) + "%";
    }
    boxes.forEach(function (b) { b.addEventListener("change", function () { upd(); if (b.checked) showToast("Claim information saved."); }); });
    upd();
  }

  /* ---------- Demo status cyclers ---------- */
  function initStatusCyclers() {
    $all("[data-cycle-status]").forEach(function (el) {
      var states = (el.getAttribute("data-cycle-status") || "").split("|").filter(Boolean);
      if (!states.length) return;
      var i = states.indexOf(el.textContent.trim());
      if (i < 0) i = 0;
      el.style.cursor = "pointer";
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "button");
      el.setAttribute("aria-label", "Change demo status");
      function next() { i = (i + 1) % states.length; el.textContent = states[i]; showToast("Application status updated."); }
      el.addEventListener("click", next);
      el.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); next(); } });
    });
    $all("[data-admin-status]").forEach(function (sel) {
      sel.addEventListener("change", function () { showToast("Application status updated."); });
    });
  }

  /* ---------- Claim tracker demo ---------- */
  function initClaimTracker() {
    var btns = $all("[data-claim-step]");
    var bar = $("#claim-progress-fill");
    if (!btns.length) return;
    var steps = ["Submitted", "Under Review", "Documents Requested", "Approved / Rejected", "Completed"];
    var idx = 1;
    function draw() {
      btns.forEach(function (b, i) {
        var dot = b.querySelector(".timeline-dot");
        if (dot) dot.classList.toggle("done", i <= idx);
        b.setAttribute("aria-current", i === idx ? "step" : "false");
      });
      if (bar) bar.style.width = ((idx + 1) / btns.length) * 100 + "%";
      var lbl = $("#claim-step-label");
      if (lbl) lbl.textContent = "Current demo stage: " + steps[Math.min(idx, steps.length - 1)];
    }
    btns.forEach(function (b, i) { b.addEventListener("click", function () { idx = i; draw(); }); });
    draw();
  }

  /* ---------- Forms ---------- */
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function initForms() {
    $all("form[data-validate]").forEach(function (f) {
      f.addEventListener("submit", function (e) {
        e.preventDefault();
        var ok = true, first = null;
        $all("[required]", f).forEach(function (inp) {
          var bad = !inp.value.trim() || (inp.type === "email" && !validEmail(inp.value.trim())) || (inp.type === "tel" && inp.value.replace(/\D/g, "").length < 7);
          inp.setAttribute("aria-invalid", String(bad));
          inp.style.borderColor = bad ? "#d66" : "";
          if (bad) { ok = false; if (!first) first = inp; }
        });
        if (!ok) { showToast("Please review the highlighted fields.", "error"); if (first) first.focus(); return; }
        var kind = f.getAttribute("data-validate");
        var msgs = { quote: "Quote saved successfully.", consult: "Consultation request submitted.", contact: "Message sent. An advisor will reach out shortly.", claim: "Claim information saved.", auth: "Signed in (demo)." };
        showToast(msgs[kind] || "Submitted successfully.");
        f.reset();
      });
    });
  }

  /* ---------- Demo auth ---------- */
  function initAuth() {
    var form = $("#login-form");
    if (!form) return;
    var demoBtn = $("#demo-fill-client"), demoAdmin = $("#demo-fill-admin");
    function fill(e, p) { $("#login-email").value = e; $("#login-password").value = p; }
    if (demoBtn) demoBtn.addEventListener("click", function () { fill("client@clearpath-demo.com", "demo123"); showToast("Demo client credentials filled."); });
    if (demoAdmin) demoAdmin.addEventListener("click", function () { fill("admin@clearpath-demo.com", "admin123"); showToast("Demo admin credentials filled."); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = ($("#login-email").value || "").trim().toLowerCase();
      var pass = $("#login-password").value || "";
      if (email === "admin@clearpath-demo.com" && pass === "admin123") { showToast("Welcome back, Admin (demo)."); setTimeout(function () { location.href = "admin-dashboard.html"; }, 600); }
      else if (email === "client@clearpath-demo.com" && pass === "demo123") { showToast("Welcome back, Client (demo)."); setTimeout(function () { location.href = "dashboard.html"; }, 600); }
      else showToast("Use the demo credentials shown on this page.", "error");
    });
  }

  /* ---------- Dashboard sidebars ---------- */
  function initDashSidebar() {
    $all("[data-logout]").forEach(function (b) { b.addEventListener("click", function () { showToast("Signed out (demo)."); setTimeout(function () { location.href = "login.html"; }, 500); }); });
    if (window.__DASH_CHROME__) return;
    var btn = $("#dash-menu-btn"), side = $("#dash-sidebar"), backdrop = $("#dash-backdrop");
    if (!btn || !side) return;
    function close() { side.classList.add("-translate-x-full"); side.classList.remove("translate-x-0"); if (backdrop) backdrop.classList.add("hidden"); }
    function open() { side.classList.remove("-translate-x-full"); side.classList.add("translate-x-0"); if (backdrop) backdrop.classList.remove("hidden"); }
    // RTL: sidebar side flip via logical handling
    btn.addEventListener("click", function () {
      var closed = side.classList.contains("-translate-x-full");
      if (closed) open(); else close();
    });
    if (backdrop) backdrop.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    function sync() { if (window.innerWidth >= 1100) { side.classList.remove("-translate-x-full"); if (backdrop) backdrop.classList.add("hidden"); } else close(); }
    window.addEventListener("resize", sync); sync();
  }

  /* ---------- Modals ---------- */
  function initModals() {
    $all("[data-close-modal]").forEach(function (b) {
      b.addEventListener("click", function () { var m = b.closest(".modal-backdrop"); if (m) m.classList.remove("open"); });
    });
    $all(".modal-backdrop").forEach(function (m) {
      m.addEventListener("click", function (e) { if (e.target === m) m.classList.remove("open"); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") $all(".modal-backdrop.open").forEach(function (m) { m.classList.remove("open"); });
    });
  }

  /* ---------- Admin add plan ---------- */
  function initAdminPlans() {
    var form = $("#add-plan-form"), table = $("#admin-plans-body");
    if (!form || !table) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = $("#np-name").value.trim() || "New Demo Plan";
      var ins = $("#np-insurer").value.trim() || "Demo Insurer";
      var tr = document.createElement("tr");
      tr.className = "border-b border-[#eef4f4] dark:border-[#2e4f58]";
      tr.innerHTML = "<td class='py-3 pe-3 font-semibold' data-label='Plan'>" + name + "</td><td class='py-3 pe-3' data-label='Insurer'>" + ins + "</td>"
        + "<td class='py-3 pe-3' data-label='Type'>—</td><td class='py-3 pe-3' data-label='Premium'>—</td><td class='py-3' data-label='Status'><span class='badge-gold'>Active</span></td>";
      table.prepend(tr);
      form.reset();
      showToast("Comparison updated.");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initBackTop(); initReveal(); initFaq();
    initPlanFilters(); initCompareTool(); initSavedQuotes();
    initChecklist(); initStatusCyclers(); initClaimTracker();
    initForms(); initAuth(); initDashSidebar(); initModals(); initAdminPlans();
    window.toggleCompare = toggleCompare;
  });
})();
