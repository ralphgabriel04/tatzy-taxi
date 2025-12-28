# CLAUDE.md — Projet Taxi

> Fichier de mémoire pour Claude Code. À maintenir à jour.

## Contexte Projet

**Nom**: Taxi Project
**Description**: Site de réservation de taxi en ligne
**Statut**: Sprint 0 — Configuration environnement

## Stack Technique

| Couche | Technologie | Notes |
|--------|-------------|-------|
| Frontend | Next.js 14 + Tailwind CSS | App Router, TypeScript |
| Backend | Node.js + Express | API REST, TypeScript |
| ORM | Prisma | PostgreSQL |
| Database | PostgreSQL | Local (Docker) ou Supabase/Neon |
| Auth | NextAuth | Phase ultérieure |
| Maps | Google Maps API | Phase ultérieure |
| Paiement | Stripe | Phase ultérieure |
| Temps réel | Socket.IO | Phase ultérieure |
| Deploy | Vercel (web) + Render/Railway (api) | — |

## Structure du Projet

```
taxi-project-web/
├── web/                 # Frontend Next.js
│   ├── src/
│   │   ├── app/         # App Router (pages)
│   │   ├── components/  # Composants React
│   │   ├── lib/         # Utilitaires
│   │   └── styles/      # CSS global
│   └── package.json
├── api/                 # Backend Express
│   ├── src/
│   │   ├── routes/      # Routes API
│   │   ├── controllers/ # Logique métier
│   │   ├── services/    # Services (DB, external)
│   │   ├── middleware/  # Auth, validation, etc.
│   │   └── index.ts     # Entry point
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
├── .env.example         # Template variables env
├── package.json         # Scripts racine
└── CLAUDE.md            # Ce fichier
```

## Ports de Développement

- **Web (Next.js)**: http://localhost:3000
- **API (Express)**: http://localhost:4000
- **Prisma Studio**: http://localhost:5555

## Règles de Travail avec Claude

### Contraintes NON NÉGOCIABLES

1. **Petits incréments**: 1 à 3 fichiers modifiés par itération maximum
2. **Pas de refactor magique**: Ne jamais modifier plusieurs dossiers en une fois
3. **Pas de secrets dans le code**: Utiliser `.env.local` uniquement
4. **Configs protégées**: Ne pas modifier `tsconfig`, `tailwind.config`, `eslint`, `prisma.schema` sans justification claire

### Pour chaque modification, fournir:

1. **Ce qui change** — Liste des fichiers modifiés
2. **Pourquoi** — Justification technique
3. **Comment tester** — Commandes ou étapes de validation
4. **Comment rollback** — `git checkout` ou instructions

### Definition of Done (DoD) — Taxi

Une feature est "Done" quand:
- [ ] Code TypeScript sans erreurs (`npm run lint`)
- [ ] Build passe (`npm run build`)
- [ ] Tests passent (quand applicables)
- [ ] Pas de secrets exposés
- [ ] Documentation mise à jour si nécessaire
- [ ] Commit atomique avec message clair

## Commandes Principales

```bash
# Développement
npm run dev          # Lance web + api en parallèle

# Web uniquement
npm run dev:web      # Next.js sur :3000

# API uniquement
npm run dev:api      # Express sur :4000

# Base de données
npm run db:migrate   # Prisma migrate dev
npm run db:studio    # Prisma Studio
npm run db:generate  # Prisma generate

# Qualité
npm run lint         # ESLint
npm run build        # Build production
```

## Conventions de Commits

Format: `type(scope): description`

Types:
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `style`: Formatage (pas de changement de code)
- `refactor`: Refactoring
- `test`: Ajout/modification de tests
- `chore`: Maintenance (deps, config)

Exemples:
```
feat(api): add booking creation endpoint
fix(web): correct date picker timezone issue
chore: update dependencies
```

## Variables d'Environnement

Voir `.env.example` pour la liste complète.

**Important**: Ne jamais committer `.env.local` ou tout fichier contenant des secrets.

## Phases du Projet

- [x] **Phase 0**: Setup environnement (en cours)
- [ ] **Phase 1**: CRUD réservations basique
- [ ] **Phase 2**: Interface client (formulaire réservation)
- [ ] **Phase 3**: Dashboard chauffeur
- [ ] **Phase 4**: Auth + sécurisation
- [ ] **Phase 5**: Intégration Maps
- [ ] **Phase 6**: Paiement Stripe
- [ ] **Phase 7**: Temps réel (Socket.IO)

---

*Dernière mise à jour: Sprint 0*
