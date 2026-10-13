/* footer.js — ONLY footer markup + injection */
(function () {
  var html = ''
  + '<footer class="bg-[#174A5B] dark:bg-[#0f1f25] text-white mt-0">'
  + '<div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">'
  + '<div><div class="flex items-center gap-2.5">'
  + '<span class="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#174A5B]" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-3.6 8-10V5l-8-3-8 3v7c0 6.4 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg></span>'
  + '<span class="leading-tight"><span class="block font-heading font-extrabold tracking-wide">CLEARPATH</span><span class="block text-[.7rem] tracking-[.18em] uppercase text-[#8fd0c8]">Insurance Advisors</span></span></div>'
  + '<p class="mt-4 text-sm leading-relaxed text-white/80">“Clear Choices. Confident Coverage.”</p>'
  + '<p class="mt-2 text-sm leading-relaxed text-white/70">We help individuals and families understand, compare, and choose life and health coverage with clear, human guidance — no confusing jargon.</p>'
  + '<div class="mt-4 flex gap-2">'
  + '<a href="#" aria-label="LinkedIn" class="rounded-lg bg-white/10 p-2 hover:bg-white/20"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z"/></svg></a>'
  + '<a href="#" aria-label="Facebook" class="rounded-lg bg-white/10 p-2 hover:bg-white/20"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg></a>'
  + '<a href="#" aria-label="Instagram" class="rounded-lg bg-white/10 p-2 hover:bg-white/20"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg></a>'
  + '</div></div>'
  + '<nav aria-label="Explore"><h3 class="font-heading text-sm font-bold uppercase tracking-widest text-[#D89B5B]">Explore</h3><ul class="mt-4 space-y-2.5 text-sm text-white/80">'
  + '<li><a class="hover:text-white" href="index.html">Home</a></li><li><a class="hover:text-white" href="plans.html">Plans</a></li>'
  + '<li><a class="hover:text-white" href="claims.html">Claims Assistance</a></li><li><a class="hover:text-white" href="about.html">About</a></li>'
  + '<li><a class="hover:text-white" href="resources.html">Resources</a></li></ul></nav>'
  + '<nav aria-label="Client"><h3 class="font-heading text-sm font-bold uppercase tracking-widest text-[#D89B5B]">Client</h3><ul class="mt-4 space-y-2.5 text-sm text-white/80">'
  + '<li><a class="hover:text-white" href="login.html">Login</a></li><li><a class="hover:text-white" href="dashboard.html">Client Dashboard</a></li>'
  + '<li><a class="hover:text-white" href="dashboard.html#applications">Track Application</a></li><li><a class="hover:text-white" href="dashboard.html#claims">Track Claim</a></li>'
  + '<li><a class="hover:text-white" href="contact.html">Contact Advisor</a></li></ul></nav>'
  + '<div><h3 class="font-heading text-sm font-bold uppercase tracking-widest text-[#D89B5B]">Contact</h3><ul class="mt-4 space-y-2.5 text-sm text-white/80">'
  + '<li>Phone: <a href="tel:+15551234567" class="hover:text-white">+1 (555) 123-4567</a></li>'
  + '<li>Email: <a href="mailto:hello@clearpath-advisors.demo" class="hover:text-white">hello@clearpath-advisors.demo</a></li>'
  + '<li>Office: 428 Harbor View Ave, Suite 210, Lakeside</li><li>Hours: Mon–Fri, 9:00 AM – 6:00 PM</li></ul></div>'
  + '</div>'
  + '<div class="border-t border-white/15"><div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">'
  + '<p class="text-xs leading-relaxed text-white/60">Insurance products, availability, premiums, benefits, exclusions, eligibility, and claim outcomes vary by insurer, policy, location, and individual circumstances. Information shown on this demo website is for educational purposes only and should not be considered a guarantee of coverage, pricing, or claim approval.</p>'
  + '<p class="mt-2 text-xs leading-relaxed text-white/60">Sample plan and insurer information shown on this website is fictional demonstration data unless otherwise specified.</p>'
  + '<div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-white/75">'
  + '<p>© 2026 ClearPath Insurance Advisors. All Rights Reserved.</p>'
  + '<p class="flex flex-wrap gap-x-4 gap-y-1"><a href="#" class="hover:text-white">Privacy Policy</a><a href="#" class="hover:text-white">Terms &amp; Conditions</a><a href="#" class="hover:text-white">Insurance Disclosure</a></p>'
  + '</div></div></div></footer>';
  function mount() {
    var slot = document.getElementById("footer");
    if (slot) slot.innerHTML = html;
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
