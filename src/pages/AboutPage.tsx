import React from 'react';
import { ShoppingBasket, Shield, Cpu, Gauge } from 'lucide-react';
import { PageRoute } from '../types';

interface AboutPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#1E2E52] pb-4">
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">
          About Toolzbasket
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] mt-1">
          A dependable digital suite providing free, high-performance utilities engineered to run client-side inside your browser.
        </p>
      </div>

      {/* Core Philosophy Section */}
      <div className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[4px] border border-[#00F0FF]/60 bg-[#141F3A] flex items-center justify-center text-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.25)]">
            <ShoppingBasket className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-[#F8FAFC]">
              Enterprise Utility Philosophy for the Modern Web
            </h2>
            <p className="text-xs text-[#94A3B8]">Built for engineers, enterprise teams, small businesses, and makers.</p>
          </div>
        </div>

        <div className="space-y-4 text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
          <p>
            When you grab a critical physical tool or instrument off an engineering workbench, you don't expect to sign in with an account, accept tracking telemetry, or wait for cloud servers to authorize execution. The instrument exists locally, functions instantly, and provides immediate output.
          </p>
          <p>
            Toolzbasket was engineered from that exact premise. Far too many utility platforms today are encumbered by intrusive paywalls, subscription gates, and slow redirect trackers that capture private URLs and credentials. We believe everyday utilities should be as clean, durable, and immediate as precision hardware.
          </p>
          <p>
            Our core module is our customizable QR Code Generator, designed to render pixel-accurate, ISO/IEC 18004 barcodes directly on your local CPU. As Toolzbasket expands, we are systematically shipping new utilities—unit converters, epoch calculators, cryptographic hashers, and contrast inspectors—all adhering strictly to a 100% client-side execution standard.
          </p>
        </div>
      </div>

      {/* Workbench Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-5 space-y-2 shadow-lg">
          <div className="w-8 h-8 rounded-[3px] bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] flex items-center justify-center">
            <Shield className="w-4 h-4" />
          </div>
          <h3 className="font-heading text-sm font-bold text-[#F8FAFC]">
            100% In-Browser Privacy
          </h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Your inputs, passwords, and data payloads are compiled directly in browser memory. Zero external storage, zero telemetry logs.
          </p>
        </div>

        <div className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-5 space-y-2 shadow-lg">
          <div className="w-8 h-8 rounded-[3px] bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] flex items-center justify-center">
            <Gauge className="w-4 h-4" />
          </div>
          <h3 className="font-heading text-sm font-bold text-[#F8FAFC]">
            Zero Account Friction
          </h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            No registration screens, passwords, or subscriptions. Load the tool, calibrate your matrix, download your asset, and finish your task.
          </p>
        </div>

        <div className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-5 space-y-2 shadow-lg">
          <div className="w-8 h-8 rounded-[3px] bg-[#38BDF8]/15 border border-[#38BDF8]/40 text-[#38BDF8] flex items-center justify-center">
            <Cpu className="w-4 h-4" />
          </div>
          <h3 className="font-heading text-sm font-bold text-[#F8FAFC]">
            Ultra-Fast Static Execution
          </h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Served through global edge CDNs as pure static assets. Once cached, the tools continue functioning even if network connection drops.
          </p>
        </div>
      </div>

      {/* Roadmap & Suggestions Box */}
      <div className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div>
          <h3 className="font-heading text-base font-bold text-[#F8FAFC]">
            Suggest a tool for the basket
          </h3>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Do you have a workflow calculation or conversion challenge you'd like solved client-side?
          </p>
        </div>
        <button
          onClick={() => onNavigate('/contact')}
          className="px-4 py-2 bg-[#00F0FF] hover:bg-[#38BDF8] text-[#0A0F1D] font-heading font-bold text-xs uppercase tracking-wider rounded-[3px] shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all"
        >
          Send Suggestion
        </button>
      </div>
    </div>
  );
};
