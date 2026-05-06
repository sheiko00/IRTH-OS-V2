# IRTH OS — Commerce Operating System

> Full-stack commerce + operations + supply chain + marketing platform.

## 🏗️ Architecture

```
[ Next.js 15 Frontend ]  →  [ NestJS API ]  →  [ PostgreSQL + Redis ]
         (Vercel)              (Cloud Run)        (Neon + Upstash)
```

**Monorepo Structure:**
```
irth-os/
├── apps/
│   ├── api/          # NestJS Backend (REST API)
│   └── web/          # Next.js Frontend (App Router)
├── packages/
│   ├── types/        # Shared TypeScript types
│   ├── config/       # Shared configs
│   └── ui/           # Shared UI components
├── prisma/           # Database schema + migrations
├── vercel.json       # Vercel deployment config
└── docker-compose.yml
```

## ⚡ Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose (for local DB)

### 1. Clone & Install
```bash
git clone https://github.com/sheiko00/IRTH-OS-V2.git
cd IRTH-OS-V2
npm install
cp .env.example .env
```

### 2. Start Database (Local)
```bash
docker compose up -d
```

### 3. Setup Database
```bash
npx prisma generate
npx prisma migrate dev --name init
npx ts-node prisma/seed.ts
```

### 4. Run Development
```bash
# API (port 3001)
npm run dev:api

# Web (port 3000)
npm run dev:web
```

### 5. Open
- **Frontend:** http://localhost:3000
- **API:** http://localhost:3001/api
- **DB Studio:** `npx prisma studio`

## 🔐 Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@irth.app | admin123 |

## 📦 Modules (13 API Modules)

| Module | API Prefix | Features |
|--------|------------|----------|
| Auth (JWT) | `/api/auth` | 3 auth flows, refresh tokens |
| Users & RBAC | `/api/users`, `/api/roles` | 28 permissions, role management |
| Products | `/api/products` | CRUD, variants, categories, search |
| Orders | `/api/orders` | Full lifecycle, status transitions, stock mgmt |
| Cart | `/api/cart` | Guest + authenticated, merge on login |
| Suppliers | `/api/suppliers` | CRUD, files, batches |
| Inventory | `/api/inventory` | Stock, expiry alerts, reorder |
| Shipping | `/api/shipping` | Tracking, carrier webhook |
| Marketing | `/api/marketing` | Campaigns, coupons, influencers |
| Files | `/api/files` | GCS upload, folders |
| Analytics | `/api/analytics` | KPIs, sales, top products |
| Notifications | `/api/notifications` | User alerts, mark read |
| Email | (internal) | SpaceMail SMTP, branded templates |

## 🆓 Free-Tier Deployment (0 EGP)

### Stack

| Service | Provider | Free Tier |
|---------|----------|-----------|
| Frontend | **Vercel** | Unlimited deploys |
| Backend | **Google Cloud Run** | 2M req + 360 hrs/mo |
| Database | **Neon** or **Supabase** | 0.5 GB storage |
| Cache | **Upstash** | 10K cmds/day |
| Storage | **Google Cloud Storage** | 5 GB free |
| Email | **SpaceMail** | SMTP included |
| CI/CD | **GitHub Actions** | 2000 min/mo |
| CDN | **Cloudflare** | Unlimited |

### Deploy Frontend (Vercel)

1. Connect your GitHub repo at [vercel.com](https://vercel.com)
2. Set **Root Directory** to `apps/web`
3. Add environment variables:
   - `API_URL` = your Cloud Run API URL
4. Deploy!

### Deploy Backend (Cloud Run)

```bash
# Build & push
docker build -f apps/api/Dockerfile -t gcr.io/PROJECT_ID/irth-api .
docker push gcr.io/PROJECT_ID/irth-api

# Deploy
gcloud run deploy irth-api \
  --image gcr.io/PROJECT_ID/irth-api \
  --region me-west1 \
  --set-env-vars "DATABASE_URL=...,REDIS_URL=...,JWT_SECRET=..."
```

Or push to `main` → GitHub Actions auto-deploys.

### Setup Neon Database
1. Create free DB at [neon.tech](https://neon.tech)
2. Copy connection string to `DATABASE_URL`
3. Run: `npx prisma migrate deploy`

### Setup Upstash Redis
1. Create free DB at [upstash.com](https://upstash.com)
2. Copy Redis URL to `REDIS_URL`

### Setup SpaceMail
Set in `.env`:
```
SMTP_HOST=smtp.spacemail.com
SMTP_PORT=465
SMTP_USER=info@yourdomain.com
SMTP_PASS=your_password
SMTP_FROM=info@yourdomain.com
```

## 💰 Cost Scaling Guide

```
Month 1:  0 EGP  →  Build + test
Month 2:  0 EGP  →  Soft launch (10-50 orders)
Month 3:  0 EGP  →  Real operations
Month 4+: Pay when you earn 💰
```

**When to upgrade (100+ orders/mo):**
- Database: Neon Pro ($19/mo) or Supabase Pro ($25/mo)
- Backend: Cloud Run scales automatically (pay per use)
- Redis: Upstash Pay-as-you-go ($0.2/100K cmds)

## 🔧 Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS, shadcn/ui
- **Backend:** NestJS 11, Prisma ORM, JWT Auth, Nodemailer
- **Database:** PostgreSQL 16 (Neon/Supabase), Redis (Upstash)
- **Storage:** Google Cloud Storage
- **Email:** SpaceMail SMTP
- **Deploy:** Vercel + Cloud Run + GitHub Actions

## 📄 License

MIT
