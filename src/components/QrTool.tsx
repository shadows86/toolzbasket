import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import {
  Download,
  Copy,
  Check,
  RefreshCw,
  Link,
  Type,
  Wifi,
  Mail,
  Palette,
  Maximize2,
  Sliders,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { QrConfig, QrSizeOption, ErrorCorrectionLevel } from '../types';

interface QrToolProps {
  fullWidth?: boolean;
}

export const QrTool: React.FC<QrToolProps> = ({ fullWidth = false }) => {
  const [config, setConfig] = useState<QrConfig>({
    value: 'https://toolzbasket.com',
    size: 'medium',
    fgColor: '#0A0F1D',
    bgColor: '#FFFFFF',
    level: 'M',
    includeMargin: true,
  });

  const [activeTab, setActiveTab] = useState<'url' | 'text' | 'wifi' | 'email'>('url');
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Wi-Fi specific state helper
  const [wifiSsid, setWifiSsid] = useState('Corporate_Network');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');

  // Email specific state helper
  const [emailTo, setEmailTo] = useState('hello@toolzbasket.com');
  const [emailSubject, setEmailSubject] = useState('Enterprise Inquiry');

  const canvasRef = useRef<HTMLDivElement>(null);

  // Size pixel map for the live preview display
  const displaySizeMap: Record<QrSizeOption, number> = {
    small: 160,
    medium: 220,
    large: 280,
  };

  // High resolution export dimensions for clean print & scans
  const exportSizeMap: Record<QrSizeOption, number> = {
    small: 640,
    medium: 1000,
    large: 1400,
  };

  const handleTabSwitch = (tab: 'url' | 'text' | 'wifi' | 'email') => {
    setActiveTab(tab);
    if (tab === 'url') {
      setConfig((prev) => ({ ...prev, value: 'https://toolzbasket.com' }));
    } else if (tab === 'text') {
      setConfig((prev) => ({ ...prev, value: 'Handy tool from Toolzbasket' }));
    } else if (tab === 'wifi') {
      const wifiString = `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`;
      setConfig((prev) => ({ ...prev, value: wifiString }));
    } else if (tab === 'email') {
      const mailto = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}`;
      setConfig((prev) => ({ ...prev, value: mailto }));
    }
  };

  const updateWifiString = (ssid: string, pass: string, enc: 'WPA' | 'WEP' | 'nopass') => {
    setWifiSsid(ssid);
    setWifiPassword(pass);
    setWifiEncryption(enc);
    const wifiString = `WIFI:T:${enc};S:${ssid};P:${pass};;`;
    setConfig((prev) => ({ ...prev, value: wifiString }));
  };

  const updateEmailString = (to: string, subject: string) => {
    setEmailTo(to);
    setEmailSubject(subject);
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}`;
    setConfig((prev) => ({ ...prev, value: mailto }));
  };

  // Download high-resolution PNG
  const handleDownload = () => {
    const container = canvasRef.current;
    if (!container) return;

    const sourceCanvas = container.querySelector('canvas');
    if (!sourceCanvas) return;

    const exportDim = exportSizeMap[config.size];
    const offscreen = document.createElement('canvas');
    offscreen.width = exportDim;
    offscreen.height = exportDim;
    const ctx = offscreen.getContext('2d');

    if (ctx) {
      ctx.fillStyle = config.bgColor;
      ctx.fillRect(0, 0, exportDim, exportDim);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(sourceCanvas, 0, 0, exportDim, exportDim);

      const dataUrl = offscreen.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `toolzbasket-qr-${Date.now()}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2500);
    }
  };

  // Copy PNG or text to clipboard
  const handleCopy = async () => {
    try {
      const container = canvasRef.current;
      const canvas = container?.querySelector('canvas');
      if (canvas && 'ClipboardItem' in window) {
        canvas.toBlob(async (blob) => {
          if (blob) {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob }),
            ]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }
        });
      } else {
        await navigator.clipboard.writeText(config.value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      await navigator.clipboard.writeText(config.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setConfig({
      value: 'https://toolzbasket.com',
      size: 'medium',
      fgColor: '#0A0F1D',
      bgColor: '#FFFFFF',
      level: 'M',
      includeMargin: true,
    });
    setActiveTab('url');
  };

  // Neon & Corporate color presets
  const colorPresets = [
    { label: 'Corporate Standard', fg: '#0A0F1D', bg: '#FFFFFF' },
    { label: 'Neon Cyber', fg: '#00F0FF', bg: '#0A1124' },
    { label: 'Electric Blue', fg: '#2563EB', bg: '#F0F6FF' },
    { label: 'Cyber Emerald', fg: '#10B981', bg: '#081714' },
    { label: 'Electric Amber', fg: '#F59E0B', bg: '#171206' },
    { label: 'Slate Ghost', fg: '#E2E8F0', bg: '#0F172A' },
  ];

  return (
    <section id="qr-tool-section" className="w-full">
      {/* 2-Column Corporate Grid Layout */}
      <div className={`grid grid-cols-1 ${fullWidth ? 'lg:grid-cols-12 gap-7' : 'lg:grid-cols-12 gap-6'} items-start`}>
        {/* Left Column: Input & Options Compartment */}
        <div className={`${fullWidth ? 'lg:col-span-6' : 'lg:col-span-7'} bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-5 sm:p-6 shadow-xl relative`}>
          <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#00F0FF]/30 to-transparent" />

          {/* Section header bar */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1E2E52]">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-[1px] bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                <h2 className="font-heading text-lg sm:text-xl font-bold text-[#F8FAFC]">
                  QR Code Generator
                </h2>
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Real-time, in-browser compilation. Zero external data transmission.
              </p>
            </div>
            <button
              id="reset-qr-button"
              type="button"
              onClick={handleReset}
              className="text-xs font-medium text-[#94A3B8] hover:text-[#00F0FF] flex items-center gap-1 px-2.5 py-1.5 rounded-[3px] border border-[#1E2E52] bg-[#141F3A] hover:bg-[#192748] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
              title="Reset configuration to defaults"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Content Type Tabs */}
          <div className="mt-5">
            <label className="block text-xs font-semibold text-[#CBD5E1] uppercase tracking-wider mb-2">
              1. Select Encoding Protocol
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                id="tab-url"
                onClick={() => handleTabSwitch('url')}
                className={`py-2 px-2 text-xs font-medium rounded-[3px] border flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'url'
                    ? 'bg-[#00F0FF] text-[#0A0F1D] border-[#00F0FF] font-bold shadow-[0_0_12px_rgba(0,240,255,0.35)]'
                    : 'bg-[#141F3A] text-[#94A3B8] border-[#1E2E52] hover:border-[#00F0FF]/50 hover:text-[#F8FAFC]'
                }`}
              >
                <Link className="w-3.5 h-3.5" />
                <span>Web URL</span>
              </button>

              <button
                type="button"
                id="tab-text"
                onClick={() => handleTabSwitch('text')}
                className={`py-2 px-2 text-xs font-medium rounded-[3px] border flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'text'
                    ? 'bg-[#00F0FF] text-[#0A0F1D] border-[#00F0FF] font-bold shadow-[0_0_12px_rgba(0,240,255,0.35)]'
                    : 'bg-[#141F3A] text-[#94A3B8] border-[#1E2E52] hover:border-[#00F0FF]/50 hover:text-[#F8FAFC]'
                }`}
              >
                <Type className="w-3.5 h-3.5" />
                <span>Raw Text</span>
              </button>

              <button
                type="button"
                id="tab-wifi"
                onClick={() => handleTabSwitch('wifi')}
                className={`py-2 px-2 text-xs font-medium rounded-[3px] border flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'wifi'
                    ? 'bg-[#00F0FF] text-[#0A0F1D] border-[#00F0FF] font-bold shadow-[0_0_12px_rgba(0,240,255,0.35)]'
                    : 'bg-[#141F3A] text-[#94A3B8] border-[#1E2E52] hover:border-[#00F0FF]/50 hover:text-[#F8FAFC]'
                }`}
              >
                <Wifi className="w-3.5 h-3.5" />
                <span>Wi-Fi</span>
              </button>

              <button
                type="button"
                id="tab-email"
                onClick={() => handleTabSwitch('email')}
                className={`py-2 px-2 text-xs font-medium rounded-[3px] border flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'email'
                    ? 'bg-[#00F0FF] text-[#0A0F1D] border-[#00F0FF] font-bold shadow-[0_0_12px_rgba(0,240,255,0.35)]'
                    : 'bg-[#141F3A] text-[#94A3B8] border-[#1E2E52] hover:border-[#00F0FF]/50 hover:text-[#F8FAFC]'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </button>
            </div>
          </div>

          {/* Dynamic Content Inputs */}
          <div className="mt-4">
            {activeTab === 'url' && (
              <div>
                <label
                  htmlFor="qr-url-input"
                  className="block text-xs font-medium text-[#94A3B8] mb-1.5"
                >
                  Destination Web URL:
                </label>
                <div className="relative">
                  <input
                    id="qr-url-input"
                    type="url"
                    value={config.value}
                    onChange={(e) =>
                      setConfig((prev) => ({ ...prev, value: e.target.value }))
                    }
                    placeholder="https://example.com"
                    className="w-full px-3.5 py-2.5 bg-[#0D1527] border border-[#1E2E52] focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] rounded-[3px] text-sm text-[#F8FAFC] placeholder-[#475569] font-mono outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {activeTab === 'text' && (
              <div>
                <label
                  htmlFor="qr-text-input"
                  className="block text-xs font-medium text-[#94A3B8] mb-1.5"
                >
                  Plain String Payload:
                </label>
                <textarea
                  id="qr-text-input"
                  rows={3}
                  value={config.value}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, value: e.target.value }))
                  }
                  placeholder="Paste inventory IDs, license keys, or message..."
                  className="w-full px-3.5 py-2 bg-[#0D1527] border border-[#1E2E52] focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] rounded-[3px] text-sm text-[#F8FAFC] placeholder-[#475569] font-mono outline-none transition-colors"
                />
              </div>
            )}

            {activeTab === 'wifi' && (
              <div className="space-y-3 bg-[#0D1527] p-3.5 rounded-[3px] border border-[#1E2E52]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="wifi-ssid"
                      className="block text-[11px] font-semibold text-[#94A3B8] mb-1"
                    >
                      Network SSID
                    </label>
                    <input
                      id="wifi-ssid"
                      type="text"
                      value={wifiSsid}
                      onChange={(e) =>
                        updateWifiString(e.target.value, wifiPassword, wifiEncryption)
                      }
                      className="w-full px-2.5 py-1.5 bg-[#141F3A] border border-[#1E2E52] text-[#F8FAFC] rounded-[3px] text-xs font-mono focus:border-[#00F0FF] outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="wifi-pass"
                      className="block text-[11px] font-semibold text-[#94A3B8] mb-1"
                    >
                      Access Key / Password
                    </label>
                    <input
                      id="wifi-pass"
                      type="text"
                      value={wifiPassword}
                      onChange={(e) =>
                        updateWifiString(wifiSsid, e.target.value, wifiEncryption)
                      }
                      placeholder="Optional"
                      className="w-full px-2.5 py-1.5 bg-[#141F3A] border border-[#1E2E52] text-[#F8FAFC] rounded-[3px] text-xs font-mono focus:border-[#00F0FF] outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-[#94A3B8] mb-1">
                    Security Protocol
                  </label>
                  <div className="flex gap-2">
                    {(['WPA', 'WEP', 'nopass'] as const).map((enc) => (
                      <button
                        key={enc}
                        type="button"
                        onClick={() => updateWifiString(wifiSsid, wifiPassword, enc)}
                        className={`px-3 py-1 text-xs rounded-[3px] border transition-colors ${
                          wifiEncryption === enc
                            ? 'bg-[#00F0FF] text-[#0A0F1D] border-[#00F0FF] font-bold'
                            : 'bg-[#141F3A] text-[#94A3B8] border-[#1E2E52]'
                        }`}
                      >
                        {enc === 'nopass' ? 'Open (None)' : enc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="space-y-3 bg-[#0D1527] p-3.5 rounded-[3px] border border-[#1E2E52]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="email-recipient"
                      className="block text-[11px] font-semibold text-[#94A3B8] mb-1"
                    >
                      Destination Email
                    </label>
                    <input
                      id="email-recipient"
                      type="email"
                      value={emailTo}
                      onChange={(e) => updateEmailString(e.target.value, emailSubject)}
                      className="w-full px-2.5 py-1.5 bg-[#141F3A] border border-[#1E2E52] text-[#F8FAFC] rounded-[3px] text-xs font-mono focus:border-[#00F0FF] outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email-sub"
                      className="block text-[11px] font-semibold text-[#94A3B8] mb-1"
                    >
                      Preset Subject
                    </label>
                    <input
                      id="email-sub"
                      type="text"
                      value={emailSubject}
                      onChange={(e) => updateEmailString(emailTo, e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-[#141F3A] border border-[#1E2E52] text-[#F8FAFC] rounded-[3px] text-xs font-mono focus:border-[#00F0FF] outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Matrix Calibration Controls */}
          <div className="mt-5 pt-4 border-t border-[#1E2E52] space-y-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F8FAFC] uppercase tracking-wider">
              <Sliders className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>2. Matrix Calibration & Sizing</span>
            </div>

            {/* Size options */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[#94A3B8] font-medium">Output Dimension:</span>
                <span className="text-[11px] font-mono text-[#38BDF8]">
                  Export: {exportSizeMap[config.size]} × {exportSizeMap[config.size]} px
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(['small', 'medium', 'large'] as QrSizeOption[]).map((s) => (
                  <button
                    key={s}
                    id={`qr-size-${s}`}
                    type="button"
                    onClick={() => setConfig((prev) => ({ ...prev, size: s }))}
                    className={`py-1.5 px-3 rounded-[3px] border text-xs capitalize transition-all ${
                      config.size === s
                        ? 'bg-[#00F0FF] text-[#0A0F1D] border-[#00F0FF] font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                        : 'bg-[#141F3A] text-[#94A3B8] border-[#1E2E52] hover:text-[#F8FAFC]'
                    }`}
                  >
                    {s} ({displaySizeMap[s]}px)
                  </button>
                ))}
              </div>
            </div>

            {/* Color controls */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#94A3B8] font-medium flex items-center gap-1">
                  <Palette className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>Color Configuration:</span>
                </span>
                <span className="text-[11px] font-mono text-[#64748B]">
                  {config.fgColor} / {config.bgColor}
                </span>
              </div>

              {/* Color pickers & Presets */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 bg-[#141F3A] px-2.5 py-1.5 rounded-[3px] border border-[#1E2E52]">
                    <span className="text-xs text-[#94A3B8]">Foreground:</span>
                    <input
                      id="qr-fg-color"
                      type="color"
                      value={config.fgColor}
                      onChange={(e) =>
                        setConfig((prev) => ({ ...prev, fgColor: e.target.value }))
                      }
                      className="w-6 h-6 rounded-[2px] border border-[#1E2E52] cursor-pointer bg-transparent"
                      title="Select foreground color"
                    />
                    <span className="text-[11px] font-mono text-[#F8FAFC]">
                      {config.fgColor}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-[#141F3A] px-2.5 py-1.5 rounded-[3px] border border-[#1E2E52]">
                    <span className="text-xs text-[#94A3B8]">Background:</span>
                    <input
                      id="qr-bg-color"
                      type="color"
                      value={config.bgColor}
                      onChange={(e) =>
                        setConfig((prev) => ({ ...prev, bgColor: e.target.value }))
                      }
                      className="w-6 h-6 rounded-[2px] border border-[#1E2E52] cursor-pointer bg-transparent"
                      title="Select background color"
                    />
                    <span className="text-[11px] font-mono text-[#F8FAFC]">
                      {config.bgColor}
                    </span>
                  </div>
                </div>

                {/* Quick presets */}
                <div className="flex items-center gap-1.5 pt-1 overflow-x-auto pb-1">
                  <span className="text-[11px] text-[#64748B] whitespace-nowrap">
                    Presets:
                  </span>
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() =>
                        setConfig((prev) => ({
                          ...prev,
                          fgColor: preset.fg,
                          bgColor: preset.bg,
                        }))
                      }
                      className="px-2 py-0.5 text-[11px] rounded-[3px] border border-[#1E2E52] bg-[#141F3A] hover:bg-[#1C2C52] text-[#CBD5E1] whitespace-nowrap transition-colors"
                    >
                      <span
                        className="inline-block w-2 h-2 rounded-[1px] mr-1 align-middle border border-white/20"
                        style={{ backgroundColor: preset.fg }}
                      />
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Error correction & quiet margin toggle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label
                  htmlFor="qr-ecc-level"
                  className="block text-xs text-[#94A3B8] font-medium mb-1"
                >
                  Error Correction Level:
                </label>
                <select
                  id="qr-ecc-level"
                  value={config.level}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      level: e.target.value as ErrorCorrectionLevel,
                    }))
                  }
                  className="w-full px-2.5 py-1.5 bg-[#0D1527] border border-[#1E2E52] focus:border-[#00F0FF] rounded-[3px] text-xs font-mono text-[#F8FAFC] outline-none"
                >
                  <option value="L">L - Low (7% redundancy)</option>
                  <option value="M">M - Medium (15% redundancy)</option>
                  <option value="Q">Q - Quartile (25% redundancy)</option>
                  <option value="H">H - High (30% redundancy)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#94A3B8] font-medium mb-1">
                  Quiet Zone (Margin):
                </label>
                <button
                  type="button"
                  id="qr-margin-toggle"
                  onClick={() =>
                    setConfig((prev) => ({
                      ...prev,
                      includeMargin: !prev.includeMargin,
                    }))
                  }
                  className={`w-full py-1.5 px-3 rounded-[3px] border text-xs flex items-center justify-between transition-colors ${
                    config.includeMargin
                      ? 'bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/40'
                      : 'bg-[#141F3A] text-[#94A3B8] border-[#1E2E52]'
                  }`}
                >
                  <span>Include Margin</span>
                  <span className="font-mono font-semibold">
                    {config.includeMargin ? 'Active' : 'Disabled'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Neon & Dark Blue Corporate Mount / HUD Preview */}
        <div className={`${fullWidth ? 'lg:col-span-6' : 'lg:col-span-5'} flex flex-col items-center w-full`}>
          <div className="w-full relative pt-4">
            {/* Top Corporate Fixture with Neon Laser Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
              <div className="w-28 h-3.5 bg-[#0B1224] rounded-t-[3px] border border-[#1E2E52] flex items-center justify-center">
                <div className="w-14 h-1 bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] rounded-full" />
              </div>
              <div className="w-32 h-1.5 bg-[#141F3A] border-x border-b border-[#1E2E52] rounded-b-[2px]" />
            </div>

            {/* Spec Sheet Display Card */}
            <div className="w-full bg-[#10182E] border-2 border-[#1E3A6E] rounded-[4px] p-6 sm:p-7 relative shadow-[0_0_30px_rgba(0,240,255,0.08)]">
              {/* Draft registration corners */}
              <div className="absolute top-2 left-2 text-[9px] font-mono text-[#38BDF8]/60 select-none">
                ┌ DIGITAL-MATRIX
              </div>
              <div className="absolute top-2 right-2 text-[9px] font-mono text-[#38BDF8]/60 select-none">
                TOOLZBASKET ┐
              </div>
              <div className="absolute bottom-2 left-2 text-[9px] font-mono text-[#38BDF8]/60 select-none">
                └ AUTH-VALID
              </div>
              <div className="absolute bottom-2 right-2 text-[9px] font-mono text-[#38BDF8]/60 select-none">
                ISO-18004 ┘
              </div>

              {/* Spec sheet label badge */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1E2E52]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 border border-[#00F0FF]/30 rounded-[2px]">
                    LIVE MATRIX RENDER
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-[#10B981] font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Valid ISO Matrix</span>
                </div>
              </div>

              {/* Centered QR Canvas Box */}
              <div
                ref={canvasRef}
                className="flex items-center justify-center p-4 rounded-[3px] border border-[#1E2E52] min-h-[260px] transition-colors"
                style={{ backgroundColor: config.bgColor }}
              >
                {config.value.trim() ? (
                  <QRCodeCanvas
                    value={config.value}
                    size={displaySizeMap[config.size]}
                    fgColor={config.fgColor}
                    bgColor={config.bgColor}
                    level={config.level}
                    includeMargin={config.includeMargin}
                  />
                ) : (
                  <div className="text-center p-6 text-[#64748B]">
                    <p className="text-xs font-mono">Empty input field</p>
                    <p className="text-[11px] text-[#475569] mt-1">
                      Provide text or URL to compile matrix
                    </p>
                  </div>
                )}
              </div>

              {/* Stamped payload info */}
              <div className="mt-3 pt-2.5 border-t border-[#1E2E52] text-[11px] font-mono text-[#94A3B8] flex items-center justify-between truncate">
                <span className="truncate max-w-[200px]" title={config.value}>
                  Payload: {config.value || '(empty)'}
                </span>
                <span className="text-[#38BDF8]">ECC: {config.level}</span>
              </div>

              {/* Standout Rust/Neon CTA Button */}
              <div className="mt-5 space-y-2.5">
                <button
                  id="download-qr-button"
                  type="button"
                  onClick={handleDownload}
                  disabled={!config.value.trim()}
                  className="w-full py-3 px-4 bg-[#00F0FF] hover:bg-[#38BDF8] active:bg-[#00C4D6] disabled:opacity-40 text-[#0A0F1D] font-heading font-bold text-sm tracking-wide rounded-[4px] border border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                >
                  <Download className="w-4 h-4 text-[#0A0F1D] stroke-[2.5]" />
                  <span>
                    {downloadSuccess ? 'Downloaded PNG File!' : 'Download as PNG'}
                  </span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    id="copy-qr-button"
                    type="button"
                    onClick={handleCopy}
                    disabled={!config.value.trim()}
                    className="py-2 px-3 bg-[#141F3A] hover:bg-[#1A294C] text-[#CBD5E1] hover:text-[#00F0FF] font-medium text-xs rounded-[3px] border border-[#1E2E52] transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#10B981]" />
                        <span className="text-[#10B981]">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#94A3B8]" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>

                  <button
                    id="zoom-qr-preview"
                    type="button"
                    onClick={() => {
                      const nextSize: Record<QrSizeOption, QrSizeOption> = {
                        small: 'medium',
                        medium: 'large',
                        large: 'small',
                      };
                      setConfig((prev) => ({ ...prev, size: nextSize[prev.size] }));
                    }}
                    className="py-2 px-3 bg-[#141F3A] hover:bg-[#1A294C] text-[#CBD5E1] hover:text-[#00F0FF] font-medium text-xs rounded-[3px] border border-[#1E2E52] transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF]"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-[#94A3B8]" />
                    <span>Cycle Size</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
