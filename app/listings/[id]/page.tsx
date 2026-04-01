import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Bed, Bath, Maximize, Star, BadgeCheck, MapPin,
  ArrowLeft, Wifi, Car, TreePine, Dumbbell, Waves,
  ChevronRight,
} from 'lucide-react';
import clsx from 'clsx';
import { getListingById, getSimilarListings } from '@/lib/filterListings';
import { CURRENCIES } from '@/data/listings';
import ListingCard from '@/components/ListingCard';

const amenityIcons: Record<string, React.ElementType> = {
  WiFi: Wifi,
  Parking: Car,
  Garden: TreePine,
  Gym: Dumbbell,
  Pool: Waves,
};

export default function ListingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const listing = getListingById(params.id);
  if (!listing) notFound();

  const similar = getSimilarListings(listing, 3);
  const symbol = CURRENCIES[listing.currency] ?? listing.currency + ' ';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/listings" className="hover:text-indigo-600 transition-colors">Listings</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium truncate">{listing.title}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-3 lg:gap-10">
        {/* ── Left column ───────────────────────────────────────── */}
        <div className="lg:col-span-2">
          {/* Image gallery */}
          <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden mb-8">
            <div className="col-span-2 sm:col-span-1 relative h-72 sm:h-96">
              <Image
                src={listing.images[0]}
                alt={listing.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {listing.images[1] && (
              <div className="hidden sm:block relative h-96">
                <Image
                  src={listing.images[1]}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {/* Title + badges */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={clsx(
                  'px-2.5 py-1 text-xs font-semibold rounded-full capitalize text-white',
                  listing.type === 'apartment' && 'bg-indigo-600',
                  listing.type === 'house' && 'bg-emerald-600',
                  listing.type === 'studio' && 'bg-violet-600',
                  listing.type === 'villa' && 'bg-amber-600',
                  listing.type === 'penthouse' && 'bg-rose-600',
                  listing.type === 'townhouse' && 'bg-teal-600',
                  listing.type === 'serviced apartment' && 'bg-blue-600',
                  listing.type === 'co-living' && 'bg-orange-500',
                )}>
                  {listing.type}
                </span>
                {listing.featured && (
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {listing.title}
              </h1>
              <p className="flex items-center gap-1.5 mt-2 text-gray-500">
                <MapPin className="w-4 h-4" />
                {listing.location.address}, {listing.location.city},{' '}
                {listing.location.country}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-indigo-600">
                {symbol}{listing.price.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">per month</div>
            </div>
          </div>

          {/* Key stats */}
          <div className="grid grid-cols-3 gap-4 p-5 bg-gray-50 rounded-2xl mb-6">
            <div className="text-center">
              <Bed className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
              <div className="font-bold text-gray-900">{listing.bedrooms}</div>
              <div className="text-xs text-gray-500">Bedroom{listing.bedrooms !== 1 ? 's' : ''}</div>
            </div>
            <div className="text-center">
              <Bath className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
              <div className="font-bold text-gray-900">{listing.bathrooms}</div>
              <div className="text-xs text-gray-500">Bathroom{listing.bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div className="text-center">
              <Maximize className="w-6 h-6 text-indigo-500 mx-auto mb-1" />
              <div className="font-bold text-gray-900">{listing.area}</div>
              <div className="text-xs text-gray-500">m²</div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">About this property</h2>
            <p className="text-gray-600 leading-relaxed">{listing.description}</p>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {listing.amenities.map((a) => {
                const Icon = amenityIcons[a];
                return (
                  <span
                    key={a}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-sm text-gray-700"
                  >
                    {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                    {a}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Nationality communities */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Nearby Communities
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              Expat communities popular in this neighbourhood
            </p>
            <div className="flex flex-wrap gap-2">
              {listing.nationalityCommunities.map((nc) => (
                <Link
                  key={nc}
                  href={`/listings?nationalities=${encodeURIComponent(nc)}`}
                  className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-100 transition-colors"
                >
                  {nc} community
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right column ──────────────────────────────────────── */}
        <div className="mt-8 lg:mt-0">
          <div className="sticky top-24 space-y-4">
            {/* Owner card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Listed by</h3>
              <div className="flex items-center gap-3 mb-5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={listing.owner.avatar}
                    alt={listing.owner.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-gray-900">
                      {listing.owner.name}
                    </span>
                    {listing.owner.verified && (
                      <BadgeCheck className="w-4 h-4 text-indigo-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {listing.rating}
                    </span>
                    <span className="text-sm text-gray-400">
                      ({listing.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-5 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Available from</span>
                  <span className="font-medium text-gray-900">
                    {new Date(listing.availableFrom).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Monthly rent</span>
                  <span className="font-medium text-gray-900">
                    {symbol}{listing.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <button className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors">
                Contact Landlord
              </button>
              <button className="w-full mt-2 py-3 border border-indigo-200 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors">
                Schedule Viewing
              </button>
            </div>

            {/* AI search hint */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4">
              <p className="text-sm text-indigo-800 font-medium mb-1">
                ✨ Looking for something similar?
              </p>
              <p className="text-xs text-indigo-600 mb-3">
                Use AI search to describe exactly what you want.
              </p>
              <Link
                href="/listings"
                className="block text-center py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                AI Search
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Similar listings */}
      {similar.length > 0 && (
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Similar Properties</h2>
            <Link
              href="/listings"
              className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-800"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {similar.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="mt-10">
        <Link
          href="/listings"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all listings
        </Link>
      </div>
    </div>
  );
}
