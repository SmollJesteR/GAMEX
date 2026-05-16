import { Router, Request, Response } from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/auth.js';
import { uploadImage } from '../utils/cloudinary.js';
import fs from 'fs';

const router = Router();

// Configure multer to store files temporarily in the OS temp directory
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

router.post('/', requireAuth, upload.single('media'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await uploadImage(req.file.path, 'gamex_reviews');

    // Clean up local temp file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error('Failed to delete temp file:', err);
    });

    return res.status(200).json({ url: result.url });
  } catch (error) {
    console.error('Upload error:', error);
    if (req.file) {
      fs.unlink(req.file.path, () => {});
    }
    return res.status(500).json({ error: 'Failed to upload media' });
  }
});

export default router;
