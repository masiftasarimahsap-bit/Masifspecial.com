// ===== i18n - Language Switching =====
(function() {
  'use strict';

  var translations = {
    tr: {
      nav_home: "Ana Sayfa",
      nav_products: "Ürünler",
      nav_about: "Hakkımızda",
      nav_stores: "Mağazalar",
      nav_contact: "İletişim",
      hero_badge: "masif special",
      hero_title: "El Yapımı Premium<br/>Masif Ahşap <em>Ürünler</em>",
      hero_desc: "Her parça, doğanın eşsiz dokusunu premium tasarımla buluşturur. Masif ahşabın sıcaklığını, modern çizgilerle yaşam alanlarınıza taşıyoruz.",
      hero_cta: "Koleksiyonu Keşfet",
      hero_scroll: "Keşfet",
      products_label: "Koleksiyonumuz",
      products_title: "El Yapımı Masif Ahşap Ürün <em>Koleksiyonumuz</em>",
      products_desc: "Doğal kayın ağacından, tek tek el işçiliğiyle üretilen premium ürünlerimizi keşfedin.",
      view_collection: "Koleksiyonu Gör →",
      cat_desk_clock: "Masaüstü Ahşap Saatler",
      cat_desk_clock_desc: "Doğal kayın ağacından, kemerli tasarım. 3 kadran modeli, sessiz mekanizma, kişiselleştirilebilir arka yüz.",
      cat_wall_clock: "Duvar Saatleri",
      cat_wall_clock_desc: "30cm ve 40cm boyutlarda, doğal kayın ağacından duvar saatleri. İsim, tarih veya logo kazıma seçeneği.",
      cat_candleholders: "Ahşap Şamdanlar",
      cat_candleholders_desc: "Torna tekniğiyle üretilen 5 farklı model. Tekli veya 3'lü set seçenekleri.",
      cat_vases: "Ahşap Dekoratif Vazolar",
      cat_vases_desc: "Kayın ve ceviz ağacından, damla ve şişe formlarında dekoratif vazolar.",
      cat_legs: "Mobilya Ayakları",
      cat_legs_desc: "Tornalanmış masif kayın ağacı mobilya ayakları. Klasik tornalı ve modern konik modeller.",
      cat_shelf: "Duvar Rafları",
      cat_shelf_desc: "Oval kemerli doğal ahşap duvar rafları. Açık ve koyu ton seçenekleri.",
      about_label: "Hikayemiz",
      about_title: "Masif Ahşap El İşçiliği <em>Hikayemiz</em>",
      about_p1: "Kayseri'den, doğanın en saf halini elinize ulaştırıyoruz. Her ürün, usta ellerden geçerek sizin için özel olarak şekilleniyor.",
      about_p2: "Kayın ağacının doğal dokusunu bozmadan, modern tasarım anlayışıyla buluşturuyoruz. Kimyasal işlem uygulamadan, ahşabın kendi hikâyesini anlatmasına izin veriyoruz.",
      stores_label: "Mağazalar",
      stores_title: "Online Ahşap Ürün <em>Mağazalarımız</em>",
      stores_visit: "Mağazayı Ziyaret Et",
      contact_label: "İletişim",
      contact_title: "Bizimle İletişime <em>Geçin</em>",
      contact_desc: "Özel sipariş, toplu alım veya herhangi bir soru için bizimle iletişime geçebilirsiniz.",
      contact_name: "Adınız",
      contact_email: "E-posta Adresiniz",
      contact_message: "Mesajınız",
      contact_submit: "Mesaj Gönder",
      contact_phone_label: "Telefon",
      contact_email_label: "E-posta",
      contact_location_label: "Konum",
      contact_whatsapp: "WhatsApp'tan Yazın",
      footer_products: "Ürünler",
      footer_links: "Bağlantılar",
      footer_stores: "Mağazalar",
      footer_copyright: "© 2025 masif. Tüm hakları saklıdır.",
      footer_privacy: "Gizlilik Politikası",
      footer_terms: "Kullanım Koşulları",
      whatsapp_tooltip: "WhatsApp ile yazın"
    },
    en: {
      nav_home: "Home",
      nav_products: "Products",
      nav_about: "About Us",
      nav_stores: "Stores",
      nav_contact: "Contact",
      hero_badge: "masif special",
      hero_title: "Handcrafted Premium<br/>Solid Wood <em>Products</em>",
      hero_desc: "Each piece brings nature's unique texture together with premium design. We bring the warmth of solid wood to your living spaces with modern lines.",
      hero_cta: "Explore Collection",
      hero_scroll: "Discover",
      products_label: "Our Collection",
      products_title: "Handcrafted Solid Wood Product <em>Collection</em>",
      products_desc: "Discover our premium products, each handcrafted one by one from natural beech wood.",
      view_collection: "View Collection →",
      cat_desk_clock: "Wooden Desk Clocks",
      cat_desk_clock_desc: "Natural beech wood, arched design. 3 dial models, silent mechanism, customizable back.",
      cat_wall_clock: "Wall Clocks",
      cat_wall_clock_desc: "30cm and 40cm sizes, natural beech wood wall clocks. Name, date, or logo engraving options.",
      cat_candleholders: "Wooden Candleholders",
      cat_candleholders_desc: "5 different models produced with lathe technique. Single or 3-piece set options.",
      cat_vases: "Decorative Wooden Vases",
      cat_vases_desc: "Beech and walnut wood, decorative vases in drop and bottle forms.",
      cat_legs: "Furniture Legs",
      cat_legs_desc: "Turned solid beech wood furniture legs. Classic turned and modern conical models.",
      cat_shelf: "Wall Shelves",
      cat_shelf_desc: "Oval arched natural wood wall shelves. Light and dark tone options.",
      about_label: "Our Story",
      about_title: "Solid Wood Craftsmanship <em>Story</em>",
      about_p1: "From Kayseri, we deliver nature's purest form to your hands. Each product is specially shaped for you by master craftsmen.",
      about_p2: "We combine the natural texture of beech wood with modern design philosophy without distorting it. Without chemical processing, we let the wood tell its own story.",
      stores_label: "Stores",
      stores_title: "Our Online Wood Product <em>Stores</em>",
      stores_visit: "Visit Store",
      contact_label: "Contact",
      contact_title: "Get in <em>Touch</em>",
      contact_desc: "Contact us for custom orders, bulk purchases, or any questions.",
      contact_name: "Your Name",
      contact_email: "Your Email",
      contact_message: "Your Message",
      contact_submit: "Send Message",
      contact_phone_label: "Phone",
      contact_email_label: "Email",
      contact_location_label: "Location",
      contact_whatsapp: "Message on WhatsApp",
      footer_products: "Products",
      footer_links: "Links",
      footer_stores: "Stores",
      footer_copyright: "© 2025 masif. All rights reserved.",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Use",
      whatsapp_tooltip: "Write on WhatsApp"
    }
  };

  var currentLang = localStorage.getItem('masif_lang') || 'tr';

  // Apply translations to all [data-i18n] elements
  function applyTranslations(lang) {
    var t = translations[lang];
    if (!t) return;

    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var key = el.getAttribute('data-i18n');
      if (t[key]) {
        if (t[key].indexOf('<') !== -1) {
          el.innerHTML = t[key];
        } else {
          el.textContent = t[key];
        }
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (t[key]) {
        el.setAttribute('placeholder', t[key]);
      }
    });

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Update toggle button state
    document.querySelectorAll('.lang-toggle-btn').forEach(function(btn) {
      var btnLang = btn.getAttribute('data-lang');
      btn.classList.toggle('active', btnLang === lang);
    });
  }

  // Switch language
  function switchLang(lang) {
    currentLang = lang;
    localStorage.setItem('masif_lang', lang);
    applyTranslations(lang);
  }

  // Initialize
  function init() {
    var navbar = document.querySelector('.navbar .container');
    if (navbar) {
      var menuToggle = navbar.querySelector('.menu-toggle');
      var toggle = document.createElement('div');
      toggle.className = 'lang-toggle';
      toggle.innerHTML = '<button class="lang-toggle-btn' + (currentLang === 'tr' ? ' active' : '') + '" data-lang="tr">TR</button>' +
                         '<button class="lang-toggle-btn' + (currentLang === 'en' ? ' active' : '') + '" data-lang="en">EN</button>';

      if (menuToggle) {
        navbar.insertBefore(toggle, menuToggle);
      } else {
        navbar.appendChild(toggle);
      }

      toggle.querySelectorAll('.lang-toggle-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
          switchLang(this.getAttribute('data-lang'));
        });
      });
    }

    // Apply saved language on load
    if (currentLang !== 'tr') {
      applyTranslations(currentLang);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.switchLang = switchLang;
})();
