import React, { useEffect, useRef } from 'react';

export interface NativeAdBannerProps {
  /** The ad script's src URL */
  scriptSrc?: string;
  src?: string;
  /** The id for the target empty container div (e.g. 'container-be0e6821673812f66b00df7832f323a9') */
  containerId: string;
  /** Cloudflare async execution attribute ('false' by default) */
  dataCfasync?: string | boolean;
  /** Whether script should load asynchronously (true by default) */
  async?: boolean;
  /** Any custom data-* attributes to set on the script element */
  dataAttributes?: Record<string, string>;
  /** Optional class name for the wrapper container */
  className?: string;
}

export const NativeAdBanner: React.FC<NativeAdBannerProps> = ({
  scriptSrc,
  src,
  containerId,
  dataCfasync = 'false',
  async: isAsync = true,
  dataAttributes,
  className = '',
}) => {
  const finalSrc = scriptSrc || src || '';
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !finalSrc) return;

    // Check if script is already present in this container to prevent duplicate loading
    const existing = container.querySelector(`script[src="${finalSrc}"]`);
    if (existing) return;

    // Create a real script element via document.createElement (NOT innerHTML)
    const script = document.createElement('script');
    script.src = finalSrc;

    if (isAsync) {
      script.async = true;
    }

    // Set data-cfasync attribute
    script.setAttribute('data-cfasync', String(dataCfasync));

    // Set any additional custom data attributes
    if (dataAttributes) {
      Object.entries(dataAttributes).forEach(([key, val]) => {
        script.setAttribute(key, String(val));
      });
    }

    // Append script to the container div
    container.appendChild(script);

    return () => {
      if (container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, [finalSrc, containerId, dataCfasync, isAsync, dataAttributes]);

  return (
    <div ref={containerRef} className={`native-ad-wrapper w-full ${className}`}>
      {/* Target div required by the native ad script */}
      <div id={containerId} />
    </div>
  );
};

export default NativeAdBanner;
