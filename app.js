(() => {
  const cfg = window.GOLDEN_SITE_CONFIG || {};
  const page = document.body.dataset.page || 'home';
  const phone = cfg.phone || '+919721998088';
  const tel = `tel:${phone.replace(/[^+\d]/g, '')}`;
  const whatsappEnabled = cfg.whatsappEnabled === true;
  const whatsapp = whatsappEnabled ? (cfg.whatsapp || `https://wa.me/${phone.replace(/\D/g, '')}`) : '#whatsapp-unverified';
  const navItems = [
    ['Buy Property', 'buy.html', 'buy'], ['Rent Property', 'rent.html', 'rent'],
    ['Sell / Lease', 'sell-lease.html', 'sell'], ['Property Management', 'property-management.html', 'management'],
    ['Areas', 'areas.html', 'areas'], ['About', 'about.html', 'about'], ['Contact', 'contact.html', 'contact']
  ];
  const logo = `<a class="brand" href="index.html" aria-label="Golden Properties and Developers home"><span class="brand-mark" aria-hidden="true">GP</span><span class="brand-name">GOLDEN PROPERTIES<small>&amp; DEVELOPERS</small></span></a>`;
  const header = document.querySelector('[data-site-header]');
  if (header) {
    header.innerHTML = `
      <div class="topbar"><div class="container topbar-inner"><span class="preview-flag">PRE-LAUNCH PREVIEW · VERIFY DETAILS BEFORE PUBLISHING</span><div class="topbar-links"><a href="contact.html">Gomti Nagar, Lucknow</a><a href="${tel}" aria-label="Call Golden Properties">+91 97219 98088</a></div></div></div>
      <div class="site-header"><div class="container nav-wrap">${logo}<nav class="nav-links" id="primary-navigation" aria-label="Primary navigation">${navItems.map(([label, href, id]) => `<a href="${href}" ${page === id ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav><div class="nav-cta"><a class="btn btn-small btn-outline" href="${tel}">Call our team</a><a class="btn btn-small" href="contact.html#enquiry">Make an enquiry</a></div><button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-expanded="false" aria-controls="primary-navigation">☰</button></div></div>`;
  }
  const footer = document.querySelector('[data-site-footer]');
  if (footer) {
    footer.innerHTML = `<footer class="footer"><div class="container"><div class="footer-grid"><div>${logo}<p>Thoughtful property guidance for buyers, tenants, owners and landlords exploring real estate in Lucknow.</p><a class="arrow-link" href="about.html" style="color:#fff">Get to know us <span>→</span></a></div><div><h3>Explore</h3><div class="footer-links"><a href="buy.html">Buy property</a><a href="rent.html">Rent property</a><a href="sell-lease.html">Sell or lease</a><a href="property-management.html">Property management</a></div></div><div><h3>Learn more</h3><div class="footer-links"><a href="areas.html">Areas we serve</a><a href="about.html">About us</a><a href="contact.html">Contact</a><a href="listing.html">Listing template</a></div></div><div><h3>Contact</h3><div class="footer-links"><a href="${tel}">+91 97219 98088</a><a href="contact.html">3/181, Vibhav Khand-3, Gomti Nagar, Lucknow, UP 226010</a><a href="contact.html#enquiry">Send an enquiry</a></div><p style="font-size:.75rem;margin-top:13px">Phone, address, and WhatsApp status are public-directory starting points and require owner confirmation.</p></div></div><div class="footer-bottom"><span>© <span id="current-year"></span> Golden Properties &amp; Developers. Preview build.</span><span><a href="privacy.html">Privacy policy</a><a href="terms.html">Terms of use</a></span></div></div></footer>`;
  }
  const mobile = document.querySelector('[data-mobile-actions]');
  if (mobile) mobile.innerHTML = `<a href="${tel}" aria-label="Call">☎ Call</a><a href="${whatsapp}" ${whatsappEnabled ? 'target="_blank" rel="noopener noreferrer"' : 'data-whatsapp-disabled="true"'} aria-label="WhatsApp">◉ WhatsApp</a><a href="contact.html#enquiry">Enquire ↗</a>`;
  document.querySelectorAll('[data-call-link]').forEach(a => a.setAttribute('href', tel));
  document.querySelectorAll('[data-whatsapp-link]').forEach(a => {
    a.setAttribute('href', whatsapp);
    if (whatsappEnabled) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener noreferrer'); }
    else a.setAttribute('data-whatsapp-disabled', 'true');
  });
  document.addEventListener('click', e => {
    const disabled = e.target.closest('[data-whatsapp-disabled]');
    if (disabled) {
      e.preventDefault();
      window.alert('WhatsApp is not activated in this preview. Confirm that the business number is WhatsApp-enabled, then set whatsappEnabled: true in site-config.js before launch.');
    }
  });
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-navigation');
  if (menuButton && nav) menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    menuButton.textContent = open ? '×' : '☰';
  });
  const year = document.querySelector('#current-year');
  if (year) year.textContent = String(new Date().getFullYear());
  document.querySelectorAll('input[type="date"]').forEach(input => {
    const today = new Date();
    const localDate = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
    input.min = localDate;
  });

  document.querySelectorAll('.faq-item button').forEach(button => button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const open = item.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
    const sign = button.querySelector('[data-faq-sign]');
    if (sign) sign.textContent = open ? '−' : '+';
  }));

  async function getListings() {
    try {
      const response = await fetch('data/listings.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('Listings feed unavailable');
      const rows = await response.json();
      return Array.isArray(rows) ? rows.filter(row => row && row.status === 'available') : [];
    } catch (_) { return []; }
  }
  const searchForms = document.querySelectorAll('[data-property-search]');
  searchForms.forEach(form => {
    const status = form.parentElement.querySelector('[data-search-status]') || document.querySelector('[data-search-status]');
    const intentSelect = form.querySelector('[name="intent"]');
    const budgetSelect = form.querySelector('[name="budget"]');
    const setBudgetChoices = () => {
      if (!intentSelect || !budgetSelect) return;
      const rental = ['rent', 'lease'].includes(intentSelect.value);
      const choices = rental
        ? [['any', 'Any budget'], ['under-10', 'Under ₹10,000 / month'], ['10-25', '₹10,000–25,000 / month'], ['25-plus', 'Above ₹25,000 / month']]
        : [['any', 'Any budget'], ['under-25', 'Under ₹25 lakh'], ['25-75', '₹25–75 lakh'], ['75-plus', 'Above ₹75 lakh']];
      const previous = budgetSelect.value;
      budgetSelect.innerHTML = choices.map(([value, label]) => `<option value="${value}">${label}</option>`).join('');
      budgetSelect.value = choices.some(([value]) => value === previous) ? previous : 'any';
    };
    if (intentSelect) { intentSelect.addEventListener('change', setBudgetChoices); setBudgetChoices(); }
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const data = new FormData(form);
      const intent = String(data.get('intent') || 'buy');
      const type = String(data.get('type') || 'any');
      const area = String(data.get('area') || '').trim().toLowerCase();
      const budget = String(data.get('budget') || 'any');
      const listings = await getListings();
      const filtered = listings.filter(item => {
        const matchIntent = item.transaction === intent || (intent === 'rent' && item.transaction === 'lease');
        const matchType = type === 'any' || item.type === type;
        const matchArea = !area || String(item.locality || '').toLowerCase().includes(area);
        const price = Number(item.price || 0);
        let matchBudget = budget === 'any';
        if (budget !== 'any' && price > 0 && ['rent', 'lease'].includes(intent)) {
          matchBudget = (budget === 'under-10' && price < 10000) || (budget === '10-25' && price >= 10000 && price <= 25000) || (budget === '25-plus' && price > 25000);
        } else if (budget !== 'any' && price > 0) {
          matchBudget = (budget === 'under-25' && price < 2500000) || (budget === '25-75' && price >= 2500000 && price <= 7500000) || (budget === '75-plus' && price > 7500000);
        }
        return matchIntent && matchType && matchArea && matchBudget;
      });
      if (status) {
        status.classList.add('show');
        if (filtered.length === 0) {
          status.innerHTML = `No matching owner-confirmed listings are published yet. We have not shown sample properties as real inventory. <a href="contact.html#enquiry" class="arrow-link">Tell us what you need <span>→</span></a>`;
        } else {
          status.innerHTML = filtered.map(item => {
            const amount = Number(item.price || 0);
            const formattedPrice = amount > 0 ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount) + (['rent', 'lease'].includes(item.transaction) ? ' / month' : '') : '';
            return `<article class="category-card"><span class="pill">${safe(item.type || 'Property')}</span><h3>${safe(item.title || 'Property enquiry')}</h3><p>${safe(item.locality || 'Location on request')}${formattedPrice ? ` · ${safe(formattedPrice)}` : ''}</p><a class="arrow-link" href="listing.html?id=${encodeURIComponent(item.id || '')}">View details <span>→</span></a></article>`;
          }).join('');
        }
      }
    });
  });

  function safe(value) { return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }

  const listingDetail = document.querySelector('[data-listing-detail]');
  if (listingDetail) {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    getListings().then(rows => {
      const item = rows.find(row => String(row.id) === String(id));
      if (!item) return;
      const amount = Number(item.price || 0);
      const priceLabel = amount > 0 ? new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount) + (['rent', 'lease'].includes(item.transaction) ? ' / month' : '') : 'Ask us';
      listingDetail.innerHTML = `<div class="listing-placeholder"><div><span class="pill">${safe(item.status || 'Available')}</span><h2 style="margin-top:18px">${safe(item.title || 'Property')}</h2><p>${safe(item.locality || 'Location on request')}</p></div></div><div class="listing-details"><span class="eyebrow">Property reference ${safe(item.id || '')}</span><h1 style="font-size:2.5rem">${safe(item.title || 'Property')}</h1><p>${safe(item.description || 'Contact the team for verified property details.')}</p><div class="grid-3">${[['Transaction',item.transaction],['Type',item.type],['Price / rent',priceLabel]].filter(x=>x[1]).map(x=>`<div><span class="small-muted">${safe(x[0])}</span><h3>${safe(x[1])}</h3></div>`).join('')}</div><a class="btn" href="contact.html#enquiry" data-listing-enquiry>Enquire about this property</a></div>`;
      const ref = document.querySelector('[name="propertyReference"]'); if (ref) ref.value = `${item.id || ''} ${item.title || ''}`.trim();
    });
  }

  document.querySelectorAll('form[data-inquiry-form]').forEach(form => {
    // Honeypot discourages basic bots; the server must still validate and rate-limit requests.
    const trap = document.createElement('div');
    trap.setAttribute('aria-hidden', 'true');
    trap.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden';
    trap.innerHTML = '<label>Leave this field empty<input name="website" type="text" tabindex="-1" autocomplete="off"></label>';
    form.prepend(trap);
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const status = form.querySelector('[data-form-status]');
      if (!form.reportValidity()) return;
      const formData = Object.fromEntries(new FormData(form).entries());
      if (formData.website) {
        if (status) { status.className = 'form-status show warn'; status.textContent = 'The enquiry could not be processed.'; }
        return;
      }
      formData.formType = form.dataset.inquiryForm || 'general';
      formData.pageUrl = location.href;
      formData.submittedAt = new Date().toISOString();
      const endpoint = form.dataset.inquiryForm === 'property' && cfg.propertyEndpoint ? cfg.propertyEndpoint : cfg.inquiryEndpoint;
      const submit = form.querySelector('button[type="submit"]');
      if (submit) { submit.disabled = true; submit.textContent = 'Submitting…'; }
      if (!endpoint) {
        if (status) {
          status.className = 'form-status show warn';
          status.innerHTML = 'This form is in preview mode. <strong>Your details have not been sent or saved.</strong> To launch, configure a secure server-side form endpoint in <code>site-config.js</code> and verify its email/CRM destination. For immediate contact, use the phone link above.';
        }
        if (submit) { submit.disabled = false; submit.textContent = submit.dataset.label || 'Submit enquiry'; }
        return;
      }
      try {
        const response = await fetch(endpoint, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(formData)});
        if (!response.ok) throw new Error('Submission failed');
        if (status) { status.className = 'form-status show good'; status.textContent = 'Your enquiry was submitted to the configured service. The business still needs to confirm any appointment or next step.'; }
        form.reset();
      } catch (_) {
        if (status) { status.className = 'form-status show warn'; status.textContent = 'We could not confirm delivery. Your enquiry may not have been sent. Please use the phone link to contact the business directly.'; }
      } finally {
        if (submit) { submit.disabled = false; submit.textContent = submit.dataset.label || 'Submit enquiry'; }
      }
    });
    const submit = form.querySelector('button[type="submit"]');
    if (submit) submit.dataset.label = submit.textContent.trim();
  });
})();
