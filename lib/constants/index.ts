export const APP_NAME = 'GetChef';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://getchef.fr';
export const APP_DESCRIPTION = 'Réservez un chef privé pour vos événements. Des chefs professionnels à domicile pour toutes vos occasions.';

export const CUISINES = [
  { value: 'francaise', label: 'Française' },
  { value: 'italienne', label: 'Italienne' },
  { value: 'japonaise', label: 'Japonaise' },
  { value: 'mediterraneenne', label: 'Méditerranéenne' },
  { value: 'asiatique', label: 'Asiatique' },
  { value: 'fusion', label: 'Fusion' },
  { value: 'vegetarienne', label: 'Végétarienne' },
  { value: 'indienne', label: 'Indienne' },
  { value: 'mexicaine', label: 'Mexicaine' },
  { value: 'libanaise', label: 'Libanaise' },
  { value: 'grecque', label: 'Grecque' },
  { value: 'thailandaise', label: 'Thaïlandaise' },
] as const;

export const EVENT_TYPES = [
  { value: 'dinner', label: 'Dîner privé', icon: '🍽️' },
  { value: 'birthday', label: 'Anniversaire', icon: '🎂' },
  { value: 'wedding', label: 'Mariage', icon: '💍' },
  { value: 'corporate', label: 'Événement entreprise', icon: '🏢' },
  { value: 'family', label: 'Réunion famille', icon: '👨‍👩‍👧‍👦' },
  { value: 'cooking-class', label: 'Cours de cuisine', icon: '👨‍🍳' },
  { value: 'brunch', label: 'Brunch', icon: '🥂' },
  { value: 'romantic', label: 'Dîner romantique', icon: '❤️' },
] as const;

export const CITIES = [
  'Paris',
  'Lyon',
  'Marseille',
  'Bordeaux',
  'Nice',
  'Toulouse',
  'Nantes',
  'Lille',
  'Strasbourg',
  'Montpellier',
  'Rennes',
  'Reims',
  'Saint-Étienne',
  'Toulon',
  'Grenoble',
] as const;

export const PRICE_RANGES = {
  min: 50,
  max: 200,
  default: [60, 120],
} as const;

export const COMMISSION_RATE = 0.15;

export const BOOKING_STATUS = {
  PENDING: 'En attente',
  CONFIRMED: 'Confirmé',
  CANCELLED: 'Annulé',
  COMPLETED: 'Terminé',
} as const;

export const GUEST_COUNTS = [
  { value: 2, label: '2 personnes' },
  { value: 4, label: '4 personnes' },
  { value: 6, label: '6 personnes' },
  { value: 8, label: '8 personnes' },
  { value: 10, label: '10 personnes' },
  { value: 12, label: '12 personnes' },
  { value: 15, label: '15 personnes' },
  { value: 20, label: '20+ personnes' },
] as const;

export const MEAL_TYPES = [
  { value: 'breakfast', label: 'Petit-déjeuner' },
  { value: 'brunch', label: 'Brunch' },
  { value: 'lunch', label: 'Déjeuner' },
  { value: 'dinner', label: 'Dîner' },
  { value: 'cocktail', label: 'Cocktail' },
  { value: 'buffet', label: 'Buffet' },
] as const;

export const DIETARY_RESTRICTIONS = [
  { value: 'none', label: 'Aucune' },
  { value: 'vegetarian', label: 'Végétarien' },
  { value: 'vegan', label: 'Végétalien' },
  { value: 'gluten-free', label: 'Sans gluten' },
  { value: 'lactose-free', label: 'Sans lactose' },
  { value: 'halal', label: 'Halal' },
  { value: 'kosher', label: 'Casher' },
] as const;

export const TIME_SLOTS = [
  { value: '12:00', label: '12h00' },
  { value: '12:30', label: '12h30' },
  { value: '13:00', label: '13h00' },
  { value: '13:30', label: '13h30' },
  { value: '19:00', label: '19h00' },
  { value: '19:30', label: '19h30' },
  { value: '20:00', label: '20h00' },
  { value: '20:30', label: '20h30' },
  { value: '21:00', label: '21h00' },
] as const;

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/getchef',
  facebook: 'https://facebook.com/getchef',
  twitter: 'https://twitter.com/getchef',
  linkedin: 'https://linkedin.com/company/getchef',
} as const;

export const CONTACT = {
  email: 'contact@getchef.fr',
  phone: '+33 1 23 45 67 89',
  address: '123 Rue de la Gastronomie, 75001 Paris',
} as const;
