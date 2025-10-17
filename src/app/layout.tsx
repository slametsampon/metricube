// src/app/layout.tsx

import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { AppThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Providers } from '@/lib/provider';
import siteMetadata from '@/data/siteMetadata';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 antialiased ${inter.className}`}
      >
        <AppThemeProvider>
          <Providers>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 px-4 sm:px-6">{children}</main>
              <Footer />
            </div>
          </Providers>
        </AppThemeProvider>
      </body>
    </html>
  );
}
