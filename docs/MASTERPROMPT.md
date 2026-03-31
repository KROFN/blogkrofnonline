Ты не бестолочь, ты как раз вовремя дернул ручник. **Да: всё держим в одном repo** — один Next.js-проект, который деплоится на Vercel, а Supabase живет как внешний backend-service. Ниже — **мастерпромпт**, который можно скормить Claude Sonnet 4.6 для нормальной, взрослой сборки проекта.

---

```md
You are a top-level Senior Fullstack Engineer + Product Designer + Design Systems Architect.
Your task is to design and implement a portfolio-grade blog platform inside **one single repository** for deployment on **Vercel**, using **Supabase** as backend (DB + Auth + Storage).
This is not a throwaway toy. It must look and feel like a premium AWWWARDS-level editorial tech product while remaining highly usable, performant, and maintainable.

You must think like a senior engineer and a strong product-minded designer at the same time.

---

# 0. PROJECT CONTEXT

## Project name
`blog.krofn.online`

## Purpose
A portfolio blog for Sergey Kraskovsky (Creative Engineer with AI-Workflow), built to impress future HRs, art directors, creative studios, and technical reviewers.

## Main goals
1. Demonstrate strong frontend engineering
2. Demonstrate fullstack architecture
3. Demonstrate taste in design systems and interaction
4. Demonstrate ability to build real publishing workflows
5. Produce a polished, production-ready portfolio piece

## Deployment model
- **One repo**
- **Vercel** for app hosting
- **Supabase** for database, auth, storage
- Public GitHub repository is acceptable
- Secrets must be kept only in env variables, not committed

---

# 1. NON-NEGOTIABLE TECH STACK

Use:

- **Next.js 14+** with **App Router**
- **TypeScript**
- **Tailwind CSS**
- **Supabase**
- **Zod**
- **next/font**
- **Server Components by default**
- **Server Actions** for mutations when appropriate
- **Minimal, clean client components only where necessary**
- **No Redux**
- **No unnecessary dependencies**
- **No over-engineered abstraction hell**

Optional but welcome if used cleanly:
- **clsx**
- **tailwind-merge**
- **Lucide icons**
- **shadcn/ui patterns** (not mandatory to install the full kitchen sink)
- **TipTap** for editor
- **Lenis** for smooth scroll
- **GSAP** for restrained motion
- **Sonner** or similar for tasteful toasts

---

# 2. DESIGN DIRECTION

## Core design direction
**Dark Modern / Editorial Tech**, adapted for real usability.

This should NOT look like:
- a cheap Wordpress magazine theme
- a generic Tailwind SaaS landing page
- a template with random neon glows
- a Dribbble-only concept shot that becomes unreadable in real use

This SHOULD feel like:
- premium digital journal
- editorial control room
- luxury dark interface
- design-aware engineering product
- modern, quiet, precise, cinematic, usable

## Design concept phrase
**A dark editorial journal with control-room aesthetics: bold typography, restrained motion, premium surfaces, system-level detail, and real reading comfort.**

---

# 3. USABILITY RULES

You must protect UX even while making it visually impressive.

## Absolute UX requirements
- body text must remain highly readable
- no low-contrast nonsense
- no tiny gray-on-black text for main reading
- no giant hero that destroys content discovery
- no excessive decorative motion
- mobile must be treated seriously, not as an afterthought
- forms must remain obviously interactive
- buttons/links must remain clearly understandable
- article width must be optimized for reading comfort

---

# 4. INFORMATION ARCHITECTURE

Build the project as one app with two product zones:

## A. Public blog
- Home page
- Single post page
- 404 page

## B. Admin panel
- Login page
- Dashboard page
- Create post page
- Edit post page

---

# 5. APP ARCHITECTURE

Use a clean, maintainable structure close to feature-sliced thinking, adapted for Next.js App Router.

Recommended structure:

```txt
src/
  app/
    (public)/
      layout.tsx
      page.tsx
      posts/[slug]/page.tsx
      not-found.tsx
    (admin)/
      login/page.tsx
      dashboard/page.tsx
      dashboard/new/page.tsx
      dashboard/posts/[id]/page.tsx
      layout.tsx
    api/
    globals.css

  components/
    ui/
    layout/
    blocks/
    admin/
    motion/

  lib/
    utils.ts
    constants.ts
    validations/
    supabase/
      client.ts
      server.ts
      admin.ts

  actions/
    auth.ts
    posts.ts

  queries/
    posts.ts

  types/
    index.ts
    database.ts

  styles/
```

## Architectural rules
- keep route files focused on composition
- move fetching logic into `queries/`
- move mutations into `actions/`
- keep server-only code separate
- avoid mixing data logic with presentation
- keep admin tooling isolated from public UI concerns

---

# 6. SECURITY + SUPABASE RULES

This section is critical.

## Environment variables
Use these conventions:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Strict rules
- never commit real secrets
- `.env.local` must stay ignored
- `NEXT_PUBLIC_*` variables are allowed to be exposed to the client
- `SUPABASE_SERVICE_ROLE_KEY` must NEVER be exposed to the client
- `admin.ts` must be server-only
- use `import "server-only"` where appropriate

## Auth strategy
Use **Supabase Auth**, not custom password hashing.

## Authorization strategy
Use **Row Level Security (RLS)** in Supabase.

Assume:
- public visitors can only read published posts
- authenticated admin can create/update/delete posts
- optionally use a simple `profiles` or `admins` table tied to `auth.users.id`
- do not build insecure fake auth

## Storage
Use Supabase Storage for post cover images.
Prefer a public bucket for blog cover images if that simplifies display.
Uploads/deletes must still be protected through proper auth/flow.

---

# 7. DATABASE MODEL

Use a practical, clean schema.

## Main table: `posts`
Suggested fields:
- `id` uuid primary key
- `created_at` timestamptz default now()
- `updated_at` timestamptz default now()
- `title` text not null
- `slug` text unique not null
- `excerpt` text
- `content` text or jsonb depending on editor approach
- `cover_image` text
- `is_published` boolean default false
- `author_id` uuid references auth.users(id)
- `reading_time` integer optional
- `views` integer default 0 optional
- `featured` boolean default false optional
- `category` text optional

If needed, add a small admin profile table:
- `id` uuid references auth.users(id)
- `role` text
- `display_name` text

Keep schema sensible. Do not overcomplicate.

---

# 8. PAGE-BY-PAGE PRODUCT REQUIREMENTS

---

## 8.1 HOME PAGE

### Purpose
Immediately communicate:
- this is not a generic blog
- this author has strong taste and systems thinking
- there is real content here

### Required sections
1. Sticky top navigation
2. Hero section
3. Featured post section
4. Topic/filter row (visual and optionally functional)
5. Editorial posts grid/feed
6. Footer

### Home page content strategy
- large editorial hero
- one highlighted/featured article
- structured cards for remaining posts
- not a chaotic masonry layout

### Home page component expectations
- `Header`
- `Hero`
- `FeaturedPostCard`
- `TopicFilterRow`
- `PostGrid`
- `PostCard` variants
- `Footer`

---

## 8.2 SINGLE POST PAGE

### Purpose
Must feel impressive but highly readable.

### Required elements
- category / meta
- title
- excerpt
- date
- reading time
- author
- cover image
- article body
- sticky reading progress bar
- previous/next navigation
- back to journal link
- optional end CTA back to portfolio

### Readability rules
- article width around 720–760px
- excellent paragraph rhythm
- proper heading hierarchy
- clean styles for blockquotes, lists, code blocks, images, captions
- dark theme but high readability

Optional:
- TOC on desktop if implemented cleanly

---

## 8.3 404 PAGE

### Requirements
- stylish, minimal, on-brand
- not meme-y
- examples:
  - “Signal lost”
  - “This note does not exist”
- CTA back to journal

---

## 8.4 LOGIN PAGE

### Requirements
- centered premium dark panel
- clean auth form
- obvious focus states
- clear error messaging
- not overdesigned

---

## 8.5 DASHBOARD PAGE

### Requirements
- list all posts
- create new post button
- edit/delete actions
- draft/published status
- optionally search/filter
- feel like a premium control panel, not a raw table dump

### Suggested dashboard elements
- top bar
- stats/meta strip optional
- filters: all / drafts / published
- post rows/cards with actions
- empty state
- loading state

---

## 8.6 CREATE / EDIT POST PAGE

### This is one of the most important showcase screens.

### Requirements
- title input
- slug field with auto generation + manual override
- excerpt
- cover image upload
- status control (draft/published)
- rich text editor
- save draft
- publish
- delete on edit page
- preview mode if possible
- split layout strongly preferred:
  - main editor area
  - sticky right-side publish/settings panel

### Editor expectations
Prefer a polished editor like **TipTap**.
At minimum support:
- paragraphs
- headings
- bold
- italic
- lists
- quotes
- code block
- images
- horizontal divider

If practical, include:
- edit / preview / split view

---

# 9. VISUAL DESIGN SYSTEM

Implement a coherent design system, not random styling.

---

## 9.1 COLOR SYSTEM

Use a premium layered dark palette.

### Base colors
- Background Primary: `#07080B`
- Background Secondary: `#0D1016`
- Surface: `#11141B`
- Surface Elevated: `#151922`

### Borders
- Border Soft: `rgba(255,255,255,0.08)`
- Border Strong: `rgba(255,255,255,0.14)`

### Text
- Text Primary: `#F3F5F7`
- Text Secondary: `#B8BEC9`
- Text Muted: `#7F8794`

### Accent
- Accent Primary: `#FF6A1A`
- Accent Hover: `#FF7D3A`
- Accent Soft BG: `rgba(255,106,26,0.10)`
- Accent Line: `rgba(255,106,26,0.35)`

### Optional secondary tech accent (use sparingly)
- System Blue: `#6E7CFF`

## Important note
Orange must be used with restraint.
The product should feel premium editorial-tech, not loud marketing-orange everywhere.

---

## 9.2 BACKGROUND TREATMENT

Use a layered dark background:
- deep gradient base
- subtle grain/noise overlay
- occasional fine grid lines or technical lines
- soft radial halos behind selected sections

Do NOT make it:
- cyberpunk
- neon
- cluttered
- fake futuristic HUD spam

---

## 9.3 TYPOGRAPHY

Use 3 roles:
1. Display font for hero and big headings
2. Body/UI font for readable text
3. Mono font for labels/meta/system notation

### Recommended font pairing
- Display: `Sora` or `Unbounded`
- Body/UI: `Manrope`
- Mono: `IBM Plex Mono`

Use `next/font`.

### Type scale guidance
Desktop:
- Hero: 96–140px depending on composition
- H1: 64–88px
- H2: 36–48px
- H3: 26–32px
- Body: 18px / 1.75
- Meta: 12–14px mono uppercase

Mobile:
- Hero: 42–56px
- H1: 34–42px
- Body: 16–18px
- Meta: 11–12px

---

## 9.4 GRID / WIDTHS

Use:
- outer shell max-width: 1440px
- main content max-width: 1280px
- article width max-width: 760px

Spacing guidance:
- desktop page padding: 40px
- large desktop: 56px
- tablet: 24px
- mobile: 16px

Prefer a 12-column feel on desktop.

---

## 9.5 SURFACES / RADII / BORDERS

- premium dark surfaces
- radius around 20px on cards
- cleaner 14–16px radii on inputs
- subtle borders
- minimal shadows
- avoid over-glassmorphism

---

# 10. COMPONENT DESIGN REQUIREMENTS

Create a small but coherent component system.

Required components include:

## Public
- `Header`
- `Footer`
- `Hero`
- `SectionLabel`
- `PostCardFeatured`
- `PostCardStandard`
- `PostCardCompact`
- `CategoryChip`
- `ReadingProgressBar`
- `ArticleProse`
- `PrevNextPosts`
- `EmptyState`
- `NotFoundState`

## Admin
- `AdminSidebar` or top control header
- `PostListRow`
- `EditorToolbar`
- `PublishPanel`
- `ImageUploader`
- `StatusBadge`
- `DeleteConfirmModal`

## Shared UI
- `Button`
- `Input`
- `Textarea`
- `Select`
- `Modal`
- `Toast`
- `Divider`
- `LoadingSkeleton`

All components must visually belong to the same system.

---

# 11. MOTION SYSTEM

Motion should feel premium and restrained.

## General rules
- smooth, subtle, cinematic
- low-amplitude transforms
- no flashy overshoot
- no gimmicky chaos
- respect reduced motion preferences

## Desired interactions
- hero text reveal on load
- section fade/translate on scroll
- subtle stagger for cards
- hover lift and border emphasis on cards
- reading progress on post page
- image slight scale on hover
- arrow/link micro-motion

Optional:
- Lenis smooth scroll on public pages only
- GSAP for tasteful reveal/stagger interactions only if used carefully

Avoid:
- bouncing
- exaggerated parallax
- noisy cursor gimmicks
- heavy animation in admin area

---

# 12. MOBILE + RESPONSIVE REQUIREMENTS

Treat mobile seriously.

## Public mobile
- clean compact header
- menu sheet/overlay
- hero reflows vertically
- posts become one-column
- typography remains strong
- article remains easy to read
- no broken spacing

## Admin mobile
- must remain functional
- can simplify layout
- right-side publish panel can move below editor
- interactions must remain clear

---

# 13. DATA FLOW REQUIREMENTS

Use sensible server/client boundaries.

## Public reads
Use server-side data fetching for posts where possible.

## Admin mutations
Use server actions for:
- create post
- update post
- delete post
- upload-related orchestration if appropriate

## Content publication flow
1. User fills editor form
2. Validate with Zod
3. Upload cover image if present
4. Persist post
5. Revalidate public routes
6. Show success feedback
7. Redirect or remain in editor cleanly

---

# 14. SEO + METADATA REQUIREMENTS

This is a blog, so metadata matters.

Implement:
- proper title templates
- post-specific metadata
- description/excerpt
- open graph support
- twitter card support if easy
- clean canonical-ready URL patterns
- semantic HTML

If practical, support generated OG images later, but do not block core delivery on this.

---

# 15. PERFORMANCE REQUIREMENTS

This must feel fast and polished.

Requirements:
- use `next/image`
- avoid layout shift
- use `next/font`
- keep JS lean
- make public pages mostly server-rendered
- avoid unnecessary client bundles
- optimize heavy visual effects
- do not ship animation libraries into every route unless needed

---

# 16. ACCESSIBILITY REQUIREMENTS

Do not ignore accessibility.

Minimum:
- visible focus states
- semantic landmarks
- sufficient contrast
- keyboard-accessible controls
- forms with labels
- reduced motion support
- buttons/links must be distinguishable

---

# 17. IMPLEMENTATION STYLE REQUIREMENTS

Write code as if a senior engineer will review the repo.

## Required code quality
- clean naming
- strict TypeScript
- minimal duplication
- sensible abstractions
- comments only where helpful
- no spaghetti route files
- no giant monolithic components
- no random magic strings everywhere

## Avoid
- overengineering
- premature genericity
- messy inline styles
- dumping everything into `page.tsx`
- mixing server-only logic into client bundles

---

# 18. WHAT TO BUILD FIRST

Follow this implementation order unless a better local order emerges:

1. Establish global design tokens and layout shell
2. Build public homepage structure
3. Build post page structure
4. Build auth/login flow shell
5. Build dashboard shell
6. Build editor/create-post flow
7. Connect Supabase queries/actions
8. Polish responsive behavior
9. Add tasteful motion
10. Final pass on empty/loading/error states

---

# 19. EXPECTED DELIVERABLES FROM YOU

You must not respond with vague theory.
You must act like you are actually building the project.

## Your response workflow
### Step 1
Briefly restate the product direction in 5–10 bullet points.

### Step 2
Propose the exact project file structure you will use.

### Step 3
Define the design tokens and Tailwind strategy.

### Step 4
Implement the app structure and components.

### Step 5
Implement the pages.

### Step 6
Implement Supabase integration stubs/real wiring cleanly.

### Step 7
Add motion and polish.

### Step 8
Review for:
- usability
- code quality
- responsiveness
- consistency
- security boundaries

If code is being generated inside a coding environment, create/update the necessary files directly.

---

# 20. HARD CONSTRAINTS

- One repository only
- Next.js app only, no split frontend/backend repo
- Supabase Auth, not custom password hashing
- No leaking service role key
- No ugly generic admin panel
- No cheap blog template aesthetics
- No overdesigned unreadable article page
- No laziness on responsive design

---

# 21. FINAL PRODUCT VISION

The final result should make a reviewer think:

> “This person doesn’t just know React.  
> They understand systems, product architecture, publishing workflows, visual hierarchy, performance, and design discipline.”

Now proceed like a senior engineer/designer and build this product properly.
If something is ambiguous, choose the more professional, maintainable, and visually disciplined solution.
```