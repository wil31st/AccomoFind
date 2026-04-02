import { NextRequest, NextResponse } from 'next/server';
import { consumeVerificationToken } from '@/lib/verificationTokens';

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  if (!token) return NextResponse.json({ error: 'Token required' }, { status: 400 });

  const email = consumeVerificationToken(token);
  if (!email) {
    return NextResponse.json({ error: 'Invalid or expired link.' }, { status: 400 });
  }

  return NextResponse.json({ ok: true, email });
}
