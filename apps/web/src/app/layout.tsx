import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IRTH OS — مركز قيادة العلامة التجارية',
  description: 'نظام تشغيل مؤسسي متكامل لإدارة العلامات التجارية الفاخرة، سلاسل الإمداد، والتسويق الرقمي.',
  keywords: ['IRTH', 'Brand OS', 'Luxury', 'Commerce', 'Enterprise', 'Madinah'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-background text-foreground bg-pattern-islamic">
        <div className="fixed inset-0 vignette-overlay z-[-1]"></div>
        {children}
      </body>
    </html>
  );
}
