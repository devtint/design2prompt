import React, { useState } from 'react';
import { 
  Sparkles, 
  Dices, 
  Share2, 
  FolderHeart, 
  Check, 
  Moon, 
  Sun,
  Layers,
  ChevronDown,
  Menu,
  X,
  Smartphone,
  Sliders,
  Eye
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
  mobileTab: 'controls' | 'preview';
  onSetMobileTab: (tab: 'controls' | 'preview') => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTheme,
  onSelectPreset,
  onRandomizeVibe,
  onToggleDarkMode,
  onOpenExport,
  onOpenTemplates,
  savedTemplatesCount,
  mobileTab,
  onSetMobileTab,
}) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [presetDropdownOpen, setPresetDropdownOpen] = useState(false);

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
  const activePreset = PRESET_THEMES.find(p => p.id === currentTheme.id);

  return (
    <header className="border-b border-neutral-800/80 bg-neutral-950/95 backdrop-blur-xl sticky top-0 z-40 px-3 sm:px-5 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Brand + Active Preset Pill */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500 p-[1px] shadow-lg shadow-sky-500/20">
            <div className="w-full h-full bg-neutral-950 rounded-[11px] flex items-center justify-center">
              <Layers className="w-4 h-4 text-sky-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-extrabold tracking-tight text-white">
                Design<span className="text-sky-400">2</span>Prompt
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20 px-1.5 py-0.2 rounded-full hidden sm:inline-block">
                v1.0
              </span>
            </div>
          </div>
        </div>

        {/* Center: Preset Selector Popover / Dropdown */}
        <div className="relative flex-1 max-w-xs sm:max-w-sm hidden md:block">
          <button
            onClick={() => setPresetDropdownOpen(!presetDropdownOpen)}
            className="w-full flex items-center justify-between gap-2 bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 px-3 py-1.5 rounded-xl text-xs text-neutral-200 transition-all shadow-sm"
          >
            <div className="flex items-center gap-2 truncate">
              {/* Swatch indicator */}
              <span 
                className="w-3 h-3 rounded-full shrink-0 shadow-sm border border-white/20"
                style={{ backgroundColor: currentTheme.primaryColor }}
              />
              <span className="font-semibold truncate text-white">
                {activePreset ? activePreset.name : currentTheme.name || 'Custom Theme'}
              </span>
              {activePreset && (
                <span className="text-[10px] text-neutral-400 truncate hidden lg:inline">
                  — {activePreset.tagline}
                </span>
              )}
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${presetDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Preset Picker Dropdown */}
          {presetDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setPresetDropdownOpen(false)} 
              />
              <div className="absolute top-full mt-2 left-0 w-80 sm:w-96 max-h-[75vh] overflow-y-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-2 z-50 divide-y divide-neutral-800/60">
                <div className="pb-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-1.5">
                    ⚡ Frontier AI & Tech Signatures
                  </div>
                  <div className="space-y-1">
                    {frontierPresets.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectPreset(p.id);
                          setPresetDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                          currentTheme.id === p.id 
                            ? 'bg-sky-500/15 border border-sky-500/30 text-white' 
                            : 'hover:bg-neutral-800/70 text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <div className="flex items-center -space-x-1 shrink-0">
                            <span className="w-3.5 h-3.5 rounded-full border border-neutral-900 shadow-sm" style={{ backgroundColor: p.theme.primaryColor }} />
                            <span className="w-3.5 h-3.5 rounded-full border border-neutral-900 shadow-sm" style={{ backgroundColor: p.theme.accentColor }} />
                            <span className="w-3.5 h-3.5 rounded-full border border-neutral-900 shadow-sm" style={{ backgroundColor: p.theme.backgroundColor }} />
                          </div>
                          <div className="truncate">
                            <div className="text-xs font-semibold text-white">{p.name}</div>
                            <div className="text-[10px] text-neutral-400 truncate">{p.tagline}</div>
                          </div>
                        </div>
                        {currentTheme.id === p.id && <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-1.5">
                    🎨 Lifestyle & Product Aesthetics
                  </div>
                  <div className="space-y-1">
                    {lifestylePresets.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectPreset(p.id);
                          setPresetDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                          currentTheme.id === p.id 
                            ? 'bg-sky-500/15 border border-sky-500/30 text-white' 
                            : 'hover:bg-neutral-800/70 text-neutral-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <div className="flex items-center -space-x-1 shrink-0">
                            <span className="w-3.5 h-3.5 rounded-full border border-neutral-900 shadow-sm" style={{ backgroundColor: p.theme.primaryColor }} />
                            <span className="w-3.5 h-3.5 rounded-full border border-neutral-900 shadow-sm" style={{ backgroundColor: p.theme.accentColor }} />
                            <span className="w-3.5 h-3.5 rounded-full border border-neutral-900 shadow-sm" style={{ backgroundColor: p.theme.backgroundColor }} />
                          </div>
                          <div className="truncate">
                            <div className="text-xs font-semibold text-white">{p.name}</div>
                            <div className="text-[10px] text-neutral-400 truncate">{p.tagline}</div>
                          </div>
                        </div>
                        {currentTheme.id === p.id && <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Mobile View Toggle Switcher (Controls vs Live Preview) */}
        <div className="flex lg:hidden items-center bg-neutral-900 p-0.5 rounded-xl border border-neutral-800">
          <button
            onClick={() => onSetMobileTab('controls')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mobileTab === 'controls'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>
          <button
            onClick={() => onSetMobileTab('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              mobileTab === 'preview'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>

        {/* Right Action Icons (Desktop) */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={onRandomizeVibe}
            title="Randomize Theme (Vibe Roll)"
            className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
          >
            <Dices className="w-3.5 h-3.5 text-amber-400" />
            <span>Vibe Roll</span>
          </button>

          <button
            onClick={onToggleDarkMode}
            title={currentTheme.isDark ? "Switch to Light Canvas" : "Switch to Dark Canvas"}
            className="p-2 rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
          >
            {currentTheme.isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-sky-400" />}
          </button>

          <button
            onClick={onOpenTemplates}
            title="Saved Templates"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
          >
            <FolderHeart className="w-3.5 h-3.5 text-rose-400" />
            <span>Saved</span>
            {savedTemplatesCount > 0 && (
              <span className="bg-rose-500/20 text-rose-300 text-[10px] px-1.5 rounded-full font-mono">
                {savedTemplatesCount}
              </span>
            )}
          </button>

          <button
            onClick={handleShare}
            title="Copy shareable link"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-medium transition-colors"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-neutral-400" />
                <span>Share</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenExport}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white text-xs font-bold shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Export Prompt</span>
          </button>
        </div>

        {/* Mobile Quick Action Dropdown Menu */}
        <div className="flex lg:hidden items-center gap-1">
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-xs font-bold shadow-md shadow-sky-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-300"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-neutral-800/80 space-y-3 pb-2 animate-fade-in">
          {/* Preset Selector for mobile */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 block">
              Active Preset
            </label>
            <select
              value={currentTheme.id}
              onChange={(e) => {
                onSelectPreset(e.target.value);
                setMobileMenuOpen(false);
              }}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white"
            >
              <optgroup label="⚡ Frontier AI & Tech">
                {frontierPresets.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="🎨 Lifestyle & Product">
                {lifestylePresets.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                onRandomizeVibe();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 p-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-200"
            >
              <Dices className="w-3.5 h-3.5 text-amber-400" />
              <span>Vibe Roll</span>
            </button>

            <button
              onClick={() => {
                onToggleDarkMode();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 p-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-200"
            >
              {currentTheme.isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-sky-400" />}
              <span>{currentTheme.isDark ? 'Light' : 'Dark'}</span>
            </button>

            <button
              onClick={() => {
                handleShare();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 p-2 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-neutral-200"
            >
              <Share2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Share</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
