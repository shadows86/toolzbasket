import React, { useEffect, useRef, useState } from 'react';
import { NativeAdBanner } from './NativeAdBanner';
import { ConditionalAdContainer } from './ConditionalAdContainer';

export { NativeAdBanner, ConditionalAdContainer };

interface AdSlotProps {
  id: 'ad-slot-top' | 'ad-slot-sidebar' | 'ad-slot-infeed' | 'ad-slot-footer' | string;
  format?: 'banner' | 'sidebar' | 'infeed' | 'footer';
  className?: string;
  onAdStatusChange?: (status: 'loading' | 'loaded' | 'failed') => void;
}

const getAdRawHtml = (slotId: string): string => {
  switch (slotId) {
    case 'ad-slot-top':
      return `<script>
  atOptions = {
    'key' : '2e08743360648b600fb0a1959aa67d0d',
    'format' : 'iframe',
    'height' : 90,
    'width' : 728,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/2e08743360648b600fb0a1959aa67d0d/invoke.js"></script>`;

    case 'ad-slot-footer':
      return `<script>
  atOptions = {
    'key' : '871c57e3bf38c300ef02b1564a6ff2d5',
    'format' : 'iframe',
    'height' : 60,
    'width' : 468,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/871c57e3bf38c300ef02b1564a6ff2d5/invoke.js"></script>`;

    case 'ad-slot-sidebar':
      return `<script>
  atOptions = {
    'key' : '358d1c7f8e4c68b22da2b32bcb729ca7',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/358d1c7f8e4c68b22da2b32bcb729ca7/invoke.js"></script>`;

    default:
      return '';
  }
};

export const AdSlot: React.FC<AdSlotProps> = ({ id, format = 'banner', className = '', onAdStatusChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [adFailed, setAdFailed] = useState(false);

  const getFormatClasses = () => {
    switch (format) {
      case 'sidebar':
        return 'w-full min-h-[250px] max-w-[300px] mx-auto';
      case 'infeed':
        return 'w-full min-h-[90px] md:min-h-[120px] max-w-3xl mx-auto';
      case 'footer':
        return 'w-full min-h-[60px] max-w-[468px] mx-auto';
      case 'banner':
      default:
        // Use min-h-0 so unrendered ads do not force empty blank space
        return 'w-full min-h-0 max-w-4xl mx-auto';
    }
  };

  useEffect(() => {
    if (id === 'ad-slot-infeed') return;

    const container = containerRef.current;
    if (!container) return;

    // Execute scripts: HTML5 suppresses scripts inserted via innerHTML.
    // By replacing each with a fresh document.createElement('script'), we ensure
    // browsers reliably execute the third-party ad scripts.
    const scripts = container.querySelectorAll('script');
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach((attr) => {
        const attribute = attr as Attr;
        newScript.setAttribute(attribute.name, attribute.value);
      });
      newScript.text = oldScript.text || oldScript.innerHTML;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });

    // Check if ad renders successfully within 2000ms
    const checkLoaded = (): boolean => {
      if (!container) return false;
      const iframe = container.querySelector('iframe') as HTMLIFrameElement | null;
      if (iframe && (iframe.offsetHeight > 10 || iframe.getBoundingClientRect().height > 10)) {
        return true;
      }
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

    const observer = new MutationObserver(() => {
      if (checkLoaded()) {
        onAdStatusChange?.('loaded');
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    const timer = setTimeout(() => {
      if (!container) return;

      const isLoaded = checkLoaded();
      if (!isLoaded) {
        setAdFailed(true);
        onAdStatusChange?.('failed');
      } else {
        onAdStatusChange?.('loaded');
      }
    }, 2000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [id, onAdStatusChange]);

  if (id === 'ad-slot-infeed') {
    return (
      <div
        id={id}
        data-ad-unit={id}
        aria-label={`Advertisement: ${id}`}
        className={`flex items-center justify-center overflow-x-auto overflow-y-hidden my-4 ${getFormatClasses()} ${className}`}
      >
        <NativeAdBanner
          scriptSrc="https://pl31311960.profitableratecpmnetwork.com/be0e6821673812f66b00df7832f323a9/invoke.js"
          containerId="container-be0e6821673812f66b00df7832f323a9"
          dataCfasync="false"
          async={true}
        />
      </div>
    );
  }

  const rawHtml = getAdRawHtml(id);

  return (
    <div
      id={id}
      ref={containerRef}
      data-ad-unit={id}
      aria-label={`Advertisement: ${id}`}
      hidden={adFailed}
      className={`header-ad-container flex items-center justify-center overflow-x-auto overflow-y-hidden transition-all duration-300 ease-in-out ${
        adFailed ? 'ad-failed' : format === 'banner' ? 'my-2' : 'my-4'
      } ${getFormatClasses()} ${className}`}
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
      dangerouslySetInnerHTML={{ __html: rawHtml }}
    />
  );
};


