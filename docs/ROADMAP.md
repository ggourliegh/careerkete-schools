# Roadmap

## Phase 0: Foundation (Week 1, Session 1-2)
**Goal**: Project setup, documentation, tooling

- [x] GitHub repo created
- [x] Supabase project provisioned
- [x] Cloudflare account ready
- [x] Foundational docs written
- [ ] V1 visual identity extracted
- [ ] React + Vite + TypeScript initialised
- [ ] Supabase client connected
- [ ] Basic routing in place
- [ ] Magic link login working
- [ ] First deploy to Cloudflare Pages

**Deliverable**: A "hello world" app at a public URL with working login.

## Phase 1: V2 Solo (Week 1-2)
**Goal**: Port v1 functionality to new architecture. Launch publicly.

- [ ] Database schema: users, saved_careers, action_plans, plan_steps, chat_sessions, messages
- [ ] User profile page (name, region, age)
- [ ] Browse tab: 115+ careers with detail modal
- [ ] Chat tab: AI chat with Claude via Cloudflare Worker proxy
- [ ] Save careers (synced to cloud)
- [ ] Agent tab: 10 actions + plan with "do it for me"
- [ ] Data migration path from v1 localStorage (optional import)
- [ ] Landing page for unauthenticated users
- [ ] Privacy policy + terms of service
- [ ] Deploy to careerkete.co.nz
- [ ] Soft launch

**Deliverable**: Public v2 solo app, looking identical to v1, with accounts and cloud sync.

## Phase 2: School Features (Week 3-4)
**Goal**: Add school linking and basic counsellor features

- [ ] Schools table + admin creation flow
- [ ] School_memberships table
- [ ] Counsellor invitation flow (email-based)
- [ ] Student accepts invitation
- [ ] Granular sharing toggles in student profile
- [ ] Counsellor dashboard: list of their students
- [ ] Counsellor can view student's shared data (read-only)
- [ ] Basic messaging between counsellor and student
- [ ] "Leave school" flow with proper archiving
- [ ] Row-level security policies for all tables

**Deliverable**: Minimum viable school product. Ready to demo to pilot schools.

## Phase 3: Collaboration (Week 5-6)
**Goal**: Deeper collaboration features

- [ ] Counsellor can edit student's plan (if permitted)
- [ ] Counsellor private notes (owned by counsellor)
- [ ] Counsellor AI agent (draft conversation starters, summarise student)
- [ ] Plan version history
- [ ] Shared plan snapshots on unlink
- [ ] Message threading

## Phase 4: Reporting (Week 7-8)
**Goal**: Analytics for schools

- [ ] School analytics dashboard (aggregate, no PII)
- [ ] Counsellor reporting (per-student engagement)
- [ ] Board of Trustees report template
- [ ] ERO evidence export
- [ ] Career Development Benchmarks alignment
- [ ] Leavers destination tracking

## Phase 5: Polish & Scale (Ongoing)
- [ ] PWA + offline support
- [ ] Parent invite flow
- [ ] Advanced admin dashboard
- [ ] School branding options
- [ ] Kamar/eTAP integrations
- [ ] Mobile app wrappers (capacitor)

## Design backlog

Items captured but not yet scheduled. Pull into a phase when prioritised.

- [ ] **Redesign logo mark to reflect "Kete"** (Māori woven basket metaphor). Current star-in-peach-circle is a placeholder from v1 and doesn't express the brand meaning.
  - Directions to explore: stylised woven pattern, basket silhouette, abstract weave, sprout-in-basket
  - Keep the peach → terracotta gradient
  - Must work at 32px (header) and 64px+ (marketing surfaces)
- [ ] **Login is not discoverable from the landing page.** The person icon in the top-right of `/` is too subtle for a first-time visitor to find. Needs a more obvious primary CTA or text label. Revisit in Phase 1 UX pass.

## Success criteria

**End of Phase 1**: 100+ users signed up, Phase 1 features working reliably
**End of Phase 2**: 2-3 pilot schools using the counsellor dashboard
**End of Phase 3**: 5+ pilot schools with active counsellor-student collaboration
**End of Phase 4**: Schools using reports for Board/ERO
**End of Phase 5**: 50+ paying schools, 10,000+ active students
