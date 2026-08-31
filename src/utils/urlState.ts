import { ThemeConfig } from '../types/theme';

export function encodeThemeToHash(theme: ThemeConfig): string {
  try {
    const json = JSON.stringify(theme);
    // Base64 encode safe for URL
    const b64 = btoa(encodeURIComponent(json));
    return `#theme=${b64}`;
  } catch (err) {
    console.error('Failed to encode theme to hash', err);
    return '';
  }
}

export function decodeThemeFromHash(hashString: string): ThemeConfig | null {
  try {
    const cleanHash = hashString.startsWith('#') ? hashString.slice(1) : hashString;
    const params = new URLSearchParams(cleanHash);
    const themeParam = params.get('theme');
    if (!themeParam) return null;

    const decodedJson = decodeURIComponent(atob(themeParam));
    const parsed = JSON.parse(decodedJson) as ThemeConfig;
    if (parsed && parsed.primaryColor && parsed.backgroundColor) {
      return parsed;
    }
    return null;
  } catch (err) {
    console.error('Failed to decode theme from hash', err);
    return null;
  }
}
