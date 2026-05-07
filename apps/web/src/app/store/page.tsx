'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Star, Leaf } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

const PRODUCTS = [
  { id: '1', name: 'عجوة المدينة الفاخرة', slug: 'ajwa-dates', brand: 'إرث', category: 'التمور', price: 250, comparePrice: null, rating: 5.0, reviews: 127, badge: 'الأكثر مبيعاً', image: null },
  { id: '2', name: 'عسل السدر الصافي', slug: 'sidr-honey', brand: 'إرث', category: 'العسل الطبيعي', price: 450, comparePrice: 550, rating: 4.9, reviews: 89, badge: 'عرض خاص', image: null },
  { id: '3', name: 'زيت الحبة السوداء العضوي', slug: 'black-seed-oil', brand: 'إرث', category: 'الزيوت الطبيعية', price: 180, comparePrice: null, rating: 4.8, reviews: 64, badge: null, image: null },
  { id: '4', name: 'مجموعة العافية المتكاملة', slug: 'wellness-bundle', brand: 'إرث', category: 'المجموعات', price: 800, comparePrice: 950, rating: 5.0, reviews: 42, badge: 'حصري', image: null },
];

const CATEGORIES = ['الكل', 'التمور', 'العسل الطبيعي', 'الزيوت الطبيعية'];

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  return (
    <Link href={`/store/product/${product.slug}`} className="group block animate-fade-up">
      <div className="relative aspect-[4/5] arch-container bg-[#151515] overflow-hidden mb-6 transition-all duration-700 border border-[#C8A96A]/10 group-hover:border-[#C8A96A]/30">
        
        {/* Background glow on hover */}
        <div className="absolute inset-0 bg-[#C8A96A]/0 group-hover:bg-[#C8A96A]/5 transition-colors duration-700 z-0"></div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-6 right-1/2 translate-x-1/2 z-10 flex flex-col items-center">
            <span className="text-[#C8A96A] text-[10px] font-bold tracking-widest uppercase bg-[#0D0D0D]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#C8A96A]/30">
              {product.badge}
            </span>
          </div>
        )}

        {/* Product icon placeholder */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="w-24 h-24 rounded-full border border-[#C8A96A]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-700 bg-[#0D0D0D]/50 backdrop-blur-sm">
            <Leaf className="w-8 h-8 text-[#C8A96A]/60" />
          </div>
        </div>

        {/* Quick add */}
        <div className="absolute bottom-6 inset-x-0 px-6 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20">
          <button
            onClick={(e) => { e.preventDefault(); }}
            className="w-full py-3 rounded-full text-sm font-bold text-[#0D0D0D] bg-[#C8A96A] hover:bg-[#dfbd76] transition-all shadow-[0_0_15px_rgba(200,169,106,0.3)]"
          >
            إضافة للسلة
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="text-center space-y-2">
        <p className="text-xs text-[#C8A96A]/70 uppercase tracking-widest font-serif">{product.category}</p>
        <h3 className="text-lg font-serif font-bold text-[#F7F5F0] group-hover:text-[#C8A96A] transition-colors">{product.name}</h3>
        <div className="flex items-center justify-center gap-2">
          <span className="text-base font-bold text-[#C8A96A]">{formatCurrency(product.price)}</span>
          {product.comparePrice && (
            <span className="text-sm text-[#F7F5F0]/40 line-through">{formatCurrency(product.comparePrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function StorePage() {
  const [category, setCategory] = useState('الكل');

  const filtered = category === 'الكل' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center py-20 overflow-hidden">
        {/* Deep dark background with geometric pattern and vignette */}
        <div className="absolute inset-0 bg-[#0D0D0D] z-[-2]"></div>
        <div className="absolute inset-0 bg-pattern-islamic opacity-20 z-[-1] animate-slow-pan"></div>
        <div className="absolute inset-0 vignette-overlay z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center mt-10">
          {/* Main Arch Frame */}
          <div className="relative inline-block mx-auto">
            <div className="absolute inset-0 bg-[#C8A96A]/5 blur-3xl rounded-full"></div>
            <div className="arch-container w-[280px] h-[380px] md:w-[350px] md:h-[480px] border border-[#C8A96A]/30 p-2 mx-auto relative flex flex-col items-center justify-center animate-fade-in bg-[#151515]/40 backdrop-blur-md">
              <div className="arch-container w-full h-full border border-[#C8A96A]/10 flex flex-col items-center justify-center p-8 text-center bg-[#0D0D0D]/60">
                <Leaf className="w-10 h-10 text-[#C8A96A] mb-8 animate-fade-up opacity-80" style={{ animationDelay: '0.2s' }} />
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#C8A96A] mb-4 animate-fade-up leading-tight" style={{ animationDelay: '0.4s' }}>
                  إرث العافية
                </h1>
                <p className="text-sm md:text-base text-[#F7F5F0]/80 font-serif leading-relaxed animate-fade-up max-w-[200px]" style={{ animationDelay: '0.6s' }}>
                  متجذرون في التراث، نصنع منتجاتنا بعناية لتجربة رفاهية حقيقية.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 animate-fade-up" style={{ animationDelay: '0.8s' }}>
            <Link href="#collection" className="luxury-button-primary inline-flex text-sm">
              اكتشف مجموعتنا
            </Link>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-[#151515] py-24 border-y border-[#C8A96A]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-islamic opacity-5 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif text-[#C8A96A] mb-8">حكاية إرث</h2>
          <p className="text-lg md:text-xl text-[#F7F5F0]/80 leading-relaxed font-serif max-w-2xl mx-auto">
            من قلب المدينة المنورة، نستوحي قيمنا ومكوناتنا. نؤمن بأن العافية الحقيقية تبدأ من الطبيعة، لذلك ننتقي أفضل المحاصيل وأجود الخامات لنقدم لك تجربة تفوق الوصف، تمزج بين أصالة الماضي ورقي الحاضر.
          </p>
        </div>
      </section>

      {/* Products Collection */}
      <section id="collection" className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#C8A96A] mb-4">المنتجات الفاخرة</h2>
          <div className="w-24 h-0.5 bg-[#C8A96A]/30 mx-auto"></div>
        </div>

        {/* Filter Bar */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-4 flex-wrap justify-center bg-[#151515] p-2 rounded-full border border-[#C8A96A]/10 shadow-lg">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  'px-6 py-2.5 rounded-full text-sm font-serif transition-all duration-500',
                  category === cat
                    ? 'bg-[#C8A96A] text-[#0D0D0D] font-bold shadow-[0_0_15px_rgba(200,169,106,0.2)]'
                    : 'text-[#F7F5F0]/60 hover:text-[#C8A96A] hover:bg-[#C8A96A]/5'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {filtered.map((product, i) => (
            <div key={product.id} style={{ animationDelay: `${i * 0.1}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-20">
          <Link href="/store" className="luxury-button-outline inline-flex px-10 py-4 text-sm bg-[#151515]">
            عرض جميع المنتجات
          </Link>
        </div>
      </section>
    </div>
  );
}
