/* ==========================================================================
   Sunrise Legacy Interior — Main Script
   ========================================================================== */

/**
 * 1. SHOP CONFIGURATION
 * Replace the placeholders below with your actual store details.
 * Updating these values automatically updates the page, WhatsApp buttons,
 * enquiry form, map, and footer links.
 */
const SHOP_CONFIG = {
  // Digits only with country code (e.g., "2348012345678")
  whatsappNumber: "234XXXXXXXXXX",
  whatsappDisplay: "[YOUR NUMBER, digits only with country code]",
  phone: "[YOUR PHONE]",
  address: "[YOUR ADDRESS]",
  hours: "[YOUR HOURS]",

  // Google Maps location query or full embed URL
  mapQuery: "Sunrise Legacy Interior",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.728632512259!2d3.4245!3d6.4281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf53280e7648d%3A0x4d01e5de6b847fe!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng",

  // Social media profile links
  social: {
    instagram: "[LINK]",
    facebook: "[LINK]",
    tiktok: "[LINK]"
  }
};

/**
 * 2. PRODUCT CATALOGUE FALLBACK
 * You can edit products directly in `products.json` (recommended) OR in this
 * list below.
 *
 * To swap a category's temporary SVG illustration for real product photos:
 * 1. Put your photos in `/images/`
 * 2. Add the file paths to `photos: ["images/your-photo.jpg"]`
 * 3. Change `usePhotos: false` to `usePhotos: true`
 */
const DEFAULT_CATALOGUE = [
  {
    category: "Appliances",
    usePhotos: false,
    photos: ["images/photo-0.jpg", "images/photo-7.jpg", "images/photo-10.jpg"],
    items: [
      { name: "Electric Kettle", description: "Simple, dependable hot water" },
      { name: "Blender", description: "Everyday blending, made easy" },
      { name: "Microwave", description: "Countertop convenience" },
      { name: "Rechargeable Hand Fan", description: "Portable cooling" }
    ]
  },
  {
    category: "Kitchen & Dining",
    usePhotos: false,
    photos: ["images/photo-2.jpg", "images/photo-5.jpg"],
    items: [
      { name: "Cooking Pots", description: "Cookware for family meals" },
      { name: "Plates & Ceramic Bowls", description: "Tableware for every day" },
      { name: "Cutlery", description: "Clean table essentials" },
      { name: "Kitchen Sinks", description: "Ask about sizes and styles" }
    ]
  },
  {
    category: "Lighting & Fans",
    usePhotos: false,
    photos: ["images/photo-9.jpg", "images/photo-1.jpg"],
    items: [
      { name: "Chandeliers", description: "Statement lighting for any room" },
      { name: "Ceiling Fans", description: "Cooling that looks good" },
      { name: "Ceiling & Wall Lights", description: "Different types and styles" }
    ]
  },
  {
    category: "Electronics",
    usePhotos: false,
    photos: ["images/photo-1.jpg", "images/photo-11.jpg"],
    items: [
      { name: "Bluetooth Speaker", description: "Compact wireless sound" },
      { name: "Headphones", description: "Music and calls" },
      { name: "Phones", description: "Everyday connectivity" },
      { name: "Chargers & Covers", description: "Power and protection" }
    ]
  },
  {
    category: "Fashion & Footwear",
    usePhotos: false,
    photos: ["images/photo-3.jpg", "images/photo-4.jpg", "images/photo-6.jpg"],
    items: [
      { name: "Polo Shirts", description: "Easy everyday style" },
      { name: "Canvas Shoes", description: "Classic casual footwear" },
      { name: "Crocs", description: "Comfortable slip-ons" },
      { name: "Umbrellas", description: "For changing weather" }
    ]
  },
  {
    category: "Fragrances",
    usePhotos: false,
    photos: ["images/photo-8.jpg"],
    items: [
      { name: "Arabic Perfumes", description: "Distinctive, elegant scents" },
      { name: "Perfumes", description: "Scents for every day" }
    ]
  }
];

/**
 * 3. TEMPORARY CATEGORY ILLUSTRATIONS (SVG)
 */
const CATEGORY_SVGS = {
  "Lighting & Fans": `<svg viewBox="0 0 320 200" role="img" aria-label="Lighting & Fans illustration"><defs><linearGradient id="g-lf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0c0538"/><stop offset=".6" stop-color="#1c0f8a"/><stop offset="1" stop-color="#1668ff"/></linearGradient></defs><rect width="320" height="200" fill="url(#g-lf)"/><circle cx="270" cy="30" r="70" fill="#22d8ff" opacity=".18"/><circle cx="40" cy="180" r="60" fill="#7be8ff" opacity=".12"/><g fill="#fff" fill-opacity=".92" stroke="#7be8ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"><path d="M110 0V44" fill="none"/><circle cx="110" cy="48" r="6"/><path d="M50 92Q110 132 170 92" fill="none" stroke-width="4"/><path d="M50 92V86M80 108V100M110 114V108M140 108V100M170 92V86" fill="none"/></g><g fill="#fff3b0" stroke="none"><circle cx="50" cy="80" r="16" opacity=".25"/><circle cx="80" cy="94" r="16" opacity=".25"/><circle cx="110" cy="100" r="16" opacity=".25"/><circle cx="140" cy="94" r="16" opacity=".25"/><circle cx="170" cy="80" r="16" opacity=".25"/><circle cx="50" cy="80" r="7"/><circle cx="80" cy="94" r="7"/><circle cx="110" cy="100" r="7"/><circle cx="140" cy="94" r="7"/><circle cx="170" cy="80" r="7"/></g><g fill="#fff" fill-opacity=".92" stroke="#7be8ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"><path d="M240 0V78" fill="none"/><g><ellipse cx="240" cy="52" rx="12" ry="30"/><ellipse cx="240" cy="52" rx="12" ry="30" transform="rotate(90 240 90)"/><ellipse cx="240" cy="52" rx="12" ry="30" transform="rotate(180 240 90)"/><ellipse cx="240" cy="52" rx="12" ry="30" transform="rotate(270 240 90)"/></g><circle cx="240" cy="90" r="11" fill="#22d8ff"/></g></svg>`,
  "Kitchen & Dining": `<svg viewBox="0 0 320 200" role="img" aria-label="Kitchen & Dining illustration"><defs><linearGradient id="g-kd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0c0538"/><stop offset=".6" stop-color="#1c0f8a"/><stop offset="1" stop-color="#1668ff"/></linearGradient></defs><rect width="320" height="200" fill="url(#g-kd)"/><circle cx="270" cy="30" r="70" fill="#22d8ff" opacity=".18"/><circle cx="40" cy="180" r="60" fill="#7be8ff" opacity=".12"/><g fill="#fff" fill-opacity=".92" stroke="#7be8ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"><ellipse cx="215" cy="172" rx="58" ry="8" fill-opacity=".35"/><path d="M170 122H260Q260 166 215 166Q170 166 170 122Z"/><ellipse cx="215" cy="122" rx="45" ry="8" fill="#cfefff"/><rect x="60" y="100" width="80" height="52" rx="8"/><path d="M56 100Q100 68 144 100Z"/><circle cx="100" cy="76" r="5" fill="#22d8ff"/><rect x="44" y="112" width="16" height="7" rx="3"/><rect x="140" y="112" width="16" height="7" rx="3"/></g></svg>`,
  "Appliances": `<svg viewBox="0 0 320 200" role="img" aria-label="Appliances illustration"><defs><linearGradient id="g-ap" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0c0538"/><stop offset=".6" stop-color="#1c0f8a"/><stop offset="1" stop-color="#1668ff"/></linearGradient></defs><rect width="320" height="200" fill="url(#g-ap)"/><circle cx="270" cy="30" r="70" fill="#22d8ff" opacity=".18"/><circle cx="40" cy="180" r="60" fill="#7be8ff" opacity=".12"/><g fill="#fff" fill-opacity=".92" stroke="#7be8ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"><rect x="44" y="156" width="80" height="9" rx="4"/><rect x="50" y="98" width="68" height="58" rx="16"/><path d="M56 100Q84 80 112 100Z"/><path d="M116 112L138 92" fill="none" stroke-width="5"/><path d="M50 106Q26 108 28 132Q30 150 50 148" fill="none" stroke-width="5"/><rect x="198" y="50" width="54" height="9" rx="3"/><path d="M202 60H248L242 130H208Z" fill-opacity=".6"/><rect x="196" y="130" width="58" height="36" rx="8"/><circle cx="225" cy="148" r="6" fill="#22d8ff"/></g></svg>`,
  "Electronics": `<svg viewBox="0 0 320 200" role="img" aria-label="Electronics illustration"><defs><linearGradient id="g-el" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0c0538"/><stop offset=".6" stop-color="#1c0f8a"/><stop offset="1" stop-color="#1668ff"/></linearGradient></defs><rect width="320" height="200" fill="url(#g-el)"/><circle cx="270" cy="30" r="70" fill="#22d8ff" opacity=".18"/><circle cx="40" cy="180" r="60" fill="#7be8ff" opacity=".12"/><g fill="#fff" fill-opacity=".92" stroke="#7be8ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"><rect x="34" y="96" width="100" height="56" rx="28"/><path d="M66 106V142M84 106V142M102 106V142" fill="none"/><circle cx="50" cy="124" r="6" fill="#22d8ff"/><path d="M180 128Q180 62 226 62Q272 62 272 128" fill="none" stroke-width="7"/><rect x="170" y="112" width="20" height="40" rx="9" fill="#22d8ff"/><rect x="262" y="112" width="20" height="40" rx="9" fill="#22d8ff"/></g></svg>`,
  "Fashion & Footwear": `<svg viewBox="0 0 320 200" role="img" aria-label="Fashion & Footwear illustration"><defs><linearGradient id="g-ff" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0c0538"/><stop offset=".6" stop-color="#1c0f8a"/><stop offset="1" stop-color="#1668ff"/></linearGradient></defs><rect width="320" height="200" fill="url(#g-ff)"/><circle cx="270" cy="30" r="70" fill="#22d8ff" opacity=".18"/><circle cx="40" cy="180" r="60" fill="#7be8ff" opacity=".12"/><g fill="#fff" fill-opacity=".92" stroke="#7be8ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"><path d="M30 148V122Q56 122 70 100L92 108Q112 126 146 128Q168 130 168 148Z"/><rect x="28" y="146" width="142" height="12" rx="6" fill="#22d8ff"/><path d="M78 110L88 118M92 116L100 124M106 122L114 128" fill="none"/><path d="M218 64L240 74Q250 82 262 74L284 64L308 92L288 106L280 98V158H222V98L214 106L194 92Z"/><path d="M240 74L250 96L262 74" fill="none"/><circle cx="251" cy="108" r="2.5" fill="#22d8ff"/><circle cx="251" cy="122" r="2.5" fill="#22d8ff"/></g></svg>`,
  "Fragrances": `<svg viewBox="0 0 320 200" role="img" aria-label="Fragrances illustration"><defs><linearGradient id="g-fr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0c0538"/><stop offset=".6" stop-color="#1c0f8a"/><stop offset="1" stop-color="#1668ff"/></linearGradient></defs><rect width="320" height="200" fill="url(#g-fr)"/><circle cx="270" cy="30" r="70" fill="#22d8ff" opacity=".18"/><circle cx="40" cy="180" r="60" fill="#7be8ff" opacity=".12"/><g fill="#fff" fill-opacity=".92" stroke="#7be8ff" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"><rect x="70" y="92" width="62" height="70" rx="12"/><rect x="92" y="76" width="18" height="16"/><rect x="86" y="58" width="30" height="18" rx="5" fill="#22d8ff"/><rect x="82" y="114" width="38" height="24" rx="4" fill="#22d8ff" fill-opacity=".5"/><rect x="180" y="84" width="52" height="78" rx="10"/><rect x="198" y="66" width="16" height="18"/><path d="M194 66H218L214 54H198Z" fill="#22d8ff"/><rect x="190" y="112" width="32" height="20" rx="4" fill="#22d8ff" fill-opacity=".5"/></g><g fill="#fff"><path d="M150 60l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/><path d="M262 100l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/></g></svg>`
};

// Build a clean WhatsApp URL with optional pre-filled text
function buildWhatsAppUrl(message) {
  const num = SHOP_CONFIG.whatsappNumber.replace(/[^0-9A-Za-z]/g, "") || "234XXXXXXXXXX";
  if (!message) {
    return `https://wa.me/${num}`;
  }
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

// State for catalogue categories
let catalogueData = DEFAULT_CATALOGUE;

const tabsEl = document.getElementById("tabs");
const catEl = document.getElementById("cat");

function renderCategoryMedia(catObj) {
  if (catObj.usePhotos && Array.isArray(catObj.photos) && catObj.photos.length > 0) {
    return catObj.photos
      .map((src, idx) => {
        const isSingleOrWide = catObj.photos.length === 1 || (catObj.photos.length === 3 && idx === 0);
        const wrapperClass = isSingleOrWide ? ' class="one"' : "";
        return `<div${wrapperClass}><img src="${src}" alt="${catObj.category} product photo" loading="lazy" decoding="async"></div>`;
      })
      .join("");
  }

  const svgMarkup = CATEGORY_SVGS[catObj.category];
  if (svgMarkup) {
    return `<div class="art">${svgMarkup}</div>`;
  }

  return `<div class="logoph"><img src="images/logo.png" alt="Sunrise Legacy Interior" loading="lazy"></div>`;
}

function showCategory(categoryName) {
  if (!tabsEl || !catEl) return;

  const current =
    catalogueData.find((c) => c.category === categoryName) || catalogueData[0];
  if (!current) return;

  // Render tabs
  tabsEl.innerHTML = catalogueData
    .map((c) => {
      const isActive = c.category === current.category ? "on" : "";
      return `<button type="button" class="${isActive}" data-cat="${c.category}">${c.category}</button>`;
    })
    .join("");

  // Attach click handlers to tabs
  tabsEl.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      showCategory(btn.getAttribute("data-cat"));
    });
  });

  // Render category card (media + items list)
  const mediaHtml = renderCategoryMedia(current);
  const itemsHtml = current.items
    .map((item) => {
      const name = Array.isArray(item) ? item[0] : item.name;
      const desc = Array.isArray(item) ? item[1] : item.description;
      const askHref = buildWhatsAppUrl(`Hello, I want to enquire about: ${name}`);
      return `<li>
        <div>
          <b>${name}</b>
          <span>${desc}</span>
        </div>
        <a target="_blank" rel="noopener noreferrer" href="${askHref}">Ask</a>
      </li>`;
    })
    .join("");

  catEl.innerHTML = `<div class="cat"><div class="ph">${mediaHtml}</div><ul>${itemsHtml}</ul></div>`;
}

// Expose show() globally in case inline calls are used
window.show = showCategory;

// Load products.json so adding new products never requires editing layout code
async function initCatalogue() {
  try {
    const response = await fetch("products.json");
    if (response.ok) {
      const json = await response.json();
      if (json && Array.isArray(json.categories) && json.categories.length > 0) {
        catalogueData = json.categories;
      }
    }
  } catch (_) {
    // Fallback to DEFAULT_CATALOGUE when opened directly via file://
  }
  showCategory(catalogueData[0].category);
}

// Apply SHOP_CONFIG placeholders/values across the DOM
function applyShopConfig() {
  const defaultWaLink = buildWhatsAppUrl("Hello Sunrise Legacy Interior, I have an enquiry.");

  const waBtn = document.getElementById("wa");
  if (waBtn) waBtn.href = defaultWaLink;

  document.querySelectorAll(".wa2, .wa-float").forEach((a) => {
    a.href = defaultWaLink;
  });

  // Populate text placeholders if configured
  const heroMeta = document.getElementById("hero-meta");
  if (heroMeta) {
    heroMeta.textContent = `${SHOP_CONFIG.hours} · ${SHOP_CONFIG.address}`;
  }

  const bindText = (id, value) => {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  };

  bindText("info-address", SHOP_CONFIG.address);
  bindText("info-hours", SHOP_CONFIG.hours);
  bindText("info-phone", SHOP_CONFIG.phone);
  bindText("info-whatsapp", SHOP_CONFIG.whatsappDisplay || SHOP_CONFIG.whatsappNumber);
  bindText("footer-address", SHOP_CONFIG.address);
  bindText("footer-phone", SHOP_CONFIG.phone);
  bindText("footer-hours", SHOP_CONFIG.hours);

  const mapFrame = document.getElementById("shop-map");
  if (mapFrame && SHOP_CONFIG.mapEmbedUrl) {
    mapFrame.src = SHOP_CONFIG.mapEmbedUrl;
  }

  const igLink = document.getElementById("social-instagram");
  const fbLink = document.getElementById("social-facebook");
  const ttLink = document.getElementById("social-tiktok");

  if (igLink) igLink.href = SHOP_CONFIG.social.instagram;
  if (fbLink) fbLink.href = SHOP_CONFIG.social.facebook;
  if (ttLink) ttLink.href = SHOP_CONFIG.social.tiktok;
}

// Handle WhatsApp Enquiry Form submission
function initEnquiryForm() {
  const form = document.getElementById("f");
  const nameInput = document.getElementById("n");
  const prodInput = document.getElementById("pr");
  const msgInput = document.getElementById("m");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput ? nameInput.value.trim() : "";
    const product = prodInput ? prodInput.value.trim() : "";
    const message = msgInput ? msgInput.value.trim() : "";

    const composed =
      `Hello, I'm ${name}. ` +
      (product ? `Looking for: ${product}. ` : "") +
      message;

    const url = buildWhatsAppUrl(composed.trim());
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}

// Handle Mobile Navigation Menu & Footer Category Links
function initNavigation() {
  const menuBtn = document.getElementById("menu-toggle");
  const nav = document.getElementById("main-nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Allow footer shop links to select the corresponding category tab
  document.querySelectorAll("[data-select-cat]").forEach((link) => {
    link.addEventListener("click", () => {
      const cat = link.getAttribute("data-select-cat");
      if (cat) showCategory(cat);
    });
  });
}

// Initialize everything on DOM ready
applyShopConfig();
initCatalogue();
initEnquiryForm();
initNavigation();
