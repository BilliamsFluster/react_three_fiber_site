import React, { useState } from 'react';
import "../Card.css" 

// Card component
const Card = ({ image, title, description, readMoreContent, links }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  console.log("Rendering Card:", title); 
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
 
  return (
    <div className="card ">
      <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="card-front">
          <img src={image} alt="Project" className="card-image" />
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
          <button onClick={handleFlip} className="card-btn">Read More</button>
          
        </div>
        <div className="card-back">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{readMoreContent}</p>
          {links.map((link, index) => (
            <a key={index} href={link.href} className="card-link">{link.text}</a>
          ))}
          <button onClick={handleFlip} className="card-btn">Read Less</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
