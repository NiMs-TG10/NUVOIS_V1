import { api } from './api';

export interface BodyScanData {
  height: number;
  bodyShape: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bodyShape?: string;
  height?: number;
  shoulder?: number;
  bust?: number;
  waist?: number;
  hips?: number;
}

export const profileService = {
  /**
   * Get user profile (requires authentication)
   */
  getProfile: async (): Promise<UserProfile> => {
    const response = await api.get('/api/v1/b2c/profile');
    return response.data;
  },

  /**
   * Update body scan data (requires authentication)
   */
  updateBodyScan: async (data: BodyScanData): Promise<void> => {
    await api.put('/api/v1/b2c/profile/body-scan', data);
  },

  /**
   * Analyze body from image (requires authentication)
   */
  analyzeBody: async (imageData: FormData): Promise<any> => {
    const response = await api.post('/api/v1/b2c/profile/analyze-body', imageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
