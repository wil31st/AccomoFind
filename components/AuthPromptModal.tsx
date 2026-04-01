'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { Heart, X, LogIn, UserPlus } from 'lucide-react';

interface Props {
  onClose: () => void;
  /** Optional listing path to redirect back to after auth */
  returnTo?: string;
}

export default function AuthPromptModal({ onClose, returnTo }: Props) {
  // Close on Escape key
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  const from = returnTo ? `?from=${encodeURIComponent(returnTo)}` : '';

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="flex items-center justify-center w-14 h-14 bg-rose-50 rounded-full mx-auto mb-5">
          <Heart className="w-7 h-7 text-rose-500 fill-current" />
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-2">Save this listing</h2>
        <p className="text-sm text-slate-500 mb-7 leading-relaxed">
          Create a free account or sign in to save listings and access them anytime from your dashboard.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href={`/auth/signup${from}`}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Sign up — it&apos;s free
          </Link>
          <Link
            href={`/auth/signin${from}`}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
