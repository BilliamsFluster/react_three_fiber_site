import React, { createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../lib/utils';

const SheetContext = createContext({
  open: false,
  onOpenChange: () => {},
});

export const useSheetContext = () => useContext(SheetContext);

export const Sheet = ({ open = false, onOpenChange = () => {}, children }) => (
  <SheetContext.Provider value={{ open, onOpenChange }}>{children}</SheetContext.Provider>
);

export const SheetContent = React.forwardRef(({ side = 'right', className, children }, ref) => {
  const { open, onOpenChange } = useSheetContext();

  if (!open || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div className="shad-sheet__container">
      <div className="shad-sheet__overlay" onClick={() => onOpenChange(false)} aria-hidden="true" />
      <div ref={ref} className={cn('shad-sheet__panel', `shad-sheet__panel--${side}`, className)}>
        {children}
      </div>
    </div>,
    document.body
  );
});

SheetContent.displayName = 'SheetContent';

export const SheetHeader = ({ className, ...props }) => (
  <header className={cn('shad-sheet__header', className)} {...props} />
);

export const SheetFooter = ({ className, ...props }) => (
  <footer className={cn('shad-sheet__footer', className)} {...props} />
);

export const SheetTitle = ({ className, ...props }) => (
  <h2 className={cn('shad-sheet__title', className)} {...props} />
);

export const SheetDescription = ({ className, ...props }) => (
  <p className={cn('shad-sheet__description', className)} {...props} />
);

export const SheetClose = ({ asChild = false, children, className, ...props }) => {
  const { onOpenChange } = useSheetContext();

  const handleClick = (event) => {
    if (children && typeof children.props?.onClick === 'function') {
      children.props.onClick(event);
    }

    onOpenChange(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      onClick: handleClick,
    });
  }

  return (
    <button type="button" className={cn('shad-sheet__close', className)} onClick={handleClick} {...props}>
      {children ?? 'Close'}
    </button>
  );
};

export default Sheet;
