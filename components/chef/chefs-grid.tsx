import { ChefCard } from '@/components/ui/chef-card';

interface Chef {
  id: string;
  slug: string;
  user: { name: string; image?: string | null };
  location: string;
  specialties: string[];
  cuisineTypes: string[];
  pricePerPerson: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  coverImage?: string | null;
  profileImage?: string | null;
}

interface ChefsGridProps {
  chefs: Chef[];
}

export function ChefsGrid({ chefs }: ChefsGridProps) {
  if (chefs.length === 0) {
    return (
      <div className="col-span-full text-center py-16">
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Aucun chef trouvé
          </h3>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche pour obtenir plus de
            résultats.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {chefs.map((chef, index) => (
        <div
          key={chef.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <ChefCard chef={chef} />
        </div>
      ))}
    </div>
  );
}
