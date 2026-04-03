/**
 * AdSlot — displays a live ad if configured in data/ads.ts, otherwise shows
 * a "Advertise here" placeholder that links to the contact page.
 *
 * Usage:
 *   <AdSlot size="rectangle" slotId="jobs-sidebar" />
 *
 * To activate an ad, edit data/ads.ts — no changes needed here.
 */

import Link from 'next/link';
import Image from 'next/image';
import { Megaphone } from 'lucide-react';
import { ADS } from '@/data/ads';

type AdSize = 'leaderboard' | 'banner' | 'rectangle' | 'inline';

const SIZE_STYLES: Record<AdSize, { wrapper: string; height: string; heightPx: number; label: string }> = {
  leaderboard: { wrapper: 'w-full',                                              height: 'h-[90px]',              heightPx: 90,  label: '728 × 90 — Leaderboard' },
  banner:      { wrapper: 'w-full',                                              height: 'h-[80px] sm:h-[100px]', heightPx: 100, label: 'Full-width Banner' },
  rectangle:   { wrapper: 'w-full',                                              height: 'h-[250px]',             heightPx: 250, label: '300 × 250 — Rectangle' },
  inline:      { wrapper: 'w-full col-span-full sm:col-span-2 xl:col-span-3',   height: 'h-[100px]',             heightPx: 100, label: 'In-feed Banner' },
};

interface AdSlotProps {
  size: AdSize;
  slotId?: string;
  className?: string;
  label?: string;
}

export default function AdSlot({ size, slotId, className = '', label }: AdSlotProps) {
  const { wrapper, height } = SIZE_STYLES[size];
  const isRectangle = size === 'rectangle';

  const ad = slotId ? ADS[slotId] : undefined;
  const isLive = ad?.active && ad.image && ad.href;

  // ── Live ad ──────────────────────────────────────────────────────────────
  if (isLive) {
    return (
      <div className={`${wrapper} ${className}`}>
        <a
          href={ad!.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={`relative block ${height} rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow`}
        >
          <span className="absolute top-1.5 left-2 z-10 text-[9px] font-bold text-white/70 bg-black/30 px-1.5 py-0.5 rounded uppercase tracking-widest">
            {label ?? 'Ad'}
          </span>
          <Image
            src={ad!.image!}
            alt={ad!.alt ?? 'Advertisement'}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 728px"
          />
        </a>
      </div>
    );
  }

  // ── Placeholder ───────────────────────────────────────────────────────────
  return (
    <div className={`${wrapper} ${className}`}>
      <Link
        href="/contact"
        className={`
          group relative flex ${isRectangle ? 'flex-col' : 'flex-row'} items-center justify-center gap-3
          ${height}
          rounded-xl border border-dashed border-slate-300 hover:border-teal-400
          bg-gradient-to-br from-slate-50 to-slate-100 hover:from-teal-50 hover:to-teal-50/60
          overflow-hidden transition-all duration-200 cursor-pointer
        `}
      >
        <span className="absolute top-2 left-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {label ?? 'Advertisement'}
        </span>

        <div className={`flex ${isRectangle ? 'flex-col' : 'flex-row'} items-center gap-2 text-center px-4`}>
          <div className="p-2 rounded-lg bg-white border border-slate-200 group-hover:border-teal-300 group-hover:bg-teal-50 transition-colors shrink-0">
            <Megaphone className="w-4 h-4 text-slate-400 group-hover:text-teal-500 transition-colors" />
          </div>
          <div className={isRectangle ? 'mt-1' : ''}>
            <p className="text-xs font-semibold text-slate-500 group-hover:text-teal-700 transition-colors leading-tight">
              Advertise here
            </p>
            <p className="text-[10px] text-slate-400 group-hover:text-teal-500 transition-colors leading-tight mt-0.5">
              Reach thousands of renters · <span className="underline">Get in touch →</span>
            </p>
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, #64748b 0, #64748b 1px, transparent 0, transparent 50%)',
            backgroundSize: '12px 12px',
          }}
        />
      </Link>
    </div>
  );
}
