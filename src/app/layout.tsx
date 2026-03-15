import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { JotaiProvider } from '@/apps/providers/JotaiProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SmartEnergy BEMS Dashboard',
  description: 'Building Energy Management System — Real-time monitoring dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <JotaiProvider>{children}</JotaiProvider>
      </body>
    </html>
  );
}
