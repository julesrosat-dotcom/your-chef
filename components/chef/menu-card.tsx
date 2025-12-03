import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface MenuCardProps {
  menu: {
    id: string;
    name: string;
    description: string;
    price: number;
    servings: number;
    images: string[];
    dietaryInfo: string[];
    courses: Array<{
      type: string;
      name: string;
      description: string;
    }>;
  };
  chefSlug: string;
}

export function MenuCard({ menu, chefSlug }: MenuCardProps) {
  const priceInEuros = menu.price / 100;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        {menu.images[0] && (
          <div className="w-full md:w-48 h-48 shrink-0">
            <img
              src={menu.images[0]}
              alt={menu.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{menu.name}</CardTitle>
                <CardDescription>{menu.description}</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600">{priceInEuros}€</div>
                <div className="text-sm text-slate-600">pour {menu.servings} pers.</div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              {menu.courses.map((course, index) => (
                <div key={index}>
                  <div className="font-semibold text-sm text-orange-600">{course.type}</div>
                  <div className="font-medium">{course.name}</div>
                  <div className="text-sm text-slate-600">{course.description}</div>
                </div>
              ))}
            </div>

            {menu.dietaryInfo.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {menu.dietaryInfo.map(info => (
                  <Badge key={info} variant="outline">{info}</Badge>
                ))}
              </div>
            )}

            <Button asChild className="w-full bg-orange-500 hover:bg-orange-600">
              <Link href={`/booking/new?chefId=${chefSlug}&menuId=${menu.id}`}>
                Choisir ce menu
              </Link>
            </Button>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
