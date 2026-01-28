import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ChefFilters } from '@/components/chef/chef-filters';
import { ChefsGrid } from '@/components/chef/chefs-grid';
import { SkeletonCard } from '@/components/ui/skeleton-card';
import { SortSelect } from '@/components/chef/sort-select';
import { MobileFiltersButton } from '@/components/chef/mobile-filters-button';
import { Pagination } from '@/components/chef/pagination';
import { ChefSearchBar } from '@/components/search/chef-search-bar';
import { APP_NAME, APP_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Trouvez un Chef Privé près de chez vous',
  description: 'Parcourez notre sélection de chefs privés vérifiés. Cuisine française, italienne, japonaise... Trouvez le chef idéal pour votre événement à domicile.',
  alternates: {
    canonical: `${APP_URL}/chefs`,
  },
  openGraph: {
    title: 'Trouvez un Chef Privé près de chez vous',
    description: 'Parcourez notre sélection de chefs privés vérifiés partout en France.',
    url: `${APP_URL}/chefs`,
    type: 'website',
  },
};

const MOCK_CHEFS = [
  {
    id: '1',
    slug: 'pierre-gagnaire',
    user: { name: 'Pierre Gagnaire', image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400' },
    bio: 'Chef étoilé avec plus de 25 ans d\'expérience dans la haute gastronomie française.',
    specialties: ['Gastronomie française', 'Cuisine moléculaire', 'Haute cuisine'],
    cuisineTypes: ['Française', 'Moderne', 'Créative'],
    pricePerPerson: 12000,
    priceRange: '€€€€',
    location: 'Paris',
    rating: 4.9,
    reviewCount: 203,
    bookingCount: 87,
    verified: true,
    coverImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200',
    profileImage: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400',
    portfolioImages: [
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    ],
  },
  {
    id: '2',
    slug: 'sophie-chen',
    user: { name: 'Sophie Chen', image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400' },
    bio: 'Chef spécialisée dans la fusion asiatique-française.',
    specialties: ['Fusion asiatique', 'Cuisine japonaise', 'Moderne'],
    cuisineTypes: ['Asiatique', 'Fusion', 'Japonaise'],
    pricePerPerson: 8500,
    priceRange: '€€€',
    location: 'Lyon',
    rating: 4.8,
    reviewCount: 156,
    bookingCount: 65,
    verified: true,
    coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200',
    profileImage: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400',
    portfolioImages: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800',
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800',
    ],
  },
  {
    id: '3',
    slug: 'marco-bellini',
    user: { name: 'Marco Bellini', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400' },
    bio: 'Chef italien authentique, spécialiste des pâtes fraîches.',
    specialties: ['Cuisine italienne', 'Pâtes fraîches', 'Antipasti'],
    cuisineTypes: ['Italienne', 'Méditerranéenne'],
    pricePerPerson: 7500,
    priceRange: '€€€',
    location: 'Nice',
    rating: 4.9,
    reviewCount: 189,
    bookingCount: 92,
    verified: true,
    coverImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200',
    profileImage: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400',
    portfolioImages: [
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800',
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
    ],
  },
  {
    id: '4',
    slug: 'lea-dubois',
    user: { name: 'Léa Dubois', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
    bio: 'Passionnée par la cuisine végétarienne et végane.',
    specialties: ['Végétarien', 'Vegan', 'Healthy'],
    cuisineTypes: ['Végétarienne', 'Vegane', 'Bio'],
    pricePerPerson: 6500,
    priceRange: '€€',
    location: 'Bordeaux',
    rating: 4.7,
    reviewCount: 134,
    bookingCount: 71,
    verified: true,
    coverImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    portfolioImages: [
      'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800',
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=800',
    ],
  },
  {
    id: '5',
    slug: 'ahmed-el-fassi',
    user: { name: 'Ahmed El Fassi', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400' },
    bio: 'Explorateur culinaire, spécialisé en cuisine méditerranéenne.',
    specialties: ['Cuisine du monde', 'Méditerranéenne', 'Orientale'],
    cuisineTypes: ['Méditerranéenne', 'Orientale', 'Fusion'],
    pricePerPerson: 7000,
    priceRange: '€€',
    location: 'Marseille',
    rating: 4.8,
    reviewCount: 167,
    bookingCount: 78,
    verified: true,
    coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200',
    profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    portfolioImages: [
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800',
    ],
  },
  {
    id: '6',
    slug: 'julie-bernard',
    user: { name: 'Julie Bernard', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400' },
    bio: 'Cheffe pâtissière spécialisée dans les desserts gastronomiques.',
    specialties: ['Pâtisserie', 'Desserts', 'Chocolat'],
    cuisineTypes: ['Française', 'Pâtisserie'],
    pricePerPerson: 5500,
    priceRange: '€€',
    location: 'Paris',
    rating: 4.9,
    reviewCount: 142,
    bookingCount: 58,
    verified: true,
    coverImage: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=1200',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    portfolioImages: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800',
    ],
  },
];

interface SearchParams {
  city?: string;
  cuisines?: string;
  maxPrice?: string;
  minRating?: string;
  verified?: string;
  page?: string;
  sort?: string;
}

export default async function ChefsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  let filteredChefs = [...MOCK_CHEFS];

  if (searchParams.city) {
    filteredChefs = filteredChefs.filter(chef =>
      chef.location.toLowerCase().includes(searchParams.city!.toLowerCase())
    );
  }

  if (searchParams.cuisines) {
    const cuisines = searchParams.cuisines.split(',');
    filteredChefs = filteredChefs.filter(chef =>
      chef.cuisineTypes.some(type => cuisines.includes(type))
    );
  }

  if (searchParams.maxPrice) {
    const maxPrice = parseInt(searchParams.maxPrice) * 100;
    filteredChefs = filteredChefs.filter(chef => chef.pricePerPerson <= maxPrice);
  }

  if (searchParams.minRating) {
    const minRating = parseFloat(searchParams.minRating);
    filteredChefs = filteredChefs.filter(chef => chef.rating >= minRating);
  }

  if (searchParams.verified === 'true') {
    filteredChefs = filteredChefs.filter(chef => chef.verified);
  }

  if (searchParams.sort === 'price-asc') {
    filteredChefs.sort((a, b) => a.pricePerPerson - b.pricePerPerson);
  } else if (searchParams.sort === 'price-desc') {
    filteredChefs.sort((a, b) => b.pricePerPerson - a.pricePerPerson);
  } else {
    filteredChefs.sort((a, b) => b.rating - a.rating);
  }

  const totalCount = filteredChefs.length;

  const page = parseInt(searchParams.page || '1');
  const perPage = 12;
  const totalPages = Math.ceil(totalCount / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedChefs = filteredChefs.slice(startIndex, startIndex + perPage);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Find your perfect private chef</h1>
            <p className="text-slate-600">Discover talented chefs ready to create unforgettable experiences</p>
          </div>
          <ChefSearchBar />
        </div>
      </div>

      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600">{totalCount} chefs available</p>
            </div>
            <SortSelect />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-32">
              <ChefFilters />
            </div>
          </aside>

          <main className="flex-1">
            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            }>
              <ChefsGrid chefs={paginatedChefs} />
            </Suspense>

            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                totalChefs={totalCount}
              />
            )}
          </main>
        </div>
      </div>

      <MobileFiltersButton />
    </div>
  );
}
