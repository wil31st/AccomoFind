import Image from 'next/image';
import Link from 'next/link';
import { Bed, Bath, Maximize, Star, BadgeCheck } from 'lucide-react';
import { Listing } from '@/lib/types';
import { CURRENCIES } from '@/data/listings';
import clsx from 'clsx';

interface ListingCardProps {
  listing: Listing;
  aiReason?: string;
}

export default function ListingCard({ listing, aiReason }: ListingCardProps) {
  const symbol = CURRENCIES[listing.currency] ?? listing.currency + ' ';

  return (
    <Link href={`/listings/${listing.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-1">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span
              className={clsx(
                'px-2.5 py-1 rounded-full text-xs font-semibold capitalize',
                listing.type === 'apartment' && 'bg-indigo-600 text-white',
                listing.type === 'house' && 'bg-emerald-600 text-white',
                listing.type === 'studio' && 'bg-violet-600 text-white',
                listing.type === 'villa' && 'bg-amber-600 text-white',
                listing.type === 'penthouse' && 'bg-rose-600 text-white',
                listing.type === 'townhouse' && 'bg-teal-600 text-white',
                listing.type === 'serviced apartment' && 'bg-blue-600 text-white',
                listing.type === 'co-living' && 'bg-orange-500 text-white',
              )}
            >
              {listing.type}
            </span>
            {listing.featured && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400 text-amber-900">
                Featured
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-sm font-bold text-gray-900">
            {symbol}{listing.price.toLocaleString()}
            <span className="text-xs font-normal text-gray-500">/mo</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-base leading-snug line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {listing.title}
          </h3>

          {/* Location */}
          <p className="mt-1 text-sm text-gray-500">
            {listing.location.neighborhood}, {listing.location.city}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-gray-400" />
              {listing.bedrooms} bed{listing.bedrooms !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-gray-400" />
              {listing.bathrooms} bath{listing.bathrooms !== 1 ? 's' : ''}
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize className="w-4 h-4 text-gray-400" />
              {listing.area} m²
            </span>
          </div>

          {/* Nationality tags */}
          {listing.nationalityCommunities.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {listing.nationalityCommunities.slice(0, 3).map((nc) => (
                <span
                  key={nc}
                  className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium"
                >
                  {nc} community
                </span>
              ))}
              {listing.nationalityCommunities.length > 3 && (
                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full text-xs">
                  +{listing.nationalityCommunities.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* AI reason */}
          {aiReason && (
            <div className="mt-3 p-2 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-xs text-indigo-700">
                <span className="font-semibold">AI: </span>
                {aiReason}
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
            <div className="flex items-center gap-1.5">
              <div className="relative w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={listing.owner.avatar}
                  alt={listing.owner.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xs text-gray-600">{listing.owner.name}</span>
              {listing.owner.verified && (
                <BadgeCheck className="w-4 h-4 text-indigo-500" />
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-xs font-semibold text-gray-700">{listing.rating}</span>
              <span className="text-xs text-gray-400">({listing.reviews})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
