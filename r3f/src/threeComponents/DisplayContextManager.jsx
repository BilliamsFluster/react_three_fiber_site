import React, { createContext, useContext, useMemo, useState } from 'react';

const DisplayContext = createContext({
  displayComponent: null,
  showComponent: () => {},
  hideComponent: () => {},
  focusData: null,
  isVisible: false,
});

export const useDisplay = () => useContext(DisplayContext);

export const DisplayProvider = ({ children }) => {
  const [displayComponent, setDisplayComponent] = useState(null);
  const [focusData, setFocusData] = useState(null);

  const showComponent = (component, options = {}) => {
    setDisplayComponent(() => component);
    if (options && options.focus) {
      const {
        position = [0, 0, 0],
        target = [0, 0, 0],
        duration = 1.2,
        easing = 'power3.out',
      } = options.focus;
      setFocusData({
        position: [...position],
        target: [...target],
        duration: typeof duration === 'number' ? duration : 1.2,
        easing: typeof easing === 'string' ? easing : 'power3.out',
      });
    }
  };

  const hideComponent = () => {
    setDisplayComponent(null);
    setFocusData(null);
  };

  const value = useMemo(
    () => ({
      displayComponent,
      showComponent,
      hideComponent,
      focusData,
      isVisible: Boolean(displayComponent),
    }),
    [displayComponent, focusData]
  );

  return <DisplayContext.Provider value={value}>{children}</DisplayContext.Provider>;
};