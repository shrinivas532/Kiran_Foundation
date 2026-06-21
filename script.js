/* ═══════════════════════════════════════════
   KIRAN Foundation — Main Script
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // ════════════════════════════════════════
  // DATA ARRAYS — edit these to add content
  // ════════════════════════════════════════

  var galleryColors = ['#2E4057', '#3A5A7C', '#4A6F8A', '#5B8498', '#3D5A6E', '#2C4A5E'];

  var galleryItems = [
    { src: '', captionEn: 'Cricket Tournament 2026', captionKn: 'ಕ್ರಿಕೆಟ್ ಪಂದ್ಯಾವಳಿ 2026' },
    { src: '', captionEn: 'Digital Literacy Workshop', captionKn: 'ಡಿಜಿಟಲ್ ಸಾಕ್ಷರತೆ ಕಾರ್ಯಾಗಾರ' },
    { src: '', captionEn: 'Women Empowerment Camp', captionKn: 'ಮಹಿಳಾ ಸಬಲೀಕರಣ ಶಿಬಿರ' },
    { src: '', captionEn: 'Job Fair 2026', captionKn: 'ಉದ್ಯೋಗ ಮೇಳ 2026' },
    { src: '', captionEn: 'Vocational Training Session', captionKn: 'ವೃತ್ತಿಪರ ತರಬೇತಿ ಅಧಿವೇಶನ' },
    { src: '', captionEn: 'Community Outreach', captionKn: 'ಸಮುದಾಯ ಸಂಪರ್ಕ' }
  ];

  var podcastEpisodes = [
    // Add episodes here. Example:
    // { titleEn: 'Episode 1: Why We Started', titleKn: 'ಸಂಚಿಕೆ 1: ನಾವು ಏಕೆ ಪ್ರಾರಂಭಿಸಿದೆವು',
    //   descEn: 'The story behind KIRAN Foundation.', descKn: 'ಕಿರಣ ಫೌಂಡೇಶನ್ ಹಿಂದಿನ ಕಥೆ.',
    //   date: '2026-06-01', listenUrl: 'PASTE_PODCAST_LINK_HERE' }
  ];

  var videos = [
    { videoId: 'PASTE_YOUTUBE_VIDEO_ID', titleEn: 'Job Fair Highlights', titleKn: 'ಉದ್ಯೋಗ ಮೇಳ ಮುಖ್ಯಾಂಶಗಳು',
      descEn: 'Highlights from our annual job fair connecting youth with employers.', descKn: 'ಯುವಕರನ್ನು ಉದ್ಯೋಗದಾತರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವ ನಮ್ಮ ವಾರ್ಷಿಕ ಉದ್ಯೋಗ ಮೇಳದ ಮುಖ್ಯಾಂಶಗಳು.' },
    { videoId: 'PASTE_YOUTUBE_VIDEO_ID', titleEn: 'Digital Literacy Program', titleKn: 'ಡಿಜಿಟಲ್ ಸಾಕ್ಷರತೆ ಕಾರ್ಯಕ್ರಮ',
      descEn: 'Watch our youth learn essential computer and internet skills.', descKn: 'ನಮ್ಮ ಯುವಕರು ಅಗತ್ಯ ಕಂಪ್ಯೂಟರ್ ಮತ್ತು ಇಂಟರ್ನೆಟ್ ಕೌಶಲ್ಯಗಳನ್ನು ಕಲಿಯುವುದನ್ನು ವೀಕ್ಷಿಸಿ.' }
  ];

  // IMPORTANT: Replace these 3 placeholder stories with REAL consenting participants' words before launch.
  var stories = [
    { name: 'REPLACE WITH REAL STORY',
      outcomeEn: 'Got a job in electrical maintenance', outcomeKn: 'ವಿದ್ಯುತ್ ನಿರ್ವಹಣೆಯಲ್ಲಿ ಉದ್ಯೋಗ ಪಡೆದರು',
      quoteEn: 'KIRAN Foundation taught me skills I never thought I could learn. Today I have a stable job and can support my family.',
      quoteKn: 'ಕಿರಣ ಫೌಂಡೇಶನ್ ನಾನು ಕಲಿಯಬಹುದೆಂದು ಎಂದೂ ಭಾವಿಸದ ಕೌಶಲ್ಯಗಳನ್ನು ಕಲಿಸಿತು. ಇಂದು ನನಗೆ ಸ್ಥಿರ ಉದ್ಯೋಗವಿದೆ ಮತ್ತು ನನ್ನ ಕುಟುಂಬವನ್ನು ಬೆಂಬಲಿಸಬಲ್ಲೆ.' },
    { name: 'REPLACE WITH REAL STORY',
      outcomeEn: 'Started a tailoring business from home', outcomeKn: 'ಮನೆಯಿಂದ ಹೊಲಿಗೆ ವ್ಯಾಪಾರ ಪ್ರಾರಂಭಿಸಿದರು',
      quoteEn: 'The vocational training gave me the confidence to start my own business. I now employ two other women from my village.',
      quoteKn: 'ವೃತ್ತಿಪರ ತರಬೇತಿ ನನಗೆ ಸ್ವಂತ ವ್ಯಾಪಾರ ಪ್ರಾರಂಭಿಸಲು ಆತ್ಮವಿಶ್ವಾಸ ನೀಡಿತು. ನಾನು ಈಗ ನನ್ನ ಗ್ರಾಮದ ಇತರ ಇಬ್ಬರು ಮಹಿಳೆಯರಿಗೆ ಉದ್ಯೋಗ ನೀಡಿದ್ದೇನೆ.' },
    { name: 'REPLACE WITH REAL STORY',
      outcomeEn: 'Secured government scholarship for higher studies', outcomeKn: 'ಉನ್ನತ ಅಧ್ಯಯನಕ್ಕಾಗಿ ಸರ್ಕಾರಿ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪಡೆದರು',
      quoteEn: 'I did not know these schemes existed until KIRAN helped me apply. Now I am pursuing my engineering degree without financial worry.',
      quoteKn: 'ಕಿರಣ ನನಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಸಹಾಯ ಮಾಡುವವರೆಗೆ ಈ ಯೋಜನೆಗಳು ಅಸ್ತಿತ್ವದಲ್ಲಿವೆ ಎಂದು ನನಗೆ ತಿಳಿದಿರಲಿಲ್ಲ. ಈಗ ನಾನು ಆರ್ಥಿಕ ಚಿಂತೆಯಿಲ್ಲದೆ ಎಂಜಿನಿಯರಿಂಗ್ ಪದವಿ ಪಡೆಯುತ್ತಿದ್ದೇನೆ.' }
  ];

  var pressItems = [
    { outletName: 'Placeholder News Outlet', headlineEn: 'KIRAN Foundation launches digital literacy drive in Kudachi', headlineKn: 'ಕಿರಣ ಫೌಂಡೇಶನ್ ಕುದಚಿಯಲ್ಲಿ ಡಿಜಿಟಲ್ ಸಾಕ್ಷರತೆ ಅಭಿಯಾನ ಪ್ರಾರಂಭಿಸಿದೆ',
      date: '2026-06-01', url: 'PASTE_ARTICLE_LINK_HERE' },
    { outletName: 'Placeholder News Outlet', headlineEn: 'Youth employment fair draws 200+ participants in Raibag Taluk', headlineKn: 'ರಾಯಬಾಗ ತಾಲ್ಲೂಕಿನಲ್ಲಿ ಯುವ ಉದ್ಯೋಗ ಮೇಳ 200+ ಭಾಗವಹಿಸುವವರನ್ನು ಆಕರ್ಷಿಸಿದೆ',
      date: '2026-05-15', url: 'PASTE_ARTICLE_LINK_HERE' }
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
  }

  function getCurrentLang() {
    return document.body.getAttribute('data-lang') || 'en';
  }

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { setLanguage(btn.getAttribute('data-lang')); });
  });

  var savedLang = localStorage.getItem(LANG_KEY) || 'en';
  setLanguage(savedLang);


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
  // MODAL SYSTEM (registration, volunteer, video)
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
      var target = this.getAttribute('data-open-modal');
      openModal(target + '-modal');
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
  // GALLERY — render + lightbox
  // ════════════════════════════════════════

  var galleryGrid = document.getElementById('gallery-grid');
  var currentGalleryIndex = 0;

  function renderGallery() {
    var lang = getCurrentLang();
    var html = '';
    galleryItems.forEach(function (item, i) {
      var caption = lang === 'kn' ? item.captionKn : item.captionEn;
      var bgColor = galleryColors[i % galleryColors.length];
      var inner;
      if (item.src) {
        inner = '<img src="' + item.src + '" alt="' + caption + '" loading="lazy">';
      } else {
        inner = '<div class="gallery-placeholder" style="background:' + bgColor + '">' +
          '<span class="placeholder-icon">📷</span>' +
          '<span data-en="Photo coming soon" data-kn="ಫೋಟೋ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ">' +
          (lang === 'kn' ? 'ಫೋಟೋ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ' : 'Photo coming soon') + '</span></div>';
      }
      html += '<div class="gallery-item" tabindex="0" role="button" aria-label="' + caption + '" data-index="' + i + '">' +
        inner +
        '<div class="gallery-caption" data-en="' + item.captionEn + '" data-kn="' + item.captionKn + '">' + caption + '</div></div>';
    });
    galleryGrid.innerHTML = html;

    galleryGrid.querySelectorAll('.gallery-item').forEach(function (el) {
      el.addEventListener('click', function () { openLightbox(parseInt(this.dataset.index)); });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(parseInt(this.dataset.index)); }
      });
    });
  }

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
    var caption = lang === 'kn' ? item.captionKn : item.captionEn;
    lightboxCaption.textContent = caption;

    if (item.src) {
      lightboxImg.src = item.src;
      lightboxImg.alt = caption;
      lightboxImg.style.display = '';
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

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length; updateLightbox(); }
    if (e.key === 'ArrowRight') { currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length; updateLightbox(); }
  });

  renderGallery();


  // ════════════════════════════════════════
  // PODCAST — render
  // ════════════════════════════════════════

  var podcastList = document.getElementById('podcast-list');

  function renderPodcast() {
    var lang = getCurrentLang();
    if (podcastEpisodes.length === 0) {
      podcastList.innerHTML = '<div class="podcast-empty">' +
        '<div class="empty-icon">🎙️</div>' +
        '<p data-en="First episode coming soon — stay tuned!" data-kn="ಮೊದಲ ಸಂಚಿಕೆ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ — ನಮ್ಮೊಂದಿಗಿರಿ!">' +
        (lang === 'kn' ? 'ಮೊದಲ ಸಂಚಿಕೆ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ — ನಮ್ಮೊಂದಿಗಿರಿ!' : 'First episode coming soon — stay tuned!') + '</p></div>';
      return;
    }

    var html = '';
    podcastEpisodes.forEach(function (ep) {
      var title = lang === 'kn' ? ep.titleKn : ep.titleEn;
      var desc = lang === 'kn' ? ep.descKn : ep.descEn;
      var listenText = lang === 'kn' ? 'ಆಲಿಸಿ ▶' : 'Listen ▶';
      html += '<div class="podcast-card">' +
        '<div class="podcast-icon">🎙️</div>' +
        '<div class="podcast-info">' +
        '<h3 data-en="' + ep.titleEn + '" data-kn="' + ep.titleKn + '">' + title + '</h3>' +
        '<div class="podcast-date">' + ep.date + '</div>' +
        '<p data-en="' + ep.descEn + '" data-kn="' + ep.descKn + '">' + desc + '</p>' +
        '<a href="' + ep.listenUrl + '" target="_blank" rel="noopener noreferrer" class="podcast-listen">' + listenText + '</a>' +
        '</div></div>';
    });
    podcastList.innerHTML = html;
  }

  renderPodcast();


  // ════════════════════════════════════════
  // VIDEOS — render + modal
  // ════════════════════════════════════════

  var videosGrid = document.getElementById('videos-grid');
  var PLACEHOLDER_ID = 'PASTE_YOUTUBE_VIDEO_ID';

  function renderVideos() {
    var lang = getCurrentLang();
    var html = '';
    videos.forEach(function (v, i) {
      var title = lang === 'kn' ? v.titleKn : v.titleEn;
      var desc = lang === 'kn' ? v.descKn : v.descEn;
      var isPlaceholder = !v.videoId || v.videoId === PLACEHOLDER_ID;
      var thumb;
      if (isPlaceholder) {
        thumb = '<div class="video-placeholder-thumb">' +
          '<span class="placeholder-icon">🎬</span>' +
          '<span data-en="Video coming soon" data-kn="ವಿಡಿಯೋ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ">' +
          (lang === 'kn' ? 'ವಿಡಿಯೋ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ' : 'Video coming soon') + '</span></div>';
      } else {
        thumb = '<img src="https://img.youtube.com/vi/' + v.videoId + '/hqdefault.jpg" alt="' + title + '" loading="lazy">';
      }

      html += '<div class="video-card" tabindex="0" role="button" aria-label="' + title + '" data-index="' + i + '">' +
        '<div class="video-thumb">' + thumb +
        '<div class="video-play-overlay"><div class="play-circle">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>' +
        '</div></div></div>' +
        '<div class="video-card-body">' +
        '<h3 data-en="' + v.titleEn + '" data-kn="' + v.titleKn + '">' + title + '</h3>' +
        '<p data-en="' + v.descEn + '" data-kn="' + v.descKn + '">' + desc + '</p>' +
        '</div></div>';
    });
    videosGrid.innerHTML = html;

    videosGrid.querySelectorAll('.video-card').forEach(function (card) {
      function handleClick() {
        var idx = parseInt(card.dataset.index);
        var v = videos[idx];
        var isPlaceholder = !v.videoId || v.videoId === PLACEHOLDER_ID;
        var container = document.getElementById('video-embed-container');
        var titleEl = document.getElementById('modal-title-video');
        var lang = getCurrentLang();
        titleEl.textContent = lang === 'kn' ? v.titleKn : v.titleEn;

        if (isPlaceholder) {
          container.innerHTML = '<div class="video-embed-placeholder" data-en="Video coming soon" data-kn="ವಿಡಿಯೋ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ">' +
            (lang === 'kn' ? 'ವಿಡಿಯೋ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ' : 'Video coming soon') + '</div>';
        } else {
          container.innerHTML = '<iframe src="https://www.youtube.com/embed/' + v.videoId + '?autoplay=1" ' +
            'title="' + (lang === 'kn' ? v.titleKn : v.titleEn) + '" allow="autoplay; encrypted-media" allowfullscreen loading="lazy"></iframe>';
        }
        openModal('video-modal');
      }
      card.addEventListener('click', handleClick);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(); }
      });
    });
  }

  renderVideos();


  // ════════════════════════════════════════
  // STORIES — render
  // ════════════════════════════════════════

  var storiesCarousel = document.getElementById('stories-carousel');

  function renderStories() {
    var lang = getCurrentLang();
    var html = '';
    stories.forEach(function (s) {
      var outcome = lang === 'kn' ? s.outcomeKn : s.outcomeEn;
      var quote = lang === 'kn' ? s.quoteKn : s.quoteEn;
      var isPlaceholder = s.name === 'REPLACE WITH REAL STORY';
      html += '<div class="story-card">' +
        '<div class="story-avatar">👤</div>' +
        '<div class="story-name">' + s.name + '</div>' +
        '<div class="story-outcome" data-en="' + s.outcomeEn + '" data-kn="' + s.outcomeKn + '">' + outcome + '</div>' +
        '<div class="story-quote" data-en="' + s.quoteEn + '" data-kn="' + s.quoteKn + '">' + quote + '</div>' +
        (isPlaceholder ? '<div class="story-placeholder-tag">REPLACE WITH REAL STORY</div>' : '') +
        '</div>';
    });
    storiesCarousel.innerHTML = html;
  }

  renderStories();


  // ════════════════════════════════════════
  // PRESS — render
  // ════════════════════════════════════════

  var pressList = document.getElementById('press-list');

  function renderPress() {
    var lang = getCurrentLang();
    if (pressItems.length === 0) {
      pressList.innerHTML = '<div class="press-empty"><p data-en="Press coverage coming soon." data-kn="ಪತ್ರಿಕಾ ವರದಿ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ.">' +
        (lang === 'kn' ? 'ಪತ್ರಿಕಾ ವರದಿ ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ.' : 'Press coverage coming soon.') + '</p></div>';
      return;
    }

    var outletHeader = lang === 'kn' ? 'ಸಂಸ್ಥೆ' : 'Outlet';
    var headlineHeader = lang === 'kn' ? 'ಶೀರ್ಷಿಕೆ' : 'Headline';
    var dateHeader = lang === 'kn' ? 'ದಿನಾಂಕ' : 'Date';

    var html = '<table class="press-table"><thead><tr>' +
      '<th>' + outletHeader + '</th><th>' + headlineHeader + '</th><th>' + dateHeader + '</th></tr></thead><tbody>';
    pressItems.forEach(function (item) {
      var headline = lang === 'kn' ? item.headlineKn : item.headlineEn;
      var isPlaceholder = !item.url || item.url === 'PASTE_ARTICLE_LINK_HERE';
      var headlineCell = isPlaceholder
        ? headline
        : '<a href="' + item.url + '" target="_blank" rel="noopener noreferrer">' + headline + '</a>';
      html += '<tr><td>' + item.outletName + '</td><td>' + headlineCell + '</td><td>' + item.date + '</td></tr>';
    });
    html += '</tbody></table>';
    pressList.innerHTML = html;
  }

  renderPress();


  // ════════════════════════════════════════
  // PRESS DOWNLOAD — graceful fallback
  // ════════════════════════════════════════

  var pressDownload = document.getElementById('press-download');
  if (pressDownload) {
    pressDownload.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      var self = this;
      fetch(href, { method: 'HEAD' }).then(function (resp) {
        if (!resp.ok) {
          e.preventDefault();
          var lang = getCurrentLang();
          var msg = lang === 'kn'
            ? 'ಪ್ರೆಸ್ ನೋಟ್ ಇನ್ನೂ ಅಪ್‌ಲೋಡ್ ಆಗಿಲ್ಲ. ಶೀಘ್ರದಲ್ಲೇ ಲಭ್ಯವಾಗಲಿದೆ!'
            : 'Press note not uploaded yet. Coming soon!';
          var notice = document.createElement('div');
          notice.textContent = msg;
          notice.style.cssText = 'background:rgba(247,147,30,0.15);border:1px solid rgba(247,147,30,0.3);color:#FBB03B;padding:10px 18px;border-radius:8px;margin-top:12px;font-size:0.88rem;display:inline-block;';
          self.parentNode.appendChild(notice);
          setTimeout(function () { notice.remove(); }, 4000);
        }
      }).catch(function () {
        e.preventDefault();
        var lang = getCurrentLang();
        var msg = lang === 'kn'
          ? 'ಪ್ರೆಸ್ ನೋಟ್ ಇನ್ನೂ ಅಪ್‌ಲೋಡ್ ಆಗಿಲ್ಲ. ಶೀಘ್ರದಲ್ಲೇ ಲಭ್ಯವಾಗಲಿದೆ!'
          : 'Press note not uploaded yet. Coming soon!';
        var notice = document.createElement('div');
        notice.textContent = msg;
        notice.style.cssText = 'background:rgba(247,147,30,0.15);border:1px solid rgba(247,147,30,0.3);color:#FBB03B;padding:10px 18px;border-radius:8px;margin-top:12px;font-size:0.88rem;display:inline-block;';
        self.parentNode.appendChild(notice);
        setTimeout(function () { notice.remove(); }, 4000);
      });
    });
  }


  // ════════════════════════════════════════
  // RE-RENDER ON LANGUAGE CHANGE
  // ════════════════════════════════════════

  var origSetLanguage = setLanguage;
  setLanguage = function (lang) {
    origSetLanguage(lang);
    renderGallery();
    renderPodcast();
    renderVideos();
    renderStories();
    renderPress();
  };

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { setLanguage(btn.getAttribute('data-lang')); });
  });


  // ════════════════════════════════════════
  // ANIMATED COUNTERS
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
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = target.toLocaleString() + suffix;
          counter.dataset.animated = '1';
        }
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
    var impactObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounters();
          animateImpactBars();
        }
      });
    }, { threshold: 0.2 });
    impactObserver.observe(impactSection);
  }


  // ════════════════════════════════════════
  // TEXT-TO-SPEECH
  // ════════════════════════════════════════

  function getTTSText(sectionId) {
    var section = document.getElementById(sectionId);
    if (!section) return '';
    var lang = getCurrentLang();
    var textEls = section.querySelectorAll('[data-en][data-kn]');
    var parts = [];
    textEls.forEach(function (el) {
      var text = el.getAttribute('data-' + lang);
      if (text) parts.push(text);
    });
    return parts.join('. ');
  }

  function hasVoiceForLang(langPrefix) {
    var voices = speechSynthesis.getVoices();
    return voices.some(function (v) { return v.lang.startsWith(langPrefix); });
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

      var voices = speechSynthesis.getVoices();
      var match = voices.find(function (v) { return v.lang.startsWith(langPrefix); });
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
  // JOIN US FORM — sends to your email via Formspree or stores locally
  // ════════════════════════════════════════

  var SUBMISSIONS_KEY = 'kiran-join-submissions';

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

      var entry = {
        name: nameEl.value.trim(),
        phone: phoneEl.value.trim(),
        email: emailEl.value.trim(),
        date: new Date().toISOString()
      };

      var saved = [];
      try { saved = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || '[]'); } catch (_) {}
      saved.push(entry);
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(saved));

      joinStatus.textContent = lang === 'kn'
        ? 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ವಿವರಗಳು ಸಲ್ಲಿಸಲಾಗಿದೆ. ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ!'
        : 'Thank you! Your details have been submitted. We will reach out to you soon!';
      joinStatus.className = 'join-form-status success';

      joinForm.reset();
    });
  }

})();
