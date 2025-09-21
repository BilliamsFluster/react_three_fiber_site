import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { Sheet, SheetContent } from './ui/sheet';
import ScrollArea from './ui/scroll-area';
import { useDisplay } from '../threeComponents/DisplayContextManager';

const COMPONENTS_WITH_SMOOTH_SCROLL = new Set(['Portfolio', 'About', 'Contact']);

const useLenisSmoothScroll = (ref, enabled, dependencyKey) => {
  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      return undefined;
    }

    const wrapper = ref.current;
    if (!wrapper) {
      return undefined;
    }

    const viewport = wrapper.querySelector('.shad-scroll-area__viewport');
    if (!viewport) {
      return undefined;
    }

    const previousOverflow = viewport.style.overflowY;
    viewport.style.overflowY = 'visible';
    wrapper.dataset.lenisEnabled = 'true';

    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    const lenis = new Lenis({
      wrapper,
      content: viewport,
      lerp: isTouchDevice ? 0.12 : 0.085,
      smoothWheel: true,
      smoothTouch: isTouchDevice,
      syncTouch: isTouchDevice ? false : true,
      touchMultiplier: isTouchDevice ? 0.9 : 1.25,
      wheelMultiplier: isTouchDevice ? 1 : 0.95,
    });

    let frameRequest = null;
    const animate = (time) => {
      lenis.raf(time);
      frameRequest = requestAnimationFrame(animate);
    };

    frameRequest = requestAnimationFrame(animate);
    lenis.scrollTo(0, { immediate: true });

    return () => {
      if (frameRequest) {
        cancelAnimationFrame(frameRequest);
      }
      lenis.destroy();
      viewport.style.overflowY = previousOverflow;
      delete wrapper.dataset.lenisEnabled;
    };
  }, [ref, enabled, dependencyKey]);
};

const SectionSheet = () => {
  const { displayComponent: Component, hideComponent, isVisible } = useDisplay();
  const scrollAreaRef = useRef(null);
  const componentKey = Component?.displayName ?? '';
  const enableSmoothScroll = isVisible && COMPONENTS_WITH_SMOOTH_SCROLL.has(componentKey);

  useLenisSmoothScroll(scrollAreaRef, enableSmoothScroll, componentKey);

  useEffect(() => {
    const canvasContainer = document.getElementById('canvas-container');
    if (!canvasContainer) return undefined;

    if (isVisible) {
      canvasContainer.style.transition = 'filter 0.4s ease';
      canvasContainer.style.filter = 'brightness(0.85) saturate(0.8)';
    } else {
      canvasContainer.style.filter = '';
    }

    return () => {
      if (canvasContainer) {
        canvasContainer.style.filter = '';
      }
    };
  }, [isVisible]);

  return (
    <div className="section-sheet__container">
      <Sheet open={isVisible} onOpenChange={(open) => !open && hideComponent()}>
        <SheetContent side="right">
          {Component ? (
            <ScrollArea ref={scrollAreaRef}>
              <Component key={componentKey} onClose={hideComponent} />
            </ScrollArea>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SectionSheet;
