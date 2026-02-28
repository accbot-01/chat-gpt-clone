import React, { ButtonHTMLAttributes } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

export function IconButton({ 
  icon, 
  label, 
  size = 'md', 
  className = '', 
  ...props 
}: IconButtonProps) {
  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  return (
    <button
      className={`rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${sizeClasses[size]} ${className}`}
      aria-label={label}
      title={label}
      {...props}
    >
      {icon}
    </button>
  );
}
