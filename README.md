# FTHUN — Marketing Landing Page

Premium dark-luxury landing page for **FTHUN** performance wear. Collects waitlist emails ahead of Collection 01 drop.

Built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, Supabase, and Resend.

---

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion |
| Database | Supabase (Postgres) |
| Email | Resend |
| Hosting | Vercel |

---

## Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/fthun-landing.git
cd fthun-landing
npm install
```

### 2. Environment Variables

Copy the example file and fill in your keys:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-side only) |
| `RESEND_API_KEY` | Resend API key |
| `NEXT_PUBLIC_DROP_DATE` | Countdown target (ISO 8601, e.g. `2026-07-01T00:00:00.000Z`) |

### 3. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → **New Query**
3. Paste the contents of `supabase/schema.sql` and run it
4. Copy your **Project URL** and **Service Role Key** from **Settings → API**

### 4. Resend Setup

1. Create an account at [resend.com](https://resend.com)
2. Verify your sending domain (or use the free `onboarding@resend.dev` for testing)
3. Create an API key and add it to `.env.local`
4. Update the `from` address in `src/app/api/waitlist/route.ts` to your verified domain

### 5. Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
fthun-landing/
├── public/                  # Static assets
├── src/
│   ├── app/
│   │   ├── api/waitlist/    # POST endpoint — email signup
│   │   ├── globals.css      # Theme variables, utilities
│   │   ├── layout.tsx       # Root layout, fonts, metadata
│   │   └── page.tsx         # Home page (composes all sections)
│   ├── components/
│   │   ├── ui/              # shadcn-style primitives (Button, Input)
│   │   ├── brand-statement.tsx
│   │   ├── collection-preview.tsx
│   │   ├── countdown.tsx
│   │   ├── email-signup.tsx
│   │   ├── footer.tsx
│   │   ├── hero.tsx
│   │   ├── navbar.tsx
│   │   └── section-reveal.tsx
│   └── lib/
│       ├── email-template.ts  # Premium HTML email
│       ├── resend.ts          # Resend client
│       ├── supabase.ts        # Supabase client
│       └── utils.ts           # cn() helper
├── supabase/
│   └── schema.sql           # Database migration
├── .env.example
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Sections

| Section | Description |
|---------|-------------|
| **Navbar** | Fixed minimal nav with logo + CTA |
| **Hero** | Full-viewport cinematic intro with spotlight gradient |
| **Brand Statement** | Editorial serif typography, brand philosophy |
| **Collection Preview** | 4-category grid with hover animations |
| **Countdown** | Live countdown to drop date (configurable via env) |
| **Email Signup** | Waitlist form with loading/success/error states |
| **Footer** | Social links, legal links, copyright |

---

## API

### `POST /api/waitlist`

Adds an email to the waitlist and sends a confirmation email.

**Request:**
```json
{ "email": "user@example.com" }
```

**Responses:**
- `200` — Success: `{ "message": "You're on the list." }`
- `409` — Duplicate: `{ "error": "You're already on the list." }`
- `400` — Invalid email: `{ "error": "Valid email required." }`
- `500` — Server error: `{ "error": "Something went wrong." }`

---

## Deploy to Vercel

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Connect your custom domain
5. Deploy

```bash
# Or via CLI
npx vercel --prod
```

---

## Custom Domain

After deploying to Vercel:

1. Go to **Project Settings → Domains**
2. Add your domain (e.g. `drop.fthun.com`)
3. Update DNS records as instructed by Vercel
4. SSL is automatic

---

## License

Private. All rights reserved.
