import React from 'react';
import { ShoppingBasket } from 'lucide-react';
import { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (path: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#080D1A] border-t border-[#1E2E52] mt-10 py-6 text-[#94A3B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal Navigation & Brand Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-[3px] border border-[#00F0FF]/50 bg-[#10182E] flex items-center justify-center text-[#00F0FF]">
              <ShoppingBasket className="w-3.5 h-3.5 stroke-[2]" />
            </div>
            <span className="font-heading text-sm font-bold tracking-tight text-[#F8FAFC]">
              Toolz<span className="text-[#00F0FF]">basket</span>
            </span>
          </div>

          {/* Minimal Links: Privacy Policy | About | Contact */}
          <nav className="flex items-center gap-2 sm:gap-3 text-xs text-[#94A3B8]" aria-label="Footer Navigation">
            <button
              id="footer-privacy"
              onClick={() => onNavigate('/privacy-policy')}
              className="hover:text-[#00F0FF] transition-colors focus:outline-none"
            >
              Privacy Policy
            </button>
            <span className="text-[#334155] select-none">|</span>
            <button
              id="footer-about"
              onClick={() => onNavigate('/about-us')}
              className="hover:text-[#00F0FF] transition-colors focus:outline-none"
            >
              About
            </button>
            <span className="text-[#334155] select-none">|</span>
            <button
              id="footer-contact"
              onClick={() => onNavigate('/contact')}
              className="hover:text-[#00F0FF] transition-colors focus:outline-none"
            >
              Contact
            </button>
          </nav>

          {/* Copyright: © 2026 Toolzbasket. All rights reserved. */}
          <p className="text-xs text-[#64748B] font-sans">
            © 2026 Toolzbasket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

