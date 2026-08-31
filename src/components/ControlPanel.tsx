import React, { useState } from 'react';
import { 
  Palette, 
  Type, 
  Square, 
  MousePointerClick, 
  LayoutTemplate, 
  Activity, 
  CheckCircle2,
  AlertTriangle,
  Wand2,
  ShieldCheck,
  Database,
  Gauge,
  Lock,
  Server,
  Cloud,
  Cpu,
  KeyRound
} from 'lucide-react';
import { ThemeConfig, SecurityConfig, BackendConfig } from '../types/theme';
import { getContrastRatio, getWcagRating, autoFixContrast } from '../utils/colorContrast';

interface ControlPanelProps {
  theme: ThemeConfig;
  onChange: (updated: Partial<ThemeConfig>) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ theme, onChange }) => {
  const [activeTab, setActiveTab] = useState<
    'foundation' | 'typography' | 'shape' | 'buttons' | 'cards' | 'motion' | 'security' | 'backend' | 'ratelimit'
  >('foundation');

  // Contrast ratio
  const contrastRatio = getContrastRatio(theme.textColor, theme.backgroundColor);
  const wcag = getWcagRating(contrastRatio);

  const handleFixContrast = () => {
    const fixedColor = autoFixContrast(theme.textColor, theme.backgroundColor);
    onChange({ textColor: fixedColor });
  };

  const updateSecurity = (updated: Partial<SecurityConfig>) => {
    onChange({
      security: {
        ...theme.security,
        ...updated,
      },
    });
  };

  const updateBackend = (updated: Partial<BackendConfig>) => {
    onChange({
      backend: {
        ...theme.backend,
        ...updated,
      },
    });
  };

  const curatedPalettes = [
    { label: 'Obsidian Cyan', primary: '#38BDF8', accent: '#818CF8', bg: '#08090C', surface: '#121620', text: '#F8FAFC' },
    { label: 'Claude Sand', primary: '#C15F3D', accent: '#D97706', bg: '#FAF8F5', surface: '#F3EFEA', text: '#141311' },
    { label: 'Emerald Code', primary: '#10A37F', accent: '#059669', bg: '#18181B', surface: '#27272A', text: '#FAFAFA' },
    { label: 'Linear Violet', primary: '#5E6AD2', accent: '#818CF8', bg: '#090A0F', surface: '#151720', text: '#F1F5F9' },
    { label: 'Mineral Teal', primary: '#20B2AA', accent: '#2DD4BF', bg: '#0D1517', surface: '#162327', text: '#E2E8F0' },
    { label: 'Acid Neon', primary: '#3ECF8E', accent: '#00E699', bg: '#171717', surface: '#1F1F1F', text: '#EDEDED' },
    { label: 'Nordic Sage', primary: '#5C715E', accent: '#C88267', bg: '#F4F1EA', surface: '#EBE7DE', text: '#2D3748' },
    { label: 'Sunset Amber', primary: '#F59E0B', accent: '#EF4444', bg: '#0F172A', surface: '#1E293B', text: '#F8FAFC' },
  ];

  const tabs = [
    { id: 'foundation', label: 'Color & Base', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'shape', label: 'Shape & Radius', icon: Square },
    { id: 'buttons', label: 'Buttons', icon: MousePointerClick },
    { id: 'cards', label: 'Cards & Alerts', icon: LayoutTemplate },
    { id: 'security', label: 'Security & Auth', icon: ShieldCheck },
    { id: 'backend', label: 'DB & Backend', icon: Database },
    { id: 'ratelimit', label: 'Rate Limiting', icon: Gauge },
    { id: 'motion', label: 'Motion', icon: Activity },
  ] as const;

  const sec = theme.security;
  const be = theme.backend;

  return (
    <aside className="w-full lg:w-96 xl:w-[420px] border-r border-neutral-800/80 bg-neutral-950 flex flex-col h-full lg:h-[calc(100vh-53px)] shrink-0 select-none">
      
      {/* Category Horizontal Navigation */}
      <div className="flex overflow-x-auto p-2 gap-1.5 border-b border-neutral-800/80 bg-neutral-900/40 scrollbar-none shrink-0">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === id
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700/80'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${activeTab === id ? 'text-sky-400' : ''}`} />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Main Settings Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 text-neutral-200">
        
        {/* ========================================================================= */}
        {/* TAB 1: FOUNDATION */}
        {/* ========================================================================= */}
        {activeTab === 'foundation' && (
          <div className="space-y-6 animate-fade-in">
            {/* Quick Palettes */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center justify-between">
                <span>Curated Color Harmonies</span>
                <span className="text-[10px] text-neutral-500 font-normal">Click to apply</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {curatedPalettes.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => onChange({
                      primaryColor: p.primary,
                      accentColor: p.accent,
                      backgroundColor: p.bg,
                      surfaceColor: p.surface,
                      textColor: p.text,
                    })}
                    className="p-2.5 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 hover:bg-neutral-850 transition-all text-left flex items-center justify-between group overflow-hidden"
                  >
                    <span className="text-xs font-medium text-neutral-300 group-hover:text-white truncate mr-2">
                      {p.label}
                    </span>
                    <div className="flex items-center -space-x-1 shrink-0">
                      <span className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm" style={{ backgroundColor: p.primary }} />
                      <span className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm" style={{ backgroundColor: p.accent }} />
                      <span className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm" style={{ backgroundColor: p.bg }} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color Pickers */}
            <div className="space-y-3.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Custom Palette Finetuning
              </label>

              {/* Primary Color */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-800 bg-neutral-900/60">
                <div>
                  <div className="text-xs font-semibold text-white">Primary Brand</div>
                  <div className="text-[10px] text-neutral-400 font-mono">{theme.primaryColor}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.primaryColor}
                    onChange={(e) => onChange({ primaryColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-neutral-700 bg-transparent p-0"
                  />
                </div>
              </div>

              {/* Accent Color */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-800 bg-neutral-900/60">
                <div>
                  <div className="text-xs font-semibold text-white">Secondary Accent</div>
                  <div className="text-[10px] text-neutral-400 font-mono">{theme.accentColor}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.accentColor}
                    onChange={(e) => onChange({ accentColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-neutral-700 bg-transparent p-0"
                  />
                </div>
              </div>

              {/* Canvas Background */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-800 bg-neutral-900/60">
                <div>
                  <div className="text-xs font-semibold text-white">Canvas Background</div>
                  <div className="text-[10px] text-neutral-400 font-mono">{theme.backgroundColor}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.backgroundColor}
                    onChange={(e) => onChange({ backgroundColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-neutral-700 bg-transparent p-0"
                  />
                </div>
              </div>

              {/* Card Surface */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-800 bg-neutral-900/60">
                <div>
                  <div className="text-xs font-semibold text-white">Card & Surface Tone</div>
                  <div className="text-[10px] text-neutral-400 font-mono">{theme.surfaceColor}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.surfaceColor}
                    onChange={(e) => onChange({ surfaceColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-neutral-700 bg-transparent p-0"
                  />
                </div>
              </div>

              {/* Text Foreground */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-800 bg-neutral-900/60">
                <div>
                  <div className="text-xs font-semibold text-white">Text Foreground</div>
                  <div className="text-[10px] text-neutral-400 font-mono">{theme.textColor}</div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={theme.textColor}
                    onChange={(e) => onChange({ textColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-neutral-700 bg-transparent p-0"
                  />
                </div>
              </div>
            </div>

            {/* Contrast Widget */}
            <div className={`p-3.5 rounded-xl border transition-all ${
              wcag.aa 
                ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-300' 
                : 'bg-amber-950/30 border-amber-800/60 text-amber-300'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  {wcag.aa ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" />}
                  <span className="text-xs font-bold">{wcag.label} ({contrastRatio.toFixed(2)}:1)</span>
                </div>
                {!wcag.aa && (
                  <button
                    onClick={handleFixContrast}
                    className="flex items-center gap-1 px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-black font-bold rounded-lg text-[10px] shadow-sm transition-colors"
                  >
                    <Wand2 className="w-3 h-3" />
                    <span>Auto-Fix</span>
                  </button>
                )}
              </div>
              <p className="text-[11px] opacity-80 leading-snug">
                {wcag.aa 
                  ? 'Great accessibility score. Text is legible against the canvas.' 
                  : 'Text contrast is low under WCAG standards. Tap Auto-Fix to calculate the closest passing tone.'}
              </p>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: TYPOGRAPHY */}
        {/* ========================================================================= */}
        {activeTab === 'typography' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5 block">
                Heading Font Specimen
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'sans', label: 'Modern Sans', specimen: 'Aa Bb 123', sub: 'Inter / Geist' },
                  { id: 'serif', label: 'Editorial Serif', specimen: 'Aa Bb 123', sub: 'Instrument Serif' },
                  { id: 'mono', label: 'Technical Mono', specimen: 'Aa Bb 123', sub: 'JetBrains Mono' },
                  { id: 'display', label: 'Space Grotesk', specimen: 'Aa Bb 123', sub: 'Chunky Display' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onChange({ headingFont: item.id as any })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      theme.headingFont === item.id
                        ? 'border-sky-500 bg-sky-500/10 text-white shadow-sm ring-1 ring-sky-500/30'
                        : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 text-neutral-400'
                    }`}
                  >
                    <div className="text-base font-bold text-white mb-1">{item.specimen}</div>
                    <div className="text-xs font-semibold text-neutral-200">{item.label}</div>
                    <div className="text-[10px] text-neutral-500">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5 block">
                Body Font Personality
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'modern', label: 'Modern Sans', sub: 'Clean, neutral readability' },
                  { id: 'humanist', label: 'Humanist Curves', sub: 'Warm, approachable feel' },
                  { id: 'editorial', label: 'Editorial Book', sub: 'Literary long-form reading' },
                  { id: 'technical', label: 'Fixed Monospace', sub: 'Data & engineering focused' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onChange({ bodyFont: item.id as any })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      theme.bodyFont === item.id
                        ? 'border-sky-500 bg-sky-500/10 text-white shadow-sm ring-1 ring-sky-500/30'
                        : 'border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 text-neutral-400'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white mb-0.5">{item.label}</div>
                    <div className="text-[10px] text-neutral-400 leading-snug">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                <span>Reading Density</span>
                <span className="text-sky-400 font-mono capitalize">{theme.textDensity}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['compact', 'normal', 'airy'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => onChange({ textDensity: d })}
                    className={`py-2 text-xs font-semibold rounded-xl border capitalize transition-all ${
                      theme.textDensity === d
                        ? 'border-sky-500 bg-sky-500/15 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SHAPE & RADIUS */}
        {/* ========================================================================= */}
        {activeTab === 'shape' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2">
                <span>Corner Curvature</span>
                <span className="text-sky-400 font-mono">{theme.radius === 9999 ? 'Pill (Full)' : `${theme.radius}px`}</span>
              </div>

              <div className="grid grid-cols-5 gap-1 sm:gap-1.5 mb-3">
                {[
                  { r: 0, label: '0px', shape: 'rounded-none' },
                  { r: 6, label: '6px', shape: 'rounded-md' },
                  { r: 10, label: '10px', shape: 'rounded-lg' },
                  { r: 16, label: '16px', shape: 'rounded-2xl' },
                  { r: 9999, label: 'Pill', shape: 'rounded-full' },
                ].map((item) => (
                  <button
                    key={item.r}
                    onClick={() => onChange({ radius: item.r })}
                    className={`p-1.5 sm:p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1 sm:gap-1.5 min-w-0 ${
                      theme.radius === item.r
                        ? 'border-sky-500 bg-sky-500/15 text-white ring-1 ring-sky-500/30'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className={`w-4 h-4 sm:w-5 sm:h-5 border-2 border-current ${item.shape}`} />
                    <span className="text-[9px] sm:text-[10px] font-mono truncate">{item.label}</span>
                  </button>
                ))}
              </div>

              <input
                type="range"
                min="0"
                max="24"
                step="2"
                value={theme.radius > 24 ? 24 : theme.radius}
                onChange={(e) => onChange({ radius: Number(e.target.value) })}
                className="w-full accent-sky-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5 block">
                Borders & Frame Outline
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'hairline', label: 'Hairline 1px', w: 1, sub: 'Micro-refined SaaS' },
                  { id: 'solid', label: 'Solid 1px', w: 1, sub: 'Crisp structural' },
                  { id: 'brutalist', label: 'Brutalist 3px', w: 3, sub: 'Heavy bold pop' },
                  { id: 'none', label: 'None 0px', w: 0, sub: 'Border-free clean' },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => onChange({ borderStyle: b.id as any, borderWidth: b.w })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      theme.borderStyle === b.id
                        ? 'border-sky-500 bg-sky-500/15 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{b.label}</div>
                    <div className="text-[10px] text-neutral-400">{b.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5 block">
                Elevation & Shadow
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'flat', label: 'Flat', sub: 'Modern 0px' },
                  { id: 'soft', label: 'Soft Diffuse', sub: 'Gentle ambient' },
                  { id: 'elevated', label: 'Elevated SaaS', sub: 'Layered depth' },
                  { id: 'glow', label: 'Cosmic Glow', sub: 'Brand light ring' },
                  { id: 'brutalist', label: 'Brutalist', sub: 'Hard 4px block' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => onChange({ shadowDepth: s.id as any })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      theme.shadowDepth === s.id
                        ? 'border-sky-500 bg-sky-500/15 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{s.label}</div>
                    <div className="text-[10px] text-neutral-400">{s.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: BUTTONS */}
        {/* ========================================================================= */}
        {activeTab === 'buttons' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 block">
                Button Shape
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['inherit', 'rounded', 'pill', 'sharp'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => onChange({ buttonShape: s })}
                    className={`py-2.5 text-xs font-semibold rounded-xl border capitalize transition-all ${
                      theme.buttonShape === s
                        ? 'border-sky-500 bg-sky-500/15 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 block">
                Button Fill
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'solid', label: 'Solid Color' },
                  { id: 'soft', label: 'Soft Tint' },
                  { id: 'outline', label: 'Ghost Outline' },
                  { id: 'glass', label: 'Glass Blur' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => onChange({ buttonFill: f.id as any })}
                    className={`p-2.5 text-xs font-semibold rounded-xl border text-left transition-all ${
                      theme.buttonFill === f.id
                        ? 'border-sky-500 bg-sky-500/15 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: CARDS & ALERTS */}
        {/* ========================================================================= */}
        {activeTab === 'cards' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 block">
                Card Presentation
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'flat', label: 'Flat Canvas' },
                  { id: 'bordered', label: 'Bordered' },
                  { id: 'shadow', label: 'Floating Shadow' },
                  { id: 'glass', label: 'Frosted Glass' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onChange({ cardStyle: c.id as any })}
                    className={`p-2.5 text-xs font-semibold rounded-xl border text-left transition-all ${
                      theme.cardStyle === c.id
                        ? 'border-sky-500 bg-sky-500/15 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 block">
                Alert Banner Style
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
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      theme.alertStyle === a.id
                        ? 'border-sky-500 bg-sky-500/15 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: SECURITY & HARDENING (NEW!) */}
        {/* ========================================================================= */}
        {activeTab === 'security' && (
          <div className="space-y-6 animate-fade-in">
            {/* Auth Strategy */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-sky-400" />
                <span>Authentication Strategy</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'session-cookies', label: 'HTTP-Only Cookies', sub: 'Most secure, CSRF protected' },
                  { id: 'oauth-jwt', label: 'OAuth 2.0 + JWT', sub: 'Stateless bearer tokens' },
                  { id: 'passkeys', label: 'Passkeys / WebAuthn', sub: 'Biometric passwordless' },
                  { id: 'supabase-auth', label: 'Supabase Auth', sub: 'Built-in row-level security' },
                  { id: 'clerk-auth', label: 'Clerk Platform', sub: 'Managed user management' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateSecurity({ authStrategy: item.id as any })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      sec.authStrategy === item.id
                        ? 'border-sky-500 bg-sky-500/15 text-white ring-1 ring-sky-500/30'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{item.label}</div>
                    <div className="text-[10px] text-neutral-400">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Validation */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Input Validation Schema</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'zod', label: 'Zod (Recommended)' },
                  { id: 'valibot', label: 'Valibot (Ultra-Light)' },
                  { id: 'typebox', label: 'TypeBox' },
                ].map((v) => (
                  <button
                    key={v.id}
                    onClick={() => updateSecurity({ inputValidation: v.id as any })}
                    className={`p-2.5 text-xs font-semibold rounded-xl border text-center transition-all ${
                      sec.inputValidation === v.id
                        ? 'border-emerald-500 bg-emerald-500/15 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Security Policy */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 block">
                Content Security Policy (CSP)
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'strict', label: 'Strict Nonce' },
                  { id: 'standard', label: 'Standard CSP' },
                  { id: 'relaxed', label: 'Relaxed' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => updateSecurity({ contentSecurityPolicy: c.id as any })}
                    className={`py-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                      sec.contentSecurityPolicy === c.id
                        ? 'border-sky-500 bg-sky-500/15 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* HTTP Security Headers Toggles */}
            <div className="space-y-2.5 pt-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                HTTP Security Headers & Protection
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-neutral-800 bg-neutral-900/60 cursor-pointer">
                <div>
                  <div className="text-xs font-semibold text-white">Strict-Transport-Security (HSTS)</div>
                  <div className="text-[10px] text-neutral-400">Enforces HTTPS with preload directive</div>
                </div>
                <input
                  type="checkbox"
                  checked={sec.headers.hsts}
                  onChange={(e) => updateSecurity({ headers: { ...sec.headers, hsts: e.target.checked } })}
                  className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-neutral-800 bg-neutral-900/60 cursor-pointer">
                <div>
                  <div className="text-xs font-semibold text-white">CSRF Defense Tokens</div>
                  <div className="text-[10px] text-neutral-400">Verifies origin & SameSite tokens on mutations</div>
                </div>
                <input
                  type="checkbox"
                  checked={sec.csrfProtection}
                  onChange={(e) => updateSecurity({ csrfProtection: e.target.checked })}
                  className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border border-neutral-800 bg-neutral-900/60 cursor-pointer">
                <div>
                  <div className="text-xs font-semibold text-white">Clickjacking Defense</div>
                  <div className="text-[10px] text-neutral-400">X-Frame-Options: {sec.headers.frameOptions}</div>
                </div>
                <select
                  value={sec.headers.frameOptions}
                  onChange={(e) => updateSecurity({ headers: { ...sec.headers, frameOptions: e.target.value as any } })}
                  className="bg-neutral-800 text-xs border border-neutral-700 rounded-lg px-2 py-1 text-white"
                >
                  <option value="DENY">DENY (Block all frames)</option>
                  <option value="SAMEORIGIN">SAMEORIGIN</option>
                </select>
              </label>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: DATABASE & BACKEND (NEW!) */}
        {/* ========================================================================= */}
        {activeTab === 'backend' && (
          <div className="space-y-6 animate-fade-in">
            {/* Database Engine */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-indigo-400" />
                <span>Database Engine</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  { id: 'postgresql-neon', label: 'Neon Serverless Postgres', sub: 'Branching & pooling' },
                  { id: 'supabase', label: 'Supabase Postgres', sub: 'Postgres + Auth + Storage' },
                  { id: 'planetscale-mysql', label: 'PlanetScale MySQL', sub: 'Global scale MySQL' },
                  { id: 'turso-sqlite', label: 'Turso (libSQL/SQLite)', sub: 'Ultra-fast Edge SQLite' },
                  { id: 'mongodb', label: 'MongoDB Atlas', sub: 'Flexible document store' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateBackend({ database: item.id as any })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      be.database === item.id
                        ? 'border-indigo-500 bg-indigo-500/15 text-white ring-1 ring-indigo-500/30'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{item.label}</div>
                    <div className="text-[10px] text-neutral-400">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* ORM & Data Layer */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 block">
                ORM / Query Builder
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'drizzle', label: 'Drizzle ORM', sub: 'Zero overhead, type-safe' },
                  { id: 'prisma', label: 'Prisma ORM', sub: 'Schema-first ecosystem' },
                  { id: 'kysely', label: 'Kysely', sub: 'Type-safe SQL builder' },
                  { id: 'raw-sql', label: 'Parameterized SQL', sub: 'Manual query control' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateBackend({ orm: item.id as any })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      be.orm === item.id
                        ? 'border-sky-500 bg-sky-500/15 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{item.label}</div>
                    <div className="text-[10px] text-neutral-400">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Backend Runtime & API */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                <span>Backend Runtime & API Architecture</span>
              </label>
              <div className="grid grid-cols-2 gap-2 mb-2">
                {[
                  { id: 'nodejs', label: 'Node.js LTS' },
                  { id: 'bun', label: 'Bun Runtime' },
                  { id: 'edge', label: 'Edge Worker (V8)' },
                  { id: 'python-fastapi', label: 'Python (FastAPI)' },
                  { id: 'go', label: 'Go (Golang)' },
                ].map((r) => (
                  <button
                    key={r.id}
                    onClick={() => updateBackend({ runtime: r.id as any })}
                    className={`p-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                      be.runtime === r.id
                        ? 'border-sky-500 bg-sky-500/15 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'rest', label: 'REST API' },
                  { id: 'trpc', label: 'tRPC' },
                  { id: 'server-actions', label: 'Actions' },
                  { id: 'graphql', label: 'GraphQL' },
                ].map((a) => (
                  <button
                    key={a.id}
                    onClick={() => updateBackend({ apiStyle: a.id as any })}
                    className={`py-1.5 text-[11px] font-mono rounded-lg border text-center transition-all ${
                      be.apiStyle === a.id
                        ? 'border-sky-500 bg-sky-500/20 text-white font-bold'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hosting Platform */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                <Cloud className="w-3.5 h-3.5 text-amber-400" />
                <span>Hosting & Deployment Platform</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'vercel', label: 'Vercel' },
                  { id: 'cloudflare-pages', label: 'Cloudflare' },
                  { id: 'railway', label: 'Railway' },
                  { id: 'fly-io', label: 'Fly.io' },
                  { id: 'aws', label: 'AWS' },
                  { id: 'docker', label: 'Docker' },
                ].map((h) => (
                  <button
                    key={h.id}
                    onClick={() => updateBackend({ hosting: h.id as any })}
                    className={`py-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                      be.hosting === h.id
                        ? 'border-amber-500 bg-amber-500/15 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 8: RATE LIMITING & ABUSE (NEW!) */}
        {/* ========================================================================= */}
        {activeTab === 'ratelimit' && (
          <div className="space-y-6 animate-fade-in">
            {/* Enable Toggle */}
            <label className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-800 bg-neutral-900/60 cursor-pointer">
              <div>
                <div className="text-xs font-bold text-white">Enable API Rate Limiting</div>
                <div className="text-[10px] text-neutral-400">Protects against DDoS, brute-force & credential stuffing</div>
              </div>
              <input
                type="checkbox"
                checked={sec.rateLimiting.enabled}
                onChange={(e) => updateSecurity({
                  rateLimiting: { ...sec.rateLimiting, enabled: e.target.checked },
                })}
                className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
              />
            </label>

            {/* Provider */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 block">
                Rate Limiter Provider
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'upstash-redis', label: 'Upstash Redis', sub: 'Serverless Edge' },
                  { id: 'cloudflare-workers', label: 'Cloudflare', sub: 'Edge network' },
                  { id: 'in-memory', label: 'In-Memory', sub: 'Single instance' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateSecurity({
                      rateLimiting: { ...sec.rateLimiting, provider: item.id as any },
                    })}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      sec.rateLimiting.provider === item.id
                        ? 'border-sky-500 bg-sky-500/15 text-white ring-1 ring-sky-500/30'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{item.label}</div>
                    <div className="text-[10px] text-neutral-400">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders: Max Requests & Window */}
            <div className="space-y-4 p-4 border border-neutral-800 rounded-xl bg-neutral-900/40">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-neutral-300">Max Requests Allowed</span>
                  <span className="text-sky-400 font-mono">{sec.rateLimiting.maxRequestsPerWindow} req</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="10"
                  value={sec.rateLimiting.maxRequestsPerWindow}
                  onChange={(e) => updateSecurity({
                    rateLimiting: { ...sec.rateLimiting, maxRequestsPerWindow: Number(e.target.value) },
                  })}
                  className="w-full accent-sky-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-neutral-300">Time Window (Seconds)</span>
                  <span className="text-sky-400 font-mono">{sec.rateLimiting.windowSeconds}s</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="10"
                  value={sec.rateLimiting.windowSeconds}
                  onChange={(e) => updateSecurity({
                    rateLimiting: { ...sec.rateLimiting, windowSeconds: Number(e.target.value) },
                  })}
                  className="w-full accent-sky-500 h-2 bg-neutral-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Scope */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 block">
                Limiter Scope
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'ip-and-user', label: 'IP + User ID' },
                  { id: 'ip-only', label: 'IP Address' },
                  { id: 'route-specific', label: 'Per Route' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => updateSecurity({
                      rateLimiting: { ...sec.rateLimiting, scope: s.id as any },
                    })}
                    className={`py-2 text-xs font-semibold rounded-xl border text-center transition-all ${
                      sec.rateLimiting.scope === s.id
                        ? 'border-sky-500 bg-sky-500/15 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 9: MOTION */}
        {/* ========================================================================= */}
        {activeTab === 'motion' && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-2 block">
                Animation Speed
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'none', label: 'Instant 0ms', sub: 'Accessibility / No motion' },
                  { id: 'snappy', label: 'Snappy 150ms', sub: 'Developer & agentic feel' },
                  { id: 'smooth', label: 'Smooth 300ms', sub: 'Standard consumer UI' },
                  { id: 'leisurely', label: 'Leisurely 500ms', sub: 'Deliberate luxury' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => onChange({ motionSpeed: m.id as any })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      theme.motionSpeed === m.id
                        ? 'border-sky-500 bg-sky-500/15 text-white'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-semibold text-white">{m.label}</div>
                    <div className="text-[10px] text-neutral-400">{m.sub}</div>
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
