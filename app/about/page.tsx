import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Target, Users, Award, ChefHat } from 'lucide-react';
import Link from 'next/link';
import { APP_NAME, APP_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: `À propos de ${APP_NAME} - Notre histoire`,
  description: `Découvrez ${APP_NAME}, la plateforme de réservation de chefs privés. Notre mission : démocratiser la gastronomie à domicile et créer des moments inoubliables.`,
  alternates: {
    canonical: `${APP_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">À propos de GetChef</h1>
            <p className="text-xl text-gray-600">
              Notre mission : rendre la gastronomie accessible à tous
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-16">
            <p className="text-lg text-gray-700 leading-relaxed">
              GetChef est né d&apos;une passion : celle de démocratiser l&apos;accès à la haute gastronomie
              et de créer des moments inoubliables autour de la table. Nous croyons que chacun mérite
              de vivre une expérience culinaire exceptionnelle, que ce soit pour célébrer un événement
              spécial ou simplement pour le plaisir de partager un repas raffiné avec ses proches.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                  <Heart className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Notre mission</h3>
                <p className="text-gray-600">
                  Connecter les meilleurs chefs avec ceux qui recherchent une expérience culinaire unique
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Notre vision</h3>
                <p className="text-gray-600">
                  Devenir la référence européenne de la réservation de chefs privés
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 text-orange-600 mb-4">
                  <Award className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Nos valeurs</h3>
                <p className="text-gray-600">
                  Excellence, passion, transparence et respect du travail artisanal
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Nos valeurs fondamentales</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <ChefHat className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Excellence culinaire</h3>
                  <p className="text-gray-600">
                    Nous sélectionnons rigoureusement nos chefs pour leur talent, leur créativité
                    et leur professionnalisme. Chaque chef est vérifié et certifié avant de rejoindre
                    notre plateforme.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Communauté</h3>
                  <p className="text-gray-600">
                    Nous créons des liens durables entre chefs et clients, favorisant les échanges
                    et le partage autour de la passion culinaire. Chaque réservation est une opportunité
                    de créer des souvenirs mémorables.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Passion</h3>
                  <p className="text-gray-600">
                    La gastronomie est un art qui mérite d&apos;être célébré. Nous mettons tout notre cœur
                    à faciliter l&apos;accès à cette passion et à valoriser le travail exceptionnel de nos chefs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Target className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Transparence</h3>
                  <p className="text-gray-600">
                    Tarifs clairs, avis authentiques, communication directe avec les chefs.
                    Nous croyons en une relation de confiance basée sur l&apos;honnêteté et la clarté.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Quelques chiffres</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">500+</div>
                <div className="text-gray-600">Chefs certifiés</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">10,000+</div>
                <div className="text-gray-600">Événements réalisés</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">4.9/5</div>
                <div className="text-gray-600">Note moyenne</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">98%</div>
                <div className="text-gray-600">Clients satisfaits</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-600 to-amber-600 text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Vous êtes chef ?</h2>
            <p className="text-xl mb-8 opacity-90">
              Rejoignez notre communauté et développez votre activité
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg" variant="secondary">
                <Link href="/chef-signup">Devenir chef partenaire</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-orange-600">
                <Link href="/chefs">Découvrir nos chefs</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
