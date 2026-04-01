import { listings } from '@/data/listings';
import { Listing, SearchFilters } from '@/lib/types';

export function filterListings(filters: SearchFilters): Listing[] {
  return listings.filter((listing) => {
    if (filters.type && listing.type !== filters.type) return false;

    if (
      filters.city &&
      !listing.location.city.toLowerCase().includes(filters.city.toLowerCase())
    )
      return false;

    if (filters.minPrice && listing.price < filters.minPrice) return false;
    if (filters.maxPrice && listing.price > filters.maxPrice) return false;

    if (filters.minBedrooms && listing.bedrooms < filters.minBedrooms) return false;

    if (
      filters.nationalityCommunities &&
      filters.nationalityCommunities.length > 0
    ) {
      const hasMatch = filters.nationalityCommunities.some((nc) =>
        listing.nationalityCommunities.some((lnc) =>
          lnc.toLowerCase() === nc.toLowerCase()
        )
      );
      if (!hasMatch) return false;
    }

    if (filters.amenities && filters.amenities.length > 0) {
      const hasAll = filters.amenities.every((a) =>
        listing.amenities.some((la) =>
          la.toLowerCase().includes(a.toLowerCase())
        )
      );
      if (!hasAll) return false;
    }

    return true;
  });
}

export function getListingById(id: string): Listing | undefined {
  return listings.find((l) => l.id === id);
}

export function getSimilarListings(listing: Listing, count = 3): Listing[] {
  return listings
    .filter(
      (l) =>
        l.id !== listing.id &&
        (l.type === listing.type || l.location.city === listing.location.city)
    )
    .slice(0, count);
}
