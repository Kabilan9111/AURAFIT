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

  // ─── Uploaded Image State ─────────────────────────────────────────────────
  // Single source of truth. Persists across outfit switches, tab changes,
  // renders, and page refreshes. Only overwritten on a new successful upload.
  const TRYON_IMAGE_KEY = 'aurafit_tryon_image';
  let activeUploadedImageURL = localStorage.getItem(TRYON_IMAGE_KEY) || null;

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
  // Works for both old path-based rings and new circle-based rings in v2 layout
  function updateScoreRings(styleScore, confidence, accuracy) {
    if (!lblStyleScore) return; // safety

    // Update main style score ring (v2: circle element with stroke-dasharray)
    lblStyleScore.textContent = `${styleScore}%`;
    if (ringStyleScore) {
      // v2 uses a <circle> with stroke-dasharray as "score 100"
      const ringCircumference = 175.9; // 2 * pi * 28
      const dash = (styleScore / 100) * ringCircumference;
      ringStyleScore.setAttribute('stroke-dasharray', `${dash.toFixed(1)} ${ringCircumference}`);
    }

    // v2 has confidence/accuracy as hidden compat elements (text nodes)
    if (lblConfidenceScore) lblConfidenceScore.textContent = `${confidence}%`;
    if (lblAccuracyScore)   lblAccuracyScore.textContent   = `${accuracy}%`;
    if (ringConfidenceScore) ringConfidenceScore.setAttribute('stroke-dasharray', `${confidence}, 100`);
    if (ringAccuracyScore)   ringAccuracyScore.setAttribute('stroke-dasharray',   `${accuracy}, 100`);

    // Also update the Style Potential ring in studio panel
    const potRing = document.getElementById('potential-ring-fill');
    const potText = document.getElementById('potential-pct-text');
    if (potRing && potText) {
      const potDash = (styleScore / 100) * 175.9;
      potRing.setAttribute('stroke-dasharray', `${potDash.toFixed(1)} 175.9`);
      potText.textContent = `${styleScore}%`;
    }
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

    // Use uploaded photo as priority; fall back to preset placeholder
    heroDisplayImage.src = activeUploadedImageURL || config.image;
    heroDisplayImage.style.filter = activeUploadedImageURL ? '' : config.filter;

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
          // Restore filter: if user has uploaded a photo, keep it filterless
          heroDisplayImage.style.filter = activeUploadedImageURL ? '' : configurations[currentOutfitId].filter;
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
    // Store the file reference — we'll re-analyze after upload completes
    let capturedDataURL = null;

    await AuraUpload.uploadImageFile(file, {
      onPreview: (dataURL) => {
        // Lock state immediately — show the user's photo right away
        capturedDataURL        = dataURL;
        activeUploadedImageURL = dataURL;
        if (window.AuraState) AuraState.setActiveUserImage(dataURL);
        heroDisplayImage.src   = dataURL;
        heroDisplayImage.style.filter = '';

        // ── v2: Show user photo preview in studio panel ──
        const studioPhoto = document.getElementById('studio-user-photo');
        if (studioPhoto) studioPhoto.src = dataURL;
        const emptyState   = document.getElementById('photo-empty-state');
        const previewState = document.getElementById('photo-preview-state');
        if (emptyState)   emptyState.classList.add('hidden');
        if (previewState) previewState.classList.remove('hidden');

        // ── v2: Start wireframe animation ──
        const facePlaceholder = document.getElementById('face-placeholder');
        const faceWireframe   = document.getElementById('face-wireframe');
        if (facePlaceholder) facePlaceholder.classList.add('hidden');
        if (faceWireframe)   faceWireframe.classList.remove('hidden');

        // ── v2: Reset analysis status ──
        const analysisStatus = document.getElementById('ai-analysis-status');
        if (analysisStatus) analysisStatus.textContent = 'Scanning your features...';
        const detectionAttrs = document.getElementById('detection-attributes');
        if (detectionAttrs) detectionAttrs.classList.add('hidden');
      },
      onLoadingStart: () => {
        dropZone.classList.add('uploading');
        scannerLaser.classList.add('scanning');
        scannerText.classList.add('active');
        const label = scannerText.querySelector('span');
        if (label) label.innerHTML = 'UPLOADING IMAGE...';
      },
      onLoadingEnd: () => {
        dropZone.classList.remove('uploading');
        // NOTE: we intentionally keep the laser/text running here
        // so the AI analysis sequence plays right after upload ends
        fileInput.value = '';
      },
      onSuccess: async (cloudURL) => {
        // Upgrade from local dataURL to permanent Cloudinary URL
        activeUploadedImageURL = cloudURL;
        localStorage.setItem(TRYON_IMAGE_KEY, cloudURL);
        if (window.AuraState) AuraState.setActiveUserImage(cloudURL);
        heroDisplayImage.src = cloudURL;

        // Show success badge
        const successTag = document.getElementById('tryon-upload-success-tag');
        if (successTag) {
          successTag.textContent = '✓ Synced to Cloud';
          successTag.classList.add('visible');
          setTimeout(() => successTag.classList.remove('visible'), 3000);
        }

        // Run full AI analysis pipeline after cloud upload succeeds
        // Use the dataURL for canvas analysis (safer than Cloudinary CORS)
        await runAIAnalysisPipeline(capturedDataURL || cloudURL);
      },
      onError: async () => {
        // Keep existing image visible; still run analysis on the dataURL preview
        if (!activeUploadedImageURL && capturedDataURL) {
          activeUploadedImageURL = capturedDataURL;
          heroDisplayImage.src  = capturedDataURL;
        } else if (!activeUploadedImageURL) {
          heroDisplayImage.src = 'assets/black_model_hoodie.png';
        }
        // Still run AI analysis on local preview even when cloud fails
        if (capturedDataURL) {
          await runAIAnalysisPipeline(capturedDataURL);
        }
      },
    });
  }

  // ─── FULL AI ANALYSIS PIPELINE ──────────────────────────────────────────────────
  /**
   * Master AI analysis sequence. Runs after upload completes.
   * Steps:
   *  1. Animated multi-step scanner sequence
   *  2. Skin tone detection (Canvas pixel analysis)
   *  3. Auto-select skin chip
   *  4. Update insights checklist with skin-tone-aware copy
   *  5. Recalculate & animate score rings
   *  6. Dynamically update "You Might Also Like" recommendations
   */
  async function runAIAnalysisPipeline(imageURL) {
    if (!imageURL) return;

    const scanLabel = scannerText ? scannerText.querySelector('span') : null;

    // ── Phase 1: Scanning animation sequence ─────────────────────────
    scannerLaser.classList.add('scanning');
    scannerText.classList.add('active');
    if (scanLabel) scanLabel.innerHTML = 'ANALYZING SKIN HUE PROFILE...';

    // Run detection while animation plays
    const tonePromise = window.AuraSkinAnalyzer
      ? AuraSkinAnalyzer.detect(imageURL)
      : Promise.resolve(null);

    // Let the scanner run for at least 900ms so user sees it
    await new Promise(r => setTimeout(r, 900));
    if (scanLabel) scanLabel.innerHTML = 'MAPPING BODY PROPORTIONS...';
    await new Promise(r => setTimeout(r, 700));
    if (scanLabel) scanLabel.innerHTML = 'CALCULATING STYLE MATCH SCORE...';
    await new Promise(r => setTimeout(r, 600));

    // Await skin tone result (should already be done by now)
    const tone = await tonePromise;

    // Hide scanner
    scannerLaser.classList.remove('scanning');
    scannerText.classList.remove('active');

    // ── Phase 2: Apply skin tone results ──────────────────────────
    if (tone) {
      console.log('[AURAFIT AI] ✓ Skin tone detected:', tone);

      // Store in state
      if (window.AuraState) AuraState.setSkinTone(tone);

      // Auto-select matching skin chip with a pop animation
      skinChips.forEach(c => c.classList.remove('active'));
      const matchingChip = [...skinChips].find(c => c.dataset.skin === tone);
      if (matchingChip) {
        matchingChip.classList.add('active');
        matchingChip.style.transform = 'scale(1.5)';
        matchingChip.style.transition = 'transform 0.25s cubic-bezier(0.34,1.56,0.64,1)';
        setTimeout(() => { matchingChip.style.transform = ''; }, 350);
      }

      // Flash detection badge
      const toneLabel = tone.charAt(0).toUpperCase() + tone.slice(1);
      triggerMiniAnalysisScan(`✓ SKIN TONE DETECTED: ${toneLabel.toUpperCase()}`);

      // ── v2: Show AI detection attributes ──
      updateDetectionAttributes(tone);

      // Update checklist with skin-tone-aware insights
      updateInsightsForSkinTone(tone);

      // Recalculate scores
      const newScore = computeSkinAwareScore(tone);
      updateScoreRings(newScore, newScore - 3, newScore - 5);

      // Update "Shop This Look" with skin-tone-ranked outfits
      updateRecommendationCards(tone);

    } else {
      console.log('[AURAFIT AI] Skin detection inconclusive — using generic scores.');
      // Still update scores and recommendations generically
      const fallbackScore = Math.floor(Math.random() * 6) + 91;
      updateScoreRings(fallbackScore, fallbackScore - 3, fallbackScore - 5);
      updateActiveConfiguration('1');
      updateRecommendationCards(null);
      // v2: show generic attributes
      updateDetectionAttributes(null);
    }
  }

  /**
   * Populate the suitability checklist with skin-tone-aware insights.
   * Blends skin-specific sentences with current outfit insights.
   */
  function updateInsightsForSkinTone(tone) {
    if (!checklistItems || !checklistItems.length) return;

    const config       = configurations[currentOutfitId] || configurations['1'];
    const baseInsights = config.insights || [];

    const skinInsights = (window.AuraInsights && window.AuraInsights.getBySkinTone)
      ? AuraInsights.getBySkinTone(tone, 2)
      : [];

    const blended = [
      skinInsights[0] || baseInsights[0],
      baseInsights[1] || skinInsights[1],
      skinInsights[1] || baseInsights[2],
      baseInsights[3] || baseInsights[2],
    ];

    checklistItems.forEach((el, i) => {
      if (!blended[i]) return;
      el.style.opacity    = '0';
      el.style.transition = 'opacity 0.35s ease';
      setTimeout(() => {
        el.textContent  = blended[i];
        el.style.opacity = '1';
      }, i * 120 + 150);
    });
  }

  /**
   * Dynamically render the "You Might Also Like" recommendation cards
   * using AuraEngine ranked outfits filtered by the detected skin tone.
   * Falls back to generic engine feed when tone is null.
   */
  function updateRecommendationCards(tone) {
    const container = document.getElementById('products-recs-stack');
    const title     = document.getElementById('rec-title-compact');
    if (!container || !window.AuraEngine || !window.AuraOutfits) return;

    // Get top outfits from engine, filter/prioritise by skin tone
    const feed = AuraEngine.getFeed(20);
    let picks;

    if (tone) {
      // Prioritise outfits that explicitly match the detected tone
      const matched   = feed.filter(o => {
        const sm = o.skinToneMatch || [];
        return sm.includes('all') || sm.includes(tone);
      });
      const unmatched = feed.filter(o => {
        const sm = o.skinToneMatch || [];
        return !sm.includes('all') && !sm.includes(tone);
      });
      picks = [...matched, ...unmatched].slice(0, 3);
    } else {
      picks = feed.slice(0, 3);
    }

    if (!picks.length) return;

    // Price map (cosmetic — adds realism)
    const PRICES = {
      luxury: '₹8,999', formal: '₹5,499', streetwear: '₹3,299',
      casual: '₹2,799', gym: '₹2,199', monochrome: '₹3,599',
      oversized: '₹2,499', hoodies: '₹2,999', sneakers: '₹6,800',
      party: '₹4,799'
    };

    // Update title
    if (title) {
      title.textContent = tone
        ? `Matched For You — ${tone.charAt(0).toUpperCase() + tone.slice(1)} Tone`
        : 'You Might Also Like';
    }

    // Rebuild card HTML
    container.innerHTML = picks.map((outfit, idx) => {
      const price  = PRICES[outfit.category] || '₹3,499';
      const pct    = Math.min(99, outfit.engineScore || (90 - idx * 3));
      const isLiked = window.AuraState && AuraState.isLiked(outfit.id);
      const heartFill = isLiked ? 'fill="currentColor"' : '';
      const heartActive = isLiked ? 'active' : '';

      // Map outfit ID to a carousel config ID for click navigation
      const configIdMap = {
        'out_001': '1', 'out_023': '1', 'out_027': '1', 'out_031': '1',
        'out_002': '4', 'out_015': '4', 'out_029': '4', 'out_033': '4',
        'out_012': '2', 'out_010': '2', 'out_026': '2', 'out_019': '2',
        'out_008': '3', 'out_016': '3', 'out_020': '3', 'out_024': '3',
      };
      const targetConfig = configIdMap[outfit.id] || String((idx % 5) + 1);

      return `
        <div class="compact-product-card" data-target-outfit="${targetConfig}" data-outfit-id="${outfit.id}">
          <img src="${outfit.image}" alt="${outfit.name}" class="p-thumb" onerror="this.src='assets/black_model_hoodie.png'">
          <div class="p-details">
            <h4>${outfit.name}</h4>
            <span class="p-price">${price}</span>
          </div>
          <div class="p-meta">
            <span class="p-match-pct">${pct}%</span>
            <button class="btn-heart-wishlist ${heartActive}" data-outfit-id="${outfit.id}">
              <i data-lucide="heart" ${heartFill}></i>
            </button>
          </div>
        </div>`;
    }).join('');

    // Re-init Lucide icons for the newly rendered cards
    if (window.lucide) lucide.createIcons();

    // Re-bind click handlers for the new cards
    container.querySelectorAll('.compact-product-card').forEach(card => {
      card.addEventListener('click', () => {
        const targetOutfitId = card.dataset.targetOutfit;
        triggerMiniAnalysisScan('RENDERING RECOMMENDED APPAREL...');
        setTimeout(() => updateActiveConfiguration(targetOutfitId), 500);
      });
    });
  }

  /**
   * Compute a skin-tone-aware style score using AuraEngine.
   */
  function computeSkinAwareScore(tone) {
    if (!window.AuraEngine || !window.AuraOutfits) {
      return Math.floor(Math.random() * 6) + 91;
    }
    const feed = AuraEngine.getFeed(10);
    const compatible = feed.filter(o => {
      const sm = o.skinToneMatch || [];
      return sm.includes('all') || sm.includes(tone);
    });
    if (!compatible.length) return Math.floor(Math.random() * 6) + 91;
    const topScore = compatible[0].engineScore || 70;
    return Math.min(99, Math.max(85, Math.round(topScore * 0.12 + 84)));
  }

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-active');
    if (e.dataTransfer.files.length > 0) handleTryOnUpload(e.dataTransfer.files[0]);
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) handleTryOnUpload(fileInput.files[0]);
  });

  // Use Camera — triggers native camera on mobile; falls back to file picker on desktop
  const cameraInput = document.getElementById('camera-input');

  btnUseCamera.addEventListener('click', (e) => {
    e.stopPropagation();
    if (cameraInput) cameraInput.click();
  });

  // Camera capture runs through the same upload pipeline as the file picker
  if (cameraInput) {
    cameraInput.addEventListener('change', () => {
      if (cameraInput.files.length > 0) {
        handleTryOnUpload(cameraInput.files[0]);
        cameraInput.value = '';
      }
    });
  }

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
      // updateActiveConfiguration already guards against overwriting activeUploadedImageURL
      updateActiveConfiguration('1');
    }, 3600);
  }

  // simulateCameraScan: animation only — image state is managed by activeUploadedImageURL
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
      // updateActiveConfiguration already guards against overwriting activeUploadedImageURL
      updateActiveConfiguration('2');
    }, 3200);
  }

  function triggerMiniAnalysisScan(customLabelText) {
    const calcOverlay = document.createElement('div');
    calcOverlay.className = 'scanning-overlay-text active';
    calcOverlay.style.background = 'rgba(3, 3, 6, 0.6)';
    calcOverlay.innerHTML = `<div class="scanner-spinner" style="width:20px;height:20px;"></div><span style="font-size:0.65rem;letter-spacing:0.1em;">${customLabelText}</span>`;
    stageViewport.appendChild(calcOverlay);
    setTimeout(() => { calcOverlay.remove(); }, 1200);
  }

  // ── v2: Update AI detection attribute display ──────────────────────────────
  function updateDetectionAttributes(tone) {
    const TONE_MAP = {
      fair:   { skin: 'Fair / Light', vibe: 'Refreshing', personality: 'Approachable' },
      medium: { skin: 'Warm Beige',   vibe: 'Balanced',   personality: 'Versatile'    },
      olive:  { skin: 'Olive Warm',   vibe: 'Magnetic',   personality: 'Bold'         },
      tan:    { skin: 'Rich Tan',     vibe: 'Energetic',  personality: 'Confident'    },
      dark:   { skin: 'Deep Mocha',   vibe: 'Dominant',   personality: 'Ambitious'    },
    };
    const data = TONE_MAP[tone] || { skin: 'Warm Neutral', vibe: 'Confident', personality: 'Ambitious' };

    const bodyTypeEl = document.getElementById('select-bodytype');
    const heightEl   = document.getElementById('select-height');
    const bodyMap    = { ectomorph: 'Lean', mesomorph: 'Athletic', endomorph: 'Solid', rectangular: 'Rectangular' };
    const bodyType   = bodyMap[bodyTypeEl?.value] || 'Athletic';
    const height     = heightEl?.value || '180';
    const faceShapes = ['Oval', 'Square', 'Heart', 'Diamond', 'Oblong'];
    const faceShape  = faceShapes[Math.floor(Math.random() * faceShapes.length)];

    const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
    setVal('val-face-shape', faceShape);
    setVal('val-skin-tone',  data.skin);
    setVal('val-body-type',  `${bodyType} (${height}cm)`);
    setVal('val-vibe',       data.vibe);
    setVal('val-personality', data.personality);

    const detectionAttrs = document.getElementById('detection-attributes');
    const analysisStatus = document.getElementById('ai-analysis-status');
    if (detectionAttrs) {
      detectionAttrs.classList.remove('hidden');
      // Stagger fade-in
      detectionAttrs.querySelectorAll('.detect-attr').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.3s ease';
        setTimeout(() => { el.style.opacity = '1'; }, i * 120 + 100);
      });
    }
    if (analysisStatus) analysisStatus.textContent = `✓ Analysis complete — ${faceShape} face detected`;

    // Update archetype + potential text
    const archetypes = ['Urban Executive', 'Quiet Luxury', 'Modern Alpha', 'Street Strategist', 'Elite Minimalist'];
    const archDescs  = [
      'You naturally align with structured modern silhouettes and understated luxury aesthetics that signal authority.',
      'Your presence communicates wealth without announcement — refined, effortless, unshakeable.',
      'You project command through clean lines and premium fabrics. Others notice you before you speak.',
      'You blend cultural intelligence with urban edge, creating a look that\'s both tactical and stylish.',
      'Every element you wear is intentional. You achieve maximum impact through restraint and precision.',
    ];
    const archIdx = ['fair','medium','olive','tan','dark'].indexOf(tone) % archetypes.length;
    const archName = archetypes[Math.max(0, archIdx)];
    const archDesc = archDescs[Math.max(0, archIdx)];
    const archNameEl = document.getElementById('tryon-archetype-name');
    const archDescEl = document.getElementById('tryon-archetype-desc');
    if (archNameEl) { archNameEl.style.opacity='0'; setTimeout(()=>{archNameEl.textContent=archName;archNameEl.style.transition='opacity 0.4s';archNameEl.style.opacity='1';},300); }
    if (archDescEl) { archDescEl.style.opacity='0'; setTimeout(()=>{archDescEl.textContent=archDesc;archDescEl.style.transition='opacity 0.4s';archDescEl.style.opacity='1';},500); }
  }

  // Wishlist and fullscreen
  btnWishlistHero.addEventListener('click', () => {
    btnWishlistHero.classList.toggle('active');
  });

  btnShareHero.addEventListener('click', () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      triggerMiniAnalysisScan('✓ LINK COPIED TO CLIPBOARD');
    }
  });

  btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      stageViewport.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen();
    }
  });

  btnTryAnother.addEventListener('click', () => {
    let nextId = parseInt(currentOutfitId) + 1;
    if (nextId > 5) nextId = 1;
    triggerMiniAnalysisScan('SELECTING ALTERNATIVE FIT...');
    setTimeout(() => { updateActiveConfiguration(nextId.toString()); }, 400);
  });

  // ── v2: Prev / Next navigation ─────────────────────────────────────────────
  const btnPrevLook = document.getElementById('btn-prev-look');
  const btnNextLook = document.getElementById('btn-next-look');
  if (btnPrevLook) {
    btnPrevLook.addEventListener('click', () => {
      let prevId = parseInt(currentOutfitId) - 1;
      if (prevId < 1) prevId = 5;
      triggerMiniAnalysisScan('LOADING PREVIOUS LOOK...');
      setTimeout(() => { updateActiveConfiguration(prevId.toString()); }, 300);
    });
  }
  if (btnNextLook) {
    btnNextLook.addEventListener('click', () => {
      let nextId = parseInt(currentOutfitId) + 1;
      if (nextId > 5) nextId = 1;
      triggerMiniAnalysisScan('LOADING NEXT LOOK...');
      setTimeout(() => { updateActiveConfiguration(nextId.toString()); }, 300);
    });
  }

  // ── v2: Change Photo button ────────────────────────────────────────────────
  const btnChangePhoto = document.getElementById('btn-change-photo');
  if (btnChangePhoto) {
    btnChangePhoto.addEventListener('click', () => {
      fileInput.click();
    });
  }

  // ── v2: Generate AI Look CTA ───────────────────────────────────────────────
  const btnGenerateLook = document.getElementById('btn-generate-look');
  if (btnGenerateLook) {
    btnGenerateLook.addEventListener('click', () => {
      const originalText = btnGenerateLook.innerHTML;
      btnGenerateLook.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Generating...`;
      btnGenerateLook.style.opacity = '0.75';
      triggerMiniAnalysisScan('GENERATING PERSONALIZED AI LOOK...');
      setTimeout(() => {
        const keys = Object.keys(configurations);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        updateActiveConfiguration(randomKey);
        btnGenerateLook.innerHTML = originalText;
        btnGenerateLook.style.opacity = '1';
        triggerMiniAnalysisScan('✓ LOOK GENERATED');
      }, 1800);
    });
  }

  // ── v2: Outfit source buttons ──────────────────────────────────────────────
  const btnUploadOutfit = document.getElementById('btn-upload-outfit');
  const btnSelectStore  = document.getElementById('btn-select-store');
  [btnUploadOutfit, btnSelectStore].forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      [btnUploadOutfit, btnSelectStore].forEach(b => b?.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // ── v2: Save look (add to cart) ────────────────────────────────────────────
  btnSaveLook.addEventListener('click', () => {
    const orig = btnSaveLook.innerHTML;
    btnSaveLook.innerHTML = '<span>Adding to Cart...</span>';
    setTimeout(() => {
      btnSaveLook.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Added Successfully!';
      setTimeout(() => { btnSaveLook.innerHTML = orig; }, 2000);
    }, 1000);
  });

  // ── v2: New Try-On button resets photo state ───────────────────────────────
  const btnNewTryon = document.getElementById('btn-new-tryon');
  if (btnNewTryon) {
    btnNewTryon.addEventListener('click', () => {
      activeUploadedImageURL = null;
      localStorage.removeItem(TRYON_IMAGE_KEY);
      if (window.AuraState) AuraState.setActiveUserImage(null);
      heroDisplayImage.src = configurations['1'].image;
      heroDisplayImage.style.filter = '';

      // Reset studio to empty state
      const emptyState   = document.getElementById('photo-empty-state');
      const previewState = document.getElementById('photo-preview-state');
      if (emptyState)   emptyState.classList.remove('hidden');
      if (previewState) previewState.classList.add('hidden');

      // Reset wireframe
      const facePlaceholder = document.getElementById('face-placeholder');
      const faceWireframe   = document.getElementById('face-wireframe');
      if (facePlaceholder) facePlaceholder.classList.remove('hidden');
      if (faceWireframe)   faceWireframe.classList.add('hidden');

      const analysisStatus = document.getElementById('ai-analysis-status');
      if (analysisStatus) analysisStatus.textContent = 'Analyzing your features...';
      const detectionAttrs = document.getElementById('detection-attributes');
      if (detectionAttrs) detectionAttrs.classList.add('hidden');

      updateActiveConfiguration('1');
    });
  }

  compactProductCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetOutfitId = card.dataset.targetOutfit;
      triggerMiniAnalysisScan('RENDERING RECOMMENDED APPAREL...');
      setTimeout(() => { updateActiveConfiguration(targetOutfitId); }, 500);
    });
  });

  // ── v2: Style Info Modal (Premium) ─────────────────────────────────────────
  const btnOpenStyleInfo = document.getElementById('btn-open-style-info');
  const btnCloseStyleInfo = document.getElementById('btn-close-style-info');
  const styleInfoModal = document.getElementById('style-info-modal');

  if (btnOpenStyleInfo && styleInfoModal) {
    btnOpenStyleInfo.addEventListener('click', () => {
      styleInfoModal.classList.add('active');
    });
  }

  if (btnCloseStyleInfo && styleInfoModal) {
    btnCloseStyleInfo.addEventListener('click', () => {
      styleInfoModal.classList.remove('active');
    });
  }

  if (styleInfoModal) {
    styleInfoModal.addEventListener('click', (e) => {
      if (e.target === styleInfoModal) {
        styleInfoModal.classList.remove('active');
      }
    });
  }

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

  // Restore uploaded photo from localStorage (survives page refresh)
  if (activeUploadedImageURL) {
    heroDisplayImage.src = activeUploadedImageURL;
    heroDisplayImage.style.filter = '';

    // v2: also restore studio photo preview
    const studioPhoto = document.getElementById('studio-user-photo');
    if (studioPhoto) studioPhoto.src = activeUploadedImageURL;
    const emptyState   = document.getElementById('photo-empty-state');
    const previewState = document.getElementById('photo-preview-state');
    if (emptyState)   emptyState.classList.add('hidden');
    if (previewState) previewState.classList.remove('hidden');
    const facePlaceholder = document.getElementById('face-placeholder');
    const faceWireframe   = document.getElementById('face-wireframe');
    if (facePlaceholder) facePlaceholder.classList.add('hidden');
    if (faceWireframe)   faceWireframe.classList.remove('hidden');
  }

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
