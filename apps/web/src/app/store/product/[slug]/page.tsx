'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Star, Minus, Plus, Truck, Shield, RotateCcw, ChevronRight } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

const PRODUCT = {
  id: '1', name: 'Radiance Serum', slug: 'radiance-serum', brand: 'IRTH',
  category: 'Skincare', description: 'Our bestselling vitamin C serum formulated with 15% pure L-ascorbic acid, hyaluronic acid, and vitamin E. Brightens skin, reduces dark spots, and provides powerful antioxidant protection.',
  price: 450, comparePrice: 599, rating: 4.8, reviews: 127,
  features: ['15% Vitamin C (L-Ascorbic Acid)', 'Hyaluronic Acid for deep hydration', 'Vitamin E antioxidant protection', 'Paraben-free & cruelty-free', 'Suitable for all skin types'],
  variants: [
    { id: 'v1', name: '30ml', sku: 'RAD-SER-30ML', price: 450, stock: 100 },
    { id: 'v2', name: '50ml', sku: 'RAD-SER-50ML', price: 650, stock: 50 },
  ],
  ingredients: 'Aqua, Ascorbic Acid, Sodium Hyaluronate, Tocopheryl Acetate, Ferulic Acid, Glycerin, Panthenol',
};

export default function ProductDetailPage() {
  const [selectedVariant, setSelectedVariant] = useState(PRODUCT.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'reviews'>('description');

  const discount = PRODUCT.comparePrice
    ? Math.round(((PRODUCT.comparePrice - selectedVariant.price) / PRODUCT.comparePrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/store" className="hover:text-foreground transition-colors">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/store" className="hover:text-foreground transition-colors">{PRODUCT.category}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground">{PRODUCT.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4 animate-fade-up">
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-border flex items-center justify-center overflow-hidden">
            <div className="w-48 h-48 rounded-3xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
              <ShoppingBag className="w-20 h-20 text-purple-500/30" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={cn(
                'aspect-square rounded-xl bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border flex items-center justify-center cursor-pointer transition-all',
                i === 1 ? 'border-purple-500' : 'border-border hover:border-purple-500/30'
              )}>
                <ShoppingBag className="w-6 h-6 text-purple-500/20" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-sm text-purple-500 font-medium uppercase tracking-wider mb-2">{PRODUCT.brand}</p>
          <h1 className="text-3xl font-bold tracking-tight mb-3">{PRODUCT.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn('w-4 h-4', i < Math.floor(PRODUCT.rating) ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground/30')} />
              ))}
            </div>
            <span className="text-sm font-medium">{PRODUCT.rating}</span>
            <span className="text-sm text-muted-foreground">({PRODUCT.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl font-bold">{formatCurrency(selectedVariant.price)}</span>
            {PRODUCT.comparePrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatCurrency(PRODUCT.comparePrice)}</span>
                <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold">-{discount}%</span>
              </>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8">{PRODUCT.description}</p>

          {/* Variant Selector */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3">Size</p>
            <div className="flex gap-3">
              {PRODUCT.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={cn(
                    'px-6 py-3 rounded-xl text-sm font-semibold border transition-all',
                    selectedVariant.id === v.id
                      ? 'border-purple-500 bg-purple-500/10 text-purple-500'
                      : 'border-border hover:border-purple-500/30'
                  )}
                >
                  {v.name}
                  <span className="block text-xs mt-0.5 font-normal text-muted-foreground">{formatCurrency(v.price)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center border border-border rounded-xl">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-accent transition-colors rounded-l-xl">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-5 py-3 text-sm font-semibold min-w-[50px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-accent transition-colors rounded-r-xl">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white gradient-primary hover:opacity-90 transition-all shadow-lg shadow-purple-500/25">
              <ShoppingBag className="w-4 h-4" />
              Add to Cart — {formatCurrency(selectedVariant.price * quantity)}
            </button>
            <button className="p-3.5 rounded-xl border border-border hover:bg-accent transition-colors">
              <Heart className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
            {[
              { icon: Truck, label: 'Free Shipping', desc: 'Over 500 EGP' },
              { icon: Shield, label: '100% Authentic', desc: 'Guaranteed' },
              { icon: RotateCcw, label: 'Easy Returns', desc: '14-day policy' },
            ].map((badge) => (
              <div key={badge.label} className="text-center">
                <badge.icon className="w-5 h-5 mx-auto mb-2 text-purple-500" />
                <p className="text-xs font-semibold">{badge.label}</p>
                <p className="text-[10px] text-muted-foreground">{badge.desc}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="flex gap-1 p-1 bg-muted/50 rounded-xl mb-6">
              {(['description', 'ingredients', 'reviews'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all capitalize',
                    activeTab === tab ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'description' && (
              <ul className="space-y-2.5">
                {PRODUCT.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'ingredients' && (
              <p className="text-sm text-muted-foreground leading-relaxed">{PRODUCT.ingredients}</p>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-8 text-muted-foreground">
                <Star className="w-8 h-8 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Reviews coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
