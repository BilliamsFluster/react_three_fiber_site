import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useDisplay } from '../threeComponents/DisplayContextManager';
import Card from '../threeComponents/PortfolioCard';

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger plugin outside of the component

const Portfolio = ({ hideOverlay, canShowAnimationComputer }) => {
  const buttonRef = useRef(null);
  const portfolioSectionRef = useRef(null);
  const { isVisible } = useDisplay();
  let tl = useRef(gsap.timeline({ paused: true })).current; // Store the timeline in a ref
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sectionEl = portfolioSectionRef.current;

    if (isVisible && sectionEl) {
      // Use the tl from the ref, don't recreate it
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top center+=100',
          toggleActions: 'play none none none',
          // Make sure to clean up this ScrollTrigger in the return function
        },
      });

      tl.fromTo(
        sectionEl,
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 1, ease: 'power1.out' }
      )
      .fromTo(
        sectionEl.querySelectorAll('.card'),
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.2, // Delay between each card animation
          duration: 0.8,
          ease: 'power1.out',
        },
        '-=0.5' // This overlaps the timeline slightly to make the animation smoother
      );
    }

    // Cleanup function
    return () => {
      if (tl) {
        tl.kill(); // Kill the timeline if it's defined
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Clear all ScrollTriggers
    };
  }, [isVisible]);


  useEffect(() => {
    const button = buttonRef.current;
    const scaleUp = () => gsap.to(button, { scale: 1.2, duration: 0.3 });
    const scaleDown = () => gsap.to(button, { scale: 1, duration: 0.3 });

    button.addEventListener('mouseenter', scaleUp);
    button.addEventListener('mouseleave', scaleDown);

    return () => {
      button.removeEventListener('mouseenter', scaleUp);
      button.removeEventListener('mouseleave', scaleDown);
    };
  }, []);

  return (
    <div className="page">
      <button ref={buttonRef} onClick={hideOverlay}>
        <h1>WW</h1>
      </button>
      <div className="Format">
        <div className="Section portfolioContainer" ref={portfolioSectionRef}>
          <h1><u>Portfolio</u></h1>
          <div className="portfolioSection">
            
            <Card 
              image="/static/Plugin.png"
              title="Visual Save - UE5 Plugin"
              description="A innovate plugin for Urnreal Engine that uses steganography to encode Save Game data into images."
              readMoreContent="Visual Save harnesses the unique technique of steganography to conceal game save data within image files, offering a novel and unobtrusive method of storing progress in Unreal Engine 5. It enhances security and seamlessly integrates with the aesthetic flow of the game environment. This plugin simplifies the process for developers, allowing them to focus on creative aspects of game development while ensuring player data is preserved in an innovative manner."
              links={[{ href: 'https://www.unrealengine.com/marketplace/en-US/product/visual-save-plugin', text: ' Link' }]}
              linkLogo={"/static/Market.png"}
              tooltip = {"View Visual Save on UE5 Marketplace"}
            />
            <Card 
              image="/static/GameEngine.png"
              title="Blu - Game Engine"
              description="Explore BLU, my custom game engine in development, pushing the boundaries of game mechanics."
              readMoreContent="BLU is a groundbreaking game engine currently in development, designed with a focus on innovating beyond current game mechanics. Its goal is to provide a robust platform for building expansive game worlds with complex interactions, offering unparalleled freedom and creativity to indie developers and hobbyists alike. This custom engine is being forged from the ground up to introduce new possibilities in gameplay and design."
              links={[{ href: 'https://github.com/BilliamsFluster/Blu', text: ' Link' }]}
              linkLogo={"/static/Github.png"}
              tooltip={" View BLU on Github"}
            />
            <Card 
              image="/static/UnrealEngine.png"
              title="Survive The Enemies - Game"
              description="Battle relentless foes in a test of survival and combat skills."
              readMoreContent="Survive The Enemies immerses players in a high-stakes survival arena, pitting them against unyielding adversaries. Each level escalates in intensity, requiring quick reflexes and tactical skill. This project showcases a blend of engaging combat mechanics and survival strategies, all built within the powerful Unreal Engine environment."
              links={[{ href: 'https://youtu.be/qUgCkX0peI4', text: ' Link' }]}
              linkLogo={"/static/Youtube.png"}
              tooltip={"View This Game on Youtube"}
              
            />
            <Card 
              image="/static/UnrealEngine.png"
              title="Ace Search - Game"
              description="Race against time to spot the elusive Ace among a cascade of cards, with each level bringing a new challenge."
              readMoreContent="Ace Search challenges players to a rapid visual hunt, where keen observation meets speed. Each new level introduces more complexity, demanding faster recognition skills. This game offers a compelling journey through a dynamic deck of cards, where finding the Ace becomes increasingly thrilling."
              links={[{ href: 'https://youtu.be/deB4XpzX-nk', text: ' Link' }]}
              linkLogo={"/static/Youtube.png"}
              tooltip={"View This Game on Youtube"}
            />
            <Card 
              image="../../static/UnrealEngine.png"
              title="The Heist - Game"
              description="Plan and execute a daring heist, testing your strategic prowess."
              readMoreContent="The Heist is an enthralling game of strategic planning and execution. Players must outwit security measures to pull off daring robberies. The gameplay emphasizes careful thought and precision, as each move could either edge the player closer to a triumphant heist or lead to a swift capture."
              links={[{ href: 'https://youtu.be/hHQ2jZc47iI', text: ' Link' }]}
              linkLogo={"/static/Youtube.png"}
              tooltip={"View This Game on Youtube"}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
