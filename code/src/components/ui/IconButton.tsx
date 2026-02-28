import type { ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function IconButton({ 
  icon, 
  label, 
  size = 'md', 
  className = '', 
  ...props 
}: IconButtonProps) {
  // BUG-008 FIX: Ensure minimum 44x44px touch targets for mobile
  const sizes = {
    sm: 'p-2 min-w-[44px] min-h-[44px]',  // Was p-1.5, now meets mobile guidelines
    md: 'p-2.5 min-w-[44px] min-h-[44px]',
    lg: 'p-3 min-w-[44px] min-h-[44px]'
  };

  return (
    <button
      className={`rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center ${sizes[size]} ${className}`}
      aria-label={label}
      {...props}
    >
      {icon}
    </button>
  );
}
