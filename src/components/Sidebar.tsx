// src/components/Sidebar.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';

const menuItems = [
  { label: 'KPI Record', href: '/dashboard/kpi-record' },
  { label: 'KPI Target', href: '/dashboard/kpi-target' },
  { label: 'KPI Forecast', href: '/dashboard/kpi-forecast' },
  { label: 'Disturbance Log', href: '/dashboard/disturbance-log' },
  { label: 'Disturbance Sources', href: '/dashboard/disturbance-sources' },
  { label: 'Departments', href: '/dashboard/departments' },
  { label: 'Units', href: '/dashboard/units' },
  { label: 'KPI Master', href: '/dashboard/kpi' },
  { label: 'KPI Target Annual', href: '/dashboard/kpi-target-annual' },
];

const entryForms = [
  { label: 'New KPI', href: '/dashboard/kpi/new' },
  { label: 'New KPI Record', href: '/dashboard/entry/kpi-record' },
  { label: 'New KPI Forecast', href: '/dashboard/entry/kpi-forecast' },
  { label: 'New Disturbance Log', href: '/dashboard/entry/disturbance-log' },
  {
    label: 'New Disturbance Source',
    href: '/dashboard/entry/disturbance-sources',
  },
  { label: 'New Department', href: '/dashboard/departments/new' },
  { label: 'New Unit', href: '/dashboard/units/new' },
];

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-white z-20 relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-700"
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
        <h1 className="text-xl font-bold">Dashboard KPI 2025</h1>
      </div>

      {/* Sidebar for desktop */}
      <aside className="hidden md:flex flex-col px-4 py-6 border-r min-w-max bg-white">
        <SidebarContent onLinkClick={closeMenu} />
      </aside>

      {/* Mobile drawer with animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            ref={menuRef}
            className="md:hidden fixed top-16 left-0 w-3/4 max-w-xs h-full bg-white z-30 shadow-lg p-4 overflow-y-auto"
          >
            <SidebarContent onLinkClick={closeMenu} />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarContent({ onLinkClick }: { onLinkClick: () => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
          Data View
        </h2>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onLinkClick}
                className="block text-sm text-blue-600 hover:underline transition-all"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <hr className="border-gray-300" />

      <div>
        <h2 className="text-sm font-semibold text-gray-500 uppercase mb-2">
          Entry Forms
        </h2>
        <ul className="space-y-2">
          {entryForms.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onLinkClick}
                className="block text-sm text-blue-600 hover:underline transition-all"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
