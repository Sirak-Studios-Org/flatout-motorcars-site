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
  ['date_1', 'date_2', 'date_3'].forEach(function (n) {
    var el = document.querySelector('[name="' + n + '"]');
    if (el) el.min = min;
  });

  // Submit via Web3Forms
  var form = document.getElementById('driveForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = document.getElementById('formSubmit');
      btn.textContent = 'Sending…'; btn.disabled = true;
      fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (res.success) {
            document.getElementById('formWrap').style.display = 'none';
            document.getElementById('formSuccess').style.display = 'block';
          } else {
            btn.textContent = 'Try again'; btn.disabled = false;
            alert('Something went wrong. Please email info@flatoutmotorcars.com.');
          }
        })
        .catch(function () {
          btn.textContent = 'Try again'; btn.disabled = false;
          alert('Something went wrong. Please email info@flatoutmotorcars.com.');
        });
    });
  }
})();
