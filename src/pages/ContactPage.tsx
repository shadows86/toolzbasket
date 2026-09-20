import React, { useState } from 'react';
import { Mail, Copy, Check, HelpCircle } from 'lucide-react';
import { PageRoute } from '../types';

interface ContactPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const emailAddress = 'hello@toolzbasket.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="w-full space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#1E2E52] pb-4">
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">
          Contact Toolzbasket
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] mt-1">
          Have feedback, an enterprise integration inquiry, or a new tool proposal? We welcome direct communication.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main contact card */}
        <div className="lg:col-span-8 bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[3px] bg-[#00F0FF]/15 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.2)]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F8FAFC]">
                Direct Engineering Inbox
              </h2>
              <p className="text-xs text-[#94A3B8]">
                No tracking web forms, no support tickets, no automated chat bots. Direct email communication.
              </p>
            </div>
          </div>

          <p className="text-sm text-[#CBD5E1] leading-relaxed">
            Consistent with our commitment to zero backend telemetry and strict data privacy, Toolzbasket avoids third-party web forms that syndicate email data to marketing CRMs. You can connect with our maintainers directly through your email client.
          </p>

          {/* Email address copy container */}
          <div className="bg-[#0D1527] border border-[#1E2E52] rounded-[3px] p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#38BDF8]" />
              <span className="font-mono text-sm sm:text-base font-bold text-[#00F0FF]">
                {emailAddress}
              </span>
            </div>

            <button
              id="copy-contact-email"
              type="button"
              onClick={handleCopyEmail}
              className="px-3.5 py-1.5 bg-[#141F3A] hover:bg-[#1E2E52] text-xs font-semibold text-[#CBD5E1] hover:text-[#00F0FF] border border-[#1E2E52] rounded-[3px] transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#10B981]" />
                  <span className="text-[#10B981]">Email Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#94A3B8]" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          {/* Guidelines on what to send */}
          <div className="pt-4 border-t border-[#1E2E52] space-y-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#F8FAFC]">
              Common Inquiries
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#94A3B8]">
              <div className="p-3 bg-[#0D1527] border border-[#1E2E52] rounded-[3px]">
                <p className="font-bold text-[#00F0FF] mb-1">New Utility Requests</p>
                <p>Propose browser-based computation, encoding, or conversion tools for client-side implementation.</p>
              </div>
              <div className="p-3 bg-[#0D1527] border border-[#1E2E52] rounded-[3px]">
                <p className="font-bold text-[#00F0FF] mb-1">Bug Reports & Fixes</p>
                <p>Include browser version and operating environment if an unexpected matrix rendering quirk is found.</p>
              </div>
              <div className="p-3 bg-[#0D1527] border border-[#1E2E52] rounded-[3px]">
                <p className="font-bold text-[#00F0FF] mb-1">Sponsorships & Placements</p>
                <p>For verified partners seeking digital banner sponsorships or network integration.</p>
              </div>
              <div className="p-3 bg-[#0D1527] border border-[#1E2E52] rounded-[3px]">
                <p className="font-bold text-[#00F0FF] mb-1">General Feedback</p>
                <p>Suggestions for ergonomics, high-contrast themes, or accessibility improvements.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-5 space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-[#F8FAFC]">
              <HelpCircle className="w-4 h-4 text-[#00F0FF]" />
              <h3 className="font-heading text-sm font-bold">Consult FAQ</h3>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Common questions regarding ISO specifications, print dimension formulas, error correction, and commercial licensing are thoroughly answered in our documentation.
            </p>
            <button
              onClick={() => onNavigate('/faq')}
              className="w-full py-2 px-3 bg-[#141F3A] hover:bg-[#1E2E52] text-xs font-semibold text-[#00F0FF] border border-[#00F0FF]/30 rounded-[3px] transition-colors"
            >
              Browse FAQ Section
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
