import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  FileText, 
  Code2, 
  Cpu, 
  Terminal, 
  Palette,
  ShieldCheck,
  Database,
  Gauge,
  Cloud,
  CheckSquare,
  Square
} from 'lucide-react';
import { ThemeConfig, ExportFormat } from '../types/theme';
import { 
  generateUniversalMarkdown, 
  generateCursorRules, 
  generateClaudePrompt, 
  generateV0Prompt,
  ExportSectionsSelection,
  DEFAULT_EXPORT_SECTIONS
} from '../utils/markdownGenerator';
import { generateTailwindSnippet, generateCssSnippet } from '../utils/cssGenerator';

interface ExportModalProps {
  theme: ThemeConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ theme, isOpen, onClose }) => {
  const [format, setFormat] = useState<ExportFormat>('markdown');
  const [copied, setCopied] = useState(false);
  const [sections, setSections] = useState<ExportSectionsSelection>(DEFAULT_EXPORT_SECTIONS);

  if (!isOpen) return null;

  const toggleSection = (key: keyof ExportSectionsSelection) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const selectAllSections = () => {
    setSections({
      design: true,
      security: true,
      ratelimit: true,
      database: true,
      backend: true,
      hosting: true,
      tokens: true,
    });
  };

  const selectDesignOnly = () => {
    setSections({
      design: true,
      security: false,
      ratelimit: false,
      database: false,
      backend: false,
      hosting: false,
      tokens: true,
    });
  };

  const selectBackendOnly = () => {
    setSections({
      design: false,
      security: true,
      ratelimit: true,
      database: true,
      backend: true,
      hosting: true,
      tokens: false,
    });
  };

  const getContent = () => {
    switch (format) {
      case 'markdown':
        return generateUniversalMarkdown(theme, sections);
      case 'cursorrules':
        return generateCursorRules(theme, sections);
      case 'claude':
        return generateClaudePrompt(theme, sections);
      case 'v0':
        return generateV0Prompt(theme, sections);
      case 'tailwind':
        return generateTailwindSnippet(theme);
      case 'css':
        return generateCssSnippet(theme);
    }
  };

  const content = getContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    let filename = `${theme.id || 'theme'}.md`;
    if (format === 'cursorrules') filename = '.cursorrules';
    else if (format === 'tailwind' || format === 'css') filename = 'tokens.css';

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const tabs: { id: ExportFormat; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'markdown', label: 'Universal Markdown', icon: FileText },
    { id: 'cursorrules', label: '.cursorrules', icon: Terminal },
    { id: 'claude', label: 'Claude Prompt', icon: Sparkles },
    { id: 'v0', label: 'v0 / Bolt Prompt', icon: Cpu },
    { id: 'tailwind', label: 'Tailwind @theme', icon: Code2 },
    { id: 'css', label: 'CSS Variables', icon: Palette },
  ];

  const sectionOptions: { key: keyof ExportSectionsSelection; label: string; icon: any }[] = [
    { key: 'design', label: 'Visual Design', icon: Palette },
    { key: 'security', label: 'Security & Auth', icon: ShieldCheck },
    { key: 'ratelimit', label: 'Rate Limiting', icon: Gauge },
    { key: 'database', label: 'Database & ORM', icon: Database },
    { key: 'backend', label: 'Backend & API', icon: Cpu },
    { key: 'hosting', label: 'Hosting & Infra', icon: Cloud },
    { key: 'tokens', label: 'CSS/Tailwind Tokens', icon: Code2 },
  ];

  const isConfigurableFormat = ['markdown', 'cursorrules', 'claude', 'v0'].includes(format);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white">Export Specifications & Prompts</h2>
              <p className="text-xs text-neutral-400">Customizable full-stack specs for Cursor, Claude, v0, Bolt & Windsurf</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Format Selector Tabs (FIXED: Clean pill layout without vertical clipping) */}
        <div className="flex overflow-x-auto p-2.5 gap-1.5 border-b border-neutral-800 bg-neutral-950/90 scrollbar-none shrink-0">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setFormat(id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                format === id
                  ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700 ring-1 ring-sky-500/30'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${format === id ? 'text-sky-400' : ''}`} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Granular Section Inclusions & Exclusions */}
        {isConfigurableFormat && (
          <div className="p-3 border-b border-neutral-800/80 bg-neutral-900/60 flex flex-wrap items-center justify-between gap-2.5 text-xs shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-neutral-300 text-xs">Include in Spec:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={selectAllSections}
                  className="px-2 py-0.5 rounded text-[11px] font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                >
                  All
                </button>
                <button
                  onClick={selectDesignOnly}
                  className="px-2 py-0.5 rounded text-[11px] font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                >
                  Design Only
                </button>
                <button
                  onClick={selectBackendOnly}
                  className="px-2 py-0.5 rounded text-[11px] font-semibold bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                >
                  Backend Only
                </button>
              </div>
            </div>

            {/* Checkbox Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              {sectionOptions.map(({ key, label }) => {
                const checked = sections[key];
                return (
                  <button
                    key={key}
                    onClick={() => toggleSection(key)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-all ${
                      checked
                        ? 'bg-sky-500/15 border-sky-500/40 text-sky-300 shadow-sm'
                        : 'bg-neutral-800/50 border-neutral-700/50 text-neutral-500 line-through hover:text-neutral-400'
                    }`}
                  >
                    {checked ? <CheckSquare className="w-3 h-3 text-sky-400" /> : <Square className="w-3 h-3 text-neutral-600" />}
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Code Content Preview */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-neutral-950">
          <pre className="text-xs font-mono text-neutral-300 whitespace-pre-wrap leading-relaxed select-all">
            {content}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-neutral-400">
            Exporting: <strong className="text-white">{tabs.find(t => t.id === format)?.label}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-700 bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-neutral-400" />
              <span>Download File</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-md shadow-sky-500/25 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
