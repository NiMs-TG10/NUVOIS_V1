import { Express } from 'express';
import { IStorageService } from './IStorageService';

export class S3StorageService implements IStorageService {
    constructor() {
        // Initialize AWS S3 Client here
        // this.s3 = new S3Client({ region: process.env.AWS_REGION });
    }

    async upload(file: Express.Multer.File): Promise<string> {
        // Implement S3 upload logic here
        // const command = new PutObjectCommand({ ... });
        // await this.s3.send(command);
        // return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;

        throw new Error('S3 Storage not implemented yet');
    }
}
