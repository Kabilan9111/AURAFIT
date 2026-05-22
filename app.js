/* ==========================================================================
   AURAFIT Interactive Engine - Homepage + Try-On OS
   Handles page navigation, search functionality, scanner triggers,
   outfit configuration loads, DNA updates, and modal pro popups.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  lucide.createIcons();

  /* ==========================================================================
     1. Page Navigation (Tab Swapping)
     ========================================================================== */
  const navHome = document.getElementById('nav-home');
  const navTryOn = document.getElementById('nav-tryon');
  const navWardrobe = document.getElementById('nav-wardrobe');
  const navLooks = document.getElementById('nav-looks');
  const navRecommendations = document.getElementById('nav-recommendations');
  const navStylist = document.getElementById('nav-stylist');
  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page-content');

  // Helper to switch page views
  function switchToPage(pageId, navId) {
    pages.forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');

    navItems.forEach(item => item.classList.remove('active'));
    const targetNav = document.getElementById(navId);
    if (targetNav) targetNav.classList.add('active');

    // Smooth scroll top on switch
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL hash without pushing redundant history states
    const hash = pageId.replace('page-', '');
    if (hash === 'home') {
      if (window.location.hash) {
        history.replaceState(null, null, ' ');
      }
    } else {
      if (window.location.hash !== `#${hash}`) {
        history.replaceState(null, null, `#${hash}`);
      }
    }
  }

  navHome.addEventListener('click', (e) => {
    e.preventDefault();
    switchToPage('page-home', 'nav-home');
  });

  navTryOn.addEventListener('click', (e) => {
    e.preventDefault();
    switchToPage('page-tryon', 'nav-tryon');
  });

  if (navWardrobe) {
    navWardrobe.addEventListener('click', (e) => {
      e.preventDefault();
      switchToPage('page-wardrobe', 'nav-wardrobe');
    });
  }

  if (navLooks) {
    navLooks.addEventListener('click', (e) => {
      e.preventDefault();
      switchToPage('page-looks', 'nav-looks');
    });
  }

  if (navRecommendations) {
    navRecommendations.addEventListener('click', (e) => {
      e.preventDefault();
      switchToPage('page-recommendations', 'nav-recommendations');
    });
  }

  if (navStylist) {
    navStylist.addEventListener('click', (e) => {
      e.preventDefault();
      switchToPage('page-stylist', 'nav-stylist');
    });
  }

  // Other stub nav links
  navItems.forEach(item => {
    if (item.id !== 'nav-home' && item.id !== 'nav-tryon' && item.id !== 'nav-wardrobe' && item.id !== 'nav-looks' && item.id !== 'nav-recommendations' && item.id !== 'nav-stylist') {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        // Placeholder links do not trigger alerts, just prevent default behavior
      });
    }
  });

  /* ==========================================================================
     2. Global Search and Hotkeys
     ========================================================================== */
  const searchInput = document.getElementById('home-search-input');
  
  // Ctrl + K Focus Search
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const homePageActive = document.getElementById('page-home').classList.contains('active');
      const wardrobePageActive = document.getElementById('page-wardrobe') && document.getElementById('page-wardrobe').classList.contains('active');
      
      if (wardrobePageActive) {
        const wSearch = document.getElementById('wardrobe-search-input');
        if (wSearch) wSearch.focus();
      } else if (homePageActive) {
        searchInput.focus();
      } else {
        switchToPage('page-home', 'nav-home');
        setTimeout(() => searchInput.focus(), 150);
      }
    }
  });

  searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    // Simulate real-time filtration on recommendations
    const productCards = document.querySelectorAll('.luxury-product-card');
    productCards.forEach(card => {
      const title = card.querySelector('h4').innerText.toLowerCase();
      if (title.includes(value)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });

  /* ==========================================================================
     3. Wishlist Indicator Count Updates
     ========================================================================== */
  const wishlistCounter = document.getElementById('wishlist-counter-value');
  let currentWishlistCount = 3;

  function adjustWishlistCounter(increment) {
    if (increment) {
      currentWishlistCount++;
    } else {
      currentWishlistCount = Math.max(0, currentWishlistCount - 1);
    }
    wishlistCounter.innerText = currentWishlistCount;
    // Glow pulse animation
    wishlistCounter.style.transform = 'scale(1.2)';
    setTimeout(() => {
      wishlistCounter.style.transform = 'scale(1)';
    }, 200);
  }

  // Bind heart button clicks globally
  document.body.addEventListener('click', (e) => {
    const heartBtn = e.target.closest('.heart-wish-btn') || e.target.closest('.btn-heart-wishlist') || e.target.closest('#btn-wishlist-hero');
    if (heartBtn) {
      if (heartBtn.id === 'btn-wishlist-hero') return; // Handled separately in stage
      e.preventDefault();
      e.stopPropagation();

      heartBtn.classList.toggle('active');
      const icon = heartBtn.querySelector('i');
      if (heartBtn.classList.contains('active')) {
        icon.setAttribute('fill', 'currentColor');
        adjustWishlistCounter(true);
      } else {
        icon.removeAttribute('fill');
        adjustWishlistCounter(false);
      }
    }
  });

  /* ==========================================================================
     4. Homepage Interactions (Transitions to Try-On Page)
     ========================================================================== */
  const btnHeroStartTryon = document.getElementById('btn-hero-start-tryon');
  const btnHeroUpload = document.getElementById('btn-hero-upload');
  const btnHomeNewDraft = document.getElementById('btn-home-new-draft');
  const btnTryStylePick = document.getElementById('btn-try-style-pick');
  const exploreCards = document.querySelectorAll('.explore-outfit-card');
  const recProductCards = document.querySelectorAll('.luxury-product-card');
  const moodCards = document.querySelectorAll('.mood-category-card');
  const trendingAvatarBoxes = document.querySelectorAll('.trending-avatar-box');

  // Start AI Try On Action
  btnHeroStartTryon.addEventListener('click', () => {
    switchToPage('page-tryon', 'nav-tryon');
  });

  // Hero Upload Action — opens home-page file picker (no page navigation)
  btnHeroUpload.addEventListener('click', () => {
    const homeInput = document.getElementById('home-file-input');
    if (homeInput) homeInput.click();
  });

  // New Draft Click
  btnHomeNewDraft.addEventListener('click', () => {
    switchToPage('page-tryon', 'nav-tryon');
  });

  // Style Pick Try Click
  btnTryStylePick.addEventListener('click', () => {
    switchToPage('page-tryon', 'nav-tryon');
    updateActiveConfiguration('1');
    setTimeout(() => {
      triggerMiniAnalysisScan('RENDERING EVENING URBAN LOOK...');
    }, 200);
  });

  // Saved Drafts (Continue Exploring) Click
  exploreCards.forEach(card => {
    if (card.id === 'btn-home-new-draft') return;
    card.addEventListener('click', () => {
      const outfitId = card.dataset.outfitId;
      switchToPage('page-tryon', 'nav-tryon');
      updateActiveConfiguration(outfitId);
      setTimeout(() => {
        triggerMiniAnalysisScan('LOADING SAVED SILHOUETTE MATRIX...');
      }, 200);
    });
  });

  // Recommended Products Click
  recProductCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.heart-wish-btn')) return;
      const outfitId = card.dataset.outfitId;
      switchToPage('page-tryon', 'nav-tryon');
      updateActiveConfiguration(outfitId);
      setTimeout(() => {
        triggerMiniAnalysisScan('SYNTHESIZING RECOMMENDED APPAREL...');
      }, 200);
    });
  });

  // Mood Cards Click
  moodCards.forEach(card => {
    card.addEventListener('click', () => {
      const mood = card.dataset.mood;
      switchToPage('page-tryon', 'nav-tryon');
      
      // Select config based on mood
      let targetId = '1';
      if (mood === 'date-night') targetId = '2';
      if (mood === 'office-wear') targetId = '3';
      if (mood === 'gym') targetId = '4';

      updateActiveConfiguration(targetId);
      setTimeout(() => {
        triggerMiniAnalysisScan(`DRESSING FOR MOOD: ${mood.toUpperCase()}...`);
      }, 200);
    });
  });

  // Trending Looks Click
  trendingAvatarBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const name = box.querySelector('span').innerText;
      switchToPage('page-tryon', 'nav-tryon');
      
      // Random outfit swap
      const keys = ['1', '2', '3', '4'];
      const targetId = keys[Math.floor(Math.random() * keys.length)];
      updateActiveConfiguration(targetId);
      
      setTimeout(() => {
        triggerMiniAnalysisScan(`APPLYING STYLE: ${name.toUpperCase()}...`);
      }, 200);
    });
  });

  /* ==========================================================================
     5. Try-On Stage Logic (Original code integrated)
     ========================================================================== */
  const fileInput = document.getElementById('file-input');
  const dropZone = document.getElementById('drop-zone');
  const btnUploadImage = document.getElementById('btn-upload-image');
  const btnUseCamera = document.getElementById('btn-use-camera');
  const selectHeight = document.getElementById('select-height');
  const selectBodytype = document.getElementById('select-bodytype');
  const skinChips = document.querySelectorAll('.skin-chip');
  const genderTabs = document.querySelectorAll('.gender-tab');
  const switchAutodetect = document.getElementById('switch-autodetect');

  const modeTabs = document.querySelectorAll('.mode-tab');
  const catTabs = document.querySelectorAll('.cat-tab');
  const stageViewport = document.getElementById('stage-viewport');
  const heroDisplayImage = document.getElementById('hero-display-image');
  const btnWishlistHero = document.getElementById('btn-wishlist-hero');
  const btnShareHero = document.getElementById('btn-share-hero');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const lookCards = document.querySelectorAll('.look-card');
  const btnTryAnother = document.getElementById('btn-try-another');

  const scannerLaser = document.getElementById('scanner-laser');
  const scannerText = document.getElementById('scanner-text');

  const ringStyleScore = document.getElementById('ring-style-score');
  const ringConfidenceScore = document.getElementById('ring-confidence-score');
  const ringAccuracyScore = document.getElementById('ring-accuracy-score');
  
  const lblStyleScore = document.getElementById('lbl-style-score');
  const lblConfidenceScore = document.getElementById('lbl-confidence-score');
  const lblAccuracyScore = document.getElementById('lbl-accuracy-score');

  const compactProductCards = document.querySelectorAll('.compact-product-card');
  const btnSaveLook = document.getElementById('btn-save-look');
  const checklistItems = document.querySelectorAll('.suitability-checklist .item-text');

  let isScanning = false;
  let currentOutfitId = '1';

  // Config Dataset for Carousel Outfits
  const configurations = {
    '1': {
      image: 'assets/black_model_hoodie.png',
      filter: '',
      styleScore: 92,
      confidence: 89,
      accuracy: 87,
      insights: [
        "Black tones balance your skin tone",
        "Relaxed fit complements your frame",
        "Minimalist style enhances your vibe",
        "Perfect for night out or casual events"
      ]
    },
    '2': {
      image: 'assets/model_brown_jacket.png',
      filter: '',
      styleScore: 87,
      confidence: 84,
      accuracy: 80,
      insights: [
        "Earth brown tones complement warmth",
        "Structured jacket adds shoulder volume",
        "Tailored lines define athletic frame",
        "Ideal for semi-formal styling settings"
      ]
    },
    '3': {
      image: 'assets/model_black_polo.png',
      filter: '',
      styleScore: 85,
      confidence: 80,
      accuracy: 78,
      insights: [
        "Classic polo cut optimizes shoulder lines",
        "Sleek monotone silhouette limits clutter",
        "Athletic cut fits snug on chest/arms",
        "Versatile for day-to-day smart casual"
      ]
    },
    '4': {
      image: 'assets/model_black_hoodie.png',
      filter: '',
      styleScore: 82,
      confidence: 79,
      accuracy: 75,
      insights: [
        "Oversized black silhouette adds street edge",
        "Fleece fabric creates soft drapery contours",
        "Minimal branding emphasizes fabric quality",
        "Best suited for casual travel or gym runs"
      ]
    },
    '5': {
      image: 'assets/black_model_hoodie.png',
      filter: 'hue-rotate(120deg)', 
      styleScore: 78,
      confidence: 75,
      accuracy: 70,
      insights: [
        "Teal hue contrast creates energetic look",
        "Relaxed fit matches comfort guidelines",
        "Bold color breaks standard dark wardrobe",
        "Designed for statement streetwear vibes"
      ]
    }
  };

  // Set percentage rings using SVG stroke-dashoffset
  function updateScoreRings(styleScore, confidence, accuracy) {
    if (!lblStyleScore) return; // safety
    lblStyleScore.innerText = `${styleScore}%`;
    ringStyleScore.setAttribute('stroke-dasharray', `${styleScore}, 100`);

    lblConfidenceScore.innerText = `${confidence}%`;
    ringConfidenceScore.setAttribute('stroke-dasharray', `${confidence}, 100`);

    lblAccuracyScore.innerText = `${accuracy}%`;
    ringAccuracyScore.setAttribute('stroke-dasharray', `${accuracy}, 100`);
  }

  // Update configuration details
  function updateActiveConfiguration(outfitId) {
    currentOutfitId = outfitId;
    const config = configurations[outfitId];
    if (!config) return;

    lookCards.forEach(card => {
      if (card.dataset.outfitId === outfitId) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    heroDisplayImage.src = config.image;
    heroDisplayImage.style.filter = config.filter;

    updateScoreRings(config.styleScore, config.confidence, config.accuracy);

    config.insights.forEach((text, index) => {
      if (checklistItems[index]) {
        checklistItems[index].innerText = text;
      }
    });
  }

  // Carousel click hooks
  lookCards.forEach(card => {
    card.addEventListener('click', () => {
      const outfitId = card.dataset.outfitId;
      triggerMiniAnalysisScan('SWITCHING OUTFITS...');
      setTimeout(() => {
        updateActiveConfiguration(outfitId);
      }, 250);
    });
  });

  // Outfit / Results toggle tabs
  modeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      modeTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const mode = tab.dataset.mode;
      if (mode === 'results') {
        triggerMiniAnalysisScan('RENDER RESULTS DETECTED...');
      }
    });
  });

  // Category Selector tags
  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.dataset.category;
      if (cat === 'casual') updateActiveConfiguration('3');
      else if (cat === 'streetwear') updateActiveConfiguration('1');
      else if (cat === 'luxury') updateActiveConfiguration('2');
      else if (cat === 'gym') updateActiveConfiguration('4');
      else {
        const keys = Object.keys(configurations);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        updateActiveConfiguration(randomKey);
      }
    });
  });

  // Details dropdown recalculations
  [selectHeight, selectBodytype].forEach(select => {
    select.addEventListener('change', () => {
      triggerMiniAnalysisScan('RE-CALCULATING PROFILE METRICS...');
      setTimeout(() => {
        const styleShift = Math.floor(Math.random() * 6) + 89;
        updateScoreRings(styleShift, styleShift - 3, styleShift - 5);
      }, 1000);
    });
  });

  skinChips.forEach(chip => {
    chip.addEventListener('click', () => {
      skinChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      triggerMiniAnalysisScan('ADJUSTING SKIN TONE CORRELATION...');
      setTimeout(() => {
        const styleShift = Math.floor(Math.random() * 5) + 90;
        updateScoreRings(styleShift, styleShift - 2, styleShift - 4);
      }, 1000);
    });
  });

  genderTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      genderTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const gender = tab.dataset.gender;
      triggerMiniAnalysisScan(`SWAPPING TO ${gender.toUpperCase()} FITTING DATASETS...`);
      setTimeout(() => {
        if (gender === 'female') {
          heroDisplayImage.style.filter = 'hue-rotate(180deg) saturate(1.2)';
        } else {
          heroDisplayImage.style.filter = configurations[currentOutfitId].filter;
        }
        const styleShift = Math.floor(Math.random() * 4) + 91;
        updateScoreRings(styleShift, styleShift - 1, styleShift - 3);
      }, 1000);
    });
  });

  switchAutodetect.addEventListener('change', () => {
    if (switchAutodetect.checked) {
      alert('Auto Detect Enabled: AI engine sizing activated.');
    } else {
      alert('Auto Detect Disabled: Manual details will override photo calibration.');
    }
  });

  // Upload/Camera simulator triggers
  btnUploadImage.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  dropZone.addEventListener('click', (e) => {
    if (e.target.closest('#btn-use-camera') || e.target.closest('#btn-upload-image')) return;
    fileInput.click();
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-active');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-active');
  });

  // ─── Try-On Upload Handler (powered by shared AuraUpload module) ──────────
  async function handleTryOnUpload(file) {
    await AuraUpload.uploadImageFile(file, {
      onPreview: (dataURL) => {
        heroDisplayImage.src = dataURL;
        heroDisplayImage.style.filter = '';
      },
      onLoadingStart: () => {
        dropZone.classList.add('uploading');
        scannerLaser.classList.add('scanning');
        scannerText.classList.add('active');
        const label = scannerText.querySelector('span');
        if (label) label.innerHTML = 'UPLOADING TO AI CLOUD...';
      },
      onLoadingEnd: () => {
        dropZone.classList.remove('uploading');
        scannerLaser.classList.remove('scanning');
        scannerText.classList.remove('active');
        fileInput.value = '';
      },
      onSuccess: (cloudURL) => {
        heroDisplayImage.src = cloudURL;
        const randScore = Math.floor(Math.random() * 6) + 91;
        updateScoreRings(randScore, randScore - 3, randScore - 5);
        updateActiveConfiguration('1');
        const successTag = document.getElementById('tryon-upload-success-tag');
        if (successTag) {
          successTag.textContent = '✓ Synced to Cloud';
          successTag.classList.add('visible');
          setTimeout(() => successTag.classList.remove('visible'), 3000);
        }
      },
      onError: () => {
        heroDisplayImage.src = 'assets/black_model_hoodie.png';
      },
    });
  }

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-active');
    if (e.dataTransfer.files.length > 0) handleTryOnUpload(e.dataTransfer.files[0]);
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) handleTryOnUpload(fileInput.files[0]);
  });

  btnUseCamera.addEventListener('click', (e) => {
    e.stopPropagation();
    simulateCameraScan();
  });

  function simulateAIScan(fileName) {
    if (isScanning) return;
    isScanning = true;
    scannerLaser.classList.add('scanning');
    scannerText.classList.add('active');

    const textLabel = scannerText.querySelector('span');
    textLabel.innerHTML = `LOADING SILHOUETTE FILE: ${fileName.toUpperCase()}...`;

    setTimeout(() => { textLabel.innerHTML = 'ANALYZING BODY HUE & DEPTH CO-ORDINATES...'; }, 1200);
    setTimeout(() => { textLabel.innerHTML = 'CONVOLUTING CLOTH MATERIAL TO SILHOUETTE...'; }, 2400);

    setTimeout(() => {
      isScanning = false;
      scannerLaser.classList.remove('scanning');
      scannerText.classList.remove('active');
      const randScore = Math.floor(Math.random() * 6) + 91;
      updateScoreRings(randScore, randScore - 3, randScore - 5);
      updateActiveConfiguration('1');
      alert(`AI Try-On synthesis successful! Rendered outfit models onto new profile frame.`);
    }, 3600);
  }

  function simulateCameraScan() {
    if (isScanning) return;
    isScanning = true;
    scannerLaser.classList.add('scanning');
    scannerText.classList.add('active');

    const textLabel = scannerText.querySelector('span');
    textLabel.innerHTML = 'ACTIVATING VIRTUAL CAMERA MATRIX...';

    setTimeout(() => { textLabel.innerHTML = 'MAPPING ANTHROPOMETRIC JOINTS (24 POINTS)...'; }, 1000);
    setTimeout(() => { textLabel.innerHTML = 'SYNTHESIZING FITTING CALIBRATION RENDER...'; }, 2000);

    setTimeout(() => {
      isScanning = false;
      scannerLaser.classList.remove('scanning');
      scannerText.classList.remove('active');
      const randScore = Math.floor(Math.random() * 5) + 93;
      updateScoreRings(randScore, randScore - 2, randScore - 4);
      updateActiveConfiguration('2');
      alert(`Camera silhouette projection successfully calibrated fit score at ${randScore}% precision!`);
    }, 3200);
  }

  function triggerMiniAnalysisScan(customLabelText) {
    const calcOverlay = document.createElement('div');
    calcOverlay.className = 'scanning-overlay-text active';
    calcOverlay.style.background = 'rgba(3, 3, 6, 0.5)';
    calcOverlay.innerHTML = `<div class="scanner-spinner" style="width: 24px; height: 24px;"></div><span style="font-size: 0.72rem; letter-spacing:0.05em;">${customLabelText}</span>`;
    stageViewport.appendChild(calcOverlay);
    setTimeout(() => { calcOverlay.remove(); }, 1000);
  }

  // Wishlist and fullscreen and stubs
  btnWishlistHero.addEventListener('click', () => {
    btnWishlistHero.classList.toggle('active');
    if (btnWishlistHero.classList.contains('active')) {
      btnWishlistHero.querySelector('i').setAttribute('fill', 'currentColor');
      alert('Outfit saved to your Wishlist!');
    } else {
      btnWishlistHero.querySelector('i').removeAttribute('fill');
    }
  });

  btnShareHero.addEventListener('click', () => {
    alert('Share Link: Copied to clipboard! Share your virtual fit matrix.');
  });

  btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      stageViewport.requestFullscreen().catch(err => {
        alert(`Error enabling fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  });

  btnTryAnother.addEventListener('click', () => {
    let nextId = parseInt(currentOutfitId) + 1;
    if (nextId > 5) nextId = 1;
    triggerMiniAnalysisScan('SELECTING ALTERNATIVE FIT...');
    setTimeout(() => {
      updateActiveConfiguration(nextId.toString());
    }, 400);
  });

  btnSaveLook.addEventListener('click', () => {
    btnSaveLook.innerHTML = '<span>Saving Config Matrix...</span>';
    setTimeout(() => {
      btnSaveLook.innerHTML = '<i data-lucide="check"></i> <span>Look Saved Successfully!</span>';
      lucide.createIcons();
      setTimeout(() => {
        btnSaveLook.innerHTML = '<i data-lucide="bookmark"></i> <span>Save Look</span>';
        lucide.createIcons();
      }, 2000);
    }, 1000);
  });

  compactProductCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetOutfitId = card.dataset.targetOutfit;
      triggerMiniAnalysisScan('RENDERING RECOMMENDED APPAREL...');
      setTimeout(() => {
        updateActiveConfiguration(targetOutfitId);
      }, 500);
    });
  });

  /* ==========================================================================
     6. Modal Upgrade Dialog (Original code integrated)
     ========================================================================== */
  const btnUpgradeSidebar = document.getElementById('btn-upgrade-sidebar');
  const modalUpgrade = document.getElementById('modal-pro-upgrade');
  const modalClose = document.getElementById('modal-close');
  const btnModalCheckout = document.getElementById('btn-modal-checkout');
  const modalPriceCards = document.querySelectorAll('.modal-price-card');
  const sidebarUserCard = document.getElementById('user-profile-trigger');

  btnUpgradeSidebar.addEventListener('click', (e) => {
    e.preventDefault();
    modalUpgrade.classList.add('active');
  });

  modalClose.addEventListener('click', () => {
    modalUpgrade.classList.remove('active');
  });
  
  modalUpgrade.addEventListener('click', (e) => {
    if (e.target === modalUpgrade) {
      modalUpgrade.classList.remove('active');
    }
  });

  modalPriceCards.forEach(card => {
    card.addEventListener('click', () => {
      modalPriceCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  btnModalCheckout.addEventListener('click', () => {
    btnModalCheckout.innerHTML = '<span>Processing Encrypted Checkout...</span>';
    setTimeout(() => {
      alert('AURAFIT PRO: Annual subscription plan simulated successfully!');
      btnModalCheckout.innerHTML = '<span>Upgrade My Style Now</span>';
      modalUpgrade.classList.remove('active');
    }, 1200);
  });

  sidebarUserCard.addEventListener('click', () => {
    alert('User Profile: Leon Walker | Status: Premium Tier Member');
  });

  document.querySelectorAll('.nav-to-profile').forEach(el => {
    el.addEventListener('click', () => {
      alert('User Profile: Leon Walker | Status: Premium Tier Member');
    });
  });

  // Load initial score rings values
  updateScoreRings(92, 89, 87);

  // ─── Home Page Upload Handler (powered by shared AuraUpload module) ────────
  const homeFileInput      = document.getElementById('home-file-input');
  const heroModelImg       = document.querySelector('.hero-model-jacket-img');
  const homeUploadOverlay  = document.getElementById('home-upload-overlay');
  const homeSuccessBadge   = document.getElementById('home-upload-success-badge');

  if (homeFileInput) {
    homeFileInput.addEventListener('change', async () => {
      if (!homeFileInput.files.length) return;
      await AuraUpload.uploadImageFile(homeFileInput.files[0], {
        onPreview: (dataURL) => {
          if (heroModelImg) {
            heroModelImg.src = dataURL;
            heroModelImg.style.objectFit = 'cover';
          }
        },
        onLoadingStart: () => {
          if (homeUploadOverlay) homeUploadOverlay.classList.add('active');
        },
        onLoadingEnd: () => {
          if (homeUploadOverlay) homeUploadOverlay.classList.remove('active');
          homeFileInput.value = '';
        },
        onSuccess: (cloudURL) => {
          if (heroModelImg) heroModelImg.src = cloudURL;
          if (homeSuccessBadge) {
            lucide.createIcons();
            homeSuccessBadge.classList.add('visible');
            setTimeout(() => homeSuccessBadge.classList.remove('visible'), 3000);
          }
        },
        onError: () => {
          if (heroModelImg) heroModelImg.src = 'assets/hero_home_model.png';
        },
      });
    });
  }

  // Dynamic Routing fallback for URL hash landing
  const initialHash = window.location.hash;
  if (initialHash === '#wardrobe' || initialHash === '#page-wardrobe') {
    switchToPage('page-wardrobe', 'nav-wardrobe');
  } else if (initialHash === '#tryon' || initialHash === '#page-tryon') {
    switchToPage('page-tryon', 'nav-tryon');
  } else if (initialHash === '#looks' || initialHash === '#page-looks') {
    switchToPage('page-looks', 'nav-looks');
  } else if (initialHash === '#recommendations' || initialHash === '#page-recommendations') {
    switchToPage('page-recommendations', 'nav-recommendations');
  } else if (initialHash === '#stylist' || initialHash === '#page-stylist') {
    switchToPage('page-stylist', 'nav-stylist');
  }
});
