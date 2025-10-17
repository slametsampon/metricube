// src/components/MobileNav.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import headerNavLinks from '@/data/headerNavLinks';
import CustomLink from './Link';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Tutup dropdown jika klik di luar area dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="sm:hidden relative">
      <button
        onClick={toggleMenu}
        aria-label="Toggle Menu"
        className="text-gray-800 dark:text-gray-200 focus:outline-none"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 top-12 z-50 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg py-2 border border-gray-200 dark:border-gray-700"
        >
          {headerNavLinks.map((link) => (
            <CustomLink
              key={link.title}
              href={link.href}
              className="block px-4 py-2 text-sm text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              {link.title}
            </CustomLink>
          ))}
        </div>
      )}
    </div>
  );
}
