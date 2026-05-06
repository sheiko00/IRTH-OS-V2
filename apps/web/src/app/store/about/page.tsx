'use client';
import { Heart, Leaf, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="animate-fade-up">
      <section className="relative bg-gradient-to-br from-purple-950/50 via-background to-indigo-950/30 py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">Our <span className="gradient-text">Story</span></h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            IRTH was born from a simple belief: everyone deserves access to premium, effective skincare without the premium price tag. We craft science-backed formulations using the finest natural ingredients.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Leaf, title: 'Natural Ingredients', desc: 'Ethically sourced, clinically tested ingredients' },
            { icon: Award, title: 'Dermatologist Tested', desc: 'All products approved by certified dermatologists' },
            { icon: Heart, title: 'Cruelty Free', desc: 'Never tested on animals, always vegan-friendly' },
            { icon: Users, title: '10K+ Happy Customers', desc: 'Trusted by thousands across the region' },
          ].map((v) => (
            <div key={v.title} className="p-6 rounded-2xl border border-border bg-card text-center hover-lift">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                <v.icon className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="font-semibold mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
