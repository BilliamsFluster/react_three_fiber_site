import { useEffect } from 'react';
import { Sheet, SheetContent } from './ui/sheet';
import ScrollArea from './ui/scroll-area';
import { useDisplay } from '../threeComponents/DisplayContextManager';

const SectionSheet = () => {
  const { displayComponent: Component, hideComponent, isVisible } = useDisplay();

  useEffect(() => {
    const canvasContainer = document.getElementById('canvas-container');
    if (!canvasContainer) return undefined;

    const baseScale = 0.985;
    let frameId = null;

    if (!isVisible) {
      canvasContainer.style.transition = 'filter 0.4s ease, transform 0.5s ease';
      canvasContainer.style.filter = '';
      canvasContainer.style.transform = '';

      return () => {
        canvasContainer.style.transition = '';
      };
    }

    canvasContainer.style.transition = 'filter 0.4s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    canvasContainer.style.filter = 'brightness(0.85) saturate(0.8)';
    canvasContainer.style.transform = `scale(${baseScale})`;

    const handleLenisScroll = ({ detail }) => {
      if (!detail) return;

      const { progress = 0, velocity = 0 } = detail;
      const translateY = (0.5 - progress) * 32;
      const dynamicScale = baseScale + Math.min(Math.abs(velocity) * 0.0025, 0.008);

      if (frameId) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        canvasContainer.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${dynamicScale.toFixed(3)})`;
      });
    };

    window.addEventListener('lenis-scroll', handleLenisScroll);

    return () => {
      window.removeEventListener('lenis-scroll', handleLenisScroll);
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      canvasContainer.style.transition = 'filter 0.4s ease, transform 0.5s ease';
      canvasContainer.style.filter = '';
      canvasContainer.style.transform = '';
    };
  }, [isVisible]);

  return (
    <div className="section-sheet__container">
      <Sheet open={isVisible} onOpenChange={(open) => !open && hideComponent()}>
        <SheetContent side="right">
          {Component ? (
            <ScrollArea>
              <Component onClose={hideComponent} />
            </ScrollArea>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SectionSheet;
