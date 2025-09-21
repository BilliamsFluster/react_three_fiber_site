import React from 'react';
import { cn } from '../../lib/utils';

export const ScrollArea = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('shad-scroll-area', className)} {...props}>
    <div className="shad-scroll-area__viewport">{children}</div>
  </div>
));

ScrollArea.displayName = 'ScrollArea';

export default ScrollArea;
