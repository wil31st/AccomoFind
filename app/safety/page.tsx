import Link from 'next/link';
import { AlertTriangle, ShieldCheck, Eye, DollarSign, Phone, Flag } from 'lucide-react';

const tips = [
  {
    icon: Eye,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    title: 'Always inspect in person',
    points: [
      'Never rent a property you have not physically visited.',
      'If the host refuses or keeps delaying an inspection, walk away.',
      'Bring a friend or family member when visiting for the first time.',
      'Inspect at different times of day to check noise and lighting.',
    ],
  },
  {
    icon: DollarSign,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    title: 'Protect your money',
    points: [
      'Never transfer a deposit or rent before signing a written lease.',
      'Be very suspicious of any request to pay via gift cards, crypto, or wire transfer.',
      'If the rent seems unusually cheap for the area, verify before proceeding.',
      'Use bank transfer with a clear description; keep all receipts.',
    ],
  },
  {
    icon: ShieldCheck,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    title: 'Verify the listing and landlord',
    points: [
      'Look up the address on Google Maps and cross-check with real estate sites.',
      'Ask to see proof of ownership or the landlord\'s permission to sublet.',
      'Search the host\'s name and phone number online before meeting.',
      'Listings with a "Verified" badge have passed our basic identity check.',
    ],
  },
  {
    icon: Phone,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    title: 'Keep communication safe',
    points: [
      'Use FlatmateFind\'s in-app chat — avoid moving conversations to personal messaging apps early on.',
      'Do not share your home address, bank details, or passport number with a host before signing.',
      'Trust your instincts — if something feels off, it probably is.',
    ],
  },
  {
    icon: Flag,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    title: 'Spot the red flags',
    points: [
      'The host claims to be overseas and cannot meet in person.',
      'You are asked to pay a holding deposit before viewing.',
      'The listing photos look professional but the asking price is far below market.',
      'Pressure to decide quickly or "someone else is interested right now".',
      'Requests to keep the arrangement off-platform or off the books.',
    ],
  },
];

export default function SafetyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="mb-10 text-center">
        <div className="inline-flex p-3 bg-amber-100 rounded-full mb-4">
          <AlertTriangle className="w-7 h-7 text-amber-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Safety Tips</h1>
        <p className="text-slate-500 max-w-xl mx-auto">
          Your safety is our top priority. Follow these guidelines every time you search for or offer accommodation.
        </p>
      </div>

      <div className="space-y-6 mb-12">
        {tips.map((tip) => (
          <div key={tip.title} className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2.5 rounded-xl ${tip.bg}`}>
                <tip.icon className={`w-5 h-5 ${tip.color}`} />
              </div>
              <h2 className="font-bold text-slate-900">{tip.title}</h2>
            </div>
            <ul className="space-y-2">
              {tip.points.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Report box */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
        <h3 className="font-bold text-slate-900 mb-2">Encountered a suspicious listing?</h3>
        <p className="text-sm text-slate-600 mb-4">
          Report it to us immediately. We investigate all reports and remove fraudulent listings as quickly as possible.
        </p>
        <Link href="/contact" className="inline-flex items-center gap-2 bg-red-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-red-700 transition-colors">
          Report a listing
        </Link>
      </div>
    </div>
  );
}
