import { PresetTheme, SecurityConfig, BackendConfig } from '../types/theme';

export const DEFAULT_SECURITY: SecurityConfig = {
  authMethods: ['session-cookies', 'oauth-jwt', 'passkeys'],
  defenses: [
    'csrf',
    'hsts',
    'csp',
    'clickjacking',
    'nosniff',
    'cors-whitelist',
    'zod-sanitization',
    'parameterized-sql',
    'env-validation',
  ],
  csrfProtection: true,
  corsMode: 'strict-whitelist',
  contentSecurityPolicy: 'strict',
  rateLimiting: {
    enabled: true,
    provider: 'upstash-redis',
    maxRequestsPerWindow: 60,
    windowSeconds: 60,
    scope: 'ip-and-user',
  },
  headers: {
    hsts: true,
    noSniff: true,
    frameOptions: 'DENY',
  },
  inputValidation: 'zod',
};

export const DEFAULT_BACKEND: BackendConfig = {
  runtime: 'nodejs',
  apiStyle: 'rest',
  database: 'postgresql-neon',
  orm: 'drizzle',
  hosting: 'vercel',
  caching: 'cdn-stale-while-revalidate',
  logging: 'pino',
};

const RAW_PRESETS: Array<{
  id: string;
  name: string;
  category: 'Frontier AI & Tech' | 'Lifestyle & Product';
  tagline: string;
  description: string;
  theme: any;
}> = [
  // Tier A: Frontier AI & Tech
  {
    id: 'claude',
    name: 'Anthropic Claude',
    category: 'Frontier AI & Tech',
    tagline: 'Warm Literary & Scholarly AI',
    description: 'Warm linen cream, terracotta rust, deep espresso, and literary serif headings. Feels like a thoughtfully bound academic journal.',
    theme: {
      isDark: false,
      primaryColor: '#C15F3D',
      accentColor: '#D97706',
      backgroundColor: '#FAF8F5',
      surfaceColor: '#F3EFEA',
      textColor: '#141311',
      textMutedColor: '#78716C',
      borderColor: '#E5E0D8',
      textContrast: 'bold',

      headingFont: 'serif',
      headingStyle: 'literary',
      bodyFont: 'humanist',
      textDensity: 'airy',
      letterSpacing: 'normal',

      radius: 10,
      borderStyle: 'solid',
      borderWidth: 1,
      shadowDepth: 'soft',

      density: 'spacious',
      alignment: 'left-aligned',
      sectionPadding: 'generous',
      contentWidth: 'standard',

      buttonShape: 'rounded',
      buttonFill: 'solid',
      buttonHover: 'subtle',
      dangerStyle: 'outline-red',

      cardStyle: 'flat',
      cardHover: 'lift',

      alertStyle: 'soft-tint',
      toastPosition: 'bottom-right',
      toastAnimation: 'fade-in',
      badgeStyle: 'solid-chip',
      loadingStyle: 'dots',

      inputStyle: 'boxed',
      focusStyle: 'border-color',

      headerStyle: 'bordered-bottom',
      modalStyle: 'centered-box',
      tabsStyle: 'underline',

      motionSpeed: 'smooth',
      easing: 'ease-out',
    },
  },
  {
    id: 'antigravity',
    name: 'Google Antigravity',
    category: 'Frontier AI & Tech',
    tagline: 'Cosmic Obsidian & Quantum Glow',
    description: 'Deep cosmic obsidian, translucent glass panels, glowing cyan and cosmic indigo gradients with agentic status indicators.',
    theme: {
      isDark: true,
      primaryColor: '#38BDF8',
      accentColor: '#818CF8',
      backgroundColor: '#08090C',
      surfaceColor: '#121620',
      textColor: '#F8FAFC',
      textMutedColor: '#94A3B8',
      borderColor: '#262D3D',
      textContrast: 'bold',

      headingFont: 'sans',
      headingStyle: 'bold-big',
      bodyFont: 'modern',
      textDensity: 'normal',
      letterSpacing: 'tight',

      radius: 8,
      borderStyle: 'hairline',
      borderWidth: 1,
      shadowDepth: 'glow',

      density: 'standard',
      alignment: 'left-aligned',
      sectionPadding: 'balanced',
      contentWidth: 'wide',

      buttonShape: 'rounded',
      buttonFill: 'solid',
      buttonHover: 'glowing',
      dangerStyle: 'solid-red',

      cardStyle: 'glass',
      cardHover: 'glow',

      alertStyle: 'left-bar',
      toastPosition: 'bottom-right',
      toastAnimation: 'slide-in',
      badgeStyle: 'pill-dot',
      loadingStyle: 'skeleton',

      inputStyle: 'boxed',
      focusStyle: 'glow-ring',

      headerStyle: 'frosted',
      modalStyle: 'centered-box',
      tabsStyle: 'pill',

      motionSpeed: 'snappy',
      easing: 'ease-out',
    },
  },
  {
    id: 'opencode',
    name: 'OpenAI / OpenCode',
    category: 'Frontier AI & Tech',
    tagline: 'Clean Monolith & Emerald Code',
    description: 'Minimalist neutral dark zinc, signature AI emerald green, compact line-height, and clean code blocks.',
    theme: {
      isDark: true,
      primaryColor: '#10A37F',
      accentColor: '#059669',
      backgroundColor: '#18181B',
      surfaceColor: '#27272A',
      textColor: '#FAFAFA',
      textMutedColor: '#A1A1AA',
      borderColor: '#3F3F46',
      textContrast: 'bold',

      headingFont: 'sans',
      headingStyle: 'bold-big',
      bodyFont: 'modern',
      textDensity: 'compact',
      letterSpacing: 'normal',

      radius: 8,
      borderStyle: 'solid',
      borderWidth: 1,
      shadowDepth: 'flat',

      density: 'compact',
      alignment: 'left-aligned',
      sectionPadding: 'balanced',
      contentWidth: 'standard',

      buttonShape: 'pill',
      buttonFill: 'solid',
      buttonHover: 'subtle',
      dangerStyle: 'solid-red',

      cardStyle: 'flat',
      cardHover: 'border-highlight',

      alertStyle: 'soft-tint',
      toastPosition: 'top-center',
      toastAnimation: 'fade-in',
      badgeStyle: 'pill-dot',
      loadingStyle: 'skeleton',

      inputStyle: 'boxed',
      focusStyle: 'border-color',

      headerStyle: 'bordered-bottom',
      modalStyle: 'centered-box',
      tabsStyle: 'pill',

      motionSpeed: 'snappy',
      easing: 'ease-out',
    },
  },
  {
    id: 'vercel',
    name: 'Vercel / Geist',
    category: 'Frontier AI & Tech',
    tagline: 'Hyper-Minimalist Developer Monolith',
    description: 'Pure pitch black and stark white, geometric Geist typography, sharp edges, and zero distraction.',
    theme: {
      isDark: true,
      primaryColor: '#FFFFFF',
      accentColor: '#38BDF8',
      backgroundColor: '#000000',
      surfaceColor: '#111111',
      textColor: '#FFFFFF',
      textMutedColor: '#888888',
      borderColor: '#2E2E2E',
      textContrast: 'bold',

      headingFont: 'sans',
      headingStyle: 'technical',
      bodyFont: 'modern',
      textDensity: 'compact',
      letterSpacing: 'tight',

      radius: 4,
      borderStyle: 'solid',
      borderWidth: 1,
      shadowDepth: 'flat',

      density: 'compact',
      alignment: 'left-aligned',
      sectionPadding: 'balanced',
      contentWidth: 'wide',

      buttonShape: 'sharp',
      buttonFill: 'solid',
      buttonHover: 'snap',
      dangerStyle: 'outline-red',

      cardStyle: 'bordered',
      cardHover: 'lift',

      alertStyle: 'left-bar',
      toastPosition: 'bottom-right',
      toastAnimation: 'slide-in',
      badgeStyle: 'solid-chip',
      loadingStyle: 'progress-bar',

      inputStyle: 'boxed',
      focusStyle: 'border-color',

      headerStyle: 'solid-bar',
      modalStyle: 'centered-box',
      tabsStyle: 'underline',

      motionSpeed: 'snappy',
      easing: 'linear',
    },
  },
  {
    id: 'linear',
    name: 'Linear / Raycast',
    category: 'Frontier AI & Tech',
    tagline: 'Dark Craft & Precision SaaS',
    description: 'Slate 950 surfaces, subtle top-edge inner specular highlights, Linear indigo/violet, and keyboard-first shortcuts.',
    theme: {
      isDark: true,
      primaryColor: '#5E6AD2',
      accentColor: '#818CF8',
      backgroundColor: '#090A0F',
      surfaceColor: '#151720',
      textColor: '#F1F5F9',
      textMutedColor: '#94A3B8',
      borderColor: '#232635',
      textContrast: 'bold',

      headingFont: 'sans',
      headingStyle: 'bold-big',
      bodyFont: 'modern',
      textDensity: 'compact',
      letterSpacing: 'tight',

      radius: 6,
      borderStyle: 'hairline',
      borderWidth: 1,
      shadowDepth: 'elevated',

      density: 'compact',
      alignment: 'left-aligned',
      sectionPadding: 'balanced',
      contentWidth: 'wide',

      buttonShape: 'rounded',
      buttonFill: 'solid',
      buttonHover: 'glowing',
      dangerStyle: 'outline-red',

      cardStyle: 'bordered',
      cardHover: 'glow',

      alertStyle: 'soft-tint',
      toastPosition: 'bottom-right',
      toastAnimation: 'slide-in',
      badgeStyle: 'pill-dot',
      loadingStyle: 'skeleton',

      inputStyle: 'boxed',
      focusStyle: 'glow-ring',

      headerStyle: 'frosted',
      modalStyle: 'centered-box',
      tabsStyle: 'pill',

      motionSpeed: 'snappy',
      easing: 'ease-out',
    },
  },
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    category: 'Frontier AI & Tech',
    tagline: 'Scholarly Research & Deep Mineral Teal',
    description: 'Deep mineral teal slate, ocean mint highlights, citation pill badges, and spacious reading density.',
    theme: {
      isDark: true,
      primaryColor: '#20B2AA',
      accentColor: '#2DD4BF',
      backgroundColor: '#0D1517',
      surfaceColor: '#162327',
      textColor: '#E2E8F0',
      textMutedColor: '#8BA1A7',
      borderColor: '#22383F',
      textContrast: 'bold',

      headingFont: 'sans',
      headingStyle: 'quiet-small',
      bodyFont: 'humanist',
      textDensity: 'airy',
      letterSpacing: 'normal',

      radius: 10,
      borderStyle: 'solid',
      borderWidth: 1,
      shadowDepth: 'soft',

      density: 'spacious',
      alignment: 'left-aligned',
      sectionPadding: 'generous',
      contentWidth: 'standard',

      buttonShape: 'pill',
      buttonFill: 'soft',
      buttonHover: 'subtle',
      dangerStyle: 'solid-red',

      cardStyle: 'bordered',
      cardHover: 'lift',

      alertStyle: 'left-bar',
      toastPosition: 'bottom-right',
      toastAnimation: 'fade-in',
      badgeStyle: 'pill-dot',
      loadingStyle: 'dots',

      inputStyle: 'filled',
      focusStyle: 'glow-ring',

      headerStyle: 'frosted',
      modalStyle: 'centered-box',
      tabsStyle: 'underline',

      motionSpeed: 'smooth',
      easing: 'ease-out',
    },
  },
  {
    id: 'supabase',
    name: 'Supabase Studio',
    category: 'Frontier AI & Tech',
    tagline: 'Dark Studio Charcoal & Acid Neon Green',
    description: 'Developer-first charcoal canvas, high-energy acid emerald accents, crisp data grids, and glowing live indicators.',
    theme: {
      isDark: true,
      primaryColor: '#3ECF8E',
      accentColor: '#00E699',
      backgroundColor: '#171717',
      surfaceColor: '#1F1F1F',
      textColor: '#EDEDED',
      textMutedColor: '#A0A0A0',
      borderColor: '#303030',
      textContrast: 'bold',

      headingFont: 'mono',
      headingStyle: 'technical',
      bodyFont: 'technical',
      textDensity: 'compact',
      letterSpacing: 'tight',

      radius: 6,
      borderStyle: 'solid',
      borderWidth: 1,
      shadowDepth: 'flat',

      density: 'compact',
      alignment: 'left-aligned',
      sectionPadding: 'balanced',
      contentWidth: 'wide',

      buttonShape: 'rounded',
      buttonFill: 'solid',
      buttonHover: 'snap',
      dangerStyle: 'solid-red',

      cardStyle: 'bordered',
      cardHover: 'border-highlight',

      alertStyle: 'left-bar',
      toastPosition: 'bottom-right',
      toastAnimation: 'slide-in',
      badgeStyle: 'pill-dot',
      loadingStyle: 'spinner',

      inputStyle: 'boxed',
      focusStyle: 'border-color',

      headerStyle: 'solid-bar',
      modalStyle: 'centered-box',
      tabsStyle: 'boxed',

      motionSpeed: 'snappy',
      easing: 'linear',
    },
  },

  // Tier B: Lifestyle & Product
  {
    id: 'neo-brutalism',
    name: 'Neo-Brutalism',
    category: 'Lifestyle & Product',
    tagline: 'Bold, Playful, High-Energy Indie Pop',
    description: 'Saturated canary yellow, electric cyan, thick 3px solid black borders, and hard unblurred drop shadows.',
    theme: {
      isDark: false,
      primaryColor: '#FFE600',
      accentColor: '#00F0FF',
      backgroundColor: '#FFFDF0',
      surfaceColor: '#FFFFFF',
      textColor: '#000000',
      textMutedColor: '#555555',
      borderColor: '#000000',
      textContrast: 'bold',

      headingFont: 'display',
      headingStyle: 'bold-big',
      bodyFont: 'modern',
      textDensity: 'normal',
      letterSpacing: 'tight',

      radius: 0,
      borderStyle: 'brutalist',
      borderWidth: 3,
      shadowDepth: 'brutalist',

      density: 'standard',
      alignment: 'left-aligned',
      sectionPadding: 'balanced',
      contentWidth: 'standard',

      buttonShape: 'sharp',
      buttonFill: 'solid',
      buttonHover: 'snap',
      dangerStyle: 'solid-red',

      cardStyle: 'bordered',
      cardHover: 'lift',

      alertStyle: 'floating-card',
      toastPosition: 'bottom-right',
      toastAnimation: 'bounce',
      badgeStyle: 'solid-chip',
      loadingStyle: 'dots',

      inputStyle: 'boxed',
      focusStyle: 'border-color',

      headerStyle: 'bordered-bottom',
      modalStyle: 'centered-box',
      tabsStyle: 'boxed',

      motionSpeed: 'snappy',
      easing: 'linear',
    },
  },
  {
    id: 'luxury-serif',
    name: 'Editorial Luxury',
    category: 'Lifestyle & Product',
    tagline: 'Quiet Elegance & Haute Couture',
    description: 'Warm parchment canvas, deep espresso text, champagne gold accents, hairline borders, and airy whitespace.',
    theme: {
      isDark: false,
      primaryColor: '#1C1917',
      accentColor: '#D4AF37',
      backgroundColor: '#F8F5F0',
      surfaceColor: '#FFFFFF',
      textColor: '#1C1917',
      textMutedColor: '#78716C',
      borderColor: '#E7E5E4',
      textContrast: 'bold',

      headingFont: 'serif',
      headingStyle: 'literary',
      bodyFont: 'editorial',
      textDensity: 'airy',
      letterSpacing: 'wide',

      radius: 0,
      borderStyle: 'hairline',
      borderWidth: 1,
      shadowDepth: 'flat',

      density: 'spacious',
      alignment: 'centered',
      sectionPadding: 'generous',
      contentWidth: 'narrow',

      buttonShape: 'sharp',
      buttonFill: 'outline',
      buttonHover: 'subtle',
      dangerStyle: 'text-red',

      cardStyle: 'flat',
      cardHover: 'none',

      alertStyle: 'soft-tint',
      toastPosition: 'top-center',
      toastAnimation: 'fade-in',
      badgeStyle: 'outline-tag',
      loadingStyle: 'spinner',

      inputStyle: 'underline',
      focusStyle: 'animated-underline',

      headerStyle: 'bordered-bottom',
      modalStyle: 'centered-box',
      tabsStyle: 'underline',

      motionSpeed: 'leisurely',
      easing: 'ease-out',
    },
  },
  {
    id: 'nordic-nature',
    name: 'Nordic Organic',
    category: 'Lifestyle & Product',
    tagline: 'Calm Sage & Grounded Earth',
    description: 'Sage green, warm oatmeal, muted terracotta, soft natural curves, and relaxed mindfulness.',
    theme: {
      isDark: false,
      primaryColor: '#5C715E',
      accentColor: '#C88267',
      backgroundColor: '#F4F1EA',
      surfaceColor: '#EBE7DE',
      textColor: '#2D3748',
      textMutedColor: '#718096',
      borderColor: '#DDD8CE',
      textContrast: 'balanced',

      headingFont: 'sans',
      headingStyle: 'quiet-small',
      bodyFont: 'humanist',
      textDensity: 'normal',
      letterSpacing: 'normal',

      radius: 14,
      borderStyle: 'solid',
      borderWidth: 1,
      shadowDepth: 'soft',

      density: 'spacious',
      alignment: 'left-aligned',
      sectionPadding: 'generous',
      contentWidth: 'standard',

      buttonShape: 'rounded',
      buttonFill: 'solid',
      buttonHover: 'subtle',
      dangerStyle: 'outline-red',

      cardStyle: 'flat',
      cardHover: 'lift',

      alertStyle: 'soft-tint',
      toastPosition: 'bottom-right',
      toastAnimation: 'slide-in',
      badgeStyle: 'solid-chip',
      loadingStyle: 'dots',

      inputStyle: 'filled',
      focusStyle: 'border-color',

      headerStyle: 'bordered-bottom',
      modalStyle: 'centered-box',
      tabsStyle: 'pill',

      motionSpeed: 'smooth',
      easing: 'ease-out',
    },
  },
  {
    id: 'playful-pastel',
    name: 'Playful Pastel Pop',
    category: 'Lifestyle & Product',
    tagline: 'Candy Lavender & Bouncy Joy',
    description: 'Pastel lavender, bubblegum peach, mint, maximum pill buttons, and cheerful springy animations.',
    theme: {
      isDark: false,
      primaryColor: '#8B5CF6',
      accentColor: '#F472B6',
      backgroundColor: '#FAF5FF',
      surfaceColor: '#FFFFFF',
      textColor: '#3B0764',
      textMutedColor: '#86198F',
      borderColor: '#F3E8FF',
      textContrast: 'bold',

      headingFont: 'sans',
      headingStyle: 'bold-big',
      bodyFont: 'humanist',
      textDensity: 'normal',
      letterSpacing: 'normal',

      radius: 20,
      borderStyle: 'solid',
      borderWidth: 2,
      shadowDepth: 'soft',

      density: 'standard',
      alignment: 'centered',
      sectionPadding: 'generous',
      contentWidth: 'standard',

      buttonShape: 'pill',
      buttonFill: 'solid',
      buttonHover: 'bouncy',
      dangerStyle: 'solid-red',

      cardStyle: 'shadow',
      cardHover: 'lift',

      alertStyle: 'floating-card',
      toastPosition: 'top-center',
      toastAnimation: 'bounce',
      badgeStyle: 'pill-dot',
      loadingStyle: 'dots',

      inputStyle: 'boxed',
      focusStyle: 'glow-ring',

      headerStyle: 'floating-pill',
      modalStyle: 'centered-box',
      tabsStyle: 'pill',

      motionSpeed: 'smooth',
      easing: 'spring',
    },
  },
  {
    id: 'cad-blueprint',
    name: 'Industrial Blueprint',
    category: 'Lifestyle & Product',
    tagline: 'Utilitarian Precision & Cadmium Safety',
    description: 'Technical blueprint navy, steel grays, cadmium safety orange, strict 0px corners, and dense grid layouts.',
    theme: {
      isDark: true,
      primaryColor: '#FF6B00',
      accentColor: '#38BDF8',
      backgroundColor: '#0B1E36',
      surfaceColor: '#122B4D',
      textColor: '#E2E8F0',
      textMutedColor: '#94A3B8',
      borderColor: '#1D4577',
      textContrast: 'bold',

      headingFont: 'mono',
      headingStyle: 'technical',
      bodyFont: 'technical',
      textDensity: 'compact',
      letterSpacing: 'tight',

      radius: 0,
      borderStyle: 'solid',
      borderWidth: 1,
      shadowDepth: 'flat',

      density: 'compact',
      alignment: 'left-aligned',
      sectionPadding: 'tight',
      contentWidth: 'wide',

      buttonShape: 'sharp',
      buttonFill: 'solid',
      buttonHover: 'snap',
      dangerStyle: 'solid-red',

      cardStyle: 'bordered',
      cardHover: 'border-highlight',

      alertStyle: 'left-bar',
      toastPosition: 'bottom-left',
      toastAnimation: 'slide-in',
      badgeStyle: 'outline-tag',
      loadingStyle: 'progress-bar',

      inputStyle: 'boxed',
      focusStyle: 'border-color',

      headerStyle: 'solid-bar',
      modalStyle: 'centered-box',
      tabsStyle: 'boxed',

      motionSpeed: 'snappy',
      easing: 'linear',
    },
  },
];

export const PRESET_THEMES: PresetTheme[] = RAW_PRESETS.map((preset) => {
  let securityOverride: Partial<SecurityConfig> = {};
  let backendOverride: Partial<BackendConfig> = {};

  if (preset.id === 'supabase') {
    securityOverride = { authMethods: ['supabase-auth', 'oauth-jwt'] };
    backendOverride = { database: 'supabase', orm: 'drizzle' };
  } else if (preset.id === 'antigravity') {
    securityOverride = { authMethods: ['oauth-jwt', 'passkeys'], corsMode: 'strict-whitelist' };
    backendOverride = { runtime: 'edge', apiStyle: 'trpc', caching: 'redis-upstash' };
  } else if (preset.id === 'vercel') {
    securityOverride = { authMethods: ['session-cookies', 'oauth-jwt', 'passkeys'] };
    backendOverride = { runtime: 'edge', apiStyle: 'server-actions', hosting: 'vercel' };
  } else if (preset.id === 'claude') {
    securityOverride = { authMethods: ['session-cookies', 'passkeys'], contentSecurityPolicy: 'strict' };
    backendOverride = { database: 'postgresql-neon', orm: 'drizzle' };
  } else if (preset.id === 'cad-blueprint') {
    backendOverride = { runtime: 'go', orm: 'raw-sql' };
  }

  return {
    ...preset,
    theme: {
      ...preset.theme,
      security: {
        ...DEFAULT_SECURITY,
        ...securityOverride,
      },
      backend: {
        ...DEFAULT_BACKEND,
        ...backendOverride,
      },
    },
  };
});

