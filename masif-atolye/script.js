// ===== MASIF SPECIAL - INTERACTIONS =====

document.addEventListener("DOMContentLoaded", () => {
  // --- Page Loader ---
  const loader = document.getElementById("pageLoader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 2500);
  });

  // Fallback: hide loader after 5s max
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 5000);

  // --- Navbar Scroll ---
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  function handleNavScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active section highlight
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", handleNavScroll, { passive: true });
  handleNavScroll();

  // --- Mobile Menu ---
  const menuToggle = document.getElementById("menuToggle");
  const navLinksContainer = document.getElementById("navLinks");
  const navOverlay = document.getElementById("navOverlay");

  function toggleMenu() {
    menuToggle.classList.toggle("active");
    navLinksContainer.classList.toggle("active");
    navOverlay.classList.toggle("active");
    document.body.style.overflow = navLinksContainer.classList.contains(
      "active",
    )
      ? "hidden"
      : "";
  }

  menuToggle.addEventListener("click", toggleMenu);
  navOverlay.addEventListener("click", toggleMenu);

  // Close menu on link click
  navLinksContainer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinksContainer.classList.contains("active")) {
        toggleMenu();
      }
    });
  });

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // --- Scroll Reveal (Intersection Observer) ---
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Lightbox ---
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");

  document.querySelectorAll("[data-lightbox]").forEach((card) => {
    card.addEventListener("click", (e) => {
      // Don't open lightbox if the user clicked a link inside the card
      if (e.target.closest(".product-link")) {
        return;
      }

      const imgSrc = card.getAttribute("data-lightbox");
      lightboxImg.src = imgSrc;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    setTimeout(() => {
      lightboxImg.src = "";
    }, 400);
  }

  lightboxClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });

  // --- Showcase Gallery Slider (reusable) ---
  function initShowcase(trackEl, prevBtn, nextBtn, dotsContainer) {
    if (!trackEl) return;

    const slides = trackEl.querySelectorAll(".showcase-slide");
    let currentPage = 0;
    let slidesPerView = 3;
    let autoPlayTimer;

    function getSlidesPerView() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function getTotalPages() {
      return Math.ceil(slides.length / slidesPerView);
    }

    function updateSlider() {
      const gap = 24;
      const wrapperWidth = trackEl.parentElement.offsetWidth;
      const slideWidth = (wrapperWidth - (gap * (slidesPerView - 1))) / slidesPerView;
      const offset = currentPage * (slideWidth + gap) * slidesPerView;
      const maxOffset = trackEl.scrollWidth - wrapperWidth;
      trackEl.style.transform = `translateX(-${Math.min(offset, Math.max(maxOffset, 0))}px)`;
      updateDots();
    }

    function createDots() {
      dotsContainer.innerHTML = '';
      const totalPages = getTotalPages();
      for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('button');
        dot.classList.add('showcase-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          currentPage = i;
          updateSlider();
          resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateDots() {
      const dots = dotsContainer.querySelectorAll('.showcase-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentPage);
      });
    }

    function nextSlide() {
      const totalPages = getTotalPages();
      currentPage = (currentPage + 1) % totalPages;
      updateSlider();
    }

    function prevSlide() {
      const totalPages = getTotalPages();
      currentPage = (currentPage - 1 + totalPages) % totalPages;
      updateSlider();
    }

    function startAutoPlay() {
      autoPlayTimer = setInterval(nextSlide, 4500);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayTimer);
      startAutoPlay();
    }

    nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
    prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

    // Touch/drag
    let startX = 0;
    let isDragging = false;

    trackEl.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    }, { passive: true });

    trackEl.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) { nextSlide(); } else { prevSlide(); }
        resetAutoPlay();
      }
      isDragging = false;
    });

    // Resize
    window.addEventListener('resize', () => {
      const newSpv = getSlidesPerView();
      if (newSpv !== slidesPerView) {
        slidesPerView = newSpv;
        currentPage = 0;
        createDots();
        updateSlider();
      }
    });

    // Hover pause
    trackEl.parentElement.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    trackEl.parentElement.addEventListener('mouseleave', startAutoPlay);

    // Lightbox for slides
    slides.forEach(slide => {
      slide.addEventListener('click', () => {
        const imgSrc = slide.getAttribute('data-lightbox');
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    // Init
    slidesPerView = getSlidesPerView();
    createDots();
    updateSlider();
    startAutoPlay();
  }

  // Init Wall Clock Showcase
  initShowcase(
    document.getElementById("showcaseTrack"),
    document.getElementById("showcasePrev"),
    document.getElementById("showcaseNext"),
    document.getElementById("showcaseDots")
  );

  // Init Desktop Clock Showcase
  initShowcase(
    document.querySelector('[data-showcase-track="desk"]'),
    document.querySelector('[data-showcase="desk"].showcase-prev'),
    document.querySelector('[data-showcase="desk"].showcase-next'),
    document.querySelector('[data-showcase-dots="desk"]')
  );

  // Init Vase & Candleholder Showcase
  initShowcase(
    document.querySelector('[data-showcase-track="vase"]'),
    document.querySelector('[data-showcase="vase"].showcase-prev'),
    document.querySelector('[data-showcase="vase"].showcase-next'),
    document.querySelector('[data-showcase-dots="vase"]')
  );

  // Init Decorative Products Showcase
  initShowcase(
    document.querySelector('[data-showcase-track="deco"]'),
    document.querySelector('[data-showcase="deco"].showcase-prev'),
    document.querySelector('[data-showcase="deco"].showcase-next'),
    document.querySelector('[data-showcase-dots="deco"]')
  );

  // --- Contact Form (Frontend only) ---
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector(".btn-submit");
    const originalText = btn.innerHTML;

    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" style="width:16px;height:16px">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
      </svg>
      Mesajınız Alındı!
    `;
    btn.style.background = "#2d8a4e";
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = "";
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });

  // --- Parallax Hero (subtle) ---
  const heroBg = document.querySelector(".hero-bg img");

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY < window.innerHeight) {
        const offset = window.scrollY * 0.3;
        heroBg.style.transform = `translateY(${offset}px) scale(1.05)`;
      }
    },
    { passive: true },
  );
});

// ===== VIDEO MUTE TOGGLE (legacy) =====
function toggleVideoMute(btn) {
  const video = btn.closest('.video-card').querySelector('video');
  video.muted = !video.muted;
  btn.textContent = video.muted ? '🔇' : '🔊';
}

// ===== VIDEO SLIDER =====
(function initVideoSliders() {
  document.querySelectorAll('.video-slider').forEach(slider => {
    const track = slider.querySelector('.vs-track');
    const slides = Array.from(slider.querySelectorAll('.vs-slide'));
    const prevBtn = slider.querySelector('.vs-prev');
    const nextBtn = slider.querySelector('.vs-next');
    const dotsContainer = slider.querySelector('.vs-dots');

    if (!slides.length) return;

    let current = 0;

    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'vs-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    function updateDots() {
      dotsContainer.querySelectorAll('.vs-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    }

    function goTo(index) {
      const prevVideo = slides[current].querySelector('video');
      if (prevVideo) prevVideo.pause();

      current = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      updateDots();

      const newVideo = slides[current].querySelector('video');
      if (newVideo) newVideo.play().catch(() => {});
    }

    prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

    // Touch/swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 45) goTo(diff > 0 ? current + 1 : current - 1);
    });

    // Pause when scrolled out of view
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = slides[current].querySelector('video');
        if (!video) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.25 });
    observer.observe(slider);

    // Mute buttons
    slider.querySelectorAll('.vs-mute').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const video = btn.closest('.vs-slide').querySelector('video');
        video.muted = !video.muted;
        btn.textContent = video.muted ? '🔇' : '🔊';
      });
    });
  });
})();

// ===== PRODUCT PAGE GALLERY SWITCHER =====
function switchGallery(thumb, src, type) {
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  thumb.classList.add('active');
  const main = document.getElementById('galleryMain');
  if (!main) return;
  if (type === 'video') {
    main.innerHTML = '<div style="position:relative;width:100%;height:100%"><video autoplay muted loop playsinline style="width:100%;height:100%;object-fit:contain;"><source src="' + src + '" type="video/mp4"/></video><button class="gallery-mute-btn" onclick="toggleGalleryMute(this)" style="position:absolute;bottom:16px;right:16px;width:44px;height:44px;border-radius:50%;border:none;background:rgba(0,0,0,0.6);color:#fff;font-size:1.2rem;cursor:pointer;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(8px);transition:transform 0.2s ease;" onmouseover="this.style.transform=\'scale(1.1)\'" onmouseout="this.style.transform=\'scale(1)\'">🔇</button></div>';
  } else {
    main.innerHTML = '<img src="' + src + '" alt="Ürün görseli" id="galleryMainImg" data-lightbox="' + src + '" onclick="openLightbox(\'' + src + '\')" style="cursor:pointer"/>';
  }
}

function toggleGalleryMute(btn) {
  var video = btn.parentElement.querySelector('video');
  if (!video) return;
  video.muted = !video.muted;
  btn.textContent = video.muted ? '🔇' : '🔊';
}

