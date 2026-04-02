import Link from 'next/link';
import { ArrowRight, DollarSign, ShieldCheck, Users, MessageCircle, Zap, Globe, SlidersHorizontal, Briefcase, Heart } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import ListingCard from '@/components/ListingCard';
import AdSlot from '@/components/AdSlot';
import LiveStats from '@/components/LiveStats';
import HomePopularListings from '@/components/HomePopularListings';
import HomeNewListings from '@/components/HomeNewListings';
import { FEATURED_LISTINGS, listings } from '@/data/listings';
import { AUSTRALIAN_STATES } from '@/lib/types';

const STATE_META: Record<string, { highlight: string }> = {
  NSW: { highlight: 'Sydney & more' },
  VIC: { highlight: 'Melbourne & more' },
  QLD: { highlight: 'Brisbane, Gold Coast & more' },
  WA:  { highlight: 'Perth & surrounds' },
  SA:  { highlight: 'Adelaide & Barossa' },
  TAS: { highlight: 'Hobart & Launceston' },
  ACT: { highlight: 'Canberra' },
  NT:  { highlight: 'Darwin & Alice Springs' },
};


const WHY_BENEFITS = [
  {
    icon: DollarSign,
    color: 'bg-emerald-50 text-emerald-600',
    title: '100% Free — No Hidden Fees',
    description: 'Browse, apply, and message landlords at zero cost. No subscription, no booking fee, no "premium unlock". Unlike other platforms that charge renters to see contact details.',
  },
  {
    icon: SlidersHorizontal,
    color: 'bg-blue-50 text-blue-600',
    title: 'Filters That Actually Matter',
    description: 'Filter by nationality preference, gender, pets, bills included, stay type (short vs long term), and availability date — not just price and location.',
  },
  {
    icon: Users,
    color: 'bg-violet-50 text-violet-600',
    title: 'Built for Share-House Living',
    description: 'Find rooms in existing share houses where the vibe matters as much as the rent. See who already lives there, their lifestyle, and whether you are a match.',
  },
  {
    icon: MessageCircle,
    color: 'bg-teal-50 text-teal-600',
    title: 'Direct Contact With the Host',
    description: 'Message the current tenant or owner directly — no middleman, no delayed responses through a portal. Fast, personal, and honest communication from day one.',
  },
  {
    icon: Zap,
    color: 'bg-amber-50 text-amber-600',
    title: 'Short-Term & Sublet Friendly',
    description: 'Moving to Australia for a few weeks, between leases, or on a working holiday? FlatmateFind is one of the few boards that actively supports short-term and subletting arrangements.',
  },
  {
    icon: Globe,
    color: 'bg-sky-50 text-sky-600',
    title: 'A Community That Speaks Your Language',
    description: 'Listings welcome people from all backgrounds. Browse Facebook groups by state and connect with fellow renters from your community before you even sign a lease.',
  },
  {
    icon: Briefcase,
    color: 'bg-orange-50 text-orange-600',
    title: 'Jobs Board Included',
    description: "Need work as well as a room? The built-in jobs board connects renters with casual, part-time and full-time roles in their area — a complete settlement toolkit in one place.",
  },
  {
    icon: ShieldCheck,
    color: 'bg-rose-50 text-rose-600',
    title: 'Safer Listings, Less Spam',
    description: 'Built-in rate limiting, spam detection and a community report button keep the board clean. You see genuine listings — not scam posts or duplicates clogging up your search.',
  },
  {
    icon: Heart,
    color: 'bg-pink-50 text-pink-600',
    title: 'Save, Compare & Shortlist',
    description: 'Heart your favourite rooms, compare up to three listings side by side, and build a shortlist of promising renters — all without creating a paid account.',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Your Next Room is Here
            </h1>
            <p className="text-lg sm:text-xl text-teal-100 mb-10 max-w-2xl mx-auto">
              Free to browse. No fees. Message hosts directly.
            </p>
            <div className="max-w-2xl mx-auto">
              <SearchBar size="lg" placeholder="Search by suburb, city, or keyword..." />
            </div>
          </div>
        </div>
      </section>

      {/* ── Live stats bar ───────────────────────────────────────────────── */}
      <LiveStats />

      {/* ── Featured listings ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Listings</h2>
            <p className="text-slate-500 mt-1 text-sm">Hand-picked rooms and apartments</p>
          </div>
          <Link
            href="/listings"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_LISTINGS.slice(0, 6).map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
          >
            Browse All {listings.length} Listings
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── New listings ─────────────────────────────────────────────────── */}
      <HomeNewListings />

      {/* ── Ad banner ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <AdSlot size="leaderboard" />
      </div>

      {/* ── Popular listings ──────────────────────────────────────────────── */}
      <HomePopularListings />

      {/* ── Browse by state ───────────────────────────────────────────────── */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Browse by State</h2>
            <p className="text-slate-500 text-sm">Find rooms and share houses across all states &amp; territories</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {AUSTRALIAN_STATES.map((state) => {
              const count = listings.filter((l) => l.location.state === state.abbr).length;
              const meta = STATE_META[state.abbr] ?? { highlight: 'Australia' };
              return (
                <Link
                  key={state.abbr}
                  href={`/listings?state=${encodeURIComponent(state.abbr)}`}
                  className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 bg-gradient-to-br from-teal-600 to-teal-800 hover:from-teal-500 hover:to-teal-700"
                >
                  <div className="flex flex-col items-start gap-1 px-5 py-5 text-white">
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-extrabold text-2xl leading-tight tracking-tight">{state.abbr}</span>
                      <span className="text-xs font-semibold bg-white/20 rounded-full px-2.5 py-0.5">
                        {count > 0 ? `${count} listing${count !== 1 ? 's' : ''}` : 'Coming soon'}
                      </span>
                    </div>
                    <span className="text-sm text-white/90 font-medium leading-tight">{state.name}</span>
                    <span className="text-xs text-white/60 mt-0.5">{meta.highlight}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why FlatmateFind ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest text-teal-600 uppercase mb-3">Why FlatmateFind</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3">The smarter way to find a room in Australia</h2>
          <p className="text-slate-500 text-base max-w-2xl mx-auto">
            Designed from the ground up for renters and subletters — not just landlords. Here is what sets us apart.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_BENEFITS.map((b) => (
            <div key={b.title} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${b.color}`}>
                <b.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{b.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors"
          >
            Start browsing for free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
