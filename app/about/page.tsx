import Link from 'next/link';
import { Home, Search, Shield, Heart, Mail, MessageCircle } from 'lucide-react';

const values = [
  {
    icon: Search,
    title: 'Transparent search',
    desc: 'No hidden fees, no pay-to-rank listings. Every listing is shown fairly, filtered only by what you care about.',
  },
  {
    icon: Heart,
    title: 'Inclusive community',
    desc: 'We support nationality and cultural preference filters so everyone can find a home where they feel welcome.',
  },
  {
    icon: Shield,
    title: 'Safety first',
    desc: 'We verify hosts, provide safety guides, and actively monitor for fraudulent listings to protect our community.',
  },
  {
    icon: Home,
    title: 'Free for renters',
    desc: 'Browsing and contacting hosts is always free. We believe finding a home should never come with a search fee.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Hero */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="bg-teal-600 p-2 rounded-xl">
            <Home className="w-6 h-6 text-white" />
          </div>
          <span className="font-extrabold text-2xl text-slate-800">
            Flatmate<span className="text-teal-600">Find</span>
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
          Australia&apos;s free flatmate board
        </h1>
        <p className="text-slate-500 leading-relaxed max-w-xl mx-auto">
          FlatmateFind connects people looking for a room with people who have one to offer — simply, safely, and for free — across every state and territory in Australia.
        </p>
      </div>

      {/* Story */}
      <section className="mb-14 bg-white border border-slate-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Our story</h2>
        <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
          <p>
            Finding a good share house is hard. Finding one where you&apos;ll actually feel at home — with compatible housemates, a fair price, and all the right inclusions — is even harder.
          </p>
          <p>
            We built FlatmateFind to make that process simpler. We wanted a place where renters could filter not just by price and bedrooms, but by the things that really matter: whether bills are included, whether pets are welcome, and whether the existing household speaks your language or shares your background.
          </p>
          <p>
            No commissions. No subscription fees. No sponsored listings. Just a clean, honest board for people to find a home.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-14">
        <h2 className="text-xl font-bold text-slate-900 mb-6">What we stand for</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {values.map((v) => (
            <div key={v.title} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4">
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

      {/* CTA */}
      <div className="text-center mb-14">
        <Link href="/listings" className="inline-flex items-center gap-2 bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
          Browse listings
        </Link>
        <p className="text-xs text-slate-400 mt-3">Free to browse · No account required</p>
      </div>

      {/* Contact */}
      <section id="contact" className="bg-white border border-slate-200 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 bg-teal-50 rounded-xl shrink-0">
            <MessageCircle className="w-5 h-5 text-teal-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Contact us</h2>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          Have a question, spotted a scam listing, or want to advertise on FlatmateFind? We&apos;d love to hear from you.
        </p>
        <div className="space-y-3">
          <a
            href="mailto:hello@flatmatefind.com.au"
            className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-teal-50 transition-colors group"
          >
            <Mail className="w-5 h-5 text-teal-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-700">General enquiries</p>
              <p className="text-xs text-slate-500">hello@flatmatefind.com.au</p>
            </div>
          </a>
          <a
            href="mailto:support@flatmatefind.com.au"
            className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-teal-50 transition-colors group"
          >
            <Mail className="w-5 h-5 text-teal-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-700">Report a listing or scam</p>
              <p className="text-xs text-slate-500">support@flatmatefind.com.au</p>
            </div>
          </a>
          <a
            href="mailto:ads@flatmatefind.com.au"
            className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl hover:bg-teal-50 transition-colors group"
          >
            <Mail className="w-5 h-5 text-teal-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-800 group-hover:text-teal-700">Advertising &amp; partnerships</p>
              <p className="text-xs text-slate-500">ads@flatmatefind.com.au</p>
            </div>
          </a>
        </div>
        <p className="text-xs text-slate-400 mt-5">We aim to respond within 1–2 business days.</p>
      </section>
    </div>
  );
}
