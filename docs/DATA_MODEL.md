# Data Model

## Core tables

### `users`
Personal accounts. Owned by the user forever.
- `id` (uuid, primary key, matches Supabase auth.users.id)
- `email` (text, unique)
- `display_name` (text)
- `age_range` (text: '14-17', '18-21', '22-25', '26+')
- `region` (text: NZ region)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `schools`
School organisations.
- `id` (uuid, primary key)
- `name` (text)
- `region` (text)
- `decile` (integer, nullable)
- `created_at` (timestamp)

### `school_memberships`
Links users to schools with granular permissions. Archived when user leaves school.
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to users)
- `school_id` (uuid, foreign key to schools)
- `role` (text: 'student', 'counsellor', 'principal')
- `status` (text: 'active', 'archived')
- `share_careers` (boolean, default false) — share saved careers with counsellor
- `share_plans` (boolean, default false) — share action plans with counsellor
- `share_chats` (boolean, default false) — share AI chat history
- `allow_messaging` (boolean, default false) — allow counsellor to message
- `joined_at` (timestamp)
- `archived_at` (timestamp, nullable)

### `saved_careers`
User's saved careers from the browse/chat experience.
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key)
- `career_key` (text: identifier like 'electrician', 'softwareDev')
- `saved_at` (timestamp)

### `action_plans`
User's career action plans. Created by user or counsellor (if permitted).
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key) — plan always belongs to user
- `created_by` (uuid, foreign key to users) — who created it (could be counsellor)
- `title` (text)
- `career_key` (text, nullable) — linked career if any
- `status` (text: 'active', 'archived')
- `created_at` (timestamp)

### `plan_steps`
Individual steps within a plan.
- `id` (uuid, primary key)
- `plan_id` (uuid, foreign key to action_plans)
- `order` (integer)
- `text` (text) — the step description
- `action_type` (text: 'research', 'email', 'call', 'visit', etc.)
- `ai_generated` (boolean) — was this generated via AI agent
- `ai_result` (text, nullable) — AI output if used "do this for me"
- `completed` (boolean, default false)
- `completed_at` (timestamp, nullable)
- `completed_by` (uuid, nullable) — user or counsellor

### `counsellor_notes`
Private notes a counsellor keeps about a student. Owned by counsellor.
- `id` (uuid, primary key)
- `counsellor_id` (uuid, foreign key to users)
- `student_id` (uuid, foreign key to users)
- `school_id` (uuid, foreign key to schools)
- `content` (text)
- `is_private` (boolean, default true) — private = only counsellor sees
- `created_at` (timestamp)
- `updated_at` (timestamp)

### `chat_sessions`
Chat history between user and AI. Optional per-user retention.
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key)
- `title` (text, auto-generated)
- `message_count` (integer)
- `started_at` (timestamp)
- `last_message_at` (timestamp)

### `messages`
Two purposes: chat messages with AI, and direct messages between counsellor/student.
- `id` (uuid, primary key)
- `session_id` (uuid, nullable — for AI chat)
- `from_user_id` (uuid)
- `to_user_id` (uuid, nullable — for direct messages)
- `role` (text: 'user', 'assistant', 'counsellor', 'student')
- `content` (text)
- `created_at` (timestamp)

## Key principle: ownership

- User data (saved_careers, action_plans, chat_sessions): always owned by user
- Counsellor data (counsellor_notes): always owned by counsellor
- School_memberships define the relationship, permissions, and status
- When a user leaves a school:
  - Their user-owned data stays with them (they can continue editing)
  - The membership becomes 'archived'
  - Counsellor's notes about them remain with the counsellor
  - Shared plans become read-only for counsellor (they can view history but not edit)
  - User retains full edit capability on their plans
