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

  var stories = [
    { name: 'REPLACE WITH REAL STORY',
      outcome_en: 'Got a job in electrical maintenance', outcome_kn: 'ವಿದ್ಯುತ್ ನಿರ್ವಹಣೆಯಲ್ಲಿ ಉದ್ಯೋಗ ಪಡೆದರು',
      quote_en: 'KIRAN Foundation taught me skills I never thought I could learn. Today I have a stable job and can support my family.',
      quote_kn: 'ಕಿರಣ ಫೌಂಡೇಶನ್ ನಾನು ಕಲಿಯಬಹುದೆಂದು ಎಂದೂ ಭಾವಿಸದ ಕೌಶಲ್ಯಗಳನ್ನು ಕಲಿಸಿತು. ಇಂದು ನನಗೆ ಸ್ಥಿರ ಉದ್ಯೋಗವಿದೆ ಮತ್ತು ನನ್ನ ಕುಟುಂಬವನ್ನು ಬೆಂಬಲಿಸಬಲ್ಲೆ.' },
    { name: 'REPLACE WITH REAL STORY',
      outcome_en: 'Started a tailoring business from home', outcome_kn: 'ಮನೆಯಿಂದ ಹೊಲಿಗೆ ವ್ಯಾಪಾರ ಪ್ರಾರಂಭಿಸಿದರು',
      quote_en: 'The vocational training gave me the confidence to start my own business. I now employ two other women from my village.',
      quote_kn: 'ವೃತ್ತಿಪರ ತರಬೇತಿ ನನಗೆ ಸ್ವಂತ ವ್ಯಾಪಾರ ಪ್ರಾರಂಭಿಸಲು ಆತ್ಮವಿಶ್ವಾಸ ನೀಡಿತು. ನಾನು ಈಗ ನನ್ನ ಗ್ರಾಮದ ಇತರ ಇಬ್ಬರು ಮಹಿಳೆಯರಿಗೆ ಉದ್ಯೋಗ ನೀಡಿದ್ದೇನೆ.' },
    { name: 'REPLACE WITH REAL STORY',
      outcome_en: 'Secured government scholarship for higher studies', outcome_kn: 'ಉನ್ನತ ಅಧ್ಯಯನಕ್ಕಾಗಿ ಸರ್ಕಾರಿ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪಡೆದರು',
      quote_en: 'I did not know these schemes existed until KIRAN helped me apply. Now I am pursuing my engineering degree without financial worry.',
      quote_kn: 'ಕಿರಣ ನನಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಸಹಾಯ ಮಾಡುವವರೆಗೆ ಈ ಯೋಜನೆಗಳು ಅಸ್ತಿತ್ವದಲ್ಲಿವೆ ಎಂದು ನನಗೆ ತಿಳಿದಿರಲಿಲ್ಲ. ಈಗ ನಾನು ಆರ್ಥಿಕ ಚಿಂತೆಯಿಲ್ಲದೆ ಎಂಜಿನಿಯರಿಂಗ್ ಪದವಿ ಪಡೆಯುತ್ತಿದ್ದೇನೆ.' }
  ];

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
  var mobileMenu = document.querySelector('.mobile-menu');

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    var isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMobileMenu);
  });

  document.addEventListener('click', function (e) {
    if (mobileMenu.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
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
  // RENDER FUNCTIONS
  // ════════════════════════════════════════

  function renderAll() {
    renderGallery();
    renderPodcast();
    renderVideos();
    renderStories();
    renderPress();
  }

  // ── Gallery ──

  var galleryGrid = document.getElementById('gallery-grid');
  var currentGalleryIndex = 0;

  function renderGallery() {
    var lang = getCurrentLang();
    var html = '';
    galleryItems.forEach(function (item, i) {
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
    var item = galleryItems[currentGalleryIndex];
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
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightbox();
  });
  lightbox.querySelector('.lightbox-next').addEventListener('click', function () {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    updateLightbox();
  });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length; updateLightbox(); }
    if (e.key === 'ArrowRight') { currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length; updateLightbox(); }
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
    var html = '';
    stories.forEach(function (s) {
      var outcome = lang === 'kn' ? s.outcome_kn : s.outcome_en;
      var quote = lang === 'kn' ? s.quote_kn : s.quote_en;
      var isPlaceholder = s.name === 'REPLACE WITH REAL STORY';
      html += '<div class="story-card"><div class="story-avatar">👤</div>' +
        '<div class="story-name">' + s.name + '</div>' +
        '<div class="story-outcome">' + outcome + '</div>' +
        '<div class="story-quote">' + quote + '</div>' +
        (isPlaceholder ? '<div class="story-placeholder-tag">REPLACE WITH REAL STORY</div>' : '') +
        '</div>';
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
      fetchJSON('/content/settings.json')
    ]).then(function (results) {
      if (results[0] && results[0].items) galleryItems = results[0].items;
      if (results[1] && results[1].items) videos = results[1].items;
      if (results[2] && results[2].items) podcastEpisodes = results[2].items;
      if (results[3] && results[3].items) pressItems = results[3].items;
      if (results[4]) applySettings(results[4]);
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
        return;
      }

      var formData = new URLSearchParams();
      formData.append('form-name', 'join-us');
      formData.append('name', nameEl.value.trim());
      formData.append('phone', phoneEl.value.trim());
      formData.append('email', emailEl.value.trim());

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      }).then(function (response) {
        if (response.ok) {
          joinStatus.textContent = lang === 'kn'
            ? 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ವಿವರಗಳು ಸಲ್ಲಿಸಲಾಗಿದೆ. ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ!'
            : 'Thank you! Your details have been submitted. We will reach out to you soon!';
          joinStatus.className = 'join-form-status success';
          joinForm.reset();
        } else {
          joinStatus.textContent = lang === 'kn'
            ? 'ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.'
            : 'Something went wrong. Please try again.';
          joinStatus.className = 'join-form-status error';
        }
      }).catch(function () {
        joinStatus.textContent = lang === 'kn'
          ? 'ನೆಟ್‌ವರ್ಕ್ ದೋಷ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಿ.'
          : 'Network error. Please check your connection.';
        joinStatus.className = 'join-form-status error';
      });
    });
  }

})();
