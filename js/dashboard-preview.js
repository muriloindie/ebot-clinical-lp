// Prévia do redesign do painel — troca de telas (abas) no bloco .dx-showcase
document.addEventListener('DOMContentLoaded', () => {
  const showcase = document.querySelector('.dx-showcase');
  if (!showcase) return;

  const tabs = Array.from(showcase.querySelectorAll('[data-dx-tab]'));
  const panes = Array.from(showcase.querySelectorAll('.dx-pane'));
  const navItems = Array.from(showcase.querySelectorAll('[data-dx-nav]'));
  const addr = showcase.querySelector('[data-dx-addr]');
  const addrPath = { dash: 'dashboard', agenda: 'agenda', inbox: 'atendimentos', ia: 'automacao' };
  if (!tabs.length || !panes.length) return;

  const select = (name, focus = false) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.dxTab === name;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
      if (active && focus) tab.focus();
    });

    navItems.forEach((item) => {
      item.classList.toggle('is-active', item.dataset.dxNav === name);
    });
    if (addr && addrPath[name]) addr.textContent = addrPath[name];

    panes.forEach((pane) => {
      const active = pane.id === `dx-pane-${name}`;
      pane.classList.toggle('is-active', active);
      if (active) {
        pane.removeAttribute('hidden');
        pane.scrollTop = 0;
      } else {
        pane.setAttribute('hidden', '');
      }
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab.dataset.dxTab));

    tab.addEventListener('keydown', (event) => {
      const keys = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 };
      if (!(event.key in keys)) return;
      event.preventDefault();
      const next = (keys[event.key] + tabs.length) % tabs.length;
      select(tabs[next].dataset.dxTab, true);
    });
  });

  // Sidebar do mock: clicar num item leva para a aba correspondente
  navItems.forEach((item) => {
    item.addEventListener('click', () => select(item.dataset.dxNav));
  });

  // Luz que acompanha o mouse sobre a representação visual
  const win = showcase.querySelector('.dx-window');
  if (win) {
    win.addEventListener('pointermove', (event) => {
      const rect = win.getBoundingClientRect();
      win.style.setProperty('--dx-mx', `${event.clientX - rect.left}px`);
      win.style.setProperty('--dx-my', `${event.clientY - rect.top}px`);
    });
    win.addEventListener('pointerleave', () => {
      win.style.setProperty('--dx-mx', '50%');
      win.style.setProperty('--dx-my', '0%');
    });
  }

  // Canvas de automação: arrastar para explorar o fluxo (pan, sem rolagem)
  showcase.querySelectorAll('.dx-canvas').forEach((canvas) => {
    const inner = canvas.querySelector('.dx-canvas-inner');
    if (!inner) return;

    let panning = false;
    let startX = 0;
    let startY = 0;
    let pan = null;

    const clamp = (value, limit) => Math.min(limit, Math.max(-limit, value));

    // folga total = metade do excesso da área interna sobre o quadro,
    // mais um pequeno respiro nas bordas
    const limits = () => ({
      lx: Math.max((inner.offsetWidth - canvas.clientWidth) / 2, 0) + 28,
      ly: Math.max((inner.offsetHeight - canvas.clientHeight) / 2, 0) + 28,
    });

    const render = () => {
      inner.style.setProperty('--dx-pan-x', `${pan.x}px`);
      inner.style.setProperty('--dx-pan-y', `${pan.y}px`);
    };

    // posição de descanso: começo do fluxo encostado na esquerda, no meio vertical
    const ensurePan = () => {
      if (pan === null) {
        if (!canvas.clientWidth) return false;
        pan = { x: Math.max(0, (inner.offsetWidth - canvas.clientWidth) / 2), y: 0 };
      }
      const { lx, ly } = limits();
      pan.x = clamp(pan.x, lx);
      pan.y = clamp(pan.y, ly);
      render();
      return true;
    };

    canvas.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      if (!ensurePan()) return;
      panning = true;
      startX = event.clientX;
      startY = event.clientY;
      canvas.classList.add('is-dragging');
      canvas.setPointerCapture(event.pointerId);
      event.preventDefault();
    });

    canvas.addEventListener('pointermove', (event) => {
      if (!panning) return;
      const { lx, ly } = limits();
      pan.x = clamp(pan.x + (event.clientX - startX), lx);
      pan.y = clamp(pan.y + (event.clientY - startY), ly);
      startX = event.clientX;
      startY = event.clientY;
      render();
    });

    const endPan = (event) => {
      if (!panning) return;
      panning = false;
      canvas.classList.remove('is-dragging');
      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId);
      }
    };

    canvas.addEventListener('pointerup', endPan);
    canvas.addEventListener('pointercancel', endPan);
    canvas.addEventListener('lostpointercapture', () => {
      panning = false;
      canvas.classList.remove('is-dragging');
    });

    // O quadro nasce escondido (aba inativa ⇒ largura 0); quando a aba
    // Automação aparece, o ResizeObserver dispara e posiciona o descanso.
    if (window.ResizeObserver) {
      new ResizeObserver(() => ensurePan()).observe(canvas);
    }
    window.addEventListener('resize', ensurePan);
    ensurePan();
  });

  select(tabs[0].dataset.dxTab);
});
