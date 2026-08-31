// WCAG contrast calculation and auto-fixer

function hexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace('#', '');
  if (clean.length === 3) {
    clean = clean.split('').map(c => c + c).join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return [0, 0, 0];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const toH = (v: number) => clamp(v).toString(16).padStart(2, '0');
  return `#${toH(r)}${toH(g)}${toH(b)}`;
}

function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

export function getContrastRatio(hex1: string, hex2: string): number {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function getWcagRating(ratio: number): { aa: boolean; aaa: boolean; label: string } {
  const aa = ratio >= 4.5;
  const aaa = ratio >= 7;
  let label = 'Fail';
  if (aaa) label = 'AAA Pass';
  else if (aa) label = 'AA Pass';
  else if (ratio >= 3) label = 'Large Text Only';

  return { aa, aaa, label };
}

export function autoFixContrast(textColor: string, bgColor: string): string {
  const [br, bg, bb] = hexToRgb(bgColor);
  const bgLum = getLuminance(br, bg, bb);
  const isDarkBg = bgLum < 0.5;

  const [tr, tg, tb] = hexToRgb(textColor);
  let factor = isDarkBg ? 1.05 : 0.95;
  let currR = tr;
  let currG = tg;
  let currB = tb;

  for (let i = 0; i < 50; i++) {
    const candidateHex = rgbToHex(currR, currG, currB);
    const ratio = getContrastRatio(candidateHex, bgColor);
    if (ratio >= 4.5) {
      return candidateHex;
    }
    if (isDarkBg) {
      currR = Math.min(255, currR + 10);
      currG = Math.min(255, currG + 10);
      currB = Math.min(255, currB + 10);
    } else {
      currR = Math.max(0, currR - 10);
      currG = Math.max(0, currG - 10);
      currB = Math.max(0, currB - 10);
    }
  }

  return isDarkBg ? '#FFFFFF' : '#000000';
}
