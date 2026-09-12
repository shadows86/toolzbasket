import React from 'react';

interface AdSlotProps {
  id: 'ad-slot-top' | 'ad-slot-sidebar' | 'ad-slot-infeed' | 'ad-slot-footer' | string;
  format?: 'banner' | 'sidebar' | 'infeed' | 'footer';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ id, format = 'banner', className = '' }) => {
  const getFormatClasses = () => {
    switch (format) {
      case 'sidebar':
        return 'w-full min-h-[250px] max-w-[300px] mx-auto';
      case 'infeed':
        return 'w-full min-h-[90px] md:min-h-[120px] max-w-3xl mx-auto';
      case 'footer':
        return 'w-full min-h-[90px] max-w-4xl mx-auto';
      case 'banner':
      default:
        return 'w-full min-h-[90px] max-w-4xl mx-auto';
    }
  };

  return (
    <div
      id={id}
      data-ad-unit={id}
      aria-label={`Advertisement: ${id}`}
      className={`border border-dashed border-[#1E2E52] hover:border-[#00F0FF]/50 bg-[#0D1527]/70 text-[#64748B] text-xs font-mono tracking-wider uppercase rounded-[4px] flex flex-col items-center justify-center p-3 text-center transition-all my-4 ${getFormatClasses()} ${className}`}
    >
      <span className="text-[11px] font-medium tracking-widest text-[#94A3B8]">Ad Placeholder</span>
      <span className="text-[10px] text-[#00F0FF]/80 mt-0.5">#{id}</span>
    </div>
  );
};
