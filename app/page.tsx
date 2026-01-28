'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Star, Heart, CheckCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { ChefBookingForm } from '@/components/booking/chef-booking-form';

export default function Home() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  return (
    <>
      {showBookingForm && <ChefBookingForm onClose={() => setShowBookingForm(false)} />}
      <div className="bg-white">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Trouvez un chef privé pour votre prochain événement
              </h1>
              <p className="text-xl text-slate-600">
                Réservez des chefs vérifiés pour des expériences culinaires inoubliables à domicile
              </p>
              <Button
                onClick={() => setShowBookingForm(true)}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-lg px-8 py-6 h-auto"
              >
                Trouver un chef
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400"
                  alt="Cuisine"
                  className="rounded-2xl w-full aspect-square object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"
                  alt="Cuisine"
                  className="rounded-2xl w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className="space-y-3 pt-8">
                <img
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400"
                  alt="Cuisine"
                  className="rounded-2xl w-full aspect-[4/3] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
                  alt="Cuisine"
                  className="rounded-2xl w-full aspect-square object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">Un processus très simple</h2>
            <Heart className="h-6 w-6 text-red-500 fill-red-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600',
                title: 'Parcourez nos chefs',
                description:
                  'Recherchez des chefs selon le type de cuisine, la localisation et le budget',
              },
              {
                image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600',
                title: 'Envoyez une demande',
                description: 'Discutez directement avec les chefs de votre événement',
              },
              {
                image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=600',
                title: 'Réservez en toute confiance',
                description:
                  'Paiement sécurisé et avis vérifiés pour une tranquillité d’esprit',
              },
            ].map((step, idx) => (
              <Card key={idx} className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <h3 className="text-white font-bold text-xl">{step.title}</h3>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <p className="text-slate-600">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* REASONS / STATS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-2 text-center">
            Pourquoi réserver avec GetChef
          </h2>
          <p className="text-center text-slate-600 mb-12">🔥</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?w=600"
                alt="Cuisine"
                className="rounded-2xl w-full aspect-[4/3] object-cover"
              />
            </div>

            <div className="space-y-8">
              <div>
                <div className="text-5xl font-bold mb-2">18 693</div>
                <p className="text-slate-600">
                  Événements avec chef à domicile réalisés via GetChef
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Anniversaire</h3>
                <p className="text-slate-600">
                  Des anniversaires intimes aux grandes célébrations, nos chefs
                  personnalisent les menus pour un moment inoubliable.
                </p>
                <Button asChild variant="outline" className="mt-4">
                  <Link href="/chefs">Découvrir les chefs</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUISINES */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">
            Des menus personnalisés pour toutes les occasions
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {
                img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
                title: 'Gastronomie',
              },
              {
                img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400',
                title: 'Barbecue & Grill',
              },
              {
                img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
                title: 'Fusion asiatique',
              },
              {
                img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
                title: 'Italien',
              },
            ].map((item, idx) => (
              <div key={idx} className="relative rounded-xl overflow-hidden aspect-square">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <span className="text-white font-semibold">{item.title}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Découvrir toutes les cuisines
            </Button>
          </div>
        </div>
      </section>

      {/* CHEFS GRID TEASER */}
      <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-2 text-center">
            1 000+ chefs talentueux, passionnés par leur métier
          </h2>
          <p className="text-center text-white/80 mb-12">😍</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400"
                  alt={`Chef ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/chefs">Voir tous les chefs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-bold">Des chefs pour tous les budgets</h2>

            <div className="bg-slate-50 rounded-2xl p-8 inline-block">
              <div className="text-6xl font-bold mb-2">75€ - 120€</div>
              <p className="text-slate-600">par personne en moyenne</p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full bg-slate-300 border-2 border-white"
                  />
                ))}
              </div>
              <p className="text-slate-600">Des milliers de clients satisfaits</p>
            </div>

            <Button
              onClick={() => setShowBookingForm(true)}
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Trouver un chef
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Ce que nos clients disent de nous
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                name: 'SANDRA',
                rating: 5,
                review:
                  'Expérience incroyable du début à la fin. Le chef était professionnel, créatif et les plats étaient excellents.',
              },
              {
                name: 'REBECCA',
                rating: 5,
                review:
                  'Une soirée parfaite. Le chef était adorable, à l’écoute, et le repas exceptionnel.',
              },
              {
                name: 'MICHAEL',
                rating: 5,
                review:
                  'Service fantastique. Ponctuel, très professionnel et une cuisine au-delà de nos attentes.',
              },
              {
                name: 'CHRIS',
                rating: 5,
                review:
                  'Meilleure expérience culinaire à domicile. Parfait pour notre événement.',
              },
              {
                name: 'EMMA',
                rating: 5,
                review:
                  'De la réservation au dîner, tout était fluide. Nos invités ont adoré.',
              },
              {
                name: 'DAVID',
                rating: 5,
                review:
                  'Qualité exceptionnelle. Menu parfaitement adapté à nos goûts.',
              },
            ].map((testimonial, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="flex">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-orange-400 text-orange-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm">{testimonial.review}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST / SAFETY */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-6 text-slate-900">
                  On s’occupe de tout
                </h3>
                <ul className="space-y-4 text-slate-700">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-1" />
                    <span>Assurance complète</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-1" />
                    <span>Paiement sécurisé</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-1" />
                    <span>Support client 7j/7</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-1" />
                    <span>Chefs vérifiés</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-1" />
                    <span>Politique d’annulation flexible</span>
                  </li>
                </ul>
                <div className="mt-6">
                  <img
                    src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400"
                    alt="Cuisine"
                    className="rounded-xl w-full aspect-video object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold mb-6 text-slate-900">
                  Confiance & sécurité
                </h3>
                <p className="text-slate-700 mb-6">
                  Tous nos chefs sont rigoureusement vérifiés pour garantir votre
                  satisfaction.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">
                      Certifiés hygiène alimentaire
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-slate-700">Avis vérifiés</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Recevez les nouveautés chefs & menus près de chez vous
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers de passionnés de gastronomie
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <Input
              type="email"
              placeholder="Entrez votre email"
              className="bg-white text-slate-900 h-14"
            />
            <Button size="lg" variant="secondary" className="h-14 px-8">
              S’inscrire
            </Button>
          </div>
        </div>
      </section>

      {/* CITIES – FOND BLANC POUR ÉVITER LE TROP-PLEIN D’ORANGE */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">
              Trouvez le meilleur chef privé près de chez vous
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Paris',
                'Lyon',
                'Marseille',
                'Bordeaux',
                'Nice',
                'Toulouse',
                'Nantes',
                'Lille',
              ].map((city) => (
                <Button
                  key={city}
                  variant="outline"
                  className="border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                >
                  Chefs à {city}
                </Button>
              ))}
            </div>
            <Button
              asChild
              size="lg"
              className="bg-orange-500 text-white hover:bg-orange-600 mt-8"
            >
              <Link href="/chefs">Voir toutes les villes</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
