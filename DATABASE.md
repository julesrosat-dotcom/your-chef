# Base de Données - ChefPrivé Marketplace

## Schema Complet

Le schema de la marketplace est maintenant en place avec les tables suivantes :

### Tables Principales

- **profiles** : Profils utilisateurs (clients, chefs, admins)
- **chefs** : Profils détaillés des chefs
- **menus** : Menus proposés par les chefs
- **availabilities** : Calendrier de disponibilité des chefs
- **bookings** : Demandes de réservation des clients
- **proposals** : Propositions des chefs pour les réservations
- **reviews** : Avis clients sur les chefs
- **conversations** : Messagerie entre clients et chefs

### Tables Secondaires

- **dishes** : Plats individuels des chefs
- **chef_experiences** : Expériences professionnelles
- **chef_certifications** : Certifications professionnelles
- **vouchers** : Bons cadeaux
- **referrals** : Programme de parrainage
- **chef_subscriptions** : Abonnements des chefs
- **transaction_logs** : Logs des transactions

## Enums

- **booking_status** : PENDING, PROPOSALS_RECEIVED, ACCEPTED, PAID, CONFIRMED, COMPLETED, CANCELLED
- **proposal_status** : PENDING, ACCEPTED, DECLINED

## Sécurité (RLS)

Toutes les tables ont Row Level Security (RLS) activé avec des policies appropriées :

- **Public read** : chefs, menus, availabilities, reviews, dishes, experiences, certifications
- **Owner management** : Les chefs peuvent gérer leurs propres profils, menus, disponibilités
- **Client management** : Les clients peuvent gérer leurs réservations
- **Privacy** : Les conversations et propositions ne sont accessibles qu'aux parties concernées

## Peupler la Base avec des Données de Test

### Option 1 : Via Supabase Dashboard

1. Accédez à votre projet Supabase
2. Allez dans SQL Editor
3. Créez d'abord des utilisateurs via Authentication > Users
4. Ensuite, les profiles seront créés automatiquement via le trigger
5. Utilisez ces profile IDs pour créer des chefs

### Option 2 : Script Node.js (à créer)

Un script de seed TypeScript complet sera ajouté dans le futur avec :
- 5 chefs réalistes français
- 15+ menus variés
- Disponibilités pour les 30 prochains jours
- Expériences professionnelles
- Reviews de test

### Données de Test Minimales (Manuel)

Vous pouvez créer un chef de test via SQL :

```sql
-- 1. D'abord créer un user dans auth.users via le dashboard Supabase
-- 2. Le profile sera créé automatiquement
-- 3. Ensuite créer le chef :

INSERT INTO chefs (
  user_id,
  slug,
  bio,
  specialties,
  cuisine_types,
  price_per_person,
  price_range,
  location,
  years_experience,
  verified,
  rating,
  review_count
) VALUES (
  'YOUR_USER_ID_HERE',
  'chef-test',
  'Chef passionné avec 10 ans d''expérience',
  ARRAY['Cuisine française', 'Gastronomie'],
  ARRAY['Française', 'Moderne'],
  8000,
  '€€€',
  'Paris',
  10,
  true,
  4.8,
  42
);
```

## Requêtes Utiles

### Lister tous les chefs vérifiés

```sql
SELECT
  c.slug,
  p.full_name,
  c.location,
  c.price_per_person,
  c.rating,
  c.review_count
FROM chefs c
JOIN profiles p ON p.id = c.user_id
WHERE c.verified = true
ORDER BY c.rating DESC;
```

### Récupérer les menus d'un chef

```sql
SELECT
  m.name,
  m.description,
  m.price,
  m.servings,
  m.courses
FROM menus m
WHERE m.chef_id = 'CHEF_ID_HERE'
ORDER BY m.price ASC;
```

### Voir les disponibilités d'un chef

```sql
SELECT
  date,
  available
FROM availabilities
WHERE chef_id = 'CHEF_ID_HERE'
  AND date >= CURRENT_DATE
ORDER BY date ASC
LIMIT 30;
```

## Prochaines Étapes

1. ✅ Schema créé et migré
2. ⏳ Créer un script de seed automatisé
3. ⏳ Implémenter les pages de liste des chefs
4. ⏳ Implémenter les pages de détail chef
5. ⏳ Système de réservation
6. ⏳ Système de propositions
7. ⏳ Messagerie
8. ⏳ Système de reviews
9. ⏳ Intégration Stripe

## Types TypeScript

Les types TypeScript sont déjà disponibles via Supabase. Pour les régénérer :

```bash
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/database.types.ts
```

## Notes Techniques

- Les prix sont stockés en centimes (ex: 8000 = 80.00€)
- Les images utilisent des URLs Unsplash/Pexels pour le développement
- Les arrays (specialties, cuisine_types, etc.) utilisent le type PostgreSQL `text[]`
- Les menus utilisent JSONB pour une structure flexible
- Tous les IDs sont des UUID générés automatiquement
- Les timestamps utilisent `timestamptz` pour gérer les fuseaux horaires
