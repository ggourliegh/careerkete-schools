# Architecture

## Tech Stack

### Frontend
- **Framework**: React 18 + Vite + TypeScript
- **Routing**: React Router (with code splitting for role-based modules)
- **Styling**: CSS variables + custom styles (NOT Tailwind — preserve v1 aesthetic)
- **State**: React Context + Supabase real-time subscriptions
- **Build**: Vite (fast HMR, optimised production bundles)

### Backend
- **Database**: Supabase PostgreSQL (Singapore region for NZ latency)
- **Auth**: Supabase Auth (magic link email — no passwords)
- **Realtime**: Supabase real-time subscriptions
- **Storage**: Supabase Storage for any future file uploads

### Infrastructure
- **Frontend hosting**: Cloudflare Pages (static site + auto-deploy from Git)
- **API proxy**: Cloudflare Workers (proxies Claude API calls, hides key server-side)
- **Domain**: careerkete.co.nz (registered separately)
- **Environment variables**: Cloudflare Workers secrets for API keys

### Development tools
- **Code editor**: VS Code
- **AI assistant**: Claude Code (Opus 4.7)
- **Version control**: Git + GitHub
- **Package manager**: npm
- **CLI tools**: Wrangler (Cloudflare), Supabase CLI (future)

## Why these choices?

See [DECISIONS.md](DECISIONS.md) for rationale.

## Key architectural principles

1. **User data lives in the cloud database, not the device**. The device is a cache.
2. **Real-time sync by default**. Changes propagate to all user devices immediately.
3. **Code splitting by role**. Student modules and counsellor modules load separately.
4. **Row-level security enforced in the database**, not just UI. A counsellor literally cannot query another school's data at the DB level.
5. **PWA-ready from day one**. Service worker for offline, installable on mobile.
6. **API key never touches the browser**. Cloudflare Worker proxies all Claude API calls.
