'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';

const CUISINE_TYPES = [
  'Française',
  'Italienne',
  'Japonaise',
  'Asiatique',
  'Fusion',
  'Méditerranéenne',
  'Orientale',
  'Végétarienne',
  'Vegane',
];

const CITIES = [
  'Paris',
  'Lyon',
  'Marseille',
  'Bordeaux',
  'Nice',
  'Toulouse',
  'Nantes',
  'Lille',
];

export function ChefFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [city, setCity] = useState(searchParams.get('city') || '');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(
    searchParams.get('cuisines')?.split(',').filter(Boolean) || []
  );
  const [maxPrice, setMaxPrice] = useState(
    parseInt(searchParams.get('maxPrice') || '200')
  );
  const [minRating, setMinRating] = useState(
    searchParams.get('minRating') || ''
  );
  const [verifiedOnly, setVerifiedOnly] = useState(
    searchParams.get('verified') === 'true'
  );

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (city) params.set('city', city);
    if (selectedCuisines.length > 0) {
      params.set('cuisines', selectedCuisines.join(','));
    }
    if (maxPrice < 200) params.set('maxPrice', maxPrice.toString());
    if (minRating) params.set('minRating', minRating);
    if (verifiedOnly) params.set('verified', 'true');

    router.push(`/chefs?${params.toString()}`);
  };

  const resetFilters = () => {
    setCity('');
    setSelectedCuisines([]);
    setMaxPrice(200);
    setMinRating('');
    setVerifiedOnly(false);
    router.push('/chefs');
  };

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  return (
    <div className="bg-white rounded-xl border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filtres</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-orange-600 hover:text-orange-700"
        >
          Réinitialiser
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Ville</Label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
        >
          <option value="">Toutes les villes</option>
          {CITIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <Label>Types de cuisine</Label>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {CUISINE_TYPES.map((cuisine) => (
            <div key={cuisine} className="flex items-center space-x-2">
              <Checkbox
                id={cuisine}
                checked={selectedCuisines.includes(cuisine)}
                onCheckedChange={() => toggleCuisine(cuisine)}
              />
              <label
                htmlFor={cuisine}
                className="text-sm cursor-pointer select-none"
              >
                {cuisine}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Prix max / personne</Label>
          <span className="text-sm font-semibold text-orange-600">
            {maxPrice}€
          </span>
        </div>
        <Slider
          value={[maxPrice]}
          onValueChange={([value]) => setMaxPrice(value)}
          min={50}
          max={200}
          step={10}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>50€</span>
          <span>200€</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Note minimum</Label>
        <select
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
        >
          <option value="">Toutes les notes</option>
          <option value="4.5">4.5★ et plus</option>
          <option value="4.0">4.0★ et plus</option>
          <option value="3.5">3.5★ et plus</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="verified">Chefs vérifiés uniquement</Label>
        <Switch
          id="verified"
          checked={verifiedOnly}
          onCheckedChange={setVerifiedOnly}
        />
      </div>

      <Button
        onClick={applyFilters}
        className="w-full bg-orange-500 hover:bg-orange-600"
      >
        Appliquer les filtres
      </Button>
    </div>
  );
}
