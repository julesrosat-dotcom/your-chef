import Link from 'next/link';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface ChefCardProps {
  chef: {
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
  };
}

export function ChefCard({ chef }: ChefCardProps) {
  const priceInEuros = chef.pricePerPerson / 100;

  return (
    <Link href={`/chefs/${chef.slug}`}>
      <Card className="overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300">
        <div className="relative aspect-video">
          <img
            src={chef.coverImage || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'}
            alt={chef.user.name}
            className="w-full h-full object-cover"
          />

          {chef.verified && (
            <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              Vérifié
            </div>
          )}

          <div className="absolute -bottom-8 left-6">
            <Avatar className="h-20 w-20 border-4 border-white shadow-xl">
              <AvatarImage src={chef.user.image || undefined} />
              <AvatarFallback>{chef.user.name[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <CardContent className="pt-12 pb-6">
          <h3 className="text-2xl font-bold mb-1">{chef.user.name}</h3>

          <div className="flex items-center gap-1 text-slate-600 mb-3">
            <MapPin className="h-4 w-4" />
            <span>{chef.location}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {chef.specialties.slice(0, 3).map(specialty => (
              <Badge key={specialty} className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                {specialty}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(chef.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-slate-600">
              {chef.rating} • ({chef.reviewCount} avis)
            </span>
          </div>

          <div className="text-xl font-semibold text-slate-900">
            À partir de {priceInEuros}€/personne
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
