/* ==========================================================================
   AURAFIT — AI Stylist Page Controller
   Handles chat interfaces, outfit generators, SVG radar morphs, and mood states.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Lucide Icons Initialization
  lucide.createIcons();

  /* ==========================================================================
     1. Chat Messaging & Suggestion Engine
     ========================================================================== */
  const chatBox = document.getElementById('stylist-chat-box');
  const chatInput = document.getElementById('stylist-chat-input');
  const btnSend = document.getElementById('btn-stylist-send');
  const suggestionChips = document.querySelectorAll('.suggestion-chip');

  // Helper to add chat bubble
  function addChatBubble(sender, text) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerText = text;
    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Helper to show typing indicator
  function showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chat-typing-indicator';
    indicator.id = 'chat-typing-id';
    indicator.innerHTML = '<span></span><span></span><span></span>';
    chatBox.appendChild(indicator);
    chatBox.scrollTop = chatBox.scrollHeight;
    return indicator;
  }

  // Simulated responses based on keywords
  const botAnswers = {
    'date night': "Date nights call for a refined, confident approach. I recommend our 'Night Elegance' Velvet Tuxedo or a high-contrast beige overshirt layered over a dark tee. Let's aim for a Confident Minimalist look.",
    'black cargos': "Black cargo pants are extremely versatile! I recommend pairing them with a loose-knit sand hoodie or a textured olive oversized blazer. For footwear, go with clean, minimalist white sneakers.",
    'airport': "Travel styling must prioritize breathable fabrics and premium comfort. A heavy-knit relaxed sweater paired with minimalist cream joggers and slides will keep you looking effortlessly luxurious under ₹5000.",
    'gym': "For high-performance gym styling, go with a moisture-wicking dark graphite muscle tee, reflective charcoal joggers, and lightweight performance trainers. Total focus, zero clutter.",
    'default': "That's an excellent fashion direction, Leon! I'm scanning our database to customize this look for your body silhouette and contrast profile. Let me know if you would like me to generate a flat-lay breakdown."
  };

  function handleUserMessage(msgText) {
    if (!msgText.trim()) return;

    // Add user bubble
    addChatBubble('user', msgText);
    chatInput.value = '';

    // Typing simulated transition
    const typing = showTypingIndicator();

    setTimeout(() => {
      typing.remove();
      
      // Use AuraInsights for profile-aware replies; fall back to static answers
      let reply;
      const cleaned = msgText.toLowerCase();
      if (window.AuraInsights && window.AuraState) {
        reply = AuraInsights.getChatResponse(msgText, AuraState.styleProfile);
      } else {
        if (cleaned.includes('date'))    reply = botAnswers['date night'];
        else if (cleaned.includes('cargo'))   reply = botAnswers['black cargos'];
        else if (cleaned.includes('airport')) reply = botAnswers['airport'];
        else if (cleaned.includes('gym'))     reply = botAnswers.gym;
        else                                  reply = botAnswers.default;
      }
      addChatBubble('assistant', reply);
    }, 1200);
  }

  // Listen for Enter key
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleUserMessage(chatInput.value);
      }
    });
  }

  if (btnSend) {
    btnSend.addEventListener('click', () => {
      handleUserMessage(chatInput.value);
    });
  }

  // Suggestion chips listeners
  suggestionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      handleUserMessage(chip.innerText);
    });
  });

  /* ==========================================================================
     2. Outfit Generator (Laser Scanner Sweep + DOM State Swapping)
     ========================================================================== */
  const btnGenerate = document.getElementById('btn-generate-look');
  const laserSweep = document.getElementById('generator-laser');
  const budgetSlider = document.getElementById('budget-slider');
  const budgetVal = document.getElementById('budget-val-indicator');

  // Sync budget slider value
  if (budgetSlider && budgetVal) {
    budgetSlider.addEventListener('input', () => {
      budgetVal.innerText = `₹${budgetSlider.value}`;
    });
  }

  // Mock generated outfit details
  const flatlays = [
    {
      jacketImg: 'assets/product_relaxed_pants.png', // Fallbacks
      jacketName: 'Oversized Midnight Coat',
      jacketPrice: '₹2,499',
      teeName: 'Premium Heavyweight Tee',
      teePrice: '₹999',
      pantsName: 'Straight-Fit Tech Trousers',
      pantsPrice: '₹1,599',
      shoesName: 'Venezia Leather Sneakers',
      shoesPrice: '₹2,299',
      totalPrice: '₹7,396',
      score: '96% Fit'
    },
    {
      jacketImg: 'assets/product_minimal_hoodie.png',
      jacketName: 'Textured Bomber Jacket',
      jacketPrice: '₹1,999',
      teeName: 'Pima Cotton Tee',
      teePrice: '₹899',
      pantsName: 'Ultra-Comfort Sweatpants',
      pantsPrice: '₹1,299',
      shoesName: 'Sport knit Trainers',
      shoesPrice: '₹1,800',
      totalPrice: '₹5,997',
      score: '91% Fit'
    }
  ];

  let currentOutfitIndex = 0;

  if (btnGenerate && laserSweep) {
    btnGenerate.addEventListener('click', () => {
      // Toggle laser animation active
      laserSweep.classList.add('active');
      btnGenerate.disabled = true;
      btnGenerate.innerText = 'Analyzing Style Attributes...';

      setTimeout(() => {
        laserSweep.classList.remove('active');
        btnGenerate.disabled = false;
        btnGenerate.innerText = 'Generate My Look';

        // Swap details
        currentOutfitIndex = (currentOutfitIndex + 1) % flatlays.length;
        const dat = flatlays[currentOutfitIndex];

        // Update list details
        document.getElementById('breakdown-item-jacket').innerText = dat.jacketName;
        document.getElementById('breakdown-price-jacket').innerText = dat.jacketPrice;
        
        document.getElementById('breakdown-item-tee').innerText = dat.teeName;
        document.getElementById('breakdown-price-tee').innerText = dat.teePrice;

        document.getElementById('breakdown-item-pants').innerText = dat.pantsName;
        document.getElementById('breakdown-price-pants').innerText = dat.pantsPrice;

        document.getElementById('breakdown-item-shoes').innerText = dat.shoesName;
        document.getElementById('breakdown-price-shoes').innerText = dat.shoesPrice;

        document.getElementById('breakdown-total-price').innerText = dat.totalPrice;
        document.getElementById('breakdown-fit-score').innerText = dat.score;

        // Apply visual zoom feedback
        const layoutGrid = document.querySelector('.flatlay-layout-grid');
        if (layoutGrid) {
          layoutGrid.style.transform = 'scale(0.97)';
          setTimeout(() => {
            layoutGrid.style.transform = 'scale(1)';
          }, 300);
        }
      }, 1600);
    });
  }

  /* ==========================================================================
     3. Celebrity / Aesthetic Mode (Radar Chart Morphs)
     ========================================================================== */
  const aestheticNodes = document.querySelectorAll('.aesthetic-circle-node');
  const radarPolygon = document.getElementById('radar-score-polygon');
  const overallScoreEl = document.getElementById('radar-overall-val');
  const moodValueEl = document.getElementById('style-mood-value');

  // Preset polygon shapes and metrics for different aesthetics
  const aestheticPresets = {
    'old-money': { points: '110,30 180,90 150,160 70,165 40,90', score: '94', mood: 'Elegant Classic' },
    'korean-minimal': { points: '110,60 170,100 140,150 85,150 60,95', score: '91', mood: 'Sleek Minimalist' },
    'mafia-style': { points: '110,25 190,80 170,170 50,160 30,85', score: '96', mood: 'Mysterious Power' },
    'tech-billionaire': { points: '110,70 155,110 130,140 90,140 70,110', score: '88', mood: 'Functional Minimalist' },
    'streetwear': { points: '110,40 185,95 160,155 60,170 35,95', score: '95', mood: 'Street Dominator' },
    'rockstar': { points: '110,35 175,85 165,160 55,155 45,100', score: '93', mood: 'Mysterious Rockstar' },
    'anime-mc': { points: '110,50 160,105 135,145 80,145 65,105', score: '89', mood: 'Heroic Casual' },
    'luxury-ceo': { points: '110,20 195,75 175,175 45,165 25,80', score: '97', mood: 'Confident Dominant' }
  };

  aestheticNodes.forEach(node => {
    node.addEventListener('click', () => {
      // Set active highlight
      aestheticNodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const presetKey = node.getAttribute('data-preset');
      const preset = aestheticPresets[presetKey];

      // Track selection in AuraState (builds style profile)
      if (window.AuraState && presetKey) {
        AuraState.trackAesthetic(presetKey);
      }

      if (preset && radarPolygon && overallScoreEl && moodValueEl) {
        // Morph radar polygon shape
        radarPolygon.setAttribute('points', preset.points);
        
        // Count up animation for score
        let currentScore = parseInt(overallScoreEl.innerText);
        const targetScore = parseInt(preset.score);
        const step = targetScore > currentScore ? 1 : -1;

        const countInterval = setInterval(() => {
          if (currentScore === targetScore) {
            clearInterval(countInterval);
          } else {
            currentScore += step;
            overallScoreEl.innerText = currentScore;
          }
        }, 30);

        // Update mood label
        moodValueEl.innerText = preset.mood;

        // Refresh live insights based on updated profile
        refreshInsights();
      }
    });
  });

  /* ==========================================================================
     4. Selection Buttons (Occasions, Moods)
     ========================================================================== */
  const occasionBtns = document.querySelectorAll('.matrix-card-btn');
  const moodBtns = document.querySelectorAll('.select-mood-btn');

  occasionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      occasionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Since Mood selectors can be inside custom list matrices
  moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      moodBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ==========================================================================
     5. Wishlist Toggles & Global Counter updates
     ========================================================================== */
  const heartIcons = document.querySelectorAll('.btn-wishlist-indicator, .stage-action-btn, .mini-heart-btn');
  const countBadge = document.getElementById('wishlist-counter-value');

  heartIcons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.classList.toggle('active');

      if (countBadge) {
        let currentCount = parseInt(countBadge.innerText) || 0;
        if (btn.classList.contains('active')) {
          currentCount++;
        } else {
          currentCount = Math.max(0, currentCount - 1);
        }
        countBadge.innerText = currentCount;
        
        // Bubble bounce animation
        countBadge.style.transform = 'scale(1.3)';
        setTimeout(() => {
          countBadge.style.transform = 'scale(1)';
        }, 200);
      }
    });
  });

  /* ==========================================================================
     6. Live Style Insights — inject dynamic sentences into checklist
     ========================================================================== */
  function refreshInsights() {
    if (!window.AuraInsights || !window.AuraState) return;
    const profile  = AuraState.styleProfile;
    const insights = AuraInsights.get(4, profile);
    // Target the suitability checklist items on the stylist page
    const items = document.querySelectorAll(
      '#page-stylist .suitability-checklist .item-text, ' +
      '#page-stylist .insight-item-text, ' +
      '#page-stylist .checklist-item span'
    );
    if (!items.length) return;
    insights.forEach((txt, i) => {
      if (items[i]) items[i].textContent = txt;
    });
  }

  // Initial render + re-render whenever profile updates
  refreshInsights();
  window.addEventListener('aura:statechange', refreshInsights);
});
