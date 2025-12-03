export interface ChefFilterParams {
  city?: string;
  cuisines?: string;
  maxPrice?: string;
  minRating?: string;
  verified?: string;
  sort?: string;
}

export function buildChefQuery(params: ChefFilterParams) {
  const filters: Record<string, unknown> = {
    available: true,
  };

  if (params.city) {
    filters.location = params.city;
  }

  if (params.maxPrice) {
    filters.price_per_person = { lte: parseInt(params.maxPrice) * 100 };
  }

  if (params.minRating) {
    filters.rating = { gte: parseFloat(params.minRating) };
  }

  if (params.verified === 'true') {
    filters.verified = true;
  }

  return filters;
}

export function getOrderByClause(sort?: string): { column: string; ascending: boolean } {
  switch (sort) {
    case 'price-asc':
      return { column: 'price_per_person', ascending: true };
    case 'price-desc':
      return { column: 'price_per_person', ascending: false };
    case 'rating':
      return { column: 'rating', ascending: false };
    case 'newest':
      return { column: 'created_at', ascending: false };
    default:
      return { column: 'rating', ascending: false };
  }
}

export const CUISINE_TYPES = [
  'Française',
  'Italienne',
  'Japonaise',
  'Asiatique',
  'Fusion',
  'Méditerranéenne',
  'Orientale',
  'Végétarienne',
  'Végane',
] as const;

export const CITIES = [
  'Paris',
  'Lyon',
  'Marseille',
  'Bordeaux',
  'Nice',
  'Toulouse',
  'Nantes',
  'Lille',
] as const;
