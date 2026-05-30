/* ==========================================================================
   AURAFIT — Centralized State Engine
   window.AuraState: Single source of truth with localStorage persistence.
   All pages read/write through this object. No direct localStorage calls
   outside this module.
   ========================================================================== */

(function () {
  'use strict';

  const STATE_KEY   = 'aurafit_state_v1';
  const LEGACY_KEY  = 'aurafit_tryon_image'; // keep in sync for app.js compat

  const DEFAULT_STATE = {
    version: 1,
    activeUserImage:  null,
    selectedOutfitId: null,
    skinTone:         null,  // 'fair' | 'medium' | 'olive' | 'tan' | 'dark'
    styleProfile: {
      dominantStyle:       null,
      secondaryStyle:      null,
      favoriteColors:      [],
      topCategories:       [],
      preferredAesthetics: [],
      styleConsistency:    0,
      interactionCount:    0
    },
    likedOutfits:     [],   // outfit IDs user has liked
    savedLooks:       [],   // outfit IDs user has saved
    viewHistory:      [],   // [{ id, ts }]  — last 50 views
    categoryClicks:   {},   // { category: clickCount }
    aestheticClicks:  {},   // { aesthetic: clickCount } (from AI Stylist page)
    recommendationFeed: []
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  function persist(state) {
    try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch (_) {}
  }

  function restore() {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (raw) return Object.assign(clone(DEFAULT_STATE), JSON.parse(raw));
    } catch (_) {}
    // Migrate legacy image key if state_v1 not yet written
    const legacyImg = localStorage.getItem(LEGACY_KEY);
    const s = clone(DEFAULT_STATE);
    if (legacyImg) s.activeUserImage = legacyImg;
    return s;
  }

  // ── Style Profile Derivation ───────────────────────────────────────────────
  function buildProfile(state) {
    const p = clone(DEFAULT_STATE.styleProfile);
    p.interactionCount =
      state.likedOutfits.length +
      state.savedLooks.length +
      state.viewHistory.length;

    const catScore  = {};
    const colScore  = {};
    const aesScore  = {};

    // Weight: liked/saved outfits contribute most
    const interacted = [...new Set([...state.likedOutfits, ...state.savedLooks])];
    const outfits = window.AuraOutfits || [];

    interacted.forEach(id => {
      const o = outfits.find(x => x.id === id);
      if (!o) return;
      catScore[o.category] = (catScore[o.category] || 0) + 3;
      aesScore[o.aesthetic] = (aesScore[o.aesthetic] || 0) + 3;
      o.colors.forEach(c => { colScore[c] = (colScore[c] || 0) + 2; });
    });

    // Category clicks add lighter weight
    Object.entries(state.categoryClicks || {}).forEach(([cat, n]) => {
      catScore[cat] = (catScore[cat] || 0) + Math.floor(n * 0.5);
    });
    // Aesthetic clicks from AI Stylist
    Object.entries(state.aestheticClicks || {}).forEach(([aes, n]) => {
      aesScore[aes] = (aesScore[aes] || 0) + n;
    });

    const sort = obj => Object.entries(obj).sort((a, b) => b[1] - a[1]);

    const cats = sort(catScore);
    const cols = sort(colScore);
    const aes  = sort(aesScore);

    p.topCategories       = cats.slice(0, 3).map(e => e[0]);
    p.favoriteColors      = cols.slice(0, 4).map(e => e[0]);
    p.preferredAesthetics = aes.slice(0, 3).map(e => e[0]);
    p.dominantStyle       = aes[0]?.[0] ?? null;
    p.secondaryStyle      = aes[1]?.[0] ?? null;
    p.styleConsistency    = Math.min(100, p.interactionCount * 4);
    return p;
  }

  // ── State initialisation ───────────────────────────────────────────────────
  let _s = restore();
  _s.styleProfile = buildProfile(_s);

  // ── Internal refresh: rebuild profile + persist ────────────────────────────
  function _refresh() {
    _s.styleProfile = buildProfile(_s);
    persist(_s);
    // Dispatch a lightweight custom event so pages can react
    try {
      window.dispatchEvent(new CustomEvent('aura:statechange', { detail: _s.styleProfile }));
    } catch (_) {}
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  window.AuraState = {

    // ── Getters (read-only snapshots) ──────────────────────────────────────
    get activeUserImage()    { return _s.activeUserImage; },
    get selectedOutfitId()   { return _s.selectedOutfitId; },
    get skinTone()           { return _s.skinTone; },
    get styleProfile()       { return _s.styleProfile; },
    get likedOutfits()       { return [..._s.likedOutfits]; },
    get savedLooks()         { return [..._s.savedLooks]; },
    get viewHistory()        { return [..._s.viewHistory]; },
    get categoryClicks()     { return { ..._s.categoryClicks }; },
    get aestheticClicks()    { return { ..._s.aestheticClicks }; },
    get recommendationFeed() { return [..._s.recommendationFeed]; },

    // ── Image setters ──────────────────────────────────────────────────────
    setActiveUserImage(url) {
      _s.activeUserImage = url;
      // Mirror to legacy key so app.js continues to work unchanged
      if (url) {
        try { localStorage.setItem(LEGACY_KEY, url); } catch (_) {}
      }
      persist(_s);
    },

    setSelectedOutfit(id) {
      _s.selectedOutfitId = id;
      persist(_s);
    },

    // ── Skin tone setter ───────────────────────────────────────────────────
    setSkinTone(tone) {
      _s.skinTone = tone || null;
      persist(_s);
      try {
        window.dispatchEvent(new CustomEvent('aura:skintone', { detail: tone }));
      } catch (_) {}
    },

    // ── Like toggle ────────────────────────────────────────────────────────
    likeOutfit(id) {
      if (_s.likedOutfits.includes(id)) {
        _s.likedOutfits = _s.likedOutfits.filter(i => i !== id);
      } else {
        _s.likedOutfits.push(id);
      }
      _refresh();
      return _s.likedOutfits.includes(id); // returns new liked state
    },

    // ── Save toggle ────────────────────────────────────────────────────────
    saveOutfit(id) {
      if (_s.savedLooks.includes(id)) {
        _s.savedLooks = _s.savedLooks.filter(i => i !== id);
      } else {
        _s.savedLooks.push(id);
      }
      _refresh();
      return _s.savedLooks.includes(id);
    },

    // ── Query helpers ──────────────────────────────────────────────────────
    isLiked(id) { return _s.likedOutfits.includes(id); },
    isSaved(id) { return _s.savedLooks.includes(id); },

    // ── Interaction tracking ───────────────────────────────────────────────
    trackView(id) {
      _s.viewHistory.push({ id, ts: Date.now() });
      if (_s.viewHistory.length > 50) _s.viewHistory.shift();
      _refresh();
    },

    trackCategory(cat) {
      if (!cat) return;
      _s.categoryClicks[cat] = (_s.categoryClicks[cat] || 0) + 1;
      _refresh();
    },

    trackAesthetic(aes) {
      if (!aes) return;
      _s.aestheticClicks[aes] = (_s.aestheticClicks[aes] || 0) + 1;
      _refresh();
    },

    // ── Debug ──────────────────────────────────────────────────────────────
    snapshot()        { return clone(_s); },
    resetAll()        { _s = clone(DEFAULT_STATE); _refresh(); }
  };

})();
