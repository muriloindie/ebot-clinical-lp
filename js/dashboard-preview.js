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

  select(tabs[0].dataset.dxTab);
});
