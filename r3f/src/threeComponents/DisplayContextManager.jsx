import React, { createContext, useContext, useState } from 'react';

// Create Context
const DisplayContext = createContext();

// Hook for easy context consumption
export const useDisplay = () => useContext(DisplayContext);

// Provider Component
export const DisplayProvider = ({ children }) => {
    const [displayComponent, setDisplayComponent] = useState(null);
    const [isVisible, setIsVisible] = useState(false); // Visibility state
  
    const showComponent = (component) => {
      setDisplayComponent(() => component);
      setIsVisible(true); // Show component
    };
  
    const hideComponent = () => {
      setIsVisible(false); // Hide component
    };
  
    return (
      <DisplayContext.Provider value={{ displayComponent, showComponent, isVisible, hideComponent }}>
        {children}
      </DisplayContext.Provider>
    );
  };