'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Star, MapPin, Heart, Eye, CheckCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import { SampleMenusDialog } from '@/components/chef/sample-menus-dialog';
import { PhotoGallery } from '@/components/chef/photo-gallery';

const MOCK_CHEFS: Record<string, any> = {
  'pierre-gagnaire': {
    id: '1',
    slug: 'pierre-gagnaire',
    user: {
      name: 'Pierre Gagnaire',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400',
    },
    tagline: 'A organisé des événements pour de nombreuses célébrités',
    bio: 'Pierre est un chef privé expérimenté avec une passion pour créer des expériences culinaires inoubliables. Il dispose d\'une équipe talentueuse de chefs qui travaillent avec lui et peut organiser plusieurs événements le même jour. Son équipe est également experte dans la création de meal prep équilibré pour de nombreux clients de haut niveau.',
    location: 'Paris',
    pricePerPerson: 12000,
    minSpend: 75000,
    rating: 4.94,
    reviewCount: 110,
    reviewRate: 54,
    bookingCount: 87,
    lookingToBook: 7,
    verified: true,
    superChef: true,
    mainImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600',
      'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=600',
    ],
    totalPhotos: 58,
    personalityBadges: [
      'Très bien noté',
      'Conteur engageant',
      'Propreté impeccable',
      'Super chef',
      'Fiable',
    ],
    specialties: [
      'Brunch',
      'Gastronomie',
      'BBQ',
      'Asiatique',
      'Noël',
      'Italien',
      'Canapés',
      'Mexicain',
      'Meal Prep',
      'Européen Moderne',
      'Français',
      'Caribéen',
      'Méditerranéen',
      'Britannique',
      'Fusion',
      'Meal Prep - Déjeuner & Dîner',
      'Espagnol',
      'Écossais',
      'Cours de cuisine',
      'Portugais',
    ],
    services: ['Nettoyage', 'Service à table', 'Présente & explique les plats', 'Plateau de fromages', 'Accord mets et vins', 'Grands plats de service'],
    experience: ['Cuisine authentique', 'A cuisiné pour HNWI', 'Chef pâtissier', 'Expérience internationale', 'Nutritionniste', 'A cuisiné pour des célébrités', 'Démonstrations culinaires'],
    reviews: [
      {
        id: '1',
        clientName: 'Julie',
        rating: 5,
        verified: true,
        date: 'Novembre 2025',
        likes: 5,
        comment: 'Chef Andrew, merci du fond du cœur d\'avoir rendu le 60ème anniversaire de nos jumeaux si incroyablement spécial. Votre nourriture n\'était pas seulement délicieuse — elle était réfléchie, réconfortante et créée avec ...',
        occasion: 'Anniversaire',
      },
      {
        id: '2',
        clientName: 'Elaine',
        rating: 5,
        verified: true,
        date: 'Novembre 2025',
        likes: 8,
        comment: 'Andrew était très sympathique et extrêmement professionnel. La nourriture qu\'il a servie était délicieuse et excellente en qualité. Il nous a montré la nourriture avant qu\'elle ne soit cuisinée, en expliquant ses origines. Il s\'est occupé ...',
        occasion: 'Dîner privé',
      },
      {
        id: '3',
        clientName: 'Lesley',
        rating: 5,
        verified: true,
        date: 'Novembre 2025',
        likes: 9,
        comment: 'Arrivé à l\'heure, complètement professionnel. La nourriture était excellente. Recommanderais volontiers le Chef Andrew pour un dîner ou une fête. Nous avions une douzaine de convives ...',
        occasion: 'Fête',
      },
      {
        id: '4',
        clientName: 'Annie',
        rating: 5,
        verified: true,
        date: 'Octobre 2025',
        likes: 8,
        comment: 'Je ne peux pas assez recommander Andy. Nous l\'avons réservé complètement à la dernière minute pour le 60ème anniversaire de ma mère et il est allé au-delà de toutes nos attentes. Il était très accommodant pour l\'un de nos invités qui avait des restrictions alimentaires ...',
        occasion: 'Anniversaire',
      },
    ],
  },
  'sophie-chen': {
    id: '2',
    slug: 'sophie-chen',
    user: {
      name: 'Sophie Chen',
      image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400',
    },
    tagline: 'Spécialiste de la fusion asiatique-française',
    bio: 'Sophie est une chef passionnée par la fusion des cuisines asiatique et française.',
    location: 'Lyon',
    pricePerPerson: 8500,
    minSpend: 50000,
    rating: 4.8,
    reviewCount: 156,
    reviewRate: 48,
    bookingCount: 65,
    lookingToBook: 3,
    verified: true,
    superChef: false,
    mainImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600',
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600',
      'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600',
    ],
    totalPhotos: 32,
    personalityBadges: ['Très bien noté', 'Créatif', 'Fiable'],
    specialties: ['Fusion asiatique', 'Cuisine japonaise', 'Moderne'],
    services: ['Nettoyage', 'Service à table'],
    experience: ['Cuisine authentique', 'Expérience internationale'],
    reviews: [],
  },
  'marco-bellini': {
    id: '3',
    slug: 'marco-bellini',
    user: {
      name: 'Marco Bellini',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400',
    },
    tagline: 'Chef italien authentique',
    bio: 'Marco apporte l\'authenticité italienne dans chaque plat qu\'il crée.',
    location: 'Nice',
    pricePerPerson: 7500,
    minSpend: 45000,
    rating: 4.9,
    reviewCount: 189,
    reviewRate: 62,
    bookingCount: 92,
    lookingToBook: 5,
    verified: true,
    superChef: false,
    mainImage: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600',
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600',
      'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600',
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600',
    ],
    totalPhotos: 41,
    personalityBadges: ['Très bien noté', 'Traditionnel', 'Fiable'],
    specialties: ['Cuisine italienne', 'Pâtes fraîches', 'Antipasti'],
    services: ['Service à table', 'Présente & explique les plats'],
    experience: ['Cuisine authentique', 'Chef pâtissier'],
    reviews: [],
  },
  'lea-dubois': {
    id: '4',
    slug: 'lea-dubois',
    user: {
      name: 'Léa Dubois',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    },
    tagline: 'Experte en cuisine végétale et healthy',
    bio: 'Léa est passionnée par la cuisine végétarienne et végane. Elle crée des plats équilibrés et savoureux qui ravissent même les plus carnivores.',
    location: 'Bordeaux',
    pricePerPerson: 6500,
    minSpend: 40000,
    rating: 4.7,
    reviewCount: 134,
    reviewRate: 51,
    bookingCount: 71,
    lookingToBook: 4,
    verified: true,
    superChef: false,
    mainImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600',
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=600',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
      'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600',
    ],
    totalPhotos: 28,
    personalityBadges: ['Très bien noté', 'Créatif', 'Sain'],
    specialties: ['Végétarien', 'Vegan', 'Healthy', 'Bio', 'Sans gluten'],
    services: ['Nettoyage', 'Cours de cuisine', 'Meal prep'],
    experience: ['Nutritionniste', 'Cuisine bio', 'Coach bien-être'],
    reviews: [],
  },
  'ahmed-el-fassi': {
    id: '5',
    slug: 'ahmed-el-fassi',
    user: {
      name: 'Ahmed El Fassi',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    },
    tagline: 'Explorateur de saveurs méditerranéennes',
    bio: 'Ahmed est un explorateur culinaire spécialisé dans la cuisine méditerranéenne et orientale. Ses plats transportent vos invités dans un voyage gustatif unique.',
    location: 'Marseille',
    pricePerPerson: 7000,
    minSpend: 42000,
    rating: 4.8,
    reviewCount: 167,
    reviewRate: 55,
    bookingCount: 78,
    lookingToBook: 6,
    verified: true,
    superChef: false,
    mainImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600',
    ],
    totalPhotos: 35,
    personalityBadges: ['Très bien noté', 'Authentique', 'Conteur'],
    specialties: ['Cuisine du monde', 'Méditerranéenne', 'Orientale', 'Marocaine', 'Libanaise'],
    services: ['Service à table', 'Présente & explique les plats', 'Storytelling'],
    experience: ['Cuisine authentique', 'Expérience internationale', 'Démonstrations culinaires'],
    reviews: [],
  },
  'julie-bernard': {
    id: '6',
    slug: 'julie-bernard',
    user: {
      name: 'Julie Bernard',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    },
    tagline: 'Cheffe pâtissière d\'exception',
    bio: 'Julie est une cheffe pâtissière spécialisée dans les desserts gastronomiques. Elle sublime vos événements avec des créations sucrées inoubliables.',
    location: 'Paris',
    pricePerPerson: 5500,
    minSpend: 35000,
    rating: 4.9,
    reviewCount: 142,
    reviewRate: 58,
    bookingCount: 58,
    lookingToBook: 3,
    verified: true,
    superChef: false,
    mainImage: 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=1200',
    galleryImages: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600',
      'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=600',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
    ],
    totalPhotos: 45,
    personalityBadges: ['Très bien noté', 'Artistique', 'Perfectionniste'],
    specialties: ['Pâtisserie', 'Desserts', 'Chocolat', 'Macarons', 'Entremets'],
    services: ['Présente & explique les plats', 'Cours de pâtisserie', 'Démonstrations'],
    experience: ['Chef pâtissier', 'Chocolatier', 'MOF Pâtisserie'],
    reviews: [],
  },
};

function ChefProfileContent({ chef }: { chef: any }) {
  const [showFullBio, setShowFullBio] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);

  const priceInEuros = chef.pricePerPerson / 100;
  const minSpendInEuros = chef.minSpend / 100;

  const toggleReview = (reviewId: string) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 gap-2 mb-6">
          <div className="col-span-2 md:col-span-1 aspect-[4/3] rounded-lg overflow-hidden">
            <img src={chef.mainImage} alt={chef.user.name} className="w-full h-full object-cover" />
          </div>

          <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-2">
            {chef.galleryImages.map((img: string, idx: number) => (
              <div key={idx} className="aspect-square rounded-lg overflow-hidden relative">
                <img src={img} alt={`Galerie ${idx + 1}`} className="w-full h-full object-cover" />
                {idx === 3 && (
                  <button
                    onClick={() => setShowPhotoGallery(true)}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold hover:bg-black/70 transition-colors"
                  >
                    Voir tout ({chef.totalPhotos})
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {showPhotoGallery && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-lg p-6">
              <button
                onClick={() => setShowPhotoGallery(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
              <h2 className="text-2xl font-bold mb-6">Toutes les photos</h2>
              <PhotoGallery
                images={[chef.mainImage, ...chef.galleryImages]}
                chefName={chef.user.name}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={chef.user.image} />
                    <AvatarFallback>{chef.user.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Chef</div>
                        <h1 className="text-3xl font-bold">{chef.user.name}</h1>
                        <p className="text-slate-600 mt-1">{chef.tagline}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>

                    {chef.superChef && (
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                        👑 Super Chef
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Star className="h-5 w-5 fill-orange-400 text-orange-400" />
                  <span className="font-semibold">{chef.rating}</span>
                  <Link href="#avis" className="text-sm text-slate-600 hover:underline">
                    ({chef.reviewCount} avis, {chef.reviewRate}% taux d'avis)
                  </Link>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{chef.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">À partir de {priceInEuros}€/pers / Dépense min {minSpendInEuros}€</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{chef.bookingCount} événements GetChef</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">À propos du chef</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  {showFullBio ? chef.bio : `${chef.bio.slice(0, 150)}...`}
                </p>
                <button
                  onClick={() => setShowFullBio(!showFullBio)}
                  className="text-orange-600 hover:underline text-sm font-medium"
                >
                  {showFullBio ? '...voir moins' : '...lire la suite'}
                </button>

                <div className="flex flex-wrap gap-2 mt-6">
                  {chef.personalityBadges.map((badge: string) => (
                    <Badge key={badge} variant="secondary">{badge}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Spécialités du chef</h2>
                <div className="flex flex-wrap gap-2">
                  {chef.specialties.map((s: string) => (
                    <Badge key={s} variant="secondary">{s}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-bold mb-4">Menus exemples</h2>
                <SampleMenusDialog />
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      Vous souhaitez demander un devis et un menu personnalisé selon vos besoins ?
                    </h3>
                    <p className="text-sm text-slate-600">
                      Envoyez simplement un message au chef {chef.user.name} et discutez des détails de votre événement et de vos besoins.
                    </p>
                  </div>
                  <Button asChild className="bg-slate-800 hover:bg-slate-900 shrink-0">
                    <Link href={`/booking/new?chefId=${chef.id}`}>Envoyer un message</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">🍽️</div>
                    <h3 className="font-bold text-lg">Services proposés</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {chef.services.map((s: string) => <Badge key={s} variant="secondary">{s}</Badge>)}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">👨‍🍳</div>
                    <h3 className="font-bold text-lg">Expérience du chef</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {chef.experience.map((e: string) => <Badge key={e} variant="secondary">{e}</Badge>)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div id="avis">
              <h2 className="text-2xl font-bold mb-6">Avis</h2>

              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-8">
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2">{chef.rating}</div>
                      <Star className="h-6 w-6 fill-orange-400 text-orange-400 mx-auto mb-2" />
                      <div className="text-sm text-slate-600">Avis global</div>
                      <div className="text-sm text-slate-600">({chef.reviewCount} avis)</div>
                    </div>

                    <div className="flex-1 space-y-3">
                      {[
                        { label: 'Propreté', value: 5.0, percent: 100 },
                        { label: 'Communication', value: 3.0, percent: 60 },
                        { label: 'Storytelling', value: 4.9, percent: 98 },
                      ].map(item => (
                        <div key={item.label}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{item.label}</span>
                            <span className="text-sm font-bold">{item.value}</span>
                          </div>
                          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-800" style={{ width: `${item.percent}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {chef.reviews.map((review: any) => {
                  const isExpanded = expandedReviews.has(review.id);
                  const truncatedComment = review.comment.length > 150
                    ? `${review.comment.slice(0, 150)}...`
                    : review.comment;

                  return (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="font-semibold">{review.clientName}</div>
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span>Avis vérifié</span>
                            </div>
                            <div className="text-sm text-slate-600">{review.date} • 👍 {review.likes}</div>
                          </div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-orange-400 text-orange-400' : 'text-slate-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-700 text-sm leading-relaxed">
                          {isExpanded ? review.comment : truncatedComment}
                        </p>
                        {review.comment.length > 150 && (
                          <button
                            onClick={() => toggleReview(review.id)}
                            className="text-orange-600 text-sm hover:underline mt-2 font-medium"
                          >
                            {isExpanded ? '...voir moins' : '...lire la suite'}
                          </button>
                        )}
                        {review.occasion && (
                          <Badge variant="outline" className="mt-3">{review.occasion}</Badge>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Button variant="outline" className="w-full">
                Voir tous les avis ({chef.reviewCount})
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-lg mb-4">Aide et support</h3>
                <p className="text-sm text-slate-600 mb-4">Nous sommes disponibles tous les jours entre 7h-19h</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4" />
                    <span>Appelez-nous</span>
                    <a href="tel:+33144204525" className="text-blue-600 hover:underline">+33 1 44 20 45 25</a>
                  </div>
                  <a href="#" className="flex items-center gap-2 text-sm text-green-600 hover:underline">
                    💬 WhatsApp →
                  </a>
                  <a href="#" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                    Demander un rappel →
                  </a>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-4">Paiements</h3>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="p1">
                      <AccordionTrigger>Protection paiement</AccordionTrigger>
                      <AccordionContent>Votre paiement est protégé.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="p2">
                      <AccordionTrigger>Diviser la facture</AccordionTrigger>
                      <AccordionContent>Divisez entre plusieurs personnes.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="p3">
                      <AccordionTrigger>Acompte de 10%</AccordionTrigger>
                      <AccordionContent>Payez 10% maintenant, le reste plus tard.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-4">Annulations et remboursements</h3>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="c1">
                      <AccordionTrigger>Si le chef annule ?</AccordionTrigger>
                      <AccordionContent>Remboursement complet.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="c2">
                      <AccordionTrigger>Si j'annule ?</AccordionTrigger>
                      <AccordionContent>Selon le délai d'annulation.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-4">FAQ</h3>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="f1">
                      <AccordionTrigger>Le chef peut-il amener un serveur ?</AccordionTrigger>
                      <AccordionContent>Oui, à discuter.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="f2">
                      <AccordionTrigger>Assurance</AccordionTrigger>
                      <AccordionContent>Tous les chefs sont assurés.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="f3">
                      <AccordionTrigger>Heure d'arrivée ?</AccordionTrigger>
                      <AccordionContent>2-3h avant le service.</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 self-start space-y-4">
              <Card className="border-2">
                <CardContent className="pt-6">
                  {chef.lookingToBook > 0 && (
                    <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-2 rounded-lg mb-4 text-sm">
                      <Eye className="h-4 w-4" />
                      <span className="font-medium">{chef.lookingToBook} cherchent à réserver</span>
                    </div>
                  )}

                  <h3 className="text-lg font-bold mb-4">
                    Envoyez un message au chef pour créer votre menu de rêve
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Localisation</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xl">🇫🇷</span>
                        <Input
                          placeholder="Rechercher code postal ou ville..."
                          className="pl-12 h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold mb-2 block">Date de l'événement</Label>
                      <Input
                        type="date"
                        defaultValue="2025-12-03"
                        className="h-12"
                      />
                    </div>

                    <Button
                      size="lg"
                      className="w-full h-14 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base"
                    >
                      Envoyer un message
                    </Button>

                    <p className="text-center text-sm text-slate-600">
                      Vous ne serez pas facturé pour l'instant
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 -mx-4 px-4 py-12 mt-12 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Parcourir d'autres chefs privés près de {chef.location}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Ormesson', 'Versailles', 'Neuilly', 'Boulogne', 'Saint-Cloud', 'Levallois', 'Sèvres', 'Meudon', 'Issy', 'Vanves', 'Malakoff', 'Montrouge'].map(city => (
              <Link key={city} href={`/chefs?city=${city}`} className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow">
                <span className="text-sm font-medium">{city}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChefProfilePage({ params }: { params: { slug: string } }) {
  const chef = MOCK_CHEFS[params.slug];

  if (!chef) notFound();

  return <ChefProfileContent chef={chef} />;
}
