"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (city) params.set('city', city);
    if (date) params.set('date', date);
    if (guests) params.set('guests', guests);

    router.push(`/chefs?${params.toString()}`);
  };

  return (
    <Card className="p-4 md:p-6 shadow-xl border-2 border-gray-100 bg-white">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5 pointer-events-none z-10" />
          <Input
            type="text"
            placeholder="Paris, Lyon, Marseille..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pl-11 h-12 text-base border-gray-200 focus:border-primary focus:ring-primary"
          />
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5 pointer-events-none z-10" />
          <Input
            type="date"
            placeholder="Date de l'événement"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="pl-11 h-12 text-base border-gray-200 focus:border-primary focus:ring-primary"
          />
        </div>

        <div className="relative">
          <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5 pointer-events-none z-10" />
          <Input
            type="number"
            placeholder="Nombre de convives"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="1"
            max="100"
            className="pl-11 h-12 text-base border-gray-200 focus:border-primary focus:ring-primary"
          />
        </div>

        <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all">
          <Search className="mr-2 h-5 w-5" />
          Rechercher
        </Button>
      </form>
    </Card>
  );
}
