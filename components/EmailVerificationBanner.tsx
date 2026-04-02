'use client';
import { useState } from 'react';
import { MailWarning, X, RefreshCw, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function EmailVerificationBanner() {
  const { user } = useAuth();
  const [dismissed, setDismissed] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (!user || user.emailVerified || dismissed) return null;

  async function handleResend() {
    if (!user) return;
    setSending(true);
    await fetch('/api/auth/send-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, name: user.name }),
    });
    setSending(false);
    setSent(true);
  }

  return (
    <div className="bg-amber-50 border-b border-amber-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-3">
        <MailWarning className="w-4 h-4 text-amber-600 shrink-0" />
        <p className="text-sm text-amber-800 flex-1">
          Please verify your email address.{' '}
          {sent ? (
            <span className="inline-flex items-center gap-1 text-teal-700 font-medium">
              <CheckCircle className="w-3.5 h-3.5" /> Sent!
            </span>
          ) : (
            <button
              onClick={handleResend}
              disabled={sending}
              className="font-medium underline underline-offset-2 hover:text-amber-900 disabled:opacity-50"
            >
              {sending ? (
                <span className="inline-flex items-center gap-1"><RefreshCw className="w-3 h-3 animate-spin" /> Sending…</span>
              ) : 'Resend verification email'}
            </button>
          )}
        </p>
        <button onClick={() => setDismissed(true)} className="text-amber-500 hover:text-amber-700 shrink-0">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
