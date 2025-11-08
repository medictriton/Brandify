// app.js — Brandify landing interactions
// Place this file next to index.html and styles.css

document.addEventListener('DOMContentLoaded', () => {
  // 1) Auto-fill copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2) Demo CTA -> friendly toast
  const demoBtn = document.getElementById('demoCta');
  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      showToast('Demo: Brandify sample loaded — check your inbox for a sample brief (demo).');
    });
  }

  // 3) Primary CTA -> scroll to contact & focus name
  const primary = document.getElementById('primaryCta');
  if (primary) {
    primary.addEventListener('click', () => {
      const contact = document.getElementById('contact');
      if (contact) contact.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const name = document.getElementById('name');
      if (name) {
        // small delay so scrolling finishes a bit
        setTimeout(() => name.focus({ preventScroll: true }), 400);
      }
    });
  }

  // 4) Simple form submission UX (no backend)
  const form = document.getElementById('contact');
  if (form) {
    const status = document.getElementById('formStatus');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (form.name.value || '').trim();
      const email = (form.email.value || '').trim();

      if (!name || !email) {
        if (status) status.textContent = 'Please enter your name and a valid email.';
        shake(status);
        return;
      }

      if (status) status.textContent = 'Sending proposal...';
      // simulated async
      setTimeout(() => {
        if (status) status.textContent = `Thanks ${name.split(' ')[0]} — we'll email you a tailored proposal within 48 hours.`;
        form.reset();
      }, 900);
    });

    // Clear button behavior
    const clearBtn = document.getElementById('clear');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        form.reset();
        if (status) {
          status.textContent = 'Form cleared.';
          setTimeout(() => (status.textContent = ''), 1800);
        }
      });
    }
  }

  // 5) Accessibility: detect first Tab press to show focus outlines
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.documentElement.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }
  window.addEventListener('keydown', handleFirstTab);

  /* ---------- helper utilities ---------- */

  // Toast helper (simple)
  function showToast(message, ttl = 4200) {
    const toast = document.createElement('div');
    toast.className = 'brandify-toast';
    toast.setAttribute('role', 'status');
    toast.style.position = 'fixed';
    toast.style.right = '20px';
    toast.style.bottom = '20px';
    toast.style.padding = '12px 16px';
    toast.style.borderRadius = '10px';
    toast.style.background = 'linear-gradient(90deg,#7c3aed,#06b6d4)';
    toast.style.color = '#041426';
    toast.style.boxShadow = '0 10px 30px rgba(2,6,23,0.6)';
    toast.style.zIndex = 9999;
    toast.style.fontWeight = 700;
    toast.textContent = message;

    document.body.appendChild(toast);
    // fade out + remove
    setTimeout(() => {
      toast.style.transition = 'opacity 400ms ease, transform 400ms ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
    }, ttl - 400);

    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, ttl);
  }

  // Small shake animation for invalid feedback (element optional)
  function shake(el) {
    if (!el) return;
    el.style.transition = 'transform 70ms ease';
    el.style.transform = 'translateX(-6px)';
    setTimeout(() => (el.style.transform = 'translateX(6px)'), 70);
    setTimeout(() => (el.style.transform = 'translateX(0)'), 140);
  }
});
