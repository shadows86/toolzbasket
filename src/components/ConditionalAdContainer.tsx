import React, { useEffect, useRef } from 'react';
import { checkAd } from './AdSlot';

interface ConditionalAdContainerProps {
  children: React.ReactNode;
  timeoutMs?: number;
  className?: string;
  onAdStatusChange?: (status: 'loaded' | 'failed') => void;
}

export const ConditionalAdContainer: React.FC<ConditionalAdContainerProps> = ({
  children,
  className = '',
  onAdStatusChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Apply checkAd() on page load
    const stopChecking = checkAd(container, onAdStatusChange);

    return () => {
      stopChecking();
    };
  }, [onAdStatusChange]);

  return (
    <div
      ref={containerRef}
      id="header-ad-conditional-container"
      className={`ad-container-default ${className}`}
      style={{
        display: 'block',
        minHeight: 'auto',
        overflow: 'visible',
        visibility: 'visible',
        opacity: 1,
      }}
    >
      {children}
    </div>
  );
};

export default ConditionalAdContainer;
