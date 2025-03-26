import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

export function Logo({ variant = 'light', layout = 'horizontal', className = '' }: LogoProps) {
  const logoUrl = "https://i.imgur.com/4GyJkpJ.png";
  const imageSize = layout === 'horizontal' ? 64 : 80;

  return layout === 'horizontal' ? (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src={logoUrl} 
        alt="Tool2U Logo" 
        width={imageSize} 
        height={imageSize}
        style={{ 
          filter: variant === 'light' ? 'brightness(0) invert(1)' : 'none'
        }}
      />
    </div>
  ) : (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <img 
        src={logoUrl} 
        alt="Tool2U Logo" 
        width={imageSize} 
        height={imageSize}
        style={{ 
          filter: variant === 'light' ? 'brightness(0) invert(1)' : 'none'
        }}
      />
    </div>
  );
}