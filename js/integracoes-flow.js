// Pacotes animados do mapa de integrações (#integracoes)
// Cada "pacote" percorre um caminho do SVG ligando os nós externos ao Ê-Bot
// Clinical no centro. A animação só roda com a seção visível e é desligada em
// prefers-reduced-motion (os pacotes ficam estáticos no meio do caminho).
document.addEventListener('DOMContentLoaded', () => {
  const map = document.querySelector('.int-map');
  if (!map) return;

  const paths = Array.from(map.querySelectorAll('.int-path'));
  const packets = Array.from(map.querySelectorAll('.int-packet'));
  if (!paths.length || !packets.length) return;

  const pathsById = {};
  paths.forEach((path) => {
    pathsById[path.id] = path;
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // configuração de cada pacote: caminho, duração (s) e atraso (s)
  const routes = packets.map((packet) => ({
    packet,
    path: pathsById[packet.getAttribute('data-on')] || paths[0],
    duration: parseFloat(packet.getAttribute('data-duration')) || 5,
    delay: parseFloat(packet.getAttribute('data-delay')) || 0,
    length: 0
  }));

  const measure = () => {
    routes.forEach((route) => {
      try {
        route.length = route.path.getTotalLength();
      } catch (err) {
        route.length = 0;
      }
    });
  };

  const place = (route, t) => {
    if (!route.length) return;
    const point = route.path.getPointAtLength(Math.max(0, Math.min(route.length, t * route.length)));
    route.packet.setAttribute('cx', point.x);
    route.packet.setAttribute('cy', point.y);
  };

  measure();

  // sem movimento: pacete parado na metade do caminho
  if (reducedMotion) {
    routes.forEach((route) => place(route, 0.5));
    return;
  }

  let frameId = null;
  let visible = false;
  let startTime = performance.now();

  const animate = (now) => {
    frameId = null;
    if (!visible || document.hidden) return;

    const elapsed = (now - startTime) / 1000;

    routes.forEach((route) => {
      const raw = ((elapsed - route.delay) % route.duration) / route.duration;
      const t = raw < 0 ? raw + 1 : raw;

      // fade de entrada e saída para o pacote não "pular" no laço
      const progress = t < 0.08 ? 0 : (t > 0.92 ? 1 : (t - 0.08) / 0.84);
      place(route, progress);
      route.packet.setAttribute('opacity', t < 0.08 ? t / 0.08 : (t > 0.92 ? (1 - t) / 0.08 : 1));
    });

    frameId = window.requestAnimationFrame(animate);
  };

  const start = () => {
    if (frameId === null && visible && !document.hidden) {
      startTime = performance.now();
      frameId = window.requestAnimationFrame(animate);
    }
  };

  const stop = () => {
    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
      frameId = null;
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      visible = entry.isIntersecting;
      if (visible) {
        measure();
        start();
      } else {
        stop();
      }
    });
  }, { threshold: 0.05 });

  observer.observe(map);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  // recalcula os caminhos ao cruzar o breakpoint (o SVG some no mobile)
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      measure();
      start();
    }, 180);
  });
});
