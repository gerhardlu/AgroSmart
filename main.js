// =============================================
//  AGROSMART – main.js
// =============================================

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
});

// =============================================
// FALE CONOSCO – Validação do formulário
// =============================================

const form = document.getElementById('contactForm');

if (form) {

  // Contador de caracteres da mensagem
  const msgField = document.getElementById('mensagem');
  const charCount = document.getElementById('charCount');

  if (msgField && charCount) {
    msgField.addEventListener('input', () => {
      const len = msgField.value.length;
      charCount.textContent = `${len}/1000 caracteres`;
      if (len > 900) {
        charCount.style.color = '#dc3545';
      } else {
        charCount.style.color = '';
      }
    });
  }

  // Máscara simples para telefone
  const telField = document.getElementById('telefone');
  if (telField) {
    telField.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '');
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 2) {
        v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      }
      if (v.length > 10) {
        v = v.slice(0, 10) + '-' + v.slice(10);
      }
      e.target.value = v;
    });
  }

  // Envio do formulário com validação HTML5
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Ativar validação visual do Bootstrap
    form.classList.add('was-validated');

    if (form.checkValidity()) {
      // Simula envio bem-sucedido
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Enviando...';
      btn.disabled = true;

      setTimeout(() => {
        form.reset();
        form.classList.remove('was-validated');
        btn.textContent = 'Enviar mensagem 🌿';
        btn.disabled = false;

        const successMsg = document.getElementById('successMsg');
        if (successMsg) {
          successMsg.classList.remove('d-none');
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => successMsg.classList.add('d-none'), 6000);
        }
      }, 1200);
    }
  });
}

// =============================================
// Animação de entrada para cards (Intersection Observer)
// =============================================

const animEls = document.querySelectorAll('.step-card, .feature-card, .plan-card, .impact-card, .audience-card');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}
