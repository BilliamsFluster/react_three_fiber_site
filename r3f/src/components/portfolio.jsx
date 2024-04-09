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
        <h1>Back  </h1>
      </button>
      <div className="Format">
        <div className="Section portfolioContainer" ref={portfolioSectionRef}>
          <h1><u>Portfolio</u></h1>
          <div className="portfolioSection">
          <Card 
              image="/static/Website.png"
              title="Portfolio Site"
              description="Skills Developed: This Portfolio improved on my React, R3F(React-Three-Fiber), and javascript skills."
              readMoreContent="Chalenges I Faced: Working with R3F is something I have never done before. This was blocking me from translating my ideas into reality. How I overcame this was to reach out for help, discord, youtube and the R3F docs really helped me 
              become more proficent in R3F and front-end as a whole. Understanding the use of gsap and how it worked with R3F took some time as well. I wanted to make this site because I strive for creativity.
              Making this website gave me a chance to be myself and let my creativity loose."
              links={[{ href: 'https://bwap.netlify.app/', text: ' Link' }]}
              linkLogo={"/static/Github.png"}
              tooltip = {"View on Github"}
            />
            <Card 
            image="/static/Website.png"
            title="Movie Site"
            description="Skills Developed: This website taught me how to use an API to fetch movie data and use it in React."
            readMoreContent="Challenges I Faced: Working on implementing the API to fetch movie data was something that I have not done before. Using react with this as well presented some difficulty in the beginning
            Giving myself some time to look over documentation and draw out a plan to provide more clarity helped out a lot. Once I did all of this implementing the API with React was a lot easier and more efficent."
            links={[{ href: 'https://github.com/BilliamsFluster/react_film_site', text: ' Link' }]}
            linkLogo={"/static/Github.png"}
            tooltip = {"View on Github"}
          />
            <Card 
              image="/static/Plugin.png"
              title="Visual Save - UE5 Plugin"
              description="Skills Developed: Steganography with UE5, Slate, system desgn."
              readMoreContent="Challenges I Faced: This plugin was actually a school project recommended by my professor. Since no one has done this project before documentation and help was very scarce.
              What I did to overcome this was to break down the plugin into smaller chunks like the drag drop system, and the encoding and decoding of data. I then looked for relevant examples within the engine's soruce code 
              to utilize and understand the classes neccessary to achieve this innovative plugin."
              links={[{ href: 'https://www.unrealengine.com/marketplace/en-US/product/visual-save-plugin', text: ' Link' }]}
              linkLogo={"/static/Market.png"}
              tooltip = {"View Visual Save on UE5 Marketplace"}
            />
            <Card 
              image="/static/GameEngine.png"
              title="Blu - Game Engine"
              description="Skills Developed: Deeper understanding of low level system design and premake along with mono and C# integration. "
              readMoreContent="Challenges I Faced: When planning out BLU planning the event system and the rendering system proved to be a challenge. These systems need to be extremely robust and efficent or else performance and quality will be comprimised.
              How I over came these two obstacles was to break down what they were into smaller components.  I know that the event system need a way to dispatch, receive, and pass events through layers. This level of thinking 
              helped me implement these systems into BLU."
              links={[{ href: 'https://github.com/BilliamsFluster/Blu', text: ' Link' }]}
              linkLogo={"/static/Github.png"}
              tooltip={" View BLU on Github"}
            />
            <Card 
              image="/static/UnrealEngine.png"
              title="Survive The Enemies - Game"
              description="Skills Developed: Enemy AI integration, inventory and locomotion system."
              readMoreContent="Challenges I Faced: Implementing a different approach to the weapon system proved to be quite difficult at first. Instead of each weapon being its own actor I went with one main weapon 
              pulling weapon data from a data table, pistol data, AR data etc. I implemented this system because it makes adding weapons in the future much more effient.
              It simplifies the designers job when adding new features into the game."
              links={[{ href: 'https://youtu.be/qUgCkX0peI4', text: ' Link' }]}
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
