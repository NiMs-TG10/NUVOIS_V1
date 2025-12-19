import { Express } from 'express';

export interface IStorageService {
    upload(file: Express.Multer.File): Promise<string>;
}
