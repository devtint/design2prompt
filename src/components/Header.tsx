import React, { useState } from 'react';
import { 
  Sparkles, 
  Dices, 
  Share2, 
  FolderHeart, 
  Check, 
  Moon, 
  Sun,
  Layers
} from 'lucide-react';
import { ThemeConfig } from '../types/theme';
import { PRESET_THEMES } from '../data/presets';
import { encodeThemeToHash } from '../utils/urlState';

interface HeaderProps {
  currentTheme: ThemeConfig;
  onSelectPreset: (presetId: string) => void;
  onRandomizeVibe: () => void;
  onToggleDarkMode: () => void;
  onOpenExport: () => void;
  onOpenTemplates: () => void;
  savedTemplatesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTheme,
  onSelectPreset,
  onRandomizeVibe,
  onToggleDarkMode,
  onOpenExport,
  onOpenTemplates,
  savedTemplatesCount,
}) => {
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    const hash = encodeThemeToHash(currentTheme);
    const fullUrl = `${window.location.origin}${window.location.pathname}${hash}`;
    navigator.clipboard.writeText(fullUrl);
    window.location.hash = hash;
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const frontierPresets = PRESET_THEMES.filter(p => p.category === 'Frontier AI & Tech');
  const lifestylePresets = PRESET_THEMES.filter(p => p.category === 'Lifestyle & Product');

  return (
    <header className="border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md sticky top-0 z-40 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 via-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
          <Layers className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
              Design<span className="text-sky-400">2</span>Prompt
            </h1>
            <span className="text-[10px] uppercase font-semibold tracking-wider bg-neutral-800 text-sky-400 px-1.5 py-0.5 rounded border border-neutral-700">
              v1.0
            </span>
          </div>
          <p className="text-[11px] text-neutral-400 hidden sm:block">
            Visual Theme & AI Prompt Generator
          </p>
        </div>
      </div>

      {/* Center Controls: Preset Selector & Vibe Roll */}
      <div className="flex items-center gap-2 flex-1 max-w-md justify-center">
        <div className="relative w-full max-w-xs">
          <select
            value={currentTheme.id}
            onChange={(e) => onSelectPreset(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 hover:border-neutral-600 rounded-lg px-3 py-1.5 text-xs text-neutral-200 focus:outline-none focus:ring-2 focus:ring-sky-500/40 cursor-pointer appearance-none pr-8"
          >
            <optgroup label="⚡ Frontier AI & Tech">
              {frontierPresets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.tagline}
                </option>
              ))}
            </optgroup>
            <optgroup label="🎨 Lifestyle & Product">
              {lifestylePresets.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.tagline}
                </option>
              ))}
            </optgroup>
            {currentTheme.id === 'custom' && (
              <option value="custom">✏️ Custom Theme</option>
            )}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-neutral-400">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        <button
          onClick={onRandomizeVibe}
          title="Vibe Roll: Generate unexpected harmonious style combination"
          className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 hover:border-neutral-600 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0"
        >
          <Dices className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden md:inline">Vibe Roll</span>
        </button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleDarkMode}
          title={currentTheme.isDark ? "Switch to Light Canvas" : "Switch to Dark Canvas"}
          className="p-1.5 rounded-lg border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 transition-colors"
        >
          {currentTheme.isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-400" />}
        </button>

        <button
          onClick={onOpenTemplates}
          title="Saved Templates in Browser Storage"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-medium transition-colors"
        >
          <FolderHeart className="w-3.5 h-3.5 text-rose-400" />
          <span className="hidden lg:inline">Templates</span>
          {savedTemplatesCount > 0 && (
            <span className="bg-neutral-800 text-neutral-400 text-[10px] px-1.5 py-0.2 rounded-full border border-neutral-700">
              {savedTemplatesCount}
            </span>
          )}
        </button>

        <button
          onClick={handleShare}
          title="Copy shareable link with zero-backend URL hash"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-medium transition-colors"
        >
          {copiedShare ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-neutral-400" />
              <span className="hidden sm:inline">Share</span>
            </>
          )}
        </button>

        <button
          onClick={onOpenExport}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold shadow-md shadow-sky-500/25 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Export Prompt</span>
        </button>
      </div>
    </header>
  );
};
