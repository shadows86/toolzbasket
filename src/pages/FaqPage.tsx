import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PageRoute } from '../types';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

interface FaqPageProps {
  onNavigate: (path: PageRoute) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const faqs: FaqItem[] = [
    {
      question: 'Do the QR codes generated on Toolzbasket ever expire?',
      answer:
        'No, never. The QR codes generated on Toolzbasket are direct static matrix codes. The actual destination URL or raw text string is mathematically embedded directly into the pixel pattern itself. Because there are no intermediate redirect URLs, URL shorteners, or hosted accounts involved, your code will work indefinitely as long as the printed graphic remains legible and your destination URL exists.',
      category: 'Permanence & Storage',
    },
    {
      question: 'Is any of my encoded text, contact info, or Wi-Fi password sent to a server?',
      answer:
        'Zero. Toolzbasket operates 100% client-side inside your web browser. All mathematical matrix calculations and raster image drawing are performed on your local CPU by JavaScript. Your keystrokes and Wi-Fi credentials never leave your browser window and are never sent over the internet or logged in any database.',
      category: 'Privacy & Security',
    },
    {
      question: 'What is the recommended minimum physical size for printing a QR code?',
      answer:
        'As a rule of thumb, standard camera scanners need the QR code to be at least 2 x 2 cm (0.8 x 0.8 inches) for close-range scanning (e.g. handheld business cards or menus). If the code contains long URLs or complex data with high density, increase the print size to at least 3 x 3 cm. For posters or banners scanned from several meters away, use the standard 10:1 distance-to-size ratio (e.g., a code scanned from 2 meters away should be at least 20 cm wide).',
      category: 'Printing & Quality',
    },
    {
      question: 'Can I use Toolzbasket QR codes for commercial projects and merchandise?',
      answer:
        'Yes. All generated codes are standard ISO/IEC 18004 compliant barcodes and are 100% free for personal, commercial, and enterprise applications. You can print them on physical retail packaging, restaurant menus, product tags, marketing flyers, or software documentation without attribution or royalties.',
      category: 'Commercial Use',
    },
    {
      question: 'What is "Error Correction Level" and which setting should I select?',
      answer:
        'Error correction uses Reed-Solomon redundancy blocks to rebuild data if the code gets physically damaged or obscured. Level L restores up to 7% of missing data, Level M restores up to 15%, Level Q restores up to 25%, and Level H restores up to 30%. Level M is the ideal everyday balance between scan speed and scratch resistance. For outdoor stickers or industrial machinery where grease and scuffs occur, select Level H.',
      category: 'Technical Specifications',
    },
    {
      question: 'Why do smartphone cameras struggle when I choose a dark background?',
      answer:
        'The international QR standard expects dark modules on a light background. Many budget mobile optical sensors and native camera apps are programmed to detect the three square corner position markers by looking for dark ink on light contrast. Inverting the colors (e.g. white dots on a dark surface) often breaks automatic detection on older Android or iOS devices. For maximum compatibility across all devices, always keep the foreground darker than the background.',
      category: 'Technical Specifications',
    },
    {
      question: 'Can I edit the destination URL after printing the QR code?',
      answer:
        'Because these are authentic static QR codes, the URL is permanently encoded in the physical ink. To change where a code points after printing, you would need to set up a redirection on your own web server (e.g., pointing the QR to `yourdomain.com/menu` and configuring your server to forward visitors wherever needed). We deliberately do not run proprietary redirect servers to protect your privacy and ensure your codes never break.',
      category: 'Permanence & Storage',
    },
    {
      question: 'Is Toolzbasket completely free to use?',
      answer:
        'Yes, Toolzbasket is 100% free with no registration, no hidden trials, and no limits on the number of QR codes you can generate or download. We fund our lightweight hosting infrastructure through unobtrusive static banner sponsorships.',
      category: 'Pricing & Platform',
    },
  ];

  const [openIndices, setOpenIndices] = useState<number[]>([0, 1]);

  const toggleAccordion = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="w-full space-y-8">
      {/* Page Header */}
      <div className="border-b border-[#1E2E52] pb-4">
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] mt-1">
          Everything you need to know regarding QR matrix standards, offline security, scanning ergonomics, and enterprise deployment.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndices.includes(index);
          return (
            <div
              key={index}
              className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] overflow-hidden transition-all shadow-md"
            >
              <button
                type="button"
                id={`faq-toggle-${index}`}
                onClick={() => toggleAccordion(index)}
                aria-expanded={isOpen}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00F0FF] hover:bg-[#141F3A] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold text-[#00F0FF] w-6 shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-heading text-sm sm:text-base font-bold text-[#F8FAFC]">
                    {faq.question}
                  </span>
                </div>
                <div
                  className={`w-6 h-6 rounded-[2px] border border-[#1E2E52] flex items-center justify-center shrink-0 text-[#94A3B8] transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#00F0FF] text-[#0A0F1D] shadow-[0_0_8px_#00F0FF]' : 'bg-[#141F3A]'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm text-[#CBD5E1] leading-relaxed border-t border-[#1E2E52]">
                  <div className="pt-2 pl-9">{faq.answer}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Still Have Questions Box */}
      <div className="bg-[#10182E] border border-[#1E2E52] rounded-[4px] p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div>
          <h2 className="font-heading text-base font-bold text-[#F8FAFC]">
            Have an unlisted question or enterprise inquiry?
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Reach out directly to the Toolzbasket engineering team.
          </p>
        </div>
        <button
          onClick={() => onNavigate('/contact')}
          className="px-4 py-2 bg-[#141F3A] hover:bg-[#1E2E52] text-xs font-semibold text-[#00F0FF] border border-[#00F0FF]/40 rounded-[3px] transition-colors shadow-sm"
        >
          Contact Team
        </button>
      </div>
    </div>
  );
};
