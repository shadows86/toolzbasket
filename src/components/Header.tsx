import React, { useState } from 'react';
import { ShoppingBasket, Menu, X } from 'lucide-react';
import { PageRoute } from '../types';

interface HeaderProps {
  currentPath: PageRoute;
  onNavigate: (path: PageRoute) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; path: PageRoute }[] = [
    { label: 'QR Generator', path: '/' },
    { label: 'How to Use', path: '/how-to-use' },
    { label: 'FAQ', path: '/faq' },
    { label: 'About', path: '/about-us' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (path: PageRoute) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-[#0D1527]/95 backdrop-blur-md border-b border-[#1E2E52] sticky top-0 z-40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Wordmark & Line Icon */}
          <button
            id="brand-home-button"
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] rounded-[4px] py-1"
          >
            <div className="w-9 h-9 rounded-[4px] border border-[#00F0FF]/60 bg-[#141F3A] flex items-center justify-center text-[#00F0FF] group-hover:border-[#00F0FF] group-hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all">
              <ShoppingBasket className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-[#F8FAFC] group-hover:text-[#FFFFFF] transition-colors">
                  Toolz<span className="text-[#00F0FF]">basket</span>
                </span>
                <span className="inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 rounded-[3px]">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-[#94A3B8] font-normal leading-none hidden sm:block mt-0.5">
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
                  className={`px-3.5 py-2 text-sm font-medium rounded-[4px] transition-all relative ${
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
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-[4px] border border-[#1E2E52] bg-[#10182E] text-[#94A3B8] hover:text-[#00F0FF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
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
              Corporate Utilities
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
          </div>
        )}
      </div>
    </header>
  );
};
