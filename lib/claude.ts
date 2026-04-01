import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export interface ParsedFilters {
  type?: 'apartment' | 'house' | '';
  city?: string;
  minBedrooms?: number;
  maxBedrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  nationalityCommunities?: string[];
  amenities?: string[];
  explanation: string;
}

export async function parseSearchQuery(query: string): Promise<ParsedFilters> {
  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `You are a rental property search assistant. All listings are for rent (not for sale). Parse the following natural language rental property search query and extract structured search filters.

Query: "${query}"

Available cities: London, Paris, New York, Dubai, Singapore, Barcelona
Available property types: apartment, house, studio, villa, penthouse, townhouse, serviced apartment, co-living
Available nationality communities: American, Australian, British, Brazilian, Canadian, Chinese, Dutch, Egyptian, Filipino, French, German, Indian, Irish, Israeli, Italian, Japanese, Korean, Lebanese, Pakistani, Russian, Saudi, Singaporean, Spanish, Swiss

Return a JSON object with these optional fields:
- type: one of "apartment", "house", "studio", "villa", "penthouse", "townhouse", "serviced apartment", "co-living" (only if specified)
- city: city name (only if mentioned or clearly implied)
- minBedrooms: minimum number of bedrooms (number)
- maxBedrooms: maximum number of bedrooms (number)
- minPrice: minimum monthly price (number, in local currency if mentioned)
- maxPrice: maximum monthly price (number, in local currency if mentioned)
- nationalityCommunities: array of nationality community names the user wants to be near
- amenities: array of amenities requested
- explanation: a short friendly sentence explaining what you understood from the query (always include this)

Return ONLY valid JSON, no other text.`,
      },
    ],
  });

  const textBlock = message.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    return { explanation: 'Showing all available properties.' };
  }

  try {
    // Strip markdown code fences if present
    const raw = textBlock.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(raw) as ParsedFilters;
    return parsed;
  } catch {
    return { explanation: 'Showing all available properties.' };
  }
}

export async function getAIRecommendationReason(
  listingTitle: string,
  listingDescription: string,
  searchQuery: string
): Promise<string> {
  const message = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 150,
    messages: [
      {
        role: 'user',
        content: `A user searched for: "${searchQuery}"

The following property was found: "${listingTitle}"
Description: "${listingDescription}"

Write a single short sentence (max 20 words) explaining why this property matches the user's search. Be specific and natural. No quotes.`,
      },
    ],
  });

  const textBlock = message.content.find((b) => b.type === 'text');
  return textBlock?.type === 'text'
    ? textBlock.text.trim()
    : 'Great match for your search criteria.';
}
