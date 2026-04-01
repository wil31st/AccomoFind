import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Users, BadgeCheck } from 'lucide-react';
import { Listing } from '@/lib/types';
import clsx from 'clsx';

interface ListingCardProps {
  listing: Listing;
}

const TYPE_COLORS: Record<string, string> = {
  'private room': 'bg-teal-600 text-white',
  'whole apartment': 'bg-blue-600 text-white',
  'whole house': 'bg-emerald-600 text-white',
  'studio': 'bg-violet-600 text-white',
  'shared room': 'bg-orange-500 text-white',
};

export default function ListingCard({ listing }: ListingCardProps) {
  const periodLabel = listing.rent.period === 'week' ? 'pw' : 'pm';

  return (
    <Link href={`/listings/${listing.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-slate-200 transition-all duration-200 hover:-translate-y-0.5">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className={clsx('px-2.5 py-1 rounded-full text-xs font-semibold capitalize', TYPE_COLORS[listing.type] ?? 'bg-slate-600 text-white')}>
              {listing.type}
            </span>
            {listing.featured && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400 text-amber-900">
                Featured
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-sm font-bold text-slate-900 shadow-sm">
            {listing.rent.currency} {listing.rent.amount.toLocaleString()}
            <span className="text-xs font-normal text-slate-500">/{periodLabel}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-slate-900 text-base leading-snug line-clamp-1 group-hover:text-teal-600 transition-colors">
            {listing.title}
          </h3>

          {/* Location */}
          <p className="mt-1 text-sm text-slate-500">
            {listing.location.suburb}, {listing.location.city}
          </p>

          {/* Key stats */}
          <div className="flex items-center gap-4 mt-3 text-sm text-slate-600">
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-slate-400" />
              {listing.bedrooms} bed{listing.bedrooms !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-slate-400" />
              {listing.bathrooms} bath{listing.bathrooms !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-slate-400" />
              {listing.currentOccupants}/{listing.totalCapacity}
            </span>
          </div>

          {/* Inclusions pills */}
          {listing.inclusions.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {listing.inclusions.slice(0, 3).map((inc) => (
                <span key={inc} className="px-2 py-0.5 bg-teal-50 text-teal-700 border border-teal-100 rounded-full text-xs font-medium">
                  {inc}
                </span>
              ))}
              {listing.inclusions.length > 3 && (
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full text-xs">
                  +{listing.inclusions.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer row */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-600">{listing.postedBy.name}</span>
              {listing.postedBy.verified && (
                <BadgeCheck className="w-3.5 h-3.5 text-teal-500" />
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <span className={clsx(
                'px-2 py-0.5 rounded-full text-xs font-medium',
                listing.furnished === 'furnished' ? 'bg-teal-50 text-teal-700' :
                listing.furnished === 'partially furnished' ? 'bg-amber-50 text-amber-700' :
                'bg-slate-100 text-slate-600'
              )}>
                {listing.furnished}
              </span>
              {listing.preferredNationality.length > 0 && (
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                  {listing.preferredNationality.length === 1
                    ? listing.preferredNationality[0]
                    : `${listing.preferredNationality.length} nationalities`}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
