document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  /* ==========================================================================
     1. Search and Two-Tier Cascading Filter Logic
     ========================================================================== */
  const searchInput = document.getElementById('looks-search-input');
  const featuredCards = document.querySelectorAll('.featured-look-card');
  const lookbookCards = document.querySelectorAll('.lookbook-card');
  const savedCards = document.querySelectorAll('.saved-look-card');
  
  const primaryTabs = document.querySelectorAll('.looks-tab-btn');
  const filterPills = document.querySelectorAll('.looks-filter-pill');

  let activeTab = 'all-looks'; // 'all-looks', 'saved-looks', 'recent', 'trending'
  let activeStyle = 'all';     // 'all', 'casual', 'streetwear', etc.

  function applyFilters() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

    // Filter Featured Looks
    featuredCards.forEach(card => {
      const title = card.querySelector('h3').innerText.toLowerCase();
      const desc = card.querySelector('p').innerText.toLowerCase();
      const styleTypes = card.dataset.styleType ? card.dataset.styleType.split(' ') : [];
      const cardTabType = card.dataset.tabType ? card.dataset.tabType.split(' ') : [];

      const queryMatches = !query || title.includes(query) || desc.includes(query);
      const styleMatches = activeStyle === 'all' || styleTypes.includes(activeStyle);
      const tabMatches = activeTab === 'all-looks' || cardTabType.includes(activeTab);

      if (queryMatches && styleMatches && tabMatches) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    // Filter Lookbooks Section (Grid)
    lookbookCards.forEach(card => {
      const title = card.querySelector('h3').innerText.toLowerCase();
      const styleTypes = card.dataset.styleType ? card.dataset.styleType.split(' ') : [];
      
      const queryMatches = !query || title.includes(query);
      const styleMatches = activeStyle === 'all' || styleTypes.includes(activeStyle);

      if (queryMatches && styleMatches) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // Filter Saved Looks Section (Vertical Cards)
    savedCards.forEach(card => {
      const title = card.querySelector('h4').innerText.toLowerCase();
      const styleTypes = card.dataset.styleType ? card.dataset.styleType.split(' ') : [];
      const cardTabType = card.dataset.tabType ? card.dataset.tabType.split(' ') : [];

      const queryMatches = !query || title.includes(query);
      const styleMatches = activeStyle === 'all' || styleTypes.includes(activeStyle);
      const tabMatches = activeTab === 'all-looks' || cardTabType.includes(activeTab);

      if (queryMatches && styleMatches && tabMatches) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Primary tab selections
  primaryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      primaryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.dataset.tabType;
      applyFilters();
    });
  });

  // Filter pills selections
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeStyle = pill.dataset.styleType;
      applyFilters();
    });
  });

  // Real-time search inputs
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  /* ==========================================================================
     2. Wishlist and Save Button Interactions (No Popups)
     ========================================================================== */
  const heartButtons = document.querySelectorAll('#page-looks .looks-action-btn, #page-looks .saved-card-heart-btn');

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
      
      // Update global header badge count visually if possible
      const badge = document.querySelector('#page-looks #wishlist-counter-value');
      if (badge) {
        const activeCount = document.querySelectorAll('#page-looks .looks-action-btn.active, #page-looks .saved-card-heart-btn.active').length;
        badge.textContent = Math.max(3, activeCount + 3); // realistic dynamic offset
        
        badge.style.transform = 'scale(1.2)';
        setTimeout(() => {
          badge.style.transform = 'scale(1)';
        }, 150);
      }
    });
  });

  // Mock click handlers for stub headers (No alerts as per guidelines)
  const btnNotifications = document.getElementById('btn-notifications-looks');
  const btnSettings = document.getElementById('btn-settings-looks');

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
});
