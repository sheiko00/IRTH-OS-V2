'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Star, Minus, Plus, Truck, Shield, RotateCcw, ChevronLeft, Leaf } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

const PRODUCT = {
  id: '1', name: 'عسل السدر الصافي', slug: 'sidr-honey', brand: 'إرث',
  category: 'العسل الطبيعي', description: 'عسل سدر طبيعي ١٠٠٪، مستخلص بعناية من أودية المدينة المنورة. يتميز بفوائد صحية فريدة ومذاق غني يعكس أصالة الطبيعة.',
  price: 450, comparePrice: 550, rating: 4.9, reviews: 89,
  features: ['مستخلص من بيئة نقية', 'خالي من الإضافات الصناعية', 'غني بمضادات الأكسدة', 'تغليف زجاجي فاخر ومستدام'],
  variants: [
    { id: 'v1', name: '٢٥٠ جرام', sku: 'HONEY-250', price: 250, stock: 100 },
    { id: 'v2', name: '٥٠٠ جرام', sku: 'HONEY-500', price: 450, stock: 50 },
  ],
  ingredients: 'عسل سدر طبيعي نقي ١٠٠٪، خالي من أي إضافات.',
};

export default function ProductDetailPage() {
  const [selectedVariant, setSelectedVariant] = useState(PRODUCT.variants[1]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'reviews'>('description');

  const discount = PRODUCT.comparePrice
    ? Math.round(((PRODUCT.comparePrice - selectedVariant.price) / PRODUCT.comparePrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#F7F5F0]/60 mb-12 font-serif">
        <Link href="/store" className="hover:text-[#C8A96A] transition-colors">المتجر</Link>
        <ChevronLeft className="w-3 h-3" />
        <Link href="/store" className="hover:text-[#C8A96A] transition-colors">{PRODUCT.category}</Link>
        <ChevronLeft className="w-3 h-3" />
        <span className="text-[#C8A96A]">{PRODUCT.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Images */}
        <div className="space-y-6 animate-fade-up">
          <div className="aspect-[4/5] arch-container bg-[#151515] border border-[#C8A96A]/20 flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-pattern-islamic opacity-10 pointer-events-none"></div>
            <div className="w-48 h-48 rounded-full border border-[#C8A96A]/30 flex items-center justify-center bg-[#0D0D0D]/60 backdrop-blur-sm z-10">
              <Leaf className="w-20 h-20 text-[#C8A96A]/60" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={cn(
                'aspect-square rounded-xl bg-[#151515] border flex items-center justify-center cursor-pointer transition-all duration-500',
                i === 1 ? 'border-[#C8A96A]' : 'border-[#C8A96A]/10 hover:border-[#C8A96A]/40'
              )}>
                <Leaf className="w-6 h-6 text-[#C8A96A]/30" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="animate-fade-up flex flex-col justify-center" style={{ animationDelay: '0.1s' }}>
          <p className="text-sm text-[#C8A96A] font-serif tracking-widest mb-3">{PRODUCT.brand}</p>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold tracking-tight mb-4 text-[#F7F5F0]">{PRODUCT.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn('w-4 h-4', i < Math.floor(PRODUCT.rating) ? 'text-[#C8A96A] fill-[#C8A96A]' : 'text-[#C8A96A]/20')} />
              ))}
            </div>
            <span className="text-sm font-medium text-[#F7F5F0]">{PRODUCT.rating}</span>
            <span className="text-sm text-[#F7F5F0]/50">({PRODUCT.reviews} تقييم)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl font-serif font-bold text-[#C8A96A]">{formatCurrency(selectedVariant.price)}</span>
            {PRODUCT.comparePrice && (
              <>
                <span className="text-xl text-[#F7F5F0]/40 line-through">{formatCurrency(PRODUCT.comparePrice)}</span>
                <span className="px-3 py-1 rounded-full bg-[#C8A96A]/10 border border-[#C8A96A]/30 text-[#C8A96A] text-xs font-bold tracking-widest">
                  وفر {discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-[#F7F5F0]/80 leading-relaxed font-serif mb-10 text-lg">{PRODUCT.description}</p>

          {/* Variant Selector */}
          <div className="mb-10">
            <p className="text-sm font-serif mb-4 text-[#F7F5F0]/70">الحجم</p>
            <div className="flex gap-4">
              {PRODUCT.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={cn(
                    'px-8 py-3 rounded-xl text-sm font-serif transition-all duration-500 border',
                    selectedVariant.id === v.id
                      ? 'border-[#C8A96A] bg-[#C8A96A]/10 text-[#C8A96A] shadow-[0_0_15px_rgba(200,169,106,0.15)]'
                      : 'border-[#C8A96A]/20 hover:border-[#C8A96A]/50 text-[#F7F5F0]/70'
                  )}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex items-center border border-[#C8A96A]/30 rounded-full bg-[#151515]">
              <button onClick={() => setQuantity(quantity + 1)} className="px-5 py-4 hover:bg-[#C8A96A]/10 transition-colors rounded-r-full text-[#C8A96A]">
                <Plus className="w-4 h-4" />
              </button>
              <span className="px-4 py-4 text-sm font-semibold min-w-[50px] text-center text-[#F7F5F0]">{quantity}</span>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-5 py-4 hover:bg-[#C8A96A]/10 transition-colors rounded-l-full text-[#C8A96A]">
                <Minus className="w-4 h-4" />
              </button>
            </div>
            <button className="flex-1 luxury-button-primary py-4 text-base">
              <ShoppingBag className="w-5 h-5 ml-2" />
              إضافة للسلة — {formatCurrency(selectedVariant.price * quantity)}
            </button>
            <button className="p-4 rounded-full border border-[#C8A96A]/30 hover:bg-[#C8A96A]/10 transition-colors group">
              <Heart className="w-6 h-6 text-[#F7F5F0]/60 group-hover:text-[#C8A96A]" />
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-6 py-8 border-y border-[#C8A96A]/10">
            {[
              { icon: Truck, label: 'شحن مجاني', desc: 'للطلبات فوق ٥٠٠ جنيه' },
              { icon: Shield, label: 'جودة مضمونة', desc: 'نقي ١٠٠٪' },
              { icon: RotateCcw, label: 'استرجاع سهل', desc: 'خلال ١٤ يوم' },
            ].map((badge) => (
              <div key={badge.label} className="text-center">
                <badge.icon className="w-6 h-6 mx-auto mb-3 text-[#C8A96A]" />
                <p className="text-sm font-serif font-bold text-[#F7F5F0] mb-1">{badge.label}</p>
                <p className="text-xs text-[#F7F5F0]/50 font-serif">{badge.desc}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <div className="flex gap-2 p-1 bg-[#151515] rounded-xl mb-8 border border-[#C8A96A]/10">
              {([
                { id: 'description', label: 'المميزات' },
                { id: 'ingredients', label: 'المكونات' },
                { id: 'reviews', label: 'التقييمات' }
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    'flex-1 px-4 py-3 rounded-lg text-sm font-serif transition-all duration-500',
                    activeTab === tab.id ? 'bg-[#0D0D0D] text-[#C8A96A] border border-[#C8A96A]/20 shadow-md' : 'text-[#F7F5F0]/60 hover:text-[#C8A96A]'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'description' && (
              <ul className="space-y-4">
                {PRODUCT.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-base text-[#F7F5F0]/80 font-serif">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C8A96A] mt-2.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'ingredients' && (
              <p className="text-base text-[#F7F5F0]/80 leading-relaxed font-serif">{PRODUCT.ingredients}</p>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-12 border border-[#C8A96A]/10 rounded-2xl bg-[#151515]">
                <Star className="w-10 h-10 mx-auto mb-4 text-[#C8A96A]/30" />
                <p className="text-[#F7F5F0]/60 font-serif">لا توجد تقييمات بعد</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
