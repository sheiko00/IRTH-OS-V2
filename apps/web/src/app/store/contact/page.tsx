'use client';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-up">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">Get in Touch</h1>
        <p className="text-muted-foreground">We&apos;d love to hear from you. Reach out anytime!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          {[
            { icon: Mail, label: 'Email', value: 'support@irth.app' },
            { icon: Phone, label: 'Phone', value: '+20 10 1234 5678' },
            { icon: MapPin, label: 'Address', value: 'Cairo, Egypt' },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                <c.icon className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-semibold">{c.label}</p>
                <p className="text-sm text-muted-foreground">{c.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-border bg-card">
          {sent ? (
            <div className="text-center py-12">
              <Send className="w-10 h-10 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
              <p className="text-sm text-muted-foreground">We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium mb-2">Name</label><input required className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Your name" /></div>
                <div><label className="block text-sm font-medium mb-2">Email</label><input required type="email" className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="you@email.com" /></div>
              </div>
              <div><label className="block text-sm font-medium mb-2">Subject</label><input required className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="How can we help?" /></div>
              <div><label className="block text-sm font-medium mb-2">Message</label><textarea required rows={5} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" placeholder="Your message..." /></div>
              <button type="submit" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold text-white gradient-primary hover:opacity-90 shadow-lg shadow-purple-500/25">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
