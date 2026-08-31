import { ThemeConfig } from '../types/theme';
import { generateCssSnippet, generateTailwindSnippet } from './cssGenerator';

export function generateUniversalMarkdown(theme: ThemeConfig): string {
  return `# Design Theme: ${theme.name}

> Clean visual theme specification generated with Design2Prompt. Paste this into your AI coding tool (Claude, Cursor, v0, Bolt, Lovable) to apply this exact aesthetic to your project.

## Foundation
- Primary Brand Color: \`${theme.primaryColor}\` (signature visual accent)
- Secondary Accent Color: \`${theme.accentColor}\` (supporting highlight)
- Canvas / Background: \`${theme.backgroundColor}\` (${theme.isDark ? 'Dark mode' : 'Light mode'})
- Surface / Cards: \`${theme.surfaceColor}\`
- Text Foreground: \`${theme.textColor}\`
- Muted / Secondary Text: \`${theme.textMutedColor}\`
- Border Tone: \`${theme.borderColor}\`
- Text Contrast Level: **${theme.textContrast.toUpperCase()}**

## Typography & Rhythm
- Headings: **${theme.headingFont}** style (${theme.headingStyle})
- Body Copy: **${theme.bodyFont}** style
- Text Density: **${theme.textDensity}** line spacing
- Letter Spacing: **${theme.letterSpacing}** tracking

## Shape & Structure
- Corner Radius: \`${theme.radius}px\` (${theme.radius === 0 ? 'Sharp 0px' : theme.radius >= 16 ? 'Pill / Extra Rounded' : 'Standard Rounded'})
- Border Style: **${theme.borderStyle}** (\`${theme.borderWidth}px\`)
- Elevation / Shadow: **${theme.shadowDepth}**

## Spacing & Density
- Content Density: **${theme.density}**
- Alignment: **${theme.alignment}**
- Section Padding: **${theme.sectionPadding}**
- Max Container Width: **${theme.contentWidth}**

## Buttons & Interactive Controls
- Button Shape: **${theme.buttonShape}**
- Button Fill: **${theme.buttonFill}**
- Hover Feedback: **${theme.buttonHover}**
- Danger Action: **${theme.dangerStyle}**

## Cards & Containers
- Card Style: **${theme.cardStyle}**
- Card Hover Effect: **${theme.cardHover}**

## Feedback & Status
- Alert/Banner Style: **${theme.alertStyle}**
- Toast Position & Style: **${theme.toastPosition}**, ${theme.toastAnimation} animation
- Status Badges: **${theme.badgeStyle}**
- Loading Indicators: **${theme.loadingStyle}**

## Forms & Inputs
- Field Style: **${theme.inputStyle}**
- Focus State: **${theme.focusStyle}**

## Navigation & Overlays
- Header Nav: **${theme.headerStyle}**
- Modal Dialog: **${theme.modalStyle}**
- Tabs: **${theme.tabsStyle}**

## Motion & Transitions
- Transition Speed: **${theme.motionSpeed}**
- Easing Curve: **${theme.easing}**

<details>
<summary><strong>Tailwind CSS Configuration Snippet</strong></summary>

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
  return `# .cursorrules - Design System & UI Styling Rules

You are a senior frontend engineer. You must adhere STRICTLY to this design system when writing or modifying UI components, pages, and styles in this repository.

## Visual Design Tokens
- Primary Color: ${theme.primaryColor}
- Accent Color: ${theme.accentColor}
- Background Canvas: ${theme.backgroundColor}
- Surface / Cards: ${theme.surfaceColor}
- Text Color: ${theme.textColor}
- Muted Text: ${theme.textMutedColor}
- Border Color: ${theme.borderColor}
- Corner Radius: ${theme.radius}px
- Border Width: ${theme.borderWidth}px (${theme.borderStyle})
- Shadow Style: ${theme.shadowDepth}

## Component Rules
1. **Buttons**: Use ${theme.buttonShape} shape with ${theme.buttonFill} fill. Hover effect must be ${theme.buttonHover}.
2. **Cards**: Implement with ${theme.cardStyle} style. Hover state: ${theme.cardHover}.
3. **Forms**: Inputs must follow '${theme.inputStyle}' appearance with a '${theme.focusStyle}' on focus.
4. **Typography**: Headings use ${theme.headingFont} font (${theme.headingStyle}). Body copy uses ${theme.bodyFont} font with ${theme.textDensity} line-height.
5. **Spacing & Layout**: Follow ${theme.density} density with ${theme.sectionPadding} section padding. Max width is ${theme.contentWidth}.
6. **Motion**: Use ${theme.motionSpeed} transitions with ${theme.easing} easing curves. Avoid jarring or slow animations.

Do not invent random hex codes or mismatched border radii. Always use CSS variables or Tailwind classes matching these tokens.
`;
}

export function generateClaudePrompt(theme: ThemeConfig): string {
  return `You are an expert design-technologist and full-stack developer.

Please build the application/component using the following exact design aesthetic and token specifications:

Theme Name: ${theme.name}
- Aesthetic Vibe: ${theme.isDark ? 'Dark Mode' : 'Light Mode'}, ${theme.headingStyle}, ${theme.density} density
- Colors:
  - Primary: ${theme.primaryColor}
  - Secondary Accent: ${theme.accentColor}
  - Background: ${theme.backgroundColor}
  - Card Surface: ${theme.surfaceColor}
  - Text: ${theme.textColor}
  - Muted Text: ${theme.textMutedColor}
  - Borders: ${theme.borderWidth}px ${theme.borderStyle} ${theme.borderColor}
- Shapes & Radii: ${theme.radius}px on buttons and containers (${theme.buttonShape} buttons)
- Shadows: ${theme.shadowDepth}
- Typography: Headings in ${theme.headingFont} (${theme.headingStyle}), body in ${theme.bodyFont} (${theme.textDensity} line-spacing)
- Animations: ${theme.motionSpeed} with ${theme.easing} easing curve

Ensure all buttons, form fields, cards, navigation bars, and status badges align faithfully with these design tokens.`;
}

export function generateV0Prompt(theme: ThemeConfig): string {
  return `Create a modern web interface with Tailwind CSS and Shadcn/UI conventions following this exact visual theme:

- Color Palette:
  - Primary: ${theme.primaryColor}
  - Accent: ${theme.accentColor}
  - Background: ${theme.backgroundColor}
  - Card/Surface: ${theme.surfaceColor}
  - Foreground Text: ${theme.textColor}
  - Muted Text: ${theme.textMutedColor}
  - Border: ${theme.borderColor}
- Radii: rounded-[${theme.radius}px]
- Card Style: ${theme.cardStyle} with ${theme.shadowDepth} shadow
- Buttons: ${theme.buttonShape} with ${theme.buttonFill} fill and ${theme.buttonHover} hover
- Inputs: ${theme.inputStyle} with ${theme.focusStyle} focus
- Header: ${theme.headerStyle}
- Density: ${theme.density} spacing

Write clean, responsive React code with accessible markup and cohesive styling matching these tokens.`;
}
