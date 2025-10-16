// src/app/layout.tsx

import '../styles/globals.css';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className="h-full">
      <body className="h-full">{children}</body>
    </html>
  );
}
