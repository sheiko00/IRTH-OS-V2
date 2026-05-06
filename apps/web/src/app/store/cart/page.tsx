'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, Package } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

interface CartItem {
  id: string;
  product: { name: string; slug: string };
  variant: { name: string; sku: string };
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([
    { id: '1', product: { name: 'Radiance Serum', slug: 'radiance-serum' }, variant: { name: '30ml', sku: 'RAD-SER-30ML' }, price: 450, quantity: 2 },
    { id: '2', product: { name: 'Vitamin C Toner', slug: 'vitamin-c-toner' }, variant: { name: '200ml', sku: 'VCT-200ML' }, price: 220, quantity: 1 },
  ]);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQty = (id: string, delta: number) => {
    setItems(items.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };
  const removeItem = (id: string) => setItems(items.filter(i => i.id !== id));

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.25) : 0;
  const shipping = subtotal >= 500 ? 0 : 60;
  const total = subtotal - discount + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center animate-fade-up">
        <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground/30" />
        <h1 className="text-2xl font-bold mb-3">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven&apos;t added any products yet.</p>
        <Link href="/store" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white gradient-primary hover:opacity-90 shadow-lg shadow-purple-500/25">
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold tracking-tight mb-8 animate-fade-up">Shopping Cart ({items.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4 animate-fade-up">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 rounded-2xl border border-border bg-card">
              {/* Image */}
              <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-border flex items-center justify-center flex-shrink-0">
                <Package className="w-8 h-8 text-purple-500/30" />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link href={`/store/product/${item.product.slug}`} className="text-sm font-semibold hover:text-purple-500 transition-colors">
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.variant.name} • {item.variant.sku}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors">
                    <Trash2 className="w-4 h-4 text-destructive/60" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button onClick={() => updateQty(item.id, -1)} className="px-3 py-1.5 hover:bg-accent transition-colors rounded-l-lg">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 py-1.5 text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="px-3 py-1.5 hover:bg-accent transition-colors rounded-r-lg">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-sm font-bold">{formatCurrency(item.price * item.quantity)}</p>
                </div>
              </div>
            </div>
          ))}

          <Link href="/store" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mt-4">
            ← Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="p-6 rounded-2xl border border-border bg-card sticky top-24">
            <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

            {/* Promo Code */}
            <div className="mb-6">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <button
                  onClick={() => { if (promoCode === 'IRTH25') setPromoApplied(true); }}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium border border-border hover:bg-accent transition-colors"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-xs text-green-500 mt-2 font-medium">✓ IRTH25 applied — 25% off!</p>
              )}
            </div>

            {/* Totals */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span>Discount (25%)</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className={cn('font-medium', shipping === 0 && 'text-green-500')}>
                  {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                </span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">{formatCurrency(total)}</span>
              </div>
            </div>

            <Link
              href="/store/checkout"
              className="w-full flex items-center justify-center gap-2 mt-6 py-3.5 rounded-xl text-sm font-semibold text-white gradient-primary hover:opacity-90 transition-all shadow-lg shadow-purple-500/25"
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </Link>

            {shipping > 0 && (
              <p className="text-[11px] text-muted-foreground text-center mt-4">
                Add {formatCurrency(500 - subtotal)} more for free shipping
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
