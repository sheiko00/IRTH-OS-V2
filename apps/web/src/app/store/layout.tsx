'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, Menu, X, Heart, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cartCount] = useState(2);
  const pathname = usePathname();

  const navLinks = [
    { href: '/store', label: 'المتجر' },
    { href: '/store/collections', label: 'المجموعات' },
    { href: '/store/about', label: 'قصتنا' },
    { href: '/store/contact', label: 'تواصل معنا' },
  ];

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative">
      {/* Announcement Bar */}
      <div className="bg-[#244F3A] text-[#F7F5F0] text-center text-xs py-2.5 font-medium tracking-widest font-serif border-b border-[#C8A96A]/20">
        شحن مجاني للطلبات فوق ٥٠٠ جنيه — استخدم الكود <span className="text-[#C8A96A]">IRTH25</span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#C8A96A]/10 bg-[#0D0D0D]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu toggle */}
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden p-2 text-[#F7F5F0]">
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/store" className="flex items-center gap-3">
              <span className="text-3xl font-serif font-bold text-[#C8A96A] tracking-wider">إرث</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-all duration-500 hover:text-[#C8A96A]',
                    pathname === link.href ? 'text-[#C8A96A]' : 'text-[#F7F5F0]/70'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-[#C8A96A]/10 transition-colors hidden sm:flex text-[#F7F5F0]">
                <Search className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-full hover:bg-[#C8A96A]/10 transition-colors hidden sm:flex text-[#F7F5F0]">
                <Heart className="w-5 h-5" />
              </button>
              <Link href="/store/cart" className="relative p-2 rounded-full hover:bg-[#C8A96A]/10 transition-colors text-[#F7F5F0]">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#C8A96A] text-[#0D0D0D] text-[10px] font-bold rounded-full flex items-center justify-center min-w-[20px] h-[20px]">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/auth/login" className="p-2 rounded-full hover:bg-[#C8A96A]/10 transition-colors text-[#F7F5F0]">
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenu && (
          <div className="lg:hidden border-t border-[#C8A96A]/10 bg-[#151515] animate-fade-down">
            <nav className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenu(false)}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href ? 'bg-[#C8A96A]/10 text-[#C8A96A]' : 'text-[#F7F5F0]/70 hover:bg-[#C8A96A]/5'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[#C8A96A]/20 bg-[#0D0D0D] mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-serif font-bold text-[#C8A96A] tracking-wider">إرث</span>
              </div>
              <p className="text-sm text-[#F7F5F0]/60 leading-relaxed font-serif">
                متجذرون في التراث، ونصنع من أجل العافية. كل منتج هو وعد بالنقاء والجودة.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-serif text-[#C8A96A] mb-6">المنتجات</h4>
              <div className="space-y-4">
                {['جميع المنتجات', 'عجوة المدينة', 'عسل السدر', 'الزيوت الطبيعية'].map((i) => (
                  <Link key={i} href="/store" className="block text-sm text-[#F7F5F0]/60 hover:text-[#C8A96A] transition-colors">{i}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-serif text-[#C8A96A] mb-6">عن الشركة</h4>
              <div className="space-y-4">
                {['قصتنا', 'تواصل معنا', 'المدونة', 'الوظائف'].map((i) => (
                  <Link key={i} href="#" className="block text-sm text-[#F7F5F0]/60 hover:text-[#C8A96A] transition-colors">{i}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-serif text-[#C8A96A] mb-6">المساعدة</h4>
              <div className="space-y-4">
                {['الأسئلة الشائعة', 'معلومات الشحن', 'الاسترجاع', 'سياسة الخصوصية'].map((i) => (
                  <Link key={i} href="#" className="block text-sm text-[#F7F5F0]/60 hover:text-[#C8A96A] transition-colors">{i}</Link>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-[#C8A96A]/20 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#F7F5F0]/40 font-serif">© 2026 IRTH WELLNESS. All rights reserved.</p>
            <div className="flex items-center gap-6 text-xs text-[#F7F5F0]/40 font-serif tracking-widest">
              <span>VISA</span><span>MASTERCARD</span><span>CASH ON DELIVERY</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
