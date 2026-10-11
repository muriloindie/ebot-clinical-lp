/* ==========================================================================
   Splash screen padrão Ê-Bot (mesma lógica do loader.js do Ê-Bot Panel)
   Logo + barra de progresso + "powered by Ê-Sistemas".
   - Progresso simulado + espera pelo load/fontes (brand moment ~1s)
   - Segunda visita na mesma sessão: saída direta (sem repetir o show)
   - prefers-reduced-motion: splash dispensado imediatamente
   ========================================================================== */
(function () {
  'use strict';

  var body = document.body;
  var splash = document.getElementById('site-preloader');
  var bar = document.getElementById('preloaderBar');
  var ROOT_KEY = 'ebot_splash_seen';
  var MAX_WAIT = 2600; // segurança: nunca prende o visitante

  var reduced = false;
  try { reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { /* noop */ }
  var MIN_SHOW = reduced ? 0 : 900;

  var seen = false;
  try { seen = window.sessionStorage.getItem(ROOT_KEY) === '1'; } catch (e) { /* modo privado */ }

  function revealHero() {
    document.querySelectorAll('.s-hero-reveal').forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) el.classList.add('reveal-active');
    });
  }

  function finish() {
    if (!splash) {
      body.classList.remove('splash-lock');
      revealHero();
      return;
    }

    body.classList.remove('splash-lock');
    body.classList.add('preloader-done');

    requestAnimationFrame(function () {
      revealHero();
      splash.classList.add('splash-is-done');
      window.setTimeout(function () {
        if (splash.parentNode) splash.parentNode.removeChild(splash);
      }, 700);
    });

    try { window.sessionStorage.setItem(ROOT_KEY, '1'); } catch (e) { /* noop */ }
  }

  if (document.documentElement.classList.contains('no-js')) {
    document.documentElement.classList.remove('no-js');
  }

  if (!splash || reduced) {
    if (splash && splash.parentNode) splash.parentNode.removeChild(splash);
    body.classList.add('splash-skip');
    finish();
    return;
  }

  body.classList.add('splash-lock');

  var progress = 0;
  var finished = false;
  var startedAt = Date.now();

  function setProgress(value) {
    progress = Math.max(progress, Math.min(100, value));
    if (bar) bar.style.width = progress + '%';
  }

  // Incremento suave até ~90% enquanto os recursos carregam
  var ticker = window.setInterval(function () {
    if (finished) return;
    var remaining = 90 - progress;
    setProgress(progress + Math.max(1.4, remaining * 0.08));
  }, 90);

  function done() {
    if (finished) return;
    finished = true;
    window.clearInterval(ticker);
    window.clearTimeout(guard);

    var elapsed = Date.now() - startedAt;
    var wait = Math.max(0, MIN_SHOW - elapsed);

    setProgress(100);
    window.setTimeout(finish, wait + 220);
  }

  var guard = window.setTimeout(done, MAX_WAIT);

  if (document.readyState === 'complete') {
    window.setTimeout(done, MIN_SHOW * 0.6);
  } else {
    window.addEventListener('load', done, { once: true });
  }

  // Fontes presas em CDN: fonts.ready como sinal adicional (não bloqueia)
  if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
    document.fonts.ready.then(function () {
      if (Date.now() - startedAt > MIN_SHOW * 0.5) done();
    });
  }
})();
