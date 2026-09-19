import React from 'react';

interface ConditionalAdContainerProps {
  children: React.ReactNode;
  timeoutMs?: number;
  className?: string;
  onAdStatusChange?: (status: 'loaded' | 'failed') => void;
}

export const ConditionalAdContainer: React.FC<ConditionalAdContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      id="header-ad-conditional-container"
      className={`ad-container-default ${className}`}
      style={{
        display: 'block',
        visibility: 'visible',
        opacity: 1,
        overflow: 'visible',
      }}
    >
      {children}
    </div>
  );
};

export default ConditionalAdContainer;
