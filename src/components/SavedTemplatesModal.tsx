import React, { useState } from 'react';
import { X, Plus, Trash2, FolderHeart, Clock, Check } from 'lucide-react';
import { ThemeConfig } from '../types/theme';
import { SavedTemplate, saveTemplate, deleteTemplate } from '../utils/storage';

interface SavedTemplatesModalProps {
  currentTheme: ThemeConfig;
  savedTemplates: SavedTemplate[];
  isOpen: boolean;
  onClose: () => void;
  onLoadTemplate: (theme: ThemeConfig) => void;
  onUpdateTemplates: (templates: SavedTemplate[]) => void;
}

export const SavedTemplatesModal: React.FC<SavedTemplatesModalProps> = ({
  currentTheme,
  savedTemplates,
  isOpen,
  onClose,
  onLoadTemplate,
  onUpdateTemplates,
}) => {
  const [templateName, setTemplateName] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!templateName.trim()) return;

    const updated = saveTemplate(templateName, currentTheme);
    onUpdateTemplates(updated);
    setTemplateName('');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteTemplate(id);
    onUpdateTemplates(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <FolderHeart className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Browser Saved Templates</h2>
              <p className="text-xs text-neutral-400">Stored locally in your browser with zero account required</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Save Current Theme Input */}
        <form onSubmit={handleSave} className="p-4 border-b border-neutral-800 bg-neutral-950/60 flex items-center gap-2">
          <input
            type="text"
            placeholder="Save current theme as..."
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
          >
            {savedSuccess ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{savedSuccess ? 'Saved!' : 'Save'}</span>
          </button>
        </form>

        {/* Templates List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {savedTemplates.length === 0 ? (
            <div className="text-center py-10 text-neutral-500 text-xs">
              No saved templates yet. Name your current theme above to save it!
            </div>
          ) : (
            savedTemplates.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  onLoadTemplate(t.theme);
                  onClose();
                }}
                className="p-3 bg-neutral-950/70 hover:bg-neutral-800/80 border border-neutral-800 hover:border-neutral-700 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  {/* Miniature Swatch Dots */}
                  <div className="flex items-center -space-x-1">
                    <span 
                      className="w-4 h-4 rounded-full border border-black/40 shadow-sm"
                      style={{ backgroundColor: t.theme.primaryColor }} 
                    />
                    <span 
                      className="w-4 h-4 rounded-full border border-black/40 shadow-sm"
                      style={{ backgroundColor: t.theme.accentColor }} 
                    />
                    <span 
                      className="w-4 h-4 rounded-full border border-black/40 shadow-sm"
                      style={{ backgroundColor: t.theme.backgroundColor }} 
                    />
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-white group-hover:text-rose-300 transition-colors">
                      {t.name}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[10px] text-neutral-500">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(t.updatedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{t.theme.isDark ? 'Dark' : 'Light'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to load
                  </span>
                  <button
                    onClick={(e) => handleDelete(t.id, e)}
                    title="Delete template"
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
