import React, { useState, useEffect, useRef } from 'react';

interface ConditionalAdContainerProps {
  children: React.ReactNode;
  timeoutMs?: number;
  className?: string;
  onAdStatusChange?: (status: 'loading' | 'loaded' | 'failed') => void;
}

export const ConditionalAdContainer: React.FC<ConditionalAdContainerProps> = ({
  children,
  timeoutMs = 2000,
  className = '',
  onAdStatusChange,
}) => {
  const [adFailed, setAdFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isResolved = false;

    // Helper to check if an ad has loaded with non-zero dimensions
    const isAdLoaded = (): boolean => {
      if (!container) return false;

      // Check for iframes created by ad networks (Adsterra, etc.)
      const iframes = container.querySelectorAll('iframe');
      for (let i = 0; i < iframes.length; i++) {
        const iframe = iframes[i] as HTMLIFrameElement;
        const rect = iframe.getBoundingClientRect();
        if (rect.height > 10 && rect.width > 10) {
          return true;
        }
        if (iframe.offsetHeight > 10 && iframe.offsetWidth > 10) {
          return true;
        }
      }

      // Check for any non-script, non-style child element with rendered dimensions
      const allElements = container.querySelectorAll('*');
      for (let i = 0; i < allElements.length; i++) {
        const el = allElements[i] as HTMLElement;
        const tag = el.tagName ? el.tagName.toLowerCase() : '';
        if (tag !== 'script' && tag !== 'style') {
          const rect = el.getBoundingClientRect();
          if (rect.height > 10 && rect.width > 10) {
            return true;
          }
        }
      }

      return false;
    };

    // Watch for DOM changes (ad script injecting iframe or elements)
    const observer = new MutationObserver(() => {
      if (isAdLoaded()) {
        isResolved = true;
        onAdStatusChange?.('loaded');
        observer.disconnect();
      }
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    // 2-second timeout check as specified
    const timer = setTimeout(() => {
      observer.disconnect();
      if (!isResolved && !isAdLoaded()) {
        setAdFailed(true);
        onAdStatusChange?.('failed');
      }
    }, timeoutMs);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [timeoutMs, onAdStatusChange]);

  return (
    <div
      ref={containerRef}
      id="header-ad-conditional-container"
      hidden={adFailed}
      className={`header-ad-container transition-all duration-300 ease-in-out ${
        adFailed ? 'ad-failed' : ''
      } ${className}`}
      style={{
        minHeight: 0,
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        ...(adFailed
          ? {
              height: 0,
              minHeight: 0,
              maxHeight: 0,
              margin: 0,
              padding: 0,
              display: 'none',
              visibility: 'hidden',
            }
          : {}),
      }}
    >
      {!adFailed && children}
    </div>
  );
};

export default ConditionalAdContainer;
