import { Router } from 'express';
import multer from 'multer';
import { ScanController } from '../../../controllers/scan.controller';

const router = Router();

// Configure Multer for memory storage (buffer access)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

// POST /api/v1/b2c/scan/upload
router.post('/upload', upload.single('image'), ScanController.uploadScan);

export default router;
