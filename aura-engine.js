/* ==========================================================================
   AURAFIT — Smart Recommendation Engine
   window.AuraEngine: Scores, ranks and retrieves outfit recommendations
   based on the user's evolving style profile.
   ========================================================================== */

(function () {
  'use strict';

  // ── Scoring weights (must sum to 100) ────────────────────────────────────────────────
  const W = {
    CATEGORY:  30,
    AESTHETIC: 25,
    COLOR:     20,
    SKIN:      10,   // skin tone compatibility bonus
    QUALITY:   15    // outfit's own styleScore / confidenceScore blend
  };

  /**
   * Score a single outfit against a style profile.
   * @param {object} outfit  - AuraOutfits entry
   * @param {object} profile - AuraState.styleProfile
   * @returns {number} 0–100
   */
  function score(outfit, profile) {
    if (!outfit) return 0;
    const p = profile || {};
    let s = 0;

    // 1. Category match
    const cats = p.topCategories || [];
    if (cats[0] === outfit.category)      s += W.CATEGORY;
    else if (cats[1] === outfit.category) s += Math.round(W.CATEGORY * 0.65);
    else if (cats[2] === outfit.category) s += Math.round(W.CATEGORY * 0.33);

    // 2. Aesthetic match
    const aes = p.preferredAesthetics || [];
    if (aes[0] === outfit.aesthetic)      s += W.AESTHETIC;
    else if (aes[1] === outfit.aesthetic) s += Math.round(W.AESTHETIC * 0.6);
    else if (aes[2] === outfit.aesthetic) s += Math.round(W.AESTHETIC * 0.3);

    // 3. Color overlap
    const favCols = p.favoriteColors || [];
    const overlap = outfit.colors.filter(c => favCols.includes(c)).length;
    s += Math.min(W.COLOR, overlap * Math.round(W.COLOR / 2));

    // 4. Skin tone compatibility
    const detectedTone = window.AuraState ? window.AuraState.skinTone : null;
    if (detectedTone) {
      const skinMatch = outfit.skinToneMatch || [];
      if (skinMatch.includes('all') || skinMatch.includes(detectedTone)) {
        s += W.SKIN;
      } else {
        // Partial credit for adjacent tones
        const ORDER = ['fair', 'medium', 'olive', 'tan', 'dark'];
        const idx    = ORDER.indexOf(detectedTone);
        const adjacent = [ORDER[idx - 1], ORDER[idx + 1]].filter(Boolean);
        if (adjacent.some(t => skinMatch.includes(t))) {
          s += Math.round(W.SKIN * 0.5);
        }
      }
    }

    // 5. Outfit quality baseline (styleScore + confidenceScore blend)
    const quality = Math.round((outfit.styleScore + outfit.confidenceScore) / 2);
    // Map quality 70–100 → 0–15 pts
    s += Math.max(0, Math.min(W.QUALITY, Math.round((quality - 70) * (W.QUALITY / 30))));

    return Math.min(100, Math.max(0, s));
  }

  /**
   * Rank the full outfit database by engine score.
   * @param {object} profile
   * @returns {Array} outfits with injected engineScore, sorted desc
   */
  function rank(profile) {
    const outfits = window.AuraOutfits || [];
    return outfits
      .map(o => ({ ...o, engineScore: score(o, profile) }))
      .sort((a, b) => b.engineScore - a.engineScore);
  }

  /**
   * Top-N personalised recommendations for the current user.
   * @param {number} n
   * @returns {Array}
   */
  function getFeed(n = 10) {
    const profile = window.AuraState ? window.AuraState.styleProfile : {};
    return rank(profile).slice(0, n);
  }

  /**
   * Outfits most similar to a given outfit ID (ignores user profile).
   * @param {string} outfitId
   * @param {number} n
   * @returns {Array}
   */
  function getSimilar(outfitId, n = 4) {
    const outfits = window.AuraOutfits || [];
    const target = outfits.find(o => o.id === outfitId);
    if (!target) return getFeed(n);

    return outfits
      .filter(o => o.id !== outfitId)
      .map(o => {
        let sim = 0;
        if (o.category  === target.category)  sim += 40;
        if (o.aesthetic === target.aesthetic)  sim += 30;
        sim += o.colors.filter(c => target.colors.includes(c)).length * 6;
        sim += o.tags.filter(t => target.tags.includes(t)).length   * 6;
        return { ...o, engineScore: sim };
      })
      .sort((a, b) => b.engineScore - a.engineScore)
      .slice(0, n);
  }

  /**
   * Ranked outfits filtered to a single category.
   * Side-effect: increments category click counter in AuraState.
   * @param {string} category
   * @param {number} n
   * @returns {Array}
   */
  function getByCategory(category, n = 8) {
    if (!category || category === 'all') return getFeed(n);
    const profile = window.AuraState ? window.AuraState.styleProfile : {};
    if (window.AuraState) window.AuraState.trackCategory(category);
    return (window.AuraOutfits || [])
      .filter(o => o.category === category)
      .map(o => ({ ...o, engineScore: score(o, profile) }))
      .sort((a, b) => b.engineScore - a.engineScore)
      .slice(0, n);
  }

  /**
   * Outfits matching a tag string, ranked by engine score.
   */
  function getByTag(tag, n = 6) {
    const profile = window.AuraState ? window.AuraState.styleProfile : {};
    return (window.AuraOutfits || [])
      .filter(o => o.tags.includes(tag))
      .map(o => ({ ...o, engineScore: score(o, profile) }))
      .sort((a, b) => b.engineScore - a.engineScore)
      .slice(0, n);
  }

  /**
   * Outfits matching an occasion, ranked by engine score.
   */
  function getByOccasion(occasion, n = 6) {
    const profile = window.AuraState ? window.AuraState.styleProfile : {};
    return (window.AuraOutfits || [])
      .filter(o => o.occasion.includes(occasion))
      .map(o => ({ ...o, engineScore: score(o, profile) }))
      .sort((a, b) => b.engineScore - a.engineScore)
      .slice(0, n);
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  window.AuraEngine = {
    score,
    rank,
    getFeed,
    getSimilar,
    getByCategory,
    getByTag,
    getByOccasion
  };

})();
