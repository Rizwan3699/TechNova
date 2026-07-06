/* ==========================================================================
   TechNova Solutions — Shared Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loading screen ---------- */
  const loader = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hide'), 400);
  });
  setTimeout(() => loader && loader.classList.add('hide'), 2200); // failsafe

  /* ---------- Sticky header + scroll progress ---------- */
  const header = document.querySelector('.site-header');
  const progressBar = document.getElementById('scroll-progress');
  const backToTop = document.querySelector('.back-to-top');

  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (backToTop) backToTop.classList.toggle('show', y > 500);
    if (progressBar) {
      const h = document.documentElement;
      const pct = (y / (h.scrollHeight - h.clientHeight)) * 100;
      progressBar.style.width = pct + '%';
    }
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop && backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const navMain = document.querySelector('.nav-main');
  navToggle && navToggle.addEventListener('click', () => {
    navMain.classList.toggle('mobile-open');
    navToggle.setAttribute('aria-expanded', navMain.classList.contains('mobile-open'));
  });

  /* ---------- Dark mode toggle ---------- */
  const themeToggle = document.querySelector('.theme-toggle');
  const root = document.documentElement;
  const saved = localStorage.getItem('technova-theme');
  if (saved) root.setAttribute('data-theme', saved);
  themeToggle && themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('technova-theme', isDark ? 'light' : 'dark');
  });

  /* ---------- Site-wide search ---------- */
  const SEARCH_INDEX = [
    { tag: 'Page', title: 'About Us', desc: 'Our story, mission, vision and leadership.', url: 'about.html' },
    { tag: 'Page', title: 'Services', desc: 'Explore our full enterprise IT service catalogue.', url: 'services.html' },
    { tag: 'Page', title: 'Industries', desc: 'Sectors we deliver transformation for.', url: 'industries.html' },
    { tag: 'Page', title: 'Careers', desc: 'Open roles and life at TechNova.', url: 'careers.html' },
    { tag: 'Page', title: 'Contact', desc: 'Get in touch with our team.', url: 'contact.html' },
    { tag: 'Service', title: 'Custom Software Development', desc: 'Tailored platforms engineered around your workflows.', url: 'services.html#custom-software' },
    { tag: 'Service', title: 'Web Development', desc: 'High-performance, scalable web applications.', url: 'services.html#web-development' },
    { tag: 'Service', title: 'Mobile App Development', desc: 'Native and cross-platform mobile experiences.', url: 'services.html#mobile-apps' },
    { tag: 'Service', title: 'Cloud Solutions', desc: 'Migration, architecture and managed cloud operations.', url: 'services.html#cloud' },
    { tag: 'Service', title: 'Microsoft Power Platform', desc: 'Low-code apps, workflows and automation.', url: 'services.html#power-platform' },
    { tag: 'Service', title: 'Power BI', desc: 'Enterprise analytics and interactive dashboards.', url: 'services.html#power-bi' },
    { tag: 'Service', title: 'SharePoint', desc: 'Intranets, document management and collaboration.', url: 'services.html#sharepoint' },
    { tag: 'Service', title: 'AI & Automation', desc: 'Intelligent automation and applied machine learning.', url: 'services.html#ai-automation' },
    { tag: 'Service', title: 'Cyber Security', desc: 'Threat protection, audits and compliance.', url: 'services.html#cyber-security' },
    { tag: 'Service', title: 'Data Analytics', desc: 'Turning raw data into decisions.', url: 'services.html#data-analytics' },
    { tag: 'Service', title: 'DevOps', desc: 'CI/CD, infrastructure automation and reliability.', url: 'services.html#devops' },
    { tag: 'Service', title: 'UI/UX Design', desc: 'Research-driven product design.', url: 'services.html#ui-ux' },
    { tag: 'Service', title: 'CRM Development', desc: 'Customer platforms that scale with you.', url: 'services.html#crm' },
    { tag: 'Service', title: 'ERP Solutions', desc: 'Unified operations across your business.', url: 'services.html#erp' },
    { tag: 'Service', title: 'API Development', desc: 'Secure, well-documented integrations.', url: 'services.html#api' },
    { tag: 'Service', title: 'Maintenance & Support', desc: '24/7 monitoring and continuous improvement.', url: 'services.html#support' },
    { tag: 'Industry', title: 'Healthcare', desc: 'Digital health platforms and compliance.', url: 'industries.html#healthcare' },
    { tag: 'Industry', title: 'Banking', desc: 'Secure, resilient financial systems.', url: 'industries.html#banking' },
    { tag: 'Industry', title: 'Education', desc: 'Learning platforms and campus systems.', url: 'industries.html#education' },
    { tag: 'Industry', title: 'Manufacturing', desc: 'Smart factory and supply chain systems.', url: 'industries.html#manufacturing' },
    { tag: 'Industry', title: 'Retail', desc: 'Omnichannel commerce experiences.', url: 'industries.html#retail' },
    { tag: 'Industry', title: 'Government', desc: 'Citizen services and digital infrastructure.', url: 'industries.html#government' },
    { tag: 'Industry', title: 'Logistics', desc: 'Fleet, warehouse and route optimisation.', url: 'industries.html#logistics' },
    { tag: 'Industry', title: 'Construction', desc: 'Project management and site digitisation.', url: 'industries.html#construction' },
    { tag: 'Industry', title: 'Real Estate', desc: 'Property management and PropTech.', url: 'industries.html#real-estate' },
    { tag: 'Industry', title: 'Telecommunication', desc: 'Network operations and billing systems.', url: 'industries.html#telecom' },
    { tag: 'Industry', title: 'Insurance', desc: 'Claims automation and underwriting tools.', url: 'industries.html#insurance' },
    { tag: 'Industry', title: 'Automotive', desc: 'Connected vehicle and dealer platforms.', url: 'industries.html#automotive' },
    { tag: 'Technology', title: 'Microsoft Azure', desc: 'Cloud infrastructure and services.', url: 'services.html#cloud' },
    { tag: 'Technology', title: '.NET', desc: 'Enterprise application framework.', url: 'services.html#custom-software' },
    { tag: 'Technology', title: 'React', desc: 'Front-end application framework.', url: 'services.html#web-development' },
    { tag: 'Technology', title: 'AWS', desc: 'Cloud infrastructure and services.', url: 'services.html#cloud' },
    { tag: 'Blog', title: 'The Future of Enterprise AI Adoption', desc: 'How mid-market firms are operationalising AI in 2026.', url: 'blog.html#ai-adoption' },
    { tag: 'Blog', title: 'Zero Trust: Beyond the Buzzword', desc: 'A practical roadmap to zero trust security.', url: 'blog.html#zero-trust' },
    { tag: 'Blog', title: 'Power BI vs Traditional BI Tools', desc: 'Choosing the right analytics stack.', url: 'blog.html#power-bi-guide' },
    { tag: 'Career', title: 'Senior .NET Engineer', desc: 'Pune · Full-time · Engineering', url: 'careers.html#jobs' },
    { tag: 'Career', title: 'Cloud Solutions Architect', desc: 'Remote · Full-time · Cloud', url: 'careers.html#jobs' },
    { tag: 'Career', title: 'Product Designer', desc: 'Pune · Full-time · Design', url: 'careers.html#jobs' },
    { tag: 'Project', title: 'MediCore Hospital Network Platform', desc: 'Unified patient records across 40 facilities.', url: 'portfolio.html#medicore' },
    { tag: 'Project', title: 'NorthBank Digital Transformation', desc: 'Core banking modernisation programme.', url: 'portfolio.html#northbank' },
    { tag: 'Contact', title: 'Pune Head Office', desc: 'alskdjflasdjf', url: 'contact.html' },
    { tag: 'Contact', title: 'Phone & Email', desc: '+91 20 1234 5678 · hello@technovasolutions.com', url: 'contact.html' },
  ];

  const searchOverlay = document.querySelector('.search-overlay');
  const searchInput = document.querySelector('.search-input-row input');
  const searchResults = document.querySelector('.search-results');
  const openSearchBtns = document.querySelectorAll('[data-search-open]');
  const closeSearchBtn = document.querySelector('.search-close');

  function renderResults(query){
    if (!searchResults) return;
    const q = query.trim().toLowerCase();
    if (!q){ searchResults.innerHTML = '<div class="search-empty">Start typing to search services, industries, blog posts, careers and more…</div>'; return; }
    const matches = SEARCH_INDEX.filter(i => (i.title + i.desc + i.tag).toLowerCase().includes(q)).slice(0, 8);
    if (!matches.length){ searchResults.innerHTML = `<div class="search-empty">No results for "${query}". Try "cloud", "healthcare" or "careers".</div>`; return; }
    searchResults.innerHTML = matches.map(m => `
      <a class="search-result" href="${m.url}">
        <span class="tag">${m.tag}</span>
        <h4>${m.title}</h4>
        <p>${m.desc}</p>
      </a>`).join('');
  }

  function openSearch(){
    searchOverlay && searchOverlay.classList.add('open');
    renderResults('');
    setTimeout(() => searchInput && searchInput.focus(), 150);
  }
  function closeSearch(){ searchOverlay && searchOverlay.classList.remove('open'); if(searchInput) searchInput.value=''; }

  openSearchBtns.forEach(b => b.addEventListener('click', openSearch));
  closeSearchBtn && closeSearchBtn.addEventListener('click', closeSearch);
  searchOverlay && searchOverlay.addEventListener('click', e => { if (e.target === searchOverlay) closeSearch(); });
  searchInput && searchInput.addEventListener('input', e => renderResults(e.target.value));
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k'){ e.preventDefault(); openSearch(); }
    if (e.key === 'Escape') closeSearch();
  });

  /* ---------- Hero slider ---------- */
  const slider = document.querySelector('.hero-slider');
  if (slider){
    const slides = [...slider.querySelectorAll('.slide')];
    const dotsWrap = slider.querySelector('.progress-dots');
    const titleEl = slider.querySelector('.slide-title');
    const playPauseBtn = slider.querySelector('.js-playpause');
    let idx = 0, timer = null, playing = true, DURATION = 5000;

    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Go to slide ${i+1}`);
      b.innerHTML = '<span class="fill"></span>';
      b.addEventListener('click', () => go(i));
      dotsWrap.appendChild(b);
    });
    const dots = [...dotsWrap.children];

    function render(){
      slides.forEach((s,i) => s.classList.toggle('active', i===idx));
      dots.forEach((d,i) => d.classList.toggle('active', i===idx));
      titleEl.textContent = slides[idx].dataset.title || '';
    }
    function go(i){ idx = (i + slides.length) % slides.length; render(); restart(); }
    function next(){ go(idx+1); }
    function prev(){ go(idx-1); }
    function restart(){
      clearTimeout(timer);
      if (!playing) return;
      timer = setTimeout(next, DURATION);
    }
    function setPlaying(p){
      playing = p;
      dots[idx] && dots[idx].classList.toggle('paused', !playing);
      if (playPauseBtn) playPauseBtn.innerHTML = playing
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg>';
      playing ? restart() : clearTimeout(timer);
    }

    slider.querySelector('.js-next').addEventListener('click', next);
    slider.querySelector('.js-prev').addEventListener('click', prev);
    playPauseBtn.addEventListener('click', () => setPlaying(!playing));

    // keyboard
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === ' '){ e.preventDefault(); setPlaying(!playing); }
    });

    // touch swipe
    let touchX = null;
    slider.addEventListener('touchstart', e => touchX = e.touches[0].clientX, {passive:true});
    slider.addEventListener('touchend', e => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
      touchX = null;
    }, {passive:true});

    render();
    restart();
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.num[data-count]');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1800;
      const start = performance.now();
      function tick(now){
        const p = Math.min((now-start)/dur, 1);
        const eased = 1 - Math.pow(1-p, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (p < 1) requestAnimationFrame(tick); else el.textContent = target + suffix;
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-zoom');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); revealObserver.unobserve(e.target); } });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Portfolio filter + lightbox ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pItems = document.querySelectorAll('.p-item');
  filterBtns.forEach(btn => btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    pItems.forEach(item => {
      const show = f === 'all' || item.dataset.cat === f;
      item.style.display = show ? '' : 'none';
    });
  }));

  const lightbox = document.querySelector('.lightbox');
  if (lightbox){
    const lbImg = lightbox.querySelector('img');
    const lbCat = lightbox.querySelector('.cat');
    const lbTitle = lightbox.querySelector('h3');
    const lbDesc = lightbox.querySelector('p');
    pItems.forEach(item => item.addEventListener('click', () => {
      lbImg.src = item.querySelector('img').src;
      lbCat.textContent = item.dataset.cat;
      lbTitle.textContent = item.dataset.title;
      lbDesc.textContent = item.dataset.desc;
      lightbox.classList.add('open');
    }));
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.classList.remove('open'));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  }

  /* ---------- Testimonial slider ---------- */
  const testiWrap = document.querySelector('.testi-slider');
  if (testiWrap){
    const tSlides = [...testiWrap.querySelectorAll('.testi-slide')];
    const tDotsWrap = document.querySelector('.testi-dots');
    tSlides.forEach((_, i) => {
      const b = document.createElement('button');
      b.addEventListener('click', () => showTesti(i));
      tDotsWrap.appendChild(b);
    });
    const tDots = [...tDotsWrap.children];
    let tIdx = 0;
    function showTesti(i){
      tIdx = (i + tSlides.length) % tSlides.length;
      tSlides.forEach((s, j) => s.classList.toggle('active', j === tIdx));
      tDots.forEach((d, j) => d.classList.toggle('active', j === tIdx));
    }
    showTesti(0);
    setInterval(() => showTesti(tIdx+1), 6000);
  }

  /* ---------- Chat widget ---------- */
  const chatToggle = document.querySelector('.chat-toggle');
  const chatPanel = document.querySelector('.chat-panel');
  chatToggle && chatToggle.addEventListener('click', () => chatPanel.classList.toggle('open'));

  /* ---------- Typing animation ---------- */
  const typingEl = document.querySelector('.typing');
  if (typingEl){
    const words = JSON.parse(typingEl.dataset.words || '[]');
    let wi = 0, ci = 0, deleting = false;
    function type(){
      const word = words[wi];
      ci += deleting ? -1 : 1;
      typingEl.textContent = word.slice(0, ci);
      let delay = deleting ? 45 : 90;
      if (!deleting && ci === word.length){ delay = 1500; deleting = true; }
      else if (deleting && ci === 0){ deleting = false; wi = (wi+1) % words.length; delay = 300; }
      setTimeout(type, delay);
    }
    type();
  }

  /* ---------- Industry accordion (expand tags on mobile tap) ---------- */
  document.querySelectorAll('.industry-row').forEach(row => {
    row.addEventListener('click', () => row.classList.toggle('open'));
  });

  /* ---------- Set active nav link ---------- */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-main a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
  if (path === 'index.html' || path === '') document.body.classList.add('is-home');

});
