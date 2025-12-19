import { LocalStorageService } from './LocalStorageService';
import { S3StorageService } from './S3StorageService';
import { IStorageService } from './IStorageService';

export const getStorageService = (): IStorageService => {
    if (process.env.NODE_ENV === 'production') {
        return new S3StorageService();
    }
    return new LocalStorageService();
};
