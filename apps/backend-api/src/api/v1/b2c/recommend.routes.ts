import { Router } from 'express';
import { aiClient } from '../../../services/ai.service.js';

const router = Router();
router.get('/', async (_req, res) => {
  try {
    const r = await aiClient.post('/recommend', {});
    res.json(r.data);
  } catch (e) {
    res.status(500).json({ error: 'AI service error' });
  }
});

export default router;
