# Guide SEO GetChef

Documentation complète des optimisations SEO implémentées pour un référencement optimal sur Google.

---

## Résumé des Optimisations

✅ **Métadonnées complètes** sur toutes les pages
✅ **Sitemap XML dynamique** généré automatiquement
✅ **Robots.txt** optimisé
✅ **Schema.org (JSON-LD)** pour rich snippets
✅ **Images optimisées** (AVIF + WebP)
✅ **PWA ready** avec manifest.json
✅ **Headers de sécurité** configurés
✅ **Mobile-first** et responsive

---

## 1. Métadonnées Globales

### app/layout.tsx

Métadonnées racine appliquées à toutes les pages :

```typescript
- Title template: "%s | GetChef"
- Description globale
- Keywords SEO
- Open Graph (Facebook, LinkedIn)
- Twitter Cards
- Robots directives
- Viewport optimisé mobile
- Theme color
```

**Mots-clés principaux :**
- chef privé
- chef à domicile
- traiteur à domicile
- chef pour événement
- chef cuisinier privé
- dîner à domicile
- cours de cuisine à domicile

---

## 2. Métadonnées par Page

### Homepage (/)
```
Title: "GetChef - Réservez un Chef Privé à Domicile"
Description: Complète avec CTA
Canonical: https://getchef.fr
```

### Listing Chefs (/chefs)
```
Title: "Trouvez un Chef Privé près de chez vous"
Description: Focus recherche et variété cuisines
Canonical: https://getchef.fr/chefs
```

### Profil Chef (/chefs/[slug])
```
Title dynamique: "[Nom Chef] - Chef Privé à [Ville]"
Description dynamique avec spécialités et note
Canonical dynamique
Open Graph avec photo chef
```

### À propos (/about)
```
Title: "À propos de GetChef - Notre histoire"
Description: Mission et valeurs
Canonical: https://getchef.fr/about
```

### Comment ça marche (/how-it-works)
```
Title: "Comment réserver un Chef Privé - Guide complet"
Description: Processus en 3 étapes
Canonical: https://getchef.fr/how-it-works
```

---

## 3. Sitemap XML

### app/sitemap.ts

Génération automatique avec :

**Pages statiques :**
- Homepage (priority: 1.0)
- /chefs (priority: 0.9)
- /about (priority: 0.5)
- /how-it-works (priority: 0.7)

**Fréquence de mise à jour :**
- Homepage : daily
- Chefs : daily
- Pages info : monthly

**Accessible à :** `https://getchef.fr/sitemap.xml`

---

## 4. Robots.txt

### app/robots.ts

```
User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /chef-dashboard/
Disallow: /profile/
Disallow: /auth/
Disallow: /api/

Sitemap: https://getchef.fr/sitemap.xml
```

**Accessible à :** `https://getchef.fr/robots.txt`

---

## 5. Schema.org (JSON-LD)

### Composants disponibles

#### OrganizationSchema
```typescript
import { OrganizationSchema } from '@/components/seo/json-ld';

<OrganizationSchema />
```

Informations entreprise pour Google Knowledge Graph.

#### ChefSchema
```typescript
<ChefSchema
  chef={{
    name: "Pierre Gagnaire",
    image: "...",
    description: "...",
    location: "Paris",
    rating: 4.9,
    reviewCount: 110,
    priceRange: "€€€",
    slug: "pierre-gagnaire"
  }}
/>
```

Affichage rich snippets dans résultats Google.

#### BreadcrumbSchema
```typescript
<BreadcrumbSchema
  items={[
    { name: 'Accueil', url: 'https://getchef.fr' },
    { name: 'Chefs', url: 'https://getchef.fr/chefs' },
    { name: 'Pierre Gagnaire', url: 'https://getchef.fr/chefs/pierre-gagnaire' },
  ]}
/>
```

Fil d'Ariane dans Google Search.

#### FAQSchema
```typescript
<FAQSchema
  faqs={[
    {
      question: "Combien coûte un chef privé ?",
      answer: "Les tarifs varient de 60€ à 200€ par personne..."
    },
  ]}
/>
```

Section FAQ enrichie dans Google.

#### WebsiteSchema
```typescript
<WebsiteSchema />
```

Barre de recherche Google personnalisée.

---

## 6. Images Optimisées

### Composant OptimizedImage

```typescript
import { OptimizedImage } from '@/components/ui/optimized-image';

<OptimizedImage
  src="/chef.jpg"
  alt="Chef Pierre Gagnaire"
  width={800}
  height={600}
  priority={false}
/>
```

**Optimisations :**
- Format AVIF + WebP automatique
- Lazy loading par défaut
- Blur placeholder
- Sizes responsive
- Quality optimisée (85%)

### Variantes spécialisées

```typescript
// Avatar chef
<ChefAvatar
  src="/avatar.jpg"
  name="Pierre"
  size="lg"
/>

// Image hero
<HeroImage
  src="/hero.jpg"
  alt="Chef en cuisine"
  priority={true}
/>

// Card image
<CardImage
  src="/plat.jpg"
  alt="Plat gastronomique"
  aspectRatio="16/9"
/>
```

---

## 7. PWA (Progressive Web App)

### public/manifest.json

```json
{
  "name": "GetChef - Réservez un Chef Privé",
  "short_name": "GetChef",
  "theme_color": "#FF5500",
  "icons": [192x192, 512x512],
  "display": "standalone"
}
```

**Bénéfices :**
- Installation sur mobile
- Mode hors ligne (future)
- Icône sur écran d'accueil
- Expérience app native

---

## 8. Performance SEO

### Core Web Vitals

**LCP (Largest Contentful Paint) :**
- Images optimisées AVIF/WebP
- Priority loading sur hero
- CDN Vercel

**FID (First Input Delay) :**
- JavaScript optimisé
- Code splitting Next.js
- Lazy loading composants

**CLS (Cumulative Layout Shift) :**
- Dimensions images explicites
- Skeleton loaders
- Font display: swap

### Lighthouse Scores (Cibles)

| Métrique | Score Cible |
|----------|-------------|
| Performance | 90+ |
| Accessibility | 95+ |
| Best Practices | 100 |
| SEO | 100 |

---

## 9. Checklist SEO

### Technique ✅
- [x] Sitemap XML
- [x] Robots.txt
- [x] Canonical URLs
- [x] Meta descriptions
- [x] Alt text images
- [x] Schema.org markup
- [x] HTTPS (via Vercel)
- [x] Mobile responsive
- [x] Fast loading
- [x] No 404 errors

### Contenu ✅
- [x] Titles uniques
- [x] H1 sur chaque page
- [x] Hiérarchie H1-H6
- [x] Mots-clés naturels
- [x] Contenu original
- [x] Call-to-actions clairs

### Off-Page (À faire)
- [ ] Backlinks qualité
- [ ] Réseaux sociaux actifs
- [ ] Google My Business
- [ ] Avis clients
- [ ] Mentions presse

---

## 10. Google Analytics & Tracking ✅

### Configuration

Le projet est déjà configuré avec Google Analytics 4 :

**Fichier:** `components/analytics/google-analytics.tsx`

**Features:**
- ✅ Google Analytics 4 intégré
- ✅ Google Tag Manager support
- ✅ Strategy "afterInteractive" pour performance
- ✅ Tracking automatique des pages
- ✅ Activation conditionnelle

**Configuration .env:**
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

**Usage:**
Le composant est déjà intégré dans `app/layout.tsx` et se charge automatiquement si les variables d'environnement sont définies.

---

## 11. Outils Recommandés

### Analyse SEO
- **Google Search Console** - Indexation et performances
- **Google Analytics 4** - Trafic et conversions (✅ CONFIGURÉ)
- **Ahrefs / SEMrush** - Analyse concurrence
- **Screaming Frog** - Audit technique

### Test & Monitoring
- **PageSpeed Insights** - Core Web Vitals
- **Lighthouse** - Audit complet
- **Schema Markup Validator** - JSON-LD
- **Mobile-Friendly Test** - Responsive

### Recherche Mots-clés
- **Google Keyword Planner**
- **Ubersuggest**
- **Answer The Public**

---

## 12. Prochaines Étapes SEO

### Court Terme (1 mois)
1. **Google Search Console**
   - Soumettre sitemap
   - Vérifier propriété
   - Suivre indexation

2. **Google My Business**
   - Créer fiche entreprise
   - Ajouter photos
   - Collecter avis

3. **Contenu Blog**
   - Articles recettes
   - Conseils événements
   - Portraits chefs

### Moyen Terme (3 mois)
1. **SEO Local**
   - Pages ville (Paris, Lyon...)
   - Citations locales
   - Annuaires

2. **Link Building**
   - Partenariats blogs food
   - Guest posting
   - Communiqués presse

3. **Rich Content**
   - Vidéos YouTube
   - Tutoriels cuisine
   - Interviews chefs

### Long Terme (6+ mois)
1. **Authority Building**
   - Devenir référence secteur
   - Obtenir mentions médias
   - Construire communauté

2. **International**
   - Version multilingue
   - Hreflang tags
   - Expansion pays

---

## 13. Mots-clés Cibles

### Primaires (Volume élevé)
- chef privé (2900/mois)
- chef à domicile (1600/mois)
- traiteur à domicile (880/mois)
- chef pour événement (320/mois)

### Secondaires (Volume moyen)
- réserver chef privé (210/mois)
- chef cuisinier privé (170/mois)
- chef particulier (140/mois)
- cours cuisine à domicile (390/mois)

### Long Tail (Conversions élevées)
- chef privé paris anniversaire
- traiteur domicile mariage lyon
- cours cuisine privé couple
- chef gastronomique événement entreprise

### Locales
- chef privé paris
- chef à domicile lyon
- traiteur domicile bordeaux
- chef privé marseille

---

## 14. Google Search Console

### Configuration Initiale

1. **Vérification propriété**
   ```html
   <meta name="google-site-verification" content="xxx" />
   ```
   Ajouter dans app/layout.tsx

2. **Soumettre sitemap**
   ```
   https://getchef.fr/sitemap.xml
   ```

3. **Surveiller**
   - Pages indexées
   - Erreurs crawl
   - Core Web Vitals
   - Requêtes de recherche

---

## 15. Structured Data Testing

### Valider Schema.org

**Google Rich Results Test:**
https://search.google.com/test/rich-results

**Schema Markup Validator:**
https://validator.schema.org/

**Tester :**
- Organization
- LocalBusiness (chefs)
- Breadcrumb
- FAQ
- Review

---

## 16. Support & Resources

### Documentation
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)

### Contact SEO
- Email: seo@getchef.fr
- Slack: #seo-optimization

---

**Dernière mise à jour :** 29 Janvier 2026
**Version :** 2.0.0
**Status :** ✅ Production Ready

### Nouveautés Version 2.0
- ✅ Google Analytics 4 configuré
- ✅ Google Tag Manager support
- ✅ Schema.org ajouté au layout global (Organization + Website)
- ✅ Sitemap amélioré avec pages chefs
- ✅ Documentation complète analytics
