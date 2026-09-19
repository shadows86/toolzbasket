import React, { useEffect, useRef } from 'react';
import { NativeAdBanner } from './NativeAdBanner';
import { ConditionalAdContainer } from './ConditionalAdContainer';

export { NativeAdBanner, ConditionalAdContainer };

interface AdSlotProps {
  id:
    | 'ad-slot-top'
    | 'ad-slot-sidebar'
    | 'ad-slot-left-sidebar'
    | 'ad-slot-incontent'
    | 'ad-slot-infeed'
    | 'ad-slot-footer'
    | string;
  format?: 'banner' | 'sidebar' | 'incontent' | 'infeed' | 'footer';
  className?: string;
  onAdStatusChange?: (status: 'loading' | 'loaded' | 'failed') => void;
}

const getAdRawHtml = (slotId: string): string => {
  switch (slotId) {
    case 'ad-slot-top': {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 728;
      const width = isMobile ? 320 : 728;
      const height = isMobile ? 50 : 90;
      return `<script>
  atOptions = {
    'key' : '2e08743360648b600fb0a1959aa67d0d',
    'format' : 'iframe',
    'height' : ${height},
    'width' : ${width},
    'params' : {}
  };
</script>
<script src="https://www.highrevenueformat.com/2e08743360648b600fb0a1959aa67d0d/invoke.js"></script>`;
    }

    case 'ad-slot-footer':
    case 'ad-slot-footer-banner': {
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
    }

    case 'ad-slot-left-sidebar':
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

    case 'ad-slot-incontent': {
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 500;
      if (isMobile) {
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
      }
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
    }

    default:
      return '';
  }
};

export const AdSlot: React.FC<AdSlotProps> = ({ id, format = 'banner', className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getFormatClasses = () => {
    switch (format) {
      case 'sidebar':
        return 'w-full max-w-[300px] mx-auto min-h-[250px] ad-sidebar-slot ad-shimmer';
      case 'incontent':
        return 'w-full max-w-[468px] mx-auto min-h-[90px] ad-incontent-slot ad-shimmer';
      case 'infeed':
        return 'w-full max-w-3xl mx-auto min-h-[90px] ad-shimmer';
      case 'footer':
        return 'w-full max-w-4xl mx-auto min-h-[90px] ad-footer-slot ad-shimmer';
      case 'banner':
      default:
        return 'w-full max-w-4xl mx-auto min-h-[50px] md:min-h-[90px] ad-header-slot bg-transparent ad-shimmer';
    }
  };

  useEffect(() => {
    if (id === 'ad-slot-infeed') return;

    const container = containerRef.current;
    if (!container) return;

    // Execute scripts: HTML5 suppresses scripts inserted via innerHTML.
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
  }, [id]);

  if (id === 'ad-slot-infeed') {
    return (
      <div
        id={id}
        data-ad-unit={id}
        aria-label={`Advertisement: ${id}`}
        className={`ad-container-default flex items-center justify-center my-4 ${getFormatClasses()} ${className}`}
        style={{
          display: 'block',
          visibility: 'visible',
          opacity: 1,
          overflow: 'visible',
          minHeight: '90px',
        }}
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
      className={`ad-container-default flex items-center justify-center ${getFormatClasses()} ${className}`}
      style={{
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        overflow: 'visible',
        minHeight:
          format === 'sidebar'
            ? '250px'
            : format === 'banner'
            ? '90px'
            : '90px',
        background: format === 'banner' ? 'transparent' : undefined,
      }}
      dangerouslySetInnerHTML={{ __html: rawHtml }}
    />
  );
};


