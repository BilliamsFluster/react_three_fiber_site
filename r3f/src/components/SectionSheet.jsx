import React, { useEffect } from 'react';
import { Sheet, SheetContent } from './ui/sheet';
import ScrollArea from './ui/scroll-area';
import { useDisplay } from '../threeComponents/DisplayContextManager';

const SectionSheet = () => {
  const { displayComponent: Component, hideComponent, isVisible } = useDisplay();

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
