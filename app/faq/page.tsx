import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const faqs = {
  renter: {
    title: 'For Renters',
    id: 'renter',
    items: [
      {
        q: 'Is FlatmateFind free to use?',
        a: 'Yes — browsing and contacting hosts is completely free. We never charge renters a fee.',
      },
      {
        q: 'How do I find listings that welcome my nationality?',
        a: 'Use the "My Nationality" filter on the listings page. It will show you listings where the host has indicated they welcome your background, as well as all listings with no preference set.',
      },
      {
        q: 'How do I save a listing?',
        a: 'Click the heart (♡) icon on any listing card. You must be signed in as a renter to save listings. View all your saved listings in your Dashboard.',
      },
      {
        q: 'How do I contact a host?',
        a: 'Open any listing and click "Message Host". A chat window will open. You need to be signed in to send messages.',
      },
      {
        q: 'Are the listings verified?',
        a: 'Hosts with a green "Verified" badge have completed our basic identity check. Always inspect a property in person before paying any money.',
      },
      {
        q: 'What should I look out for when renting?',
        a: 'Never transfer money before viewing a property in person. Be wary of listings with unusually low rent. Read our Safety Tips for a full checklist.',
      },
    ],
  },
  subletter: {
    title: 'For Subletters / Hosts',
    id: 'subletter',
    items: [
      {
        q: 'How do I post a listing?',
        a: 'Sign up or sign in as a Subletter, then click "Post a Listing" in the header or your dashboard. Fill in the property details and submit.',
      },
      {
        q: 'How much does it cost to list?',
        a: 'Posting a listing is free. We do not charge commissions or listing fees.',
      },
      {
        q: 'Can I pause or remove my listing?',
        a: 'Yes. Go to your Dashboard and click the pause (⏸) button to temporarily hide your listing, or the trash (🗑) icon to remove it permanently.',
      },
      {
        q: 'What is the "Shortlist renter" feature?',
        a: 'When chatting with a renter, switch to Host View inside the chat and tap "Shortlist renter" to save that enquiry. You can review all shortlisted renters in your Dashboard.',
      },
      {
        q: 'Can I specify preferred tenants?',
        a: 'Yes. When posting a listing you can indicate nationality preferences, gender preference, pet policy, and smoking policy.',
      },
      {
        q: 'How do I edit a listing after posting?',
        a: 'Listing editing is coming soon. For now, remove the old listing and repost with updated details.',
      },
    ],
  },
};

function FAQSection({ section }: { section: typeof faqs.renter }) {
  return (
    <div id={section.id} className="mb-12">
      <h2 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
        {section.title}
      </h2>
      <div className="space-y-4">
        {section.items.map((item) => (
          <details
            key={item.q}
            className="group bg-white border border-slate-200 rounded-xl overflow-hidden"
          >
            <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none font-medium text-slate-800 hover:text-teal-700 transition-colors">
              {item.q}
              <ChevronDown className="w-4 h-4 shrink-0 text-slate-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-5 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Frequently Asked Questions</h1>
        <p className="text-slate-500">Everything you need to know about FlatmateFind.</p>
      </div>

      {/* Jump links */}
      <div className="flex gap-3 mb-10 justify-center flex-wrap">
        <a href="#renter" className="px-4 py-2 bg-teal-50 text-teal-700 text-sm font-medium rounded-full border border-teal-200 hover:bg-teal-100 transition-colors">
          For Renters
        </a>
        <a href="#subletter" className="px-4 py-2 bg-teal-50 text-teal-700 text-sm font-medium rounded-full border border-teal-200 hover:bg-teal-100 transition-colors">
          For Subletters
        </a>
      </div>

      <FAQSection section={faqs.renter} />
      <FAQSection section={faqs.subletter} />

      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 text-center">
        <p className="text-sm text-slate-700 mb-3">Still have a question?</p>
        <Link href="/contact" className="inline-flex items-center gap-2 bg-teal-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-teal-700 transition-colors">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
