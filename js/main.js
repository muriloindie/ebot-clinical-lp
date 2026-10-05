// Main entry point
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');

  // Remove existing modals if any
  const existingModal = document.getElementById('waModal');
  if (existingModal) existingModal.remove();
  const existingPdfModal = document.getElementById('pdfModal');
  if (existingPdfModal) existingPdfModal.remove();

  // Inject WhatsApp Modal HTML dynamically
  const waModalHTML = `
    <div class="wa-modal-overlay" id="waModal" style="pointer-events: none;">
      <div class="wa-modal-card" id="waModalCard" style="transform: scale(0.9) translateY(20px); transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);">
        <div class="wa-modal-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.28 14.3c-.22.61-1.28 1.15-1.78 1.22-.43.06-1.02.13-3.23-.79-2.66-1.11-4.38-3.83-4.52-4.01-.13-.19-1.08-1.44-1.08-2.75 0-1.31.68-1.95.92-2.22.24-.26.52-.33.69-.33.17 0 .34 0 .49.01.16.01.37-.06.57.43.21.5.73 1.77.79 1.9.06.13.1.28.01.47-.08.19-.13.31-.26.46-.13.15-.28.33-.39.46-.13.14-.27.29-.12.56.15.26.68 1.13 1.46 1.83.99.9 1.84 1.18 2.1 1.31.26.13.41.11.56-.06.15-.17.65-.75.82-1.01.17-.26.34-.22.58-.13.24.09 1.53.72 1.79.85.26.13.43.19.5.3.06.11.06.64-.16 1.25z"/></svg>
        </div>
        <h3 class="h3" style="margin-bottom: 0.75rem; font-size: 1.5rem; color: var(--dark);">Ir para o WhatsApp?</h3>
        <p class="body-large" style="margin-bottom: 2.5rem; color: var(--text-body); font-size: 1rem; line-height: 1.6;">Você será redirecionado para falar diretamente com um de nossos especialistas via aplicativo. Deseja continuar?</p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-outline" id="waModalClose" style="padding: 0.875rem 1.75rem; flex: 1; min-width: 140px;">Voltar</button>
          <a href="https://wa.me/5546991130554?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20especialista" target="_blank" class="btn btn-primary" id="waModalContinue" style="background: #27AE60; border-color: #27AE60; padding: 0.875rem 1.75rem; flex: 1; min-width: 140px;">Continuar</a>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', waModalHTML);

  const pdfModalHTML = `
    <div class="pdf-modal-overlay" id="pdfModal" aria-hidden="true">
      <div class="pdf-modal-card" role="dialog" aria-modal="true" aria-labelledby="pdfModalTitle">
        <div class="pdf-modal-header">
          <h3 id="pdfModalTitle">Documento</h3>
          <div class="pdf-modal-actions">
            <a class="btn btn-primary" id="pdfModalDownload" href="#" download>Baixar PDF</a>
            <button class="pdf-modal-close" id="pdfModalClose" aria-label="Fechar modal">×</button>
          </div>
        </div>
        <iframe class="pdf-modal-frame" id="pdfModalFrame" title="Leitor de PDF"></iframe>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', pdfModalHTML);

  const modal = document.getElementById('waModal');
  const card = document.getElementById('waModalCard');
  const pdfModal = document.getElementById('pdfModal');
  const pdfTitle = document.getElementById('pdfModalTitle');
  const pdfFrame = document.getElementById('pdfModalFrame');
  const pdfDownload = document.getElementById('pdfModalDownload');

  const openModal = () => {
    modal.style.pointerEvents = 'auto';
    modal.classList.add('active');
    card.style.transform = 'scale(1) translateY(0)';
    document.body.style.overflow = 'hidden';
  };

  if (window.Swiper) {
    new Swiper('.testimonials-swiper', {
      slidesPerView: 1,
      spaceBetween: 22,
      loop: true,
      speed: 700,
      autoplay: {
        delay: 5200,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.testimonials-swiper .swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.testimonial-next',
        prevEl: '.testimonial-prev',
      },
      breakpoints: {
        980: {
          slidesPerView: 1.35,
          centeredSlides: true,
        },
      },
    });
  }

  const closeModal = () => {
    modal.style.pointerEvents = 'none';
    modal.classList.remove('active');
    card.style.transform = 'scale(0.9) translateY(20px)';
    document.body.style.overflow = '';
  };

  const openPdfModal = (title, src) => {
    pdfTitle.textContent = title;
    pdfFrame.src = src;
    pdfDownload.href = src;
    pdfDownload.setAttribute('download', src.split('/').pop());
    pdfModal.setAttribute('aria-hidden', 'false');
    pdfModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closePdfModal = () => {
    pdfModal.classList.remove('active');
    pdfModal.setAttribute('aria-hidden', 'true');
    pdfFrame.src = '';
    document.body.style.overflow = '';
  };

    // Event Delegation for Opening Modal (Flawless 1-click execution across ALL pages)
  document.addEventListener('click', (e) => {
    // Check if clicked element or its parent is the trigger button
    const trigger = e.target.closest('.trigger-wa-modal');
    if (trigger) {
      e.preventDefault();
      
      // Opt: Dynamic message based on button text
      const btnText = trigger.innerText.trim();
      const continueBtn = document.getElementById('waModalContinue');
      if (continueBtn) {
         let message = "Olá, gostaria de falar com um especialista";
         if (btnText.includes('Suporte Técnico')) message = "Olá, preciso de suporte técnico/LGPD";
         if (btnText.includes('Demonstração')) message = "Olá, gostaria de agendar uma demonstração";
         if (btnText.includes('sistema completo')) message = "Olá, gostaria de agendar uma demonstração completa do sistema Ê-Bot Clinical";
         if (btnText.includes('Integração')) message = "Olá, gostaria de solicitar integração via API";
         if (btnText.includes('Orçamento')) message = "Olá, gostaria de solicitar um orçamento";
         
         continueBtn.href = 'https://wa.me/5546991130554?text=' + encodeURIComponent(message);
      }
      
      openModal();
    }

    const pdfTrigger = e.target.closest('.open-pdf-modal');
    if (pdfTrigger) {
      e.preventDefault();
      openPdfModal(pdfTrigger.dataset.pdfTitle || 'Documento', pdfTrigger.dataset.pdfSrc);
    }
    
    // Check if clicked element is close or continue button inside modal
    if (e.target.closest('#waModalClose') || e.target.closest('#waModalContinue')) {
      closeModal();
    }
    
    // Check if clicked outside the card
    if (e.target === modal) {
      closeModal();
    }

    if (e.target.closest('#pdfModalClose') || e.target === pdfModal) {
      closePdfModal();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
    if (e.key === 'Escape' && pdfModal.classList.contains('active')) {
      closePdfModal();
    }
  });
});
