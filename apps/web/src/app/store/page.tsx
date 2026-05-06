'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Star, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

const PRODUCTS = [
  { id: '1', name: 'Radiance Serum', slug: 'radiance-serum', brand: 'IRTH', category: 'Skincare', price: 450, comparePrice: 599, rating: 4.8, reviews: 127, badge: 'Bestseller', image: null },
  { id: '2', name: 'Hydra Moisturizer', slug: 'hydra-moisturizer', brand: 'IRTH', category: 'Skincare', price: 350, comparePrice: 450, rating: 4.7, reviews: 89, badge: null, image: null },
  { id: '3', name: 'Deep Cleansing Gel', slug: 'deep-cleansing-gel', brand: 'IRTH', category: 'Skincare', price: 280, comparePrice: null, rating: 4.5, reviews: 64, badge: 'New', image: null },
  { id: '4', name: 'Hair Growth Oil', slug: 'hair-growth-oil', brand: 'IRTH', category: 'Haircare', price: 320, comparePrice: null, rating: 4.6, reviews: 42, badge: null, image: null },
  { id: '5', name: 'Vitamin C Toner', slug: 'vitamin-c-toner', brand: 'IRTH', category: 'Skincare', price: 220, comparePrice: 299, rating: 4.9, reviews: 156, badge: 'Top Rated', image: null },
  { id: '6', name: 'Body Lotion Luxe', slug: 'body-lotion-luxe', brand: 'IRTH', category: 'Body Care', price: 190, comparePrice: null, rating: 4.4, reviews: 38, badge: null, image: null },
  { id: '7', name: 'Anti-Aging Night Cream', slug: 'anti-aging-cream', brand: 'IRTH', category: 'Skincare', price: 520, comparePrice: 699, rating: 4.8, reviews: 93, badge: 'Sale', image: null },
  { id: '8', name: 'Scalp Treatment Serum', slug: 'scalp-treatment', brand: 'IRTH', category: 'Haircare', price: 380, comparePrice: null, rating: 4.3, reviews: 27, badge: null, image: null },
];

const CATEGORIES = ['All', 'Skincare', 'Haircare', 'Body Care'];

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const discount = product.comparePrice ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100) : 0;

  return (
    <Link href={`/store/product/${product.slug}`} className="group animate-fade-up">
      <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border border-border overflow-hidden mb-4 transition-all group-hover:border-purple-500/30 group-hover:shadow-lg group-hover:shadow-purple-500/5">
        {/* Badge */}
        {product.badge && (
          <span className={cn(
            'absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider z-10',
            product.badge === 'Sale' ? 'bg-red-500 text-white' :
            product.badge === 'Bestseller' ? 'bg-purple-600 text-white' :
            product.badge === 'New' ? 'bg-emerald-500 text-white' :
            'bg-amber-500 text-white'
          )}>
            {product.badge}
          </span>
        )}

        {/* Discount badge */}
        {discount > 0 && !product.badge && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500 text-white z-10">
            -{discount}%
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-background z-10"
        >
          <Heart className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Product image placeholder */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <ShoppingBag className="w-10 h-10 text-purple-500/40" />
          </div>
        </div>

        {/* Quick add */}
        <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => { e.preventDefault(); }}
            className="w-full py-2.5 rounded-xl text-sm font-semibold text-white gradient-primary hover:opacity-90 transition-all shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1.5">
        <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">{product.category}</p>
        <h3 className="text-sm font-semibold group-hover:text-purple-500 transition-colors">{product.name}</h3>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold">{formatCurrency(product.price)}</span>
          {product.comparePrice && (
            <span className="text-sm text-muted-foreground line-through">{formatCurrency(product.comparePrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function StorePage() {
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('popular');

  const filtered = category === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-950/50 via-background to-indigo-950/30 py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 animate-fade-up">
            Discover Your <span className="gradient-text">Glow</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Premium skincare crafted with the finest ingredients for radiant, healthy skin.
          </p>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all border',
                  category === cat
                    ? 'bg-foreground text-background border-foreground'
                    : 'border-border hover:bg-accent text-muted-foreground hover:text-foreground'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm bg-transparent border-none outline-none cursor-pointer text-muted-foreground"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">{filtered.length} products</p>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {filtered.map((product, i) => (
            <div key={product.id} style={{ animationDelay: `${i * 0.05}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
