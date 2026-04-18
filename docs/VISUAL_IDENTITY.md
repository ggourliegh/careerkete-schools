# Visual Identity

Extracted from CareerKete v1 (careerkete repo). v2 must look visually identical to v1 — preserve every token exactly. When a design decision is ambiguous, v1 is the source of truth.

Canonical files:
- `src/styles/tokens.css` — all design tokens as CSS custom properties
- `src/styles/base.css` — reset + body/shell baseline
- `src/styles/components.css` — every component pattern extracted from v1

This document explains the system; the CSS files carry the full extraction.

## Design feel

Warm, earthy, mobile-first. Cream background with soft radial gradients (peach top-left, sage bottom-right), rounded cards that float on subtle shadows, serif display type (Fraunces) paired with a friendly sans (Nunito). Single accent gradient — peach → terracotta — for every primary action, so the app has one strong visual voice.

## Colour palette

### Backgrounds & surfaces
| Token | Hex | Purpose |
|---|---|---|
| `--cream` | `#FBF6EE` | Page background, tabs container, app shell |
| `--creamW` | `#F5EBD9` | Warm cream — hover states, inline badges, category chips |
| `--paper` | `#FFF` | Card surface — every elevated element sits on paper |

### Warm accents (primary brand)
| Token | Hex | Purpose |
|---|---|---|
| `--peach` | `#FFD9B3` | Soft peach — user avatar start, gradient start, hover borders |
| `--peachD` | `#F4A261` | Peach deep — primary gradient start, focus borders |
| `--terra` | `#E07A5F` | Terracotta — the italic "Kete" in logo, active links, primary gradient end, accent bullets, the single hero colour |

### Cool accents (secondary)
| Token | Hex | Purpose |
|---|---|---|
| `--sage` | `#A8C4A2` | AI avatar background, success states, "Saved" button |
| `--sageD` | `#6B9080` | Sage gradient end, "Live results" labels, checked plan items |

### Category accents
| Token | Hex | Purpose |
|---|---|---|
| `--blue` | `#5B8DEF` | `modern` / tech category; project/plan action icon |
| `--purple` | `#9B72CF` | `future` category; CV action icon |
| `--rose` | `#E8637A` | `essential` services category |
| `--gold` | `#D4A843` | `trade` / hands-on category |

### Text
| Token | Hex | Purpose |
|---|---|---|
| `--ink` | `#2D2A26` | Primary text, headings, filled buttons text |
| `--inkS` | `#5A544D` | Secondary text, body copy in cards |
| `--muted` | `#8A8278` | Tertiary text, metadata, placeholders |

## Typography

Fraunces and Nunito are loaded together via a single Google Fonts request. Fraunces uses optical sizing (`opsz 9..144`) so it scales cleanly from small captions to hero headings.

- **Display**: `'Fraunces', serif` — headings, logo, card titles, quiz questions. Weights 400/500/600/700.
- **Body**: `'Nunito', -apple-system, sans-serif` — everything else. Weights 400/500/600/700.
- **Base size**: `16px`, line-height `1.5`, `-webkit-font-smoothing: antialiased`.

Typical scale (font-size / line-height):
- Hero headings: `28px` Fraunces 600 (Chat welcome `h1`; mobile → `24px`)
- Section headings: `22px` Fraunces 600 (sheet/agent hero)
- Card titles: `14–18px` Fraunces 600
- Body: `13–14px` Nunito 400–500
- Metadata: `10–12px` Nunito 500–600
- Tiny labels / tags: `8–11px` Nunito 700, uppercase, letter-spacing `.03em–.04em`

Italic Fraunces is reserved for the `em` in `Career<em>Kete</em>` and micro-moments ("find *your* thing", "Let's find *your* thing") — always coloured `--terra`.

## Shadows

Three layered shadows, all tinted with the ink colour so they read warm rather than blue-grey.

| Token | Value | Purpose |
|---|---|---|
| `--sh1` | `0 2px 8px rgba(45,42,38,.06)` | Default card rest, header buttons, input fields |
| `--sh2` | `0 8px 24px rgba(45,42,38,.08)` | Hover elevation, primary CTA rest, sheet cards |
| `--sh3` | `0 16px 48px rgba(45,42,38,.12)` | Hero CTA hover, modal peaks |

## Radii

Deliberately generous — nothing has sharp corners.

| Token | Value | Usage |
|---|---|---|
| `--r1` | `12px` | Inner elements — pills, small cards, quick replies |
| `--r2` | `18px` | Default card, message bubble, input wrapper |
| `--r3` | `24px` | Sheet category header |
| `--r4` | `32px` | Bottom sheet top corners |

Circles (`border-radius: 50%`) are used for: the logo mandala, icon buttons, avatars, checkbox indicators, small SVG FABs.

## Layout

- **App shell**: `.app` — `max-width: 720px`, centred, full viewport height (`100dvh`). Flex column: header → tabs → active view → input area. `overflow: hidden` on `html, body` — scroll is delegated to view containers.
- **Single breakpoint**: `@media (max-width: 480px)` — shrinks hero heading to `24px`, tabs to `11px`, and collapses the Browse two-column grid to a single column.
- **Chat margin**: quick-reply rows indent `38px` from the left edge so they align under the AI avatar column.

## Gradients

All gradients are `135deg` (top-left → bottom-right). Five gradient pairings cover the app:

- **Primary action** — `linear-gradient(135deg, var(--peachD), var(--terra))` — every primary button, user avatar, logo mandala.
- **AI / success** — `linear-gradient(135deg, var(--sage), var(--sageD))` — AI avatar, `h-mainstream` category header.
- **Category — trade/gold** — `#F5BE46 → #E09B3D` (hero) or `#F5BE46 → #C98B20` (hands-on); ink text.
- **Category — modern/blue** — `#7BA4F7 → var(--blue)`; white text.
- **Category — future/purple** — `#B490E0 → var(--purple)`; white text.
- **Category — essential/rose** — `#F0929F → var(--rose)`; white text.
- **Category — offbeat/terra** — `var(--peach) → var(--terra)`; white text.

The page itself has two radial gradients layered over `--cream`:
```css
background-image:
  radial-gradient(circle at 15% 20%, rgba(255,217,179,.35) 0%, transparent 40%),
  radial-gradient(circle at 85% 80%, rgba(168,196,162,.25) 0%, transparent 45%);
```

## Category tag colours

Tag pills (`.ctag.t-*`, `.bi-tg.t-*`) reuse the category accents with light tinted backgrounds:

| Tag | Foreground | Background |
|---|---|---|
| `trade` / `hands-on` | `#7B5C00` | `rgba(245,190,70,.2)` |
| `mainstream` | `var(--sageD)` | `rgba(168,196,162,.2)` |
| `modern` | `var(--blue)` | `rgba(91,141,239,.12)` |
| `offbeat` | `var(--terra)` | `rgba(224,122,95,.12)` |
| `future` | `var(--purple)` | `rgba(155,114,207,.12)` |
| `essential` | `var(--rose)` | `rgba(232,99,122,.1)` |

## Animations

Three named keyframes, all short and gentle.

| Name | Duration / easing | Purpose |
|---|---|---|
| `si` (slide-in) | `.3s–.5s ease-out` — `translateY(6px→0)` + opacity | Message bubbles, welcome hero, agent output cards, plan results |
| `bn` (bounce) | `1.4s infinite` — three-dot typing indicator | AI typing dots (staggered `.2s` delays) |
| `sp` (spin) | `.8s linear infinite` | Loader circle |

Transitions used elsewhere are mostly `.15s–.35s`. Specific values:
- Hover lift / press: `transform .2s` with `translateY(-1px)` on hover, `scale(.97)` on press (implicit)
- Sheet slide: `transform .35s cubic-bezier(.32,.72,0,1)` — the one place we use a custom easing
- Typing dot delay steps: `.2s` between dots

## Component patterns

All component CSS lives in `src/styles/components.css` with the class names from v1 preserved exactly (`.hdr`, `.bub`, `.ccard`, `.sh`, `.btn`, etc.). That file is the canonical reference. The key patterns:

### Icon button (`.ib`)
`36×36`, `border-radius: 50%`, white surface, `--sh1`, subtle lift on hover. Used for Save / Profile in the header. Supports a notification badge (`.badge`) absolutely positioned top-right, terra background, ring-cut by `2px solid var(--cream)`.

### Message bubble (`.bub`)
Max-width `80%`, padding `10px 14px`, `border-radius: var(--r2)`. AI variant: white background, `--sh1`, top-left corner reduced to `4px`. User variant: peach→terra gradient, white text, top-right corner reduced to `4px`. Avatars (`.av`) are `30×30` circles — sage gradient for AI, peach gradient for user.

### Career card (horizontal suggestion, `.ccard`)
`170px` wide, white surface, `var(--r2)`, `--sh1` rest / `--sh2` hover. Content: large emoji icon, small category tag, Fraunces 600 title, two-line blurb. Border transparent by default, turns `--peach` on hover. Used inside a horizontal scroll row (`.cc`) after AI suggestions.

### Career card (browse grid, `.bi`)
Compact version for the 2-column Browse grid. `--r1`, `10px` padding, `13px` Fraunces title, 2-line clamped blurb. Same hover treatment as `.ccard`.

### Quick reply (`.qrb`)
Pill — `border-radius: 16px`, white surface, `1px` border in `rgba(45,42,38,.1)`. Hover fills with `--peach`. Used under AI messages for suggested user replies.

### Primary button (`.go`, `.btn-p`, `.sbtn`)
Ink background (`.btn-p`) or peach→terra gradient (`.go`, `.sbtn`). Nunito 700, cream/white text. Rounded to `var(--r2)` for rectangular variants, `50%` for the `36×36` send button. Hover lifts by `2px` with `--sh3`.

### Secondary / saved buttons (`.btn-s`, `.btn-sv`)
White surface with thin border (secondary) or flat sage (saved). Same radius as primary.

### Sheet (bottom drawer, `.sh`)
Max-width `720px`, rises from the bottom. Top radius `var(--r4)`, `--cream` background, drag handle at top. Opens over a `.so` overlay (`rgba(45,42,38,.4)` + `blur(4px)`). The detail header (`.dh`) inside uses one of the category gradients (`.h-trade`, `.h-mainstream`, etc.) with a faded white circle decoration top-right.

### Tabs (`.tab`)
Flex children with equal widths. Active state: white pill (`--sh1`), ink text. Inactive: transparent, muted text. Icons inline at `14×14`.

### Input wrapper (`.inpw`)
White pill with `border-radius: 22px`, `--sh1`. Auto-growing textarea (max `90px`) on the left, gradient send button on the right. Pattern reused for any chat-like input.

### Action plan step (`.plan-step`)
Checkbox circle (`.plan-ck`) that fills with sage on check. Step text strikes through when done. "Do this for me" mini-button (`.plan-do`) pinned below each doable step; result renders in a sage-bordered `.plan-result` box.

## Usage guidelines

- **One accent gradient** — every primary CTA uses peach→terra. Don't introduce new gradients for new buttons.
- **Serif for personality** — Fraunces only for display, card titles, and the italic moments. Don't set body copy in Fraunces.
- **Cards always float** — `--paper` surface + `--sh1`. No flat rectangles.
- **Generous radii** — never go below `12px` on a card. `18px` is the default.
- **Category colour = meaning** — gold means trade, blue means modern, purple means future, rose means essential, sage means mainstream, terra means offbeat. Don't reassign.
- **Ink not black** — `#2D2A26`, never `#000`. Shadows use the same warm RGB so nothing feels cold.
- **Te reo treated as equal weight** — words like "kōrero", "mahi", "whānau", "rangatahi" render in normal body, never italicised or tagged as foreign.
