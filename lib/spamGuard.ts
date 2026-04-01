// ── Spam & fraud keyword blocklist ──────────────────────────────────────────
const SPAM_PATTERNS = [
  // Payment fraud
  /wire\s*transfer/i,
  /western\s*union/i,
  /money\s*gram/i,
  /bitcoin|crypto|btc|eth\b/i,
  /gift\s*card/i,
  /paypal\.me/i,
  /send\s*money/i,
  /advance\s*(fee|payment)/i,

  // Too-good-to-be-true language
  /no\s*inspection\s*needed/i,
  /trust\s*me\s*i('m| am)/i,
  /100%\s*guarantee/i,
  /risk[\s-]free/i,

  // Overseas scam signals
  /i('m| am)\s+(currently\s+)?(overseas|abroad|in\s+(uk|usa|us|canada|europe))/i,
  /travelling\s+(for\s+work|abroad)/i,
  /keys?\s+will\s+be\s+(mailed|posted|sent)/i,

  // External contact / bypass platform
  /whatsapp\s*(me|only|number)/i,
  /text\s*(me\s*)?only/i,
  /contact\s*(me\s*)?via\s*(telegram|whatsapp)/i,
  /\bbit\.ly\b|\btinyurl\b|\bgoo\.gl\b/i,

  // Explicit scam phrases
  /first\s*month\s*free\s*then/i,
  /deposit\s*before\s*viewing/i,
  /urgent(ly)?\s*(need|looking|selling)/i,
  /God\s*bless/i,
];

export interface SpamCheckResult {
  flagged: boolean;
  reasons: string[];
}

export function checkSpam(text: string): SpamCheckResult {
  const reasons: string[] = [];
  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(text)) {
      // Convert the pattern to a human-readable label
      reasons.push(patternLabel(pattern));
    }
  }
  return { flagged: reasons.length > 0, reasons };
}

function patternLabel(p: RegExp): string {
  const src = p.source;
  if (/wire|western|moneygram|bitcoin|gift.card|paypal|send.money|advance/i.test(src))
    return 'Contains suspicious payment method references';
  if (/no.inspection|guarantee|risk/i.test(src))
    return 'Contains misleading guarantee language';
  if (/overseas|abroad|keys.*mail/i.test(src))
    return 'Host appears to be overseas — common scam signal';
  if (/whatsapp|telegram|text.only|bit\.ly|tinyurl/i.test(src))
    return 'Contains external contact bypass attempt';
  if (/deposit.before|urgent/i.test(src))
    return 'Contains pressure tactics or urgency language';
  return 'Suspicious content detected';
}

// ── Australian postcode validation ───────────────────────────────────────────
// AU postcodes: 0200–0999 (ACT/NT), 1000–9999 (states)
export function isValidAUPostcode(postcode: string): boolean {
  if (!/^\d{4}$/.test(postcode)) return false;
  const n = Number(postcode);
  return n >= 200 && n <= 9999;
}

// ── Rate limit checks (reads localStorage directly) ──────────────────────────
const POSTED_KEY = 'flatmatefind_posted_listings';

interface StoredListing { status: string; postedAt: string }

function getPosted(): StoredListing[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(POSTED_KEY) ?? '[]') as StoredListing[];
  } catch { return []; }
}

export function checkRateLimit(): { blocked: boolean; reason?: string } {
  const posted = getPosted();
  const activeCount = posted.filter((l) => l.status === 'active').length;

  if (activeCount >= 3) {
    return {
      blocked: true,
      reason: `You already have ${activeCount} active listings. Please pause or remove one before posting a new listing.`,
    };
  }

  if (posted.length > 0) {
    const lastPostedAt = new Date(posted[0].postedAt).getTime();
    const hoursSince = (Date.now() - lastPostedAt) / 3_600_000;
    if (hoursSince < 24) {
      const hoursLeft = Math.ceil(24 - hoursSince);
      return {
        blocked: true,
        reason: `You can only post once every 24 hours. Please wait ${hoursLeft} more hour${hoursLeft !== 1 ? 's' : ''}.`,
      };
    }
  }

  return { blocked: false };
}
