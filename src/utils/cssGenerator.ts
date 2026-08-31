import { ThemeConfig } from '../types/theme';

export function getThemeCssVariables(theme: ThemeConfig): Record<string, string> {
  const fontHeading = 
    theme.headingFont === 'serif' ? '"Instrument Serif", Georgia, serif' :
    theme.headingFont === 'mono' ? '"JetBrains Mono", monospace' :
    theme.headingFont === 'display' ? '"Space Grotesk", sans-serif' :
    '"Inter", system-ui, sans-serif';

  const fontBody = 
    theme.bodyFont === 'editorial' ? '"Instrument Serif", Georgia, serif' :
    theme.bodyFont === 'humanist' ? '"Plus Jakarta Sans", sans-serif' :
    theme.bodyFont === 'technical' ? '"JetBrains Mono", monospace' :
    '"Inter", system-ui, sans-serif';

  const shadow = 
    theme.shadowDepth === 'flat' ? 'none' :
    theme.shadowDepth === 'soft' ? '0 4px 20px -2px rgba(0, 0, 0, 0.08)' :
    theme.shadowDepth === 'elevated' ? '0 10px 30px -4px rgba(0, 0, 0, 0.25), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' :
    theme.shadowDepth === 'brutalist' ? '4px 4px 0px #000000' :
    `0 0 25px -4px ${theme.primaryColor}55`;

  const transitionDuration = 
    theme.motionSpeed === 'none' ? '0ms' :
    theme.motionSpeed === 'snappy' ? '150ms' :
    theme.motionSpeed === 'smooth' ? '300ms' : '500ms';

  const transitionEase = 
    theme.easing === 'spring' ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' :
    theme.easing === 'linear' ? 'linear' :
    'cubic-bezier(0.16, 1, 0.3, 1)';

  // CRITICAL FIX: Cards and containers must NOT use 9999px (pill) radius,
  // otherwise content severely overflows and clips through the rounded card edges!
  // Clamp card radius to a maximum of 20px, while buttons & badges can be 9999px full pills.
  const cardRadius = theme.radius >= 9999 ? 16 : Math.min(theme.radius, 20);
  const buttonRadius = theme.buttonShape === 'pill' ? 9999 : theme.buttonShape === 'sharp' ? 0 : theme.radius;

  const lineHeight = 
    theme.textDensity === 'compact' ? '1.35' :
    theme.textDensity === 'airy' ? '1.75' : '1.5';

  const letterSpacing = 
    theme.letterSpacing === 'tight' ? '-0.025em' :
    theme.letterSpacing === 'wide' ? '0.04em' : '0em';

  return {
    '--theme-primary': theme.primaryColor,
    '--theme-accent': theme.accentColor,
    '--theme-bg': theme.backgroundColor,
    '--theme-surface': theme.surfaceColor,
    '--theme-text': theme.textColor,
    '--theme-text-muted': theme.textMutedColor,
    '--theme-border': theme.borderColor,
    '--theme-radius': `${theme.radius}px`,
    '--theme-radius-card': `${cardRadius}px`,
    '--theme-radius-btn': `${buttonRadius}px`,
    '--theme-border-width': `${theme.borderWidth}px`,
    '--theme-shadow': shadow,
    '--theme-font-heading': fontHeading,
    '--theme-font-body': fontBody,
    '--theme-line-height': lineHeight,
    '--theme-letter-spacing': letterSpacing,
    '--theme-transition': `${transitionDuration} ${transitionEase}`,
    '--theme-spacing-factor': theme.density === 'compact' ? '0.75' : theme.density === 'spacious' ? '1.25' : '1',
  };
}

export function generateCssSnippet(theme: ThemeConfig): string {
  const vars = getThemeCssVariables(theme);
  const lines = Object.entries(vars)
    .map(([key, val]) => `  ${key}: ${val};`)
    .join('\n');

  return `:root {\n${lines}\n}`;
}

export function generateTailwindSnippet(theme: ThemeConfig): string {
  const cardRadius = theme.radius >= 9999 ? 16 : Math.min(theme.radius, 20);
  return `/* Tailwind CSS v4 @theme or v3 config */
@theme {
  --color-primary: ${theme.primaryColor};
  --color-accent: ${theme.accentColor};
  --color-background: ${theme.backgroundColor};
  --color-surface: ${theme.surfaceColor};
  --color-text: ${theme.textColor};
  --color-muted: ${theme.textMutedColor};
  --color-border: ${theme.borderColor};
  --radius-theme: ${theme.radius}px;
  --radius-card: ${cardRadius}px;
}

/* Tailwind v3 tailwind.config.js snippet: */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '${theme.primaryColor}',
        accent: '${theme.accentColor}',
        background: '${theme.backgroundColor}',
        surface: '${theme.surfaceColor}',
      },
      borderRadius: {
        theme: '${theme.radius}px',
        card: '${cardRadius}px',
      }
    }
  }
};`;
}
