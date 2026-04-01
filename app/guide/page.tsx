import Link from 'next/link';
import { Search, Home, MessageCircle, Star, Shield, CheckCircle } from 'lucide-react';

export default function GuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">FlatmateFind Guide</h1>
        <p className="text-slate-500">Everything you need to find your perfect share house — or your perfect tenant.</p>
      </div>

      {/* Nav pills */}
      <div className="flex gap-3 mb-12 justify-center flex-wrap">
        <a href="#how-it-works" className="px-4 py-2 bg-teal-50 text-teal-700 text-sm font-medium rounded-full border border-teal-200 hover:bg-teal-100 transition-colors">How It Works</a>
        <a href="#renter-guide" className="px-4 py-2 bg-teal-50 text-teal-700 text-sm font-medium rounded-full border border-teal-200 hover:bg-teal-100 transition-colors">Renter Guide</a>
        <a href="#listing-guide" className="px-4 py-2 bg-teal-50 text-teal-700 text-sm font-medium rounded-full border border-teal-200 hover:bg-teal-100 transition-colors">Listing Guide</a>
      </div>

      {/* How it works */}
      <section id="how-it-works" className="mb-14">
        <h2 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { icon: Search, step: '1', title: 'Search', desc: 'Browse listings filtered by state, city, budget, nationality preference and more.' },
            { icon: MessageCircle, step: '2', title: 'Connect', desc: 'Message the host directly through our built-in chat — no email needed.' },
            { icon: Home, step: '3', title: 'Move in', desc: 'Inspect the property, agree on terms, and move in.' },
          ].map((s) => (
            <div key={s.step} className="bg-white border border-slate-200 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <s.icon className="w-5 h-5 text-teal-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-teal-600 text-white text-xs font-bold rounded-full flex items-center justify-center">{s.step}</span>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Renter guide */}
      <section id="renter-guide" className="mb-14">
        <h2 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">Renter Guide</h2>
        <div className="space-y-5">
          {[
            { title: '1. Create a free renter account', body: 'Sign up and select "Renter". This unlocks the ability to save listings, send messages to hosts, and access your personal dashboard.' },
            { title: '2. Use filters to narrow your search', body: 'Use the State / Territory filter to focus on your target area, then drill down by city, budget, number of bedrooms, and furnished status. Use "My Nationality" to surface listings that are welcoming to your background.' },
            { title: '3. Save listings you like', body: 'Tap the ♡ heart on any listing card to save it. Your saved listings are always accessible from your Dashboard or the "Saved" link in the header.' },
            { title: '4. Message the host', body: 'Open a listing and click "Message Host" to start a conversation. Introduce yourself, ask any questions, and arrange an inspection time.' },
            { title: '5. Inspect before you pay', body: 'Always view the property in person before transferring any money or signing anything. Read our Safety Tips for a full checklist.' },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-1.5 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-500 shrink-0" />
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed pl-6">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Listing guide */}
      <section id="listing-guide" className="mb-14">
        <h2 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">Listing Guide (for Subletters)</h2>
        <div className="space-y-5">
          {[
            { title: '1. Create a subletter account', body: 'Sign up and choose "Subletter". This gives you access to post listings and manage enquiries from renters.' },
            { title: '2. Post your listing', body: 'Click "+ Post a Listing". Fill in the address, rent (AUD per week), number of bedrooms and bathrooms, inclusions (bills, internet, etc.), and upload photos. The more detail, the more enquiries you\'ll get.' },
            { title: '3. Set your preferences', body: 'Specify nationality preference, gender preference, pets and smoking policy to attract the right tenants upfront.' },
            { title: '4. Manage your listing', body: 'From your Dashboard you can pause a listing (temporarily hide it), or remove it once the room is filled. You can also see all renters who have messaged you.' },
            { title: '5. Shortlist renters', body: 'In the chat window, switch to "Host View" and tap "Shortlist renter" to flag promising applicants. Your shortlist is saved in the Dashboard.' },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-slate-200 rounded-xl p-5">
              <h3 className="font-semibold text-slate-900 mb-1.5 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 shrink-0" />
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed pl-6">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 text-center">
        <Shield className="w-8 h-8 text-teal-600 mx-auto mb-3" />
        <p className="font-semibold text-slate-800 mb-1">Stay safe while renting</p>
        <p className="text-sm text-slate-500 mb-4">Read our Safety Tips before meeting a stranger or transferring money.</p>
        <Link href="/safety" className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-teal-700 transition-colors">
          Read Safety Tips
        </Link>
      </div>
    </div>
  );
}
