import { api } from './api';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'nuvois-jwt';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export const authService = {
  /**
   * Sign up with email and password
   */
  signUp: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/api/v1/b2c/auth/signup', {
      name,
      email,
      password,
    });
    
    const { token, user } = response.data;
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    
    return { token, user };
  },

  /**
   * Login with email and password
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/api/v1/b2c/auth/login', {
      email,
      password,
    });
    
    const { token, user } = response.data;
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    
    return { token, user };
  },

  /**
   * Sign in with Google
   */
  googleSignIn: async (idToken: string): Promise<AuthResponse> => {
    const response = await api.post('/api/v1/b2c/auth/google', {
      idToken,
    });
    
    const { token, user } = response.data;
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    
    return { token, user };
  },

  /**
   * Logout and clear token
   */
  logout: async (): Promise<void> => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },

  /**
   * Get stored token
   */
  getToken: async (): Promise<string | null> => {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: async (): Promise<boolean> => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    return !!token;
  },
};
