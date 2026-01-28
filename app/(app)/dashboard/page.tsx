'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Heart, Shield, ChevronRight, FileText, Star } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/hooks/use-user';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { user, profile, loading } = useUser();

  const firstName = profile?.full_name?.split(' ')[0] || 'Client';

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-64 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Les événements de {firstName} 🎉</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                <Button
                  variant="outline"
                  className="flex-1 text-left justify-start"
                >
                  À venir (0)
                </Button>
                <Button
                  variant="ghost"
                  className="flex-1 text-left justify-start text-gray-500"
                >
                  Complétés (0)
                </Button>
                <Button
                  variant="ghost"
                  className="text-gray-500"
                >
                  Désactivés (0)
                </Button>
              </div>

              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
                  <FileText className="w-full h-full" />
                </div>
                <h3 className="font-semibold mb-2">Aucune demande active</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Demandez un devis et recevez des menus et prix personnalisés de chefs locaux
                </p>
                <Button
                  asChild
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Link href="/">Commencer</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Rappels d'anniversaire
                    </h3>
                    <p className="text-sm text-gray-600">
                      Ajoutez les anniversaires de vos proches 🎂
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">
                  Recevez un rappel quelques semaines avant l'anniversaire pour vous laisser le temps d'organiser un dîner surprise pour eux
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Aucun menu sauvegardé
                    </h3>
                    <p className="text-sm text-gray-600">
                      Explorez les menus des chefs
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
              <h3 className="font-bold text-xl mb-6">Pourquoi GetChef ?</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-1">1000+ chefs au choix</h4>
                  <p className="text-sm text-gray-700">
                    Nous travaillons avec les meilleurs chefs privés qui ont des compétences variées et une grande expérience
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">25000+ clients servis</h4>
                  <p className="text-sm text-gray-700">
                    Nous avons beaucoup de clients satisfaits qui ont apprécié leurs événements en invitant des chefs privés
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-1">Protection paiement</h4>
                  <p className="text-sm text-gray-700">
                    Vos paiements ne sont versés au chef par notre plateforme qu'après avoir organisé votre événement de manière satisfaisante
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Chefs recommandés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[1, 2].map((i) => (
              <Card key={i} className="border-gray-200 overflow-hidden">
                <div className="flex gap-4 p-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=200&h=200&fit=crop`}
                      alt="Chef"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-orange-500">★</span>
                          <span className="text-sm font-semibold">5.0</span>
                          <span className="text-xs text-gray-500">(10 avis)</span>
                        </div>
                        <h3 className="font-semibold">Chef {i === 1 ? 'Jean D.' : 'Marie L.'}</h3>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {i === 1 ? 'Meilleur Chef - Prix UK Italian Awards' : 'Cuisine française raffinée'}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      À partir de {i === 1 ? '£35pp' : '£40pp'} | {i === 1 ? '£200' : '£300'} min
                    </p>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full"
                  >
                    <Link href={`/chefs`}>
                      Voir le profil du chef →
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
            >
              <Link href="/chefs">Parcourir tous les chefs</Link>
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Menus recommandés</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              { name: 'Italian Extravaganza', price: '£40pp', chef: 'Derek C', rating: 4.9, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop', tag: 'Italien' },
              { name: '6 Course Exclusive Chef Tasting Menu', price: '£100pp', chef: 'Derek C', rating: 4.9, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop', tag: 'Fine Dining' },
              { name: '5 Course Caribbean Special', price: '£84pp', chef: 'Derek C', rating: 4.9, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop', tag: 'Caribbean' },
            ].map((menu, i) => (
              <Card key={i} className="border-gray-200 overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={menu.image}
                    alt={menu.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white px-3 py-1 rounded-full text-xs font-medium">
                      {menu.tag}
                    </span>
                  </div>
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{menu.name}</h3>
                  <p className="text-sm text-gray-900 font-medium mb-2">
                    À partir de {menu.price}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <img
                      src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=32&h=32&fit=crop"
                      alt={menu.chef}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-gray-600">{menu.chef}</span>
                    <span className="flex items-center gap-1 ml-auto">
                      <Star className="h-3 w-3 text-orange-500 fill-orange-500" />
                      {menu.rating}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button
              asChild
              variant="outline"
              size="lg"
            >
              <Link href="/chefs">Parcourir tous les menus</Link>
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold mb-6">Pourquoi réserver sur GetChef</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Votre argent est sécurisé</h3>
                <p className="text-sm text-gray-600">
                  Chez GetChef, tous les paiements sont conservés en séquestre jusqu'après votre événement. Cela garantit que vos fonds sont protégés, minimisant tout risque.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Flexibilité d'annulation & protection</h3>
                <p className="text-sm text-gray-600">
                  Si un chef annule, nous vous aiderons à trouver un nouveau chef et si ce n'est pas possible, vous recevrez un remboursement complet.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Couverture d'assurance responsabilité civile</h3>
                <p className="text-sm text-gray-600">
                  Tous les accidents causés par le chef lors d'un événement réservé sur GetChef sont couverts par notre police d'assurance responsabilité civile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
