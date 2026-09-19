import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBasket, Menu, X, ChevronDown, Layers, Clock, Binary, Maximize } from 'lucide-react';
import { PageRoute } from '../types';

interface HeaderProps {
  currentPath: PageRoute;
  onNavigate: (path: PageRoute) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks: { label: string; path: PageRoute }[] = [
    { label: 'QR Generator', path: '/' },
    { label: 'How to Use', path: '/how-to-use' },
    { label: 'FAQ', path: '/faq' },
    { label: 'About', path: '/about-us' },
    { label: 'Contact', path: '/contact' },
  ];

  const upcomingTools = [
    { name: 'Unit & Scale Converter', desc: 'Metric, imperial & engineering units', icon: Layers },
    { name: 'Epoch & Timestamp Tool', desc: 'Unix time & timezone calculator', icon: Clock },
    { name: 'Base64 & Hash Inspector', desc: 'In-browser encoding & checksums', icon: Binary },
    { name: 'Color Contrast Checker', desc: 'WCAG accessibility contrast score', icon: Maximize },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (path: PageRoute) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  };

  const handleToolRoadmapClick = () => {
    setToolsDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate('/');
    setTimeout(() => {
      document.getElementById('more-tools-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <header className="w-full bg-[#0D1527]/95 backdrop-blur-md border-b border-[#1E2E52] sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 sm:h-16">
          {/* Brand Wordmark & Line Icon */}
          <button
            id="brand-home-button"
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] rounded-[4px] py-1"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[4px] border border-[#00F0FF]/60 bg-[#141F3A] flex items-center justify-center text-[#00F0FF] group-hover:border-[#00F0FF] group-hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all">
              <ShoppingBasket className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-[#F8FAFC] group-hover:text-[#FFFFFF] transition-colors">
                  Toolz<span className="text-[#00F0FF]">basket</span>
                </span>
                {/* Free Badge with Tooltip (no confusing PRO tag) */}
                <div className="relative group/tooltip">
                  <span
                    title="All features are free — no account needed"
                    className="inline-flex items-center px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 rounded-[3px] cursor-help"
                  >
                    FREE
                  </span>
                  <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-1.5 hidden group-hover/tooltip:block z-50 whitespace-nowrap rounded bg-[#080D1A] px-2.5 py-1 text-[11px] font-sans text-[#E2E8F0] border border-[#1E2E52] shadow-xl">
                    All features are free — no account needed
                  </div>
                </div>
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#94A3B8] font-normal leading-none hidden sm:block mt-0.5">
                Your basket of handy everyday tools
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  id={`nav-link-${link.path.replace('/', '') || 'home'}`}
                  onClick={() => handleLinkClick(link.path)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-[4px] transition-all relative ${
                    isActive
                      ? 'text-[#00F0FF] bg-[#14203D] font-semibold border border-[#00F0FF]/40 shadow-[0_0_10px_rgba(0,240,255,0.15)]'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#131D36]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                  )}
                </button>
              );
            })}

            {/* More Tools (Coming Soon) Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="nav-more-tools-dropdown-button"
                type="button"
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-[4px] transition-all ${
                  toolsDropdownOpen
                    ? 'text-[#00F0FF] bg-[#14203D] border border-[#00F0FF]/30'
                    : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#131D36]'
                }`}
                aria-expanded={toolsDropdownOpen}
                aria-haspopup="true"
              >
                <span>More Tools</span>
                <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 rounded-[3px] leading-none shadow-[0_0_6px_rgba(0,240,255,0.2)]">
                  soon
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    toolsDropdownOpen ? 'rotate-180 text-[#00F0FF]' : 'text-[#64748B]'
                  }`}
                />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-72 bg-[#0D1527] border border-[#1E2E52] rounded-[4px] shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-2 border-b border-[#1E2E52] mb-1.5">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
                        Toolzbasket Pipeline
                      </p>
                      <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 rounded-[2px]">
                        FREE & PRIVATE
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      New in-browser utilities currently in development:
                    </p>
                  </div>

                  <div className="space-y-1">
                    {upcomingTools.map((tool) => {
                      const ToolIcon = tool.icon;
                      return (
                        <div
                          key={tool.name}
                          onClick={handleToolRoadmapClick}
                          className="px-2.5 py-2 rounded-[3px] hover:bg-[#141F3A] transition-colors flex items-center justify-between group cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-6 h-6 rounded-[3px] bg-[#10182E] border border-[#1E2E52] flex items-center justify-center text-[#00F0FF] group-hover:border-[#00F0FF]/50 transition-colors">
                              <ToolIcon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-[#F8FAFC] group-hover:text-[#00F0FF] transition-colors">
                                {tool.name}
                              </p>
                              <p className="text-[10px] text-[#64748B]">{tool.desc}</p>
                            </div>
                          </div>
                          <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-[2px] bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 shrink-0">
                            soon
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="pt-2 mt-1.5 border-t border-[#1E2E52]">
                    <button
                      type="button"
                      onClick={handleToolRoadmapClick}
                      className="w-full text-center text-xs font-medium text-[#00F0FF] hover:underline py-1"
                    >
                      View All Upcoming Tools &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-[4px] border border-[#1E2E52] bg-[#10182E] text-[#94A3B8] hover:text-[#00F0FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#00F0FF]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-[#1E2E52] bg-[#0D1527] space-y-1">
            <p className="px-3 text-[11px] font-mono uppercase tracking-wider text-[#64748B] mb-1">
              Navigation
            </p>
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  id={`mobile-nav-${link.path.replace('/', '') || 'home'}`}
                  onClick={() => handleLinkClick(link.path)}
                  className={`w-full text-left px-3 py-2 text-sm font-medium rounded-[4px] transition-colors flex items-center justify-between ${
                    isActive
                      ? 'bg-[#14203D] text-[#00F0FF] font-semibold border-l-2 border-[#00F0FF]'
                      : 'text-[#94A3B8] hover:bg-[#141F3A] hover:text-[#F8FAFC]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="text-[10px] font-mono uppercase bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40 px-1.5 py-0.5 rounded-[2px]">
                      Active
                    </span>
                  )}
                </button>
              );
            })}

            {/* Mobile More Tools Section */}
            <div className="pt-2 border-t border-[#1E2E52]/60 mt-2">
              <button
                type="button"
                onClick={handleToolRoadmapClick}
                className="w-full text-left px-3 py-2 text-sm font-medium text-[#94A3B8] hover:bg-[#141F3A] hover:text-[#F8FAFC] rounded-[4px] flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span>More Tools</span>
                  <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/40 rounded-[3px]">
                    soon
                  </span>
                </div>
                <span className="text-xs text-[#00F0FF]">&rarr;</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
