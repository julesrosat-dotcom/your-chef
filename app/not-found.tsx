import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChefHat, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="h-32 w-32 rounded-full bg-orange-100 flex items-center justify-center">
            <ChefHat className="h-16 w-16 text-orange-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-7xl font-bold text-orange-500">404</h1>
          <h2 className="text-3xl font-bold text-gray-900">Page non trouvée</h2>
          <p className="text-gray-600">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link href="/">Retour à l'accueil</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/chefs">
              <Search className="mr-2 h-4 w-4" />
              Voir nos chefs
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
