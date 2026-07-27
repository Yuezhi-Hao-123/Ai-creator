# AI Content Planner

An AI-powered content planning tool for short-video creators. Generate fresh topic ideas, craft engaging video scripts, and analyze your video performance — all with the help of AI.

Built for TikTok, YouTube Shorts, Instagram Reels, Xiaohongshu, and Douyin creators.

## Features

- **Creator Profile** — Set up your creator identity (platform, niche, style, audience)
- **Topic Ideas** — Enter a topic and get 3-5 AI-generated video ideas with titles, angles, and descriptions
- **Content Plan** — Turn a selected topic into a full video script: hook, structure, key points, CTA, and cover text
- **Performance Analysis** — Input your video metrics and get AI-powered improvement suggestions

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| AI | DeepSeek API |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 22+ (recommended) or Node.js 20
- A [Supabase](https://supabase.com) account (free tier works)
- A [DeepSeek](https://platform.deepseek.com) API key

### Local Development

```bash
# 1. Clone
git clone https://github.com/YOUR_USERNAME/ai-content-planner.git
cd ai-content-planner

# 2. Install
npm install

# 3. Set up environment
cp .env.example .env.local
# Edit .env.local with your keys:
#   DEEPSEEK_API_KEY=sk-...
#   NEXT_PUBLIC_SUPABASE_URL=https://...
#   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...

# 4. Create database tables
# Open Supabase SQL Editor and run supabase/migrations/001_initial_schema.sql

# 5. Start
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DEEPSEEK_API_KEY` | Yes | Your DeepSeek API key |
| `DEEPSEEK_MODEL` | No | Model name (default: `deepseek-chat`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Your Supabase anon/public key |

## Deploy to Vercel

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project → Select repo
3. Add the 4 environment variables in **Settings → Environment Variables**
4. Deploy!

## Project Structure

```
src/
├── app/               # Next.js App Router pages + API routes
│   ├── api/           # /api/topics, /api/plan, /api/analyze
│   ├── profile/       # Creator Profile page
│   ├── topics/        # Topic Generation page
│   ├── plan/          # Content Plan page
│   └── analyze/       # Performance Analysis page
├── components/        # UI components
│   ├── ui/            # Base atoms (Button, Card, Input, ...)
│   ├── layout/        # AppShell, Sidebar, BottomNav
│   ├── profile/       # ProfileForm
│   ├── topics/        # TopicInput, TopicCard
│   ├── plan/          # PlanResult
│   └── analyze/       # MetricsForm, AnalysisResult
├── lib/               # Business logic (types, prompts, AI client, storage)
└── strings/           # UI text (i18n-ready)
```

## License

MIT
