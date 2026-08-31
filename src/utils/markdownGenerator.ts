import { ThemeConfig } from '../types/theme';
import { generateCssSnippet, generateTailwindSnippet } from './cssGenerator';

export function generateUniversalMarkdown(theme: ThemeConfig): string {
  const sec = theme.security;
  const be = theme.backend;

  return `# Full-Stack Design & Architecture Specification: ${theme.name}

> Production specification generated with Design2Prompt. Paste this into your AI coding tool (Claude, Cursor, v0, Bolt, Lovable) to generate a secure, beautifully styled, production-grade application.

---

## 1. Visual Design & Theme Tokens
- Primary Brand Color: \`${theme.primaryColor}\`
- Secondary Accent Color: \`${theme.accentColor}\`
- Canvas / Background: \`${theme.backgroundColor}\` (${theme.isDark ? 'Dark mode' : 'Light mode'})
- Surface / Cards: \`${theme.surfaceColor}\`
- Text Foreground: \`${theme.textColor}\`
- Border Tone: \`${theme.borderColor}\` (\`${theme.borderWidth}px ${theme.borderStyle}\`)
- Corner Radius: \`${theme.radius}px\` (Cards clamped to max 20px, buttons up to ${theme.radius}px)
- Typography: Headings in **${theme.headingFont}** (${theme.headingStyle}), Body in **${theme.bodyFont}**
- Density: **${theme.density}** (${theme.textDensity} text density)
- Motion: **${theme.motionSpeed}** with **${theme.easing}** easing

---

## 2. Security & Hardening Specification (Strict)
- **Authentication Strategy**: **${sec.authStrategy}** (HTTP-only secure cookies with \`SameSite=Lax\` or \`Strict\`)
- **Input Validation**: **${sec.inputValidation.toUpperCase()}** schema validation required on all incoming API payloads, query params, and server actions. Reject unknown properties.
- **CSRF Defense**: ${sec.csrfProtection ? 'Enabled via origin verification & anti-CSRF tokens for all state-changing mutations.' : 'Disabled'}
- **Cross-Origin Policy (CORS)**: **${sec.corsMode}** — only explicitly whitelisted origins are permitted. Disallow wildcard \`*\` on authenticated endpoints.
- **Content Security Policy (CSP)**: **${sec.contentSecurityPolicy.toUpperCase()}** — disallow unsafe-inline scripts where possible, enforce HTTPS scripts and asset origins.
- **HTTP Security Headers**:
  - Strict-Transport-Security: \`max-age=31536000; includeSubDomains; preload\` (${sec.headers.hsts ? 'Active' : 'Off'})
  - X-Content-Type-Options: \`nosniff\` (${sec.headers.noSniff ? 'Active' : 'Off'})
  - X-Frame-Options: \`${sec.headers.frameOptions}\` (Clickjacking prevention)
  - Referrer-Policy: \`strict-origin-when-cross-origin\`

---

## 3. Rate Limiting & Abuse Prevention
- **Provider**: **${sec.rateLimiting.provider}**
- **Default Limit**: \`${sec.rateLimiting.maxRequestsPerWindow}\` requests per \`${sec.rateLimiting.windowSeconds}\` seconds
- **Scope**: **${sec.rateLimiting.scope}**
- **429 Response Behavior**:
  - Return HTTP status \`429 Too Many Requests\`
  - Headers: \`RateLimit-Limit\`, \`RateLimit-Remaining\`, \`Retry-After: <seconds>\`
  - Body: \`{ "error": "rate_limit_exceeded", "message": "Too many requests. Please try again in <seconds>s." }\`
- **Sensitive Route Thresholds**:
  - Auth routes (\`/api/login\`, \`/api/signup\`): Max 5 attempts per 15 minutes
  - AI & LLM Generation endpoints: Max 10 requests per minute with active user credit check

---

## 4. Backend & Database Architecture
- **Runtime**: **${be.runtime}**
- **API Style**: **${be.apiStyle}**
- **Database Engine**: **${be.database}** (Connection pooling enabled with SSL mode \`require\`)
- **ORM / Query Builder**: **${be.orm}**
  - All database queries must be strictly parameterized. Never concatenate raw SQL strings.
  - Migrations must be version-controlled in the repository.
- **Caching Layer**: **${be.caching}**
- **Structured Logging & Observability**: **${be.logging}** (Strip all secrets, passwords, and tokens before logging)

---

## 5. Hosting & Infrastructure
- **Target Platform**: **${be.hosting}**
- **Secrets Management**: Validate all environment variables on application startup using a typed schema (e.g. \`@t3-oss/env-core\` or \`zod\`). Never hardcode fallback secrets.
- **Edge Caching**: Public read routes use \`Cache-Control: public, s-maxage=60, stale-while-revalidate=300\`.

<details>
<summary><strong>Tailwind CSS v4 / v3 Tokens</strong></summary>

\`\`\`css
${generateTailwindSnippet(theme)}
\`\`\`
</details>

<details>
<summary><strong>CSS Custom Properties (:root)</strong></summary>

\`\`\`css
${generateCssSnippet(theme)}
\`\`\`
</details>
`;
}

export function generateCursorRules(theme: ThemeConfig): string {
  const sec = theme.security;
  const be = theme.backend;

  return `# .cursorrules - Full-Stack Architecture, Security & Design System

You are a senior full-stack engineer and security architect. You must adhere STRICTLY to these specifications when generating or refactoring code in this repository.

## 1. Security & Protection Guidelines (P0 Critical)
- **Input Validation**: Validate EVERY API route, server action, or form input using **${sec.inputValidation}**. Return 400 Bad Request with formatted schema errors.
- **SQL Injection Prevention**: When querying **${be.database}** with **${be.orm}**, ALWAYS use parameterized queries or type-safe ORM methods. Never use raw template string interpolation in queries.
- **Rate Limiting**: Implement **${sec.rateLimiting.provider}** rate limiting on all public endpoints (\`${sec.rateLimiting.maxRequestsPerWindow}\` req / \`${sec.rateLimiting.windowSeconds}\`s) and strict rate limits on auth/mutation routes.
- **Auth Strategy**: Follow **${sec.authStrategy}**. Store session credentials in HTTP-only, Secure, SameSite cookies.
- **Security Headers**: Ensure middleware applies HSTS, X-Content-Type-Options: nosniff, and X-Frame-Options: ${sec.headers.frameOptions}.
- **Secrets**: Never commit credentials. Read environment variables through a validated schema.

## 2. Backend & Database Architecture
- **Runtime**: ${be.runtime}
- **API Style**: ${be.apiStyle}
- **Database**: ${be.database} via ${be.orm}
- **Hosting**: Target deployment is ${be.hosting}
- **Error Handling**: Use centralized error handling. In production, never leak internal database errors or stack traces to the client.

## 3. Frontend & Visual Design Tokens
- Primary Color: ${theme.primaryColor}
- Accent Color: ${theme.accentColor}
- Canvas Background: ${theme.backgroundColor}
- Surface Tone: ${theme.surfaceColor}
- Text Color: ${theme.textColor}
- Border: ${theme.borderWidth}px ${theme.borderStyle} ${theme.borderColor}
- Corner Radius: ${theme.radius}px (clamp card containers to max 20px)
- Buttons: ${theme.buttonShape} shape, ${theme.buttonFill} fill, ${theme.buttonHover} hover
- Typography: Headings in ${theme.headingFont} (${theme.headingStyle}), Body in ${theme.bodyFont} (${theme.textDensity} line-height)

Write clean, modular, fully typed TypeScript code following these rules.
`;
}

export function generateClaudePrompt(theme: ThemeConfig): string {
  const sec = theme.security;
  const be = theme.backend;

  return `You are a Principal Software Engineer and Security Architect.

Please build the application using the following unified full-stack architecture, security guidelines, and design tokens:

### 🛡️ Security & API Hardening:
- Auth: ${sec.authStrategy}
- Input Validation: Strict ${sec.inputValidation} schemas on all requests
- Rate Limiting: ${sec.rateLimiting.provider} (${sec.rateLimiting.maxRequestsPerWindow} req / ${sec.rateLimiting.windowSeconds}s) with 429 Retry-After response
- Headers: HSTS, nosniff, X-Frame-Options: ${sec.headers.frameOptions}, CSP ${sec.contentSecurityPolicy}
- CORS: ${sec.corsMode}

### ⚡ Backend & Infrastructure:
- Runtime: ${be.runtime} (${be.apiStyle} API)
- Database: ${be.database} using ${be.orm}
- Hosting: ${be.hosting} with ${be.caching} caching
- Logging: ${be.logging}

### 🎨 Visual Theme:
- Theme: ${theme.name} (${theme.isDark ? 'Dark' : 'Light'})
- Primary: ${theme.primaryColor}, Accent: ${theme.accentColor}, Canvas: ${theme.backgroundColor}, Surface: ${theme.surfaceColor}
- Radius: ${theme.radius}px (${theme.buttonShape} buttons, max 20px card radius)
- Typography: ${theme.headingFont} headings, ${theme.bodyFont} body copy

Build secure, production-ready code with complete types and error handling.`;
}

export function generateV0Prompt(theme: ThemeConfig): string {
  const sec = theme.security;
  const be = theme.backend;

  return `Create a production-grade full-stack web application with Next.js App Router, Tailwind CSS, and Shadcn/UI conventions:

- Architecture:
  - Database: ${be.database} with ${be.orm}
  - Auth: ${sec.authStrategy}
  - Validation: ${sec.inputValidation} schemas on all server actions
  - Rate Limiting: ${sec.rateLimiting.provider} middleware

- Visual Theme:
  - Colors: primary: ${theme.primaryColor}, accent: ${theme.accentColor}, bg: ${theme.backgroundColor}, surface: ${theme.surfaceColor}, text: ${theme.textColor}
  - Radius: ${theme.radius}px
  - Buttons: ${theme.buttonShape} with ${theme.buttonFill} fill
  - Spacing: ${theme.density} density

Ensure all components have clean accessible markup, error states, and responsive layout.`;
}
