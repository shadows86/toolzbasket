import React, { useState } from 'react';
import { QrTool } from '../components/QrTool';
import { AdSlot } from '../components/AdSlot';
import { ConditionalAdContainer } from '../components/ConditionalAdContainer';
import {
  Layers,
  CheckCircle2,
  Clock,
  Binary,
  Maximize,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { PageRoute } from '../types';

interface HomePageProps {
  onNavigate: (path: PageRoute) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [headerAdFailed, setHeaderAdFailed] = useState(false);
  const [sidebarAdFailed, setSidebarAdFailed] = useState(false);
  const [sidebarAdLoaded, setSidebarAdLoaded] = useState(false);

  return (
    <div className="w-full space-y-4 sm:space-y-5">
      {/* Top Ad Slot wrapped in conditional container with 2s collapse */}
      <ConditionalAdContainer
        className="w-full"
        timeoutMs={2000}
        onAdStatusChange={(status) => {
          if (status === 'failed') {
            setHeaderAdFailed(true);
          }
        }}
      >
        <AdSlot id="ad-slot-top" format="banner" />
      </ConditionalAdContainer>

      {/* Main Tool Introduction Banner / Minimal Gap Hero Heading */}
      <div className="border-b border-[#1E2E52] pb-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#F8FAFC]">
              Free QR Code Generator
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">
              Create high-resolution QR codes instantly in your browser. No signup. No data sent to any server.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] bg-[#10182E] px-2.5 py-1 rounded-[3px] border border-[#1E2E52] shrink-0 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981]" />
            <span>100% In-Browser &bull; Private</span>
          </div>
        </div>
      </div>

      {/* Layout with Main Tool and Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Main Tool Container: Expands to full 12 columns if sidebar ad fails */}
        <div className={`${sidebarAdFailed ? 'lg:col-span-12' : 'lg:col-span-9'} space-y-6`}>
          {/* Main QR Tool (receives fullWidth to expand preview panel when sidebar collapses) */}
          <QrTool fullWidth={sidebarAdFailed} />

          {/* SEO Text Section: Why Use Toolzbasket QR Generator? */}
          <section
            id="why-toolzbasket-qr"
            className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-5 sm:p-6 shadow-xl space-y-4"
          >
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#F8FAFC]">
                Why Use Toolzbasket QR Generator?
              </h2>
              <div className="w-12 h-[2px] bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] mt-2" />
            </div>

            <ul className="space-y-3.5 text-sm text-[#CBD5E1]">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-[3px] bg-[#00F0FF]/15 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] shrink-0 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-[#F8FAFC] font-semibold">100% Privacy (Zero Data Stored):</strong> All QR codes are generated directly in your browser using local client-side memory. Your text, URLs, and Wi-Fi credentials never leave your device and are never sent to or stored on any server.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-[3px] bg-[#00F0FF]/15 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] shrink-0 mt-0.5">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-[#F8FAFC] font-semibold">Instant Speed & Real-Time Encoding:</strong> Generate and customize high-resolution QR codes in real time with zero latency, zero page reloads, and instant crisp PNG downloads ready for print or digital display.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-[3px] bg-[#00F0FF]/15 border border-[#00F0FF]/40 flex items-center justify-center text-[#00F0FF] shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-[#F8FAFC] font-semibold">Completely Free with No Account:</strong> No sign-up, no login, no paywalls, and no scan limits. Access all customization options, custom color palettes, and error correction levels completely free forever.
                </div>
              </li>
            </ul>
          </section>

          {/* Ad slot infeed below the tool */}
          <div className="w-full pt-1">
            <AdSlot id="ad-slot-infeed" format="infeed" />
          </div>

          {/* Comprehensive QR Technical Architecture & Guide */}
          <section
            id="qr-guide-overview"
            className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-5 sm:p-7 space-y-5 shadow-xl"
          >
            <div>
              <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F8FAFC]">
                What Is a QR Code and How Does It Work?
              </h2>
              <div className="w-10 h-[2px] bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] mt-1.5" />
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              <p>
                A Quick Response (QR) code is a two-dimensional matrix barcode invented in 1994 to track high-precision industrial components. Unlike traditional linear barcodes that store data along a single dimension, QR codes encode information both vertically and horizontally across a calibrated matrix of optical modules. This architecture enables encoding hundreds of times more data—from complex HTTPS URLs and plain text to Wi-Fi connection strings and vCards.
              </p>
              <p>
                Modern camera hardware and optical readers decode these geometric modules in fractions of a second. Every matrix generated on Toolzbasket incorporates Reed-Solomon error correction polynomials, allowing the code to be reliably decoded even if up to 30% of the graphic surface gets scratched, occluded, or weathered in physical industrial environments.
              </p>
              <p>
                Whether implemented on corporate conference signage, hardware server racks, merchandise packaging, or retail table cards, client-side QR codes form an instant bridge between physical surfaces and digital infrastructure. Because Toolzbasket runs entirely in client-side memory, private access tokens and network passwords never leave your workstation.
              </p>
            </div>

            {/* Practical everyday use cases grid */}
            <div className="pt-4 border-t border-[#1E2E52]">
              <h3 className="font-heading text-xs sm:text-sm font-bold text-[#F8FAFC] mb-3">
                Everyday Practical Use Cases
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-[#0D1527] border border-[#1E2E52] rounded-[3px]">
                  <p className="font-heading text-xs font-bold text-[#00F0FF]">
                    Hardware & Components
                  </p>
                  <p className="text-[11px] text-[#94A3B8] mt-1">
                    Label server bays, equipment, inventory bins, and engineering repos.
                  </p>
                </div>
                <div className="p-3 bg-[#0D1527] border border-[#1E2E52] rounded-[3px]">
                  <p className="font-heading text-xs font-bold text-[#00F0FF]">
                    Guest Wi-Fi Cards
                  </p>
                  <p className="text-[11px] text-[#94A3B8] mt-1">
                    Print seamless guest Wi-Fi access cards for offices and homes with one-tap scanning.
                  </p>
                </div>
                <div className="p-3 bg-[#0D1527] border border-[#1E2E52] rounded-[3px]">
                  <p className="font-heading text-xs font-bold text-[#00F0FF]">
                    Print & Packaging
                  </p>
                  <p className="text-[11px] text-[#94A3B8] mt-1">
                    Deploy high-contrast vector-quality codes across business cards, flyers, and badges.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column / Sidebar: Ad slot with placeholder + System Specs */}
        {!sidebarAdFailed && (
          <aside className="lg:col-span-3 space-y-5">
            {/* Right column ad slot: styled placeholder showing 'Advertisement' while loading */}
            <div className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-3.5 shadow-lg overflow-hidden">
              <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-[#1E2E52]/80">
                <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
                  Advertisement
                </span>
                <span className="text-[10px] font-mono text-[#475569]">
                  300 × 250
                </span>
              </div>

              <div className="relative min-h-[250px] w-full max-w-[300px] mx-auto bg-[#0A0F1D] border border-dashed border-[#1E2E52] rounded flex items-center justify-center overflow-hidden">
                {/* Styled placeholder while ad loads */}
                {!sidebarAdLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center select-none pointer-events-none z-0">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#64748B]">
                      Advertisement
                    </span>
                    <span className="text-[10px] text-[#475569] mt-1 font-mono">
                      Loading sponsored unit...
                    </span>
                  </div>
                )}

                {/* Adsterra 300x250 slot */}
                <div className="relative z-10 w-full flex items-center justify-center">
                  <AdSlot
                    id="ad-slot-sidebar"
                    format="sidebar"
                    onAdStatusChange={(status) => {
                      if (status === 'loaded') {
                        setSidebarAdLoaded(true);
                      } else if (status === 'failed') {
                        setSidebarAdFailed(true);
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* System Technical Specifications */}
            <div className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-4 space-y-3 shadow-lg">
              <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-[#F8FAFC] pb-2 border-b border-[#1E2E52]">
                System Specifications
              </h3>
              <ul className="space-y-2 text-xs text-[#94A3B8]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Zero telemetry or server tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Lossless high-res PNG export</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                  <span>ISO/IEC 18004 barcode compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                  <span>Full offline in-memory execution</span>
                </li>
              </ul>
            </div>

            {/* Quick Help Link */}
            <div className="bg-[#0D1527] border border-[#1E2E52] rounded-[4px] p-4">
              <p className="font-heading text-xs font-bold text-[#F8FAFC]">
                Calibration & Sizing Guide
              </p>
              <p className="text-xs text-[#94A3B8] mt-1 mb-3">
                Learn print size formulas, distance ratios, and error correction recommendations.
              </p>
              <button
                onClick={() => onNavigate('/how-to-use')}
                className="w-full py-1.5 px-3 bg-[#141F3A] hover:bg-[#1E2E52] text-xs font-semibold text-[#00F0FF] border border-[#00F0FF]/30 rounded-[3px] transition-colors"
              >
                View Step-by-Step Guide
              </button>
            </div>
          </aside>
        )}
      </div>

      {/* More Tools Coming Soon Compartment */}
      <section
        id="more-tools-section"
        className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-5 sm:p-7 shadow-xl"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#1E2E52]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-[1px] bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]" />
              <h2 className="font-heading text-base sm:text-lg font-bold text-[#F8FAFC]">
                More Tools Coming Soon to Toolzbasket
              </h2>
            </div>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              We are actively developing a precision suite of client-side developer and workplace utilities.
            </p>
          </div>
          <span className="text-[10px] font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded-[3px] border border-[#00F0FF]/30 self-start">
            IN ACTIVE PIPELINE
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          <div className="p-3.5 bg-[#0D1527] border border-[#1E2E52] rounded-[3px] space-y-2 hover:border-[#00F0FF]/40 transition-colors">
            <div className="w-7 h-7 rounded-[3px] bg-[#141F3A] border border-[#1E2E52] flex items-center justify-center text-[#00F0FF]">
              <Layers className="w-4 h-4" />
            </div>
            <p className="font-heading text-xs sm:text-sm font-bold text-[#F8FAFC]">
              Unit & Scale Converter
            </p>
            <p className="text-xs text-[#94A3B8]">
              Fast mechanical, metric, imperial, and engineering unit converter.
            </p>
            <span className="inline-block text-[10px] font-mono uppercase text-[#38BDF8]">
              Module #02
            </span>
          </div>

          <div className="p-3.5 bg-[#0D1527] border border-[#1E2E52] rounded-[3px] space-y-2 hover:border-[#00F0FF]/40 transition-colors">
            <div className="w-7 h-7 rounded-[3px] bg-[#141F3A] border border-[#1E2E52] flex items-center justify-center text-[#00F0FF]">
              <Clock className="w-4 h-4" />
            </div>
            <p className="font-heading text-xs sm:text-sm font-bold text-[#F8FAFC]">
              Epoch & Timestamp Tool
            </p>
            <p className="text-xs text-[#94A3B8]">
              Instant human-to-Unix epoch time calculator with timezone breakdowns.
            </p>
            <span className="inline-block text-[10px] font-mono uppercase text-[#38BDF8]">
              Module #03
            </span>
          </div>

          <div className="p-3.5 bg-[#0D1527] border border-[#1E2E52] rounded-[3px] space-y-2 hover:border-[#00F0FF]/40 transition-colors">
            <div className="w-7 h-7 rounded-[3px] bg-[#141F3A] border border-[#1E2E52] flex items-center justify-center text-[#00F0FF]">
              <Binary className="w-4 h-4" />
            </div>
            <p className="font-heading text-xs sm:text-sm font-bold text-[#F8FAFC]">
              Base64 & Hash Inspector
            </p>
            <p className="text-xs text-[#94A3B8]">
              Encode, decode, and generate client-side cryptographic checksums.
            </p>
            <span className="inline-block text-[10px] font-mono uppercase text-[#38BDF8]">
              Module #04
            </span>
          </div>

          <div className="p-3.5 bg-[#0D1527] border border-[#1E2E52] rounded-[3px] space-y-2 hover:border-[#00F0FF]/40 transition-colors">
            <div className="w-7 h-7 rounded-[3px] bg-[#141F3A] border border-[#1E2E52] flex items-center justify-center text-[#00F0FF]">
              <Maximize className="w-4 h-4" />
            </div>
            <p className="font-heading text-xs sm:text-sm font-bold text-[#F8FAFC]">
              Color Contrast Checker
            </p>
            <p className="text-xs text-[#94A3B8]">
              WCAG accessibility contrast calculator for UI/UX designers and teams.
            </p>
            <span className="inline-block text-[10px] font-mono uppercase text-[#38BDF8]">
              Module #05
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
