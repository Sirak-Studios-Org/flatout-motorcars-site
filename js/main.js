// Flatout Motor Cars — site interactions
(function () {
  var header = document.getElementById('header');
  var onScroll = function () {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Scroll reveal
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// ===== Drive-request modal + intake form =====
(function () {
  var modal = document.getElementById('driveModal');
  if (!modal) return;
  var body = document.body;

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
  }

  document.querySelectorAll('.js-open-form').forEach(function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); openModal(); });
  });
  var mc = document.getElementById('modalClose');
  if (mc) mc.addEventListener('click', closeModal);
  var sc = document.getElementById('successClose');
  if (sc) sc.addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  // Earliest selectable drive date = 2 full business days out (skip weekends)
  var d = new Date(); var added = 0;
  while (added < 2) {
    d.setDate(d.getDate() + 1);
    var day = d.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  var min = d.toISOString().split('T')[0];

  // Date pickers: pick a date and it is blacked out in the other two pickers
  var fps = [];
  function refreshDisabled() {
    fps.forEach(function (fp, i) {
      var taken = [];
      fps.forEach(function (o, j) { if (j !== i && o.selectedDates[0]) taken.push(o.selectedDates[0]); });
      fp.set('disable', taken);
    });
  }
  if (window.flatpickr) {
    ['date_1', 'date_2', 'date_3'].forEach(function (n) {
      var el = document.querySelector('[name="' + n + '"]');
      if (!el) return;
      fps.push(window.flatpickr(el, {
        minDate: min,
        dateFormat: 'Y-m-d',
        altInput: true,
        altFormat: 'M j, Y',
        disableMobile: true,
        onChange: refreshDisabled
      }));
    });
  }

  // Validate three distinct dates, then let the browser submit the form natively
  var form = document.getElementById('driveForm');
  var errEl = document.getElementById('formError');
  function showErr(msg) { if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; } }
  function clearErr() { if (errEl) { errEl.textContent = ''; errEl.style.display = 'none'; } }
  function val(n) { var el = document.querySelector('[name="' + n + '"]'); return el ? el.value : ''; }

  if (form) {
    form.addEventListener('submit', function (e) {
      var v1 = val('date_1'), v2 = val('date_2'), v3 = val('date_3');
      if (!v1 || !v2 || !v3) { e.preventDefault(); showErr('Please select three preferred drive dates.'); return; }
      if (v1 < min || v2 < min || v3 < min) { e.preventDefault(); showErr('Each date must be at least 2 business days out.'); return; }
      if (v1 === v2 || v1 === v3 || v2 === v3) { e.preventDefault(); showErr('Please choose three different dates.'); return; }
      clearErr();
      // Log the lead to the CRM (Airtable webhook). Fire-and-forget; never blocks the email or redirect.
      try {
        fetch('https://hooks.airtable.com/workflows/v1/genericWebhook/appyQUD5TadHumevI/wflVI7AvC9PZYe18x/wtrY2ll62iVDOVP1Z', {
          method: 'POST', mode: 'no-cors', keepalive: true,
          body: JSON.stringify({
            name: val('name'), email: val('email'), phone: val('phone'),
            build: val('build'), experience: val('experience'), fastest_car: val('fastest_car'),
            timeline: val('timeline'), date_1: v1, date_2: v2, date_3: v3, message: val('message')
          })
        });
      } catch (err) {}
      var btn = document.getElementById('formSubmit');
      if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }
    });
    ['date_1', 'date_2', 'date_3'].forEach(function (n) {
      var el = document.querySelector('[name="' + n + '"]');
      if (el) el.addEventListener('change', clearErr);
    });
  }
})();
