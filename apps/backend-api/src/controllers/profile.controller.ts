import { Request, Response } from 'express';
import { aiClient } from '../services/ai.service.js';
import { prisma } from '../services/db.service.js';

export async function analyzeBody(req: Request, res: Response) {
  try {
    const response = await aiClient.post('/analyze-body', {});
    return res.json(response.data);
  } catch (e) {
    return res.status(500).json({ error: 'AI service error' });
  }
}

export async function updateBodyScan(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { height, bodyShape } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Validate inputs
    if (height !== undefined && (typeof height !== 'number' || height <= 0)) {
      return res.status(400).json({ message: 'Height must be a positive number' });
    }

    const validBodyShapes = ['rectangle', 'triangle', 'inverted-triangle', 'hourglass', 'oval'];
    if (bodyShape !== undefined && !validBodyShapes.includes(bodyShape)) {
      return res.status(400).json({ message: `Body shape must be one of: ${validBodyShapes.join(', ')}` });
    }

    // Update user body scan data
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(height !== undefined && { height }),
        ...(bodyShape !== undefined && { bodyShape }),
      },
    });

    return res.json({
      message: 'Body scan data updated successfully',
      user: {
        id: updatedUser.id,
        height: updatedUser.height,
        bodyShape: updatedUser.bodyShape,
      },
    });
  } catch (e) {
    console.error('Update body scan error:', e);
    return res.status(500).json({ message: 'Server error', error: e instanceof Error ? e.message : String(e) });
  }
}
