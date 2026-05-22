document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  /* ==========================================================================
     1. Search and Two-Tier Cascading Filter Logic
     ========================================================================== */
  const searchInput = document.getElementById('wardrobe-search-input');
  const itemsGrid = document.getElementById('wardrobe-items-grid');
  const cards = document.querySelectorAll('.wardrobe-card');
  const primaryFilters = document.querySelectorAll('#wardrobe-primary-filters .filter-btn-pill');
  const secondaryFilters = document.querySelectorAll('#wardrobe-secondary-filters .filter-style-chip');

  let activeType = 'all';
  let activeStyle = 'all';

  function applyFilters() {
    const query = searchInput.value.toLowerCase().trim();

    cards.forEach(card => {
      const itemType = card.dataset.itemType;
      const itemStyles = card.dataset.styleType.split(' ');
      const title = card.querySelector('h4').innerText.toLowerCase();
      const category = card.querySelector('.p-card-category').innerText.toLowerCase();

      // Check item type match
      const typeMatches = (activeType === 'all' || itemType === activeType);

      // Check style match
      const styleMatches = (activeStyle === 'all' || itemStyles.includes(activeStyle));

      // Check search match
      const searchMatches = (title.includes(query) || category.includes(query));

      if (typeMatches && styleMatches && searchMatches) {
        card.classList.remove('filtered-out');
      } else {
        card.classList.add('filtered-out');
      }
    });
  }

  // Primary filters selection (Type)
  primaryFilters.forEach(button => {
    button.addEventListener('click', () => {
      primaryFilters.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      activeType = button.dataset.itemType;
      applyFilters();
    });
  });

  // Secondary filters selection (Style)
  secondaryFilters.forEach(chip => {
    chip.addEventListener('click', () => {
      secondaryFilters.forEach(ch => ch.classList.remove('active'));
      chip.classList.add('active');
      activeStyle = chip.dataset.styleType;
      applyFilters();
    });
  });

  // Real-time search inputs
  searchInput.addEventListener('input', applyFilters);

  // Hotkey handled globally in app.js

  /* ==========================================================================
     3. Wishlist Toggle and Live Count Updates
     ========================================================================== */
  const heartButtons = document.querySelectorAll('#page-wardrobe .heart-wish-btn');
  const wishlistCounter = document.querySelector('#page-wardrobe #wishlist-counter-value');

  function updateWishlistBadge() {
    const activeHearts = document.querySelectorAll('#page-wardrobe .heart-wish-btn.active').length;
    wishlistCounter.textContent = activeHearts;
    
    // Add micro-animation bounce
    wishlistCounter.style.transform = 'scale(1.3)';
    setTimeout(() => {
      wishlistCounter.style.transform = 'scale(1)';
    }, 200);
  }

  heartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');
      const icon = btn.querySelector('i');
      
      if (btn.classList.contains('active')) {
        icon.setAttribute('fill', 'currentColor');
      } else {
        icon.removeAttribute('fill');
      }
      
      updateWishlistBadge();
    });
  });

  /* ==========================================================================
     4. Settings and Notifications Mock Callbacks
     ========================================================================== */
  const btnNotifications = document.getElementById('btn-notifications-wardrobe');
  const btnSettings = document.getElementById('btn-settings-wardrobe');

  if (btnNotifications) {
    btnNotifications.addEventListener('click', () => {
      alert('Wardrobe Updates:\n- Alpha Chunky Sneakers saved to Outing\n- 4 recommendations updated by AI Stylist.');
    });
  }

  if (btnSettings) {
    btnSettings.addEventListener('click', () => {
      alert('Wardrobe Settings:\n- Automated sorting rules are ACTIVE\n- Syncing with local wardrobe storage.');
    });
  }

  /* ==========================================================================
      5. Pro Upgrade Modal Functionality (Only register if not running inside index.html SPA)
     ========================================================================== */
  const isSPA = document.getElementById('page-home') !== null;

  if (!isSPA) {
    const modalUpgrade = document.getElementById('modal-pro-upgrade');
    const btnModalClose = document.getElementById('modal-close');
    const btnUpgradeSidebar = document.getElementById('btn-upgrade-sidebar');
    const btnModalCheckout = document.getElementById('btn-modal-checkout');
    const priceCards = document.querySelectorAll('.modal-price-card');

    const openUpgradeModal = () => {
      if (modalUpgrade) {
        modalUpgrade.classList.add('active');
      }
    };

    const closeUpgradeModal = () => {
      if (modalUpgrade) {
        modalUpgrade.classList.remove('active');
      }
    };

    if (btnUpgradeSidebar) {
      btnUpgradeSidebar.addEventListener('click', openUpgradeModal);
    }

    if (btnModalClose) {
      btnModalClose.addEventListener('click', closeUpgradeModal);
    }

    // Close on backdrop click
    window.addEventListener('click', (e) => {
      if (e.target === modalUpgrade) {
        closeUpgradeModal();
      }
    });

    if (btnModalCheckout) {
      btnModalCheckout.addEventListener('click', () => {
        alert('Thank you for choosing AURAFIT Pro! Proceeding to premium checkout synthesis.');
        closeUpgradeModal();
      });
    }

    // Price card select styling toggles
    priceCards.forEach(card => {
      card.addEventListener('click', () => {
        priceCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });

    // Mock Avatar Clicks
    document.querySelectorAll('.nav-to-profile').forEach(el => {
      el.addEventListener('click', () => {
        alert('User Profile: Leon Walker\nStatus: Premium Tier Member\nBio: Luxury Minimalist Stylist');
      });
    });
  }
});
