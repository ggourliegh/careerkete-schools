# Permissions & Role-Based Access

## User roles

- **Student**: default role for individual users
- **Counsellor**: staff at a school, manages caseload
- **Principal**: school leader, sees aggregate analytics only
- **Parent** (Phase 4+): invited by student, sees what student shares
- **Admin**: app-level admin (us)

## Access modes

### Solo user
- Full access to personal features: chat, browse, save careers, action plans
- NOT linked to any school
- Sees no school-related UI
- All data lives under their user account

### Linked user (student with school membership)
- Everything solo users have, PLUS:
- Sees "My School" section showing linked school
- Can toggle sharing permissions per data type
- Can message counsellor (if `allow_messaging = true`)
- Can see collaborative plans (if counsellor created them)
- Can unlink anytime

### Counsellor
- Full access to personal features (they're users too)
- Dashboard showing their school's students who have memberships to them
- Can only see data for students who explicitly opted in (permissions per student)
- Cannot see other schools' students (enforced at DB level via RLS)
- Private notes field (student never sees these)

### Principal
- Aggregate analytics for their school only
- Student counts, engagement trends, popular careers
- Cannot see individual student data
- Cannot see counsellor private notes

## Sharing model (user-controlled)

In student profile, toggles per linked school:
- [ ] Share my saved careers
- [ ] Share my action plans
- [ ] Share my chat history with AI
- [ ] Allow counsellor to message me
- [ ] Allow counsellor to edit my plans collaboratively

Each toggle:
- Defaults to OFF when linking
- Can be toggled on/off anytime
- Changes take effect immediately
- Counsellor sees last-updated time on shared items

## Unlinking flow

1. Student clicks "Leave school" in profile
2. Confirmation dialog explains what will happen:
   - Your plans, saved careers, chat stay with you
   - Counsellor will no longer see your updates
   - Shared plans become read-only for counsellor
   - Counsellor's notes about you stay with the counsellor
3. Student confirms → membership.status = 'archived'
4. Counsellor sees student moved to "Past Students" section

## Re-linking (returning student)

- Student initiates (counsellor can't force re-link)
- New invitation process from counsellor
- Student sees: "Your previous data is archived with [Counsellor]. Fresh sharing toggles apply."
- User chooses what to share NOW — no auto-merge from previous membership

## Security implementation

- **Supabase Row Level Security (RLS)** enforces permissions at database level
- Every table has policies restricting reads/writes by user_id and membership status
- Counsellor queries filtered by active school_memberships where they have counsellor role
- Students never see other students' data
- Schools never see other schools' data
