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
  Palette 
} from 'lucide-react';
import { ThemeConfig, ExportFormat } from '../types/theme';
import { 
  generateUniversalMarkdown, 
  generateCursorRules, 
  generateClaudePrompt, 
  generateV0Prompt 
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

  if (!isOpen) return null;

  const getContent = () => {
    switch (format) {
      case 'markdown':
        return generateUniversalMarkdown(theme);
      case 'cursorrules':
        return generateCursorRules(theme);
      case 'claude':
        return generateClaudePrompt(theme);
      case 'v0':
        return generateV0Prompt(theme);
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
    { id: 'claude', label: 'Claude / LLM Prompt', icon: Sparkles },
    { id: 'v0', label: 'v0 / Bolt Prompt', icon: Cpu },
    { id: 'tailwind', label: 'Tailwind @theme', icon: Code2 },
    { id: 'css', label: 'CSS Variables', icon: Palette },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Export Design Specifications & Prompts</h2>
              <p className="text-xs text-neutral-400">Copy or download ready-to-paste specs for your AI coding tools</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Format Selector Tabs */}
        <div className="flex overflow-x-auto border-b border-neutral-800 px-3 pt-2 gap-1 bg-neutral-950/60 scrollbar-none">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setFormat(id)}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 whitespace-nowrap transition-all ${
                format === id
                  ? 'border-sky-500 text-sky-400 bg-neutral-900/60'
                  : 'border-transparent text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Code Content Preview */}
        <div className="flex-1 overflow-y-auto p-4 bg-neutral-950">
          <pre className="text-xs font-mono text-neutral-300 whitespace-pre-wrap leading-relaxed select-all">
            {content}
          </pre>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/80 flex items-center justify-between gap-3">
          <div className="text-xs text-neutral-400">
            Target: <strong className="text-neutral-200">{tabs.find(t => t.id === format)?.label}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-neutral-400" />
              <span>Download File</span>
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-semibold shadow-md shadow-sky-500/25 transition-colors"
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
