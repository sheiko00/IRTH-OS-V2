'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Lock, CreditCard, Banknote, ChevronLeft, Check, Package } from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState<'cod' | 'card'>('cod');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const items = [
    { name: 'Radiance Serum (30ml)', qty: 2, price: 450 },
    { name: 'Vitamin C Toner (200ml)', qty: 1, price: 220 },
  ];
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const total = subtotal;

  if (orderPlaced) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center animate-fade-up">
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Order Confirmed! 🎉</h1>
        <p className="text-muted-foreground mb-2">Order #IRTH-000090</p>
        <p className="text-sm text-muted-foreground mb-8">We&apos;ve sent a confirmation email with your order details.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/store" className="px-8 py-3 rounded-xl text-sm font-semibold text-white gradient-primary hover:opacity-90 shadow-lg shadow-purple-500/25">
            Continue Shopping
          </Link>
          <Link href="/admin/orders" className="px-8 py-3 rounded-xl text-sm font-semibold border border-border hover:bg-accent transition-colors">
            Track Order
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Link href="/store/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="w-4 h-4" /> Back to Cart
      </Link>

      {/* Steps */}
      <div className="flex items-center gap-4 mb-10">
        {[{ n: 1, l: 'Shipping' }, { n: 2, l: 'Payment' }, { n: 3, l: 'Review' }].map((s, i) => (
          <div key={s.n} className="flex items-center gap-2">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all',
              step >= s.n ? 'gradient-primary text-white' : 'bg-muted text-muted-foreground'
            )}>
              {step > s.n ? <Check className="w-4 h-4" /> : s.n}
            </div>
            <span className={cn('text-sm font-medium hidden sm:block', step >= s.n ? '' : 'text-muted-foreground')}>{s.l}</span>
            {i < 2 && <div className={cn('w-12 h-0.5 rounded-full', step > s.n ? 'bg-purple-500' : 'bg-muted')} />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 animate-fade-up">
          {step === 1 && (
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-lg font-semibold mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="+20 10x xxx xxxx" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@email.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Street address" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option>Cairo</option><option>Alexandria</option><option>Giza</option><option>Mansoura</option><option>Tanta</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Postal Code</label>
                  <input className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Optional" />
                </div>
              </div>
              <button onClick={() => setStep(2)} className="w-full mt-6 py-3.5 rounded-xl text-sm font-semibold text-white gradient-primary hover:opacity-90 shadow-lg shadow-purple-500/25">
                Continue to Payment
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-lg font-semibold mb-6">Payment Method</h2>
              <div className="space-y-3 mb-6">
                <button onClick={() => setPayment('cod')} className={cn('w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left', payment === 'cod' ? 'border-purple-500 bg-purple-500/5' : 'border-border hover:border-purple-500/30')}>
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', payment === 'cod' ? 'bg-purple-500/10' : 'bg-muted')}>
                    <Banknote className={cn('w-5 h-5', payment === 'cod' ? 'text-purple-500' : 'text-muted-foreground')} />
                  </div>
                  <div><p className="text-sm font-semibold">Cash on Delivery</p><p className="text-xs text-muted-foreground">Pay when you receive your order</p></div>
                </button>
                <button onClick={() => setPayment('card')} className={cn('w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left', payment === 'card' ? 'border-purple-500 bg-purple-500/5' : 'border-border hover:border-purple-500/30')}>
                  <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center', payment === 'card' ? 'bg-purple-500/10' : 'bg-muted')}>
                    <CreditCard className={cn('w-5 h-5', payment === 'card' ? 'text-purple-500' : 'text-muted-foreground')} />
                  </div>
                  <div><p className="text-sm font-semibold">Credit / Debit Card</p><p className="text-xs text-muted-foreground">Visa, Mastercard — via Paymob</p></div>
                </button>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="px-6 py-3.5 rounded-xl text-sm font-medium border border-border hover:bg-accent transition-colors">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 py-3.5 rounded-xl text-sm font-semibold text-white gradient-primary hover:opacity-90 shadow-lg shadow-purple-500/25">Review Order</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-lg font-semibold mb-6">Review Your Order</h2>
              <div className="space-y-3 mb-6">
                {items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center"><Package className="w-4 h-4 text-purple-500/50" /></div>
                      <div><p className="text-sm font-medium">{item.name}</p><p className="text-xs text-muted-foreground">Qty: {item.qty}</p></div>
                    </div>
                    <p className="text-sm font-semibold">{formatCurrency(item.price * item.qty)}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-muted/50 mb-6 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Payment</span><span>{payment === 'cod' ? 'Cash on Delivery' : 'Credit Card'}</span></div>
                <div className="flex justify-between font-bold text-base"><span>Total</span><span>{formatCurrency(total)}</span></div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="px-6 py-3.5 rounded-xl text-sm font-medium border border-border hover:bg-accent transition-colors">Back</button>
                <button onClick={() => setOrderPlaced(true)} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold text-white gradient-primary hover:opacity-90 shadow-lg shadow-purple-500/25">
                  <Lock className="w-4 h-4" /> Place Order
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="p-6 rounded-2xl border border-border bg-card sticky top-24">
            <h3 className="text-sm font-semibold mb-4">Order Summary</h3>
            {items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm py-2 border-b border-border/50 last:border-0">
                <span className="text-muted-foreground">{item.name} × {item.qty}</span>
                <span>{formatCurrency(item.price * item.qty)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm mt-3 pt-3 border-t border-border">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-green-500 font-medium">FREE</span>
            </div>
            <div className="flex justify-between mt-3 pt-3 border-t border-border">
              <span className="font-semibold">Total</span>
              <span className="text-lg font-bold">{formatCurrency(total)}</span>
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" /> Secure checkout — SSL encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
