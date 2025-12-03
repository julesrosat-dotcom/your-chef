'use client';

import { useState } from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export function ChefSearchBar() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [date, setDate] = useState<Date>();
  const [guests, setGuests] = useState(10);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('city', location);
    if (date) params.set('date', format(date, 'yyyy-MM-dd'));
    if (guests) params.set('guests', guests.toString());

    router.push(`/chefs?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-full shadow-xl border border-slate-200 p-2 flex items-center gap-2">
        <div className="flex-1 flex items-center gap-3 px-4 py-2 border-r border-slate-200">
          <MapPin className="h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Anywhere"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 outline-none text-slate-700 placeholder:text-slate-400 bg-transparent"
          />
        </div>

        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <button className="flex-1 flex items-center gap-3 px-4 py-2 border-r border-slate-200 text-left hover:bg-slate-50 rounded-lg transition-colors">
              <Calendar className="h-5 w-5 text-slate-400" />
              <span className={date ? 'text-slate-700' : 'text-slate-400'}>
                {date ? format(date, 'MMM dd, yyyy') : 'Any time'}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate);
                setIsCalendarOpen(false);
              }}
              initialFocus
              disabled={(date) => date < new Date()}
            />
          </PopoverContent>
        </Popover>

        <Popover open={isGuestsOpen} onOpenChange={setIsGuestsOpen}>
          <PopoverTrigger asChild>
            <button className="flex-1 flex items-center gap-3 px-4 py-2 text-left hover:bg-slate-50 rounded-lg transition-colors">
              <Users className="h-5 w-5 text-slate-400" />
              <span className="text-slate-700">
                {guests} guest{guests !== 1 ? 's' : ''}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="end">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Number of guests</label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="h-8 w-8 p-0"
                  >
                    -
                  </Button>
                  <span className="flex-1 text-center font-medium">{guests}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGuests(Math.min(50, guests + 1))}
                    className="h-8 w-8 p-0"
                  >
                    +
                  </Button>
                </div>
              </div>
              <Button
                onClick={() => setIsGuestsOpen(false)}
                className="w-full"
                size="sm"
              >
                Done
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Button
          onClick={handleSearch}
          size="lg"
          className="bg-primary hover:bg-primary/90 rounded-full px-8"
        >
          Search
        </Button>
      </div>
    </div>
  );
}
