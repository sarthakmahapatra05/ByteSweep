import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// File API
export const fileAPI = {
  // Get all files with pagination and filtering
  getFiles: (params) => api.get('/files', { params }),

  // Get file by ID
  getFile: (id) => api.get(`/files/${id}`),

  // Create new file
  createFile: (fileData) => api.post('/files', fileData),

  // Update file
  updateFile: (id, fileData) => api.put(`/files/${id}`, fileData),

  // Delete file
  deleteFile: (id) => api.delete(`/files/${id}`),

  // Get files by category
  getFilesByCategory: (category, params) =>
    api.get(`/files/category/${category}`, { params }),

  // Get large files
  getLargeFiles: (minSize, params) =>
    api.get(`/files/large/${minSize}`, { params }),
};

// System API
export const systemAPI = {
  // Get system statistics
  getStats: () => api.get('/system/stats'),

  // Update system statistics
  updateStats: (statsData) => api.post('/system/stats', statsData),

  // Get disk information
  getDisks: () => api.get('/system/disks'),

  // Update disk information
  updateDisk: (diskData) => api.post('/system/disks', diskData),

  // Get file statistics by category
  getFilesByCategory: () => api.get('/system/files-by-category'),

  // Get file size distribution
  getFileSizeDistribution: () => api.get('/system/file-size-distribution'),

  // Get recent files
  getRecentFiles: (limit) => api.get('/system/recent-files', { params: { limit } }),

  // Get system health
  getHealth: () => api.get('/system/health'),
};

// Cleanup API
export const cleanupAPI = {
  // Clean up temporary files
  cleanupTempFiles: (confirm) => api.post('/cleanup/temp-files', { confirm }),

  // Clean up large files
  cleanupLargeFiles: (fileIds, confirm) =>
    api.post('/cleanup/large-files', { fileIds, confirm }),

  // Clean up duplicate files
  cleanupDuplicateFiles: (fileIds, confirm) =>
    api.post('/cleanup/duplicate-files', { fileIds, confirm }),

  // Bulk cleanup by category
  bulkCleanup: (categories, confirm) =>
    api.post('/cleanup/bulk', { categories, confirm }),

  // Get cleanup preview
  getCleanupPreview: (category, limit) =>
    api.get(`/cleanup/preview/${category}`, { params: { limit } }),

  // Restore deleted files
  restoreFiles: (fileIds) => api.post('/cleanup/restore', { fileIds }),

  // Get cleanup statistics
  getCleanupStats: () => api.get('/cleanup/stats'),
};

// Health check
export const healthAPI = {
  check: () => api.get('/health'),
};

export default api; 