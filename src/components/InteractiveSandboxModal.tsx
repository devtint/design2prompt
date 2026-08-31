import React from 'react';
import { X, AlertTriangle, Check } from 'lucide-react';
import { ThemeConfig } from '../types/theme';
import { getThemeCssVariables } from '../utils/cssGenerator';

interface InteractiveSandboxModalProps {
  theme: ThemeConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveSandboxModal: React.FC<InteractiveSandboxModalProps> = ({
  theme,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const cssVars = getThemeCssVariables(theme) as React.CSSProperties;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md border shadow-2xl p-6 relative space-y-4"
        style={{
          ...cssVars,
          backgroundColor: 'var(--theme-surface)',
          borderColor: 'var(--theme-border)',
          borderRadius: 'var(--theme-radius)',
          color: 'var(--theme-text)',
          fontFamily: 'var(--theme-font-body)',
          boxShadow: 'var(--theme-shadow)',
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div 
              className="w-6 h-6 rounded flex items-center justify-center text-xs"
              style={{ backgroundColor: 'var(--theme-primary)', color: theme.isDark ? '#000' : '#fff' }}
            >
              ▲
            </div>
            <h3 className="font-bold text-sm" style={{ fontFamily: 'var(--theme-font-heading)' }}>
              Modal Dialog Preview
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded opacity-60 hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="space-y-2 text-xs opacity-80 leading-relaxed">
          <p>
            This modal illustrates your active theme's corner radius (<strong className="text-sky-400">{theme.radius}px</strong>), 
            border style (<strong className="text-sky-400">{theme.borderStyle}</strong>), 
            and button styling.
          </p>
          <div 
            className="p-3 border rounded text-[11px] flex items-center gap-2"
            style={{
              borderColor: 'var(--theme-border)',
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              color: '#f87171',
            }}
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Danger action buttons inherit specific warning styles defined in settings.</span>
          </div>
        </div>

        {/* Modal Footer / Buttons */}
        <div className="pt-2 flex items-center justify-end gap-2 text-xs font-semibold">
          <button
            onClick={onClose}
            className="px-3.5 py-2 border transition-all"
            style={{
              borderColor: 'var(--theme-border)',
              borderRadius: 'var(--theme-radius)',
            }}
          >
            Cancel
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 transition-all flex items-center gap-1.5"
            style={{
              backgroundColor: 'var(--theme-primary)',
              color: theme.isDark ? '#000000' : '#ffffff',
              borderRadius: 'var(--theme-radius)',
            }}
          >
            <Check className="w-3.5 h-3.5" />
            <span>Confirm Action</span>
          </button>
        </div>
      </div>
    </div>
  );
};
