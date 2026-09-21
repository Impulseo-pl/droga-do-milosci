/* Droga do Miłości — skrypty strony (demo) */
(function () {
  'use strict';

  /* --- nawigacja mobilna --- */
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.nav__burger');
  if (nav && burger) {
    burger.addEventListener('click', function () {
      nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', nav.classList.contains('is-open'));
    });
    nav.querySelectorAll('.nav__links a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('is-open'); });
    });
  }

  /* --- delikatne pojawianie się sekcji --- */
  var revealables = document.querySelectorAll('.reveal');
  if (revealables.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* --- FAQ --- */
  document.querySelectorAll('.faq__q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq__item');
      var open = item.classList.contains('is-open');
      item.classList.toggle('is-open', !open);
      q.setAttribute('aria-expanded', String(!open));
    });
  });

  /* --- baner cookies --- */
  var bar = document.querySelector('.cookiebar');
  if (bar) {
    var KEY = 'ddm_cookies_ok';
    var stored = null;
    try { stored = localStorage.getItem(KEY); } catch (e) {}
    if (!stored) { setTimeout(function () { bar.classList.add('is-visible'); }, 900); }
    var ok = bar.querySelector('[data-cookie-accept]');
    if (ok) {
      ok.addEventListener('click', function () {
        bar.classList.remove('is-visible');
        try { localStorage.setItem(KEY, '1'); } catch (e) {}
      });
    }
  }

  /* --- formularz oferty --- */
  var form = document.querySelector('#oferta-form');
  if (!form) return;

  var PLANS = {
    '49': { name: 'Publikacja oferty', price: 49, scope: 'Ogłoszenie w 6 grupach i na 2 stronach' },
    '99': { name: 'Oferta + czat w grupie', price: 99, scope: 'Ogłoszenie + czat w grupie i 2 strony' }
  };

  var sumPlan = document.querySelector('[data-sum-plan]');
  var sumScope = document.querySelector('[data-sum-scope]');
  var sumTotal = document.querySelector('[data-sum-total]');
  var payBtn = document.querySelector('[data-pay]');

  function currentPlan() {
    var checked = form.querySelector('input[name="pakiet"]:checked');
    return checked ? PLANS[checked.value] : null;
  }

  function refreshSummary() {
    var p = currentPlan();
    if (sumPlan) sumPlan.textContent = p ? p.name : 'nie wybrano';
    if (sumScope) sumScope.textContent = p ? p.scope : '—';
    if (sumTotal) sumTotal.textContent = p ? p.price + ' zł' : '— zł';
    if (payBtn) payBtn.textContent = p ? 'Zapłać bezpiecznie ' + p.price + ' zł' : 'Wybierz pakiet, aby zapłacić';
  }

  form.querySelectorAll('input[name="pakiet"]').forEach(function (i) {
    i.addEventListener('change', refreshSummary);
  });
  refreshSummary();

  /* podgląd zdjęć */
  form.querySelectorAll('.upload input[type="file"]').forEach(function (input) {
    var box = input.closest('.upload');
    var clear = box.querySelector('.upload__clear');
    input.addEventListener('change', function () {
      var file = input.files && input.files[0];
      box.querySelectorAll('img').forEach(function (i) { i.remove(); });
      if (!file) { box.classList.remove('has-file'); return; }
      var img = document.createElement('img');
      img.alt = 'Podgląd zdjęcia';
      img.src = URL.createObjectURL(file);
      box.insertBefore(img, box.firstChild);
      box.classList.add('has-file');
    });
    if (clear) {
      clear.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        input.value = '';
        box.querySelectorAll('img').forEach(function (i) { i.remove(); });
        box.classList.remove('has-file');
      });
    }
  });

  function showMsg(sel, on) {
    var el = document.querySelector(sel);
    if (el) el.classList.toggle('is-visible', on);
  }

  function validate() {
    var ok = true;
    var firstBad = null;

    if (!currentPlan()) {
      showMsg('[data-msg-plan]', true); ok = false;
      firstBad = firstBad || document.querySelector('#krok-1');
    } else { showMsg('[data-msg-plan]', false); }

    form.querySelectorAll('[required]').forEach(function (el) {
      if (el.type === 'checkbox') return;
      var field = el.closest('.field');
      var bad = !el.value.trim();
      if (field) field.classList.toggle('is-invalid', bad);
      if (bad) { ok = false; firstBad = firstBad || field; }
    });
    showMsg('[data-msg-data]', !ok && !!form.querySelector('.field.is-invalid'));

    var consents = form.querySelectorAll('.consent input[type="checkbox"]');
    var allConsents = true;
    consents.forEach(function (c) {
      var bad = !c.checked;
      c.closest('.consent').classList.toggle('is-invalid', bad);
      if (bad) { allConsents = false; }
    });
    if (!allConsents) { ok = false; firstBad = firstBad || document.querySelector('#krok-4'); }
    showMsg('[data-msg-consents]', !allConsents);

    if (firstBad) firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return ok;
  }

  var modal = document.querySelector('#pay-modal');
  var modalWait = document.querySelector('[data-modal-wait]');
  var modalDone = document.querySelector('[data-modal-done]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validate()) return;
    if (!modal) return;
    modal.classList.add('is-open');
    if (modalWait) modalWait.style.display = 'block';
    if (modalDone) modalDone.style.display = 'none';
    setTimeout(function () {
      if (modalWait) modalWait.style.display = 'none';
      if (modalDone) modalDone.style.display = 'block';
    }, 2200);
  });

  document.querySelectorAll('[data-modal-close]').forEach(function (b) {
    b.addEventListener('click', function () { modal.classList.remove('is-open'); });
  });

  /* wybór pakietu z adresu: dodaj-oferte.html?pakiet=99 */
  var q = new URLSearchParams(window.location.search).get('pakiet');
  if (q && PLANS[q]) {
    var radio = form.querySelector('input[name="pakiet"][value="' + q + '"]');
    if (radio) { radio.checked = true; refreshSummary(); }
  }
})();
