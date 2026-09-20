import React from 'react';
import { PageRoute } from '../types';

interface HowToUsePageProps {
  onNavigate: (path: PageRoute) => void;
}

export const HowToUsePage: React.FC<HowToUsePageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#1E2E52] pb-4">
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">
          How to Use the Enterprise QR Generator
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] mt-1">
          A step-by-step technical guide to generating, configuring, and exporting production-ready QR codes on Toolzbasket.
        </p>
      </div>

      {/* Sequential Numbered Steps */}
      <div className="space-y-6">
        {/* Step 1 */}
        <div className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-6 sm:p-7 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-[3px] bg-[#14203D] text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_10px_rgba(0,240,255,0.2)] font-heading font-bold text-base flex items-center justify-center shrink-0">
              01
            </div>
            <div className="space-y-2 flex-1">
              <h2 className="font-heading text-lg font-bold text-[#F8FAFC]">
                Select Content Type and Input Your Payload
              </h2>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                Choose the desired encoding protocol using the tabs above the input area:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-[#94A3B8] space-y-1 pl-1">
                <li><strong className="text-[#F8FAFC]">Web URL:</strong> Paste a full HTTPS website address for instant mobile browser navigation.</li>
                <li><strong className="text-[#F8FAFC]">Raw Text:</strong> Encode inventory tags, product barcodes, or encrypted strings.</li>
                <li><strong className="text-[#F8FAFC]">Wi-Fi:</strong> Supply router SSID, encryption standard (WPA/WEP), and password for instantaneous guest onboarding.</li>
                <li><strong className="text-[#F8FAFC]">Email:</strong> Pre-populate recipient email addresses and default subject lines.</li>
              </ul>
              <p className="text-xs text-[#38BDF8] bg-[#0D1527] p-2.5 rounded-[3px] border border-[#1E2E52] mt-2">
                <strong>Performance Note:</strong> Concise strings generate less dense matrices, ensuring faster optical recognition from greater physical distances.
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-6 sm:p-7 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-[3px] bg-[#14203D] text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_10px_rgba(0,240,255,0.2)] font-heading font-bold text-base flex items-center justify-center shrink-0">
              02
            </div>
            <div className="space-y-2 flex-1">
              <h2 className="font-heading text-lg font-bold text-[#F8FAFC]">
                Calibrate Output Resolution and Contrast
              </h2>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                Under the matrix calibration section, calibrate dimensions and color palettes to match your deployment medium:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-[#0D1527] border border-[#1E2E52] rounded-[3px]">
                  <p className="text-xs font-bold text-[#00F0FF]">Resolution Scaling</p>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Select <strong>Small</strong> (640px export), <strong>Medium</strong> (1000px export), or <strong>Large</strong> (1400px export) for pixel-perfect commercial printing.
                  </p>
                </div>
                <div className="p-3 bg-[#0D1527] border border-[#1E2E52] rounded-[3px]">
                  <p className="text-xs font-bold text-[#00F0FF]">Optical Contrast</p>
                  <p className="text-xs text-[#94A3B8] mt-0.5">
                    Ensure sufficient optical delta. The foreground modules must contrast strongly with the background substrate for rapid optical decoding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-6 sm:p-7 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-[3px] bg-[#14203D] text-[#00F0FF] border border-[#00F0FF]/40 shadow-[0_0_10px_rgba(0,240,255,0.2)] font-heading font-bold text-base flex items-center justify-center shrink-0">
              03
            </div>
            <div className="space-y-2 flex-1">
              <h2 className="font-heading text-lg font-bold text-[#F8FAFC]">
                Validate Scan with Optical Hardware
              </h2>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                Before sending the asset to press or embedding in documentation, test scan the live matrix directly off your monitor screen:
              </p>
              <ul className="list-disc list-inside text-xs sm:text-sm text-[#94A3B8] space-y-1 pl-1">
                <li>Confirm the decoded payload exactly matches your target link or credentials.</li>
                <li>Verify that the quiet zone (boundary padding) is active to prevent border interference.</li>
                <li>For harsh industrial or outdoor conditions, elevate error correction to <code>Q</code> (25%) or <code>H</code> (30%).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-6 sm:p-7 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-[3px] bg-[#00F0FF] text-[#0A0F1D] font-heading font-bold text-base flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(0,240,255,0.4)]">
              04
            </div>
            <div className="space-y-2 flex-1">
              <h2 className="font-heading text-lg font-bold text-[#F8FAFC]">
                Export High-Resolution PNG or Copy to Clipboard
              </h2>
              <p className="text-sm text-[#CBD5E1] leading-relaxed">
                Click the luminous <strong className="text-[#00F0FF]">Download as PNG</strong> button to compile and save an uncompressed raster image directly to your local workstation. Use <strong>Copy Code</strong> to immediately transfer the graphic into design suites like Figma, Photoshop, or CAD tools.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Navigation Box */}
      <div className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <h3 className="font-heading text-base font-bold text-[#F8FAFC]">Ready to encode your assets?</h3>
          <p className="text-xs text-[#94A3B8] mt-0.5">Jump directly to the live generator workbench.</p>
        </div>
        <button
          onClick={() => onNavigate('/')}
          className="px-5 py-2.5 bg-[#00F0FF] hover:bg-[#38BDF8] text-[#0A0F1D] font-heading font-bold text-xs uppercase tracking-wider rounded-[3px] shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
        >
          Open Generator
        </button>
      </div>
    </div>
  );
};
