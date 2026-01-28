# Architecture GetChef - Documentation Technique

## Stack Technique

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript** (strict mode)
- **Tailwind CSS** + **shadcn/ui**
- **Lucide React** (icônes)

### Backend & Base de données
- **Supabase** (Auth + PostgreSQL + Storage)
- **@supabase/ssr** (optimisé pour Next.js 14)

### Déploiement
- **Vercel** (recommandé)
- **CI/CD** automatique

---

## Structure du Projet

```
/
├── app/                          # Next.js 14 App Router
│   ├── (app)/                    # Routes authentifiées
│   │   ├── dashboard/            # Dashboard client
│   │   ├── chef-dashboard/       # Dashboard chef
│   │   ├── profile/              # Profil utilisateur
│   │   └── layout.tsx            # Layout authentifié
│   │
│   ├── auth/                     # Pages d'authentification
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   ├── reset-password/
│   │   └── callback/
│   │
│   ├── chefs/                    # Listing et profils chefs (SEO)
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   │
│   ├── about/                    # Pages marketing
│   ├── how-it-works/
│   ├── confirmation-demande-devis/
│   │
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── error.tsx                 # Error boundary
│   ├── not-found.tsx             # 404 page
│   ├── loading.tsx               # Loading state
│   └── globals.css               # Styles globaux
│
├── components/                   # Composants React
│   ├── auth/                     # Composants auth
│   ├── booking/                  # Composants réservation
│   ├── chef/                     # Composants chef
│   ├── layout/                   # Header, Footer, etc.
│   ├── search/                   # Composants recherche
│   └── ui/                       # shadcn/ui components
│
├── lib/                          # Utilitaires
│   ├── constants/                # Constantes app
│   │   ├── index.ts             # Toutes les constantes
│   │   └── brand.ts
│   ├── filters/                  # Logique filtres
│   ├── supabase/                 # Clients Supabase
│   │   ├── client.ts            # Client browser
│   │   ├── server.ts            # Client server
│   │   └── middleware.ts
│   ├── validations/              # Schémas Zod
│   └── utils.ts                  # Fonctions utilitaires
│
├── hooks/                        # Custom hooks
│   ├── use-user.ts
│   └── use-toast.ts
│
├── supabase/                     # Migrations Supabase
│   └── migrations/
│
├── middleware.ts                 # Next.js middleware
├── next.config.js               # Configuration Next.js
├── tailwind.config.ts           # Configuration Tailwind
└── tsconfig.json                # Configuration TypeScript
```

---

## Fonctionnalités Implémentées

### ✅ Authentification Multi-Providers
- Email/Password
- Google OAuth
- Facebook OAuth
- Apple OAuth
- Téléphone avec OTP (SMS)
- Reset password
- Session management

### ✅ Gestion Utilisateurs
- Profils utilisateurs (CLIENT/CHEF)
- Row Level Security (RLS)
- Dashboard personnalisé
- Édition profil

### ✅ Recherche & Filtres
- Recherche de chefs
- Filtres avancés (cuisine, prix, ville, date)
- Pagination
- Tri

### ✅ Système de Réservation
- Formulaire booking
- Calendrier disponibilités
- Sélection menu
- Calcul prix

### ✅ UI/UX
- Design moderne et responsive
- Dark mode ready
- Loading states
- Error handling
- Toast notifications
- Skeleton loaders

---

## Optimisations Appliquées

### 🚀 Performance

#### Next.js 14
- **App Router** avec Server Components
- **Streaming** avec React Suspense
- **ISR** (Incremental Static Regeneration)
- **Image Optimization** (AVIF + WebP)
- **Route Groups** pour organisation

#### Headers Sécurité
```javascript
- Strict-Transport-Security
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection
- Referrer-Policy: origin-when-cross-origin
- X-DNS-Prefetch-Control: on
```

#### Supabase SSR
- Client optimisé avec `@supabase/ssr`
- Cookies management proper
- Middleware authentication
- Server/Client separation

### 🔒 Sécurité

#### Base de données
- **RLS activé** sur toutes les tables
- Policies restrictives par défaut
- Validation côté serveur (Zod)
- Pas de secrets exposés côté client

#### Authentication
- PKCE flow
- HTTP-only cookies
- Session refresh automatique
- Protected routes via middleware

### 📦 Code Quality

#### TypeScript
- Mode strict activé
- Types explicites
- Validation runtime avec Zod
- Pas de `any`

#### Architecture
- Single Responsibility Principle
- Composants réutilisables
- Hooks personnalisés
- Séparation des préoccupations

---

## Variables d'Environnement

Voir `.env.example` pour la liste complète.

### Essentielles
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_APP_URL=
```

### Optionnelles
```bash
STRIPE_SECRET_KEY=              # Paiements (phase 2)
TWILIO_ACCOUNT_SID=             # SMS (phase 2)
NEXT_PUBLIC_GA_ID=              # Analytics
RESEND_API_KEY=                 # Emails transactionnels
```

---

## Scripts Disponibles

```bash
# Développement
npm run dev              # Lance le serveur dev

# Build
npm run build            # Build production
npm run start            # Lance le build

# Qualité
npm run lint             # ESLint
npm run typecheck        # TypeScript check
```

---

## Base de Données

### Tables Principales
- `profiles` - Profils utilisateurs
- `chef_profiles` - Profils chefs
- `bookings` - Réservations
- `menus` - Menus proposés
- `reviews` - Avis clients
- `availability` - Disponibilités chefs

### Sécurité RLS
Toutes les tables ont RLS activé avec policies :
- SELECT : authentifié + ownership
- INSERT : authentifié + validation
- UPDATE : authentifié + ownership
- DELETE : authentifié + ownership

---

## Déploiement Vercel

### Configuration Recommandée
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

### Variables d'Environnement
Configurer toutes les variables du `.env.example` dans Vercel Dashboard.

### Domaine
- Production: `getchef.fr`
- Preview: `*.vercel.app`

---

## Prochaines Étapes

### Phase 2 - Paiements
- [ ] Intégration Stripe
- [ ] Paiement sécurisé
- [ ] Système de commissions
- [ ] Factures automatiques

### Phase 3 - Communication
- [ ] Messagerie chef-client
- [ ] Notifications email
- [ ] Notifications SMS
- [ ] Notifications push

### Phase 4 - Features
- [ ] Favoris
- [ ] Partage social
- [ ] Programme fidélité
- [ ] Avis et notes
- [ ] Blog

### Phase 5 - Admin
- [ ] Dashboard admin
- [ ] Modération
- [ ] Analytics
- [ ] Support client

---

## Support

Pour toute question technique, contacter l'équipe dev :
- Email: dev@getchef.fr
- Documentation: [docs.getchef.fr](https://docs.getchef.fr)
