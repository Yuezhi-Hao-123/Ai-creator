# AI Content Planner

> **An LLM-powered content strategy tool bridging generative AI and short-video creation.**
>
> Live Demo: [https://ai-content-planner.vercel.app](https://ai-content-planner.vercel.app)

---

## Abstract

Short-video creators face three persistent challenges: maintaining a steady flow of topic ideas, structuring engaging video scripts efficiently, and translating performance data into actionable improvements. This project explores how **large language models (LLMs)** can serve as a creative collaborator in the video production pipeline — not by replacing human creativity, but by augmenting the creator's workflow with **context-aware generation** and **data-driven feedback loops**.

The system implements four interconnected modules — Creator Profile, AI Topic Generation, Content Plan Generation, and Performance Analysis — forming a complete **ideate → create → analyze** cycle. A key design contribution is the **creator context injection mechanism**: user-defined profiles (platform, audience, style, language) are passed as structured context to the LLM, enabling personalized outputs without fine-tuning.

---

## Research Motivation

| Research Question | System Implementation |
|---|---|
| How can LLMs personalize creative outputs without fine-tuning? | Profile → Context injection in prompt |
| How to bridge quantitative metrics with qualitative AI advice? | Engagement calculation + LLM interpretation |
| What module architecture supports AI + media workflows? | 14-module responsibility-complete design |
| How to make AI tools accessible across languages? | Profile-driven language routing |
| How does model selection affect creative output quality? | Switchable models with observable effects |

---

## Features

| Module | Function | AI Role |
|---|---|---|
| **Creator Profile** | Define platform, niche, audience, style, language | Context provider |
| **Topic Ideas** | Generate 3-5 video topics from a keyword | Ideation partner |
| **Content Plan** | Full script: hook, structure, key points, CTA, cover text | Script co-writer |
| **Performance Analysis** | Input metrics → engagement rate + AI suggestions | Data interpreter |
| **Model Switching** | Toggle between DeepSeek Chat (fast) and V4 Pro (powerful) | Quality/speed tradeoff |
| **i18n** | Chinese / English UI + AI output | Cross-cultural design |

---

## Design Rationale

### Why Modular Monolith instead of Microservices?

This is a single-user creative tool, not a high-concurrency platform. A modular monolith — one codebase, one deployment, 14 explicit module contracts — achieves **responsibility separation without infrastructure overhead**. Each module (PromptBuilder, AIClient, ResultParser, StorageService, etc.) has documented inputs, outputs, and extension points, enabling future extraction into services if needed.

### Why DeepSeek instead of OpenAI/Claude?

DeepSeek provides API access from mainland China without VPN, has competitive English/Chinese output quality, and is significantly more cost-effective (~$0.14/M tokens). The architecture abstracts model selection behind a unified `callDeepSeek(model?)` interface, making future multi-provider support straightforward.

### Why Anonymous UUID instead of Forced Login?

Requiring authentication before users experience AI value creates unnecessary friction in creative tools. The system uses `crypto.randomUUID()` stored in `localStorage` for data persistence, with Supabase tables reserving `user_id` columns for future Auth migration. This demonstrates understanding of **progressive identity** — anonymous now, authenticated later, data preserved throughout.

### Why Profile-driven Language instead of Auto-detect?

Character-based auto-detection (checking for CJK characters) is brittle — a Chinese creator writing English content would get wrong results. The Profile-first approach gives creators **explicit control** over output language, with auto-detect as a fallback. This reflects a design philosophy of **creator agency over algorithmic convenience**.

---

## Architecture

```
┌──────────────────────────────────────────────────────┐
│                  Next.js App Router                    │
│                                                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ Profile  │  │  Topics  │  │  Analyze │            │
│  │  Page    │  │  Page    │  │  Page    │            │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘            │
│       │              │              │                  │
│  ┌────┴──────────────┴──────────────┴────┐            │
│  │      Shared UI Components (14)        │            │
│  └────────────────┬──────────────────────┘            │
│                   │                                    │
│  ┌────────────────┴──────────────────────┐            │
│  │        Business Logic Layer           │            │
│  │  PromptBuilder → AIClient → Parser    │            │
│  └────────────────┬──────────────────────┘            │
│                   │                                    │
│  ┌────────────────┴──────────────────────┐            │
│  │     Infrastructure (Supabase + API)   │            │
│  └───────────────────────────────────────┘            │
│                                                       │
│  API: /api/topics  /api/plan  /api/analyze            │
└──────────────────────────────────────────────────────┘
```

**Data flow:** User Input → Validation → PromptBuilder (with Profile context) → API Route → DeepSeek API → ResultParser (Zod validation) → UI Render

---

## Prompt Engineering

The system uses **context injection** rather than fine-tuning to personalize LLM outputs. The following comparison demonstrates the effect:

### Topic Generation: Without vs. With Profile Context

| Dimension | Without Profile | With Profile |
|---|---|---|
| **Input** | "cooking" | "cooking" + TikTok, Casual Humor, <30s, Gen Z |
| **System Prompt** | Generic strategist | Strategist + profile-aware |
| **Output Title** | "Easy Cooking Recipes" | "3-Ingredient Meals That Actually Taste Good" |
| **Output Style** | Generic, platform-agnostic | TikTok-native, hook-driven, trend-aware |

### Analysis: Without vs. With Advanced Metrics

| Input Data | AI Depth |
|---|---|
| Views + Likes only | Generic advice: "improve your hook" |
| + 3s/5s retention | Specific: "3s retention is 45% → your hook isn't landing, try pattern X" |
| + Completion rate | Specific: "completion rate 12% → pacing issue around the 20s mark" |

### Key Prompt Design Patterns

1. **System + User message separation** — Role clarity for the model
2. **Structured JSON output constraint** — Enables programmatic parsing
3. **Conditional context injection** — Profile and advanced metrics only added when available
4. **Language routing** — System prompt includes explicit language instruction

---

## Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Next.js 16 (App Router) | Server-side API routes for LLM proxy |
| Language | TypeScript | Type safety across module boundaries |
| Styling | Tailwind CSS v4 | Utility-first, design token approach |
| Database | Supabase (PostgreSQL) | RLS-ready, future Auth migration path |
| AI Provider | DeepSeek API | China-accessible, competitive quality/price |
| Validation | Zod | Runtime type checking for LLM output |
| Deployment | Vercel | Zero-config Next.js hosting |

---

## Module Contracts (Excerpt)

Every module follows a consistent 10-field contract. Example:

### PromptBuilder

| Field | Value |
|---|---|
| **Responsibility** | Construct prompts with context injection |
| **Input** | Topic/CreatorProfile/Metrics |
| **Output** | Structured `ChatMessage[]` |
| **Extension points** | New prompt templates, A/B testing, multi-model |
| **Test focus** | Variable interpolation, schema instruction presence |

Full module contracts for all 14 modules are documented in the [design package](https://github.com/Yuezhi-Hao-123/Ai-creator/blob/main/docs/design-package.md).

---

## Screenshots

> *To add: replace with actual screenshots from the deployed app*

| Page | Screenshot |
|---|---|
| 🏠 Home | `[screenshot-home.png]` |
| 👤 Creator Profile | `[screenshot-profile.png]` |
| 💡 Topic Ideas (EN) | `[screenshot-topics-en.png]` |
| 💡 Topic Ideas (ZH) | `[screenshot-topics-zh.png]` |
| 📋 Content Plan | `[screenshot-plan.png]` |
| 📊 Performance Analysis | `[screenshot-analyze.png]` |

---

## Getting Started

### Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project (free tier)
- A [DeepSeek](https://platform.deepseek.com) API key

### Quick Start

```bash
git clone https://github.com/Yuezhi-Hao-123/Ai-creator.git
cd ai-content-planner
npm install
cp .env.example .env.local
# Edit .env.local with your API keys

# Run the SQL migration in Supabase SQL Editor:
# supabase/migrations/001_initial_schema.sql

npm run dev
# → http://localhost:3000
```

### Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `DEEPSEEK_API_KEY` | Yes | DeepSeek API authentication |
| `DEEPSEEK_MODEL` | No | Model selection (default: `deepseek-chat`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project endpoint |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous access key |

### Deploy

This project is deployed on [Vercel](https://vercel.com). Push to GitHub → Vercel auto-deploys. Add the 4 environment variables in Vercel's project settings.

---

## Project Structure

```
src/
├── app/                    # Pages + API routes
│   ├── api/topics|plan|analyze/  # LLM proxy endpoints
│   └── (profile|topics|plan|analyze)/  # Feature pages
├── components/
│   ├── ui/                 # Design system atoms (Button, Card, ...)
│   ├── layout/             # AppShell, Sidebar, BottomNav
│   └── (profile|topics|plan|analyze)/  # Feature components
├── lib/                    # Business logic (14 modules)
│   ├── types.ts            # Domain types + Zod schemas
│   ├── prompts.ts          # Prompt templates + language routing
│   ├── ai-client.ts        # DeepSeek API wrapper
│   ├── result-parser.ts    # LLM output → typed objects
│   ├── storage.ts          # Supabase CRUD
│   ├── metrics.ts          # Engagement rate calculation
│   ├── i18n.tsx            # Locale provider
│   └── model.tsx           # Model switching provider
└── strings/                # i18n text (en.ts, zh.ts, types.ts)
```

---

## Future Research Directions

1. **Multi-model A/B evaluation** — Quantify output quality differences between DeepSeek Chat, V4 Pro, and other providers for creative tasks
2. **Creator retention study** — Does AI-assisted planning correlate with increased content output consistency?
3. **Prompt optimization** — Can user feedback (accept/reject/modify) be used to iteratively refine prompt templates?
4. **Cross-platform content adaptation** — Automatically restructure a TikTok script for YouTube Shorts format
5. **Dataset contribution** — Open-source a dataset of AI-generated short-video content plans for academic research

---

## License

MIT

---

*Built as a portfolio project exploring the intersection of generative AI and short-video content creation. For questions or collaboration: [GitHub Issues](https://github.com/Yuezhi-Hao-123/Ai-creator/issues)*
