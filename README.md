# Design2Prompt ⚡

> **The visual, full-stack architecture & design specification builder for vibe coders and AI copilots.**  
> Craft visual tokens, authentication methods, defense-in-depth security layers, rate limiting policies, database architectures, and backend runtimes visually—then export deterministic Markdown specifications, `.cursorrules`, Claude system prompts, and Tailwind CSS tokens directly into your AI coding agent (Claude, Cursor, v0, Bolt, Lovable).

[![Live Demo](https://img.shields.io/badge/Live%20Demo-devtint.github.io%2Fdesign2prompt-6366f1?style=for-the-badge&logo=github)](https://devtint.github.io/design2prompt/)
[![Zero Backend](https://img.shields.io/badge/Backend-100%25%20Static%20%7C%20Zero%20API%20Cost-10b981?style=for-the-badge)](https://devtint.github.io/design2prompt/)
[![Defense in Depth](https://img.shields.io/badge/Security-A%2B%20Defense%20in%20Depth-38bdf8?style=for-the-badge)](https://devtint.github.io/design2prompt/)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

---

## 🌐 Live Application
Try the live builder now on GitHub Pages:  
👉 **[https://devtint.github.io/design2prompt/](https://devtint.github.io/design2prompt/)**

---

## ✨ Key Capabilities

### 1. 🛡️ Defense-in-Depth Security & Architecture Suite
Production software is never built with single radio-button security. Design2Prompt provides an interactive, multi-select architecture configurator:
- **Multi-Select Authentication Strategies**:
  - `[✓] HTTP-Only Encrypted Cookies` (Session protection with `SameSite=Lax/Strict`)
  - `[✓] OAuth 2.0 (Social / SSO)` (Google, GitHub, Discord, Apple, Enterprise SAML)
  - `[✓] Passkeys / WebAuthn` (Biometric TouchID / FaceID & physical YubiKeys)
  - `[✓] Magic Links (Email OTP)` (Passwordless instant verification)
  - `[✓] Authenticator 2FA (TOTP)` (Google Authenticator / 1Password 6-digit codes)
  - `[✓] Supabase Auth` (PostgreSQL Row-Level Security integration)
  - `[✓] Clerk Platform` (Multi-tenant hosted user management)
- **11-Layer Active Defense Checklist** *(1-click "Harden All (A+ Grade)" preset)*:
  - `[✓] CSRF Defense Tokens` & Origin verification
  - `[✓] Strict-Transport-Security (HSTS Preload)` (`max-age=31536000`)
  - `[✓] Content Security Policy (CSP Nonces)` (Strict cryptographic script nonces)
  - `[✓] Clickjacking Block` (`X-Frame-Options: DENY`)
  - `[✓] MIME-Sniffing Prevention` (`X-Content-Type-Options: nosniff`)
  - `[✓] CORS Strict Origin Whitelist` (Zero wildcard `*` permissions on authenticated endpoints)
  - `[✓] Zod Runtime Input Sanitization` (Rejects unknown keys, validates API payloads)
  - `[✓] 100% Parameterized SQL Queries` (Completely eliminates SQL injection vectors)
  - `[✓] Runtime Secrets Schema Validation` (Validates environment variables on boot)
  - `[✓] Cloudflare Turnstile / Bot Shield` (Invisible CAPTCHA on auth/mutation routes)
  - `[✓] Immutable Security Audit Logs` (Tamper-evident logging of role & auth changes)

### 2. ⏱️ Rate Limiting & Abuse Prevention
- **Providers**: Cloudflare Workers, Upstash Redis, or In-Memory sliding-window rate limiters.
- **Granular Scoping**: Per-IP, per-user, or global edge limits.
- **Standard 429 Response Behavior**: Generates exact headers (`RateLimit-Limit`, `RateLimit-Remaining`, `Retry-After: <seconds>`) and JSON error bodies.
- **Interactive Simulator**: Drain quota in real-time within the desktop canvas to observe 429 block states and retry countdowns.

### 3. 💾 Full-Stack Backend, Database & Hosting
- **Databases**: PostgreSQL (Neon Serverless), Supabase, PlanetScale, Turso (libSQL), MongoDB.
- **ORMs**: Drizzle ORM, Prisma, Kysely, Parameterized Raw SQL.
- **Runtimes & API Styles**: Node.js, Bun, Edge Runtime, Go, Python with REST, tRPC, GraphQL, or Server Actions.
- **Hosting Targets**: Vercel, Cloudflare Pages/Workers, Railway, Fly.io, AWS, Docker Container.

### 4. 🎨 Frontier AI & Curated Design Presets
Includes 12 tuned aesthetic presets modeled after top engineering organizations and design movements:
- **Tier A: Frontier AI & Tech**:
  - 🏛️ **Anthropic Claude**: Warm linen cream, terracotta rust, deep espresso, and literary serif typography.
  - 🌌 **Google Antigravity / Gemini**: Deep cosmic obsidian, glowing cyan/indigo micro-borders, and agentic status indicators.
  - 🟢 **OpenAI / OpenCode**: Clean neutral dark zinc, signature AI emerald green, and distraction-free layout.
  - ▲ **Vercel / Geist**: Hyper-minimalist dark obsidian, sharp geometry, and technical typography.
  - 🎯 **Linear / Raycast**: Slate 950 surfaces, inner specular highlights, Linear indigo/violet, and `kbd` shortcut chips.
  - 🔍 **Perplexity AI**: Deep mineral teal slate, ocean mint accents, and citation pill badges.
  - ⚡ **Supabase Studio**: Dark studio charcoal, acid neon green, and dense technical data displays.
- **Tier B: Creative & Lifestyle**:
  - 🎨 **Neo-Brutalism**: High-contrast canary yellow, thick dark borders, and hard unblurred drop shadows.
  - 🍸 **Editorial Luxury**: Haute couture warm parchment, champagne gold, and luxury serif typography.
  - 🌿 **Nordic Nature**: Earthy sage green, warm oatmeal, and gentle organic curves.
  - 🍬 **Playful Pastel Pop**: Bubblegum lavender, mint, bouncy pill buttons, and spring animations.
  - 📐 **Industrial Blueprint**: Utilitarian CAD blueprint navy, steel grays, and cadmium safety orange.

### 5. 👁️ Zero Pure Black / Pure White (Refined Visual Ergonomics)
- **Eliminated Pure Pitch Black (`#000000`)**: Uses deep, luxurious obsidian and charcoal tones (`#090A0E`, `#0A0B0F`, `#121318`) to eliminate contrast vibration and OLED smearing.
- **Eliminated Pure Stark White (`#FFFFFF`)**: Uses soft, comfortable alabaster and warm linen tones (`#EDEDED`, `#F0F4F8`, `#F9F8F6`) to prevent screen glare and eye fatigue.

### 6. 🖥️ Expansive Desktop Canvas & Testing Lab
- **Desktop Window Mockup (`1440 × 900`)**: Displays desktop navigation, side-by-side 3-column feature cards, 2-column pricing grids, and security matrices.
- **Interactive Testing Shortcuts**:
  - 🔔 **In-Canvas Toast**: Live sliding toast notification anchored directly inside the canvas.
  - 🪟 **Modal Dialog**: Centered modal test for backdrop blur, radius clamping, and danger buttons.
  - 💳 **Billing Switcher**: Interactive `Monthly` vs `Yearly (-20%)` tier toggle.
  - 📝 **Input Validation**: Real-time form validator testing error borders, focus rings, and success checks.
  - 📂 **Accordion FAQ**: Expandable interactive accordion demonstrating smooth CSS transitions.
- **Accessibility Suite**: Real-time SVG colorblindness filters (Protanopia, Deuteranopia, Tritanopia, Monochrome) and WCAG contrast check with 1-Click Auto-Fix.

### 7. 📤 Granular Section Inclusions & AI Exporters
Customise exactly what sections to include or exclude before exporting:
- `[✓] Visual Design Tokens`
- `[✓] Security & Authentication`
- `[✓] Rate Limiting Policies`
- `[✓] Database Architecture & ORM`
- `[✓] Backend Runtime & API Style`
- `[✓] Hosting & Infrastructure Target`
- `[✓] Tailwind CSS v4 & CSS Variables`
- **1-Click Filter Chips**: `[ All ]`, `[ Design Only ]`, `[ Backend Only ]`.
- **Export Targets**:
  - 📋 **Universal Markdown (`theme.md`)**: Full human- and LLM-readable design & architecture specification.
  - 💻 **Cursor / Windsurf (`.cursorrules`)**: Strict system rules enforcing input validation, auth strategies, and parameterization.
  - 🤖 **Claude / ChatGPT Prompt**: Tailored system prompt for senior architecture code generation.
  - ⚡ **v0.dev / Bolt.new / Lovable Prompt**: Direct copy-paste prompt formatted for rapid AI prototyping.
  - 🎨 **Tailwind CSS v4 `@theme` & CSS `:root` Variables**: Drop-in code blocks.

### 8. 🔗 100% Client-Side Sharing (`window.location.hash`)
Themes and architecture configurations compress directly into URL hash fragments. Share your entire stack with teammates instantly with **zero database, zero server cost, and zero tracking**.

---

## 🚀 Getting Started

### Local Development

```bash
# Clone the repository
git clone git@github.com:devtint/design2prompt.git
cd design2prompt

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
npm run build
```

The optimized static build outputs to `./dist` and automatically deploys to **GitHub Pages** on every push to `main` via GitHub Actions (`.github/workflows/deploy.yml`).

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Inter, JetBrains Mono, Plus Jakarta Sans, Instrument Serif, Space Grotesk
- **Deployment**: [GitHub Pages](https://pages.github.com/) (Automated via GitHub Actions)

---

## 📄 License

MIT License © 2026 [devtint](https://github.com/devtint)
