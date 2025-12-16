import { Request, Response } from 'express';
import { prisma } from '../services/db.service.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '331521908321-1ete4f6m9radehm7fmh5p8ipblni0ntt.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const authController = {
  signUp: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body || {};
      if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) return res.status(400).json({ message: 'User already exists' });

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const user = await prisma.user.create({ data: { name, email, passwordHash, provider: 'email' } });
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (e) {
      console.error('Signup error:', e);
      return res.status(500).json({ message: 'Server error', error: e instanceof Error ? e.message : String(e) });
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });

      // Check if user signed up with Google (no password)
      if (!user.passwordHash) {
        return res.status(400).json({ message: 'Please sign in with Google' });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (e) {
      console.error('Login error:', e);
      return res.status(500).json({ message: 'Server error', error: e instanceof Error ? e.message : String(e) });
    }
  },
  googleSignIn: async (req: Request, res: Response) => {
    try {
      const { idToken } = req.body || {};
      if (!idToken) return res.status(400).json({ message: 'Missing ID token' });

      // Verify the ID token
      const ticket = await client.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) return res.status(400).json({ message: 'Invalid token' });

      const { email, name, sub: googleId } = payload;
      if (!email) return res.status(400).json({ message: 'Email not provided by Google' });

      // Find or create user
      let user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        // Create new user with Google authentication
        user = await prisma.user.create({
          data: {
            email,
            name: name || email.split('@')[0],
            provider: 'google',
          },
        });
      } else if (user.provider !== 'google') {
        // User exists with email/password, update to allow Google login
        user = await prisma.user.update({
          where: { email },
          data: { provider: 'google' },
        });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(200).json({
        token,
        user: { id: user.id, name: user.name, email: user.email },
      });
    } catch (e) {
      console.error('Google Sign-In error:', e);
      return res.status(500).json({
        message: 'Server error',
        error: e instanceof Error ? e.message : String(e),
      });
    }
  }
};
