import React, { useState } from 'react';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Eye, 
  ArrowRight, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Info, 
  Bell, 
  X, 
  Sliders, 
  Send,
  Trash2,
  Lock,
  Zap
} from 'lucide-react';
import { ThemeConfig } from '../types/theme';
import { getThemeCssVariables } from '../utils/cssGenerator';

interface LivePreviewProps {
  theme: ThemeConfig;
  onOpenModalPreview: () => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ theme, onOpenModalPreview }) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [colorblindFilter, setColorblindFilter] = useState<'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochrome'>('none');
  const [activeToast, setActiveToast] = useState(false);
  const [formInput, setFormInput] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const cssVars = getThemeCssVariables(theme) as React.CSSProperties;

  const triggerToast = () => {
    setActiveToast(true);
    setTimeout(() => setActiveToast(false), 3500);
  };

  const handleTestValidation = () => {
    if (!formInput.trim()) {
      setFormStatus('error');
    } else {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  const viewportWidth = 
    viewport === 'mobile' ? 'max-w-[375px]' :
    viewport === 'tablet' ? 'max-w-[768px]' : 'w-full';

  // SVG matrix filters for colorblindness simulation
  const getFilterStyle = () => {
    if (colorblindFilter === 'monochrome') return { filter: 'grayscale(100%)' };
    if (colorblindFilter === 'protanopia') return { filter: 'url(#protanopia-filter)' };
    if (colorblindFilter === 'deuteranopia') return { filter: 'url(#deuteranopia-filter)' };
    if (colorblindFilter === 'tritanopia') return { filter: 'url(#tritanopia-filter)' };
    return {};
  };

  // Button shape helper
  const getRadiusClass = () => {
    if (theme.radius === 9999) return 'rounded-full';
    if (theme.radius === 0) return 'rounded-none';
    return '';
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-53px)] bg-neutral-900 overflow-hidden relative">
      {/* Top Preview Toolbar */}
      <div className="border-b border-neutral-800 bg-neutral-950/80 px-4 py-2 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 p-0.5 rounded-lg">
          <button
            onClick={() => setViewport('desktop')}
            title="Desktop View (100%)"
            className={`p-1.5 rounded-md transition-colors ${
              viewport === 'desktop' ? 'bg-neutral-800 text-sky-400' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewport('tablet')}
            title="Tablet View (768px)"
            className={`p-1.5 rounded-md transition-colors ${
              viewport === 'tablet' ? 'bg-neutral-800 text-sky-400' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewport('mobile')}
            title="Mobile View (375px)"
            className={`p-1.5 rounded-md transition-colors ${
              viewport === 'mobile' ? 'bg-neutral-800 text-sky-400' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Colorblindness Simulator */}
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-neutral-400" />
          <select
            value={colorblindFilter}
            onChange={(e) => setColorblindFilter(e.target.value as any)}
            className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="none">Vision: Normal</option>
            <option value="protanopia">Protanopia (Red-Blind)</option>
            <option value="deuteranopia">Deuteranopia (Green-Blind)</option>
            <option value="tritanopia">Tritanopia (Blue-Blind)</option>
            <option value="monochrome">Monochrome / Grayscale</option>
          </select>
        </div>
      </div>

      {/* SVG Color Matrix Filters Definition */}
      <svg className="hidden">
        <defs>
          <filter id="protanopia-filter">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0   0.558, 0.442, 0, 0, 0   0, 0.242, 0.758, 0, 0   0, 0, 0, 1, 0" />
          </filter>
          <filter id="deuteranopia-filter">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0   0.7, 0.3, 0, 0, 0   0, 0.3, 0.7, 0, 0   0, 0, 0, 1, 0" />
          </filter>
          <filter id="tritanopia-filter">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0   0, 0.433, 0.567, 0, 0   0, 0.475, 0.525, 0, 0   0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>

      {/* Canvas Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex justify-center items-start">
        <div 
          className={`transition-all duration-300 shadow-2xl rounded-xl overflow-hidden border border-neutral-800 ${viewportWidth}`}
          style={{
            ...cssVars,
            ...getFilterStyle(),
            backgroundColor: 'var(--theme-bg)',
            color: 'var(--theme-text)',
            fontFamily: 'var(--theme-font-body)',
          }}
        >
          {/* Mockup Header / Nav */}
          <nav 
            className="px-6 py-3.5 flex items-center justify-between border-b"
            style={{
              borderColor: 'var(--theme-border)',
              backgroundColor: theme.headerStyle === 'frosted' ? 'rgba(0,0,0,0.1)' : 'transparent',
              backdropFilter: theme.headerStyle === 'frosted' ? 'blur(12px)' : 'none',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div 
                className="w-7 h-7 flex items-center justify-center font-bold text-xs"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: theme.isDark ? '#000000' : '#ffffff',
                  borderRadius: 'var(--theme-radius)',
                }}
              >
                ▲
              </div>
              <span className="font-bold tracking-tight text-sm" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                AcmeOS
              </span>
            </div>

            <div className="hidden md:flex items-center gap-5 text-xs opacity-80 font-medium">
              <span className="hover:opacity-100 cursor-pointer">Platform</span>
              <span className="hover:opacity-100 cursor-pointer">Solutions</span>
              <span className="hover:opacity-100 cursor-pointer">Changelog</span>
              <span className="hover:opacity-100 cursor-pointer">Docs</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={triggerToast}
                className="px-3 py-1.5 text-xs font-semibold transition-all"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: theme.isDark ? '#000000' : '#ffffff',
                  borderRadius: 'var(--theme-radius)',
                  boxShadow: 'var(--theme-shadow)',
                  border: `${theme.borderWidth}px solid var(--theme-primary)`,
                }}
              >
                Get Started
              </button>
            </div>
          </nav>

          {/* Mockup Hero */}
          <section className="px-6 py-12 text-center max-w-2xl mx-auto space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: 'var(--theme-surface)',
                border: `${theme.borderWidth}px solid var(--theme-border)`,
                borderRadius: 'var(--theme-radius)',
                color: 'var(--theme-text)',
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--theme-primary)' }} />
              <span>Next-Gen Agentic Architecture v2.4</span>
            </div>

            {/* Heading */}
            <h1 
              className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight"
              style={{ fontFamily: 'var(--theme-font-heading)' }}
            >
              Build software at the speed of <span style={{ color: 'var(--theme-primary)' }}>human thought</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm opacity-75 max-w-lg mx-auto leading-relaxed">
              Design, preview, and export high-performance frontend specifications crafted specifically for modern AI coding companions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={triggerToast}
                className="px-5 py-2.5 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: theme.isDark ? '#000000' : '#ffffff',
                  borderRadius: 'var(--theme-radius)',
                  boxShadow: 'var(--theme-shadow)',
                  border: `${theme.borderWidth}px solid var(--theme-primary)`,
                }}
              >
                <span>Launch Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenModalPreview}
                className="px-4 py-2.5 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer"
                style={{
                  backgroundColor: 'var(--theme-surface)',
                  border: `${theme.borderWidth}px solid var(--theme-border)`,
                  borderRadius: 'var(--theme-radius)',
                  color: 'var(--theme-text)',
                }}
              >
                <span>Preview Modal</span>
              </button>
            </div>
          </section>

          {/* Interactive Sandbox Test Strip */}
          <div className="mx-6 p-4 rounded-xl border mb-8 flex flex-wrap items-center justify-between gap-3 text-xs"
            style={{
              backgroundColor: 'var(--theme-surface)',
              borderColor: 'var(--theme-border)',
              borderRadius: 'var(--theme-radius)',
            }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: 'var(--theme-primary)' }} />
              <span className="font-semibold">Interactive Sandbox:</span>
              <span className="opacity-70 hidden sm:inline">Click buttons to test your active theme tokens</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={triggerToast}
                className="px-2.5 py-1 rounded border hover:opacity-80 transition-opacity"
                style={{ borderColor: 'var(--theme-border)' }}
              >
                Test Toast
              </button>
              <button
                onClick={onOpenModalPreview}
                className="px-2.5 py-1 rounded border hover:opacity-80 transition-opacity"
                style={{ borderColor: 'var(--theme-border)' }}
              >
                Test Modal
              </button>
            </div>
          </div>

          {/* Card Showcase Grid */}
          <section className="px-6 pb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Neural Reasoning', desc: 'Real-time chain-of-thought analysis with sub-millisecond dispatching.', icon: Zap },
              { title: 'Deterministic Tokens', desc: 'Zero visual hallucination. Strict mapping to WCAG & Tailwind specifications.', icon: Lock },
              { title: 'Instant Sharing', desc: 'Zero server dependencies. Share via lightweight compressed URL hash.', icon: Sliders },
            ].map((card, i) => (
              <div
                key={i}
                className="p-5 flex flex-col justify-between transition-all"
                style={{
                  backgroundColor: 'var(--theme-surface)',
                  border: `${theme.borderWidth}px solid var(--theme-border)`,
                  borderRadius: 'var(--theme-radius)',
                  boxShadow: 'var(--theme-shadow)',
                }}
              >
                <div className="space-y-2">
                  <div 
                    className="w-8 h-8 rounded-md flex items-center justify-center mb-3"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: 'var(--theme-primary)',
                    }}
                  >
                    <card.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-sm" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                    {card.title}
                  </h3>
                  <p className="text-xs opacity-70 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-semibold" style={{ color: 'var(--theme-primary)' }}>
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </section>

          {/* Form & Input Preview */}
          <section className="px-6 pb-12">
            <div 
              className="p-6 rounded-xl border space-y-4"
              style={{
                backgroundColor: 'var(--theme-surface)',
                borderColor: 'var(--theme-border)',
                borderRadius: 'var(--theme-radius)',
              }}
            >
              <div>
                <h3 className="font-bold text-base" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                  Interactive Form & Focus Feedback
                </h3>
                <p className="text-xs opacity-70">
                  Type text or submit blank to test focus rings and error states.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  placeholder="Enter email to test validation..."
                  value={formInput}
                  onChange={(e) => {
                    setFormInput(e.target.value);
                    if (formStatus !== 'idle') setFormStatus('idle');
                  }}
                  className={`flex-1 min-w-[200px] px-3.5 py-2 text-xs transition-all focus:outline-none ${
                    formStatus === 'error' ? 'border-red-500 ring-2 ring-red-500/20' : ''
                  }`}
                  style={{
                    backgroundColor: theme.inputStyle === 'filled' ? 'rgba(0,0,0,0.1)' : 'transparent',
                    border: `${theme.borderWidth}px solid ${formStatus === 'error' ? '#ef4444' : 'var(--theme-border)'}`,
                    borderRadius: 'var(--theme-radius)',
                    color: 'var(--theme-text)',
                  }}
                />
                <button
                  onClick={handleTestValidation}
                  className="px-4 py-2 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  style={{
                    backgroundColor: 'var(--theme-primary)',
                    color: theme.isDark ? '#000000' : '#ffffff',
                    borderRadius: 'var(--theme-radius)',
                  }}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Validate</span>
                </button>
              </div>

              {formStatus === 'error' && (
                <div className="text-xs text-red-400 flex items-center gap-1.5 animate-bounce">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Validation Error: Input cannot be empty!</span>
                </div>
              )}

              {formStatus === 'success' && (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Validation Passed: Input successfully verified.</span>
                </div>
              )}
            </div>
          </section>

          {/* Feedback & Alert Banners */}
          <section className="px-6 pb-12 space-y-3">
            <div 
              className="p-3.5 flex items-center justify-between text-xs border"
              style={{
                backgroundColor: 'rgba(56, 189, 248, 0.08)',
                borderColor: 'var(--theme-border)',
                borderLeftWidth: theme.alertStyle === 'left-bar' ? '4px' : `${theme.borderWidth}px`,
                borderLeftColor: 'var(--theme-primary)',
                borderRadius: 'var(--theme-radius)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <Info className="w-4 h-4 shrink-0" style={{ color: 'var(--theme-primary)' }} />
                <span>System status: All services operational across 14 edge regions.</span>
              </div>
              <span className="text-[10px] font-mono opacity-60">Just now</span>
            </div>
          </section>

          {/* Mockup Footer */}
          <footer 
            className="px-6 py-6 border-t flex flex-wrap items-center justify-between gap-4 text-xs opacity-75"
            style={{ borderColor: 'var(--theme-border)' }}
          >
            <span>© 2026 Acme Intelligence Inc. All rights reserved.</span>
            <div className="flex gap-4">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Security</span>
            </div>
          </footer>

          {/* Interactive Floating Toast */}
          {activeToast && (
            <div 
              className="fixed bottom-6 right-6 z-50 p-4 border flex items-center gap-3 shadow-2xl animate-fade-in"
              style={{
                backgroundColor: 'var(--theme-surface)',
                borderColor: 'var(--theme-border)',
                borderRadius: 'var(--theme-radius)',
                color: 'var(--theme-text)',
                boxShadow: 'var(--theme-shadow)',
              }}
            >
              <div 
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--theme-primary)', color: theme.isDark ? '#000' : '#fff' }}
              >
                <Bell className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-semibold">Toast Action Triggered</div>
                <div className="text-[10px] opacity-75">Theme tokens applied seamlessly</div>
              </div>
              <button 
                onClick={() => setActiveToast(false)}
                className="ml-2 opacity-50 hover:opacity-100"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
