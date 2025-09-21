import React from 'react';
import { cn } from '../../lib/utils';

const variantClasses = {
  default: 'shad-button shad-button--default',
  outline: 'shad-button shad-button--outline',
  ghost: 'shad-button shad-button--ghost',
};

const sizeClasses = {
  md: 'shad-button--md',
  sm: 'shad-button--sm',
  lg: 'shad-button--lg',
};

export const Button = React.forwardRef(
  ({ className, variant = 'default', size = 'md', children, asChild = false, ...props }, ref) => {
    const baseClass = cn(variantClasses[variant] ?? variantClasses.default, sizeClasses[size] ?? sizeClasses.md);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        ref,
        className: cn(baseClass, children.props.className, className),
        ...props,
      });
    }

    return (
      <button ref={ref} className={cn(baseClass, className)} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
