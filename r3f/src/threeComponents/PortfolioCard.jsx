import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { gsap } from 'gsap';
import "../Card.css";

const Card = ({ image, title, description, readMoreContent, links, linkLogo, tooltip }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('Tooltip');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);

  const showTooltip = (e, text) => {
    const linkRect = e.target.getBoundingClientRect();
    setTooltipContent(text);
    setTooltipPosition({
      x: linkRect.left + (linkRect.width / 2) + window.scrollX,
      y: linkRect.top + window.scrollY - linkRect.height + 30 // Adjusted to move the tooltip higher
    });
    setTooltipVisible(true);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  useEffect(() => {
    if (tooltipRef.current) {
      if (tooltipVisible) {
        gsap.to(tooltipRef.current, { duration: 0.3, autoAlpha: 1 });
      } else {
        gsap.to(tooltipRef.current, { duration: 0.3, autoAlpha: 0 });
      }
    }
  }, [tooltipVisible]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const tooltipEl = (
    <div 
      ref={tooltipRef} 
      className="custom-tooltip" 
      style={{
        position: 'absolute',
        top: `${tooltipPosition.y}px`,
        left: `${tooltipPosition.x}px`,
        transform: 'translate(-50%, -100%)'
      }}>
      {tooltipContent}
    </div>
  );
  const scaleUp = (e) => gsap.to(e.currentTarget, { scale: 1.2, duration: 0.3 });
  const scaleDown = (e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });

  return (
    <>
      <div className="card">
        <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
          <div className="card-front">
            <img src={image} alt="Project" className="card-image" />
            <h3 className="card-title">{title}</h3>
            <p className="card-description description-front">{description}</p>
            <button onClick={handleFlip} className="card-btn">Read More</button>
          </div>
          <div className="card-back">
            <div className="logoContainer">
              {links.map((link, index) => (
                <a key={index} 
                   href={link.href} 
                   className="card-link" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   onMouseEnter={(e) => showTooltip(e, tooltip)}
                   onMouseLeave={hideTooltip}>
                  <img src={linkLogo} alt="Link Logo" className="linkLogo"
                    onMouseEnter={scaleUp} onMouseLeave={scaleDown}
                  />
                </a>
              ))}
            </div>
            <div className='card-description-box'>
              <p className="card-description description-back">{readMoreContent}</p>
            </div>
            <button onClick={handleFlip} className="card-btn">Read Less</button>
          </div>
        </div>
      </div>
      {tooltipVisible && ReactDOM.createPortal(tooltipEl, document.getElementById('tooltip-root'))}
    </>
  );
};

export default Card;