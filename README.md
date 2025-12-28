# Taxi Project

> Site de réservation de taxi en ligne

## Quick Start

### Prérequis

- Node.js >= 18.0.0
- PostgreSQL (local via Docker ou cloud via Supabase/Neon)
- npm ou yarn

### Installation

```bash
# 1. Cloner le repo
git clone <url-du-repo>
cd taxi-project-web

# 2. Installer les dépendances
npm run setup

# 3. Configurer l'environnement
cp .env.example .env.local
# Éditer .env.local avec vos valeurs

# 4. Lancer PostgreSQL (option Docker)
docker run --name taxi-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=taxi_db -p 5432:5432 -d postgres:15

# 5. Initialiser la base de données
npm run db:migrate

# 6. Lancer le projet
npm run dev
```

### Accès

| Service | URL |
|---------|-----|
| Frontend (Next.js) | http://localhost:3000 |
| API (Express) | http://localhost:4000 |
| API Health Check | http://localhost:4000/health |
| Prisma Studio | http://localhost:5555 |

## Architecture

```
taxi-project-web/
├── web/                    # Frontend Next.js 14
│   ├── src/
│   │   ├── app/            # App Router (pages)
│   │   ├── components/     # Composants React
│   │   └── lib/            # Utilitaires
│   └── package.json
│
├── api/                    # Backend Express
│   ├── src/
│   │   ├── routes/         # Routes API
│   │   ├── controllers/    # Logique métier
│   │   ├── services/       # Services (DB, etc.)
│   │   └── middleware/     # Auth, validation
│   ├── prisma/
│   │   └── schema.prisma   # Modèles DB
│   └── package.json
│
├── .env.example            # Template variables
├── package.json            # Scripts racine
├── CLAUDE.md               # Contexte projet (Claude)
└── README.md               # Ce fichier
```

## Scripts Disponibles

### Racine (orchestration)

```bash
npm run dev          # Lance web + api en parallèle
npm run build        # Build production (web + api)
npm run lint         # Lint tout le projet
npm run setup        # Installe toutes les dépendances
npm run clean        # Supprime node_modules et builds
```

### Web uniquement

```bash
npm run dev:web      # Next.js dev server (:3000)
npm run build:web    # Build Next.js
```

### API uniquement

```bash
npm run dev:api      # Express dev server (:4000)
npm run build:api    # Build TypeScript
```

### Base de données (Prisma)

```bash
npm run db:migrate   # Créer/appliquer migrations
npm run db:studio    # Ouvrir Prisma Studio
npm run db:generate  # Générer le client Prisma
npm run db:push      # Push schema (dev rapide)
```

## Stack Technique

| Couche | Technologie |
|--------|-------------|
| Frontend | Next.js 14, React 18, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| ORM | Prisma |
| Database | PostgreSQL |
| Auth | NextAuth (à venir) |
| Maps | Google Maps API (à venir) |
| Paiement | Stripe (à venir) |
| Temps réel | Socket.IO (à venir) |
| Deploy | Vercel (web) + Render/Railway (api) |

## Conventions

### Commits

```
feat(scope): description   # Nouvelle fonctionnalité
fix(scope): description    # Correction bug
docs: description          # Documentation
chore: description         # Maintenance
```

### Branches

- `main` - Production stable
- `develop` - Développement
- `feature/*` - Nouvelles fonctionnalités
- `fix/*` - Corrections

## Variables d'Environnement

Voir [.env.example](.env.example) pour la liste complète.

**Important**: Ne jamais committer `.env.local` ou tout fichier contenant des secrets.

## Licence

Privé - Tous droits réservés
