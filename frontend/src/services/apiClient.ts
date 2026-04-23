import { apiClient } from '@/lib/axios';

export const api = {
  get: <T>(url: string, params?: any) => apiClient.get<T>(url, { params }),
  post: <T>(url: string, data?: any, config?: any) => apiClient.post<T>(url, data, config),
  put: <T>(url: string, data?: any) => apiClient.put<T>(url, data),
  delete: <T>(url: string) => apiClient.delete<T>(url),
  patch: <T>(url: string, data?: any) => apiClient.patch<T>(url, data),
};
