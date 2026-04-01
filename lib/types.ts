export interface Listing {
  id: string;
  title: string;
  type: 'apartment' | 'house' | 'studio' | 'villa' | 'penthouse' | 'townhouse' | 'serviced apartment' | 'co-living';
  price: number;
  currency: string;
  location: {
    city: string;
    neighborhood: string;
    country: string;
    address: string;
  };
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  amenities: string[];
  description: string;
  nationalityCommunities: string[];
  available: boolean;
  availableFrom: string;
  owner: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  rating: number;
  reviews: number;
  featured: boolean;
}

export interface SearchFilters {
  query?: string;
  type?: 'apartment' | 'house' | 'studio' | 'villa' | 'penthouse' | 'townhouse' | 'serviced apartment' | 'co-living' | '';
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  nationalityCommunities?: string[];
  amenities?: string[];
}

export interface AISearchResult {
  filters: SearchFilters;
  explanation: string;
  listings: Listing[];
}
