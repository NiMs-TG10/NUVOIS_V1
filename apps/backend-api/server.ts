import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/api/v1/b2c/auth.routes.js';
import profileRoutes from './src/api/v1/b2c/profile.routes.js';
import wardrobeRoutes from './src/api/v1/b2c/wardrobe.routes.js';
import recommendRoutes from './src/api/v1/b2c/recommend.routes.js';

dotenv.config();
const app = express();

// Enable CORS for mobile app
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Health check
app.get('/health', (_req, res) => res.json({ ok: true }));

// API Routes
app.use('/api/v1/b2c/auth', authRoutes);
app.use('/api/v1/b2c/profile', profileRoutes);
app.use('/api/v1/b2c/wardrobe', wardrobeRoutes);
app.use('/api/v1/b2c/recommend', recommendRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
