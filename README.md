# Elisa Ghion Site

Personal website and admin panel for Elisa Ghion, contact improvisation teacher and performer.

## Tech Stack

- **Framework:** React Router v7 (SSR) + Vite + TypeScript
- **Styling:** Tailwind CSS 4 with custom brand theme
- **Database:** SQLite via Drizzle ORM + better-sqlite3
- **Server:** Express 5
- **Animations:** GSAP + Three.js (hero section)
- **Deployment:** Fly.io with persistent volume

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env and set ADMIN_PASSWORD and SESSION_SECRET

# Run database migrations
npm run db:push

# Seed database with sample data
npm run db:seed

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_PATH` | `./data/site.db` | SQLite database file path |
| `UPLOAD_DIR` | `./data/uploads` | Directory for uploaded images |
| `ADMIN_PASSWORD` | `admin` | Password for admin panel login |
| `SESSION_SECRET` | `dev-secret-change-me` | Secret for signing session cookies |

## Project Structure

```
app/
├── components/         # React components
│   ├── admin/          # Admin panel components (AdminFormField, ImageUpload, etc.)
│   ├── hero/           # Hero section with Three.js
│   └── ...             # Public site components
├── data/               # Static seed data files
├── db/
│   ├── schema.ts       # Drizzle table definitions
│   ├── index.server.ts # Database connection
│   └── queries.server.ts # All database queries
├── lib/
│   ├── auth.server.ts  # Cookie-based session auth
│   ├── toast.server.ts # Flash message system
│   └── uploads.server.ts # File upload handling
├── routes/             # Route modules (loaders, actions, components)
├── routes.ts           # Route definitions
├── app.css             # Global styles + Tailwind @theme
└── root.tsx            # Root layout
data/                   # SQLite DB + uploads (gitignored)
drizzle/                # Migration SQL files (committed)
scripts/
└── seed.ts             # Database seed script
server.js               # Express production server
```

### Path Alias

`~/` resolves to `./app/` — use `import { foo } from "~/lib/bar"` for all app imports.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run typecheck` | Type-check with TypeScript |
| `npm run lint` | Lint with ESLint (zero warnings) |
| `npm run db:generate` | Generate migration files from schema changes |
| `npm run db:push` | Apply schema directly to local database |
| `npm run db:seed` | Seed database with sample data (dev) |
| `npm run db:seed:prod` | Seed database with sample data (production) |
| `npm run db:studio` | Open Drizzle Studio to inspect database |

## Database

### Schema Changes

```bash
# 1. Edit app/db/schema.ts
# 2. Generate migration
npm run db:generate
# 3. Apply locally
npm run db:push
```

Migrations are in `drizzle/` and run automatically on server startup via `server.js`. They use `CREATE TABLE IF NOT EXISTS` so they're safe to re-run.

### Seeding

The seed script (`npm run db:seed`) populates all tables with sample data. It **clears all existing data** before inserting, so only run it on a fresh database or when you're okay losing current data.

Seed data is defined in `app/data/` (workshops, gallery, collaborations, research areas, videos) and in `scripts/seed.ts` (about page settings).

## Admin Panel

Accessible at `/admin` after logging in at `/admin/login` with the configured `ADMIN_PASSWORD`.

### Features

- **Dashboard** — overview of all content
- **About** — edit bio, teaching philosophy, profile and hero images (singleton settings page)
- **Workshops** — full CRUD with testimonials, schedule, and highlight management
- **Gallery** — image uploads with drag-to-reorder and configurable grid spans
- **Collaborations** — partner organizations with drag-to-reorder
- **Research** — research areas with live content preview
- **Videos** — video embeds with preview

### Conventions

- All admin routes export `handle.breadcrumb` for navigation breadcrumbs
- Toast notifications use cookie-based flash messages
- Forms use `AdminFormField`, `ImageUpload`, `CollapsibleSection` components
- CSS utilities: `.admin-card`, `.admin-input`, `.admin-label`, `.admin-btn-primary`, `.admin-btn-secondary`
- CRUD resources follow the pattern: list, new, edit, delete routes
- Drag-to-reorder uses `@dnd-kit` via the `SortableList` component

## Brand Theme

Defined in `app/app.css` under `@theme`:

| Token | Color | Usage |
|-------|-------|-------|
| `--color-brand-terracotta` | `#D4654A` | Primary accent |
| `--color-brand-cream` | `#FBF6F0` | Backgrounds |
| `--color-brand-sand` | `#F0E6D8` | Secondary backgrounds |
| `--color-brand-charcoal` | `#1E1E1E` | Text, admin sidebar |
| `--color-brand-gold` | `#C9A96E` | Decorative accents |

Fonts: **Playfair Display** (headings), **Inter** (body).

## Deployment

### Fly.io

The site deploys to Fly.io (Paris region) via GitHub Actions on push to `main`.

**CI pipeline** (`.github/workflows/deploy.yml`):
1. ESLint check
2. TypeScript check
3. Deploy to Fly.io (main branch only)

**Required GitHub secrets:**
- `FLY_API_TOKEN` — generate with `fly tokens create deploy`

**Infrastructure:**
- Shared CPU, 512MB RAM
- Persistent volume mounted at `/data` (database + uploads)
- Auto-stop/start machines (scales to zero when idle)
- Health check at `/healthcheck`

### Manual Operations

```bash
# Deploy manually
fly deploy --remote-only

# SSH into the machine
fly ssh console -a elisa-ghion-site

# Seed production database (WARNING: clears all existing data)
fly ssh console -a elisa-ghion-site -C "npm run db:seed:prod"

# Check logs
fly logs -a elisa-ghion-site
```

### How Migrations Work in Production

The `server.js` runs Drizzle migrations from the `drizzle/` folder on every startup, before accepting requests. This means:
- New tables are created automatically on deploy
- Existing tables and data are not affected
- No manual migration step needed after deploy
