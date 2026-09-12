import React, { useEffect, useRef } from 'react';

interface AdSlotProps {
  id: 'ad-slot-top' | 'ad-slot-sidebar' | 'ad-slot-infeed' | 'ad-slot-footer' | string;
  format?: 'banner' | 'sidebar' | 'infeed' | 'footer';
  className?: string;
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

    case 'ad-slot-infeed':
      return `<script async="async" data-cfasync="false" src="https://pl31311960.profitableratecpmnetwork.com/be0e6821673812f66b00df7832f323a9/invoke.js"></script>
<div id="container-be0e6821673812f66b00df7832f323a9"></div>`;

    default:
      return '';
  }
};

export const AdSlot: React.FC<AdSlotProps> = ({ id, format = 'banner', className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

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
        return 'w-full min-h-[90px] max-w-4xl mx-auto';
    }
  };

  useEffect(() => {
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
  }, [id]);

  const rawHtml = getAdRawHtml(id);

  return (
    <div
      id={id}
      ref={containerRef}
      data-ad-unit={id}
      aria-label={`Advertisement: ${id}`}
      className={`flex items-center justify-center overflow-x-auto overflow-y-hidden my-4 ${getFormatClasses()} ${className}`}
      dangerouslySetInnerHTML={{ __html: rawHtml }}
    />
  );
};
