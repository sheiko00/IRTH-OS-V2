import Link from 'next/link';
import { 
  Package, ShoppingCart, Users, BarChart3, Truck, 
  Megaphone, FolderOpen, Shield, ArrowRight, Sparkles,
  Layers, Zap
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">IRTH OS</h1>
              <p className="text-xs text-muted-foreground">Commerce Operating System</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg gradient-primary hover:opacity-90 transition-all shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm mb-8 animate-fade-up">
          <Sparkles className="w-4 h-4" />
          <span>Production-Ready Commerce Platform</span>
        </div>
        <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Your Business,
          <br />
          <span className="gradient-text">One Operating System</span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Commerce · Operations · Supply Chain · Marketing · Analytics
          <br />
          Everything you need to run a modern commerce company.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link
            href="/admin/dashboard"
            className="group flex items-center gap-2 px-8 py-3.5 text-base font-semibold text-white rounded-xl gradient-primary hover:opacity-90 transition-all shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40"
          >
            Open Dashboard
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/store"
            className="px-8 py-3.5 text-base font-semibold rounded-xl border border-border hover:bg-accent transition-colors"
          >
            Visit Store
          </Link>
        </div>
      </section>

      {/* Module Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: ShoppingCart, title: 'Commerce', desc: 'Products, Cart, Orders, Checkout', color: 'from-purple-500 to-violet-600', href: '/admin/products' },
            { icon: Users, title: 'Users & RBAC', desc: 'Roles, Permissions, Team Management', color: 'from-blue-500 to-indigo-600', href: '/admin/users' },
            { icon: Package, title: 'Suppliers', desc: 'Supplier Management, Files, Batches', color: 'from-emerald-500 to-teal-600', href: '/admin/suppliers' },
            { icon: Layers, title: 'Inventory', desc: 'Stock, Expiry, Reorder Alerts', color: 'from-amber-500 to-orange-600', href: '/admin/inventory' },
            { icon: Truck, title: 'Logistics', desc: 'Shipping, Tracking, Delivery', color: 'from-cyan-500 to-blue-600', href: '/admin/shipping' },
            { icon: Megaphone, title: 'Marketing', desc: 'Campaigns, Coupons, Influencers', color: 'from-pink-500 to-rose-600', href: '/admin/marketing' },
            { icon: FolderOpen, title: 'File System', desc: 'Upload, Organize, Share', color: 'from-slate-500 to-gray-600', href: '/admin/files' },
            { icon: BarChart3, title: 'Analytics', desc: 'Sales, Customers, Performance', color: 'from-violet-500 to-purple-600', href: '/admin/analytics' },
          ].map((module, i) => (
            <Link
              key={module.title}
              href={module.href}
              className="group p-6 rounded-2xl border border-border/50 bg-card/50 hover:bg-card hover:border-border transition-all duration-300 hover-lift animate-fade-up"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <module.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-1">{module.title}</h3>
              <p className="text-sm text-muted-foreground">{module.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative z-10 border-t border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground mb-6">Built with</p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-muted-foreground">
            {['Next.js 15', 'NestJS', 'PostgreSQL', 'Redis', 'Prisma', 'Tailwind CSS', 'TypeScript'].map((tech) => (
              <div key={tech} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50">
                <Zap className="w-3 h-3 text-purple-500" />
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
