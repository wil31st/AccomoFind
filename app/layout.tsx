import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'AccomoFind — AI-Powered Accommodation Search',
  description:
    'Find your perfect home abroad using AI. Search apartments and houses across London, Paris, New York, Dubai, Singapore and Barcelona.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-gray-100 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-400">
            <p>© 2025 AccomoFind · AI-powered property search · Powered by Claude</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
