'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function VerifyTokenPage() {
  const { token } = useParams<{ token: string }>();
  const { markEmailVerified } = useAuth();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function verify() {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Verification failed.');
        setStatus('error');
        return;
      }
      markEmailVerified(data.email);
      setStatus('success');
      setTimeout(() => router.push('/dashboard'), 2500);
    }
    verify();
  }, [token, markEmailVerified, router]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-8 justify-center">
          <div className="bg-teal-600 p-1.5 rounded-lg">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-800">Flatmate<span className="text-teal-600">Find</span></span>
        </Link>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
          {status === 'loading' && (
            <>
              <Loader2 className="w-10 h-10 text-teal-500 animate-spin mx-auto mb-4" />
              <p className="text-slate-600 font-medium">Verifying your email…</p>
            </>
          )}
          {status === 'success' && (
            <>
              <div className="w-14 h-14 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-7 h-7 text-teal-600" />
              </div>
              <h1 className="text-xl font-bold text-slate-900 mb-2">Email verified!</h1>
              <p className="text-sm text-slate-500">Redirecting you to your dashboard…</p>
            </>
          )}
          {status === 'error' && (
            <>
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-7 h-7 text-red-500" />
              </div>
              <h1 className="text-xl font-bold text-slate-900 mb-2">Link expired or invalid</h1>
              <p className="text-sm text-slate-500 mb-5">{errorMsg}</p>
              <Link
                href="/auth/verify-email"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 text-white text-sm font-semibold rounded-lg hover:bg-teal-700 transition-colors"
              >
                Request a new link
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
