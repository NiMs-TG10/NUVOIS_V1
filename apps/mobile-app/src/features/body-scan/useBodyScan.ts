import { api } from '../../services/api';

export function useBodyScan() {
  const updateBodyScan = async (height: number, bodyShape: string) => {
    const response = await api.put('/api/v1/b2c/profile/body-scan', {
      height,
      bodyShape,
    });
    return response.data;
  };

  return {
    analyze: async () => ({ shape: 'rectangle' }),
    updateBodyScan,
  };
}
