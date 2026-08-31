import { ThemeConfig } from '../types/theme';
import { generateCssSnippet, generateTailwindSnippet } from './cssGenerator';

export interface ExportSectionsSelection {
  design: boolean;
  security: boolean;
  ratelimit: boolean;
  database: boolean;
  backend: boolean;
  hosting: boolean;
  tokens: boolean;
}

export const DEFAULT_EXPORT_SECTIONS: ExportSectionsSelection = {
  design: true,
  security: true,
  ratelimit: true,
  database: true,
  backend: true,
  hosting: true,
  tokens: true,
};

export function generateUniversalMarkdown(
  theme: ThemeConfig, 
  sections: ExportSectionsSelection = DEFAULT_EXPORT_SECTIONS
): string {
  const sec = theme.security;
  const be = theme.backend;

  let md = `# Full-Stack Specification: ${theme.name}\n\n> Generated with Design2Prompt. Paste this into your AI coding tool (Claude, Cursor, v0, Bolt, Lovable).\n\n`;

  // 1. Visual Design
  if (sections.design) {
    md += `---

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
- Motion: **${theme.motionSpeed}** with **${theme.easing}** easing\n\n`;
  }

  // 2. Security
  if (sections.security) {
    md += `---

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
  - Referrer-Policy: \`strict-origin-when-cross-origin\`\n\n`;
  }

  // 3. Rate Limiting
  if (sections.ratelimit) {
    md += `---

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
  - AI & LLM Generation endpoints: Max 10 requests per minute with active user credit check\n\n`;
  }

  // 4. Database & ORM
  if (sections.database) {
    md += `---

## 4. Database Architecture & ORM
- **Database Engine**: **${be.database}** (Connection pooling enabled with SSL mode \`require\`)
- **ORM / Query Builder**: **${be.orm}**
  - All database queries must be strictly parameterized. Never concatenate raw SQL strings.
  - Migrations must be version-controlled in the repository.\n\n`;
  }

  // 5. Backend Runtime & API
  if (sections.backend) {
    md += `---

## 5. Backend Runtime & API Architecture
- **Runtime**: **${be.runtime}**
- **API Style**: **${be.apiStyle}**
- **Caching Layer**: **${be.caching}**
- **Structured Logging & Observability**: **${be.logging}** (Strip all secrets, passwords, and tokens before logging)\n\n`;
  }

  // 6. Hosting & Infrastructure
  if (sections.hosting) {
    md += `---

## 6. Hosting & Infrastructure
- **Target Platform**: **${be.hosting}**
- **Secrets Management**: Validate all environment variables on application startup using a typed schema (e.g. \`zod\`). Never hardcode fallback secrets.
- **Edge Caching**: Public read routes use \`Cache-Control: public, s-maxage=60, stale-while-revalidate=300\`.\n\n`;
  }

  // 7. Code Tokens
  if (sections.tokens) {
    md += `---

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
</details>\n`;
  }

  return md;
}

export function generateCursorRules(
  theme: ThemeConfig,
  sections: ExportSectionsSelection = DEFAULT_EXPORT_SECTIONS
): string {
  const sec = theme.security;
  const be = theme.backend;

  let rules = `# .cursorrules - Project Guidelines & Rules\n\n`;

  if (sections.security) {
    rules += `## Security & Protection Guidelines (P0 Critical)
- Input Validation: Validate EVERY API route, server action, or form input using ${sec.inputValidation}. Return 400 Bad Request with formatted schema errors.
- Auth Strategy: Follow ${sec.authStrategy}. Store session credentials in HTTP-only, Secure, SameSite cookies.
- Security Headers: Apply HSTS, X-Content-Type-Options: nosniff, and X-Frame-Options: ${sec.headers.frameOptions}.
- Secrets: Never commit credentials. Read environment variables through a validated schema.\n\n`;
  }

  if (sections.database) {
    rules += `## Database & Query Guidelines
- Database: ${be.database} via ${be.orm}
- SQL Injection Prevention: ALWAYS use parameterized queries or type-safe ORM methods. Never use raw string concatenation.\n\n`;
  }

  if (sections.ratelimit) {
    rules += `## Rate Limiting
- Implement ${sec.rateLimiting.provider} rate limiting on public endpoints (${sec.rateLimiting.maxRequestsPerWindow} req / ${sec.rateLimiting.windowSeconds}s).\n\n`;
  }

  if (sections.backend || sections.hosting) {
    rules += `## Backend & Infrastructure
- Runtime: ${be.runtime} (${be.apiStyle} API)
- Deployment Target: ${be.hosting}
- Error Handling: Centralized error middleware. Never leak raw stack traces to the client in production.\n\n`;
  }

  if (sections.design) {
    rules += `## Frontend & Visual Design Tokens
- Primary Color: ${theme.primaryColor}
- Accent Color: ${theme.accentColor}
- Canvas Background: ${theme.backgroundColor}
- Surface Tone: ${theme.surfaceColor}
- Text Color: ${theme.textColor}
- Border: ${theme.borderWidth}px ${theme.borderStyle} ${theme.borderColor}
- Corner Radius: ${theme.radius}px (clamp cards to max 20px)
- Buttons: ${theme.buttonShape} shape, ${theme.buttonFill} fill
- Typography: Headings in ${theme.headingFont}, Body in ${theme.bodyFont}\n\n`;
  }

  return rules;
}

export function generateClaudePrompt(
  theme: ThemeConfig,
  sections: ExportSectionsSelection = DEFAULT_EXPORT_SECTIONS
): string {
  const sec = theme.security;
  const be = theme.backend;

  let prompt = `You are a Principal Software Engineer and Security Architect.\n\nPlease build the application using the following guidelines:\n\n`;

  if (sections.security) {
    prompt += `### 🛡️ Security & API Hardening:
- Auth: ${sec.authStrategy}
- Input Validation: Strict ${sec.inputValidation} schemas on all requests
- Headers: HSTS, nosniff, X-Frame-Options: ${sec.headers.frameOptions}, CSP ${sec.contentSecurityPolicy}
- CORS: ${sec.corsMode}\n\n`;
  }

  if (sections.ratelimit) {
    prompt += `### ⏱️ Rate Limiting:
- ${sec.rateLimiting.provider} (${sec.rateLimiting.maxRequestsPerWindow} req / ${sec.rateLimiting.windowSeconds}s) with 429 Retry-After response\n\n`;
  }

  if (sections.database || sections.backend || sections.hosting) {
    prompt += `### ⚡ Backend & Infrastructure:
- Runtime: ${be.runtime} (${be.apiStyle} API)
- Database: ${be.database} using ${be.orm}
- Hosting: ${be.hosting}\n\n`;
  }

  if (sections.design) {
    prompt += `### 🎨 Visual Theme:
- Theme: ${theme.name} (${theme.isDark ? 'Dark' : 'Light'})
- Primary: ${theme.primaryColor}, Accent: ${theme.accentColor}, Canvas: ${theme.backgroundColor}, Surface: ${theme.surfaceColor}
- Radius: ${theme.radius}px (${theme.buttonShape} buttons)
- Typography: ${theme.headingFont} headings, ${theme.bodyFont} body copy\n\n`;
  }

  return prompt;
}

export function generateV0Prompt(
  theme: ThemeConfig,
  sections: ExportSectionsSelection = DEFAULT_EXPORT_SECTIONS
): string {
  const sec = theme.security;
  const be = theme.backend;

  return `Create a production-grade full-stack web application with Next.js App Router, Tailwind CSS, and Shadcn/UI conventions:

${sections.database ? `- Database: ${be.database} with ${be.orm}` : ''}
${sections.security ? `- Auth: ${sec.authStrategy}\n- Validation: ${sec.inputValidation} schemas on all server actions` : ''}
${sections.ratelimit ? `- Rate Limiting: ${sec.rateLimiting.provider} middleware` : ''}

${sections.design ? `- Visual Theme:
  - Colors: primary: ${theme.primaryColor}, accent: ${theme.accentColor}, bg: ${theme.backgroundColor}, surface: ${theme.surfaceColor}, text: ${theme.textColor}
  - Radius: ${theme.radius}px
  - Buttons: ${theme.buttonShape} with ${theme.buttonFill} fill
  - Spacing: ${theme.density} density` : ''}

Ensure all components have clean accessible markup, error states, and responsive layout.`;
}
