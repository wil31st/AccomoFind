'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-teal-600 p-1.5 rounded-lg">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-800">
              Flatmate<span className="text-teal-600">Find</span>
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/listings"
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith('/listings')
                  ? 'text-teal-600'
                  : 'text-slate-600 hover:text-teal-600'
              }`}
            >
              Browse Listings
            </Link>
            <Link
              href="/post"
              className="bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              + Post a Listing
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
