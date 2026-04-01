export interface Listing {
  id: string;
  title: string;
  type: 'private room' | 'whole apartment' | 'whole house' | 'studio' | 'shared room';
  location: {
    state: string;
    city: string;
    suburb: string;
    postcode: string;
    address: string;
    country: string;
  };
  rent: {
    amount: number;
    currency: string;
    period: 'week' | 'month';
  };
  inclusions: string[];
  bedrooms: number;
  bathrooms: number;
  currentOccupants: number;
  totalCapacity: number;
  furnished: 'furnished' | 'unfurnished' | 'partially furnished';
  facilities: string[];
  preferredNationality: string[];
  preferredGender: 'male' | 'female' | 'any';
  petsAllowed: boolean;
  smokingAllowed: boolean;
  availableFrom: string;
  minimumStay: string;
  images: string[];
  description: string;
  postedBy: {
    name: string;
    type: 'owner' | 'agent' | 'current tenant';
    responseTime: string;
    verified: boolean;
  };
  postedAt: string;
  featured?: boolean;
}

export interface SearchFilters {
  state?: string;
  city?: string;
  type?: string;
  minRent?: number;
  maxRent?: number;
  bedrooms?: number;
  furnished?: string;
  nationality?: string;
  gender?: string;
  petsAllowed?: boolean;
  query?: string;
}

export interface AustralianState {
  name: string;
  abbr: string;
  cities: string[];
}

export const AUSTRALIAN_STATES: AustralianState[] = [
  { name: 'New South Wales',          abbr: 'NSW', cities: ['Sydney', 'Newcastle', 'Wollongong', 'Central Coast', 'Wagga Wagga'] },
  { name: 'Victoria',                 abbr: 'VIC', cities: ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo', 'Shepparton'] },
  { name: 'Queensland',               abbr: 'QLD', cities: ['Brisbane', 'Gold Coast', 'Cairns', 'Sunshine Coast', 'Townsville', 'Toowoomba'] },
  { name: 'Western Australia',        abbr: 'WA',  cities: ['Perth', 'Fremantle', 'Mandurah', 'Bunbury', 'Geraldton'] },
  { name: 'South Australia',          abbr: 'SA',  cities: ['Adelaide', 'Mount Gambier', 'Whyalla', 'Port Augusta'] },
  { name: 'Tasmania',                 abbr: 'TAS', cities: ['Hobart', 'Launceston', 'Devonport', 'Burnie'] },
  { name: 'Australian Capital Territory', abbr: 'ACT', cities: ['Canberra'] },
  { name: 'Northern Territory',       abbr: 'NT',  cities: ['Darwin', 'Alice Springs', 'Katherine'] },
];

export const STATES = AUSTRALIAN_STATES.map((s) => s.abbr);

// Kept for backwards-compat (city filter in filter panel)
export const CITIES = AUSTRALIAN_STATES.flatMap((s) => s.cities);

export const PROPERTY_TYPES = ['private room', 'whole apartment', 'whole house', 'studio', 'shared room'] as const;

export const INCLUSIONS_LIST = ['Electricity', 'Water', 'Gas', 'Internet', 'Netflix', 'Cleaning service', 'Council tax'];

export const FACILITIES_LIST = ['Parking', 'Gym', 'Pool', 'Air conditioning', 'Dishwasher', 'Washing machine', 'Balcony', 'Garden', 'Storage', 'Security'];

export const NATIONALITIES = [
  'Afghan', 'American', 'Australian', 'Bangladeshi', 'British', 'Brazilian',
  'Canadian', 'Chinese', 'Filipino', 'French', 'German', 'Indian', 'Indonesian',
  'Irish', 'Italian', 'Japanese', 'Korean', 'Malaysian', 'Nepalese', 'New Zealander',
  'Pakistani', 'Singaporean', 'South African', 'Spanish', 'Sri Lankan',
  'Taiwanese', 'Thai', 'Vietnamese',
];
