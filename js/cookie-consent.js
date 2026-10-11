// Aceite de cookies (LGPD) — banner padrão Ê-Bot (apresentação: aparece a cada visita/refresh)
(function () {
  var banner = document.getElementById('cookieConsent');
  if (!banner) return;

  // Padrão Ê-Bot: markup nasce com [hidden] e entra animado via .is-visible
  banner.removeAttribute('hidden');

  var show = function () { banner.classList.add('is-visible'); };
  window.setTimeout(show, 1400); // entrada suave após a splash

  var dismiss = function () {
    banner.classList.remove('is-visible');
    document.dispatchEvent(new CustomEvent('ebot:cookie-consent', { detail: 'all' }));
  };

  var acceptAll = document.getElementById('cookieAcceptAll');
  var essential = document.getElementById('cookieEssential');

  if (acceptAll) acceptAll.addEventListener('click', dismiss);
  if (essential) essential.addEventListener('click', dismiss);
})();
