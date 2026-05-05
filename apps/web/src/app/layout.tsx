import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'IRTH OS — Commerce Operating System',
  description: 'Full-stack commerce, operations, supply chain, and marketing platform',
  keywords: ['e-commerce', 'operations', 'supply chain', 'marketing', 'admin dashboard'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
