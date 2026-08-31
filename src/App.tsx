import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { LivePreview } from './components/LivePreview';
import { ExportModal } from './components/ExportModal';
import { SavedTemplatesModal } from './components/SavedTemplatesModal';
import { InteractiveSandboxModal } from './components/InteractiveSandboxModal';
import { ThemeConfig } from './types/theme';
import { PRESET_THEMES } from './data/presets';
import { decodeThemeFromHash } from './utils/urlState';
import { 
  getSavedTemplates, 
  autosaveTheme, 
  getAutosavedTheme, 
  SavedTemplate 
} from './utils/storage';
import { Sliders, Eye, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  // Default to Antigravity preset
  const defaultPreset = PRESET_THEMES.find(p => p.id === 'antigravity') || PRESET_THEMES[0];
  const initialTheme: ThemeConfig = {
    id: defaultPreset.id,
    name: defaultPreset.name,
    ...defaultPreset.theme,
  };

  const [theme, setTheme] = useState<ThemeConfig>(() => {
    // Check URL hash first
    const fromHash = decodeThemeFromHash(window.location.hash);
    if (fromHash) {
      return {
        ...initialTheme,
        ...fromHash,
        security: { ...initialTheme.security, ...(fromHash.security || {}) },
        backend: { ...initialTheme.backend, ...(fromHash.backend || {}) },
      };
    }

    // Check LocalStorage autosave
    const autosaved = getAutosavedTheme();
    if (autosaved) {
      return {
        ...initialTheme,
        ...autosaved,
        security: { ...initialTheme.security, ...(autosaved.security || {}) },
        backend: { ...initialTheme.backend, ...(autosaved.backend || {}) },
      };
    }

    return initialTheme;
  });

  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([]);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isModalPreviewOpen, setIsModalPreviewOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'controls' | 'preview'>('controls');

  // Load saved templates on mount
  useEffect(() => {
    setSavedTemplates(getSavedTemplates());
  }, []);

  // Autosave on theme change
  useEffect(() => {
    autosaveTheme(theme);
  }, [theme]);

  // Handle Preset Selection
  const handleSelectPreset = (presetId: string) => {
    const found = PRESET_THEMES.find(p => p.id === presetId);
    if (found) {
      setTheme({
        id: found.id,
        name: found.name,
        ...found.theme,
      });
    }
  };

  // Handle Theme Property Change
  const handleChangeTheme = (updated: Partial<ThemeConfig>) => {
    setTheme(prev => ({
      ...prev,
      ...updated,
      id: prev.id === 'custom' ? 'custom' : `${prev.id}-modified`,
    }));
  };

  // Toggle Dark Mode
  const handleToggleDarkMode = () => {
    setTheme(prev => {
      const willBeDark = !prev.isDark;
      return {
        ...prev,
        isDark: willBeDark,
        backgroundColor: willBeDark ? '#08090C' : '#FAF8F5',
        surfaceColor: willBeDark ? '#121620' : '#FFFFFF',
        textColor: willBeDark ? '#F8FAFC' : '#141311',
        textMutedColor: willBeDark ? '#94A3B8' : '#78716C',
        borderColor: willBeDark ? '#262D3D' : '#E5E0D8',
      };
    });
  };

  // Vibe Roll: Generate unexpected harmonious style combination
  const handleRandomizeVibe = () => {
    const palettes = [
      { primary: '#EC4899', accent: '#8B5CF6', bg: '#0F0E17', surface: '#1F1B2E', text: '#FFFFFE', dark: true },
      { primary: '#10B981', accent: '#06B6D4', bg: '#061412', surface: '#0E2824', text: '#ECFDF5', dark: true },
      { primary: '#F59E0B', accent: '#EF4444', bg: '#FAF5EE', surface: '#FFFFFF', text: '#1C1917', dark: false },
      { primary: '#6366F1', accent: '#38BDF8', bg: '#0B0F19', surface: '#151C2C', text: '#F8FAFC', dark: true },
      { primary: '#14B8A6', accent: '#F97316', bg: '#F0FDFA', surface: '#FFFFFF', text: '#134E4A', dark: false },
      { primary: '#D946EF', accent: '#06B6D4', bg: '#000000', surface: '#111111', text: '#FFFFFF', dark: true },
    ];
    const chosenPalette = palettes[Math.floor(Math.random() * palettes.length)];
    const radii = [0, 4, 6, 8, 12, 16, 9999];
    const randomRadius = radii[Math.floor(Math.random() * radii.length)];
    const headings = ['sans', 'serif', 'mono', 'display'] as const;
    const randomHeading = headings[Math.floor(Math.random() * headings.length)];

    setTheme(prev => ({
      ...prev,
      id: 'custom',
      name: 'Randomized Vibe',
      isDark: chosenPalette.dark,
      primaryColor: chosenPalette.primary,
      accentColor: chosenPalette.accent,
      backgroundColor: chosenPalette.bg,
      surfaceColor: chosenPalette.surface,
      textColor: chosenPalette.text,
      borderColor: chosenPalette.dark ? '#2E3547' : '#E2E8F0',
      radius: randomRadius,
      headingFont: randomHeading,
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Application Header */}
      <Header
        currentTheme={theme}
        onSelectPreset={handleSelectPreset}
        onRandomizeVibe={handleRandomizeVibe}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenTemplates={() => setIsTemplatesOpen(true)}
        savedTemplatesCount={savedTemplates.length}
        mobileTab={mobileTab}
        onSetMobileTab={setMobileTab}
      />

      {/* Main Responsive Workspace */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Left Controls (Desktop always visible, Mobile shown if mobileTab === 'controls') */}
        <div className={`w-full lg:w-auto ${mobileTab === 'controls' ? 'block' : 'hidden lg:block'}`}>
          <ControlPanel
            theme={theme}
            onChange={handleChangeTheme}
          />
        </div>

        {/* Right Live Preview (Desktop always visible, Mobile shown if mobileTab === 'preview') */}
        <div className={`flex-1 ${mobileTab === 'preview' ? 'block' : 'hidden lg:block'}`}>
          <LivePreview
            theme={theme}
            onOpenModalPreview={() => setIsModalPreviewOpen(true)}
          />
        </div>

        {/* Floating Mobile Switcher Bar (Visible on mobile/tablet screens only) */}
        <div className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 p-1.5 rounded-2xl shadow-2xl">
          <button
            onClick={() => setMobileTab('controls')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mobileTab === 'controls'
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Customize</span>
          </button>

          <button
            onClick={() => setMobileTab('preview')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              mobileTab === 'preview'
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Live Preview</span>
          </button>

          <button
            onClick={() => setIsExportOpen(true)}
            title="Export Prompt"
            className="p-2 rounded-xl bg-neutral-800 text-sky-400 border border-neutral-700"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Export / AI Prompt Modal */}
      <ExportModal
        theme={theme}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Saved Templates Modal */}
      <SavedTemplatesModal
        currentTheme={theme}
        savedTemplates={savedTemplates}
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onLoadTemplate={(loaded) => setTheme(loaded)}
        onUpdateTemplates={(updated) => setSavedTemplates(updated)}
      />

      {/* Interactive Sandbox Test Modal */}
      <InteractiveSandboxModal
        theme={theme}
        isOpen={isModalPreviewOpen}
        onClose={() => setIsModalPreviewOpen(false)}
      />
    </div>
  );
};
export default App;
