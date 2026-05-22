/* ==========================================================================
   AURAFIT — Shared Image Upload Handler
   Exposes: window.AuraUpload.uploadImageFile(file, callbacks)

   Callbacks:
     onPreview(dataURL)        — fired immediately with local preview URL
     onLoadingStart()          — fired before network request starts
     onLoadingEnd()            — fired after request completes (success or error)
     onSuccess(cloudURL, data) — fired with Cloudinary secure_url + full response
     onError(err)              — fired on network or server error

   Usage in app.js:
     await AuraUpload.uploadImageFile(file, { onPreview, onSuccess, onError });
   ========================================================================== */

window.AuraUpload = (function () {
  'use strict';

  const UPLOAD_ENDPOINT = 'http://localhost:3001/api/upload';

  /**
   * Read a File object and return a data-URL via FileReader.
   * Returns a Promise<string>.
   */
  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = (e) => resolve(e.target.result);
      reader.onerror = ()  => reject(new Error('FileReader failed'));
      reader.readAsDataURL(file);
    });
  }

  /**
   * Upload `file` to the AURAFIT backend, then to Cloudinary.
   *
   * @param {File}   file      — the File object from an <input type="file">
   * @param {object} callbacks — { onPreview, onLoadingStart, onLoadingEnd, onSuccess, onError }
   * @returns {Promise<object|null>} Cloudinary response or null on error
   */
  async function uploadImageFile(file, callbacks = {}) {
    const {
      onPreview,
      onLoadingStart,
      onLoadingEnd,
      onSuccess,
      onError,
    } = callbacks;

    // ── 1. Instant local preview (no network needed) ─────────────────────
    try {
      const dataURL = await readFileAsDataURL(file);
      if (onPreview) onPreview(dataURL);
    } catch (_) {
      // Preview failure is non-fatal; continue with upload
    }

    // ── 2. Signal loading start ───────────────────────────────────────────
    if (onLoadingStart) onLoadingStart();

    // ── 3. POST to backend ────────────────────────────────────────────────
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(UPLOAD_ENDPOINT, {
        method: 'POST',
        body  : formData,
      });

      let data;
      try {
        data = await response.json();
      } catch (_) {
        throw new Error(`Server returned non-JSON response (status ${response.status})`);
      }

      if (!response.ok) {
        throw new Error(data.error || `Upload failed with status ${response.status}`);
      }

      if (!data.url) {
        throw new Error('Server response missing "url" field');
      }

      // ── 4. Success ───────────────────────────────────────────────────────
      if (onSuccess) onSuccess(data.url, data);
      return data;

    } catch (err) {
      console.error('[AURAFIT Upload]', err.message);
      if (onError) onError(err);
      return null;

    } finally {
      // ── 5. Always end loading state ──────────────────────────────────────
      if (onLoadingEnd) onLoadingEnd();
    }
  }

  // Public API
  return { uploadImageFile };

})();
