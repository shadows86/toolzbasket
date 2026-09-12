import React from 'react';
import { ShoppingBasket, Shield, FileText, HelpCircle, Mail, BookOpen } from 'lucide-react';
import { PageRoute } from '../types';
import { AdSlot } from './AdSlot';

interface FooterProps {
  onNavigate: (path: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#080D1A] border-t border-[#1E2E52] mt-16 pt-10 pb-8 text-[#94A3B8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Ad Slot Required */}
        <div className="mb-10">
          <AdSlot id="ad-slot-footer" format="footer" />
        </div>

        {/* Corporate grid division */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#1E2E52]">
          {/* Brand compartment */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[4px] border border-[#00F0FF]/50 bg-[#10182E] flex items-center justify-center text-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.25)]">
                <ShoppingBasket className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="font-heading text-lg font-bold tracking-tight text-[#F8FAFC]">
                Toolz<span className="text-[#00F0FF]">basket</span>
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] max-w-md leading-relaxed">
              Your basket of handy everyday tools. Built for high performance, enterprise precision, and complete client-side data privacy. Zero account creation, zero remote telemetry, zero third-party tracking cookies on core tools.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#10182E] border border-[#1E2E52] text-[11px] font-mono text-[#CBD5E1]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981]" />
              <span>100% Client-Side In-Browser Execution</span>
            </div>
          </div>

          {/* Quick Tools & Docs */}
          <div className="space-y-2.5">
            <p className="font-heading text-xs font-bold uppercase tracking-wider text-[#F8FAFC] pb-1 border-b border-[#1E2E52]">
              Navigation
            </p>
            <ul className="space-y-1.5 text-xs text-[#94A3B8]">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => onNavigate('/')}
                  className="hover:text-[#00F0FF] hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <span>QR Code Generator</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-how-to-use"
                  onClick={() => onNavigate('/how-to-use')}
                  className="hover:text-[#00F0FF] hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#38BDF8]" />
                  <span>How to Use</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-faq"
                  onClick={() => onNavigate('/faq')}
                  className="hover:text-[#00F0FF] hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>Frequently Asked Questions</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => onNavigate('/about-us')}
                  className="hover:text-[#00F0FF] hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <span>About Toolzbasket</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="space-y-2.5">
            <p className="font-heading text-xs font-bold uppercase tracking-wider text-[#F8FAFC] pb-1 border-b border-[#1E2E52]">
              Legal & Support
            </p>
            <ul className="space-y-1.5 text-xs text-[#94A3B8]">
              <li>
                <button
                  id="footer-nav-privacy"
                  onClick={() => onNavigate('/privacy-policy')}
                  className="hover:text-[#00F0FF] hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <Shield className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-terms"
                  onClick={() => onNavigate('/terms-of-service')}
                  className="hover:text-[#00F0FF] hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>Terms of Service</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-contact"
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-[#00F0FF] hover:underline flex items-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>Contact Support</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
          <p>© 2026 Toolzbasket. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="text-[#38BDF8]">Static Deployment</span>
            <span className="text-[#334155]">•</span>
            <span>Zero Tracking Logs</span>
            <span className="text-[#334155]">•</span>
            <span>Client-Side Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
