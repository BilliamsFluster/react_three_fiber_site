import React, { useEffect, useImperativeHandle, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { cn } from '../../lib/utils';

export const ScrollArea = React.forwardRef(({ className, children, ...props }, forwardedRef) => {
  const wrapperRef = useRef(null);
  const viewportRef = useRef(null);
  const lenisRef = useRef(null);
  const frameRef = useRef(null);

  useImperativeHandle(forwardedRef, () => wrapperRef.current);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const viewport = viewportRef.current;

    if (!wrapper || !viewport) {
      return undefined;
    }

    wrapper.dataset.lenis = 'true';
    viewport.dataset.lenis = 'true';

    const lenis = new Lenis({
      wrapper,
      content: viewport,
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.05,
      lerp: 0.1,
    });

    lenisRef.current = lenis;

    const emitScrollEvent = (event) => {
      window.dispatchEvent(
        new CustomEvent('lenis-scroll', {
          detail: {
            scroll: event.scroll,
            limit: event.limit,
            velocity: event.velocity,
            progress: event.progress,
          },
        })
      );
    };

    lenis.on('scroll', emitScrollEvent);

    const raf = (time) => {
      lenis.raf(time);
      frameRef.current = requestAnimationFrame(raf);
    };

    frameRef.current = requestAnimationFrame(raf);

    return () => {
      lenis.off('scroll', emitScrollEvent);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      lenis.destroy();
      lenisRef.current = null;
      delete wrapper.dataset.lenis;
      delete viewport.dataset.lenis;
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) {
      return;
    }

    lenisRef.current.scrollTo(0, { immediate: true });
  }, [children]);

  return (
    <div ref={wrapperRef} className={cn('shad-scroll-area', className)} {...props}>
      <div ref={viewportRef} className="shad-scroll-area__viewport">
        {children}
      </div>
    </div>
  );
});

ScrollArea.displayName = 'ScrollArea';

export default ScrollArea;
