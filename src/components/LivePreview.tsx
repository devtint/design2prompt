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
  Send,
  Zap,
  Lock,
  Code2,
  Terminal,
  Activity,
  Sliders,
  Maximize2
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
  const [copiedCode, setCopiedCode] = useState(false);

  const cssVars = getThemeCssVariables(theme) as React.CSSProperties;

  const triggerToast = () => {
    setActiveToast(true);
    setTimeout(() => setActiveToast(false), 3000);
  };

  const handleTestValidation = () => {
    if (!formInput.trim()) {
      setFormStatus('error');
    } else {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 2500);
    }
  };

  const handleCopySnippet = () => {
    const snippet = `/* Applied Theme: ${theme.name} */\nprimary: "${theme.primaryColor}"\nbackground: "${theme.backgroundColor}"\nradius: "${theme.radius}px"`;
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 1800);
  };

  const viewportContainerClass = 
    viewport === 'mobile' ? 'max-w-[375px]' :
    viewport === 'tablet' ? 'max-w-[768px]' : 'max-w-5xl w-full';

  // SVG color matrix filter styles
  const getFilterStyle = () => {
    if (colorblindFilter === 'monochrome') return { filter: 'grayscale(100%)' };
    if (colorblindFilter === 'protanopia') return { filter: 'url(#protanopia-filter)' };
    if (colorblindFilter === 'deuteranopia') return { filter: 'url(#deuteranopia-filter)' };
    if (colorblindFilter === 'tritanopia') return { filter: 'url(#tritanopia-filter)' };
    return {};
  };

  return (
    <div className="flex-1 flex flex-col h-full lg:h-[calc(100vh-53px)] bg-neutral-900/90 overflow-hidden relative">
      
      {/* Top Device Toolbar (hidden or compact on mobile) */}
      <div className="border-b border-neutral-800/80 bg-neutral-950/80 px-3 sm:px-5 py-2 flex items-center justify-between gap-3 shrink-0">
        
        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 p-1 rounded-xl">
          <button
            onClick={() => setViewport('desktop')}
            title="Desktop Canvas"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'desktop' 
                ? 'bg-neutral-800 text-sky-400 shadow-sm' 
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            onClick={() => setViewport('tablet')}
            title="Tablet (768px)"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'tablet' 
                ? 'bg-neutral-800 text-sky-400 shadow-sm' 
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>

          <button
            onClick={() => setViewport('mobile')}
            title="Mobile (375px)"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'mobile' 
                ? 'bg-neutral-800 text-sky-400 shadow-sm' 
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Vision Filter Simulator */}
        <div className="flex items-center gap-2">
          <Eye className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <select
            value={colorblindFilter}
            onChange={(e) => setColorblindFilter(e.target.value as any)}
            className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs rounded-xl px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="none">Vision: Normal</option>
            <option value="protanopia">Protanopia (Red-Blind)</option>
            <option value="deuteranopia">Deuteranopia (Green-Blind)</option>
            <option value="tritanopia">Tritanopia (Blue-Blind)</option>
            <option value="monochrome">Grayscale / High Contrast</option>
          </select>
        </div>
      </div>

      {/* SVG Color Filters for Colorblindness */}
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

      {/* Live Sample Canvas Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8 flex justify-center items-start">
        <div 
          className={`transition-all duration-300 shadow-2xl rounded-2xl overflow-hidden border border-neutral-800 ${viewportContainerClass}`}
          style={{
            ...cssVars,
            ...getFilterStyle(),
            backgroundColor: 'var(--theme-bg)',
            color: 'var(--theme-text)',
            fontFamily: 'var(--theme-font-body)',
          }}
        >
          {/* Navigation Bar */}
          <nav 
            className="px-5 sm:px-7 py-4 flex items-center justify-between border-b"
            style={{
              borderColor: 'var(--theme-border)',
              backgroundColor: theme.headerStyle === 'frosted' ? 'rgba(0,0,0,0.15)' : 'transparent',
              backdropFilter: theme.headerStyle === 'frosted' ? 'blur(16px)' : 'none',
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-7 h-7 flex items-center justify-center font-bold text-xs shadow-sm"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: theme.isDark ? '#000000' : '#ffffff',
                  borderRadius: 'var(--theme-radius)',
                }}
              >
                ▲
              </div>
              <span className="font-extrabold tracking-tight text-sm" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                Nexus<span style={{ color: 'var(--theme-primary)' }}>AI</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6 text-xs opacity-80 font-medium">
              <span className="hover:opacity-100 cursor-pointer">Platform</span>
              <span className="hover:opacity-100 cursor-pointer">Agents</span>
              <span className="hover:opacity-100 cursor-pointer">Changelog</span>
              <span className="hover:opacity-100 cursor-pointer">Pricing</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={triggerToast}
                className="px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer"
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

          {/* Hero Section */}
          <section className="px-5 sm:px-8 py-10 sm:py-14 text-center max-w-2xl mx-auto space-y-4 sm:space-y-5">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold shadow-sm"
              style={{
                backgroundColor: 'var(--theme-surface)',
                border: `${theme.borderWidth}px solid var(--theme-border)`,
                borderRadius: 'var(--theme-radius)',
                color: 'var(--theme-text)',
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--theme-primary)' }} />
              <span>Agentic Frontier Suite v2.0</span>
            </div>

            {/* Heading */}
            <h1 
              className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight"
              style={{ fontFamily: 'var(--theme-font-heading)' }}
            >
              Architect systems with <span style={{ color: 'var(--theme-primary)' }}>deterministic precision</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm opacity-75 max-w-lg mx-auto leading-relaxed">
              Design, preview, and deploy high-performing frontend tokens and system prompts tailored specifically for vibe coders and AI copilots.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={triggerToast}
                className="px-5 py-2.5 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                style={{
                  backgroundColor: 'var(--theme-primary)',
                  color: theme.isDark ? '#000000' : '#ffffff',
                  borderRadius: 'var(--theme-radius)',
                  boxShadow: 'var(--theme-shadow)',
                  border: `${theme.borderWidth}px solid var(--theme-primary)`,
                }}
              >
                <span>Trigger Live Toast</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenModalPreview}
                className="px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                style={{
                  backgroundColor: 'var(--theme-surface)',
                  border: `${theme.borderWidth}px solid var(--theme-border)`,
                  borderRadius: 'var(--theme-radius)',
                  color: 'var(--theme-text)',
                }}
              >
                <span>Inspect Modal</span>
              </button>
            </div>
          </section>

          {/* Interactive Feature Cards Grid */}
          <section className="px-5 sm:px-8 pb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { 
                title: 'Agentic Core', 
                desc: 'Sub-millisecond prompt dispatching with chain-of-thought verification.', 
                icon: Zap,
                tag: 'Active' 
              },
              { 
                title: 'Deterministic Tokens', 
                desc: 'Strict mathematical WCAG color contrast & pixel-perfect radii parity.', 
                icon: Lock,
                tag: '99.9%' 
              },
              { 
                title: 'Zero-Cost Sharing', 
                desc: 'Client-side URL hash compression for instant collaboration with $0 server cost.', 
                icon: Sliders,
                tag: 'Hash' 
              },
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
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        color: 'var(--theme-primary)',
                      }}
                    >
                      <card.icon className="w-4 h-4" />
                    </div>
                    <span 
                      className="text-[10px] font-mono font-bold px-2 py-0.5"
                      style={{
                        backgroundColor: 'var(--theme-bg)',
                        borderRadius: 'var(--theme-radius)',
                        border: `${theme.borderWidth}px solid var(--theme-border)`,
                      }}
                    >
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                    {card.title}
                  </h3>
                  <p className="text-xs opacity-70 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between text-xs font-semibold" style={{ color: 'var(--theme-primary)' }}>
                  <span>Explore docs</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </section>

          {/* Interactive Form & Validation Sandbox */}
          <section className="px-5 sm:px-8 pb-10">
            <div 
              className="p-5 sm:p-6 border space-y-4"
              style={{
                backgroundColor: 'var(--theme-surface)',
                borderColor: 'var(--theme-border)',
                borderRadius: 'var(--theme-radius)',
              }}
            >
              <div>
                <h3 className="font-bold text-sm sm:text-base" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                  Interactive Form & State Validation
                </h3>
                <p className="text-xs opacity-70">
                  Type an email or click validate with empty field to see live error feedback.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter email address..."
                  value={formInput}
                  onChange={(e) => {
                    setFormInput(e.target.value);
                    if (formStatus !== 'idle') setFormStatus('idle');
                  }}
                  className={`flex-1 px-3.5 py-2.5 text-xs transition-all focus:outline-none ${
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
                  className="px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                  style={{
                    backgroundColor: 'var(--theme-primary)',
                    color: theme.isDark ? '#000000' : '#ffffff',
                    borderRadius: 'var(--theme-radius)',
                  }}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Validate Form</span>
                </button>
              </div>

              {formStatus === 'error' && (
                <div className="text-xs text-red-400 flex items-center gap-1.5 animate-bounce">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Validation Error: Email address cannot be empty!</span>
                </div>
              )}

              {formStatus === 'success' && (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Verified: Input state passed all schema constraints.</span>
                </div>
              )}
            </div>
          </section>

          {/* Alert Banner Preview */}
          <section className="px-5 sm:px-8 pb-10">
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
                <span>Active Theme: <strong>{theme.name}</strong> applied dynamically to all components.</span>
              </div>
              <span className="text-[10px] font-mono opacity-60 hidden sm:inline">Live Sync</span>
            </div>
          </section>

          {/* Footer */}
          <footer 
            className="px-5 sm:px-8 py-6 border-t flex flex-wrap items-center justify-between gap-4 text-xs opacity-75"
            style={{ borderColor: 'var(--theme-border)' }}
          >
            <span>© 2026 Nexus Architecture. Powered by Design2Prompt.</span>
            <div className="flex gap-4">
              <span className="hover:underline cursor-pointer">Privacy</span>
              <span className="hover:underline cursor-pointer">Security</span>
              <span className="hover:underline cursor-pointer">Status</span>
            </div>
          </footer>

          {/* Live Floating Toast Notification */}
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
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: 'var(--theme-primary)', color: theme.isDark ? '#000' : '#fff' }}
              >
                <Bell className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold">Toast Notification Triggered</div>
                <div className="text-[10px] opacity-75">Theme tokens applied in real-time</div>
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
