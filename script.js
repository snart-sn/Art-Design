const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Portfolio filtering
const filters = document.querySelectorAll(".filter");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(btn => btn.classList.remove("active"));
    filter.classList.add("active");

    const category = filter.dataset.filter;
    portfolioItems.forEach(item => {
      const show = category === "all" || item.dataset.category === category;
      item.style.display = show ? "" : "none";
    });
  });
});

// Portfolio lightbox
const modal = document.getElementById("portfolioModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalClose = document.getElementById("modalClose");

const modalFrame = document.getElementById("modalFrame");

function openModal(item) {
  modalImage.src = item.dataset.image;
  modalImage.alt = item.dataset.title;
  modalTitle.textContent = item.dataset.title;
  modalCategory.textContent = item.dataset.category.toUpperCase();

  if (item.dataset.preview) {
    modalFrame.src = item.dataset.preview;
    modalFrame.style.display = "block";
    modalImage.style.display = "none";
  } else {
    modalFrame.src = "";
    modalFrame.style.display = "none";
    modalImage.style.display = "block";
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modalImage.src = "";
  modalFrame.src = "";
}

portfolioItems.forEach(item => {
  item.addEventListener("click", () => openModal(item));
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", e => {
  if (e.target.dataset.close === "true") closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Current year
document.getElementById("year").textContent = new Date().getFullYear();
