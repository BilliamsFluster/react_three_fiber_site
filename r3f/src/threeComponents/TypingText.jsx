import { TextPlugin } from 'gsap/TextPlugin';
import gsap from 'gsap';
import React, { useRef, useEffect } from 'react';
// Register the plugin
gsap.registerPlugin(TextPlugin);

const TypingEffectParagraph = ({ children, isVisible }) => {
  const paragraphRef = useRef(null);
  const text = React.Children.toArray(children).reduce((acc, child) => acc + child, "");

  useEffect(() => {
    if (isVisible) {
      // Ensure the paragraph is initially empty when becoming visible
      paragraphRef.current.textContent = "";

      // Start typing effect
      gsap.to(paragraphRef.current, {
        text: {
          value: text,
          delimiter: ""
        },
        duration: text.length * 0.05, // Adjust duration based on text length
        ease: "none",
      });
    }
  }, [text, isVisible]); // Depend on 'text' and 'isVisible'

  return <p ref={paragraphRef} />;
};
export default TypingEffectParagraph;