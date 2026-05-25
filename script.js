const pageLoader = document.getElementById("pageLoader");
const menuClose = document.getElementById("menuClose");
const mobileMenu = document.getElementById("mobileMenu");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const darkModeToggle = document.getElementById("darkModeToggle");
const darkToggleMobile = document.getElementById("darkToggleMobile");
const toast = document.getElementById("toast");
const contactForm = document.getElementById("contactForm");
const faqButtons = document.querySelectorAll(".accordion button");
const serviceCards = Array.from(document.querySelectorAll(".service-card"));
const emptyState = document.getElementById("emptyState");
const modal = document.getElementById("detailModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.getElementById("modalClose");
const serviceSearchInputs = document.querySelectorAll(".service-search-input");
const heroCtaModal = document.getElementById("openServiceModal");
const body = document.body;

const themeStorageKey = "schoolyard-theme";


function toggleMobileMenu(open) {
  mobileMenu.classList.toggle("open", open);
  mobileMenu.setAttribute("aria-hidden", String(!open));
  body.classList.toggle("menu-open", open);
}

function filterServices() {
  const query = this.value.toLowerCase();
  let matches = 0;

  serviceCards.forEach((card) => {
    const title = card.dataset.title.toLowerCase();
    const text = card.textContent.toLowerCase();
    const isMatch = title.includes(query) || text.includes(query);
    card.classList.toggle("hidden", !isMatch);
    if (isMatch) matches += 1;
  });

  emptyState.classList.toggle("hidden", matches !== 0);
}

function toggleAccordion(event) {
  const button = event.currentTarget;
  const expanded = button.getAttribute("aria-expanded") === "true";
  faqButtons.forEach((item) => {
    item.setAttribute("aria-expanded", "false");
  });

  if (!expanded) {
    button.setAttribute("aria-expanded", "true");
  }
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("visible");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove("visible");
  }, 3200);
}

function submitContactForm(event) {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = formData.get("name").toString().trim();
  const email = formData.get("email").toString().trim();
  const message = formData.get("message").toString().trim();

  if (!name || !email || !message) {
    showToast("Lengkapi semua kolom terlebih dahulu.");
    return;
  }

  if (!validateEmail(email)) {
    showToast("Masukkan alamat email yang valid.");
    return;
  }

  contactForm.reset();
  showToast("Terima kasih! Pesan Anda telah dikirim.");
}

function openModal(event) {
  const button = event.currentTarget;
  const title = button.dataset.title || "Detail Layanan";
  const detail = button.dataset.detail || "Informasi layanan tidak tersedia.";

  modalTitle.textContent = title;
  modalDescription.textContent = detail;
  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
}

function handleScrollTop() {
  const visible = window.scrollY > 320;
  scrollTopBtn.classList.toggle("visible", visible);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function initListeners() {
  if (menuToggle)
    menuToggle.addEventListener("click", () => toggleMobileMenu(true));
  if (menuClose)
    menuClose.addEventListener("click", () => toggleMobileMenu(false));
  if (darkModeToggle) darkModeToggle.addEventListener("click", toggleTheme);
  if (darkToggleMobile)
    darkToggleMobile.addEventListener("click", () => {
      toggleTheme();
      toggleMobileMenu(false);
    });
  if (contactForm) contactForm.addEventListener("submit", submitContactForm);
  if (scrollTopBtn) scrollTopBtn.addEventListener("click", scrollToTop);
  if (heroCtaModal) heroCtaModal.addEventListener("click", openModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modal)
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
  faqButtons.forEach((button) =>
    button.addEventListener("click", toggleAccordion),
  );
  serviceSearchInputs.forEach((input) =>
    input.addEventListener("input", filterServices),
  );

  document.querySelectorAll("[data-service-detail]").forEach((button) => {
    button.addEventListener("click", openModal);
  });
}

window.addEventListener("load", () => {
  hideLoader();
  initTheme();
  handleScrollTop();
});

window.addEventListener("scroll", handleScrollTop);

initListeners();
