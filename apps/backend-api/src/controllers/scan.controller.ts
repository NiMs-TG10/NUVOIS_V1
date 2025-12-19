import { Request, Response } from 'express';
import { getStorageService } from '../services/storage';
import { aiService } from '../services/ai.service';
import { fileTypeFromBuffer } from 'file-type';

export class ScanController {
    static async uploadScan(req: Request, res: Response) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            // 0. Security: Validate File Type (Magic Numbers)
            const fileType = await fileTypeFromBuffer(req.file.buffer);
            const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];

            if (!fileType || !allowedMimes.includes(fileType.mime)) {
                return res.status(400).json({ error: 'Invalid file type detected. Please upload a valid image (JPEG, PNG, WebP).' });
            }

            // 1. Upload to Storage (Abstracted)
            const storageService = getStorageService();
            const imageUrl = await storageService.upload(req.file);

            // 2. Call AI Service (Pass buffer directly)
            const userHeight = req.body.height ? parseFloat(req.body.height) : undefined;
            const aiResult = await aiService.analyzeBody(req.file.buffer, userHeight);

            // 3. Save to Database
            // Assuming req.user exists (from auth middleware)
            /*
            if ((req as any).user) {
              // await prisma.user.update({
              //   where: { id: (req as any).user.id },
              //   data: {
              //     bodyShape: aiResult.shape,
              //     scanImageUrl: imageUrl,
              //     measurements: aiResult.measurements as any // Cast for JSON
              //   }
              // });
            }
            */

            // Return Result
            res.json({
                success: true,
                imageUrl,
                analysis: aiResult
            });

        } catch (error) {
            console.error('Scan upload error:', error);
            res.status(500).json({ error: 'Internal server error processing scan' });
        }
    }
}
