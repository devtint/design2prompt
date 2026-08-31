import React, { useState } from 'react';
import { 
  Palette, 
  Type, 
  Square, 
  Maximize2, 
  MousePointerClick, 
  LayoutTemplate, 
  Activity, 
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { ThemeConfig } from '../types/theme';
import { getContrastRatio, getWcagRating, autoFixContrast } from '../utils/colorContrast';

interface ControlPanelProps {
  theme: ThemeConfig;
  onChange: (updated: Partial<ThemeConfig>) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ theme, onChange }) => {
  const [activeTab, setActiveTab] = useState<'foundation' | 'typography' | 'shape' | 'buttons' | 'cards' | 'motion'>('foundation');

  // Contrast check
  const contrastRatio = getContrastRatio(theme.textColor, theme.backgroundColor);
  const wcag = getWcagRating(contrastRatio);

  const handleFixContrast = () => {
    const fixedColor = autoFixContrast(theme.textColor, theme.backgroundColor);
    onChange({ textColor: fixedColor });
  };

  const tabs = [
    { id: 'foundation', label: 'Color & Base', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'shape', label: 'Shape & Border', icon: Square },
    { id: 'buttons', label: 'Buttons', icon: MousePointerClick },
    { id: 'cards', label: 'Cards & Alerts', icon: LayoutTemplate },
    { id: 'motion', label: 'Motion', icon: Activity },
  ] as const;

  return (
    <aside className="w-full lg:w-80 xl:w-96 border-r border-neutral-800 bg-neutral-950 flex flex-col h-[calc(100vh-53px)] shrink-0">
      {/* Category Tab Bar */}
      <div className="flex overflow-x-auto border-b border-neutral-800 p-1.5 gap-1 bg-neutral-900/50 scrollbar-none">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === id
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Settings Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 text-neutral-200">
        {/* TAB 1: FOUNDATION */}
        {activeTab === 'foundation' && (
          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Primary Brand Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => onChange({ primaryColor: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-neutral-700 bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={theme.primaryColor}
                  onChange={(e) => onChange({ primaryColor: e.target.value })}
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono uppercase focus:ring-1 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Secondary Accent Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.accentColor}
                  onChange={(e) => onChange({ accentColor: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-neutral-700 bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={theme.accentColor}
                  onChange={(e) => onChange({ accentColor: e.target.value })}
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono uppercase focus:ring-1 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Canvas Background
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.backgroundColor}
                  onChange={(e) => onChange({ backgroundColor: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-neutral-700 bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={theme.backgroundColor}
                  onChange={(e) => onChange({ backgroundColor: e.target.value })}
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono uppercase focus:ring-1 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Surface / Cards Tone
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={theme.surfaceColor}
                  onChange={(e) => onChange({ surfaceColor: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-neutral-700 bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={theme.surfaceColor}
                  onChange={(e) => onChange({ surfaceColor: e.target.value })}
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono uppercase focus:ring-1 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Text & Contrast
              </label>
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="color"
                  value={theme.textColor}
                  onChange={(e) => onChange({ textColor: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-neutral-700 bg-transparent p-0.5"
                />
                <input
                  type="text"
                  value={theme.textColor}
                  onChange={(e) => onChange({ textColor: e.target.value })}
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono uppercase focus:ring-1 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              {/* WCAG Contrast Guardrail Widget */}
              <div className={`p-2.5 rounded-lg border text-xs flex items-center justify-between ${
                wcag.aa 
                  ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300' 
                  : 'bg-amber-950/40 border-amber-800/60 text-amber-300'
              }`}>
                <div className="flex items-center gap-2">
                  {wcag.aa ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" />}
                  <div>
                    <div className="font-semibold">{wcag.label} ({contrastRatio.toFixed(2)}:1)</div>
                    <div className="text-[10px] opacity-80">{wcag.aa ? 'Accessible for body text' : 'Low contrast warning'}</div>
                  </div>
                </div>
                {!wcag.aa && (
                  <button
                    onClick={handleFixContrast}
                    className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded text-[10px] transition-colors"
                  >
                    Auto Fix
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TYPOGRAPHY */}
        {activeTab === 'typography' && (
          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Heading Typography Feel
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'sans', label: 'Modern Sans', preview: 'Inter / Geist' },
                  { id: 'serif', label: 'Editorial Serif', preview: 'Instrument Serif' },
                  { id: 'mono', label: 'Technical Mono', preview: 'JetBrains Mono' },
                  { id: 'display', label: 'Space Grotesk', preview: 'Chunky Display' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onChange({ headingFont: item.id as any })}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      theme.headingFont === item.id
                        ? 'border-sky-500 bg-sky-950/20 text-white'
                        : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 text-neutral-400'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{item.label}</div>
                    <div className="text-[10px] opacity-70">{item.preview}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Body Font Personality
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'modern', label: 'Modern Clean', sub: 'Neutral Grotesk' },
                  { id: 'humanist', label: 'Humanist Soft', sub: 'Friendly curves' },
                  { id: 'editorial', label: 'Editorial Book', sub: 'Literary serif' },
                  { id: 'technical', label: 'Technical Code', sub: 'Fixed monospace' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onChange({ bodyFont: item.id as any })}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      theme.bodyFont === item.id
                        ? 'border-sky-500 bg-sky-950/20 text-white'
                        : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/50 text-neutral-400'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{item.label}</div>
                    <div className="text-[10px] opacity-70">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                <span>Text Reading Density</span>
                <span className="text-sky-400 font-mono capitalize">{theme.textDensity}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['compact', 'normal', 'airy'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => onChange({ textDensity: d })}
                    className={`py-2 text-xs font-medium rounded-lg border capitalize transition-all ${
                      theme.textDensity === d
                        ? 'border-sky-500 bg-sky-950/30 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                <span>Letter Spacing (Tracking)</span>
                <span className="text-sky-400 font-mono capitalize">{theme.letterSpacing}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['tight', 'normal', 'wide'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => onChange({ letterSpacing: s })}
                    className={`py-2 text-xs font-medium rounded-lg border capitalize transition-all ${
                      theme.letterSpacing === s
                        ? 'border-sky-500 bg-sky-950/30 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SHAPE & BORDER */}
        {activeTab === 'shape' && (
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                <span>Corner Radius</span>
                <span className="text-sky-400 font-mono">{theme.radius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="24"
                step="2"
                value={theme.radius > 24 ? 24 : theme.radius}
                onChange={(e) => onChange({ radius: Number(e.target.value) })}
                className="w-full accent-sky-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
              />
              <div className="flex gap-2 mt-2">
                {[0, 6, 12, 16, 9999].map((r) => (
                  <button
                    key={r}
                    onClick={() => onChange({ radius: r })}
                    className={`flex-1 py-1 text-[11px] font-mono rounded border transition-all ${
                      theme.radius === r
                        ? 'border-sky-500 bg-sky-950/30 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {r === 9999 ? 'Pill' : `${r}px`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Border Style & Width
              </label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {[
                  { id: 'hairline', label: 'Hairline 1px', w: 1 },
                  { id: 'solid', label: 'Solid 1px', w: 1 },
                  { id: 'brutalist', label: 'Brutalist 3px', w: 3 },
                  { id: 'none', label: 'None 0px', w: 0 },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => onChange({ borderStyle: b.id as any, borderWidth: b.w })}
                    className={`p-2 rounded-lg border text-left text-xs font-medium transition-all ${
                      theme.borderStyle === b.id
                        ? 'border-sky-500 bg-sky-950/30 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Elevation & Shadow Depth
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'flat', label: 'Flat', sub: 'Zero shadow' },
                  { id: 'soft', label: 'Soft Diffuse', sub: 'Gentle ambient' },
                  { id: 'elevated', label: 'Elevated SaaS', sub: 'Deep layered' },
                  { id: 'glow', label: 'Outer Glow', sub: 'Neon neon edge' },
                  { id: 'brutalist', label: 'Brutalist', sub: 'Hard 4px offset' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onChange({ shadowDepth: s.id as any })}
                    className={`p-2 rounded-lg border text-left text-xs font-medium transition-all ${
                      theme.shadowDepth === s.id
                        ? 'border-sky-500 bg-sky-950/30 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-semibold">{s.label}</div>
                    <div className="text-[10px] opacity-70">{s.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BUTTONS */}
        {activeTab === 'buttons' && (
          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Button Shape
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['inherit', 'rounded', 'pill', 'sharp'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => onChange({ buttonShape: s })}
                    className={`py-2 text-xs font-medium rounded-lg border capitalize transition-all ${
                      theme.buttonShape === s
                        ? 'border-sky-500 bg-sky-950/30 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Button Fill Style
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'solid', label: 'Solid Filled' },
                  { id: 'soft', label: 'Soft Tinted' },
                  { id: 'outline', label: 'Clean Outline' },
                  { id: 'glass', label: 'Frosted Glass' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => onChange({ buttonFill: f.id as any })}
                    className={`p-2 text-xs font-medium rounded-lg border text-left transition-all ${
                      theme.buttonFill === f.id
                        ? 'border-sky-500 bg-sky-950/30 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Button Hover Feel
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'subtle', label: 'Subtle Shift' },
                  { id: 'glowing', label: 'Glowing Ring' },
                  { id: 'bouncy', label: 'Spring Scale' },
                  { id: 'snap', label: 'Instant Snap' },
                ].map((h) => (
                  <button
                    key={h.id}
                    onClick={() => onChange({ buttonHover: h.id as any })}
                    className={`p-2 text-xs font-medium rounded-lg border text-left transition-all ${
                      theme.buttonHover === h.id
                        ? 'border-sky-500 bg-sky-950/30 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Danger Action Button
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'solid-red', label: 'Solid Red' },
                  { id: 'outline-red', label: 'Red Outline' },
                  { id: 'text-red', label: 'Red Text' },
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => onChange({ dangerStyle: d.id as any })}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                      theme.dangerStyle === d.id
                        ? 'border-red-500 bg-red-950/30 text-red-300'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CARDS & ALERTS */}
        {activeTab === 'cards' && (
          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Card Presentation
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'flat', label: 'Flat Paper' },
                  { id: 'bordered', label: 'Thin Bordered' },
                  { id: 'shadow', label: 'Soft Shadow' },
                  { id: 'glass', label: 'Frosted Glass' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onChange({ cardStyle: c.id as any })}
                    className={`p-2 text-xs font-medium rounded-lg border text-left transition-all ${
                      theme.cardStyle === c.id
                        ? 'border-sky-500 bg-sky-950/30 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Alert / Banner Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'soft-tint', label: 'Soft Tint' },
                  { id: 'left-bar', label: 'Left Accent' },
                  { id: 'floating-card', label: 'Floating' },
                ].map((a) => (
                  <button
                    key={a.id}
                    onClick={() => onChange({ alertStyle: a.id as any })}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                      theme.alertStyle === a.id
                        ? 'border-sky-500 bg-sky-950/30 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Status Badge Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'pill-dot', label: 'Pill + Dot' },
                  { id: 'solid-chip', label: 'Solid Chip' },
                  { id: 'outline-tag', label: 'Outline Tag' },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => onChange({ badgeStyle: b.id as any })}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                      theme.badgeStyle === b.id
                        ? 'border-sky-500 bg-sky-950/30 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: MOTION */}
        {activeTab === 'motion' && (
          <div className="space-y-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Animation Speed
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'none', label: 'Instant 0ms', sub: 'No animation' },
                  { id: 'snappy', label: 'Snappy 150ms', sub: 'Fast & responsive' },
                  { id: 'smooth', label: 'Smooth 300ms', sub: 'Standard UI' },
                  { id: 'leisurely', label: 'Leisurely 500ms', sub: 'Gentle & calm' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => onChange({ motionSpeed: m.id as any })}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      theme.motionSpeed === m.id
                        ? 'border-sky-500 bg-sky-950/30 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{m.label}</div>
                    <div className="text-[10px] opacity-70">{m.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2 block">
                Easing Curve
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'ease-out', label: 'Ease Out' },
                  { id: 'spring', label: 'Bouncy Spring' },
                  { id: 'linear', label: 'Linear' },
                ].map((e) => (
                  <button
                    key={e.id}
                    onClick={() => onChange({ easing: e.id as any })}
                    className={`py-2 text-xs font-medium rounded-lg border transition-all ${
                      theme.easing === e.id
                        ? 'border-sky-500 bg-sky-950/30 text-white'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
