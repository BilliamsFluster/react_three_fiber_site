/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { gsap } from 'gsap';
import "../Card.css";

const Card = ({ image, title, description, readMoreContent, links = [], tags = [] }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);

  const showTooltip = (e, text) => {
    if (!text) return;

    const linkRect = e.currentTarget.getBoundingClientRect();
    setTooltipContent(text);
    setTooltipPosition({
      x: linkRect.left + linkRect.width / 2 + window.scrollX,
      y: linkRect.top + window.scrollY - linkRect.height + 30,
    });
    setTooltipVisible(true);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  useEffect(() => {
    if (!tooltipRef.current) return;

    gsap.to(tooltipRef.current, {
      duration: 0.3,
      autoAlpha: tooltipVisible ? 1 : 0,
    });
  }, [tooltipVisible]);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const tooltipEl = (
    <div
      ref={tooltipRef}
      className="custom-tooltip"
      style={{
        top: `${tooltipPosition.y}px`,
        left: `${tooltipPosition.x}px`,
        transform: 'translate(-50%, -100%)',
      }}
    >
      {tooltipContent}
    </div>
  );

  const scaleUp = (target) => gsap.to(target, { scale: 1.12, duration: 0.25 });
  const scaleDown = (target) => gsap.to(target, { scale: 1, duration: 0.25 });

  const tooltipRoot = document.getElementById('tooltip-root');

  return (
    <>
      <div className="card">
        <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
          <div className="card-front">
            <img src={image} alt={title} className="card-image" />
            <h3 className="card-title">{title}</h3>
            <div className="card-description description-front">{description}</div>
            {tags.length > 0 && (
              <ul className="card-tags">
                {tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            )}
            <button onClick={handleFlip} className="card-btn">
              Read More
            </button>
          </div>
          <div className="card-back">
            {links.length > 0 && (
              <div className="logoContainer">
                {links.map(({ href, label, icon, tooltip }, index) => (
                  <a
                    key={`${label}-${index}`}
                    href={href}
                    className="card-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={(e) => showTooltip(e, tooltip)}
                    onMouseLeave={hideTooltip}
                  >
                    {icon ? (
                      <img
                        src={icon}
                        alt={label || 'Project link'}
                        className="linkLogo"
                        onMouseEnter={(event) => scaleUp(event.currentTarget)}
                        onMouseLeave={(event) => scaleDown(event.currentTarget)}
                      />
                    ) : (
                      <span className="linkText">{label}</span>
                    )}
                  </a>
                ))}
              </div>
            )}
            <div className="card-description-box">
              <div className="card-description description-back">{readMoreContent}</div>
            </div>
            <button onClick={handleFlip} className="card-btn">
              Read Less
            </button>
          </div>
        </div>
      </div>
      {tooltipVisible && tooltipRoot && ReactDOM.createPortal(tooltipEl, tooltipRoot)}
    </>
  );
};

export default Card;

