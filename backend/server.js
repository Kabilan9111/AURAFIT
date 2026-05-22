/* ==========================================================================
   AURAFIT — Image Upload Server
   Express + Multer (memory storage) + Cloudinary v2
   Endpoint: POST /api/upload  →  returns { url, public_id, width, height }
   ========================================================================== */

require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const multer     = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { Readable } = require('stream');

// ─── Cloudinary Configuration ──────────────────────────────────────────────
cloudinary.config({
  cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
  api_key    : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET,
});

// ─── Multer — memory storage (buffer sent directly to Cloudinary) ──────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits : { fileSize: 10 * 1024 * 1024 },   // 10 MB max
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (jpg, png, webp, gif) are accepted.'), false);
    }
  },
});

// ─── Express App ───────────────────────────────────────────────────────────
const app = express();

app.use(cors({
  origin : process.env.FRONTEND_ORIGIN || 'http://localhost:8000',
  methods: ['GET', 'POST', 'OPTIONS'],
}));

app.use(express.json());

// ─── Health Check ──────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status    : 'ok',
    service   : 'AURAFIT Upload Server',
    timestamp : new Date().toISOString(),
    cloudinary: !!process.env.CLOUDINARY_CLOUD_NAME ? 'configured' : 'NOT configured — set .env',
  });
});

// ─── POST /api/upload ──────────────────────────────────────────────────────
app.post('/api/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided. Send field name "image".' });
    }

    // Validate Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
      return res.status(500).json({
        error: 'Cloudinary is not configured. Fill in CLOUDINARY_* values in backend/.env',
      });
    }

    // Stream the buffer to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder         : 'aurafit-uploads',
          resource_type  : 'image',
          transformation : [{ quality: 'auto:good', fetch_format: 'auto' }],
          tags           : ['aurafit', 'user-upload'],
        },
        (error, result) => {
          if (error) reject(error);
          else       resolve(result);
        }
      );

      // Pipe the in-memory buffer into the upload stream
      const readable = new Readable();
      readable.push(req.file.buffer);
      readable.push(null);
      readable.pipe(uploadStream);
    });

    console.log(`[AURAFIT] Uploaded → ${result.secure_url}`);

    res.json({
      url       : result.secure_url,
      public_id : result.public_id,
      width     : result.width,
      height    : result.height,
      format    : result.format,
    });

  } catch (err) {
    console.error('[AURAFIT Upload Error]', err.message);
    res.status(500).json({ error: err.message || 'Upload failed' });
  }
});

// ─── Global Error Handler ──────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[AURAFIT Server Error]', err.message);
  res.status(err.status || 500).json({ error: err.message });
});

// ─── Start ─────────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT, 10) || 3001;

app.listen(PORT, () => {
  console.log('');
  console.log('  ██████╗ ██╗   ██╗██████╗  █████╗ ███████╗██╗████████╗');
  console.log('  ██╔══██╗██║   ██║██╔══██╗██╔══██╗██╔════╝██║╚══██╔══╝');
  console.log('  ███████║██║   ██║██████╔╝███████║█████╗  ██║   ██║   ');
  console.log('  ██╔══██║██║   ██║██╔══██╗██╔══██║██╔══╝  ██║   ██║   ');
  console.log('  ██║  ██║╚██████╔╝██║  ██║██║  ██║██║     ██║   ██║   ');
  console.log('  ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝   ╚═╝   ');
  console.log('');
  console.log(`  Upload Server running at  →  http://localhost:${PORT}`);
  console.log(`  Health check              →  http://localhost:${PORT}/api/health`);
  console.log(`  Upload endpoint           →  POST http://localhost:${PORT}/api/upload`);
  console.log(`  Cloudinary cloud          →  ${process.env.CLOUDINARY_CLOUD_NAME || '⚠ NOT SET'}`);
  console.log('');
});
