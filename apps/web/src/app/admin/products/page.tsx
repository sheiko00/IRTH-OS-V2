'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, MoreVertical, Eye, Edit, Trash2, Package, Star } from 'lucide-react';
import { cn, formatCurrency, getStatusColor } from '@/lib/utils';

interface Product {
  id: string;
  name: string;
  slug: string;
  brand?: string;
  status: string;
  basePrice: number;
  comparePrice?: number;
  coverImageUrl?: string;
  isFeatured: boolean;
  category?: { name: string };
  variants: { id: string; sku: string; stockQuantity: number }[];
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    // Mock data for demo
    setTimeout(() => {
      setProducts([
        { id: '1', name: 'Radiance Serum', slug: 'radiance-serum', brand: 'IRTH', status: 'ACTIVE', basePrice: 450, comparePrice: 599, isFeatured: true, category: { name: 'Skincare' }, variants: [{ id: '1', sku: 'RAD-SER-30ML', stockQuantity: 100 }, { id: '2', sku: 'RAD-SER-50ML', stockQuantity: 50 }], createdAt: '2026-04-20' },
        { id: '2', name: 'Hydra Moisturizer', slug: 'hydra-cream', brand: 'IRTH', status: 'ACTIVE', basePrice: 350, comparePrice: 450, isFeatured: true, category: { name: 'Skincare' }, variants: [{ id: '3', sku: 'HYD-CRM-50ML', stockQuantity: 75 }], createdAt: '2026-04-18' },
        { id: '3', name: 'Deep Cleansing Gel', slug: 'deep-cleansing-gel', brand: 'IRTH', status: 'ACTIVE', basePrice: 280, isFeatured: false, category: { name: 'Skincare' }, variants: [{ id: '4', sku: 'CLN-GEL-150ML', stockQuantity: 200 }], createdAt: '2026-04-15' },
        { id: '4', name: 'Hair Growth Oil', slug: 'hair-growth-oil', brand: 'IRTH', status: 'DRAFT', basePrice: 320, isFeatured: false, category: { name: 'Haircare' }, variants: [{ id: '5', sku: 'HGO-100ML', stockQuantity: 0 }], createdAt: '2026-04-10' },
        { id: '5', name: 'Vitamin C Toner', slug: 'vitamin-c-toner', brand: 'IRTH', status: 'ACTIVE', basePrice: 220, comparePrice: 299, isFeatured: false, category: { name: 'Skincare' }, variants: [{ id: '6', sku: 'VCT-200ML', stockQuantity: 180 }], createdAt: '2026-04-08' },
        { id: '6', name: 'Body Lotion Luxe', slug: 'body-lotion-luxe', brand: 'IRTH', status: 'ARCHIVED', basePrice: 190, isFeatured: false, category: { name: 'Body Care' }, variants: [{ id: '7', sku: 'BLL-250ML', stockQuantity: 12 }], createdAt: '2026-03-15' },
      ]);
      setLoading(false);
    }, 400);
  }, []);

  const totalStock = (p: Product) => p.variants.reduce((s, v) => s + v.stockQuantity, 0);

  const filtered = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter && p.status !== statusFilter) return false;
    return true;
  });

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />
        <div className="h-12 bg-muted rounded-xl animate-pulse" />
        {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">{products.length} products • {products.reduce((s, p) => s + totalStock(p), 0)} total units in stock</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-xl gradient-primary hover:opacity-90 transition-all shadow-lg shadow-purple-500/25"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-2">
          {['', 'ACTIVE', 'DRAFT', 'ARCHIVED'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                'px-4 py-2.5 rounded-xl text-sm font-medium transition-all border',
                statusFilter === s ? 'bg-primary text-primary-foreground border-primary' : 'border-border hover:bg-accent'
              )}
            >
              {s || 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Product</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Category</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Price</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Stock</th>
                <th className="text-left text-xs font-semibold text-muted-foreground p-4">Status</th>
                <th className="text-right text-xs font-semibold text-muted-foreground p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-border flex items-center justify-center flex-shrink-0">
                        {product.coverImageUrl ? (
                          <img src={product.coverImageUrl} alt="" className="w-full h-full object-cover rounded-xl" />
                        ) : (
                          <Package className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold">{product.name}</p>
                          {product.isFeatured && <Star className="w-3 h-3 text-amber-500 fill-amber-500" />}
                        </div>
                        <p className="text-xs text-muted-foreground">{product.variants.length} variant{product.variants.length > 1 ? 's' : ''} • {product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{product.category?.name || '—'}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-sm font-semibold">{formatCurrency(product.basePrice)}</p>
                      {product.comparePrice && (
                        <p className="text-xs text-muted-foreground line-through">{formatCurrency(product.comparePrice)}</p>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={cn('text-sm font-medium', totalStock(product) <= 10 ? 'text-red-500' : totalStock(product) <= 30 ? 'text-amber-500' : '')}>
                      {totalStock(product)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={cn('inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border', getStatusColor(product.status))}>
                      {product.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/products/${product.id}`} className="p-2 rounded-lg hover:bg-accent transition-colors" title="View">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </Link>
                      <Link href={`/admin/products/${product.id}/edit`} className="p-2 rounded-lg hover:bg-accent transition-colors" title="Edit">
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </Link>
                      <button className="p-2 rounded-lg hover:bg-destructive/10 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4 text-destructive/70" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Package className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}
