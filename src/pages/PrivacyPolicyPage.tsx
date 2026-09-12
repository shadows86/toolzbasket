import React from 'react';
import { AdSlot } from '../components/AdSlot';
import { Lock, Cookie, Mail } from 'lucide-react';
import { PageRoute } from '../types';

interface PrivacyPolicyPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full space-y-8">
      {/* Top Ad Slot */}
      <AdSlot id="ad-slot-top" format="banner" />

      {/* Page Header */}
      <div className="border-b border-[#1E2E52] pb-4">
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">
          Privacy Policy
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] mt-1">
          Effective Date: January 1, 2026 • Last Updated: September 2026
        </p>
      </div>

      <div className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-6 sm:p-8 space-y-7 text-sm sm:text-base text-[#CBD5E1] leading-relaxed shadow-xl">
        {/* Intro */}
        <section className="space-y-3">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F8FAFC]">
            1. Overview & Architectural Security
          </h2>
          <p>
            At <strong>Toolzbasket</strong> (accessible from <code className="text-xs font-mono bg-[#0D1527] text-[#00F0FF] px-1.5 py-0.5 rounded border border-[#1E2E52]">toolzbasket.com</code>), user privacy and data containment are core operational mandates. This Privacy Policy outlines how our application operates and handles user information.
          </p>
          <p>
            Our core mission is to provide lightweight, high-speed utility applications that execute <strong>100% inside client browser memory</strong>. Unlike conventional SaaS services, Toolzbasket does not require user accounts, email registration, profile logins, or remote database synchronization.
          </p>
        </section>

        {/* Client side data */}
        <section className="space-y-3 pt-4 border-t border-[#1E2E52]">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F8FAFC] flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#10B981]" />
            <span>2. Zero Collection of Your Tool Data</span>
          </h2>
          <p>
            When utilizing the Toolzbasket QR Code Generator or accompanying utilities:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-[#94A3B8] pl-2">
            <li>Any text strings, confidential URLs, Wi-Fi credentials, contact cards, or custom payloads input into tool fields are processed <strong>strictly within local client memory</strong>.</li>
            <li>No user inputs are transmitted over network sockets to Toolzbasket servers, logged in telemetry stores, or preserved in cloud databases.</li>
            <li>When you export a PNG or copy code, raster rendering is handled entirely on your local GPU/CPU hardware.</li>
          </ul>
        </section>

        {/* Cookies and Advertising */}
        <section className="space-y-3 pt-4 border-t border-[#1E2E52]">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F8FAFC] flex items-center gap-2">
            <Cookie className="w-5 h-5 text-[#00F0FF]" />
            <span>3. Third-Party Advertising & Cookie Disclosure</span>
          </h2>
          <p>
            Toolzbasket is a complimentary platform sustained through unobtrusive digital banner sponsorships provided by third-party advertising partners (such as Adsterra and other vetted digital ad networks).
          </p>
          <p>
            Third-party ad networks utilize technologies such as cookies, JavaScript, or Web Beacons within their sponsored slots. When an ad script is fetched, advertising partners automatically receive IP headers to deliver geographically compliant units.
          </p>
          <p className="text-xs text-[#94A3B8] bg-[#0D1527] p-3 rounded-[3px] border border-[#1E2E52]">
            <strong>Notice:</strong> Toolzbasket does not manage, read, or monetize advertiser cookies. You may inspect the specific policies of these third-party networks or configure browser privacy extensions to customize tracking settings.
          </p>
        </section>

        {/* Infeed Ad Slot */}
        <div className="py-2">
          <AdSlot id="ad-slot-infeed" format="infeed" />
        </div>

        {/* Log files & telemetry */}
        <section className="space-y-3 pt-4 border-t border-[#1E2E52]">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F8FAFC]">
            4. Static Edge Delivery Logs
          </h2>
          <p>
            Standard CDN infrastructure (such as Vercel or Cloudflare edge nodes) records standard HTTP request access logs (origin IP, user-agent headers, timestamp, HTTP status codes). These records are strictly utilized for infrastructure health, load balancing, and DDoS prevention, and are not correlated with personal user identities.
          </p>
        </section>

        {/* User Rights */}
        <section className="space-y-3 pt-4 border-t border-[#1E2E52]">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F8FAFC]">
            5. Global Data Protection Compliance (GDPR / CCPA)
          </h2>
          <p>
            Because Toolzbasket operates without user account databases or personal identity profiles, we do not store personal consumer records. For regulatory queries or data governance inquiries, our compliance desk is readily available.
          </p>
        </section>

        {/* Contact Email */}
        <section className="space-y-3 pt-4 border-t border-[#1E2E52]">
          <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F8FAFC] flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#00F0FF]" />
            <span>6. Data Governance Contact</span>
          </h2>
          <p>
            For inquiries or suggestions regarding our client-side architecture and data policy, reach out via:
          </p>
          <div className="p-3 bg-[#0D1527] border border-[#1E2E52] rounded-[3px] inline-block font-mono text-xs sm:text-sm font-semibold text-[#00F0FF]">
            privacy@toolzbasket.com
          </div>
        </section>
      </div>
    </div>
  );
};
