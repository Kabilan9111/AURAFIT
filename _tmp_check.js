/* ==========================================================================
   AURAFIT — AI Skin Tone Analyzer
   window.AuraSkinAnalyzer: Canvas-based skin tone detection from image URL.

   detect(imageURL) → Promise<string>
     Returns one of: 'fair' | 'medium' | 'olive' | 'tan' | 'dark' | null

   Strategy:
   - Draws image to an offscreen canvas
   - Samples pixels from the upper-center region (typical face/neck area)
   - Filters out near-black (background/clothing) and near-white pixels
   - Averages remaining "skin-candidate" pixels by luminance
   - Maps luminance → tone category via ITA-inspired thresholds
   ========================================================================== */

(function () {
  'use strict';

  // ── Tone thresholds (standard luma: L = 0.299R + 0.587G + 0.114B) ─────────
  const THRESHOLDS = [
    { name: 'fair',   min: 175 },
    { name: 'medium', min: 145 },
    { name: 'olive',  min: 115 },
    { name: 'tan',    min:  85 },
    { name: 'dark',   min:   0 },
  ];

  // ── data-skin values the left panel uses ──────────────────────────────────
  const VALID_TONES = ['fair', 'medium', 'olive', 'tan', 'dark'];

  /**
   * Load an image from a URL into an HTMLImageElement.
   * @param {string} url
   * @returns {Promise<HTMLImageElement>}
   */
  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload  = () => resolve(img);
      img.onerror = ()  => reject(new Error('Image load failed'));
      img.src = url;
    });
  }

  /**
   * Standard luminance of an RGB triplet.
   */
  function luma(r, g, b) {
    return 0.299 * r + 0.587 * g + 0.114 * b;
  }

  /**
   * Rough "is this a skin-tone pixel?" heuristic.
   * Rejects near-black, near-white, and highly-saturated (clothing) pixels.
   */
  function isSkinCandidate(r, g, b) {
    const l = luma(r, g, b);
    if (l < 40 || l > 240) return false;  // too dark / too bright

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const sat = max === 0 ? 0 : (max - min) / max;
    if (sat > 0.75) return false;          // too saturated (colored clothing)

    // Skin pixels: red channel dominant, green slightly lower, blue lowest
    if (r < g || r < b)        return false;
    if (r - b < 15)            return false;
    return true;
  }

  /**
   * Map average luma → tone label.
   * @param {number} avgLuma
   * @returns {string}
   */
  function lumaToTone(avgLuma) {
    for (const t of THRESHOLDS) {
      if (avgLuma >= t.min) return t.name;
    }
    return 'dark';
  }

  /**
   * Detect skin tone from a data-URL or Cloudinary URL.
   * @param {string} imageURL - dataURL or HTTPS URL
   * @returns {Promise<string|null>}  tone label or null on failure
   */
  async function detect(imageURL) {
    if (!imageURL) return null;

    try {
      const img = await loadImage(imageURL);

      // ── Offscreen canvas ───────────────────────────────────────────────────
      const SAMPLE_W = 120;   // we work at low resolution for speed
      const SAMPLE_H = 120;
      const canvas  = document.createElement('canvas');
      canvas.width  = SAMPLE_W;
      canvas.height = SAMPLE_H;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.drawImage(img, 0, 0, SAMPLE_W, SAMPLE_H);

      // ── Sample the upper-center 40% × 60% region (face / neck / chest) ────
      // x: from 30% to 70% of width  →  cols 36–84
      // y: from  5% to 65% of height →  rows  6–78
      const x0 = Math.floor(SAMPLE_W * 0.30);
      const x1 = Math.floor(SAMPLE_W * 0.70);
      const y0 = Math.floor(SAMPLE_H * 0.05);
      const y1 = Math.floor(SAMPLE_H * 0.65);

      let lumaSum   = 0;
      let skinPixels = 0;

      for (let y = y0; y < y1; y += 2) {     // step 2 px for speed
        for (let x = x0; x < x1; x += 2) {
          const d = ctx.getImageData(x, y, 1, 1).data;
          const [r, g, b, a] = d;
          if (a < 200) continue;              // skip transparent pixels
          if (!isSkinCandidate(r, g, b)) continue;
          lumaSum += luma(r, g, b);
          skinPixels++;
        }
      }

      // Need at least 10 skin-candidate pixels to trust the result
      if (skinPixels < 10) {
        console.log('[AuraSkin] Not enough skin pixels found — skipping tone detection');
        return null;
      }

      const avgLuma = lumaSum / skinPixels;
      const tone    = lumaToTone(avgLuma);

      console.log(`[AuraSkin] Detected: ${tone} (avgLuma=${avgLuma.toFixed(1)}, skinPx=${skinPixels})`);
      return VALID_TONES.includes(tone) ? tone : null;

    } catch (err) {
      console.warn('[AuraSkin] Detection error:', err.message);
      return null;
    }
  }

  // ── Public API ─────────────────────────────────────────────────────────────
  window.AuraSkinAnalyzer = { detect };

})();
