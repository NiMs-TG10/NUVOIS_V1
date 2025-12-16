import { Router } from 'express';
import { analyzeBody, updateBodyScan } from '../../../controllers/profile.controller.js';
import { requireAuth } from '../../../middleware/auth.middleware.js';

const router = Router();
router.post('/analyze-body', requireAuth, analyzeBody);
router.put('/body-scan', requireAuth, updateBodyScan);

export default router;
