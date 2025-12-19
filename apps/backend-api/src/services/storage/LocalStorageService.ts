import fs from 'fs';
import path from 'path';
import { Express } from 'express';
import { IStorageService } from './IStorageService';
import { v4 as uuidv4 } from 'uuid';

export class LocalStorageService implements IStorageService {
    private uploadDir = path.join(process.cwd(), 'uploads');

    constructor() {
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }

    async upload(file: Express.Multer.File): Promise<string> {
        const filename = `${uuidv4()}_${file.originalname}`;
        const filepath = path.join(this.uploadDir, filename);

        await fs.promises.writeFile(filepath, file.buffer);

        // In a real scenario, this would return a URL accessible via a static file server
        // For now, returning the absolute path or a local URL if serving static files
        return `http://localhost:${process.env.PORT || 3000}/uploads/${filename}`;
    }
}
