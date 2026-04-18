# Architecture Decision Records

## ADR-001: Cloudflare over Netlify for hosting
**Date**: 2026-04-18
**Status**: Accepted

**Context**: We need to choose hosting. Current v1 uses Netlify which works well but has limits.

**Decision**: Use Cloudflare Pages for frontend and Cloudflare Workers for API proxy.

**Reasons**:
- Unlimited bandwidth on free tier (Netlify: 100GB/month)
- Workers free tier: 100K requests/day (Netlify: 125K/month)
- Better scaling economics as user base grows
- Native integration between Pages and Workers
- Cloudflare's global CDN is excellent

**Trade-offs**: Slightly more technical tooling than Netlify. Acceptable.

---

## ADR-002: Supabase over Firebase for backend
**Date**: 2026-04-18
**Status**: Accepted

**Context**: We need auth, database, and realtime sync.

**Decision**: Use Supabase.

**Reasons**:
- PostgreSQL (relational) fits our data model better than Firestore (NoSQL)
- Singapore region gives NZ-compliant data residency
- Open source — can self-host if needed
- Row-level security is first-class feature
- Realtime subscriptions built in
- Magic link auth out of the box

**Trade-offs**: Newer ecosystem than Firebase. Acceptable.

---

## ADR-003: React + Vite over Next.js
**Date**: 2026-04-18
**Status**: Accepted

**Context**: Choose frontend framework.

**Decision**: React + Vite + TypeScript (no SSR).

**Reasons**:
- App is primarily authenticated — no SSR/SEO benefit
- Simpler mental model than Next.js
- Faster dev loop (Vite HMR)
- Smaller bundle, faster load
- More flexibility for PWA/offline features later

**Trade-offs**: No server components. Acceptable for this use case.

---

## ADR-004: CSS variables over Tailwind
**Date**: 2026-04-18
**Status**: Accepted

**Context**: Styling approach.

**Decision**: Custom CSS with design-token variables (matching v1 structure).

**Reasons**:
- Preserve v1 aesthetic exactly (critical for user continuity)
- V1 is already built this way
- Claude Code can copy v1 styles directly
- No additional build step
- Easier to reason about

**Trade-offs**: Slower to write new components than Tailwind. Acceptable given v1 has most patterns already.

---

## ADR-005: Separate repo from v1
**Date**: 2026-04-18
**Status**: Accepted

**Context**: V2 is a ground-up rebuild with different architecture (React, Supabase, auth).

**Decision**: New repo `careerkete-schools` separate from `careerkete` (v1).

**Reasons**:
- Different tech stack entirely
- V1 stays as production reference
- No risk of breaking v1 during v2 development
- Each repo has its own deployment pipeline
- Clean history in each repo

**Trade-offs**: Two repos to maintain. Acceptable short-term; v1 is stable and low-maintenance.

---

## ADR-006: Magic link auth (no passwords)
**Date**: 2026-04-18
**Status**: Accepted

**Decision**: Email magic links only. No passwords, no social login initially.

**Reasons**:
- Zero password management burden for users
- No password reset flows to build
- Better UX for occasional users (students who don't use it daily)
- Can add Google/Apple login later if needed

**Trade-offs**: Requires email access to login. Acceptable.
