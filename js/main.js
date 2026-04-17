/* ============================================================
   MGS Communications — Shared JavaScript
   Runs on every page. Non-nav bindings run immediately; nav
   bindings wait for nav.js to render the header.
   ============================================================ */

// ----- Runs immediately (doesn't depend on rendered nav) -----

// Header scroll shadow — #header element exists as empty shell in HTML
window.addEventListener('scroll', () => {
  const h = document.getElementById('header');
  if (h) h.classList.toggle('scrolled', window.scrollY > 10);
});

// Exit-intent popup (only runs on pages that have the popup element)
const exitPopup = document.getElementById('exitPopup');
if (exitPopup) {
  let popupShown = false;
  let popupReady = false;
  var lastDismissed = null;
  try { lastDismissed = localStorage.getItem('mgs_popup_dismissed'); } catch(e) {}
  const cooldownExpired = !lastDismissed || (Date.now() - Number(lastDismissed)) > (3 * 24 * 60 * 60 * 1000);
  if (cooldownExpired) { setTimeout(() => { popupReady = true; }, 15000); }

  function dismissPopup() {
    exitPopup.classList.remove('active');
    try { localStorage.setItem('mgs_popup_dismissed', Date.now().toString()); } catch(e) {}
  }

  document.addEventListener('mouseout', (e) => {
    if (!popupShown && popupReady && e.clientY < 5 && e.relatedTarget === null) {
      exitPopup.classList.add('active');
      popupShown = true;
    }
  });

  const popupCloseBtn = document.getElementById('popupClose');
  if (popupCloseBtn) popupCloseBtn.addEventListener('click', dismissPopup);
  exitPopup.addEventListener('click', (e) => { if (e.target === e.currentTarget) dismissPopup(); });
}

// Netlify form AJAX submission
document.querySelectorAll('form[data-netlify="true"]').forEach(form => {
  form.addEventListener('submit', function(e) {
    const btn = form.querySelector('button[type="submit"]');
    const origText = btn.textContent;
    e.preventDefault();
    const formData = new FormData(form);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      btn.textContent = "Sent! We'll call you soon.";
      btn.style.background = '#4CAF50';
      btn.disabled = true;
      form.reset();
      setTimeout(() => {
        btn.textContent = origText;
        btn.style.background = '';
        btn.disabled = false;
        if (form.name === 'popup-quote' && exitPopup) exitPopup.classList.remove('active');
      }, 3000);
    })
    .catch(() => {
      btn.textContent = 'Error — please call us!';
      btn.style.background = '#c62828';
      setTimeout(() => {
        btn.textContent = origText;
        btn.style.background = '';
        btn.disabled = false;
      }, 3000);
    });
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href === '#' || href === '#!') return; // toggle-only anchors, don't scroll
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Phone number auto-format — backspace-safe (skips reformatting on delete
// so users don't get stuck on ')' or '-' characters)
document.querySelectorAll('input[type="tel"], input[name="phone"]').forEach(phoneInput => {
  let prevPhoneLen = 0;
  phoneInput.addEventListener('input', function(e) {
    const raw = e.target.value.replace(/\D/g, '').substring(0, 10);
    if (e.target.value.length < prevPhoneLen) {
      prevPhoneLen = e.target.value.length;
      return;
    }
    let formatted = '';
    if (raw.length > 0) formatted = '(' + raw.substring(0, 3);
    if (raw.length >= 3) formatted += ') ' + raw.substring(3, 6);
    if (raw.length >= 6) formatted += '-' + raw.substring(6, 10);
    e.target.value = formatted;
    prevPhoneLen = formatted.length;
  });
});

// ----- Runs after nav.js has rendered the header -----

function bindNavListeners() {
  const mainNav = document.getElementById('mainNav');
  const menuToggle = document.getElementById('menuToggle');
  if (!mainNav || !menuToggle) return;

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => mainNav.classList.toggle('open'));

  // Close mobile nav when a leaf link is clicked (not toggle-parents)
  document.querySelectorAll('#mainNav a').forEach(a => {
    const parent = a.parentElement;
    // Skip top-level dropdown toggle (Services, About, Resources)
    if (parent.classList.contains('nav-dropdown')) return;
    // Skip nested flyout toggle (Security Systems)
    if (parent.classList.contains('nav-dropdown-nested')) return;
    a.addEventListener('click', () => mainNav.classList.remove('open'));
  });

  // Prevent default on toggle-only dropdown parents (href="#")
  document.querySelectorAll('.nav-dropdown > a[href="#"]').forEach(a => {
    a.addEventListener('click', (e) => e.preventDefault());
  });

  // Mobile: top-level dropdown accordion (Services / About / Resources)
  document.querySelectorAll('.nav-dropdown > a').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        this.parentElement.classList.toggle('dropdown-open');
      }
    });
  });

  // Mobile: nested flyout accordion (Security Systems sub-pages)
  document.querySelectorAll('.nav-dropdown-nested > a').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        this.parentElement.classList.toggle('flyout-open');
      }
    });
  });
}

// Bind nav listeners once the nav is rendered
if (document.getElementById('mainNav')) {
  bindNavListeners();
} else {
  document.addEventListener('nav:rendered', bindNavListeners, { once: true });
}
