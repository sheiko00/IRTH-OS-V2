// ─── User Types ─────────────────────────────────
export interface UserPayload {
  sub: string;
  email: string;
  role?: string;
  type: 'admin' | 'customer' | 'supplier';
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: { name: string; permissions: string[] };
}

// ─── Product Types ──────────────────────────────
export type ProductStatus = 'DRAFT' | 'ACTIVE' | 'ARCHIVED';

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand?: string;
  categoryId?: string;
  description?: string;
  status: ProductStatus;
  basePrice: number;
  comparePrice?: number;
  coverImageUrl?: string;
  galleryUrls: string[];
  tags: string[];
  isFeatured: boolean;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  sku: string;
  name?: string;
  attributes: Record<string, any>;
  price?: number;
  stockQuantity: number;
  imageUrl?: string;
}

// ─── Order Types ────────────────────────────────
export type OrderStatus =
  'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'IN_PRODUCTION' |
  'READY' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED' | 'REFUNDED';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  total: number;
}

// ─── Pagination ─────────────────────────────────
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ─── API Response ───────────────────────────────
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user?: User;
}

// ─── Permission Constants ───────────────────────
export const PERMISSIONS = {
  // Users
  VIEW_USERS: 'VIEW_USERS',
  CREATE_USER: 'CREATE_USER',
  EDIT_USER: 'EDIT_USER',
  DELETE_USER: 'DELETE_USER',
  MANAGE_ROLES: 'MANAGE_ROLES',
  // Products
  VIEW_PRODUCTS: 'VIEW_PRODUCTS',
  CREATE_PRODUCT: 'CREATE_PRODUCT',
  EDIT_PRODUCT: 'EDIT_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  // Orders
  VIEW_ORDERS: 'VIEW_ORDERS',
  CREATE_ORDER: 'CREATE_ORDER',
  EDIT_ORDER: 'EDIT_ORDER',
  DELETE_ORDER: 'DELETE_ORDER',
  MANAGE_ORDER_STATUS: 'MANAGE_ORDER_STATUS',
  // Suppliers
  VIEW_SUPPLIERS: 'VIEW_SUPPLIERS',
  CREATE_SUPPLIER: 'CREATE_SUPPLIER',
  EDIT_SUPPLIER: 'EDIT_SUPPLIER',
  DELETE_SUPPLIER: 'DELETE_SUPPLIER',
  // Inventory
  VIEW_INVENTORY: 'VIEW_INVENTORY',
  MANAGE_INVENTORY: 'MANAGE_INVENTORY',
  // Shipping
  VIEW_SHIPPING: 'VIEW_SHIPPING',
  MANAGE_SHIPPING: 'MANAGE_SHIPPING',
  // Marketing
  VIEW_MARKETING: 'VIEW_MARKETING',
  CREATE_CAMPAIGN: 'CREATE_CAMPAIGN',
  EDIT_CAMPAIGN: 'EDIT_CAMPAIGN',
  MANAGE_COUPONS: 'MANAGE_COUPONS',
  // Files
  VIEW_FILES: 'VIEW_FILES',
  UPLOAD_FILES: 'UPLOAD_FILES',
  DELETE_FILES: 'DELETE_FILES',
  // Analytics
  VIEW_ANALYTICS: 'VIEW_ANALYTICS',
  // Settings
  MANAGE_SETTINGS: 'MANAGE_SETTINGS',
  // Wildcard
  ALL: '*',
} as const;
