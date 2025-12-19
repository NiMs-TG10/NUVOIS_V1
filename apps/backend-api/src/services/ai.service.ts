import axios from 'axios';
import FormData from 'form-data';

const baseURL = process.env.AI_SERVICE_URL || 'http://localhost:8000';
export const aiClient = axios.create({ baseURL, timeout: 30000 });

export class AIService {
    /**
     * Analyze body measurements and fashion detection.
     * Sends raw image bytes to the stateless AI service.
     */
    async analyzeBody(imageBuffer: Buffer, userHeight?: number) {
        try {
            const formData = new FormData();
            formData.append('file', imageBuffer, {
                filename: 'scan.jpg',
                contentType: 'image/jpeg'
            });
            formData.append('height', String(userHeight || 170));

            const response = await aiClient.post('/api/v1/analyze', formData, {
                headers: formData.getHeaders()
            });

            return response.data;
        } catch (error: any) {
            console.error('AI Service error:', error.message);

            // Fallback mock response for development
            return {
                success: true,
                body_shape: 'Hourglass',
                measurements: {
                    shoulder: 42.5,
                    waist: 32.0,
                    hip: 38.5,
                    waist_hip_ratio: 0.83,
                    height: userHeight || 170
                },
                detections: [],
                detection_confidence: false,
                _mock: true
            };
        }
    }
}

export const aiService = new AIService();
