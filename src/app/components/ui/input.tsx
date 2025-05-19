import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  textSize?: 'text-base' | 'text-md';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, textSize = 'text-base', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-9 w-full rounded-none border border-input bg-transparent px-3 py-1 ${textSize} shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
