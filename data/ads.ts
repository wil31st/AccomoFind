/**
 * Ad configuration — edit this file to activate a live ad in any slot.
 *
 * HOW TO ADD AN AD:
 * 1. Receive the image file from the advertiser (JPG / PNG / WebP recommended).
 * 2. Save it to /public/ads/  e.g. /public/ads/my-advertiser-banner.jpg
 * 3. Find the slot below that matches where you want the ad to appear.
 * 4. Fill in `image`, `href`, and `alt` — then set `active: true`.
 * 5. Deploy. Done.
 *
 * Set `active: false` (or remove the values) to go back to the placeholder.
 *
 * SLOT IDs — used as the `slotId` prop on <AdSlot>:
 *   home-leaderboard       Homepage — below hero stats bar
 *   home-inline            Homepage — between listing cards
 *   listings-inline        Browse listings page — between cards
 *   listings-sidebar       Browse listings page — sidebar rectangle
 *   jobs-sidebar           Jobs board — sidebar rectangle
 *   listing-detail-bottom  Individual listing page — below details
 */

export interface LiveAd {
  active: boolean;
  image?: string;   // Path inside /public, e.g. '/ads/banner.jpg'
  href?: string;    // URL to open when the ad is clicked
  alt?: string;     // Descriptive alt text for accessibility
}

export const ADS: Record<string, LiveAd> = {
  'home-leaderboard': {
    active: false,
    // image: '/ads/home-leaderboard.jpg',
    // href: 'https://advertiser-website.com',
    // alt: 'Advertiser name — short description',
  },
  'home-inline': {
    active: false,
  },
  'listings-inline': {
    active: false,
  },
  'listings-sidebar': {
    active: false,
  },
  'jobs-sidebar': {
    active: false,
  },
  'listing-detail-bottom': {
    active: false,
  },
};
