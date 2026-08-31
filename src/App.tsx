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
    if (fromHash) return fromHash;

    // Check LocalStorage autosave
    const autosaved = getAutosavedTheme();
    if (autosaved) return autosaved;

    return initialTheme;
  });

  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([]);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isModalPreviewOpen, setIsModalPreviewOpen] = useState(false);

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
        backgroundColor: willBeDark ? '#0F1117' : '#FAF9F6',
        surfaceColor: willBeDark ? '#1A1D27' : '#FFFFFF',
        textColor: willBeDark ? '#F8FAFC' : '#141311',
        textMutedColor: willBeDark ? '#94A3B8' : '#64748B',
        borderColor: willBeDark ? '#2B3142' : '#E2E8F0',
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
    const radii = [0, 4, 8, 12, 16, 9999];
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
    <div className="min-h-screen bg-neutral-950 flex flex-col font-sans">
      {/* Top Application Header */}
      <Header
        currentTheme={theme}
        onSelectPreset={handleSelectPreset}
        onRandomizeVibe={handleRandomizeVibe}
        onToggleDarkMode={handleToggleDarkMode}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenTemplates={() => setIsTemplatesOpen(true)}
        savedTemplatesCount={savedTemplates.length}
      />

      {/* Main Workspace: Left Controls + Right Live Preview */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <ControlPanel
          theme={theme}
          onChange={handleChangeTheme}
        />
        <LivePreview
          theme={theme}
          onOpenModalPreview={() => setIsModalPreviewOpen(true)}
        />
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
