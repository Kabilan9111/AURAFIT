/* ==========================================================================
   AURAFIT — Style Insights & Chat Enhancement Engine
   window.AuraInsights: Generates dynamic insight sentences and chat replies
   aware of the user's evolving style profile.
   ========================================================================== */

(function () {
  'use strict';

  // ── Insight sentence pools (keyed by aesthetic or category) ───────────────
  const POOLS = {
    // Aesthetic pools
    'minimal-dark': [
      'Black tones create sharp visual contrast and a commanding presence.',
      'Monochrome palettes build an intentional, powerful identity.',
      'Clean silhouettes amplify natural proportions effortlessly.',
      'Your dark aesthetic signals confidence without effort.'
    ],
    'all-black': [
      'Full black eliminates decision fatigue — every piece works.',
      'Dark monochromes elongate the silhouette naturally.',
      'Black is the most versatile luxury signal in menswear.',
      'Your all-black preference shows sharp aesthetic clarity.'
    ],
    'urban-edge': [
      'Urban utility fits define modern masculine confidence.',
      'Cargo details add functional depth to your silhouette.',
      'Your urban taste signals practicality with cultural edge.',
      'Layering creates dimension and texture in street-inspired looks.'
    ],
    'old-money': [
      'Earth tones and tailored cuts signal understated authority.',
      'Your old-money aesthetic is timeless, not trend-dependent.',
      'Neutral palettes build a wardrobe with multi-season longevity.',
      'Relaxed luxury is the most sophisticated form of dressing.'
    ],
    'tech-billionaire': [
      'Minimalist precision signals intellectual confidence.',
      'Function-first styling removes all visual noise.',
      'Your clean aesthetic lets personality — not clothing — lead.',
      'Consistent minimal palettes build a recognisable style identity.'
    ],
    'high-fashion': [
      'Premium materials reward close attention to detail.',
      'Your luxury instinct elevates every styling choice.',
      'Refined fits project quiet authority and elevated taste.',
      'Your wardrobe communicates before you speak.'
    ],
    'nocturnal': [
      'Dark palettes with subtle depth project after-dark sophistication.',
      'Night-ready silhouettes blend drama with restraint.',
      'Your nocturnal aesthetic creates intrigue and presence.',
      'Refined darkness is the ultimate confidence signal.'
    ],
    'athletic': [
      'Performance fits complement an active, disciplined lifestyle.',
      'Dark gym wear amplifies visual intensity during training.',
      'Your athletic palette is clean, focused, and intentional.',
      'Structured gym fits support both performance and aesthetics.'
    ],
    'earthy-warm': [
      'Earth tones harmonise beautifully with warm skin undertones.',
      'Warm palettes create a grounded, approachable energy.',
      'Brown and camel tones build a rich, distinctive wardrobe.',
      'Autumn-palette choices signal mature, refined taste.'
    ],
    'streetwear': [
      'Street aesthetics blend comfort and cultural awareness seamlessly.',
      'Your street instinct is sharp and contextually relevant.',
      'Bold silhouettes define a confident street-inspired identity.',
      'Urban fits signal practicality layered with creative expression.'
    ],
    // Category fallbacks
    'luxury':     [
      'Premium selections reward your attention to craftsmanship.',
      'Your luxury instinct elevates every choice you make.',
      'Tailored refinement is a quiet power statement.',
      'Elevated materials create presence before you move.'
    ],
    'gym':        [
      'Performance fits show commitment to your physique.',
      'Dark gym wear creates sharp visual focus.',
      'Athletic precision in styling mirrors athletic precision in training.',
      'Your gym aesthetic is intentional, not accidental.'
    ],
    'casual':     [
      'Relaxed fits project effortless confidence.',
      'Clean casual is the mark of genuine, unpretentious style.',
      'Neutral base tones build a highly versatile wardrobe.',
      'Simplicity in styling is a form of advanced taste.'
    ],
    'formal':     [
      'Structured fits amplify your natural authority.',
      'Sharp tailoring is the most powerful style communication.',
      'Formal confidence is built through intentional fit.',
      'Clean formality signals discipline and respect.'
    ],
    'monochrome': [
      'Tonal dressing simplifies and elevates simultaneously.',
      'Monochrome cohesion streamlines your visual identity.',
      'Colour consistency is a hallmark of advanced stylistic thinking.',
      'Single-palette dressing creates effortless sophistication.'
    ],
    'hoodies':    [
      'Premium hoodies bridge comfort and contemporary style.',
      'Layered hoodie fits add visual depth to any casual look.',
      'Your hoodie taste is modern and confidently relaxed.',
      'Quality comfort wear is a mark of evolved casual dressing.'
    ],
    'oversized':  [
      'Relaxed fits suit athletic proportions without restriction.',
      'Oversized silhouettes add intentional dimension to lean frames.',
      'Drop-shoulder cuts project relaxed, effortless confidence.',
      'Proportion play is an advanced technique you use instinctively.'
    ],
    // Default fallback
    'default':    [
      'Your emerging style profile shows strong aesthetic instincts.',
      'Every interaction sharpens your personal style algorithm.',
      'Consistent selections build a stronger, more defined identity.',
      'Your color instincts reveal a refined, intentional palette.'
    ]
  };

  // ── Skin-Tone Insight Pools ───────────────────────────────────────────────
  const SKIN_POOLS = {
    'fair': [
      'Deep jewel tones and navy create striking contrast against fair skin.',
      'Crisp whites and blush neutrals amplify a fair complexion naturally.',
      'Charcoal and slate tones provide elegant depth without overpowering.',
      'Earthy pastels and soft camel tones harmonize beautifully with your tone.'
    ],
    'medium': [
      'Warm earth tones and terracotta shades complement your skin perfectly.',
      'Olive greens and burnt sienna tones create a cohesive, rich palette.',
      'Black and ivory create a high-contrast, polished statement on your tone.',
      'Warm burgundy and chocolate brown outfits elevate your natural warmth.'
    ],
    'olive': [
      'Deep forest greens and mustards amplify your olive undertones beautifully.',
      'Rust, camel and warm neutrals create a harmonious tonal look.',
      'Rich jewel tones like sapphire and emerald deliver maximum impact.',
      'Beige and sand tones create a clean, editorial contrast against olive skin.'
    ],
    'tan': [
      'Bold monochromes in white and camel create a sun-kissed, refined look.',
      'Warm oranges and burnt amber tones celebrate your rich complexion.',
      'Deep navy and charcoal provide a powerful, commanding contrast.',
      'Gold and bronze accents complement tan undertones with natural elegance.'
    ],
    'dark': [
      'Vibrant brights and bold pastels command maximum visual impact.',
      'Deep jewel tones — royal blue, emerald, violet — elevate your presence.',
      'Stark white and cream create the highest contrast for a sharp editorial look.',
      'Rich, saturated colors celebrate and complement your deep complexion.'
    ]
  };

  /**
   * Get N dynamic insight sentences for the current style profile.
   * Blends dominant aesthetic pool with top-category insights,
   * and injects skin-tone-specific sentences when a tone is detected.
   * @param {number} n
   * @param {object} profile - AuraState.styleProfile
   * @returns {string[]}
   */
  function get(n = 4, profile = {}) {
    const aesthetic = profile.dominantStyle   || 'default';
    const topCat    = (profile.topCategories  || [])[0] || '';

    // Primary pool from dominant aesthetic
    const primaryPool = POOLS[aesthetic] || POOLS.default;
    // Secondary pool from top category (if available and different key)
    const secondaryPool = (topCat && POOLS[topCat] && topCat !== aesthetic)
      ? POOLS[topCat]
      : [];

    // Skin-tone pool (if a tone has been detected)
    const detectedTone = window.AuraState ? window.AuraState.skinTone : null;
    const skinPool = detectedTone ? (SKIN_POOLS[detectedTone] || []) : [];

    // Mix: first 1 from skinPool (if available), then primary, secondary, rest
    const blended = [
      ...skinPool.slice(0, 1),
      ...primaryPool.slice(0, 2),
      ...secondaryPool.slice(0, 1),
      ...skinPool.slice(1, 2),
      ...primaryPool.slice(2)
    ];

    // Deduplicate, shuffle, return n
    const unique   = [...new Set(blended)];
    const shuffled = unique.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  }

  /**
   * Get N skin-tone-specific insight sentences.
   * @param {string} tone - 'fair' | 'medium' | 'olive' | 'tan' | 'dark'
   * @param {number} n
   * @returns {string[]}
   */
  function getBySkinTone(tone, n = 2) {
    const pool = SKIN_POOLS[tone] || [];
    return pool.slice().sort(() => Math.random() - 0.5).slice(0, n);
  }

  /**
   * Generate a profile-aware chat response for the AI Stylist page.
   * Falls back gracefully when profile is empty.
   * @param {string} message - raw user input
   * @param {object} profile - AuraState.styleProfile
   * @returns {string}
   */
  function getChatResponse(message, profile = {}) {
    const msg       = (message || '').toLowerCase();
    const dominant  = profile.dominantStyle   || '';
    const topCat    = (profile.topCategories  || [])[0] || '';
    const favColor  = (profile.favoriteColors || [])[0] || 'black';

    // Pull top engine recommendation for context
    let topOutfit = null;
    if (window.AuraEngine) {
      const feed = window.AuraEngine.getFeed(3);
      topOutfit = feed[0] || null;
    }
    const recRef = topOutfit
      ? `My top pick for you right now: **${topOutfit.name}** (${topOutfit.engineScore}% profile match).`
      : '';

    // ── Keyword routing ─────────────────────────────────────────────────────
    if (msg.includes('date') || msg.includes('dinner') || msg.includes('romantic')) {
      return `Date nights call for quiet confidence. Your ${dominant || 'minimal'} aesthetic works perfectly here — layer a premium ${favColor} overshirt over a fitted base tee, clean trousers, and sharp footwear. ${recRef}`;
    }
    if (msg.includes('gym') || msg.includes('workout') || msg.includes('training')) {
      return `Your gym palette leans ${favColor}. Dark performance joggers, a fitted muscle tee, and minimal sneakers. Zero clutter, maximum intensity. ${recRef}`;
    }
    if (msg.includes('airport') || msg.includes('travel') || msg.includes('flight')) {
      return `Travel style: breathable ${favColor} tones, relaxed silhouettes, premium slides or clean white sneakers. ${recRef} Effortless luxury at altitude.`;
    }
    if (msg.includes('work') || msg.includes('office') || msg.includes('business') || msg.includes('meeting')) {
      return `Your ${dominant || 'clean'} profile translates well to smart-casual work. Slim dark trousers, a structured overshirt, and minimal sneakers. ${recRef}`;
    }
    if (msg.includes('party') || msg.includes('club') || msg.includes('night out')) {
      return `Night looks from your profile: go ${favColor} monochrome, structured silhouette, one statement accessory. Confidence is the real outfit. ${recRef}`;
    }
    if (msg.includes('casual') || msg.includes('weekend') || msg.includes('chill')) {
      return `Weekend mode: your ${topCat || 'oversized'} preference says relaxed but intentional. Neutral tones, premium sneakers, done. ${recRef}`;
    }
    if (msg.includes('recommend') || msg.includes('suggest') || msg.includes('what should') || msg.includes('what to wear')) {
      return topOutfit
        ? `Your style engine has ranked **${topOutfit.name}** at ${topOutfit.engineScore}% profile match. It features ${topOutfit.tags.join(', ')} — aligned with your ${dominant || 'emerging'} aesthetic and ${topCat || 'curated'} category preference.`
        : `Like and save more outfits to sharpen your personal recommendations. The more you interact, the smarter I get.`;
    }
    if (msg.includes('color') || msg.includes('colour') || msg.includes('palette')) {
      return `Your dominant palette: **${(profile.favoriteColors || ['black', 'charcoal']).join(', ')}**. These tones reflect a ${dominant || 'refined'} aesthetic sensibility. Stick with them — consistency builds identity.`;
    }
    if (msg.includes('profile') || msg.includes('style') || msg.includes('identity') || msg.includes('who am i')) {
      return `Your style identity: **${dominant || 'evolving'}** (primary) + **${profile.secondaryStyle || 'discovering'}** (secondary). Top categories: ${(profile.topCategories || []).join(', ') || 'building...'}. Style consistency score: **${profile.styleConsistency || 0}%**.`;
    }

    // ── Default profile-aware fallback ──────────────────────────────────────
    return `Based on your ${dominant || 'evolving'} aesthetic and preference for ${topCat || 'curated'} looks, I can generate a full outfit breakdown. ${recRef} What occasion are you styling for?`;
  }

  // ── Public API ──────────────────────────────────────────────────────────────────
  window.AuraInsights = { get, getBySkinTone, getChatResponse };

})();
