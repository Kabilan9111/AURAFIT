document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  /* ==========================================================================
     1. Search and Filtering Logic
     ========================================================================== */
  const searchInput = document.getElementById('recommendations-search-input');
  const productCards = document.querySelectorAll('.premium-rec-card');
  const outfitCards = document.querySelectorAll('.outfit-rec-card');
  const trendingRows = document.querySelectorAll('.trending-row');

  function applyFilters() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    // Filter Section 2 & 5: Horizontal Product Cards
    productCards.forEach(card => {
      const title = card.querySelector('h4').innerText.toLowerCase();
      const category = card.querySelector('.rec-card-category') ? card.querySelector('.rec-card-category').innerText.toLowerCase() : '';
      
      const matches = !query || title.includes(query) || category.includes(query);
      card.style.display = matches ? 'flex' : 'none';
    });

    // Filter Section 3: Large Outfit Cards
    outfitCards.forEach(card => {
      const title = card.querySelector('h3').innerText.toLowerCase();
      const tags = Array.from(card.querySelectorAll('.outfit-tag')).map(el => el.innerText.toLowerCase()).join(' ');
      
      const matches = !query || title.includes(query) || tags.includes(query);
      card.style.display = matches ? 'block' : 'none';
    });

    // Filter Section 4: Trending Widget Rows
    trendingRows.forEach(row => {
      const title = row.querySelector('.trend-title').innerText.toLowerCase();
      const label = row.querySelector('.trend-tag') ? row.querySelector('.trend-tag').innerText.toLowerCase() : '';
      
      const matches = !query || title.includes(query) || label.includes(query);
      row.style.display = matches ? 'flex' : 'none';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  /* ==========================================================================
     2. Color Selectors Click Binding
     ========================================================================== */
  const colorDots = document.querySelectorAll('.rec-color-dot');
  colorDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = dot.parentElement;
      const dots = parent.querySelectorAll('.rec-color-dot');
      dots.forEach(d => d.classList.remove('active'));
      dot.classList.add('active');

      // Synthetically tint/color the parent card image if applicable
      const card = dot.closest('.premium-rec-card');
      const img = card ? card.querySelector('.rec-card-image-wrap img') : null;
      if (img) {
        const color = dot.style.backgroundColor || '';
        // Apply micro CSS filters based on selected mock colors
        if (color.includes('rgb(254, 243, 199)') || color.includes('beige')) {
          img.style.filter = 'sepia(0.3) saturate(1.1) brightness(0.95)';
        } else if (color.includes('rgb(3, 7, 18)') || color.includes('black') || color.includes('charcoal')) {
          img.style.filter = 'grayscale(0.8) brightness(0.7)';
        } else if (color.includes('rgb(255, 255, 255)') || color.includes('white')) {
          img.style.filter = 'contrast(1.1) brightness(1.05)';
        } else if (color.includes('purple') || color.includes('violet')) {
          img.style.filter = 'hue-rotate(260deg) saturate(1.2)';
        } else {
          img.style.filter = '';
        }
      }
    });
  });

  /* ==========================================================================
     3. Wishlist Heart and Count Update Springs (No Popups)
     ========================================================================== */
  const heartButtons = document.querySelectorAll('#page-recommendations .rec-heart-btn, #page-recommendations .outfit-action-btn');

  heartButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      btn.classList.toggle('active');

      const icon = btn.querySelector('i');
      if (icon) {
        if (btn.classList.contains('active')) {
          icon.setAttribute('fill', 'currentColor');
        } else {
          icon.removeAttribute('fill');
        }
      }

      // Update header badge dynamically if available
      const badge = document.querySelector('#page-recommendations #wishlist-counter-value');
      if (badge) {
        const activeCount = document.querySelectorAll('#page-recommendations .rec-heart-btn.active, #page-recommendations .outfit-action-btn.active').length;
        // Start from base reference count 9 and scale
        badge.textContent = Math.max(9, activeCount + 7);

        // Apply visual scale spring pulse
        badge.style.transform = 'scale(1.2)';
        setTimeout(() => {
          badge.style.transform = 'scale(1)';
        }, 150);
      }
    });
  });

  /* ==========================================================================
     4. Notifications and Settings Stubs (No Alerts)
     ========================================================================== */
  const btnNotifications = document.getElementById('btn-notifications-rec');
  const btnSettings = document.getElementById('btn-settings-rec');

  if (btnNotifications) {
    btnNotifications.addEventListener('click', () => {
      const dot = btnNotifications.querySelector('.notification-dot');
      if (dot) dot.remove();
    });
  }

  if (btnSettings) {
    btnSettings.addEventListener('click', () => {
      btnSettings.style.transform = 'rotate(180deg)';
      setTimeout(() => {
        btnSettings.style.transform = 'rotate(0deg)';
      }, 500);
    });
  }

  /* ==========================================================================
     5. Upgrade Modal Interactivity (No Alerts)
     ========================================================================== */
  const btnUpgradeSidebar = document.getElementById('btn-upgrade-sidebar');
  const modalUpgrade = document.getElementById('modal-pro-upgrade');
  const modalClose = document.getElementById('modal-close');
  const btnModalCheckout = document.getElementById('btn-modal-checkout');
  const modalPriceCards = document.querySelectorAll('.modal-price-card');
  const sidebarUserCard = document.getElementById('user-profile-trigger');

  if (btnUpgradeSidebar && modalUpgrade) {
    btnUpgradeSidebar.addEventListener('click', (e) => {
      e.preventDefault();
      modalUpgrade.classList.add('active');
    });
  }

  if (modalClose && modalUpgrade) {
    modalClose.addEventListener('click', () => {
      modalUpgrade.classList.remove('active');
    });
  }

  if (modalUpgrade) {
    modalUpgrade.addEventListener('click', (e) => {
      if (e.target === modalUpgrade) {
        modalUpgrade.classList.remove('active');
      }
    });
  }

  modalPriceCards.forEach(card => {
    card.addEventListener('click', () => {
      modalPriceCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  if (btnModalCheckout && modalUpgrade) {
    btnModalCheckout.addEventListener('click', () => {
      btnModalCheckout.innerHTML = '<span>Activating Pro Matrix...</span>';
      setTimeout(() => {
        btnModalCheckout.innerHTML = '<span>Success! Welcome to Pro</span>';
        setTimeout(() => {
          btnModalCheckout.innerHTML = '<span>Upgrade My Style Now</span>';
          modalUpgrade.classList.remove('active');
        }, 1000);
      }, 1000);
    });
  }

  if (sidebarUserCard) {
    sidebarUserCard.addEventListener('click', () => {
      // Micro pulse scale
      sidebarUserCard.style.transform = 'scale(0.98)';
      setTimeout(() => {
        sidebarUserCard.style.transform = 'scale(1)';
      }, 150);
    });
  }

  /* ==========================================================================
     6. AI Engine Integration — map cards to outfit feed + persist likes
     ========================================================================== */
  function initRecsEngine() {
    if (!window.AuraEngine || !window.AuraState) return;

    const feed = window.AuraEngine.getFeed(10);

    // Collect all interactive cards in DOM order
    const allCards = [
      ...document.querySelectorAll('#page-recommendations .premium-rec-card'),
      ...document.querySelectorAll('#page-recommendations .outfit-rec-card')
    ];

    allCards.forEach((card, i) => {
      const outfit = feed[i];
      if (!outfit) return;

      // Tag card with outfit ID
      card.dataset.outfitId = outfit.id;

      // Restore persisted like state
      const heartBtn = card.querySelector('.rec-heart-btn') ||
                       card.querySelector('.outfit-action-btn[aria-label="Like"]');
      if (heartBtn) {
        const isLiked = AuraState.isLiked(outfit.id);
        heartBtn.classList.toggle('active', isLiked);
        const icon = heartBtn.querySelector('i');
        if (icon) {
          isLiked
            ? icon.setAttribute('fill', 'currentColor')
            : icon.removeAttribute('fill');
        }

        // Wire click to state (remove old generic listener by cloning)
        const fresh = heartBtn.cloneNode(true);
        heartBtn.parentNode.replaceChild(fresh, heartBtn);
        fresh.addEventListener('click', (e) => {
          e.stopPropagation();
          const liked = AuraState.likeOutfit(outfit.id);
          fresh.classList.toggle('active', liked);
          const ic = fresh.querySelector('i');
          if (ic) liked ? ic.setAttribute('fill', 'currentColor') : ic.removeAttribute('fill');
          // Update badge
          const badge = document.querySelector('#page-recommendations #wishlist-counter-value');
          if (badge) {
            const n = AuraState.likedOutfits.length;
            badge.textContent = Math.max(9, n + 7);
            badge.style.transform = 'scale(1.2)';
            setTimeout(() => { badge.style.transform = 'scale(1)'; }, 150);
          }
        });
      }
    });
  }

  initRecsEngine();
  window.addEventListener('aura:statechange', initRecsEngine);
});
