/* Droga do Miłości — demo (statyczny front, bez backendu) */
(function () {
  'use strict';

  var PLANS = {
    '49': {
      label: 'Pakiet 49 zł — publikacja oferty',
      summary: 'Twoja oferta zostaje opublikowana <strong>na zawsze</strong> w sześciu grupach i na dwóch stronach na Facebooku dla Kobiet ze Wschodu Europy. Zainteresowane Kobiety skontaktują się z Tobą bezpośrednio.'
    },
    '99': {
      label: 'Pakiet 99 zł — oferta + czat w grupie',
      summary: 'Twoja oferta zostaje opublikowana <strong>na zawsze</strong>, a Ty zostajesz dodany do <strong>czatu w grupie na Facebooku</strong> (ponad 7 tysięcy Kobiet) — ogłoszenie trafia dodatkowo na dwie strony, które obserwuje 5 tysięcy Kobiet. Możesz pisać pierwszy.'
    }
  };

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* --- header: cień po przewinięciu --- */
  var header = document.getElementById('site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- menu mobilne --- */
  var burger = document.querySelector('.burger');
  var mobilenav = document.querySelector('.mobilenav');
  if (burger && mobilenav) {
    burger.addEventListener('click', function () {
      var open = mobilenav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    mobilenav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mobilenav.classList.remove('is-open'); });
    });
  }

  /* --- pojawianie się sekcji --- */
  var revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('visible'); });
  }

  /* --- podświetlenie aktywnej pozycji w menu --- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.mainnav a'))
    .filter(function (a) { return a.getAttribute('href').charAt(0) === '#'; });
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* --- formularz --- */
  var form = document.getElementById('offer-form');
  if (!form) return;

  var payBtn = form.querySelector('[data-pay]');

  function currentPlan() {
    var checked = form.querySelector('input[name="pakiet"]:checked');
    return checked ? checked.value : null;
  }

  function refreshPay() {
    var p = currentPlan();
    if (payBtn) payBtn.textContent = 'Zapłać bezpiecznie ' + (p || '49') + ' zł';
  }

  form.querySelectorAll('input[name="pakiet"]').forEach(function (i) {
    i.addEventListener('change', function () {
      refreshPay();
      warn('[data-warn-pkg]', false);
    });
  });
  refreshPay();

  /* wybór pakietu z sekcji cennika */
  document.querySelectorAll('[data-pick]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var radio = form.querySelector('input[name="pakiet"][value="' + btn.getAttribute('data-pick') + '"]');
      if (radio) { radio.checked = true; refreshPay(); }
      document.getElementById('oferta').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* zdjęcia */
  form.querySelectorAll('.dropzone').forEach(function (zone) {
    var input = zone.querySelector('input[type="file"]');
    var img = zone.querySelector('img');
    var remove = zone.querySelector('.dropzone__remove');
    input.addEventListener('change', function () {
      var file = input.files && input.files[0];
      if (!file) { zone.classList.remove('filled'); img.removeAttribute('src'); return; }
      img.src = URL.createObjectURL(file);
      zone.classList.add('filled');
    });
    remove.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      input.value = '';
      img.removeAttribute('src');
      zone.classList.remove('filled');
    });
  });

  function warn(sel, on) {
    var el = form.querySelector(sel);
    if (el) el.classList.toggle('is-visible', on);
  }

  function validate() {
    var ok = true, firstBad = null;

    if (!currentPlan()) {
      warn('[data-warn-pkg]', true); ok = false;
      firstBad = form.querySelector('.pkg-grid');
    } else { warn('[data-warn-pkg]', false); }

    var badField = false;
    form.querySelectorAll('.field[required]').forEach(function (el) {
      var bad = !el.value.trim();
      el.classList.toggle('is-invalid', bad);
      if (bad) { badField = true; firstBad = firstBad || el; }
    });
    warn('[data-warn-data]', badField);
    if (badField) ok = false;

    var allConsents = true;
    form.querySelectorAll('.consent').forEach(function (c) {
      var bad = !c.querySelector('input').checked;
      c.classList.toggle('is-invalid', bad);
      if (bad) allConsents = false;
    });
    warn('[data-warn-consents]', !allConsents);
    if (!allConsents) { ok = false; firstBad = firstBad || form.querySelector('.consents'); }

    if (firstBad) firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return ok;
  }

  var loading = document.getElementById('loading');
  var success = document.getElementById('success');
  var successBody = document.getElementById('success-body');
  var closeSuccess = document.getElementById('close-success');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;
    var plan = PLANS[currentPlan()];
    loading.classList.add('is-open');
    setTimeout(function () {
      loading.classList.remove('is-open');
      if (successBody) {
        successBody.innerHTML =
          '<p style="margin-bottom:1rem"><strong>' + plan.label + '</strong></p>' +
          '<p>' + plan.summary + '</p>' +
          '<p style="margin-top:1rem">Twoje zgłoszenie trafiło do doradcy Biura. Po sprawdzeniu ogłoszenia otrzymasz potwierdzenie publikacji na podany adres e-mail.</p>';
      }
      success.classList.add('is-open');
    }, 2200);
  });

  if (closeSuccess) {
    closeSuccess.addEventListener('click', function () { success.classList.remove('is-open'); });
  }
})();
