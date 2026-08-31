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
  Wifi,
  BatteryMedium,
  Sliders
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

  // SVG color matrix filter styles
  const getFilterStyle = () => {
    if (colorblindFilter === 'monochrome') return { filter: 'grayscale(100%)' };
    if (colorblindFilter === 'protanopia') return { filter: 'url(#protanopia-filter)' };
    if (colorblindFilter === 'deuteranopia') return { filter: 'url(#deuteranopia-filter)' };
    if (colorblindFilter === 'tritanopia') return { filter: 'url(#tritanopia-filter)' };
    return {};
  };

  const isMobileViewport = viewport === 'mobile';
  const isTabletViewport = viewport === 'tablet';

  return (
    <div className="flex-1 flex flex-col h-full lg:h-[calc(100vh-53px)] bg-neutral-900/90 overflow-hidden relative">
      
      {/* Top Device Toolbar */}
      <div className="border-b border-neutral-800/80 bg-neutral-950/90 px-3 sm:px-5 py-2 flex items-center justify-between gap-3 shrink-0">
        
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
            title="Phone (375px)"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'mobile' 
                ? 'bg-neutral-800 text-sky-400 shadow-sm' 
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile Phone</span>
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
            <option value="protanopia">Protanopia</option>
            <option value="deuteranopia">Deuteranopia</option>
            <option value="tritanopia">Tritanopia</option>
            <option value="monochrome">Grayscale</option>
          </select>
        </div>
      </div>

      {/* SVG Color Filters */}
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
      <div className="flex-1 overflow-y-auto p-2 sm:p-6 lg:p-8 flex justify-center items-start">
        
        {/* If in Mobile View: Wrap in an Authentic Phone Chassis */}
        <div 
          className={`transition-all duration-300 ${
            isMobileViewport 
              ? 'w-full max-w-[380px] my-auto bg-neutral-950 p-2.5 sm:p-3 rounded-[48px] border-[6px] sm:border-[8px] border-neutral-800 shadow-2xl relative' 
              : isTabletViewport 
                ? 'w-full max-w-[768px] rounded-2xl shadow-2xl border border-neutral-800 overflow-hidden'
                : 'w-full max-w-5xl rounded-2xl shadow-2xl border border-neutral-800 overflow-hidden'
          }`}
          style={getFilterStyle()}
        >
          {/* Authentic Phone Top Status Bar + Dynamic Island */}
          {isMobileViewport && (
            <div className="bg-black text-white px-5 pt-2.5 pb-2 rounded-t-[38px] flex items-center justify-between select-none relative">
              <span className="text-[11px] font-bold tracking-tight">9:41</span>
              
              {/* Dynamic Island Pill */}
              <div className="w-20 h-4 bg-neutral-900 rounded-full flex items-center justify-end px-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
              </div>

              <div className="flex items-center gap-1.5 opacity-90">
                <Wifi className="w-3 h-3" />
                <BatteryMedium className="w-3.5 h-3.5" />
              </div>
            </div>
          )}

          {/* Rendered Website Canvas */}
          <div 
            className={`transition-all duration-300 overflow-y-auto ${
              isMobileViewport 
                ? 'h-[620px] sm:h-[660px] rounded-b-[38px] rounded-t-[14px]' 
                : 'w-full'
            }`}
            style={{
              ...cssVars,
              backgroundColor: 'var(--theme-bg)',
              color: 'var(--theme-text)',
              fontFamily: 'var(--theme-font-body)',
              lineHeight: 'var(--theme-line-height)',
              letterSpacing: 'var(--theme-letter-spacing)',
            }}
          >
            {/* Navigation Bar */}
            <nav 
              className="px-4 sm:px-6 py-3.5 flex items-center justify-between border-b sticky top-0 z-20 backdrop-blur-md"
              style={{
                borderColor: 'var(--theme-border)',
                backgroundColor: theme.headerStyle === 'frosted' ? 'rgba(0,0,0,0.2)' : 'var(--theme-bg)',
              }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div 
                  className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center font-bold text-xs shrink-0 shadow-sm"
                  style={{
                    backgroundColor: 'var(--theme-primary)',
                    color: theme.isDark ? '#000000' : '#ffffff',
                    borderRadius: 'var(--theme-radius-card)',
                  }}
                >
                  ▲
                </div>
                <span className="font-extrabold tracking-tight text-xs sm:text-sm truncate" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                  Nexus<span style={{ color: 'var(--theme-primary)' }}>AI</span>
                </span>
              </div>

              {!isMobileViewport && (
                <div className="hidden md:flex items-center gap-6 text-xs opacity-80 font-medium">
                  <span className="hover:opacity-100 cursor-pointer">Platform</span>
                  <span className="hover:opacity-100 cursor-pointer">Agents</span>
                  <span className="hover:opacity-100 cursor-pointer">Docs</span>
                </div>
              )}

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={triggerToast}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold transition-all cursor-pointer truncate"
                  style={{
                    backgroundColor: 'var(--theme-primary)',
                    color: theme.isDark ? '#000000' : '#ffffff',
                    borderRadius: 'var(--theme-radius-btn)',
                    boxShadow: 'var(--theme-shadow)',
                    border: `${theme.borderWidth}px solid var(--theme-primary)`,
                  }}
                >
                  Get Started
                </button>
              </div>
            </nav>

            {/* Hero Section */}
            <section className="px-4 sm:px-8 py-8 sm:py-12 text-center max-w-2xl mx-auto space-y-3 sm:space-y-4 overflow-hidden">
              {/* Status Pill Badge */}
              <div className="inline-flex items-center gap-2 px-2.5 py-1 text-[11px] font-semibold max-w-full truncate shadow-sm"
                style={{
                  backgroundColor: 'var(--theme-surface)',
                  border: `${theme.borderWidth}px solid var(--theme-border)`,
                  borderRadius: 'var(--theme-radius-btn)',
                  color: 'var(--theme-text)',
                }}
              >
                <span className="w-2 h-2 rounded-full shrink-0 animate-pulse" style={{ backgroundColor: 'var(--theme-primary)' }} />
                <span className="truncate">Agentic Suite v2.0</span>
              </div>

              {/* Heading */}
              <h1 
                className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight break-words px-1"
                style={{ fontFamily: 'var(--theme-font-heading)' }}
              >
                Architect systems with <span style={{ color: 'var(--theme-primary)' }}>precision</span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm opacity-80 max-w-md mx-auto leading-relaxed break-words px-2">
                Generate high-performance frontend tokens and prompts tailored for vibe coders.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2 max-w-xs sm:max-w-none mx-auto w-full">
                <button
                  onClick={triggerToast}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                  style={{
                    backgroundColor: 'var(--theme-primary)',
                    color: theme.isDark ? '#000000' : '#ffffff',
                    borderRadius: 'var(--theme-radius-btn)',
                    boxShadow: 'var(--theme-shadow)',
                    border: `${theme.borderWidth}px solid var(--theme-primary)`,
                  }}
                >
                  <span>Trigger Live Toast</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>

                <button
                  onClick={onOpenModalPreview}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  style={{
                    backgroundColor: 'var(--theme-surface)',
                    border: `${theme.borderWidth}px solid var(--theme-border)`,
                    borderRadius: 'var(--theme-radius-btn)',
                    color: 'var(--theme-text)',
                  }}
                >
                  <span>Inspect Modal</span>
                </button>
              </div>
            </section>

            {/* Feature Cards Grid */}
            <section className="px-4 sm:px-8 pb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {[
                { 
                  title: 'Agentic Core', 
                  desc: 'Sub-millisecond prompt dispatching with chain-of-thought verification.', 
                  icon: Zap,
                  tag: 'Active' 
                },
                { 
                  title: 'Deterministic Tokens', 
                  desc: 'Strict mathematical WCAG color contrast & radii parity.', 
                  icon: Lock,
                  tag: '99.9%' 
                },
                { 
                  title: 'Zero-Cost Sharing', 
                  desc: 'Client-side URL hash compression for instant collaboration.', 
                  icon: Sliders,
                  tag: 'Hash' 
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="p-4 sm:p-5 flex flex-col justify-between transition-all overflow-hidden"
                  style={{
                    backgroundColor: 'var(--theme-surface)',
                    border: `${theme.borderWidth}px solid var(--theme-border)`,
                    borderRadius: 'var(--theme-radius-card)',
                    boxShadow: 'var(--theme-shadow)',
                  }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div 
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          color: 'var(--theme-primary)',
                        }}
                      >
                        <card.icon className="w-3.5 h-3.5" />
                      </div>
                      <span 
                        className="text-[9px] font-mono font-bold px-2 py-0.5 shrink-0"
                        style={{
                          backgroundColor: 'var(--theme-bg)',
                          borderRadius: 'var(--theme-radius-btn)',
                          border: `${theme.borderWidth}px solid var(--theme-border)`,
                        }}
                      >
                        {card.tag}
                      </span>
                    </div>

                    <h3 className="font-bold text-xs sm:text-sm break-words" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                      {card.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs opacity-75 leading-relaxed break-words">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-3 flex items-center justify-between text-xs font-semibold" style={{ color: 'var(--theme-primary)' }}>
                    <span>Explore docs</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </section>

            {/* Interactive Form & Validation Sandbox */}
            <section className="px-4 sm:px-8 pb-8">
              <div 
                className="p-4 sm:p-6 border space-y-3.5 overflow-hidden"
                style={{
                  backgroundColor: 'var(--theme-surface)',
                  borderColor: 'var(--theme-border)',
                  borderRadius: 'var(--theme-radius-card)',
                }}
              >
                <div>
                  <h3 className="font-bold text-xs sm:text-sm" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                    Interactive Form & State Validation
                  </h3>
                  <p className="text-[11px] opacity-75 break-words">
                    Type text or click validate with empty field to see error feedback.
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
                    className={`w-full min-w-0 px-3.5 py-2 text-xs transition-all focus:outline-none ${
                      formStatus === 'error' ? 'border-red-500 ring-2 ring-red-500/20' : ''
                    }`}
                    style={{
                      backgroundColor: theme.inputStyle === 'filled' ? 'rgba(0,0,0,0.1)' : 'transparent',
                      border: `${theme.borderWidth}px solid ${formStatus === 'error' ? '#ef4444' : 'var(--theme-border)'}`,
                      borderRadius: 'var(--theme-radius-btn)',
                      color: 'var(--theme-text)',
                    }}
                  />
                  <button
                    onClick={handleTestValidation}
                    className="w-full sm:w-auto px-4 py-2 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0"
                    style={{
                      backgroundColor: 'var(--theme-primary)',
                      color: theme.isDark ? '#000000' : '#ffffff',
                      borderRadius: 'var(--theme-radius-btn)',
                    }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Validate</span>
                  </button>
                </div>

                {formStatus === 'error' && (
                  <div className="text-[11px] text-red-400 flex items-center gap-1.5 animate-bounce">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span className="break-words">Error: Email cannot be empty!</span>
                  </div>
                )}

                {formStatus === 'success' && (
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span className="break-words">Passed: Input verified.</span>
                  </div>
                )}
              </div>
            </section>

            {/* Alert Banner Preview */}
            <section className="px-4 sm:px-8 pb-8">
              <div 
                className="p-3.5 flex items-center justify-between text-xs border overflow-hidden gap-2"
                style={{
                  backgroundColor: 'rgba(56, 189, 248, 0.08)',
                  borderColor: 'var(--theme-border)',
                  borderLeftWidth: theme.alertStyle === 'left-bar' ? '4px' : `${theme.borderWidth}px`,
                  borderLeftColor: 'var(--theme-primary)',
                  borderRadius: 'var(--theme-radius-card)',
                }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Info className="w-4 h-4 shrink-0" style={{ color: 'var(--theme-primary)' }} />
                  <span className="break-words text-[11px] sm:text-xs">
                    Theme: <strong>{theme.name}</strong> synced in real-time.
                  </span>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer 
              className="px-4 sm:px-8 py-5 border-t flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-xs opacity-75"
              style={{ borderColor: 'var(--theme-border)' }}
            >
              <span>© 2026 Nexus Architecture.</span>
              <div className="flex gap-3">
                <span className="hover:underline cursor-pointer">Privacy</span>
                <span className="hover:underline cursor-pointer">Terms</span>
              </div>
            </footer>

            {/* Bottom Home Indicator for Mobile Phone Screen */}
            {isMobileViewport && (
              <div className="pt-2 pb-2 flex justify-center bg-transparent">
                <div className="w-28 h-1 bg-neutral-400/40 rounded-full" />
              </div>
            )}
          </div>
        </div>

        {/* Live Floating Toast Notification */}
        {activeToast && (
          <div 
            className="fixed bottom-6 right-6 z-50 p-3.5 sm:p-4 border flex items-center gap-3 shadow-2xl animate-fade-in max-w-xs sm:max-w-sm"
            style={{
              backgroundColor: 'var(--theme-surface)',
              borderColor: 'var(--theme-border)',
              borderRadius: 'var(--theme-radius-card)',
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
            <div className="min-w-0">
              <div className="text-xs font-bold truncate">Toast Triggered</div>
              <div className="text-[10px] opacity-75 truncate">Theme tokens active</div>
            </div>
            <button 
              onClick={() => setActiveToast(false)}
              className="ml-auto opacity-50 hover:opacity-100 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
