export interface SecurityConfig {
  authStrategy: 'oauth-jwt' | 'session-cookies' | 'passkeys' | 'supabase-auth' | 'clerk-auth';
  csrfProtection: boolean;
  corsMode: 'strict-whitelist' | 'same-origin' | 'permissive';
  contentSecurityPolicy: 'strict' | 'standard' | 'relaxed';
  rateLimiting: {
    enabled: boolean;
    provider: 'upstash-redis' | 'in-memory' | 'cloudflare-workers';
    maxRequestsPerWindow: number; // e.g. 60
    windowSeconds: number; // e.g. 60
    scope: 'ip-and-user' | 'ip-only' | 'route-specific';
  };
  headers: {
    hsts: boolean;
    noSniff: boolean;
    frameOptions: 'DENY' | 'SAMEORIGIN';
  };
  inputValidation: 'zod' | 'valibot' | 'typebox';
}

export interface BackendConfig {
  runtime: 'nodejs' | 'bun' | 'edge' | 'python-fastapi' | 'go';
  apiStyle: 'rest' | 'trpc' | 'server-actions' | 'graphql';
  database: 'postgresql-neon' | 'supabase' | 'planetscale-mysql' | 'turso-sqlite' | 'mongodb';
  orm: 'drizzle' | 'prisma' | 'kysely' | 'raw-sql';
  hosting: 'vercel' | 'cloudflare-pages' | 'aws' | 'fly-io' | 'railway' | 'docker';
  caching: 'redis-upstash' | 'cdn-stale-while-revalidate' | 'none';
  logging: 'pino' | 'sentry' | 'datadog' | 'console';
}

export interface ThemeConfig {
  id: string;
  name: string;
  isDark: boolean;
  
  // Foundation
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  textMutedColor: string;
  borderColor: string;
  textContrast: 'soft' | 'balanced' | 'bold';

  // Typography
  headingFont: 'sans' | 'serif' | 'mono' | 'display';
  headingStyle: 'bold-big' | 'quiet-small' | 'literary' | 'technical';
  bodyFont: 'modern' | 'editorial' | 'humanist' | 'technical';
  textDensity: 'compact' | 'normal' | 'airy';
  letterSpacing: 'tight' | 'normal' | 'wide';

  // Shape & Structure
  radius: number; // in px: 0, 4, 6, 8, 12, 16, 9999
  borderStyle: 'none' | 'hairline' | 'solid' | 'brutalist';
  borderWidth: number; // in px: 0, 1, 2, 3
  shadowDepth: 'flat' | 'soft' | 'elevated' | 'brutalist' | 'glow';

  // Spacing & Layout
  density: 'compact' | 'standard' | 'spacious';
  alignment: 'centered' | 'left-aligned' | 'asymmetric';
  sectionPadding: 'tight' | 'balanced' | 'generous';
  contentWidth: 'narrow' | 'standard' | 'wide';

  // Buttons & Controls
  buttonShape: 'inherit' | 'sharp' | 'rounded' | 'pill';
  buttonFill: 'solid' | 'soft' | 'outline' | 'glass';
  buttonHover: 'subtle' | 'bouncy' | 'glowing' | 'snap';
  dangerStyle: 'solid-red' | 'outline-red' | 'text-red';

  // Cards
  cardStyle: 'flat' | 'bordered' | 'shadow' | 'glass';
  cardHover: 'none' | 'lift' | 'glow' | 'border-highlight';

  // Feedback & Status
  alertStyle: 'soft-tint' | 'left-bar' | 'floating-card';
  toastPosition: 'bottom-right' | 'top-center' | 'bottom-left';
  toastAnimation: 'slide-in' | 'fade-in' | 'bounce';
  badgeStyle: 'pill-dot' | 'solid-chip' | 'outline-tag';
  loadingStyle: 'skeleton' | 'spinner' | 'progress-bar' | 'dots';

  // Forms
  inputStyle: 'boxed' | 'filled' | 'underline';
  focusStyle: 'glow-ring' | 'border-color' | 'animated-underline';

  // Navigation
  headerStyle: 'frosted' | 'solid-bar' | 'bordered-bottom' | 'floating-pill';
  modalStyle: 'centered-box' | 'side-sheet' | 'fullscreen';
  tabsStyle: 'underline' | 'pill' | 'boxed';

  // Motion
  motionSpeed: 'none' | 'snappy' | 'smooth' | 'leisurely';
  easing: 'ease-out' | 'spring' | 'linear';

  // Architecture & Security Specs
  security: SecurityConfig;
  backend: BackendConfig;
}

export interface PresetTheme {
  id: string;
  name: string;
  category: 'Frontier AI & Tech' | 'Lifestyle & Product';
  tagline: string;
  description: string;
  theme: Omit<ThemeConfig, 'id' | 'name'>;
}

export type ExportFormat = 
  | 'markdown' 
  | 'cursorrules' 
  | 'claude' 
  | 'v0' 
  | 'tailwind' 
  | 'css';
