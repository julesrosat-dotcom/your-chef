'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const SAMPLE_MENUS = [
  '3 course supper',
  '4-6 x sum',
  'A taste of France',
  'A taste of Italy',
  'Anytime Brunch',
  'Asian fusion',
  'BBQ',
  'Curry night',
  'Family style',
  'Feast of French Cuisine',
  'Hot party cocktails and canapes',
  'Italian fusion',
  'Korean experience',
  'Lancashire Roast',
  'Memories Des Derek',
  'Meal prep',
  'Media Eastern feeder and Mezzes',
  'European feast',
  'Seafood experience',
  'Spanish Mediterranean sides',
  'Stag menu',
  'South and Whos experience',
  'Traditional Roast dinner',
];

export function SampleMenusDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="space-y-2">
          {SAMPLE_MENUS.slice(0, 5).map((menu) => (
            <button
              key={menu}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-semibold">
                  {menu[0]}
                </div>
                <span className="font-medium">{menu}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </button>
          ))}
          <Button variant="link" className="text-orange-600 hover:text-orange-700">
            Voir tous les menus ({SAMPLE_MENUS.length})
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Menus exemples</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {SAMPLE_MENUS.map((menu) => (
            <button
              key={menu}
              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-semibold">
                  {menu[0]}
                </div>
                <span className="font-medium">{menu}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
