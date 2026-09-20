import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { HowToUsePage } from './pages/HowToUsePage';
import { FaqPage } from './pages/FaqPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ContactPage } from './pages/ContactPage';

const pageTitles: Record<PageRoute, string> = {
  '/': 'Toolzbasket — Free In-Browser QR Code Generator',
  '/how-to-use': 'How to Use QR Generator — Toolzbasket',
  '/faq': 'Frequently Asked Questions — Toolzbasket',
  '/about-us': 'About Us — Toolzbasket',
  '/privacy-policy': 'Privacy Policy — Toolzbasket',
  '/terms-of-service': 'Terms of Service — Toolzbasket',
  '/contact': 'Contact Us — Toolzbasket',
};

const pageDescriptions: Record<PageRoute, string> = {
  '/': 'Toolzbasket offers a fast, customizable client-side QR code generator. Zero server storage, instant PNG downloads, and complete in-browser privacy.',
  '/how-to-use': 'Step-by-step instructions on generating, sizing, testing, and downloading QR codes on Toolzbasket.',
  '/faq': 'Frequently asked questions about QR code scanning distance, error correction levels, privacy, and commercial use on Toolzbasket.',
  '/about-us': 'Learn about Toolzbasket and our physical workbench philosophy of building free, fast, 100% client-side everyday web tools.',
  '/privacy-policy': 'Privacy policy for Toolzbasket: zero server collection of tool data, third-party advertising cookies, and security disclosures.',
  '/terms-of-service': 'Terms of service for using free client-side utilities on Toolzbasket.',
  '/contact': 'Direct contact details and feedback channels for Toolzbasket.',
};

export default function App() {
  const getInitialPath = (): PageRoute => {
    if (typeof window === 'undefined') return '/';
    const path = window.location.pathname as PageRoute;
    if (pageTitles[path]) {
      return path;
    }
    // Also check hash routing fallback like #/faq
    const hash = window.location.hash.replace('#', '') as PageRoute;
    if (pageTitles[hash]) {
      return hash;
    }
    return '/';
  };

  const [currentPath, setCurrentPath] = useState<PageRoute>(getInitialPath);

  const navigate = (path: PageRoute) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      try {
        window.history.pushState({}, '', path);
      } catch {
        // Fallback for sandboxed iframes where pushState may be restricted
        window.location.hash = path;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as PageRoute;
      if (pageTitles[path]) {
        setCurrentPath(path);
      } else {
        const hash = window.location.hash.replace('#', '') as PageRoute;
        if (pageTitles[hash]) {
          setCurrentPath(hash);
        } else {
          setCurrentPath('/');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync title and meta tags for SEO
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = pageTitles[currentPath] || 'Toolzbasket';

      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          pageDescriptions[currentPath] ||
            'Toolzbasket: Your basket of handy everyday tools.'
        );
      }

      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) {
        ogTitle.setAttribute('content', pageTitles[currentPath] || 'Toolzbasket');
      }

      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute(
          'content',
          pageDescriptions[currentPath] ||
            'Toolzbasket: Your basket of handy everyday tools.'
        );
      }
    }
  }, [currentPath]);

  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/how-to-use':
        return <HowToUsePage onNavigate={navigate} />;
      case '/faq':
        return <FaqPage onNavigate={navigate} />;
      case '/about-us':
        return <AboutPage onNavigate={navigate} />;
      case '/privacy-policy':
        return <PrivacyPolicyPage onNavigate={navigate} />;
      case '/terms-of-service':
        return <TermsPage onNavigate={navigate} />;
      case '/contact':
        return <ContactPage onNavigate={navigate} />;
      case '/':
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0F1D] text-[#F8FAFC]">
      {/* Top Navigation Header */}
      <Header currentPath={currentPath} onNavigate={navigate} />

      {/* Main Page Workspace Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}
