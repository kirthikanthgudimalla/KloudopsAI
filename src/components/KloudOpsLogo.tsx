import Link from 'next/link';

interface KloudOpsLogoProps {
  size?: 'sm' | 'md' | 'lg';
  textSize?: string;
  showText?: boolean;
  className?: string;
}

export default function KloudOpsLogo({ 
  size = 'md', 
  textSize, 
  showText = true, 
  className = '' 
}: KloudOpsLogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const logoSize = sizeClasses[size];
  const logoTextSize = textSize || textSizeClasses[size];

  return (
    <Link href="/" className={`flex items-center space-x-2 hover:opacity-80 transition-opacity ${className}`}>
      <div className="relative">
        {/* Cloud SVG with K inside */}
        <svg
          className={`${logoSize} text-blue-600`}
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cloud shape */}
          <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
        </svg>
        {/* Letter K positioned inside the cloud */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold text-white ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-lg'}`}>
            K
          </span>
        </div>
      </div>
      {showText && (
        <span className={`${logoTextSize} font-bold text-gray-900`}>
          KloudOps AI
        </span>
      )}
    </Link>
  );
}
