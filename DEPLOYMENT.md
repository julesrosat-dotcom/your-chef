# Guide de Déploiement GetChef

## Prérequis

- Compte Vercel
- Compte Supabase (configuré)
- Domaine personnalisé (optionnel)
- Variables d'environnement prêtes

---

## Déploiement Vercel (Recommandé)

### Étape 1 : Préparation

1. **Vérifier que le projet build localement**
   ```bash
   npm run build
   npm run start
   ```

2. **Créer un compte Vercel**
   - Aller sur [vercel.com](https://vercel.com)
   - Se connecter avec GitHub

### Étape 2 : Import du Projet

1. **Importer le repository**
   - Cliquer sur "Import Project"
   - Sélectionner le repository GitHub
   - Vercel détecte automatiquement Next.js

2. **Configuration Build**
   ```
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

### Étape 3 : Variables d'Environnement

Dans Vercel Dashboard > Settings > Environment Variables, ajouter :

#### Production
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
NEXT_PUBLIC_APP_URL=https://getchef.fr
NEXT_PUBLIC_APP_NAME=GetChef
NODE_ENV=production
```

#### Preview & Development
Répéter pour les environnements Preview et Development.

### Étape 4 : Déploiement

1. Cliquer sur "Deploy"
2. Attendre la fin du build (2-3 min)
3. Tester l'URL de preview

### Étape 5 : Domaine Personnalisé

1. Aller dans Settings > Domains
2. Ajouter votre domaine : `getchef.fr`
3. Configurer les DNS selon les instructions Vercel
4. Attendre la propagation (quelques minutes)

---

## Configuration Supabase

### Autoriser le Domaine Vercel

1. Aller dans Supabase Dashboard
2. Settings > Authentication > URL Configuration
3. Ajouter dans "Site URL" :
   ```
   https://getchef.fr
   ```

4. Ajouter dans "Redirect URLs" :
   ```
   https://getchef.fr/auth/callback
   https://*.vercel.app/auth/callback
   http://localhost:3000/auth/callback
   ```

### Configuration OAuth Providers

#### Google OAuth
1. Console Google Cloud > APIs & Services > Credentials
2. Créer OAuth 2.0 Client ID
3. Authorized redirect URIs :
   ```
   https://xxx.supabase.co/auth/v1/callback
   ```
4. Copier Client ID et Secret dans Supabase > Authentication > Providers

#### Facebook OAuth
1. Facebook Developers Console
2. Créer une app
3. Ajouter Facebook Login
4. Valid OAuth Redirect URIs :
   ```
   https://xxx.supabase.co/auth/v1/callback
   ```
5. Copier App ID et Secret dans Supabase

#### Apple OAuth
1. Apple Developer Console
2. Identifier > Services IDs
3. Configurer Sign in with Apple
4. Return URLs :
   ```
   https://xxx.supabase.co/auth/v1/callback
   ```
5. Copier les credentials dans Supabase

---

## Post-Déploiement

### Vérifications

- [ ] Homepage se charge correctement
- [ ] Auth fonctionne (signup/signin)
- [ ] OAuth providers fonctionnent
- [ ] Images se chargent
- [ ] Recherche de chefs fonctionne
- [ ] Profil utilisateur accessible
- [ ] Dashboard s'affiche
- [ ] Headers de sécurité présents
- [ ] SSL/HTTPS actif
- [ ] Redirections fonctionnent

### Tests

```bash
# Tester les endpoints
curl https://getchef.fr
curl https://getchef.fr/chefs
curl https://getchef.fr/api/health

# Vérifier les headers
curl -I https://getchef.fr

# Tester l'auth
curl https://getchef.fr/auth/signin
```

### Monitoring

1. **Vercel Analytics**
   - Activer dans Project Settings
   - Suivre Web Vitals

2. **Supabase Logs**
   - Logs > Auth
   - Logs > API
   - Logs > Database

3. **Google Analytics** (optionnel)
   - Ajouter GA_ID dans variables
   - Vérifier tracking

---

## Mise à Jour Continue

### Workflow Git

```bash
# Développement
git checkout -b feature/nouvelle-fonctionnalite
git add .
git commit -m "feat: description"
git push origin feature/nouvelle-fonctionnalite

# Pull Request
# Review + Tests
# Merge dans main

# Auto-deploy Vercel
# Vercel détecte le push et déploie automatiquement
```

### Rollback

En cas de problème :

1. Vercel Dashboard > Deployments
2. Trouver le dernier déploiement stable
3. Cliquer sur "..." > Promote to Production
4. Ou via CLI :
   ```bash
   vercel rollback
   ```

---

## Optimisations Production

### Images

- Utiliser Next.js Image component
- Formats AVIF et WebP activés
- CDN Vercel automatique

### Caching

Vercel met en cache automatiquement :
- Static assets (1 an)
- API routes (configurable)
- Pages statiques (révalidation ISR)

### Edge Functions (optionnel)

Pour une latence ultra-faible :
```javascript
// app/api/route.ts
export const runtime = 'edge';
```

### Database Connection Pooling

Supabase gère automatiquement le pooling de connexions.

---

## Sécurité Production

### Checklist

- [ ] HTTPS activé
- [ ] Headers de sécurité configurés (next.config.js)
- [ ] CORS correctement configuré
- [ ] Rate limiting (Vercel Pro)
- [ ] DDoS protection (Vercel)
- [ ] Secrets jamais exposés côté client
- [ ] RLS activé sur toutes les tables Supabase
- [ ] Service Role Key uniquement côté serveur

### Monitoring Sécurité

- Activer Vercel Pro pour logs avancés
- Configurer alertes Supabase
- Monitorer les tentatives d'auth suspectes

---

## Troubleshooting

### Build Errors

```bash
# Vérifier localement
npm run build

# Nettoyer le cache
rm -rf .next
npm run build

# Vérifier TypeScript
npm run typecheck
```

### Runtime Errors

1. Vérifier les logs Vercel
2. Vérifier les logs Supabase
3. Tester avec variables d'environnement locales
4. Rollback si nécessaire

### Auth Issues

1. Vérifier Redirect URLs dans Supabase
2. Vérifier OAuth credentials
3. Tester en navigation privée
4. Vérifier cookies dans navigateur

---

## Support

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)

### Contact
- Email: dev@getchef.fr
- Slack: #dev-getchef
- GitHub Issues: [repo]/issues

---

## Checklist Finale Déploiement

- [ ] Build local réussi
- [ ] Variables d'environnement configurées
- [ ] Domaine configuré
- [ ] Supabase URLs autorisées
- [ ] OAuth providers configurés
- [ ] Tests post-déploiement passés
- [ ] Monitoring activé
- [ ] Documentation à jour
- [ ] Équipe informée

🚀 **Félicitations, GetChef est en production !**
