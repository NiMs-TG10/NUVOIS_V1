import axios from 'axios';

const baseURL = process.env.AI_SERVICE_URL || 'http://localhost:8000';
export const aiClient = axios.create({ baseURL });
