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
  Sliders,
  ChevronDown,
  Layers,
  ZoomIn,
  ZoomOut,
  MousePointer,
  HelpCircle,
  CreditCard,
  Table as TableIcon
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
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
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

  const isMobileViewport = viewport === 'mobile';
  const isTabletViewport = viewport === 'tablet';

  return (
    <div className="flex-1 flex flex-col h-full lg:h-[calc(100vh-53px)] bg-neutral-900/95 overflow-hidden relative">
      
      {/* Top Device & Testing Command Toolbar */}
      <div className="border-b border-neutral-800/80 bg-neutral-950/90 px-3 sm:px-5 py-2 flex flex-wrap items-center justify-between gap-2.5 shrink-0 z-20">
        
        {/* Device Switcher */}
        <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 p-1 rounded-xl">
          <button
            onClick={() => setViewport('desktop')}
            title="Desktop Canvas"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
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
            title="Tablet View (768px)"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
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
            title="Realistic Smartphone (390px)"
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
              viewport === 'mobile' 
                ? 'bg-neutral-800 text-sky-400 shadow-sm' 
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile Phone</span>
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="hidden md:flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 px-2 py-1 rounded-xl text-xs text-neutral-300">
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
        <div className="flex items-center gap-1.5">
          <button
            onClick={triggerToast}
            className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-700/80 text-white px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
            title="Trigger real floating toast notification"
          >
            <Bell className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Test Toast</span>
          </button>

          <button
            onClick={onOpenModalPreview}
            className="flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-700/80 text-white px-2.5 py-1 rounded-lg text-xs font-semibold transition-all"
            title="Open modal dialog to test radius, backdrop blur, and danger buttons"
          >
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Test Modal</span>
          </button>

          {/* Colorblindness Simulator */}
          <div className="hidden lg:flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-xl px-2 py-0.5">
            <Eye className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <select
              value={colorblindFilter}
              onChange={(e) => setColorblindFilter(e.target.value as any)}
              className="bg-transparent text-neutral-300 text-xs py-1 focus:outline-none cursor-pointer"
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
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-30 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
          <MousePointer className="w-3.5 h-3.5" />
          <span>Testing: {highlightedElement}</span>
        </div>
      )}

      {/* Main Canvas Scroll Area */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-5 lg:p-6 flex justify-center items-start">
        
        {/* Outer Frame Wrapper with Zoom */}
        <div 
          className="transition-all duration-200 flex justify-center w-full"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            ...getFilterStyle(),
          }}
        >
          {/* Viewport Frame */}
          <div 
            className={`transition-all duration-300 relative ${
              isMobileViewport 
                ? 'w-[400px] sm:w-[425px] max-w-full my-4 bg-neutral-950 p-3 sm:p-3.5 rounded-[52px] border-[8px] sm:border-[10px] border-neutral-800 shadow-2xl ring-1 ring-white/10 relative' 
                : isTabletViewport 
                  ? 'w-[768px] max-w-full rounded-2xl shadow-2xl border border-neutral-800 overflow-hidden'
                  : 'w-full max-w-5xl rounded-2xl shadow-2xl border border-neutral-800 overflow-hidden'
            }`}
          >
            {/* Phone Status Bar + Dynamic Island (Rendered ONLY in mobile viewport) */}
            {isMobileViewport && (
              <div className="bg-black text-white px-6 pt-3 pb-2 rounded-t-[40px] flex items-center justify-between select-none relative">
                <span className="text-xs font-bold tracking-tight">9:41</span>
                
                {/* Dynamic Island Pill */}
                <div className="w-24 h-5 bg-neutral-900 rounded-full flex items-center justify-end px-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                <div className="flex items-center gap-1.5 opacity-90 text-xs">
                  <Wifi className="w-3.5 h-3.5" />
                  <BatteryMedium className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* Inner Interactive Website Mockup */}
            <div 
              className={`transition-all duration-300 overflow-y-auto relative ${
                isMobileViewport 
                  ? 'h-[720px] sm:h-[780px] rounded-b-[40px] rounded-t-[16px]' 
                  : 'w-full min-h-[700px]'
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
              {/* 1. Navigation Bar */}
              <nav 
                className="px-5 sm:px-8 py-4 flex items-center justify-between border-b sticky top-0 z-20 backdrop-blur-md"
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
                    className="w-7 h-7 flex items-center justify-center font-bold text-xs shadow-sm group-hover:scale-105 transition-transform"
                    style={{
                      backgroundColor: 'var(--theme-primary)',
                      color: theme.isDark ? '#000000' : '#ffffff',
                      borderRadius: 'var(--theme-radius-card)',
                    }}
                  >
                    ▲
                  </div>
                  <span className="font-extrabold tracking-tight text-sm" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                    Nexus<span style={{ color: 'var(--theme-primary)' }}>AI</span>
                  </span>
                </div>

                {!isMobileViewport && (
                  <div className="hidden md:flex items-center gap-6 text-xs opacity-80 font-medium">
                    <span className="hover:opacity-100 cursor-pointer">Platform</span>
                    <span className="hover:opacity-100 cursor-pointer">Components</span>
                    <span className="hover:opacity-100 cursor-pointer">Pricing</span>
                    <span className="hover:opacity-100 cursor-pointer">Changelog</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      triggerToast();
                      flashHighlight('Primary Button', 'buttons');
                    }}
                    className="px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer hover:opacity-90 active:scale-95"
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

              {/* 2. Interactive Feature Testing Banner */}
              <div 
                className="mx-4 sm:mx-8 my-4 p-3.5 border flex flex-wrap items-center justify-between gap-3 text-xs"
                style={{
                  backgroundColor: 'var(--theme-surface)',
                  borderColor: 'var(--theme-border)',
                  borderRadius: 'var(--theme-radius-card)',
                }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0" style={{ color: 'var(--theme-primary)' }} />
                  <span className="font-bold">Interactive Feature Lab:</span>
                  <span className="opacity-75 hidden sm:inline">Click buttons below to see theme tokens in action</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={triggerToast}
                    className="px-2.5 py-1 border font-semibold rounded text-[11px] hover:bg-neutral-500/10 transition-colors"
                    style={{ borderColor: 'var(--theme-border)' }}
                  >
                    🔔 Launch Toast
                  </button>
                  <button
                    onClick={onOpenModalPreview}
                    className="px-2.5 py-1 border font-semibold rounded text-[11px] hover:bg-neutral-500/10 transition-colors"
                    style={{ borderColor: 'var(--theme-border)' }}
                  >
                    🪟 Launch Modal
                  </button>
                </div>
              </div>

              {/* 3. Hero Section */}
              <section className="px-5 sm:px-8 py-8 sm:py-14 text-center max-w-3xl mx-auto space-y-4 sm:space-y-5">
                {/* Status Pill Badge */}
                <div 
                  onClick={() => flashHighlight('Status Badge', 'cards')}
                  className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold shadow-sm cursor-pointer hover:opacity-90"
                  style={{
                    backgroundColor: 'var(--theme-surface)',
                    border: `${theme.borderWidth}px solid var(--theme-border)`,
                    borderRadius: 'var(--theme-radius-btn)',
                    color: 'var(--theme-text)',
                  }}
                >
                  <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: 'var(--theme-primary)' }} />
                  <span>Agentic Frontier Suite v2.0</span>
                </div>

                {/* Heading */}
                <h1 
                  onClick={() => flashHighlight('Heading Typography', 'typography')}
                  className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight cursor-pointer px-2 break-words"
                  style={{ fontFamily: 'var(--theme-font-heading)' }}
                >
                  Architect systems with <span style={{ color: 'var(--theme-primary)' }}>deterministic precision</span>
                </h1>

                {/* Subtitle */}
                <p 
                  onClick={() => flashHighlight('Body Typography', 'typography')}
                  className="text-xs sm:text-sm opacity-80 max-w-lg mx-auto leading-relaxed cursor-pointer break-words px-2"
                >
                  Design, preview, and deploy high-performing frontend tokens and prompts tailored specifically for vibe coders and AI copilots.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-xs sm:max-w-none mx-auto w-full">
                  <button
                    onClick={() => {
                      triggerToast();
                      flashHighlight('Primary Button', 'buttons');
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer hover:opacity-90 active:scale-95 shadow-md"
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
                    onClick={() => {
                      onOpenModalPreview();
                      flashHighlight('Modal Trigger Button', 'buttons');
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer hover:bg-neutral-500/10 active:scale-95"
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

              {/* 4. Feature Cards Grid (CRITICAL FIX: Responsive 1-col on phone frame, 3-col on desktop!) */}
              <section className="px-5 sm:px-8 pb-10">
                <div className="text-center mb-6">
                  <h2 className="font-bold text-base sm:text-lg" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                    Core Architecture
                  </h2>
                  <p className="text-xs opacity-75">Click any card to inspect card tokens</p>
                </div>

                <div 
                  className={`grid gap-4 ${
                    isMobileViewport ? 'grid-cols-1' : isTabletViewport ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3'
                  }`}
                >
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
                      className="p-5 flex flex-col justify-between transition-all cursor-pointer hover:scale-[1.01] overflow-hidden"
                      style={{
                        backgroundColor: 'var(--theme-surface)',
                        border: `${theme.borderWidth}px solid var(--theme-border)`,
                        borderRadius: 'var(--theme-radius-card)',
                        boxShadow: 'var(--theme-shadow)',
                      }}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.05)',
                              color: 'var(--theme-primary)',
                            }}
                          >
                            <card.icon className="w-4 h-4" />
                          </div>
                          <span 
                            className="text-[10px] font-mono font-bold px-2 py-0.5 shrink-0"
                            style={{
                              backgroundColor: 'var(--theme-bg)',
                              borderRadius: 'var(--theme-radius-btn)',
                              border: `${theme.borderWidth}px solid var(--theme-border)`,
                            }}
                          >
                            {card.tag}
                          </span>
                        </div>

                        <h3 className="font-bold text-sm break-words" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                          {card.title}
                        </h3>
                        <p className="text-xs opacity-75 leading-relaxed break-words">
                          {card.desc}
                        </p>
                      </div>

                      <div className="pt-4 flex items-center justify-between text-xs font-semibold" style={{ color: 'var(--theme-primary)' }}>
                        <span>Explore details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. Interactive Pricing Switcher Section */}
              <section className="px-5 sm:px-8 pb-10">
                <div 
                  className="p-6 border space-y-6 overflow-hidden"
                  style={{
                    backgroundColor: 'var(--theme-surface)',
                    borderColor: 'var(--theme-border)',
                    borderRadius: 'var(--theme-radius-card)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-sm sm:text-base" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                        Pricing & Tier Component
                      </h3>
                      <p className="text-xs opacity-75">Toggle billing interval to test interactive state changes</p>
                    </div>

                    {/* Monthly / Yearly Toggle */}
                    <div 
                      className="inline-flex p-1 border rounded-lg self-start"
                      style={{ borderColor: 'var(--theme-border)' }}
                    >
                      <button
                        onClick={() => setPricingBilling('monthly')}
                        className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                          pricingBilling === 'monthly' ? 'bg-neutral-500/20 text-white font-bold' : 'opacity-60'
                        }`}
                      >
                        Monthly
                      </button>
                      <button
                        onClick={() => setPricingBilling('yearly')}
                        className={`px-3 py-1 text-xs font-semibold rounded transition-all ${
                          pricingBilling === 'yearly' ? 'bg-neutral-500/20 text-white font-bold' : 'opacity-60'
                        }`}
                      >
                        Yearly <span className="text-[10px] text-emerald-400 font-bold">-20%</span>
                      </button>
                    </div>
                  </div>

                  <div className={`grid gap-4 ${isMobileViewport ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                    {/* Starter Tier */}
                    <div 
                      className="p-5 border flex flex-col justify-between space-y-4"
                      style={{
                        borderColor: 'var(--theme-border)',
                        borderRadius: 'var(--theme-radius-card)',
                        backgroundColor: 'var(--theme-bg)',
                      }}
                    >
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider opacity-70">Starter</div>
                        <div className="text-2xl font-extrabold mt-1">
                          {pricingBilling === 'monthly' ? '$0' : '$0'}
                          <span className="text-xs font-normal opacity-70"> / forever</span>
                        </div>
                        <p className="text-xs opacity-75 mt-2">Perfect for hobbyists and individual vibe coders.</p>
                      </div>
                      <button
                        onClick={triggerToast}
                        className="w-full py-2 text-xs font-bold border transition-all hover:bg-neutral-500/10 cursor-pointer"
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
                      className="p-5 border flex flex-col justify-between space-y-4 relative"
                      style={{
                        borderColor: 'var(--theme-primary)',
                        borderRadius: 'var(--theme-radius-card)',
                        backgroundColor: 'var(--theme-bg)',
                        boxShadow: 'var(--theme-shadow)',
                      }}
                    >
                      <span 
                        className="absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5"
                        style={{
                          backgroundColor: 'var(--theme-primary)',
                          color: theme.isDark ? '#000' : '#fff',
                          borderRadius: 'var(--theme-radius-btn)',
                        }}
                      >
                        POPULAR
                      </span>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--theme-primary)' }}>
                          Enterprise Pro
                        </div>
                        <div className="text-2xl font-extrabold mt-1">
                          {pricingBilling === 'monthly' ? '$29' : '$24'}
                          <span className="text-xs font-normal opacity-70"> / month</span>
                        </div>
                        <p className="text-xs opacity-75 mt-2">Unlimited prompt exports, custom token schemas, and team seats.</p>
                      </div>
                      <button
                        onClick={triggerToast}
                        className="w-full py-2 text-xs font-bold transition-all cursor-pointer hover:opacity-90 shadow-md"
                        style={{
                          backgroundColor: 'var(--theme-primary)',
                          color: theme.isDark ? '#000' : '#fff',
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
              <section className="px-5 sm:px-8 pb-10">
                <div 
                  className="p-5 sm:p-6 border space-y-4 overflow-hidden"
                  style={{
                    backgroundColor: 'var(--theme-surface)',
                    borderColor: 'var(--theme-border)',
                    borderRadius: 'var(--theme-radius-card)',
                  }}
                >
                  <div>
                    <h3 className="font-bold text-sm sm:text-base" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                      Interactive Form Validation Test
                    </h3>
                    <p className="text-xs opacity-75">
                      Type an email or click validate with an empty box to test error shake and success checkmarks.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      type="text"
                      placeholder="Enter test email address..."
                      value={formInput}
                      onChange={(e) => {
                        setFormInput(e.target.value);
                        if (formStatus !== 'idle') setFormStatus('idle');
                      }}
                      className={`w-full min-w-0 px-3.5 py-2.5 text-xs transition-all focus:outline-none ${
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
                      className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 hover:opacity-90 shadow-sm"
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
                    <div className="text-xs text-red-400 flex items-center gap-1.5 animate-bounce">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Validation Error: Input cannot be empty! Focus ring and error borders triggered.</span>
                    </div>
                  )}

                  {formStatus === 'success' && (
                    <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      <span>Validation Passed: Input successfully verified according to theme constraints.</span>
                    </div>
                  )}
                </div>
              </section>

              {/* 7. Interactive Accordion FAQ Section */}
              <section className="px-5 sm:px-8 pb-10">
                <div 
                  className="p-5 sm:p-6 border space-y-3 overflow-hidden"
                  style={{
                    backgroundColor: 'var(--theme-surface)',
                    borderColor: 'var(--theme-border)',
                    borderRadius: 'var(--theme-radius-card)',
                  }}
                >
                  <h3 className="font-bold text-sm sm:text-base mb-2" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                    Frequently Asked Questions
                  </h3>

                  {[
                    { q: 'How does Design2Prompt integrate with Claude & Cursor?', a: 'Click the "Export Prompt" button at the top right to copy a ready-to-paste .cursorrules file or Claude system prompt containing your exact theme tokens.' },
                    { q: 'Can I export ready-to-use Tailwind CSS v4 code?', a: 'Yes! The export modal includes a dedicated Tailwind @theme code block that matches the exact colors and radii chosen in this preview.' },
                    { q: 'Do themes require a server to share?', a: 'No. The entire theme is compressed into a URL hash parameter, allowing you to share custom themes via link with zero server cost.' },
                  ].map((faq, idx) => (
                    <div 
                      key={idx}
                      className="border rounded-lg overflow-hidden"
                      style={{ borderColor: 'var(--theme-border)' }}
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                        className="w-full p-3 text-left text-xs font-semibold flex items-center justify-between gap-2 hover:bg-neutral-500/5 transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedFaq === idx && (
                        <div className="px-3 pb-3 text-xs opacity-75 leading-relaxed border-t pt-2" style={{ borderColor: 'var(--theme-border)' }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Interactive Security, Database, Hosting & Rate Limiter Center */}
              <section className="px-5 sm:px-8 pb-10">
                <div 
                  className="p-5 sm:p-6 border space-y-5 overflow-hidden"
                  style={{
                    backgroundColor: 'var(--theme-surface)',
                    borderColor: 'var(--theme-border)',
                    borderRadius: 'var(--theme-radius-card)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4" style={{ borderColor: 'var(--theme-border)' }}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold text-xs bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                          A+ SECURITY GRADE
                        </span>
                        <h3 className="font-bold text-sm sm:text-base" style={{ fontFamily: 'var(--theme-font-heading)' }}>
                          Security & Architecture Matrix
                        </h3>
                      </div>
                      <p className="text-xs opacity-75 mt-1">Live simulation of rate limits, headers, and database connectivity</p>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="opacity-80">SSL 256-bit TLS 1.3</span>
                    </div>
                  </div>

                  {/* Rate Limiter Simulator Box */}
                  <div 
                    className="p-4 border rounded-xl space-y-3"
                    style={{
                      borderColor: isRateLimited ? '#ef4444' : 'var(--theme-border)',
                      backgroundColor: isRateLimited ? 'rgba(239, 68, 68, 0.08)' : 'var(--theme-bg)',
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="text-xs font-bold flex items-center gap-1.5">
                          <span className={isRateLimited ? 'text-red-400' : 'text-sky-400'}>⚡ Rate Limiter Status:</span>
                          <span className="font-mono">{isRateLimited ? 'BLOCKED (429 Too Many Requests)' : 'Active (Sliding Window)'}</span>
                        </div>
                        <div className="text-[11px] opacity-75 mt-0.5">
                          Provider: <strong className="text-white">{theme.security.rateLimiting.provider}</strong> • Limit: {theme.security.rateLimiting.maxRequestsPerWindow} req / {theme.security.rateLimiting.windowSeconds}s
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-neutral-500/20">
                          Tokens: {rateLimitTokens} / 5
                        </span>
                        <button
                          onClick={handleTestRateLimit}
                          disabled={isRateLimited}
                          className="px-3 py-1.5 text-xs font-bold rounded-lg transition-all shadow-sm cursor-pointer disabled:opacity-50"
                          style={{
                            backgroundColor: isRateLimited ? '#ef4444' : 'var(--theme-primary)',
                            color: theme.isDark ? '#000' : '#fff',
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
                            className="px-2 py-1 text-[11px] border border-neutral-700 rounded hover:bg-neutral-800 text-neutral-300"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Progress Quota Bar */}
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          isRateLimited ? 'bg-red-500 w-full animate-pulse' : 'bg-sky-400'
                        }`}
                        style={{ width: isRateLimited ? '100%' : `${(rateLimitTokens / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Architecture Badges Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
                    <div className="p-3 border rounded-xl bg-neutral-500/5 space-y-1" style={{ borderColor: 'var(--theme-border)' }}>
                      <div className="text-[10px] uppercase font-bold text-neutral-400">Authentication</div>
                      <div className="font-semibold truncate">{theme.security.authStrategy}</div>
                      <div className="text-[10px] text-emerald-400">✓ CSRF Protected</div>
                    </div>

                    <div className="p-3 border rounded-xl bg-neutral-500/5 space-y-1" style={{ borderColor: 'var(--theme-border)' }}>
                      <div className="text-[10px] uppercase font-bold text-neutral-400">Database & ORM</div>
                      <div className="font-semibold truncate">{theme.backend.database}</div>
                      <div className="text-[10px] text-indigo-400">✓ {theme.backend.orm.toUpperCase()} Pooled</div>
                    </div>

                    <div className="p-3 border rounded-xl bg-neutral-500/5 space-y-1" style={{ borderColor: 'var(--theme-border)' }}>
                      <div className="text-[10px] uppercase font-bold text-neutral-400">Validation & Sanitization</div>
                      <div className="font-semibold truncate">{theme.security.inputValidation.toUpperCase()} Schema</div>
                      <div className="text-[10px] text-emerald-400">✓ Strict Payload Check</div>
                    </div>

                    <div className="p-3 border rounded-xl bg-neutral-500/5 space-y-1" style={{ borderColor: 'var(--theme-border)' }}>
                      <div className="text-[10px] uppercase font-bold text-neutral-400">Runtime & Hosting</div>
                      <div className="font-semibold truncate">{theme.backend.runtime} on {theme.backend.hosting}</div>
                      <div className="text-[10px] text-amber-400">✓ {theme.backend.apiStyle.toUpperCase()} API</div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 8. Alert Banner Showcase */}
              <section className="px-5 sm:px-8 pb-10">
                <div 
                  className="p-4 flex items-center justify-between text-xs border overflow-hidden gap-3"
                  style={{
                    backgroundColor: 'rgba(56, 189, 248, 0.08)',
                    borderColor: 'var(--theme-border)',
                    borderLeftWidth: theme.alertStyle === 'left-bar' ? '4px' : `${theme.borderWidth}px`,
                    borderLeftColor: 'var(--theme-primary)',
                    borderRadius: 'var(--theme-radius-card)',
                  }}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Info className="w-4 h-4 shrink-0" style={{ color: 'var(--theme-primary)' }} />
                    <span className="break-words">
                      Active Theme: <strong>{theme.name}</strong> is dynamically applied across all preview components.
                    </span>
                  </div>
                  <span className="text-[10px] font-mono opacity-60 shrink-0 hidden sm:inline">LIVE SYNC</span>
                </div>
              </section>

              {/* 9. Footer */}
              <footer 
                className="px-5 sm:px-8 py-6 border-t flex flex-wrap items-center justify-between gap-4 text-xs opacity-75"
                style={{ borderColor: 'var(--theme-border)' }}
              >
                <span>© 2026 Nexus Architecture. Powered by Design2Prompt.</span>
                <div className="flex gap-4">
                  <span className="hover:underline cursor-pointer">Privacy</span>
                  <span className="hover:underline cursor-pointer">Terms</span>
                  <span className="hover:underline cursor-pointer">Docs</span>
                </div>
              </footer>

              {/* Live Toast Notification inside Smartphone Screen */}
              {activeToast && isMobileViewport && (
                <div 
                  className="sticky bottom-6 mx-4 z-40 p-3.5 border flex items-center gap-3 shadow-2xl animate-fade-in"
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
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold truncate">Toast Notification Fired!</div>
                    <div className="text-[10px] opacity-75 truncate">Theme motion & radius applied</div>
                  </div>
                  <button 
                    onClick={() => setActiveToast(false)}
                    className="opacity-50 hover:opacity-100 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Bottom Home Indicator for Smartphone View */}
              {isMobileViewport && (
                <div className="pt-2 pb-3 flex justify-center bg-transparent">
                  <div className="w-32 h-1 bg-neutral-400/40 rounded-full" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Toast Notification for Desktop / Tablet (Anchored to Preview Canvas) */}
        {activeToast && !isMobileViewport && (
          <div 
            className="absolute bottom-6 right-6 z-50 p-4 border flex items-center gap-3 shadow-2xl animate-fade-in max-w-sm"
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
              style={{ backgroundColor: 'var(--theme-primary)', color: theme.isDark ? '#000' : '#fff' }}
            >
              <Bell className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold truncate">Toast Notification Fired!</div>
              <div className="text-[10px] opacity-75 truncate">Theme motion and radius applied in real-time</div>
            </div>
            <button 
              onClick={() => setActiveToast(false)}
              className="ml-auto opacity-50 hover:opacity-100 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
