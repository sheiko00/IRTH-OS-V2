# IRTH OS — Commerce Operating System

> Full-stack commerce + operations + supply chain + marketing platform.

## 🏗️ Architecture

```
[ Next.js 15 Frontend ]  →  [ NestJS API ]  →  [ PostgreSQL + Redis ]
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
└── docker-compose.yml
```

## ⚡ Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 16 (or use Docker)

### 1. Clone & Install
```bash
git clone <repo> && cd irth-os
npm install
cp .env.example .env
```

### 2. Start Database
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
| Customer | customer@example.com | customer123 |
| Supplier | supplier@example.com | supplier123 |

## 📦 Modules

| Module | Status | API Prefix |
|--------|--------|------------|
| Auth (JWT) | ✅ | `/api/auth` |
| Users & RBAC | ✅ | `/api/users`, `/api/roles` |
| Products | ✅ | `/api/products` |
| Orders | ✅ | `/api/orders` |
| Cart | ✅ | `/api/cart` |
| Suppliers | ✅ | `/api/suppliers` |
| Inventory | ✅ | `/api/inventory` |
| Shipping | ✅ | `/api/shipping` |
| Marketing | ✅ | `/api/marketing` |
| Files | ✅ | `/api/files` |
| Analytics | ✅ | `/api/analytics` |
| Notifications | ✅ | `/api/notifications` |

## 🚀 Deployment

### Docker Build
```bash
docker build -f apps/api/Dockerfile -t irth-api .
docker build -f apps/web/Dockerfile -t irth-web .
```

### Google Cloud Run
Push to `main` → GitHub Actions auto-deploys to Cloud Run.

Required GitHub Secrets:
- `GCP_PROJECT_ID`
- `GCP_WORKLOAD_IDENTITY_PROVIDER`
- `GCP_SERVICE_ACCOUNT`

## 🔧 Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS, shadcn/ui, Recharts
- **Backend:** NestJS, Prisma ORM, JWT Auth
- **Database:** PostgreSQL 16, Redis 7
- **Deploy:** Docker, GitHub Actions, Google Cloud Run
