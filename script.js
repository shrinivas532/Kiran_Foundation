/* ═══════════════════════════════════════════
   KIRAN Foundation — Main Script
   Loads content from /content/*.json (Decap CMS)
   Falls back to hardcoded data if fetch fails
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // ════════════════════════════════════════
  // FALLBACK DATA — used until CMS content loads
  // ════════════════════════════════════════

  var galleryColors = ['#2E4057', '#3A5A7C', '#4A6F8A', '#5B8498', '#3D5A6E', '#2C4A5E'];

  var galleryItems = [
    { image: '', caption_en: 'Cricket Tournament 2026', caption_kn: 'ಕ್ರಿಕೆಟ್ ಪಂದ್ಯಾವಳಿ 2026' },
    { image: '', caption_en: 'Digital Literacy Workshop', caption_kn: 'ಡಿಜಿಟಲ್ ಸಾಕ್ಷರತೆ ಕಾರ್ಯಾಗಾರ' },
    { image: '', caption_en: 'Women Empowerment Camp', caption_kn: 'ಮಹಿಳಾ ಸಬಲೀಕರಣ ಶಿಬಿರ' },
    { image: '', caption_en: 'Job Fair 2026', caption_kn: 'ಉದ್ಯೋಗ ಮೇಳ 2026' },
    { image: '', caption_en: 'Vocational Training Session', caption_kn: 'ವೃತ್ತಿಪರ ತರಬೇತಿ ಅಧಿವೇಶನ' },
    { image: '', caption_en: 'Community Outreach', caption_kn: 'ಸಮುದಾಯ ಸಂಪರ್ಕ' }
  ];

  var podcastEpisodes = [];

  var videos = [
    { youtube_id: 'PASTE_YOUTUBE_VIDEO_ID', title_en: 'Job Fair Highlights', title_kn: 'ಉದ್ಯೋಗ ಮೇಳ ಮುಖ್ಯಾಂಶಗಳು',
      description_en: 'Highlights from our annual job fair connecting youth with employers.', description_kn: 'ಯುವಕರನ್ನು ಉದ್ಯೋಗದಾತರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವ ನಮ್ಮ ವಾರ್ಷಿಕ ಉದ್ಯೋಗ ಮೇಳದ ಮುಖ್ಯಾಂಶಗಳು.' },
    { youtube_id: 'PASTE_YOUTUBE_VIDEO_ID', title_en: 'Digital Literacy Program', title_kn: 'ಡಿಜಿಟಲ್ ಸಾಕ್ಷರತೆ ಕಾರ್ಯಕ್ರಮ',
      description_en: 'Watch our youth learn essential computer and internet skills.', description_kn: 'ನಮ್ಮ ಯುವಕರು ಅಗತ್ಯ ಕಂಪ್ಯೂಟರ್ ಮತ್ತು ಇಂಟರ್ನೆಟ್ ಕೌಶಲ್ಯಗಳನ್ನು ಕಲಿಯುವುದನ್ನು ವೀಕ್ಷಿಸಿ.' }
  ];

  var stories = [];
  var teamData = {};
  var aboutData = {};
  var activeGalleryFilter = 'all';

  var pressItems = [
    { outlet_name: 'Placeholder News Outlet', headline_en: 'KIRAN Foundation launches digital literacy drive in Kudachi', headline_kn: 'ಕಿರಣ ಫೌಂಡೇಶನ್ ಕುಡಚಿಯಲ್ಲಿ ಡಿಜಿಟಲ್ ಸಾಕ್ಷರತೆ ಅಭಿಯಾನ ಪ್ರಾರಂಭಿಸಿದೆ',
      date: '2026-06-01', article_url: '' },
    { outlet_name: 'Placeholder News Outlet', headline_en: 'Youth employment fair draws 200+ participants in Raibag Taluk', headline_kn: 'ರಾಯಬಾಗ ತಾಲ್ಲೂಕಿನಲ್ಲಿ ಯುವ ಉದ್ಯೋಗ ಮೇಳ 200+ ಭಾಗವಹಿಸುವವರನ್ನು ಆಕರ್ಷಿಸಿದೆ',
      date: '2026-05-15', article_url: '' }
  ];


  // ════════════════════════════════════════
  // LANGUAGE TOGGLE
  // ════════════════════════════════════════

  var LANG_KEY = 'kiran-lang';

  function setLanguage(lang) {
    document.body.setAttribute('data-lang', lang);
    document.querySelectorAll('[data-en][data-kn]').forEach(function (el) {
      el.textContent = el.getAttribute('data-' + lang);
      el.style.fontFamily = lang === 'kn' ? "'Noto Sans Kannada', sans-serif" : '';
    });

    document.querySelectorAll('[data-placeholder-en][data-placeholder-kn]').forEach(function (el) {
      el.placeholder = el.getAttribute('data-placeholder-' + lang);
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    localStorage.setItem(LANG_KEY, lang);

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      document.querySelectorAll('.tts-btn.speaking').forEach(function (b) { b.classList.remove('speaking'); });
    }

    renderAll();
  }

  function getCurrentLang() {
    return document.body.getAttribute('data-lang') || 'en';
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { setLanguage(btn.getAttribute('data-lang')); });
  });


  // ════════════════════════════════════════
  // NAV DROPDOWN
  // ════════════════════════════════════════

  var navDropdown = document.querySelector('.nav-dropdown');
  if (navDropdown) {
    var dropBtn = navDropdown.querySelector('.nav-dropdown-btn');
    dropBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = navDropdown.classList.toggle('open');
      dropBtn.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', function (e) {
      if (!navDropdown.contains(e.target)) {
        navDropdown.classList.remove('open');
        dropBtn.setAttribute('aria-expanded', 'false');
      }
    });
    navDropdown.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navDropdown.classList.remove('open');
        dropBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }


  // ════════════════════════════════════════
  // MOBILE HAMBURGER MENU
  // ════════════════════════════════════════

  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.getElementById('mobile-menu');
  var mobileClose = mobileMenu.querySelector('.mobile-menu-close');

  function openMobileMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    mobileClose.focus();
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    if (mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileClose.addEventListener('click', closeMobileMenu);

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });


  // ════════════════════════════════════════
  // SMOOTH SCROLL
  // ════════════════════════════════════════

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      if (this.hasAttribute('data-open-modal')) return;
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  // ════════════════════════════════════════
  // ACTIVE NAV (IntersectionObserver)
  // ════════════════════════════════════════

  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a[href^="#"], .nav-dropdown-menu a[href^="#"], .mobile-menu a[href^="#"]');

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { root: null, rootMargin: '-20% 0px -60% 0px', threshold: 0 });

  sections.forEach(function (sec) { sectionObserver.observe(sec); });


  // ════════════════════════════════════════
  // MODAL SYSTEM
  // ════════════════════════════════════════

  var activeModalId = null;
  var lastFocused = null;

  function openModal(modalId) {
    var overlay = document.getElementById(modalId);
    if (!overlay) return;
    lastFocused = document.activeElement;
    activeModalId = modalId;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    var closeBtn = overlay.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
    trapFocus(overlay.querySelector('.modal'));
  }

  function closeActiveModal() {
    if (!activeModalId) return;
    var overlay = document.getElementById(activeModalId);
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (activeModalId === 'video-modal') {
      var container = document.getElementById('video-embed-container');
      if (container) container.innerHTML = '';
    }
    if (lastFocused) lastFocused.focus();
    activeModalId = null;
  }

  document.querySelectorAll('[data-open-modal]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      closeMobileMenu();
      openModal(this.getAttribute('data-open-modal') + '-modal');
    });
  });

  document.querySelectorAll('.modal-close').forEach(function (btn) {
    btn.addEventListener('click', closeActiveModal);
  });

  document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeActiveModal();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && activeModalId) closeActiveModal();
  });

  function trapFocus(container) {
    if (!container) return;
    var focusables = container.querySelectorAll(
      'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])'
    );
    if (focusables.length === 0) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    container.addEventListener('keydown', function handler(e) {
      if (e.key !== 'Tab') return;
      if (!activeModalId) { container.removeEventListener('keydown', handler); return; }
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }


  // ════════════════════════════════════════
  // PILLAR PANELS (Vision section)
  // ════════════════════════════════════════

  var pillarData = {
    knowledge: {
      photo: '/assets/uploads/ambedkar.jpg', initials: 'BA',
      quote_en: 'Educate, Agitate, Organise.', quote_kn: 'ಶಿಕ್ಷಣ, ಹೋರಾಟ, ಸಂಘಟನೆ.',
      attr_en: '— Dr. B.R. Ambedkar', attr_kn: '— ಡಾ. ಬಿ.ಆರ್. ಅಂಬೇಡ್ಕರ್',
      heading_en: 'Knowledge is not a luxury. It is a right.', heading_kn: 'ಜ್ಞಾನ ಐಶ್ವರ್ಯವಲ್ಲ. ಅದು ಹಕ್ಕು.',
      body_en: 'In Kudachi\'s villages, thousands of young people carry real ability — but without access to the right information, the right skills, the right connections, that ability stays locked inside them. KIRAN Foundation exists to break that lock. When a young person from a small village understands their rights, knows their skills, and has a clear path forward — they do not just change their own life. They become a teacher, a role model, an anchor for everyone around them.',
      body_kn: 'ಕುಡಚಿಯ ಗ್ರಾಮಗಳಲ್ಲಿ ಸಾವಿರಾರು ಯುವಕ-ಯುವತಿಯರಲ್ಲಿ ನಿಜವಾದ ಸಾಮರ್ಥ್ಯವಿದೆ — ಆದರೆ ಸರಿಯಾದ ಮಾಹಿತಿ, ಕೌಶಲ್ಯ ಮತ್ತು ಸಂಪರ್ಕಗಳಿಲ್ಲದೆ ಆ ಸಾಮರ್ಥ್ಯ ಅವರಲ್ಲೇ ಬಂಧಿಯಾಗಿ ಉಳಿದಿದೆ. ಕಿರಣ್ ಫೌಂಡೇಶನ್ ಆ ಬೀಗವನ್ನು ತೆರೆಯಲು ಇದೆ. ಒಬ್ಬ ಯುವಕ ತನ್ನ ಹಕ್ಕುಗಳನ್ನು ಅರಿತಾಗ, ತನ್ನ ಕೌಶಲ್ಯ ತಿಳಿದಾಗ, ಸ್ಪಷ್ಟ ದಾರಿ ಕಂಡಾಗ — ಅವರು ಬರೀ ತಮ್ಮ ಜೀವನ ಬದಲಾಯಿಸುವುದಿಲ್ಲ. ಸುತ್ತಮುತ್ತಲಿನ ಎಲ್ಲರಿಗೂ ಆದರ್ಶವಾಗುತ್ತಾರೆ.',
      callout_h_en: 'What this means in practice', callout_h_kn: 'ಇದು ಪ್ರಾಯೋಗಿಕವಾಗಿ ಏನೆಂದರೆ',
      callout_b_en: 'Every household survey we run, every skill camp we hold, every competitive exam batch we start — these are acts of knowledge transfer. We are not giving anyone charity. We are giving them what was always theirs: information and access.',
      callout_b_kn: 'ನಾವು ನಡೆಸುವ ಪ್ರತಿ ಮನೆ ಮನೆ ಸಮೀಕ್ಷೆ, ಪ್ರತಿ ಕೌಶಲ್ಯ ಶಿಬಿರ, ಪ್ರತಿ ಸ್ಪರ್ಧಾ ಪರೀಕ್ಷಾ ಬ್ಯಾಚ್ — ಇವು ಜ್ಞಾನ ವರ್ಗಾವಣೆಯ ಕ್ರಿಯೆಗಳು. ನಾವು ಯಾರಿಗೂ ದಾನ ನೀಡುತ್ತಿಲ್ಲ. ಅವರದ್ದೇ ಆದದ್ದನ್ನು — ಮಾಹಿತಿ ಮತ್ತು ಪ್ರವೇಶ — ಅವರಿಗೆ ಹಿಂದಿರುಗಿಸುತ್ತಿದ್ದೇವೆ.',
      pull_en: 'We do not bring answers. We bring the tools to find them.', pull_kn: 'ನಾವು ಉತ್ತರಗಳನ್ನು ತರುವುದಿಲ್ಲ. ಉತ್ತರ ಹುಡುಕುವ ಸಾಧನಗಳನ್ನು ತರುತ್ತೇವೆ.'
    },
    innovation: {
      photo: '/assets/uploads/kalam.jpg', initials: 'AK',
      quote_en: 'Out of box thinking is the need of the hour for village development.', quote_kn: 'ಗ್ರಾಮ ಅಭಿವೃದ್ಧಿಗೆ ಹೊಸ ಚಿಂತನೆ ಇಂದಿನ ಅಗತ್ಯ.',
      attr_en: '— Dr. A.P.J. Abdul Kalam', attr_kn: '— ಡಾ. ಎ.ಪಿ.ಜೆ. ಅಬ್ದುಲ್ ಕಲಾಂ',
      heading_en: 'The solution is removing distance, not adding complexity.', heading_kn: 'ಪರಿಹಾರ ದೂರ ಕಡಿಮೆ ಮಾಡುವುದು, ಸಂಕೀರ್ಣತೆ ಹೆಚ್ಚಿಸುವುದಲ್ಲ.',
      body_en: 'Every problem in Kudachi\'s villages has been discussed for decades. Roads, water, employment, migration to cities. The discussions are not the shortage — working solutions at the ground level are. KIRAN Foundation does not believe in waiting for the government to solve problems we can start solving today. We connect local youth directly to local institutions — colleges, dairy cooperatives, small businesses, Bangalore and Pune employers who are actively looking for exactly the kind of people our constituency has. The innovation is not in technology. It is in removing the distance between a young person with a skill and an employer who needs it.',
      body_kn: 'ಕುಡಚಿ ಗ್ರಾಮಗಳ ಪ್ರತಿ ಸಮಸ್ಯೆ ದಶಕಗಳಿಂದ ಚರ್ಚೆಯಾಗಿದೆ. ರಸ್ತೆ, ನೀರು, ಉದ್ಯೋಗ, ನಗರಕ್ಕೆ ವಲಸೆ. ಕೊರತೆ ಚರ್ಚೆಯಲ್ಲಿಲ್ಲ — ಕ್ಷೇತ್ರ ಮಟ್ಟದಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಪರಿಹಾರಗಳಲ್ಲಿದೆ. ನಾವು ಇಂದು ಪರಿಹರಿಸಬಹುದಾದ ಸಮಸ್ಯೆಗೆ ಸರ್ಕಾರದ ನಿರೀಕ್ಷೆಯಲ್ಲಿ ಕಾಯುವುದನ್ನು ನಂಬುವುದಿಲ್ಲ.',
      callout_h_en: 'The one thing that makes the biggest difference', callout_h_kn: 'ಅತಿ ಹೆಚ್ಚು ವ್ಯತ್ಯಾಸ ತರುವ ಒಂದು ವಿಷಯ',
      callout_b_en: 'Take one unemployed youth. Train them for 60 days. Connect them to a job. They send money home. A younger sibling sees this and dares to aspire. That sibling becomes the next person we train. This is how one village changes — not through one big intervention, but through dozens of small ones that reinforce each other.',
      callout_b_kn: 'ಒಬ್ಬ ನಿರುದ್ಯೋಗಿ ಯುವಕ. 60 ದಿನ ತರಬೇತಿ. ಉದ್ಯೋಗ ಸಂಪರ್ಕ. ಮನೆಗೆ ಹಣ ಕಳಿಸುತ್ತಾರೆ. ತಮ್ಮ ಅಥವಾ ತಂಗಿ ಇದನ್ನು ನೋಡಿ ಆಕಾಂಕ್ಷೆ ಪಡೆಯುತ್ತಾರೆ. ಇದೇ ಆ ಚಕ್ರ.',
      pull_en: 'The distance between a skilled youth and a waiting employer is the only problem we are here to solve.', pull_kn: 'ಕೌಶಲ್ಯವಂತ ಯುವಕ ಮತ್ತು ಕಾಯುತ್ತಿರುವ ಉದ್ಯೋಗದಾತರ ನಡುವಿನ ಅಂತರ ಕಡಿಮೆ ಮಾಡಲು ನಾವಿದ್ದೇವೆ.'
    },
    reform: {
      photo: '/assets/uploads/ambedkar.jpg', initials: 'BA',
      quote_en: 'A great man is different from an eminent one in that he is ready to be the servant of society.', quote_kn: 'ಶ್ರೇಷ್ಠ ವ್ಯಕ್ತಿ ಸಮಾಜದ ಸೇವಕನಾಗಲು ಸಿದ್ಧನಾಗಿರುತ್ತಾನೆ.',
      attr_en: '— Dr. B.R. Ambedkar', attr_kn: '— ಡಾ. ಬಿ.ಆರ್. ಅಂಬೇಡ್ಕರ್',
      heading_en: 'Reform is not politics. Reform is accountability.', heading_kn: 'ಸುಧಾರಣೆ ರಾಜಕೀಯವಲ್ಲ. ಸುಧಾರಣೆ ಜವಾಬ್ದಾರಿ.',
      body_en: 'KIRAN Foundation believes the most powerful reform is transparent accountability. Every number on our website — jobs placed, villages surveyed, training camps completed — is real, tracked, and updated. We show our partial progress, not just our wins. We show what we promised and what we actually delivered. This is the reform Karnataka needs today: not more promises, but fewer promises and more proof.',
      body_kn: 'ಕಿರಣ್ ಫೌಂಡೇಶನ್ ಪಾರದರ್ಶಕ ಜವಾಬ್ದಾರಿಯೇ ಅತ್ಯಂತ ಶಕ್ತಿಶಾಲಿ ಸುಧಾರಣೆ ಎಂದು ನಂಬುತ್ತದೆ. ನಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಪ್ರತಿ ಸಂಖ್ಯೆ ನಿಜ, ಟ್ರ್ಯಾಕ್ ಮಾಡಿದ ಮತ್ತು ನವೀಕರಿಸಿದ. ನಾವು ಭಾಗಶಃ ಪ್ರಗತಿ ತೋರಿಸುತ್ತೇವೆ. ಕರ್ನಾಟಕಕ್ಕೆ ಇಂದು ಅಗತ್ಯವಿರುವ ಸುಧಾರಣೆ: ಹೆಚ್ಚು ಭರವಸೆಗಳಲ್ಲ, ಕಡಿಮೆ ಭರವಸೆ ಮತ್ತು ಹೆಚ್ಚು ಪುರಾವೆ.',
      callout_h_en: 'Who reform starts with', callout_h_kn: 'ಸುಧಾರಣೆ ಯಾರಿಂದ ಪ್ರಾರಂಭ',
      callout_b_en: 'Dr. Ambedkar said he measured the progress of a community by the degree of progress women have achieved. Our surveys, skill programs, and job connections are designed for young women as much as young men — because when a young woman gets skilled and employed, she invests back into her family and community more than almost anyone else.',
      callout_b_kn: 'ಡಾ. ಅಂಬೇಡ್ಕರ್ ಹೇಳಿದರು — ಸಮುದಾಯದ ಪ್ರಗತಿಯನ್ನು ಮಹಿಳೆಯರ ಪ್ರಗತಿಯ ಮಟ್ಟದಿಂದ ಅಳೆಯುತ್ತೇನೆ. ನಮ್ಮ ಕಾರ್ಯಕ್ರಮಗಳು ಯುವತಿಯರಿಗೂ ಯುವಕರಿಗೂ ಸಮಾನ.',
      pull_en: 'We show our incomplete numbers. Because honesty is the only reform that lasts.', pull_kn: 'ನಾವು ಅಪೂರ್ಣ ಸಂಖ್ಯೆಗಳನ್ನು ತೋರಿಸುತ್ತೇವೆ. ಏಕೆಂದರೆ ಪ್ರಾಮಾಣಿಕತೆ ಮಾತ್ರ ಶಾಶ್ವತವಾಗಿ ಉಳಿಯುವ ಸುಧಾರಣೆ.'
    },
    aspiration: {
      photo: '/assets/uploads/kalam.jpg', initials: 'AK',
      quote_en: 'Small aim is a crime.', quote_kn: 'ಸಣ್ಣ ಗುರಿ ಅಪರಾಧ.',
      attr_en: '— Dr. A.P.J. Abdul Kalam', attr_kn: '— ಡಾ. ಎ.ಪಿ.ಜೆ. ಅಬ್ದುಲ್ ಕಲಾಂ',
      heading_en: 'The biggest crisis is unexpressed aspiration.', heading_kn: 'ಅತಿ ದೊಡ್ಡ ಬಿಕ್ಕಟ್ಟು ಅಭಿವ್ಯಕ್ತವಾಗದ ಆಕಾಂಕ್ಷೆ.',
      body_en: 'The biggest crisis among rural youth is not unemployment. It is unexpressed aspiration — the young woman who wanted to be an accountant but never told anyone, the young man who assumed engineering was not for someone like him. KIRAN Foundation\'s first job is to sit with these young people and ask: what do you actually want? Not what your family expects. Not what seems realistic. What do you genuinely want your life to look like? We do not decide what the village needs and then deliver it. We ask. We listen. Then we build.',
      body_kn: 'ಗ್ರಾಮೀಣ ಯುವಕ-ಯುವತಿಯರ ಅತಿ ದೊಡ್ಡ ಬಿಕ್ಕಟ್ಟು ನಿರುದ್ಯೋಗವಲ್ಲ. ಅದು ಅಭಿವ್ಯಕ್ತವಾಗದ ಆಕಾಂಕ್ಷೆ. ನಾವು ಮೊದಲು ಕೇಳುತ್ತೇವೆ, ನಂತರ ಕಟ್ಟುತ್ತೇವೆ.',
      callout_h_en: 'Our North Star', callout_h_kn: 'ನಮ್ಮ ಮಾರ್ಗದರ್ಶಿ ಧ್ರುವ',
      callout_b_en: 'Dr. Kalam said the youth need to be enabled to become job generators from job seekers. That is our goal — not just placing young people in jobs, but building the generation that creates jobs for the next one.',
      callout_b_kn: 'ಡಾ. ಕಲಾಂ ಹೇಳಿದರು — ಯುವಕರು ಉದ್ಯೋಗ ಹುಡುಕುವವರಿಂದ ಉದ್ಯೋಗ ಸೃಷ್ಟಿಸುವವರಾಗಬೇಕು. ಅದೇ ನಮ್ಮ ಗುರಿ.',
      pull_en: 'Every survey we run is us asking: what does this village actually dream of?', pull_kn: 'ನಾವು ನಡೆಸುವ ಪ್ರತಿ ಸಮೀಕ್ಷೆ ನಮ್ಮ ಪ್ರಶ್ನೆ: ಈ ಗ್ರಾಮ ನಿಜವಾಗಿ ಏನನ್ನು ಕನಸು ಕಾಣುತ್ತದೆ?'
    }
  };

  var activePillar = null;
  var panelWrapper = document.getElementById('pillar-panel-wrapper');
  var panelInner = document.getElementById('pillar-panel');

  function buildPanelHTML(key) {
    var d = pillarData[key];
    var lang = getCurrentLang();
    return '<div class="pp-columns">' +
      '<div class="pp-quote-col">' +
        '<img class="pp-portrait" src="' + d.photo + '" alt="' + (lang === 'kn' ? d.attr_kn : d.attr_en) + '" onerror="this.classList.add(\'hidden\')">' +
        '<div class="pp-portrait-fallback"><span class="pp-initials">' + d.initials + '</span></div>' +
        '<div class="pp-quote-text-wrap">' +
          '<div class="pp-leader-quote" data-en="' + d.quote_en + '" data-kn="' + d.quote_kn + '">' + (lang === 'kn' ? d.quote_kn : d.quote_en) + '</div>' +
          '<div class="pp-attribution" data-en="' + d.attr_en + '" data-kn="' + d.attr_kn + '">' + (lang === 'kn' ? d.attr_kn : d.attr_en) + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="pp-content-col">' +
        '<h3 class="pp-heading" data-en="' + d.heading_en + '" data-kn="' + d.heading_kn + '">' + (lang === 'kn' ? d.heading_kn : d.heading_en) + '</h3>' +
        '<p class="pp-body" data-en="' + d.body_en + '" data-kn="' + d.body_kn + '">' + (lang === 'kn' ? d.body_kn : d.body_en) + '</p>' +
        '<div class="pp-callout">' +
          '<div class="pp-callout-heading" data-en="' + d.callout_h_en + '" data-kn="' + d.callout_h_kn + '">' + (lang === 'kn' ? d.callout_h_kn : d.callout_h_en) + '</div>' +
          '<div class="pp-callout-body" data-en="' + d.callout_b_en + '" data-kn="' + d.callout_b_kn + '">' + (lang === 'kn' ? d.callout_b_kn : d.callout_b_en) + '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="pp-pullquote">' +
      '<div class="pp-pullquote-text" data-en="' + d.pull_en + '" data-kn="' + d.pull_kn + '">' + (lang === 'kn' ? d.pull_kn : d.pull_en) + '</div>' +
    '</div>';
  }

  function togglePillar(key) {
    var cards = document.querySelectorAll('.value-card[data-pillar]');

    if (activePillar === key) {
      panelWrapper.classList.remove('open');
      cards.forEach(function (c) { c.classList.remove('active'); c.setAttribute('aria-expanded', 'false'); });
      activePillar = null;
      return;
    }

    panelInner.innerHTML = buildPanelHTML(key);
    cards.forEach(function (c) {
      var isThis = c.getAttribute('data-pillar') === key;
      c.classList.toggle('active', isThis);
      c.setAttribute('aria-expanded', String(isThis));
    });
    panelWrapper.classList.add('open');
    activePillar = key;

    setTimeout(function () {
      panelWrapper.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }

  document.querySelectorAll('.value-card[data-pillar]').forEach(function (card) {
    card.addEventListener('click', function () { togglePillar(this.getAttribute('data-pillar')); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePillar(this.getAttribute('data-pillar')); }
    });
  });


  // ════════════════════════════════════════
  // RENDER FUNCTIONS
  // ════════════════════════════════════════

  var impactData = { stats: [], bars: [] };

  function renderAll() {
    renderGallery();
    renderPodcast();
    renderVideos();
    renderStories();
    renderPress();
    renderImpact();
    renderTeam();
    renderAbout();
  }

  // ── Gallery (with category filtering) ──

  var galleryGrid = document.getElementById('gallery-grid');
  var currentGalleryIndex = 0;
  var filteredGallery = [];

  function getFilteredGallery() {
    if (activeGalleryFilter === 'all') return galleryItems;
    return galleryItems.filter(function (item) {
      return item.category === activeGalleryFilter;
    });
  }

  function renderGallery() {
    var lang = getCurrentLang();
    filteredGallery = getFilteredGallery();
    var html = '';
    filteredGallery.forEach(function (item, i) {
      var caption = lang === 'kn' ? item.caption_kn : item.caption_en;
      var bgColor = galleryColors[i % galleryColors.length];
      var inner;
      if (item.image) {
        inner = '<img src="' + item.image + '" alt="' + caption + '" loading="lazy">';
      } else {
        inner = '<div class="gallery-placeholder" style="background:' + bgColor + '">' +
          '<span class="placeholder-icon">📷</span>' +
          '<span>' + (lang === 'kn' ? 'ಫೋಟೋ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ' : 'Photo coming soon') + '</span></div>';
      }
      html += '<div class="gallery-item" tabindex="0" role="button" aria-label="' + caption + '" data-index="' + i + '">' +
        inner +
        '<div class="gallery-caption">' + caption + '</div></div>';
    });
    galleryGrid.innerHTML = html;

    galleryGrid.querySelectorAll('.gallery-item').forEach(function (el) {
      el.addEventListener('click', function () { openLightbox(parseInt(this.dataset.index)); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(parseInt(this.dataset.index)); }
      });
    });
  }

  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');
      activeGalleryFilter = this.getAttribute('data-filter');
      renderGallery();
    });
  });

  // ── Lightbox ──

  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');

  function openLightbox(index) {
    currentGalleryIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lightbox.querySelector('.lightbox-close').focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    var item = filteredGallery[currentGalleryIndex];
    var lang = getCurrentLang();
    var caption = lang === 'kn' ? item.caption_kn : item.caption_en;
    lightboxCaption.textContent = caption;
    if (item.image) {
      lightboxImg.src = item.image;
      lightboxImg.alt = caption;
    } else {
      lightboxImg.src = 'data:image/svg+xml,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" fill="' +
        galleryColors[currentGalleryIndex % galleryColors.length] +
        '"><rect width="600" height="400"/><text x="300" y="190" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-family="sans-serif" font-size="48">📷</text><text x="300" y="240" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-family="sans-serif" font-size="16">' +
        (lang === 'kn' ? 'ಫೋಟೋ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ' : 'Photo coming soon') + '</text></svg>'
      );
      lightboxImg.alt = caption;
    }
  }

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-prev').addEventListener('click', function () {
    currentGalleryIndex = (currentGalleryIndex - 1 + filteredGallery.length) % filteredGallery.length;
    updateLightbox();
  });
  lightbox.querySelector('.lightbox-next').addEventListener('click', function () {
    currentGalleryIndex = (currentGalleryIndex + 1) % filteredGallery.length;
    updateLightbox();
  });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { currentGalleryIndex = (currentGalleryIndex - 1 + filteredGallery.length) % filteredGallery.length; updateLightbox(); }
    if (e.key === 'ArrowRight') { currentGalleryIndex = (currentGalleryIndex + 1) % filteredGallery.length; updateLightbox(); }
  });

  // ── Podcast ──

  var podcastList = document.getElementById('podcast-list');

  function renderPodcast() {
    var lang = getCurrentLang();
    if (podcastEpisodes.length === 0) {
      podcastList.innerHTML = '<div class="podcast-empty"><div class="empty-icon">🎙️</div>' +
        '<p>' + (lang === 'kn' ? 'ಮೊದಲ ಸಂಚಿಕೆ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ — ನಮ್ಮೊಂದಿಗಿರಿ!' : 'First episode coming soon — stay tuned!') + '</p></div>';
      return;
    }
    var html = '';
    podcastEpisodes.forEach(function (ep) {
      var title = lang === 'kn' ? ep.title_kn : ep.title_en;
      var desc = lang === 'kn' ? ep.description_kn : ep.description_en;
      var listenText = lang === 'kn' ? 'ಆಲಿಸಿ ▶' : 'Listen ▶';
      html += '<div class="podcast-card"><div class="podcast-icon">🎙️</div><div class="podcast-info">' +
        '<h3>' + title + '</h3><div class="podcast-date">' + ep.date + '</div>' +
        '<p>' + desc + '</p>' +
        '<a href="' + ep.listen_url + '" target="_blank" rel="noopener noreferrer" class="podcast-listen">' + listenText + '</a>' +
        '</div></div>';
    });
    podcastList.innerHTML = html;
  }

  // ── Videos ──

  var videosGrid = document.getElementById('videos-grid');
  var PLACEHOLDER_ID = 'PASTE_YOUTUBE_VIDEO_ID';

  function renderVideos() {
    var lang = getCurrentLang();
    var html = '';
    videos.forEach(function (v, i) {
      var title = lang === 'kn' ? v.title_kn : v.title_en;
      var desc = lang === 'kn' ? v.description_kn : v.description_en;
      var isPlaceholder = !v.youtube_id || v.youtube_id === PLACEHOLDER_ID;
      var thumb;
      if (isPlaceholder) {
        thumb = '<div class="video-placeholder-thumb"><span class="placeholder-icon">🎬</span>' +
          '<span>' + (lang === 'kn' ? 'ವಿಡಿಯೋ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ' : 'Video coming soon') + '</span></div>';
      } else {
        thumb = '<img src="https://img.youtube.com/vi/' + v.youtube_id + '/hqdefault.jpg" alt="' + title + '" loading="lazy">';
      }
      html += '<div class="video-card" tabindex="0" role="button" aria-label="' + title + '" data-index="' + i + '">' +
        '<div class="video-thumb">' + thumb +
        '<div class="video-play-overlay"><div class="play-circle">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>' +
        '</div></div></div><div class="video-card-body">' +
        '<h3>' + title + '</h3><p>' + desc + '</p></div></div>';
    });
    videosGrid.innerHTML = html;

    videosGrid.querySelectorAll('.video-card').forEach(function (card) {
      function handleClick() {
        var idx = parseInt(card.dataset.index);
        var v = videos[idx];
        var isPlaceholder = !v.youtube_id || v.youtube_id === PLACEHOLDER_ID;
        var container = document.getElementById('video-embed-container');
        var titleEl = document.getElementById('modal-title-video');
        var lang = getCurrentLang();
        titleEl.textContent = lang === 'kn' ? v.title_kn : v.title_en;
        if (isPlaceholder) {
          container.innerHTML = '<div class="video-embed-placeholder">' +
            (lang === 'kn' ? 'ವಿಡಿಯೋ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ' : 'Video coming soon') + '</div>';
        } else {
          container.innerHTML = '<iframe src="https://www.youtube.com/embed/' + v.youtube_id + '?autoplay=1" ' +
            'title="' + (lang === 'kn' ? v.title_kn : v.title_en) + '" allow="autoplay; encrypted-media" allowfullscreen loading="lazy"></iframe>';
        }
        openModal('video-modal');
      }
      card.addEventListener('click', handleClick);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); }
      });
    });
  }

  // ── Stories ──

  var storiesCarousel = document.getElementById('stories-carousel');

  function renderStories() {
    var lang = getCurrentLang();
    if (!stories || stories.length === 0) {
      storiesCarousel.innerHTML = '<div class="stories-empty"><p>' +
        (lang === 'kn' ? 'ನಮ್ಮ ಸಮುದಾಯದ ಕಥೆಗಳು — ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ.' : 'Stories from our community — coming soon.') + '</p></div>';
      return;
    }
    var html = '';
    stories.forEach(function (s) {
      var outcome = lang === 'kn' ? (s.outcome_kn || s.outcome_en || '') : (s.outcome_en || '');
      var quote = lang === 'kn' ? (s.quote_kn || s.quote_en || '') : (s.quote_en || '');
      var photoHtml = s.photo
        ? '<img class="story-card-photo" src="' + s.photo + '" alt="' + (s.name || '') + '" loading="lazy">'
        : '<div class="story-card-photo-placeholder">👤</div>';
      html += '<div class="story-card">' + photoHtml +
        '<div class="story-card-body">' +
        '<div class="story-card-name">' + (s.name || '') + '</div>' +
        (s.location ? '<div class="story-card-location">' + s.location + '</div>' : '') +
        '<div class="story-card-outcome">' + outcome + '</div>' +
        '<div class="story-card-quote">' + quote + '</div>' +
        '</div></div>';
    });
    storiesCarousel.innerHTML = html;
  }

  // ── Press ──

  var pressList = document.getElementById('press-list');

  function renderPress() {
    var lang = getCurrentLang();
    if (pressItems.length === 0) {
      pressList.innerHTML = '<div class="press-empty"><p>' +
        (lang === 'kn' ? 'ಪತ್ರಿಕಾ ವರದಿ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ.' : 'Press coverage coming soon.') + '</p></div>';
      return;
    }
    var outletH = lang === 'kn' ? 'ಸಂಸ್ಥೆ' : 'Outlet';
    var headlineH = lang === 'kn' ? 'ಶೀರ್ಷಿಕೆ' : 'Headline';
    var dateH = lang === 'kn' ? 'ದಿನಾಂಕ' : 'Date';
    var html = '<table class="press-table"><thead><tr><th>' + outletH + '</th><th>' + headlineH + '</th><th>' + dateH + '</th></tr></thead><tbody>';
    pressItems.forEach(function (item) {
      var headline = lang === 'kn' ? item.headline_kn : item.headline_en;
      var hasUrl = item.article_url && item.article_url.length > 0;
      var cell = hasUrl
        ? '<a href="' + item.article_url + '" target="_blank" rel="noopener noreferrer">' + headline + '</a>'
        : headline;
      html += '<tr><td>' + item.outlet_name + '</td><td>' + cell + '</td><td>' + item.date + '</td></tr>';
    });
    html += '</tbody></table>';
    pressList.innerHTML = html;
  }

  // ── Impact (CMS-driven) ──

  function renderImpact() {
    var lang = getCurrentLang();
    var statsEl = document.getElementById('impact-stats');
    var barsEl = document.getElementById('impact-bars');
    var emptyEl = document.getElementById('impact-empty');

    if ((!impactData.stats || impactData.stats.length === 0) &&
        (!impactData.bars || impactData.bars.length === 0)) {
      statsEl.innerHTML = '';
      barsEl.innerHTML = '';
      emptyEl.style.display = 'block';
      emptyEl.querySelector('p').textContent = lang === 'kn'
        ? 'ಪರಿಣಾಮ ಡೇಟಾ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ — ನಾವು ಈಗಷ್ಟೇ ಪ್ರಾರಂಭಿಸಿದ್ದೇವೆ!'
        : 'Impact data coming soon — we\'re just getting started!';
      return;
    }

    emptyEl.style.display = 'none';

    var statsHtml = '';
    if (impactData.stats && impactData.stats.length > 0) {
      impactData.stats.forEach(function (s) {
        var label = lang === 'kn' ? s.label_kn : s.label_en;
        var suffix = s.suffix || '';
        statsHtml += '<div class="stat-card">' +
          '<div class="stat-number" data-target="' + s.value + '" data-suffix="' + suffix + '">0</div>' +
          '<div class="stat-label">' + label + '</div></div>';
      });
    }
    statsEl.innerHTML = statsHtml;

    var barsHtml = '';
    if (impactData.bars && impactData.bars.length > 0) {
      impactData.bars.forEach(function (b) {
        var label = lang === 'kn' ? b.label_kn : b.label_en;
        barsHtml += '<div class="impact-bar-item"><div class="impact-bar-label">' +
          '<span>' + label + '</span><span>' + b.percent + '%</span></div>' +
          '<div class="impact-bar-track"><div class="impact-bar-fill" data-width="' + b.percent + '"></div></div></div>';
      });
    }
    barsEl.innerHTML = barsHtml;
  }

  // ── Team ──

  function renderTeam() {
    var grid = document.getElementById('team-grid');
    var empty = document.getElementById('team-empty');
    if (!grid) return;
    var lang = getCurrentLang();
    var members = (teamData && teamData.members) ? teamData.members : [];
    if (members.length === 0) {
      grid.innerHTML = '';
      if (empty) { empty.style.display = 'block'; empty.querySelector('p').textContent = lang === 'kn' ? 'ತಂಡದ ವಿವರ ಶೀಘ್ರದಲ್ಲೇ.' : 'Team profiles coming soon.'; }
      return;
    }
    if (empty) empty.style.display = 'none';
    var html = '';
    members.forEach(function (m) {
      var photoHtml = m.photo
        ? '<img class="team-card-photo" src="' + m.photo + '" alt="' + (m.name || '') + '" loading="lazy">'
        : '<div class="team-card-photo-placeholder">👤</div>';
      var role = lang === 'kn' ? (m.role_kn || m.role_en || '') : (m.role_en || '');
      var bio = lang === 'kn' ? (m.bio_kn || m.bio_en || '') : (m.bio_en || '');
      html += '<div class="team-card">' + photoHtml +
        '<div class="team-card-body">' +
        '<div class="team-card-name">' + (m.name || '') + '</div>' +
        '<div class="team-card-role">' + role + '</div>' +
        (bio ? '<div class="team-card-bio">' + bio + '</div>' : '') +
        '</div></div>';
    });
    grid.innerHTML = html;
  }

  // ── About (CMS content) ──

  function renderAbout() {
    var lang = getCurrentLang();
    if (!aboutData) return;
    if (aboutData.mission_en || aboutData.mission_kn) {
      var missionEl = document.querySelector('.mission-banner p');
      if (missionEl) {
        if (aboutData.mission_en) missionEl.setAttribute('data-en', aboutData.mission_en);
        if (aboutData.mission_kn) missionEl.setAttribute('data-kn', aboutData.mission_kn);
        missionEl.textContent = lang === 'kn' ? (aboutData.mission_kn || aboutData.mission_en) : aboutData.mission_en;
      }
    }
  }

  // ── Press download button ──

  var pressDownload = document.getElementById('press-download');
  if (pressDownload) {
    pressDownload.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      var self = this;
      fetch(href, { method: 'HEAD' }).then(function (resp) {
        if (!resp.ok) { showPressNotice(e, self); }
      }).catch(function () { showPressNotice(e, self); });
    });
  }

  function showPressNotice(e, el) {
    e.preventDefault();
    var lang = getCurrentLang();
    var msg = lang === 'kn'
      ? 'ಪ್ರೆಸ್ ನೋಟ್ ಇನ್ನೂ ಅಪ್‌ಲೋಡ್ ಆಗಿಲ್ಲ. ಶೀಘ್ರದಲ್ಲೇ ಲಭ್ಯವಾಗಲಿದೆ!'
      : 'Press note not uploaded yet. Coming soon!';
    var notice = document.createElement('div');
    notice.textContent = msg;
    notice.style.cssText = 'background:rgba(247,147,30,0.15);border:1px solid rgba(247,147,30,0.3);color:#FBB03B;padding:10px 18px;border-radius:8px;margin-top:12px;font-size:0.88rem;display:inline-block;';
    el.parentNode.appendChild(notice);
    setTimeout(function () { notice.remove(); }, 4000);
  }


  // ════════════════════════════════════════
  // APPLY CMS SETTINGS to page
  // ════════════════════════════════════════

  function applySettings(s) {
    if (!s) return;
    var lang = getCurrentLang();

    if (s.logo) {
      var logoIcon = document.querySelector('.nav-logo .logo-icon');
      if (logoIcon) {
        logoIcon.innerHTML = '<img src="' + s.logo + '" alt="Logo" style="width:100%;height:100%;object-fit:contain;border-radius:50%;">';
      }
    }

    if (s.site_title_en && s.site_title_kn) {
      var titleEl = document.querySelector('.nav-logo [data-en]');
      if (titleEl) {
        titleEl.setAttribute('data-en', s.site_title_en);
        titleEl.setAttribute('data-kn', s.site_title_kn);
        titleEl.textContent = lang === 'kn' ? s.site_title_kn : s.site_title_en;
      }
    }

    if (s.contact_phone) {
      var phoneEl = document.querySelector('#contact .contact-info .contact-item:nth-child(3) p');
      if (phoneEl) phoneEl.textContent = s.contact_phone;
    }

    if (s.contact_email) {
      var emailEl = document.querySelector('#contact .contact-info .contact-item:nth-child(2) p');
      if (emailEl) emailEl.textContent = s.contact_email;
    }

    if (s.whatsapp_number && s.whatsapp_number !== 'PASTE_PHONE_NUMBER_HERE') {
      var fab = document.getElementById('fab-help');
      if (fab) fab.href = 'https://wa.me/' + s.whatsapp_number;
    }

    var heroFields = [
      { id: 'hero-badge', en: 'hero_badge_en', kn: 'hero_badge_kn' },
      { id: 'hero-headline', en: 'hero_headline_en', kn: 'hero_headline_kn' },
      { id: 'hero-subtitle', en: 'hero_subtitle_en', kn: 'hero_subtitle_kn' },
      { id: 'vision-subtitle', en: 'vision_subtitle_en', kn: 'vision_subtitle_kn' }
    ];
    heroFields.forEach(function (f) {
      if (s[f.en] || s[f.kn]) {
        var el = document.getElementById(f.id);
        if (el) {
          if (s[f.en]) el.setAttribute('data-en', s[f.en]);
          if (s[f.kn]) el.setAttribute('data-kn', s[f.kn]);
          el.textContent = lang === 'kn' ? (s[f.kn] || s[f.en]) : s[f.en];
        }
      }
    });

    var socialMap = [
      { key: 'facebook_url', label: 'Facebook' },
      { key: 'instagram_url', label: 'Instagram' },
      { key: 'twitter_url', label: 'X (Twitter)' },
      { key: 'youtube_url', label: 'YouTube' }
    ];
    var socialIcons = document.querySelectorAll('.footer-social .social-icon');
    socialMap.forEach(function (item, i) {
      if (s[item.key] && socialIcons[i]) {
        socialIcons[i].href = s[item.key];
      }
    });
  }


  // ════════════════════════════════════════
  // LOAD CMS CONTENT from /content/*.json
  // ════════════════════════════════════════

  function fetchJSON(url) {
    return fetch(url).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; });
  }

  function loadCMSContent() {
    Promise.all([
      fetchJSON('/content/gallery.json'),
      fetchJSON('/content/videos.json'),
      fetchJSON('/content/podcasts.json'),
      fetchJSON('/content/press.json'),
      fetchJSON('/content/settings.json'),
      fetchJSON('/content/impact.json'),
      fetchJSON('/content/team.json'),
      fetchJSON('/content/stories.json'),
      fetchJSON('/content/about.json')
    ]).then(function (results) {
      if (results[0] && results[0].items) galleryItems = results[0].items;
      if (results[1] && results[1].items) videos = results[1].items;
      if (results[2] && results[2].items) podcastEpisodes = results[2].items;
      if (results[3] && results[3].items) pressItems = results[3].items;
      if (results[4]) applySettings(results[4]);
      if (results[5]) impactData = results[5];
      if (results[6]) teamData = results[6];
      if (results[7] && results[7].stories) stories = results[7].stories;
      if (results[8]) aboutData = results[8];
      renderAll();
    });
  }


  // ════════════════════════════════════════
  // INITIAL RENDER + CMS LOAD
  // ════════════════════════════════════════

  var savedLang = localStorage.getItem(LANG_KEY) || 'en';
  document.body.setAttribute('data-lang', savedLang);
  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === savedLang);
  });
  document.querySelectorAll('[data-en][data-kn]').forEach(function (el) {
    el.textContent = el.getAttribute('data-' + savedLang);
    el.style.fontFamily = savedLang === 'kn' ? "'Noto Sans Kannada', sans-serif" : '';
  });
  document.querySelectorAll('[data-placeholder-en][data-placeholder-kn]').forEach(function (el) {
    el.placeholder = el.getAttribute('data-placeholder-' + savedLang);
  });

  renderAll();
  loadCMSContent();


  // ════════════════════════════════════════
  // ANIMATED COUNTERS & IMPACT BARS
  // ════════════════════════════════════════

  function animateCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach(function (counter) {
      if (counter.dataset.animated) return;
      var target = parseInt(counter.dataset.target, 10);
      var suffix = counter.dataset.suffix || '';
      var duration = 2000;
      var start = performance.now();
      function step(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(target * eased).toLocaleString() + suffix;
        if (progress < 1) { requestAnimationFrame(step); }
        else { counter.textContent = target.toLocaleString() + suffix; counter.dataset.animated = '1'; }
      }
      requestAnimationFrame(step);
    });
  }

  function animateImpactBars() {
    document.querySelectorAll('.impact-bar-fill[data-width]').forEach(function (bar) {
      if (bar.dataset.animated) return;
      bar.style.width = bar.dataset.width + '%';
      bar.dataset.animated = '1';
    });
  }

  var impactSection = document.getElementById('impact');
  if (impactSection) {
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCounters(); animateImpactBars(); }
      });
    }, { threshold: 0.2 }).observe(impactSection);
  }


  // ════════════════════════════════════════
  // TEXT-TO-SPEECH
  // ════════════════════════════════════════

  function getTTSText(sectionId) {
    var section = document.getElementById(sectionId);
    if (!section) return '';
    var lang = getCurrentLang();
    var parts = [];
    section.querySelectorAll('[data-en][data-kn]').forEach(function (el) {
      var text = el.getAttribute('data-' + lang);
      if (text) parts.push(text);
    });
    return parts.join('. ');
  }

  function hasVoiceForLang(langPrefix) {
    return speechSynthesis.getVoices().some(function (v) { return v.lang.startsWith(langPrefix); });
  }

  document.querySelectorAll('.tts-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var sectionId = this.dataset.section;
      var warningEl = document.querySelector('.tts-warning[data-section="' + sectionId + '"]');
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        document.querySelectorAll('.tts-btn.speaking').forEach(function (b) { b.classList.remove('speaking'); });
        if (this.classList.contains('speaking')) { this.classList.remove('speaking'); return; }
      }
      var lang = getCurrentLang();
      var langCode = lang === 'kn' ? 'kn-IN' : 'en-IN';
      var langPrefix = lang === 'kn' ? 'kn' : 'en';
      if (!hasVoiceForLang(langPrefix)) {
        if (warningEl) {
          warningEl.classList.add('show');
          warningEl.textContent = lang === 'kn'
            ? 'ಕನ್ನಡ ಧ್ವನಿ ಈ ಸಾಧನದಲ್ಲಿ ಲಭ್ಯವಿಲ್ಲ — ಪಠ್ಯವನ್ನು ಬದಲಿಗೆ ತೋರಿಸಲಾಗುತ್ತಿದೆ'
            : 'Voice not available on this device — showing text instead';
          setTimeout(function () { warningEl.classList.remove('show'); }, 5000);
        }
        return;
      }
      if (warningEl) warningEl.classList.remove('show');
      var text = getTTSText(sectionId);
      if (!text) return;
      var utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = 0.9;
      var match = speechSynthesis.getVoices().find(function (v) { return v.lang.startsWith(langPrefix); });
      if (match) utterance.voice = match;
      this.classList.add('speaking');
      var self = this;
      utterance.onend = function () { self.classList.remove('speaking'); };
      utterance.onerror = function () { self.classList.remove('speaking'); };
      speechSynthesis.speak(utterance);
    });
  });

  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = function () {};
  }


  // ════════════════════════════════════════
  // JOIN US FORM — Netlify Forms
  // ════════════════════════════════════════

  var joinForm = document.getElementById('join-us-form');
  var joinStatus = document.getElementById('join-form-status');

  if (joinForm) {
    joinForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameEl = document.getElementById('join-name');
      var phoneEl = document.getElementById('join-phone');
      var emailEl = document.getElementById('join-email');
      var lang = getCurrentLang();

      nameEl.classList.remove('input-error');
      phoneEl.classList.remove('input-error');
      joinStatus.className = 'join-form-status';
      joinStatus.style.display = 'none';

      var valid = true;
      if (!nameEl.value.trim()) { nameEl.classList.add('input-error'); valid = false; }
      if (!phoneEl.value.trim() || phoneEl.value.replace(/\D/g, '').length < 10) {
        phoneEl.classList.add('input-error'); valid = false;
      }

      if (!valid) {
        joinStatus.textContent = lang === 'kn'
          ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಮಾನ್ಯ ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.'
          : 'Please enter your name and a valid phone number.';
        joinStatus.className = 'join-form-status error';
        joinStatus.style.display = 'block';
        return;
      }

      var entry = {
        name: nameEl.value.trim(),
        phone: phoneEl.value.trim(),
        email: emailEl.value.trim(),
        date: new Date().toISOString()
      };

      var formData = new URLSearchParams();
      formData.append('form-name', 'join-us');
      formData.append('name', entry.name);
      formData.append('phone', entry.phone);
      formData.append('email', entry.email);

      function showSuccess() {
        joinStatus.textContent = lang === 'kn'
          ? 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ವಿವರಗಳು ಸಲ್ಲಿಸಲಾಗಿದೆ. ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ!'
          : 'Thank you! Your details have been submitted. We will reach out to you soon!';
        joinStatus.className = 'join-form-status success';
        joinStatus.style.display = 'block';
        joinForm.reset();
      }

      function saveLocally() {
        var saved = [];
        try { saved = JSON.parse(localStorage.getItem('kiran-join-submissions') || '[]'); } catch (_) {}
        saved.push(entry);
        localStorage.setItem('kiran-join-submissions', JSON.stringify(saved));
      }

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      }).then(function (response) {
        if (response.ok) {
          showSuccess();
        } else {
          saveLocally();
          showSuccess();
        }
      }).catch(function () {
        saveLocally();
        showSuccess();
      });
    });
  }


  // ════════════════════════════════════════
  // DONATE FORM — Netlify Forms
  // ════════════════════════════════════════

  var donateForm = document.getElementById('donate-form');
  var donateStatus = document.getElementById('donate-form-status');

  if (donateForm) {
    donateForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameEl = document.getElementById('donate-name');
      var phoneEl = document.getElementById('donate-phone');
      var emailEl = document.getElementById('donate-email');
      var lang = getCurrentLang();

      nameEl.classList.remove('input-error');
      phoneEl.classList.remove('input-error');
      donateStatus.className = 'join-form-status';
      donateStatus.style.display = 'none';

      var valid = true;
      if (!nameEl.value.trim()) { nameEl.classList.add('input-error'); valid = false; }
      if (!phoneEl.value.trim() || phoneEl.value.replace(/\D/g, '').length < 10) {
        phoneEl.classList.add('input-error'); valid = false;
      }

      if (!valid) {
        donateStatus.textContent = lang === 'kn'
          ? 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಹೆಸರು ಮತ್ತು ಮಾನ್ಯ ಫೋನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ.'
          : 'Please enter your name and a valid phone number.';
        donateStatus.className = 'join-form-status error';
        donateStatus.style.display = 'block';
        return;
      }

      var formData = new URLSearchParams();
      formData.append('form-name', 'donate');
      formData.append('name', nameEl.value.trim());
      formData.append('phone', phoneEl.value.trim());
      formData.append('email', emailEl.value.trim());

      function showSuccess() {
        donateStatus.textContent = lang === 'kn'
          ? 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ವಿವರಗಳು ಸಲ್ಲಿಸಲಾಗಿದೆ. ನಮ್ಮ ತಂಡ ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತದೆ!'
          : 'Thank you! Your details have been submitted. Our team will contact you with donation options soon!';
        donateStatus.className = 'join-form-status success';
        donateStatus.style.display = 'block';
        donateForm.reset();
      }

      function saveLocally() {
        var saved = [];
        try { saved = JSON.parse(localStorage.getItem('kiran-donate-submissions') || '[]'); } catch (_) {}
        saved.push({ name: nameEl.value.trim(), phone: phoneEl.value.trim(), email: emailEl.value.trim(), date: new Date().toISOString() });
        localStorage.setItem('kiran-donate-submissions', JSON.stringify(saved));
      }

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      }).then(function (response) {
        if (response.ok) { showSuccess(); }
        else { saveLocally(); showSuccess(); }
      }).catch(function () { saveLocally(); showSuccess(); });
    });
  }


  // ════════════════════════════════════════
  // SECTION BACKGROUND IMAGES (CMS-driven)
  // ════════════════════════════════════════

  var BG_FALLBACKS = {
    about:    'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1920&q=80',
    programs: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80',
    gallery:  'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1920&q=80',
    podcast:  'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1920&q=80',
    videos:   'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80',
    impact:   'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1920&q=80',
    stories:  'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1920&q=80',
    press:    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1920&q=80',
    register: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=80',
    contact:  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
    footer:   'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1920&q=80'
  };

  function opacityToOverlay(sectionKey, opacityPercent) {
    var alpha = 1 - (opacityPercent / 100);
    var a1 = alpha.toFixed(2);
    var a2 = Math.min(alpha + 0.04, 1).toFixed(2);
    if (sectionKey === 'register') {
      return 'rgba(22,33,62,' + a1 + '),rgba(15,52,96,' + a2 + ')';
    }
    if (sectionKey === 'impact') {
      return 'rgba(5,8,18,' + a1 + '),rgba(5,8,18,' + a2 + ')';
    }
    if (sectionKey === 'footer') {
      return 'rgba(10,18,36,' + a1 + '),rgba(10,18,36,' + a2 + ')';
    }
    return 'rgba(16,26,50,' + a1 + '),rgba(16,26,50,' + a2 + ')';
  }

  function applyBackgrounds(cmsItems) {
    var bgMap = {};
    var opacityMap = {};
    Object.keys(BG_FALLBACKS).forEach(function (k) { bgMap[k] = BG_FALLBACKS[k]; });

    if (cmsItems && cmsItems.length) {
      cmsItems.forEach(function (item) {
        var key = (item.section_key || '').trim();
        var url = (item.photo || '').trim();
        if (key && url) bgMap[key] = url;
        if (key && item.opacity != null && item.opacity !== '' && !isNaN(item.opacity)) {
          opacityMap[key] = parseFloat(item.opacity);
        }
      });
    }

    var bgObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var key = el.getAttribute('data-bg-section');
          var url = bgMap[key];
          if (!url) return;

          var overlay;
          if (opacityMap[key] != null) {
            overlay = opacityToOverlay(key, opacityMap[key]);
          } else {
            var overlayAttr = el.getAttribute('data-overlay') || 'rgba(16,26,50,0.85),rgba(16,26,50,0.88)';
            overlay = overlayAttr;
          }

          var parts = overlay.split(',rgba');
          var c1 = parts[0];
          var c2 = parts.length > 1 ? 'rgba' + parts[1] : c1;
          el.style.backgroundImage = 'linear-gradient(' + c1 + ',' + c2 + '), url(\'' + url + '\')';
          el.classList.add('bg-loaded');
          bgObserver.unobserve(el);
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('[data-bg-section]').forEach(function (el) {
      bgObserver.observe(el);
    });
  }

  // Load CMS backgrounds, then apply
  fetchJSON('/content/backgrounds.json').then(function (data) {
    applyBackgrounds(data && data.items ? data.items : []);
  });


  // ════════════════════════════════════════
  // SECTION ENTRY ANIMATIONS
  // ════════════════════════════════════════

  document.querySelectorAll('.section-header h2').forEach(function (el) { el.classList.add('anim-target'); });
  document.querySelectorAll('.section-header .section-line').forEach(function (el) { el.classList.add('anim-target', 'anim-delay-1'); });
  document.querySelectorAll('.section-header > p').forEach(function (el) { el.classList.add('anim-target', 'anim-delay-2'); });
  document.querySelectorAll('.hero-badge').forEach(function (el) { el.classList.add('anim-target'); });
  document.querySelectorAll('.hero h1').forEach(function (el) { el.classList.add('anim-target', 'anim-delay-1'); });
  document.querySelectorAll('.hero-sub').forEach(function (el) { el.classList.add('anim-target', 'anim-delay-2'); });

  var animObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible');
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.anim-target').forEach(function (el) { animObserver.observe(el); });

})();
