'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Heart, MessageCircle, Users, Euro } from 'lucide-react';

interface MenuDetail {
  id: string;
  name: string;
  description: string;
  price: number;
  courses: {
    type: string;
    dishes: string[];
  }[];
  dietary: string[];
  servings: string;
}

const SAMPLE_MENUS: MenuDetail[] = [
  {
    id: '1',
    name: '3 course supper',
    description: 'Un dîner élégant en trois services pour une soirée mémorable',
    price: 85,
    servings: '2-12 personnes',
    dietary: ['Végétarien disponible', 'Sans gluten sur demande'],
    courses: [
      {
        type: 'Entrée',
        dishes: [
          'Tartare de saumon fumé, avocat et crème citronnée',
          'Salade de chèvre chaud sur toast de noix',
        ],
      },
      {
        type: 'Plat principal',
        dishes: [
          'Magret de canard rôti, sauce au miel et thym',
          'Risotto aux cèpes et parmesan',
          'Légumes de saison rôtis',
        ],
      },
      {
        type: 'Dessert',
        dishes: [
          'Fondant au chocolat coulant',
          'Tarte tatin maison avec glace vanille',
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'A taste of France',
    description: 'Voyage culinaire à travers les régions françaises',
    price: 95,
    servings: '2-10 personnes',
    dietary: ['Options végétariennes'],
    courses: [
      {
        type: 'Amuse-bouche',
        dishes: ['Gougères au comté'],
      },
      {
        type: 'Entrée',
        dishes: [
          'Foie gras mi-cuit, chutney de figues',
          'Soupe à l\'oignon gratinée',
        ],
      },
      {
        type: 'Plat principal',
        dishes: [
          'Boeuf bourguignon traditionnel',
          'Gratin dauphinois',
          'Haricots verts au beurre',
        ],
      },
      {
        type: 'Fromage',
        dishes: ['Plateau de fromages français affinés'],
      },
      {
        type: 'Dessert',
        dishes: ['Crème brûlée à la vanille de Madagascar'],
      },
    ],
  },
  {
    id: '3',
    name: 'A taste of Italy',
    description: 'Authenticité italienne avec des produits d\'exception',
    price: 90,
    servings: '2-12 personnes',
    dietary: ['Végétarien', 'Vegan sur demande'],
    courses: [
      {
        type: 'Antipasti',
        dishes: [
          'Burrata crémeuse, tomates anciennes et basilic',
          'Carpaccio de boeuf, roquette et copeaux de parmesan',
        ],
      },
      {
        type: 'Primi',
        dishes: [
          'Tagliatelles fraîches aux truffes noires',
          'Risotto aux fruits de mer',
        ],
      },
      {
        type: 'Secondi',
        dishes: [
          'Osso buco à la milanaise',
          'Légumes grillés à l\'huile d\'olive',
        ],
      },
      {
        type: 'Dolci',
        dishes: [
          'Tiramisu traditionnel',
          'Panna cotta aux fruits rouges',
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Asian fusion',
    description: 'Fusion créative des saveurs asiatiques',
    price: 88,
    servings: '2-10 personnes',
    dietary: ['Sans gluten', 'Options végétariennes'],
    courses: [
      {
        type: 'Entrée',
        dishes: [
          'Gyoza aux légumes croustillants',
          'Salade de papaye verte',
          'Rouleaux de printemps frais',
        ],
      },
      {
        type: 'Plat principal',
        dishes: [
          'Boeuf sauté au basilic thaï',
          'Curry rouge de crevettes',
          'Riz jasmin parfumé',
          'Légumes sautés au wok',
        ],
      },
      {
        type: 'Dessert',
        dishes: [
          'Mochi glacé assortis',
          'Mangue sticky rice',
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'BBQ Experience',
    description: 'Barbecue gourmet avec viandes marinées et accompagnements',
    price: 75,
    servings: '4-15 personnes',
    dietary: ['Options végétariennes'],
    courses: [
      {
        type: 'Entrée',
        dishes: [
          'Salade coleslaw maison',
          'Bruschettas grillées variées',
        ],
      },
      {
        type: 'Plat principal',
        dishes: [
          'Côtes de boeuf marinées 24h',
          'Travers de porc caramélisés',
          'Brochettes de poulet satay',
          'Légumes grillés',
          'Pommes de terre au four',
        ],
      },
      {
        type: 'Dessert',
        dishes: ['Brownies au chocolat'],
      },
    ],
  },
  {
    id: '6',
    name: 'Seafood Experience',
    description: 'Produits de la mer ultra-frais cuisinés avec finesse',
    price: 110,
    servings: '2-8 personnes',
    dietary: ['Sans gluten sur demande'],
    courses: [
      {
        type: 'Entrée',
        dishes: [
          'Plateau de fruits de mer',
          'Tartare de thon rouge',
        ],
      },
      {
        type: 'Plat principal',
        dishes: [
          'Loup de mer en croûte de sel',
          'Saint-Jacques poêlées, purée de panais',
          'Risotto à l\'encre de seiche',
        ],
      },
      {
        type: 'Dessert',
        dishes: ['Mousse citron-yuzu'],
      },
    ],
  },
];

export function SampleMenusDialog() {
  const [listOpen, setListOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuDetail | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleMenuClick = (menu: MenuDetail) => {
    setSelectedMenu(menu);
    setListOpen(false);
    setDetailOpen(true);
  };

  return (
    <>
      <Dialog open={listOpen} onOpenChange={setListOpen}>
        <DialogTrigger asChild>
          <div className="space-y-2">
            {SAMPLE_MENUS.slice(0, 5).map((menu) => (
              <button
                key={menu.id}
                onClick={() => handleMenuClick(menu)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold">
                    {menu.name[0]}
                  </div>
                  <div>
                    <div className="font-medium">{menu.name}</div>
                    <div className="text-sm text-slate-500">{menu.price}€/pers</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </button>
            ))}
            <Button
              variant="link"
              className="text-orange-600 hover:text-orange-700"
              onClick={(e) => {
                e.preventDefault();
                setListOpen(true);
              }}
            >
              Voir tous les menus ({SAMPLE_MENUS.length})
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Tous les menus</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {SAMPLE_MENUS.map((menu) => (
              <button
                key={menu.id}
                onClick={() => handleMenuClick(menu)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold">
                    {menu.name[0]}
                  </div>
                  <div>
                    <div className="font-medium">{menu.name}</div>
                    <div className="text-sm text-slate-500">{menu.price}€/pers</div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-400" />
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedMenu && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedMenu.name}</DialogTitle>
                <p className="text-slate-600 mt-2">{selectedMenu.description}</p>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Euro className="h-5 w-5 text-orange-500" />
                    <span className="font-semibold">{selectedMenu.price}€/personne</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-slate-400" />
                    <span>{selectedMenu.servings}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedMenu.dietary.map((diet) => (
                    <Badge key={diet} variant="secondary">
                      {diet}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-6">
                  {selectedMenu.courses.map((course, idx) => (
                    <div key={idx} className="border-l-4 border-orange-500 pl-4">
                      <h3 className="font-bold text-lg mb-3 text-orange-600">
                        {course.type}
                      </h3>
                      <ul className="space-y-2">
                        {course.dishes.map((dish, dishIdx) => (
                          <li key={dishIdx} className="flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span>
                            <span className="text-slate-700">{dish}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() => {
                      alert('Menu ajouté aux favoris!');
                    }}
                  >
                    <Heart className="h-4 w-4" />
                    Ajouter aux favoris
                  </Button>
                  <Button
                    className="flex-1 gap-2 bg-orange-500 hover:bg-orange-600"
                    onClick={() => {
                      setDetailOpen(false);
                      alert('Ouverture de la messagerie avec le chef...');
                    }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    Envoyer un message
                  </Button>
                </div>

                <p className="text-center text-sm text-slate-500">
                  Ce menu peut être personnalisé selon vos préférences
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
