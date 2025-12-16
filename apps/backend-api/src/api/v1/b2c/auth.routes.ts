import { Router } from 'express';
import { authController } from '../../../controllers/auth.controller.js';

const router = Router();
router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/google', authController.googleSignIn);

export default router;
