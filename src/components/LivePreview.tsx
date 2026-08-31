import React, { useState } from 'react';
import { 
  Monitor, 
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
  Sliders,
  ChevronDown,
  Layers,
  ZoomIn,
  ZoomOut,
  MousePointer,
  ShieldCheck,
  Database,
  Cpu,
  Cloud
} from 'lucide-react';
import { ThemeConfig } from '../types/theme';
import { getThemeCssVariables } from '../utils/cssGenerator';

interface LivePreviewProps {
  theme: ThemeConfig;
  onOpenModalPreview: () => void;
  onSelectCategory?: (category: 'foundation' | 'typography' | 'shape' | 'buttons' | 'cards' | 'motion') => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ 
  theme, 
  onOpenModalPreview,
  onSelectCategory 
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const [colorblindFilter, setColorblindFilter] = useState<'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'monochrome'>('none');
  const [activeToast, setActiveToast] = useState(false);
  const [formInput, setFormInput] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [pricingBilling, setPricingBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [highlightedElement, setHighlightedElement] = useState<string | null>(null);
  const [rateLimitTokens, setRateLimitTokens] = useState<number>(5);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);

  const cssVars = getThemeCssVariables(theme) as React.CSSProperties;

  const triggerToast = () => {
    setActiveToast(true);
    setTimeout(() => setActiveToast(false), 3500);
  };

  const handleTestRateLimit = () => {
    if (rateLimitTokens > 1) {
      setRateLimitTokens(prev => prev - 1);
    } else if (rateLimitTokens === 1) {
      setRateLimitTokens(0);
      setIsRateLimited(true);
      triggerToast();
      setTimeout(() => {
        setRateLimitTokens(5);
        setIsRateLimited(false);
      }, 7000);
    }
  };

  const handleTestValidation = () => {
    if (!formInput.trim()) {
      setFormStatus('error');
    } else {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 2500);
    }
  };

  const flashHighlight = (label: string, category?: 'foundation' | 'typography' | 'shape' | 'buttons' | 'cards' | 'motion') => {
    setHighlightedElement(label);
    if (category && onSelectCategory) {
      onSelectCategory(category);
    }
    setTimeout(() => setHighlightedElement(null), 2000);
  };

  // SVG color matrix filter styles
  const getFilterStyle = () => {
    if (colorblindFilter === 'monochrome') return { filter: 'grayscale(100%)' };
    if (colorblindFilter === 'protanopia') return { filter: 'url(#protanopia-filter)' };
    if (colorblindFilter === 'deuteranopia') return { filter: 'url(#deuteranopia-filter)' };
    if (colorblindFilter === 'tritanopia') return { filter: 'url(#tritanopia-filter)' };
    return {};
  };

  return (
    <div className="flex-1 flex flex-col h-full lg:h-[calc(100vh-53px)] bg-neutral-900/95 overflow-hidden relative">
      
      {/* Top Testing Command Toolbar */}
      <div className="border-b border-neutral-800/80 bg-neutral-950/90 px-3 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2.5 shrink-0 z-20">
        
        {/* Desktop Canvas Status Badge */}
        <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl text-xs font-semibold text-neutral-300">
          <Monitor className="w-4 h-4 text-sky-400" />
          <span>Desktop Canvas (100% Live Sync)</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-xl text-xs text-neutral-300">
          <button 
            onClick={() => setZoom(prev => Math.max(75, prev - 15))}
            className="p-0.5 hover:text-white"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] w-10 text-center">{zoom}%</span>
          <button 
            onClick={() => setZoom(prev => Math.min(130, prev + 15))}
            className="p-0.5 hover:text-white"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          {zoom !== 100 && (
            <button 
              onClick={() => setZoom(100)}
              className="text-[10px] text-sky-400 hover:underline ml-1"
            >
              Reset
            </button>
          )}
        </div>

        {/* Feature Testing Shortcuts */}
        <div className="flex items-center gap-2">
          <button
            onClick={triggerToast}
            className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-700/80 text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            title="Trigger real floating toast notification"
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span>Test Toast</span>
          </button>

          <button
            onClick={onOpenModalPreview}
            className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-700/80 text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            title="Open modal dialog to test radius, backdrop blur, and danger buttons"
          >
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>Test Modal</span>
          </button>

          {/* Colorblindness Simulator */}
          <div className="hidden lg:flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 rounded-xl px-2.5 py-1">
            <Eye className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <select
              value={colorblindFilter}
              onChange={(e) => setColorblindFilter(e.target.value as any)}
              className="bg-transparent text-neutral-300 text-xs focus:outline-none cursor-pointer"
            >
              <option value="none" className="bg-neutral-900">Vision: Normal</option>
              <option value="protanopia" className="bg-neutral-900">Protanopia</option>
              <option value="deuteranopia" className="bg-neutral-900">Deuteranopia</option>
              <option value="tritanopia" className="bg-neutral-900">Tritanopia</option>
              <option value="monochrome" className="bg-neutral-900">Grayscale</option>
            </select>
          </div>
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

      {/* Active Element Highlight Indicator */}
      {highlightedElement && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-sky-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <MousePointer className="w-3.5 h-3.5" />
          <span>Testing Token: {highlightedElement}</span>
        </div>
      )}

      {/* Main Canvas Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex justify-center items-start">
        
        {/* Outer Frame Wrapper with Zoom */}
        <div 
          className="transition-all duration-200 flex justify-center w-full"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            ...getFilterStyle(),
          }}
        >
          {/* Desktop Canvas Window */}
          <div className="w-full max-w-6xl rounded-2xl shadow-2xl border border-neutral-800 bg-neutral-950 overflow-hidden relative">
            
            {/* Desktop Mockup Browser Chrome Bar */}
            <div className="px-5 py-3 border-b border-neutral-800/80 bg-neutral-950/80 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-mono text-neutral-400 hidden sm:inline">https://devtint.github.io/design2prompt</span>
              </div>
              <div className="text-[11px] font-mono text-neutral-500">
                1440 × 900 • Desktop Preview
              </div>
            </div>

            {/* Inner Interactive Website Mockup */}
            <div 
              className="w-full min-h-[750px] relative"
              style={{
                ...cssVars,
                backgroundColor: 'var(--theme-bg)',
                color: 'var(--theme-text)',
                fontFamily: 'var(--theme-font-body)',
                lineHeight: 'var(--theme-line-height)',
                letterSpacing: 'var(--theme-letter-spacing)',
              }}
            >
              {/* 1. Navigation Bar */}
              <nav 
                className="px-6 sm:px-10 py-4 flex items-center justify-between border-b sticky top-0 z-20 backdrop-blur-md"
                style={{
                  borderColor: 'var(--theme-border)',
                  backgroundColor: theme.headerStyle === 'frosted' ? 'rgba(0,0,0,0.2)' : 'var(--theme-bg)',
                }}
              >
                <div 
                  onClick={() => flashHighlight('Navigation & Brand', 'foundation')}
                  className="flex items-center gap-2.5 cursor-pointer group"
                >
                  <div 
                    className="w-8 h-8 flex items-center justify-center font-black text-xs tracking-tighter shadow-sm group-hover:scale-105 transition-transform"
                    style={{
                      backgroundColor: 'var(--theme-primary)',
                      color: theme.isDark ? '#0A0B0E' : '#F8FAFC',
                      borderRadius: 'var(--theme-radius-card)',
                    }}
                  >
                    dt
                  </div>
                  <span className="font-extrabold tracking-tight text-base" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                    dev<span style={{ color: 'var(--theme-primary)' }}>tint</span>
                  </span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-xs opacity-80 font-medium">
                  <span className="hover:opacity-100 cursor-pointer">Platform</span>
                  <span className="hover:opacity-100 cursor-pointer">Components</span>
                  <span className="hover:opacity-100 cursor-pointer">Pricing</span>
                  <span className="hover:opacity-100 cursor-pointer">Security</span>
                  <span className="hover:opacity-100 cursor-pointer">Changelog</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      triggerToast();
                      flashHighlight('Primary Button', 'buttons');
                    }}
                    className="px-4 py-2 text-xs font-bold transition-all cursor-pointer hover:opacity-90 active:scale-95 shadow-sm"
                    style={{
                      backgroundColor: 'var(--theme-primary)',
                      color: theme.isDark ? '#0A0B0E' : '#F8FAFC',
                      borderRadius: 'var(--theme-radius-btn)',
                      boxShadow: 'var(--theme-shadow)',
                      border: `${theme.borderWidth}px solid var(--theme-primary)`,
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </nav>

              {/* 2. Interactive Feature Testing Banner */}
              <div 
                className="mx-6 sm:mx-10 my-6 p-4 border flex flex-wrap items-center justify-between gap-3 text-xs"
                style={{
                  backgroundColor: 'var(--theme-surface)',
                  borderColor: 'var(--theme-border)',
                  borderRadius: 'var(--theme-radius-card)',
                }}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 shrink-0" style={{ color: 'var(--theme-primary)' }} />
                  <span className="font-bold">Interactive Feature Lab:</span>
                  <span className="opacity-75">Click buttons below to test animations, focus rings, rate limiting, and dialog modals</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={triggerToast}
                    className="px-3 py-1.5 border font-semibold rounded-lg text-xs hover:bg-neutral-500/10 transition-colors cursor-pointer"
                    style={{ borderColor: 'var(--theme-border)' }}
                  >
                    🔔 Launch Toast
                  </button>
                  <button
                    onClick={onOpenModalPreview}
                    className="px-3 py-1.5 border font-semibold rounded-lg text-xs hover:bg-neutral-500/10 transition-colors cursor-pointer"
                    style={{ borderColor: 'var(--theme-border)' }}
                  >
                    🪟 Launch Modal
                  </button>
                </div>
              </div>

              {/* 3. Hero Section */}
              <section className="px-6 sm:px-10 py-12 sm:py-20 text-center max-w-4xl mx-auto space-y-6">
                {/* Status Pill Badge */}
                <div 
                  onClick={() => flashHighlight('Status Badge', 'cards')}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold shadow-sm cursor-pointer hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--theme-surface)',
                    border: `${theme.borderWidth}px solid var(--theme-border)`,
                    borderRadius: 'var(--theme-radius-btn)',
                    color: 'var(--theme-text)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: 'var(--theme-primary)' }} />
                  <span>Agentic Frontier Suite v2.0 • Production Ready</span>
                </div>

                {/* Heading */}
                <h1 
                  onClick={() => flashHighlight('Heading Typography', 'typography')}
                  className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight cursor-pointer px-4 break-words"
                  style={{ fontFamily: 'var(--theme-font-heading)' }}
                >
                  Architect systems with <span style={{ color: 'var(--theme-primary)' }}>deterministic precision</span>
                </h1>

                {/* Subtitle */}
                <p 
                  onClick={() => flashHighlight('Body Typography', 'typography')}
                  className="text-sm sm:text-base opacity-80 max-w-2xl mx-auto leading-relaxed cursor-pointer break-words px-4"
                >
                  Design, preview, and deploy high-performing frontend tokens, security architectures, and prompts tailored specifically for vibe coders and AI copilots.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
                  <button
                    onClick={() => {
                      triggerToast();
                      flashHighlight('Primary Button', 'buttons');
                    }}
                    className="px-6 py-3 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer hover:opacity-90 active:scale-95 shadow-md"
                    style={{
                      backgroundColor: 'var(--theme-primary)',
                      color: theme.isDark ? '#0A0B0E' : '#F8FAFC',
                      borderRadius: 'var(--theme-radius-btn)',
                      boxShadow: 'var(--theme-shadow)',
                      border: `${theme.borderWidth}px solid var(--theme-primary)`,
                    }}
                  >
                    <span>Trigger Live Toast</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>

                  <button
                    onClick={() => {
                      onOpenModalPreview();
                      flashHighlight('Modal Trigger Button', 'buttons');
                    }}
                    className="px-6 py-3 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer hover:bg-neutral-500/10 active:scale-95"
                    style={{
                      backgroundColor: 'var(--theme-surface)',
                      border: `${theme.borderWidth}px solid var(--theme-border)`,
                      borderRadius: 'var(--theme-radius-btn)',
                      color: 'var(--theme-text)',
                    }}
                  >
                    <span>Inspect Modal Dialog</span>
                  </button>
                </div>
              </section>

              {/* 4. Feature Cards Grid */}
              <section className="px-6 sm:px-10 pb-14">
                <div className="text-center mb-8">
                  <h2 className="font-bold text-lg sm:text-xl" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                    Core Architecture & Reliability
                  </h2>
                  <p className="text-xs opacity-75 mt-1">Click any card to inspect card tokens and elevation</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {[
                    { 
                      title: 'Agentic Core Engine', 
                      desc: 'Sub-millisecond prompt dispatching with chain-of-thought verification across 14 edge regions.', 
                      icon: Zap,
                      tag: 'Active' 
                    },
                    { 
                      title: 'Deterministic Tokens', 
                      desc: 'Strict mathematical WCAG color contrast & pixel-perfect radii parity without visual hallucination.', 
                      icon: Lock,
                      tag: '99.9%' 
                    },
                    { 
                      title: 'Zero-Cost Sharing', 
                      desc: 'Client-side URL hash compression for instant team collaboration with zero database or server cost.', 
                      icon: Sliders,
                      tag: 'Hash' 
                    },
                  ].map((card, i) => (
                    <div
                      key={i}
                      onClick={() => flashHighlight(`Card Component #${i + 1}`, 'cards')}
                      className="p-6 flex flex-col justify-between transition-all cursor-pointer hover:scale-[1.01] overflow-hidden"
                      style={{
                        backgroundColor: 'var(--theme-surface)',
                        border: `${theme.borderWidth}px solid var(--theme-border)`,
                        borderRadius: 'var(--theme-radius-card)',
                        boxShadow: 'var(--theme-shadow)',
                      }}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <div 
                            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              color: 'var(--theme-primary)',
                            }}
                          >
                            <card.icon className="w-5 h-5" />
                          </div>
                          <span 
                            className="text-[10px] font-mono font-bold px-2.5 py-1 shrink-0"
                            style={{
                              backgroundColor: 'var(--theme-bg)',
                              borderRadius: 'var(--theme-radius-btn)',
                              border: `${theme.borderWidth}px solid var(--theme-border)`,
                            }}
                          >
                            {card.tag}
                          </span>
                        </div>

                        <h3 className="font-bold text-base break-words" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                          {card.title}
                        </h3>
                        <p className="text-xs opacity-75 leading-relaxed break-words">
                          {card.desc}
                        </p>
                      </div>

                      <div className="pt-5 flex items-center justify-between text-xs font-semibold" style={{ color: 'var(--theme-primary)' }}>
                        <span>Explore details</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. Interactive Pricing Switcher Section */}
              <section className="px-6 sm:px-10 pb-14">
                <div 
                  className="p-8 border space-y-6 overflow-hidden"
                  style={{
                    backgroundColor: 'var(--theme-surface)',
                    borderColor: 'var(--theme-border)',
                    borderRadius: 'var(--theme-radius-card)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-base sm:text-lg" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                        Pricing & Tier Component
                      </h3>
                      <p className="text-xs opacity-75 mt-0.5">Toggle billing interval to test interactive state changes and badge pills</p>
                    </div>

                    {/* Monthly / Yearly Toggle */}
                    <div 
                      className="inline-flex p-1 border rounded-xl self-start"
                      style={{ borderColor: 'var(--theme-border)' }}
                    >
                      <button
                        onClick={() => setPricingBilling('monthly')}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          pricingBilling === 'monthly' ? 'bg-neutral-500/20 text-white font-bold shadow-sm' : 'opacity-60'
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        onClick={() => setPricingBilling('yearly')}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          pricingBilling === 'yearly' ? 'bg-neutral-500/20 text-white font-bold shadow-sm' : 'opacity-60'
                        }`}
                      >
                        Yearly <span className="text-[10px] text-emerald-400 font-bold ml-1">-20%</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Starter Tier */}
                    <div 
                      className="p-6 border flex flex-col justify-between space-y-5"
                      style={{
                        borderColor: 'var(--theme-border)',
                        borderRadius: 'var(--theme-radius-card)',
                        backgroundColor: 'var(--theme-bg)',
                      }}
                    >
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider opacity-70">Starter Free</div>
                        <div className="text-3xl font-extrabold mt-1">
                          $0
                          <span className="text-xs font-normal opacity-70"> / forever</span>
                        </div>
                        <p className="text-xs opacity-75 mt-2.5 leading-relaxed">
                          Perfect for individual vibe coders, rapid experiments, and open-source hobbyists.
                        </p>
                      </div>
                      <button
                        onClick={triggerToast}
                        className="w-full py-2.5 text-xs font-bold border transition-all hover:bg-neutral-500/10 cursor-pointer"
                        style={{
                          borderColor: 'var(--theme-border)',
                          borderRadius: 'var(--theme-radius-btn)',
                        }}
                      >
                        Get Free Tier
                      </button>
                    </div>

                    {/* Pro Tier (Featured) */}
                    <div 
                      className="p-6 border flex flex-col justify-between space-y-5 relative"
                      style={{
                        borderColor: 'var(--theme-primary)',
                        borderRadius: 'var(--theme-radius-card)',
                        backgroundColor: 'var(--theme-bg)',
                        boxShadow: 'var(--theme-shadow)',
                      }}
                    >
                      <span 
                        className="absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1"
                        style={{
                          backgroundColor: 'var(--theme-primary)',
                          color: theme.isDark ? '#0A0B0E' : '#F8FAFC',
                          borderRadius: 'var(--theme-radius-btn)',
                        }}
                      >
                        MOST POPULAR
                      </span>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--theme-primary)' }}>
                          Enterprise Pro
                        </div>
                        <div className="text-3xl font-extrabold mt-1">
                          {pricingBilling === 'monthly' ? '$29' : '$24'}
                          <span className="text-xs font-normal opacity-70"> / month</span>
                        </div>
                        <p className="text-xs opacity-75 mt-2.5 leading-relaxed">
                          Unlimited prompt exports, custom token schemas, database branching, and priority LLM token limits.
                        </p>
                      </div>
                      <button
                        onClick={triggerToast}
                        className="w-full py-2.5 text-xs font-bold transition-all cursor-pointer hover:opacity-90 shadow-md"
                        style={{
                          backgroundColor: 'var(--theme-primary)',
                          color: theme.isDark ? '#0A0B0E' : '#F8FAFC',
                          borderRadius: 'var(--theme-radius-btn)',
                        }}
                      >
                        Upgrade to Pro
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* 6. Interactive Form & Validation Sandbox */}
              <section className="px-6 sm:px-10 pb-14">
                <div 
                  className="p-6 sm:p-8 border space-y-5 overflow-hidden"
                  style={{
                    backgroundColor: 'var(--theme-surface)',
                    borderColor: 'var(--theme-border)',
                    borderRadius: 'var(--theme-radius-card)',
                  }}
                >
                  <div>
                    <h3 className="font-bold text-base sm:text-lg" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                      Interactive Form Validation Test
                    </h3>
                    <p className="text-xs opacity-75 mt-0.5">
                      Type an email or click validate with an empty box to test error shake and success checkmarks.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
                    <input
                      type="text"
                      placeholder="Enter test email address..."
                      value={formInput}
                      onChange={(e) => {
                        setFormInput(e.target.value);
                        if (formStatus !== 'idle') setFormStatus('idle');
                      }}
                      className={`w-full min-w-0 px-4 py-2.5 text-xs transition-all focus:outline-none ${
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
                      className="px-6 py-2.5 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 hover:opacity-90 shadow-sm"
                      style={{
                        backgroundColor: 'var(--theme-primary)',
                        color: theme.isDark ? '#0A0B0E' : '#F8FAFC',
                        borderRadius: 'var(--theme-radius-btn)',
                      }}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Validate</span>
                    </button>
                  </div>

                  {formStatus === 'error' && (
                    <div className="text-xs text-red-400 flex items-center gap-2 animate-bounce">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Validation Error: Input cannot be empty! Focus ring and error borders triggered.</span>
                    </div>
                  )}

                  {formStatus === 'success' && (
                    <div className="text-xs text-emerald-400 flex items-center gap-2">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Validation Passed: Input successfully verified according to theme constraints.</span>
                    </div>
                  )}
                </div>
              </section>

              {/* 7. Interactive Security, Database, Hosting & Rate Limiter Center */}
              <section className="px-6 sm:px-10 pb-14">
                <div 
                  className="p-6 sm:p-8 border space-y-6 overflow-hidden"
                  style={{
                    backgroundColor: 'var(--theme-surface)',
                    borderColor: 'var(--theme-border)',
                    borderRadius: 'var(--theme-radius-card)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-5" style={{ borderColor: 'var(--theme-border)' }}>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-emerald-400 font-bold text-xs bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                          A+ SECURITY GRADE
                        </span>
                        <h3 className="font-bold text-base sm:text-lg" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                          Security & Architecture Matrix
                        </h3>
                      </div>
                      <p className="text-xs opacity-75 mt-1">Real-time simulation of rate limits, headers, authentication, and database connectivity</p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="opacity-80">SSL 256-bit TLS 1.3 • Zero Vulnerabilities</span>
                    </div>
                  </div>

                  {/* Rate Limiter Simulator Box */}
                  <div 
                    className="p-5 border rounded-2xl space-y-3.5"
                    style={{
                      borderColor: isRateLimited ? '#ef4444' : 'var(--theme-border)',
                      backgroundColor: isRateLimited ? 'rgba(239, 68, 68, 0.08)' : 'var(--theme-bg)',
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold flex items-center gap-2">
                          <span className={isRateLimited ? 'text-red-400' : 'text-sky-400'}>⚡ Rate Limiter Status:</span>
                          <span className="font-mono">{isRateLimited ? 'BLOCKED (429 Too Many Requests)' : 'Active (Sliding Window)'}</span>
                        </div>
                        <div className="text-xs opacity-75 mt-1">
                          Provider: <strong className="text-white">{theme.security.rateLimiting.provider}</strong> • Limit: {theme.security.rateLimiting.maxRequestsPerWindow} req / {theme.security.rateLimiting.windowSeconds}s
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-neutral-500/20">
                          Tokens: {rateLimitTokens} / 5
                        </span>
                        <button
                          onClick={handleTestRateLimit}
                          disabled={isRateLimited}
                          className="px-4 py-2 text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
                          style={{
                            backgroundColor: isRateLimited ? '#ef4444' : 'var(--theme-primary)',
                            color: theme.isDark ? '#0A0B0E' : '#F8FAFC',
                            borderRadius: 'var(--theme-radius-btn)',
                          }}
                        >
                          {isRateLimited ? 'Rate Limit Exceeded!' : 'Spam Request'}
                        </button>
                        {isRateLimited && (
                          <button
                            onClick={() => {
                              setRateLimitTokens(5);
                              setIsRateLimited(false);
                            }}
                            className="px-3 py-1.5 text-xs border border-neutral-700 rounded-lg hover:bg-neutral-800 text-neutral-300"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Progress Quota Bar */}
                    <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          isRateLimited ? 'bg-red-500 w-full animate-pulse' : 'bg-sky-400'
                        }`}
                        style={{ width: isRateLimited ? '100%' : `${(rateLimitTokens / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Architecture Badges Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                    <div className="p-3.5 border rounded-xl bg-neutral-500/5 space-y-1" style={{ borderColor: 'var(--theme-border)' }}>
                      <div className="text-[10px] uppercase font-bold text-neutral-400">
                        Auth Methods ({(theme.security.authMethods || []).length || 1})
                      </div>
                      <div className="font-semibold truncate capitalize">
                        {(theme.security.authMethods || [theme.security.authStrategy || 'session-cookies'])
                          .map(m => m.replace(/-/g, ' '))
                          .join(', ')}
                      </div>
                      <div className="text-[10px] text-emerald-400">
                        ✓ {(theme.security.defenses || []).length || 8} Active Defenses
                      </div>
                    </div>

                    <div className="p-3.5 border rounded-xl bg-neutral-500/5 space-y-1" style={{ borderColor: 'var(--theme-border)' }}>
                      <div className="text-[10px] uppercase font-bold text-neutral-400">Database & ORM</div>
                      <div className="font-semibold truncate">{theme.backend.database}</div>
                      <div className="text-[10px] text-indigo-400">✓ {theme.backend.orm.toUpperCase()} Pooled</div>
                    </div>

                    <div className="p-3.5 border rounded-xl bg-neutral-500/5 space-y-1" style={{ borderColor: 'var(--theme-border)' }}>
                      <div className="text-[10px] uppercase font-bold text-neutral-400">Validation & Sanitization</div>
                      <div className="font-semibold truncate">{theme.security.inputValidation.toUpperCase()} Schema</div>
                      <div className="text-[10px] text-emerald-400">✓ Strict Payload Check</div>
                    </div>

                    <div className="p-3.5 border rounded-xl bg-neutral-500/5 space-y-1" style={{ borderColor: 'var(--theme-border)' }}>
                      <div className="text-[10px] uppercase font-bold text-neutral-400">Runtime & Hosting</div>
                      <div className="font-semibold truncate">{theme.backend.runtime} on {theme.backend.hosting}</div>
                      <div className="text-[10px] text-amber-400">✓ {theme.backend.apiStyle.toUpperCase()} API</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 8. Interactive Accordion FAQ Section */}
              <section className="px-6 sm:px-10 pb-14">
                <div 
                  className="p-6 sm:p-8 border space-y-4 overflow-hidden"
                  style={{
                    backgroundColor: 'var(--theme-surface)',
                    borderColor: 'var(--theme-border)',
                    borderRadius: 'var(--theme-radius-card)',
                  }}
                >
                  <h3 className="font-bold text-base sm:text-lg mb-2" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                    Frequently Asked Questions
                  </h3>

                  {[
                    { q: 'How does Design2Prompt integrate with Claude & Cursor?', a: 'Click the "Export Prompt" button at the top right to copy a ready-to-paste .cursorrules file or Claude system prompt containing your exact theme and security architecture tokens.' },
                    { q: 'Can I export ready-to-use Tailwind CSS v4 code?', a: 'Yes! The export modal includes a dedicated Tailwind @theme code block that matches the exact colors, typography, and radii chosen in this preview.' },
                    { q: 'Do themes require a backend database to share?', a: 'No. The entire theme is compressed into a URL hash parameter, allowing you to share custom themes via link with zero server cost.' },
                  ].map((faq, idx) => (
                    <div 
                      key={idx}
                      className="border rounded-xl overflow-hidden"
                      style={{ borderColor: 'var(--theme-border)' }}
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                        className="w-full p-4 text-left text-xs font-semibold flex items-center justify-between gap-3 hover:bg-neutral-500/5 transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedFaq === idx && (
                        <div className="px-4 pb-4 text-xs opacity-75 leading-relaxed border-t pt-3" style={{ borderColor: 'var(--theme-border)' }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* 9. Alert Banner Showcase */}
              <section className="px-6 sm:px-10 pb-14">
                <div 
                  className="p-5 flex items-center justify-between text-xs border overflow-hidden gap-4"
                  style={{
                    backgroundColor: 'rgba(56, 189, 248, 0.08)',
                    borderColor: 'var(--theme-border)',
                    borderLeftWidth: theme.alertStyle === 'left-bar' ? '4px' : `${theme.borderWidth}px`,
                    borderLeftColor: 'var(--theme-primary)',
                    borderRadius: 'var(--theme-radius-card)',
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Info className="w-5 h-5 shrink-0" style={{ color: 'var(--theme-primary)' }} />
                    <span className="break-words">
                      Active Theme: <strong>{theme.name}</strong> is dynamically applied across all desktop preview components.
                    </span>
                  </div>
                  <span className="text-[10px] font-mono opacity-60 shrink-0 hidden sm:inline">LIVE SYNC ACTIVE</span>
                </div>
              </section>

              {/* 10. Footer */}
              <footer 
                className="px-6 sm:px-10 py-8 border-t flex flex-wrap items-center justify-between gap-4 text-xs opacity-75"
                style={{ borderColor: 'var(--theme-border)' }}
              >
                <span>© 2026 devtint. Powered by Design2Prompt.</span>
                <div className="flex gap-6">
                  <span className="hover:underline cursor-pointer">Privacy</span>
                  <span className="hover:underline cursor-pointer">Terms</span>
                  <span className="hover:underline cursor-pointer">Security Specs</span>
                  <span className="hover:underline cursor-pointer">Docs</span>
                </div>
              </footer>

              {/* Live Toast Notification Anchored Directly Inside Canvas Window */}
              {activeToast && (
                <div 
                  className="absolute bottom-8 right-8 z-40 p-4 border flex items-center gap-3 shadow-2xl animate-fade-in max-w-sm"
                  style={{
                    backgroundColor: 'var(--theme-surface)',
                    borderColor: 'var(--theme-border)',
                    borderRadius: 'var(--theme-radius-card)',
                    color: 'var(--theme-text)',
                    boxShadow: 'var(--theme-shadow)',
                  }}
                >
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: 'var(--theme-primary)', color: theme.isDark ? '#0A0B0E' : '#F8FAFC' }}
                  >
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold truncate">Toast Notification Fired!</div>
                    <div className="text-[10px] opacity-75 truncate">Theme motion & radius applied in real-time</div>
                  </div>
                  <button 
                    onClick={() => setActiveToast(false)}
                    className="ml-auto opacity-50 hover:opacity-100 p-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
