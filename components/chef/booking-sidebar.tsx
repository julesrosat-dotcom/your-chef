import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Calendar, Users, Shield } from 'lucide-react';

interface BookingSidebarProps {
  chef: {
    id: string;
    slug: string;
    pricePerPerson: number;
    user: { name: string };
  };
}

export function BookingSidebar({ chef }: BookingSidebarProps) {
  const priceInEuros = chef.pricePerPerson / 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Réserver {chef.user.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-slate-50 rounded-lg">
          <div className="text-sm text-slate-600">À partir de</div>
          <div className="text-3xl font-bold text-orange-600">{priceInEuros}€</div>
          <div className="text-sm text-slate-600">par personne</div>
        </div>

        <div className="space-y-3">
          <div>
            <Label>Nombre de convives</Label>
            <Input type="number" placeholder="Ex: 8" min="2" defaultValue="6" />
          </div>

          <div>
            <Label>Date souhaitée</Label>
            <Input type="date" />
          </div>
        </div>

        <Button asChild size="lg" className="w-full bg-orange-500 hover:bg-orange-600">
          <Link href={`/booking/new?chefId=${chef.id}`}>
            <Calendar className="mr-2 h-5 w-5" />
            Réserver maintenant
          </Link>
        </Button>

        <Button asChild variant="outline" size="lg" className="w-full">
          <Link href={`/chefs/${chef.slug}/contact`}>
            Contacter le chef
          </Link>
        </Button>

        <div className="pt-4 border-t space-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-600" />
            <span>Paiement sécurisé</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-green-600" />
            <span>Annulation gratuite jusqu'à 7 jours avant</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-green-600" />
            <span>Chef vérifié et assuré</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
