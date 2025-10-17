// src/components/Header.tsx

'use client';

import Link from './Link';
import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import ThemeSwitch from './ThemeSwitch';
import MobileNav from './MobileNav';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-5 bg-blue-50 dark:bg-gray-900 shadow-md">
      {/* Logo + Title */}
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            {siteMetadata.headerTitle}
          </span>
        </div>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center space-x-4">
        {headerNavLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="text-sm font-medium text-gray-800 hover:text-blue-600 dark:text-gray-200"
          >
            {link.title}
          </Link>
        ))}
        <ThemeSwitch />
      </div>

      {/* Mobile Nav */}
      <div className="flex sm:hidden items-center space-x-2">
        <MobileNav />
        <ThemeSwitch />
      </div>
    </header>
  );
}
