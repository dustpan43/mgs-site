/* ============================================================
   MGS Communications — Nav & Footer Template Engine
   Single source of truth for header + footer across all pages.
   Renders into <header id="header"></header> and <footer id="footer"></footer>.
   ============================================================ */

(function() {
  const SVG_ICONS = {
    radio: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M17 2l3-2"/><path d="M8 6h8"/>',
    camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
    wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    star: '<path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/>',
    fire: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    building: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
    menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
    email: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
    check: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
    dollar: '<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'
  };

  function icon(key, width) {
    const w = width ? ` width="${width}" height="${width}"` : '';
    return `<svg${w} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${SVG_ICONS[key] || ''}</svg>`;
  }

  const NAV_TREE = [
    { label: 'Home', href: '/' },
    { label: 'Services', toggle: true, children: [
      { label: 'Two-Way Radios', href: '/two-way-radios', icon: 'radio' },
      { label: 'Security Systems', href: '/security-systems', icon: 'camera', flyout: [
        { label: 'Video Surveillance', href: '/security-systems/video-surveillance', icon: 'camera' },
        { label: 'Fire & Burglar Alarms', href: '/security-systems/fire-alarms', icon: 'fire' },
        { label: '24/7 Monitoring', href: '/security-systems/monitoring', icon: 'clock' },
        { label: 'Access Control', href: '/security-systems/access-control', icon: 'lock' },
        { label: 'Commercial', href: '/security-systems/commercial', icon: 'building' }
      ]},
      { label: 'Service & Repairs', href: '/service-repair', icon: 'wrench' },
      { label: 'Service Areas', href: '/service-areas', icon: 'pin' }
    ]},
    { label: 'About', toggle: true, children: [
      { label: 'About Us', href: '/about-us', icon: 'user' },
      { label: 'Why Choose MGS', href: '/why-us', icon: 'star' }
    ]},
    { label: 'Resources', toggle: true, children: [
      { label: 'Community Events', href: '/events', icon: 'calendar' },
      { label: 'Guides & Articles', href: '/resources', icon: 'book' }
    ]},
    { label: 'Contact', href: '/contact' }
  ];

  function normalizePath(p) {
    if (!p) return '/';
    p = p.replace(/index\.html$/, '');
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
    return p || '/';
  }

  function isActive(href) {
    const current = normalizePath(window.location.pathname);
    const target = normalizePath(href);
    return current === target;
  }

  function isAncestorActive(href) {
    const current = normalizePath(window.location.pathname);
    const target = normalizePath(href);
    if (target === '/') return false;
    return current.startsWith(target + '/');
  }

  function anyChildActive(item) {
    if (!item.children) return false;
    return item.children.some(c => {
      if (isActive(c.href) || isAncestorActive(c.href)) return true;
      if (c.flyout) return c.flyout.some(f => isActive(f.href) || isAncestorActive(f.href));
      return false;
    });
  }

  function renderFlyoutItem(item) {
    const isItemActive = isActive(item.href) || isAncestorActive(item.href);
    const activeCls = isItemActive ? ' class="active"' : '';
    const iconHTML = item.icon ? icon(item.icon) + ' ' : '';
    return `<a href="${item.href}"${activeCls}>${iconHTML}${item.label}</a>`;
  }

  function renderDropdownItem(item) {
    const iconHTML = item.icon ? icon(item.icon) + ' ' : '';
    const isItemActive = isActive(item.href) || isAncestorActive(item.href) ||
      (item.flyout && item.flyout.some(f => isActive(f.href) || isAncestorActive(f.href)));
    const activeCls = isItemActive ? ' class="active"' : '';

    if (item.flyout) {
      return `
        <div class="nav-dropdown-nested">
          <a href="${item.href}"${activeCls}>${iconHTML}${item.label}</a>
          <div class="flyout-menu">
            ${item.flyout.map(renderFlyoutItem).join('')}
          </div>
        </div>
      `;
    }
    return `<a href="${item.href}"${activeCls}>${iconHTML}${item.label}</a>`;
  }

  function renderNavItem(item) {
    if (item.toggle && item.children) {
      const activeCls = anyChildActive(item) ? ' class="active"' : '';
      return `
        <div class="nav-dropdown">
          <a href="#"${activeCls}>${item.label}</a>
          <div class="dropdown-menu">
            ${item.children.map(renderDropdownItem).join('')}
          </div>
        </div>
      `;
    }
    const activeCls = isActive(item.href) ? ' class="active"' : '';
    return `<a href="${item.href}"${activeCls}>${item.label}</a>`;
  }

  function buildHeader() {
    const navHTML = NAV_TREE.map(renderNavItem).join('');
    return `
      <div class="header-inner">
        <a href="/" class="logo"><img src="/images/mgs-logo.png" alt="MGS Communications"></a>
        <nav class="nav" id="mainNav">
          ${navHTML}
        </nav>
        <div class="header-cta">
          <a href="/pay" class="header-pay" aria-label="Pay Invoice">Pay Invoice</a>
          <a href="tel:5058882034" class="header-phone">${icon('phone')} (505) 888-2034</a>
          <a href="#quote-form" class="btn btn-yellow">Get Free Quote</a>
          <button class="menu-toggle" id="menuToggle" aria-label="Menu">${icon('menu')}</button>
        </div>
      </div>
    `;
  }

  function isSecurityPage() {
    const p = normalizePath(window.location.pathname);
    return p === '/security-systems' || p.startsWith('/security-systems/');
  }

  function buildFooter() {
    const securityBadges = isSecurityPage() ? `
      <span class="footer-badge">${icon('check', 14)} Alarm.com</span>
      <span class="footer-badge">${icon('check', 14)} UL-Listed Monitoring</span>
    ` : '';

    return `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-about">
            <div class="footer-brand"><img src="/images/mgs-logo.png" alt="MGS Communications" loading="lazy" style="height:90px;width:auto;background:#fff;padding:6px 14px;border-radius:8px;"></div>
            <p>Albuquerque's trusted provider of two-way radios and security systems since 1996. Real people, real service, real results.</p>
            <div class="footer-badges">
              <span class="footer-badge">${icon('check', 14)} Kenwood Authorized</span>
              <span class="footer-badge">${icon('check', 14)} Motorola Dealer</span>
              ${securityBadges}
            </div>
          </div>
          <div><h4>Quick Links</h4><div class="footer-links"><a href="/">Home</a><a href="/two-way-radios">Two-Way Radios</a><a href="/security-systems">Security Systems</a><a href="/service-repair">Service &amp; Repairs</a><a href="/service-areas">Service Areas</a><a href="/pay">Pay Invoice</a></div></div>
          <div><h4>Company</h4><div class="footer-links"><a href="/about-us">About Us</a><a href="/why-us">Why Choose MGS</a><a href="/resources">Resources</a><a href="/contact">Contact &amp; Quote</a><a href="/privacy">Privacy Policy</a></div></div>
          <div>
            <h4>Contact Us</h4>
            <div class="footer-contact-item">${icon('phone')}<span><a href="tel:5058882034" style="color:inherit">(505) 888-2034</a><br>Mon&ndash;Fri 9am&ndash;5pm</span></div>
            <div class="footer-contact-item">${icon('pin')}<span>3505 Carlisle Blvd NE<br>Albuquerque, NM 87110<br><small>Office: Tue&ndash;Fri 9am&ndash;2pm</small></span></div>
            <div class="footer-contact-item">${icon('email')}<span><a href="mailto:team@mgscommunications.com" style="color:inherit">team@mgscommunications.com</a></span></div>
          </div>
        </div>
        <div class="footer-bottom"><span>&copy; 2026 MGS Communications, Inc. All rights reserved. Serving Albuquerque, Rio Rancho, Santa Fe &amp; all NM since 1996.</span></div>
      </div>
    `;
  }

  function renderHeader() {
    const el = document.getElementById('header');
    if (el) {
      el.className = 'header';
      el.innerHTML = buildHeader();
    }
  }

  function renderFooter() {
    const el = document.getElementById('footer');
    if (el) {
      el.className = 'footer';
      el.innerHTML = buildFooter();
    }
  }

  function init() {
    renderHeader();
    renderFooter();
    // Signal to main.js that nav is rendered (main.js can then safely query these elements)
    document.dispatchEvent(new CustomEvent('nav:rendered'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
