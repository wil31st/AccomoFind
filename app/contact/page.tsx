import { Mail, MessageCircle, Flag, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const topics = [
  {
    icon: HelpCircle,
    bg: 'bg-blue-50',
    color: 'text-blue-600',
    title: 'General enquiries',
    desc: 'Questions about FlatmateFind, how it works, or your account.',
    email: 'hello@flatmatefind.com.au',
  },
  {
    icon: Flag,
    bg: 'bg-red-50',
    color: 'text-red-600',
    title: 'Report a listing',
    desc: 'Spotted a fraudulent, misleading, or inappropriate listing?',
    email: 'report@flatmatefind.com.au',
  },
  {
    icon: MessageCircle,
    bg: 'bg-teal-50',
    color: 'text-teal-600',
    title: 'Feedback & suggestions',
    desc: 'Help us improve — we genuinely read every message.',
    email: 'feedback@flatmatefind.com.au',
  },
  {
    icon: Mail,
    bg: 'bg-purple-50',
    color: 'text-purple-600',
    title: 'Privacy & legal',
    desc: 'Data access requests, privacy concerns, or legal notices.',
    email: 'legal@flatmatefind.com.au',
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Contact Us</h1>
        <p className="text-slate-500">We&apos;re a small team — we read every message and aim to reply within one business day.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {topics.map((t) => (
          <div key={t.title} className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2.5 rounded-xl ${t.bg}`}>
                <t.icon className={`w-5 h-5 ${t.color}`} />
              </div>
              <h2 className="font-semibold text-slate-900">{t.title}</h2>
            </div>
            <p className="text-sm text-slate-500 mb-3 leading-relaxed">{t.desc}</p>
            <a
              href={`mailto:${t.email}`}
              className="text-sm text-teal-600 font-medium hover:text-teal-800 transition-colors"
            >
              {t.email}
            </a>
          </div>
        ))}
      </div>

      {/* Response time note */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center text-sm text-slate-500">
        <p className="mb-2">
          <strong className="text-slate-700">Response time:</strong> We aim to reply within 1 business day (Mon – Fri, AEST).
        </p>
        <p>
          For common questions, check our{' '}
          <Link href="/faq" className="text-teal-600 hover:text-teal-800 font-medium">FAQ page</Link>{' '}
          first — it&apos;s likely already answered there.
        </p>
      </div>
    </div>
  );
}
