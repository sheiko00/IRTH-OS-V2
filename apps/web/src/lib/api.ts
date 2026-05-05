const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

interface FetchOptions extends RequestInit {
  token?: string;
}

async function fetchApi(endpoint: string, options: FetchOptions = {}) {
  const { token, ...fetchOptions } = options;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Auth
  login: (data: { email: string; password: string }) =>
    fetchApi('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  register: (data: { email: string; password: string; name: string }) =>
    fetchApi('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  refresh: (refreshToken: string) =>
    fetchApi('/auth/refresh', { method: 'POST', body: JSON.stringify({ refreshToken }) }),

  // Users
  getProfile: (token: string) => fetchApi('/users/me', { token }),
  getUsers: (token: string, page = 1) => fetchApi(`/users?page=${page}`, { token }),

  // Products
  getProducts: (params?: string) => fetchApi(`/products${params ? `?${params}` : ''}`),
  getProduct: (slug: string) => fetchApi(`/products/${slug}`),
  createProduct: (data: any, token: string) =>
    fetchApi('/products', { method: 'POST', body: JSON.stringify(data), token }),
  updateProduct: (id: string, data: any, token: string) =>
    fetchApi(`/products/${id}`, { method: 'PATCH', body: JSON.stringify(data), token }),
  deleteProduct: (id: string, token: string) =>
    fetchApi(`/products/${id}`, { method: 'DELETE', token }),
  getCategories: () => fetchApi('/products/categories'),

  // Orders
  getOrders: (token: string, params?: string) => fetchApi(`/orders${params ? `?${params}` : ''}`, { token }),
  getOrder: (id: string, token: string) => fetchApi(`/orders/${id}`, { token }),
  createOrder: (data: any, token: string) =>
    fetchApi('/orders', { method: 'POST', body: JSON.stringify(data), token }),
  updateOrderStatus: (id: string, status: string, token: string, notes?: string) =>
    fetchApi(`/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status, notes }), token }),

  // Cart
  getCart: (sessionId?: string) =>
    fetchApi('/cart', { headers: sessionId ? { 'x-session-id': sessionId } as any : {} }),
  addToCart: (data: any, sessionId?: string) =>
    fetchApi('/cart/items', { method: 'POST', body: JSON.stringify(data), headers: sessionId ? { 'x-session-id': sessionId } as any : {} }),

  // Analytics
  getAnalyticsOverview: (token: string) => fetchApi('/analytics/overview', { token }),
  getSalesData: (token: string, dateFrom?: string, dateTo?: string) => {
    let params = '';
    if (dateFrom) params += `dateFrom=${dateFrom}&`;
    if (dateTo) params += `dateTo=${dateTo}`;
    return fetchApi(`/analytics/sales?${params}`, { token });
  },
  getTopProducts: (token: string) => fetchApi('/analytics/products/top', { token }),

  // Suppliers
  getSuppliers: (token: string, page = 1) => fetchApi(`/suppliers?page=${page}`, { token }),
  getSupplier: (id: string, token: string) => fetchApi(`/suppliers/${id}`, { token }),

  // Inventory
  getInventory: (token: string, page = 1) => fetchApi(`/inventory?page=${page}`, { token }),
  getLowStockAlerts: (token: string) => fetchApi('/inventory/alerts', { token }),

  // Marketing
  getCampaigns: (token: string) => fetchApi('/marketing/campaigns', { token }),
  getCoupons: (token: string) => fetchApi('/marketing/coupons', { token }),
  validateCoupon: (code: string, orderTotal: number) =>
    fetchApi('/marketing/coupons/validate', { method: 'POST', body: JSON.stringify({ code, orderTotal }) }),

  // Shipping
  trackShipment: (trackingNumber: string) => fetchApi(`/shipping/track/${trackingNumber}`),

  // Notifications
  getNotifications: (token: string) => fetchApi('/notifications', { token }),
  markNotificationRead: (id: string, token: string) =>
    fetchApi(`/notifications/${id}/read`, { method: 'PATCH', token }),

  // Files
  getFiles: (token: string, params?: string) => fetchApi(`/files${params ? `?${params}` : ''}`, { token }),
  getFolders: (token: string) => fetchApi('/files/folders', { token }),

  // Roles
  getRoles: (token: string) => fetchApi('/roles', { token }),
};
