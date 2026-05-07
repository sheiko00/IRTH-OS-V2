import Link from 'next/link';
import { 
  Crown, Sparkles, Shield, ArrowLeft, 
  Layers, Zap, MapPin, Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] relative overflow-hidden font-serif rtl" dir="rtl">
      {/* Visual Ambiance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#C8A96A]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-[#244F3A]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-pattern-islamic opacity-[0.03] scale-150" />
      </div>

      {/* Navigation */}
      <header className="relative z-10 border-b border-[#C8A96A]/10 bg-[#0D0D0D]/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-[#C8A96A]/30 flex items-center justify-center bg-[#151515] shadow-[0_0_20px_rgba(200,169,106,0.2)]">
              <span className="text-[#C8A96A] font-bold text-xl">إ</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-widest text-[#C8A96A]">IRTH OS</h1>
              <p className="text-[10px] text-[#F7F5F0]/40 uppercase tracking-[0.3em]">Brand Operating System</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/auth/login" className="text-sm font-bold text-[#F7F5F0]/60 hover:text-[#C8A96A] transition-colors">
              تسجيل الدخول
            </Link>
            <Link href="/auth/register" className="px-8 py-3 text-sm font-bold text-[#0D0D0D] bg-[#C8A96A] rounded-full hover:bg-[#B6975A] transition-all shadow-[0_0_30px_rgba(200,169,106,0.3)]">
              ابدأ الآن
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#C8A96A]/10 border border-[#C8A96A]/20 text-[#C8A96A] text-xs font-bold mb-12 animate-fade-down uppercase tracking-widest">
          <Crown className="w-4 h-4" />
          مستقبل إدارة العلامات التجارية الفاخرة
        </div>
        
        <h2 className="text-6xl md:text-8xl font-bold tracking-tight text-[#F7F5F0] mb-8 animate-fade-up leading-tight">
          إرث القيمة،
          <br />
          <span className="text-[#C8A96A]">نظام واحد للقيادة</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-[#F7F5F0]/60 max-w-3xl mx-auto mb-16 animate-fade-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
          أول نظام تشغيل مؤسسي مصمم خصيصاً للعلامات التجارية التي تقدّر الأصالة والفخامة. 
          من المدينة إلى العالم، تحكم في كامل منظومتك بذكاء وهدوء.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <Link
            href="/admin/dashboard"
            className="group flex items-center gap-3 px-10 py-4 text-lg font-bold text-[#0D0D0D] rounded-full bg-[#C8A96A] hover:bg-[#B6975A] transition-all shadow-2xl shadow-[#C8A96A]/20"
          >
            دخول مركز القيادة
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/store"
            className="px-10 py-4 text-lg font-bold text-[#F7F5F0] rounded-full border border-[#C8A96A]/20 hover:bg-[#C8A96A]/5 transition-all"
          >
            معاينة المتجر
          </Link>
        </div>
      </section>

      {/* Philosophy / Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              icon: Shield, 
              title: 'أمان مؤسسي', 
              desc: 'نظام صلاحيات صارم يحمي أسرار علامتك التجارية وبيانات عملائك.', 
              color: 'text-[#A9D3B8]',
              bg: 'bg-[#244F3A]/10'
            },
            { 
              icon: Zap, 
              title: 'نبض لحظي', 
              desc: 'شاهد حركة المخزون والطلبات والنمو في لحظة حدوثها دون تأخير.', 
              color: 'text-[#C8A96A]',
              bg: 'bg-[#C8A96A]/10'
            },
            { 
              icon: Globe, 
              title: 'توسع عالمي', 
              desc: 'بنية تحتية تدعم لغات متعددة، عملات مختلفة، ومستودعات عبر القارات.', 
              color: 'text-[#3b82f6]',
              bg: 'bg-blue-500/10'
            },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className="p-8 rounded-[2.5rem] border border-[#C8A96A]/10 bg-[#151515]/40 backdrop-blur-sm hover:border-[#C8A96A]/30 transition-all duration-500 group animate-fade-up"
              style={{ animationDelay: `${0.2 * i}s` }}
            >
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform", feature.bg, feature.color)}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#F7F5F0] mb-3">{feature.title}</h3>
              <p className="text-[#F7F5F0]/50 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Meta */}
      <footer className="relative z-10 border-t border-[#C8A96A]/10 py-12 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-[#C8A96A] mb-4">
             <MapPin className="w-4 h-4" />
             <span className="text-xs font-bold tracking-widest uppercase">Madinah · Saudi Arabia</span>
          </div>
          <p className="text-[10px] text-[#F7F5F0]/20 font-sans tracking-[0.4em] uppercase">
            © 2026 IRTH ENTERPRISE OS · PROPHETIC HERITAGE · LUXURY STANDARDS
          </p>
        </div>
      </footer>
    </div>
  );
}
