import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'FlatmateFind — Find Rooms & Flatmates in Australia',
  description: 'Browse rooms, apartments and share houses across Sydney, Melbourne, Brisbane, Perth, Adelaide and Gold Coast.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="bg-white border-t border-slate-100 py-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-400">
              <p>© 2025 FlatmateFind · Rooms &amp; share houses across Australia</p>
            </div>
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
