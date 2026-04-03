import Link from 'next/link';
import { Home, Search, Shield, Heart, Users, Zap, Globe, CheckCircle, ArrowRight } from 'lucide-react';

const values = [
  {
    icon: Search,
    title: 'Transparent search',
    desc: 'No hidden fees, no pay-to-rank listings. Every listing is shown fairly, filtered only by what matters to you.',
  },
  {
    icon: Heart,
    title: 'Inclusive community',
    desc: 'Cultural and language preference filters so everyone can find a home where they truly feel welcome.',
  },
  {
    icon: Shield,
    title: 'Safety first',
    desc: 'We verify hosts, provide safety guides, and actively monitor for fraudulent listings to protect our users.',
  },
  {
    icon: Home,
    title: 'Always free for renters',
    desc: 'Browsing and contacting hosts is 100% free. Finding a home should never cost you anything.',
  },
  {
    icon: Zap,
    title: 'Simple and fast',
    desc: 'List a room in under 3 minutes. No lengthy forms, no approvals, no waiting. Just post and get enquiries.',
  },
  {
    icon: Users,
    title: 'Built for Australians',
    desc: 'Designed for the Australian rental market — from inner-city share houses to regional opportunities.',
  },
];

const stats = [
  { value: '10,000+', label: 'Active listings' },
  { value: '50,000+', label: 'Renters helped' },
  { value: '8 states', label: 'Australia-wide' },
  { value: '100%', label: 'Free to browse' },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-700 text-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="font-extrabold text-2xl">
              Flatmate<span className="text-teal-200">Find</span>
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-5 leading-tight">
            Helping Australians find<br className="hidden sm:block" /> a place to call home
          </h1>
          <p className="text-teal-100 text-lg leading-relaxed max-w-xl mx-auto">
            A free, honest flatmate board built for renters and hosts alike — no commissions, no paywalls, no nonsense.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold text-teal-600 mb-1">{s.value}</p>
                <p className="text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our story */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-teal-500 rounded-full" />
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest">Our story</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Why we built FlatmateFind</h2>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Finding a good share house is hard. Finding one where you&apos;ll actually feel at home — with compatible housemates, a fair price, and all the right inclusions — is even harder. We experienced that frustration first-hand, and we knew there had to be a better way.
            </p>
            <p>
              We built FlatmateFind to make that process simpler and fairer. A place where renters could filter not just by price and bedrooms, but by the things that really matter: whether bills are included, whether pets are welcome, and whether the existing household speaks your language or shares your culture.
            </p>
            <p>
              No commissions. No subscription fees. No sponsored listings pushing the good stuff out of view. Just a clean, honest board where people can find a home they&apos;ll love.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-0.5 bg-teal-500 rounded-full" />
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-widest">What we stand for</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Our principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((v) => (
              <div key={v.title} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-start gap-4 hover:border-teal-200 transition-colors">
                <div className="p-2.5 bg-teal-50 rounded-xl shrink-0">
                  <v.icon className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Australia-wide */}
        <section className="mb-16 bg-teal-50 border border-teal-100 rounded-2xl p-8 text-center">
          <Globe className="w-10 h-10 text-teal-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Covering all of Australia</h2>
          <p className="text-slate-500 text-sm leading-relaxed max-w-md mx-auto mb-4">
            From Sydney and Melbourne to Perth, Darwin, and everywhere in between — FlatmateFind covers listings across every state and territory.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'].map((state) => (
              <span key={state} className="px-3 py-1 bg-white border border-teal-200 rounded-full text-teal-700 font-medium">
                {state}
              </span>
            ))}
          </div>
        </section>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 bg-teal-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors"
          >
            Browse listings
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:border-teal-400 hover:text-teal-600 transition-colors"
          >
            Get in touch
          </Link>
        </div>
        <p className="text-xs text-slate-400 mt-4 text-center">
          <CheckCircle className="w-3.5 h-3.5 inline-block mr-1 text-teal-400" />
          Free to browse · No account required
        </p>
      </div>
    </div>
  );
}
