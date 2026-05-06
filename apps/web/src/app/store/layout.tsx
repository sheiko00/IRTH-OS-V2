'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, ShoppingBag, Search, User, Menu, X, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [cartCount] = useState(2);
  const pathname = usePathname();

  const navLinks = [
    { href: '/store', label: 'Shop' },
    { href: '/store/collections', label: 'Collections' },
    { href: '/store/about', label: 'About' },
    { href: '/store/contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center text-xs py-2 font-medium tracking-wide">
        ✨ FREE SHIPPING on orders over 500 EGP — Use code <strong>IRTH25</strong> for 25% off
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu toggle */}
            <button onClick={() => setMobileMenu(!mobileMenu)} className="lg:hidden p-2">
              {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Logo */}
            <Link href="/store" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Layers className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">IRTH</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-foreground',
                    pathname === link.href ? 'text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-accent transition-colors hidden sm:flex">
                <Search className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-accent transition-colors hidden sm:flex">
                <Heart className="w-5 h-5 text-muted-foreground" />
              </button>
              <Link href="/store/cart" className="relative p-2 rounded-lg hover:bg-accent transition-colors">
                <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-purple-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] h-[18px]">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/auth/login" className="p-2 rounded-lg hover:bg-accent transition-colors">
                <User className="w-5 h-5 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenu && (
          <div className="lg:hidden border-t border-border bg-background animate-fade-in">
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenu(false)}
                  className={cn(
                    'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                    pathname === link.href ? 'bg-accent text-foreground' : 'text-muted-foreground hover:bg-accent/50'
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
      <footer className="border-t border-border bg-card mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold">IRTH</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Premium skincare & beauty products crafted with care. Your glow, our mission.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Shop</h4>
              <div className="space-y-2.5">
                {['All Products', 'Skincare', 'Haircare', 'Body Care'].map((i) => (
                  <Link key={i} href="/store" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{i}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Company</h4>
              <div className="space-y-2.5">
                {['About Us', 'Contact', 'Blog', 'Careers'].map((i) => (
                  <Link key={i} href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{i}</Link>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Support</h4>
              <div className="space-y-2.5">
                {['FAQ', 'Shipping Info', 'Returns', 'Privacy Policy'].map((i) => (
                  <Link key={i} href="#" className="block text-sm text-muted-foreground hover:text-foreground transition-colors">{i}</Link>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">© 2026 IRTH. All rights reserved.</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Visa</span><span>Mastercard</span><span>Cash on Delivery</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
