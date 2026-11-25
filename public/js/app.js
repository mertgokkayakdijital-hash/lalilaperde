document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  const slides = document.querySelectorAll(".hero-slider .slide");
  if (slides.length > 1) {
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 4500);
  }

  const FAV_KEY = "lalila_favorites_v1";
  const getFavorites = () => {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
    } catch {
      return [];
    }
  };
  const saveFavorites = (list) => {
    localStorage.setItem(FAV_KEY, JSON.stringify(list));
    updateFavUI();
  };
  const updateFavUI = () => {
    const favs = getFavorites();
    document.querySelectorAll(".favorite-btn .badge, #favCount").forEach((el) => {
      el.textContent = String(favs.length);
    });
    document.querySelectorAll(".fav-toggle-btn").forEach((btn) => {
      const id = btn.getAttribute("data-fav-id");
      const active = favs.includes(id);
      btn.textContent = active ? "❤️ Favoride" : "🤍 Favori";
    });
  };

  document.querySelectorAll(".fav-toggle-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-fav-id");
      if (!id) return;
      const favs = getFavorites();
      if (favs.includes(id)) {
        saveFavorites(favs.filter((item) => item !== id));
      } else {
        saveFavorites([...favs, id]);
      }
    });
  });

  const categoryBtns = document.querySelectorAll("#categoryFilters .filter-btn");
  const searchInput = document.getElementById("catalogSearch");
  const lightFilter = document.getElementById("lightFilter");
  const productCards = document.querySelectorAll("#productsGrid .product-card");
  const statusEl = document.getElementById("catalogStatus");

  let selectedCategory = "all";
  let onlyFavorites = false;

  const filterProducts = () => {
    if (!productCards.length) return;
    const query = (searchInput?.value || "").trim().toLowerCase();
    const light = lightFilter?.value || "all";
    const favs = getFavorites();
    let visibleCount = 0;

    productCards.forEach((card) => {
      const cat = card.getAttribute("data-category") || "";
      const cardLight = card.getAttribute("data-light") || "";
      const name = (card.getAttribute("data-name") || card.textContent || "").toLowerCase();
      const id = card.getAttribute("data-id") || "";

      const matchCat = selectedCategory === "all" || cat === selectedCategory;
      const matchLight = light === "all" || cardLight === light;
      const matchQuery = !query || name.includes(query);
      const matchFav = !onlyFavorites || favs.includes(id);

      const show = matchCat && matchLight && matchQuery && matchFav;
      card.style.display = show ? "" : "none";
      if (show) visibleCount++;
    });

    if (statusEl) {
      statusEl.textContent = `${visibleCount} ürün listeleniyor${onlyFavorites ? " (Favoriler filtresi aktif)" : ""}.`;
    }
  };

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      onlyFavorites = false;
      categoryBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      selectedCategory = btn.getAttribute("data-category") || "all";
      filterProducts();
    });
  });

  searchInput?.addEventListener("input", filterProducts);
  lightFilter?.addEventListener("change", filterProducts);

  const favBtn = document.getElementById("catalogFavoritesBtn");
  favBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    onlyFavorites = !onlyFavorites;
    filterProducts();
  });

  updateFavUI();
  filterProducts();
});
