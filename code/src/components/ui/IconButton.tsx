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
  const sizes = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3'
  };

  return (
    <button
      className={`rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${sizes[size]} ${className}`}
      aria-label={label}
      {...props}
    >
      {icon}
    </button>
  );
}
