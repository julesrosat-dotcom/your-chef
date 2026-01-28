import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Search, MessageCircle, Calendar, CreditCard, Star, Shield, Clock } from 'lucide-react';
import Link from 'next/link';
import { APP_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Comment réserver un Chef Privé - Guide complet',
  description: 'Découvrez comment réserver un chef privé en 3 étapes simples. Recherchez, échangez et réservez votre chef en toute confiance. Paiement sécurisé garanti.',
  alternates: {
    canonical: `${APP_URL}/how-it-works`,
  },
};

export default function HowItWorksPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Comment ça marche ?</h1>
            <p className="text-xl text-gray-600">
              Réserver un chef privé n&apos;a jamais été aussi simple
            </p>
          </div>

          <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-bold text-xl mb-4">
                  1
                </div>
                <h2 className="text-3xl font-bold mb-4">Recherchez votre chef</h2>
                <p className="text-gray-600 text-lg mb-6">
                  Utilisez notre moteur de recherche pour trouver le chef parfait. Filtrez par ville,
                  spécialité culinaire, budget et disponibilité. Consultez les profils détaillés,
                  les avis clients et les portfolios de plats.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Search className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <span>Plus de 500 chefs certifiés dans toute la France</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <span>Avis vérifiés de clients réels</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChefHat className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <span>Toutes les spécialités culinaires disponibles</span>
                  </li>
                </ul>
              </div>
              <Card className="bg-gradient-to-br from-orange-50 to-amber-50">
                <CardContent className="p-8">
                  <Search className="h-16 w-16 text-orange-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Recherche personnalisée</h3>
                  <p className="text-gray-600">
                    Notre algorithme vous propose les chefs les plus adaptés à vos besoins
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Card className="bg-gradient-to-br from-orange-50 to-amber-50 md:order-1">
                <CardContent className="p-8">
                  <MessageCircle className="h-16 w-16 text-orange-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Communication directe</h3>
                  <p className="text-gray-600">
                    Discutez librement avec votre chef pour personnaliser le menu
                  </p>
                </CardContent>
              </Card>
              <div className="md:order-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-bold text-xl mb-4">
                  2
                </div>
                <h2 className="text-3xl font-bold mb-4">Personnalisez votre menu</h2>
                <p className="text-gray-600 text-lg mb-6">
                  Communiquez directement avec le chef pour créer un menu sur mesure.
                  Partagez vos préférences, allergies et envies. Le chef vous proposera
                  des options adaptées à votre budget et au nombre de convives.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <MessageCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <span>Messagerie sécurisée intégrée</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Calendar className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <span>Proposition de menus personnalisés</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <span>Prise en compte des allergies et régimes spéciaux</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-bold text-xl mb-4">
                  3
                </div>
                <h2 className="text-3xl font-bold mb-4">Réservez et payez</h2>
                <p className="text-gray-600 text-lg mb-6">
                  Une fois le menu validé, réservez votre date en quelques clics.
                  Le paiement est sécurisé et vous bénéficiez d&apos;une garantie satisfaction.
                  Vous ne payez qu&apos;après validation du menu final.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CreditCard className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <span>Paiement sécurisé par carte bancaire</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <span>Garantie satisfaction ou remboursé</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <span>Annulation gratuite jusqu&apos;à 48h avant</span>
                  </li>
                </ul>
              </div>
              <Card className="bg-gradient-to-br from-orange-50 to-amber-50">
                <CardContent className="p-8">
                  <CreditCard className="h-16 w-16 text-orange-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Paiement sécurisé</h3>
                  <p className="text-gray-600">
                    Transactions protégées et cryptées pour votre tranquillité
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <Card className="bg-gradient-to-br from-orange-50 to-amber-50 md:order-1">
                <CardContent className="p-8">
                  <ChefHat className="h-16 w-16 text-orange-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Expérience premium</h3>
                  <p className="text-gray-600">
                    Le chef s&apos;occupe de tout, de l&apos;achat des ingrédients au nettoyage
                  </p>
                </CardContent>
              </Card>
              <div className="md:order-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 font-bold text-xl mb-4">
                  4
                </div>
                <h2 className="text-3xl font-bold mb-4">Profitez de l&apos;expérience</h2>
                <p className="text-gray-600 text-lg mb-6">
                  Le jour J, le chef arrive chez vous avec tous les ingrédients et le matériel nécessaire.
                  Il prépare les plats dans votre cuisine, vous explique les recettes si vous le souhaitez,
                  et nettoie tout avant de partir. Vous n&apos;avez qu&apos;à profiter !
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <ChefHat className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <span>Le chef apporte tous les ingrédients frais</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <span>Préparation sur place dans votre cuisine</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-orange-600 flex-shrink-0 mt-1" />
                    <span>Nettoyage complet après le service</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 bg-gradient-to-br from-orange-600 to-amber-600 text-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
            <p className="text-xl mb-8 opacity-90">
              Trouvez le chef parfait pour votre prochain événement
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button asChild size="lg" variant="secondary">
                <Link href="/chefs">Découvrir nos chefs</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-orange-600">
                <Link href="/auth/signin">Créer un compte</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
