/* ==========================================================================
   #whatsapp — showcase "Atendimento completo no WhatsApp"
   - Revela a conversa no celular (bolhas + indicador "digitando...")
   - Em paralelo, preenche a ficha do paciente (.cw-card) campo a campo,
     anexa arquivos e classifica a conversa com tags
   - Loop infinito enquanto a section estiver visível
   - Com prefers-reduced-motion, renderiza o estado final estático
   ========================================================================== */

(function () {
  const stage = document.querySelector('.cw-stage');
  const thread = document.getElementById('cw-thread');
  if (!stage || !thread) return;

  const el = {
    live: document.getElementById('cw-live'),
    badge: document.getElementById('cw-badge'),
    initials: document.getElementById('cw-initials'),
    name: document.getElementById('cw-name'),
    plan: document.getElementById('cw-f-plan'),
    birth: document.getElementById('cw-f-birth'),
    num: document.getElementById('cw-f-num'),
    when: document.getElementById('cw-f-when'),
    count: document.getElementById('cw-count'),
    fileList: document.getElementById('cw-file-list'),
    tags: document.getElementById('cw-tags'),
  };

  if (Object.values(el).some((node) => !node)) return;

  /* ------------------------------------------------------------------
     Roteiro: atendimento de uma clínica médica (cardiologia)
     side: in (paciente) | out (bot da clínica) | file (arquivo recebido)
     card: atualizações aplicadas na ficha assim que a mensagem aparece
     ------------------------------------------------------------------ */
  const CONVERSATION = [
    {
      side: 'in',
      time: '14:02',
      text: 'Boa tarde! Preciso remarcar minha consulta de cardiologia.',
      card: { badge: 'Identificando paciente' },
    },
    {
      side: 'out',
      time: '14:02',
      text: 'Boa tarde, Camila! Já encontrei seu cadastro. Confirma que o convênio é o Unimed?',
      card: {
        badge: 'Cadastro recuperado',
        initials: 'CR',
        name: 'Camila Rocha',
        birth: '12/03/1987',
        num: '(11) 98832-4417',
      },
    },
    {
      side: 'in',
      time: '14:03',
      text: 'Isso, Unimed mesmo.',
      card: {
        badge: 'Convênio validado',
        plan: 'Unimed · Ambulatorial',
        tags: [{ t: 'Convênio validado', c: 'is-wa' }],
      },
    },
    {
      side: 'out',
      time: '14:03',
      text: 'Tenho qui às 15h30 com o Dr. Ricardo ou sex às 9h com a Dra. Juliana. Qual prefere?',
      card: { badge: 'Escolhendo horário' },
    },
    {
      side: 'in',
      time: '14:04',
      text: 'Qui às 15h30. Vou mandar o exame que fiz ontem.',
      card: {
        badge: 'Reservando horário',
        when: 'Qui, 15h30 · Dr. Ricardo',
        tags: [{ t: 'Cardiologia', c: '' }],
      },
    },
    {
      side: 'file',
      time: '14:04',
      name: 'hemograma.pdf',
      size: '248 KB · PDF',
      card: {
        badge: 'Anexando arquivo',
        files: [{ n: 'hemograma.pdf', s: '248 KB · PDF' }],
      },
    },
    {
      side: 'out',
      time: '14:05',
      text: 'Remarcado ✔ Qui às 15h30 com o Dr. Ricardo. Salvei o exame na sua ficha e envio o preparo amanhã às 18h.',
      card: {
        badge: 'Ficha salva automaticamente',
        saved: true,
        tags: [{ t: 'Consulta remarcada', c: 'is-wa' }, { t: 'Preparo pendente', c: 'is-warn' }],
      },
    },
  ];

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const metaHTML = (step) =>
    '<div class="cw-meta">' +
    step.time +
    (step.side === 'out' ? ' <span class="cw-ticks">\u2713\u2713</span>' : '') +
    '</div>';

  const ico = (id, cls) =>
    '<svg class="cw-ico' + (cls ? ' ' + cls : '') + '"><use href="#' + id + '"></use></svg>';

  function buildBubble(step) {
    const bubble = document.createElement('div');
    bubble.className = 'cw-bubble ' + (step.side === 'out' ? 'out' : 'in');

    if (step.side === 'file') {
      bubble.innerHTML =
        '<div class="cw-file-msg">' +
        '<span class="cw-tile">' + ico('dx-i-file') + '</span>' +
        '<div><b>' + step.name + '</b><span>' + step.size + '</span></div>' +
        ico('dx-i-dl', 'cw-dl') +
        '</div>' +
        metaHTML(step);
    } else {
      bubble.innerHTML = step.text + metaHTML(step);
    }
    return bubble;
  }

  function buildTyping(step) {
    const typing = document.createElement('div');
    typing.className = 'cw-typing' + (step.side === 'out' ? ' out' : '');
    typing.innerHTML = '<i></i><i></i><i></i>';
    return typing;
  }

  function scrollToBottom() {
    if (typeof thread.scrollTo === 'function') {
      thread.scrollTo({ top: thread.scrollHeight, behavior: 'smooth' });
    } else {
      thread.scrollTop = thread.scrollHeight;
    }
  }

  /* ------------------------------------------------------------------
     Ficha do paciente
     ------------------------------------------------------------------ */
  const FIELD_MAP = [
    ['plan', el.plan],
    ['birth', el.birth],
    ['num', el.num],
    ['when', el.when],
  ];

  function setField(node, value) {
    const strong = node.querySelector('strong');
    if (!strong || strong.textContent === value) return;
    strong.textContent = value;
    node.classList.remove('is-empty');
    node.classList.remove('is-saved');
    // reinicia a animação
    void node.offsetWidth;
    node.classList.add('is-saved');
    setTimeout(() => node.classList.remove('is-saved'), 1000);
  }

  function resetCard() {
    el.live.classList.remove('is-saved');
    el.badge.textContent = 'Atendendo no WhatsApp';
    el.initials.textContent = '—';
    el.name.textContent = 'Novo contato';
    FIELD_MAP.forEach(([, node]) => {
      node.querySelector('strong').textContent = '—';
      node.classList.add('is-empty');
      node.classList.remove('is-saved');
    });
    el.count.textContent = '0';
    el.fileList.innerHTML = '<p class="cw-file-empty">Nenhum arquivo enviado</p>';
    el.tags.innerHTML = '<span class="cw-tag is-muted">Sem classificação</span>';
  }

  function applyCard(card) {
    if (!card) return;

    if (card.badge) el.badge.textContent = card.badge;
    if (card.saved) el.live.classList.add('is-saved');

    if (card.initials) el.initials.textContent = card.initials;
    if (card.name) el.name.textContent = card.name;

    FIELD_MAP.forEach(([key, node]) => {
      if (card[key]) setField(node, card[key]);
    });

    if (card.files) {
      const empty = el.fileList.querySelector('.cw-file-empty');
      if (empty) empty.remove();
      card.files.forEach((file) => {
        const row = document.createElement('div');
        row.className = 'cw-file-row';
        row.innerHTML =
          '<span class="cw-tile">' + ico('dx-i-file') + '</span>' +
          '<div><b>' + file.n + '</b><span>' + file.s + '</span></div>' +
          ico('dx-i-dl', 'cw-dl');
        el.fileList.appendChild(row);
      });
      el.count.textContent = String(el.fileList.querySelectorAll('.cw-file-row').length);
    }

    if (card.tags) {
      const muted = el.tags.querySelector('.cw-tag.is-muted');
      if (muted) muted.remove();
      card.tags.forEach((tag) => {
        const chip = document.createElement('span');
        chip.className = 'cw-tag' + (tag.c ? ' ' + tag.c : '');
        chip.textContent = tag.t;
        el.tags.appendChild(chip);
      });
    }
  }

  /* ------------------------------------------------------------------
     Execução
     ------------------------------------------------------------------ */
  function renderStatic() {
    thread.innerHTML = '<div class="cw-spacer"></div>';
    CONVERSATION.forEach((step) => thread.appendChild(buildBubble(step)));
    thread.scrollTop = thread.scrollHeight;

    resetCard();
    CONVERSATION.forEach((step) => applyCard(step.card));
  }

  async function runLoop() {
    for (;;) {
      resetCard();
      thread.innerHTML = '<div class="cw-spacer"></div>';

      for (const step of CONVERSATION) {
        const typing = buildTyping(step);
        thread.appendChild(typing);
        scrollToBottom();
        await wait(step.side === 'out' ? 950 : 800);
        typing.remove();

        thread.appendChild(buildBubble(step));
        applyCard(step.card);
        scrollToBottom();
        await wait(1250);
      }

      await wait(3400);

      const bubbles = thread.querySelectorAll('.cw-bubble');
      bubbles.forEach((bubble) => bubble.classList.add('is-leaving'));
      await wait(340);
      await wait(400);
    }
  }

  if (reduced) {
    renderStatic();
    return;
  }

  let started = false;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          observer.disconnect();
          runLoop();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(stage);
})();
