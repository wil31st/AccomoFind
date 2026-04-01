'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, MapPin } from 'lucide-react';
import clsx from 'clsx';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-indigo-600 rounded-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Accomo<span className="text-indigo-600">Find</span>
            </span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={clsx(
                'text-sm font-medium transition-colors',
                pathname === '/'
                  ? 'text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              Home
            </Link>
            <Link
              href="/listings"
              className={clsx(
                'text-sm font-medium transition-colors',
                pathname.startsWith('/listings')
                  ? 'text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              )}
            >
              Browse
            </Link>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link
              href="/listings"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Search className="w-4 h-4" />
              Browse Listings
            </Link>
            <Link
              href="/listings"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Home className="w-4 h-4" />
              Find a Home
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
