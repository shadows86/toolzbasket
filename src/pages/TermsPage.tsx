import React from 'react';
import { PageRoute } from '../types';
import { CheckSquare, ShieldAlert } from 'lucide-react';

interface TermsPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#1E2E52] pb-4">
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">
          Terms of Service
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] mt-1">
          Effective Date: January 1, 2026 • Last Updated: September 2026
        </p>
      </div>

      <div className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-6 sm:p-8 space-y-7 text-sm sm:text-base text-[#CBD5E1] leading-relaxed shadow-xl">
        {/* Intro */}
        <section className="space-y-3">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F8FAFC]">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and utilizing the web software utilities made available on <strong>Toolzbasket</strong> (referred to as "the Platform", "we", "us", or "our"), you agree to be legally bound by these Terms of Service. If you disagree with any portion of these provisions, you must cease use of the utilities.
          </p>
        </section>

        {/* Use of Free Tools */}
        <section className="space-y-3 pt-4 border-t border-[#1E2E52]">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F8FAFC] flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-[#10B981]" />
            <span>2. Permitted Commercial & Enterprise License</span>
          </h2>
          <p>
            Toolzbasket grants users a worldwide, royalty-free, perpetual license to use the tools available on this platform for personal, commercial, industrial, or educational purposes.
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-[#94A3B8] pl-2">
            <li>You may generate an unlimited volume of ISO-compliant QR matrices and data graphics.</li>
            <li>You retain 100% full intellectual property ownership of all exported raster graphics and source payloads.</li>
            <li>No attribution or license fees are required.</li>
          </ul>
        </section>

        {/* Prohibited Activities */}
        <section className="space-y-3 pt-4 border-t border-[#1E2E52]">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F8FAFC] flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#00F0FF]" />
            <span>3. Prohibited Usage</span>
          </h2>
          <p>
            Users are strictly prohibited from utilizing the tools to generate or distribute assets that infringe upon international laws:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-[#94A3B8] pl-2">
            <li>Encoding malicious URLs facilitating phishing campaigns, malware downloads, or credential harvesting.</li>
            <li>Attempting denial-of-service or automated abusive scraping against edge infrastructure.</li>
            <li>Misrepresenting generated artifacts as official endorsements or certifications from Toolzbasket.</li>
          </ul>
        </section>

        {/* Disclaimer of Warranties */}
        <section className="space-y-3 pt-4 border-t border-[#1E2E52]">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F8FAFC]">
            4. Disclaimer of Warranties
          </h2>
          <p>
            All utilities on Toolzbasket are provided on an <strong>"AS IS"</strong> and <strong>"AS AVAILABLE"</strong> basis. While we enforce adherence to international ISO/IEC 18004 standards, we cannot guarantee performance on damaged or non-standard legacy scanning hardware.
          </p>
          <p className="text-xs text-[#94A3B8] bg-[#0D1527] p-3 rounded-[3px] border border-[#1E2E52]">
            <strong className="text-[#00F0FF]">Production Advisory:</strong> We advise teams to perform optical validation with multiple camera devices prior to initiating volume physical printing, sign fabrication, or industrial stamping.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="space-y-3 pt-4 border-t border-[#1E2E52]">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F8FAFC]">
            5. Limitation of Liability
          </h2>
          <p>
            In no event shall Toolzbasket or its maintainers be liable for indirect, incidental, or consequential damages resulting from tool usage, including printing expenses, downtime, or business interruption.
          </p>
        </section>

        {/* Contact info */}
        <section className="space-y-3 pt-4 border-t border-[#1E2E52]">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F8FAFC]">
            6. Legal Contact
          </h2>
          <p>
            For legal inquiries regarding these terms, contact{' '}
            <span className="font-mono font-semibold text-[#00F0FF]">terms@toolzbasket.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
};
