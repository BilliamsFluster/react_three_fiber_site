import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useDisplay } from '../threeComponents/DisplayContextManager';
import ScrollTrigger from 'gsap/src/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = ({ hideOverlay }) => {
  const buttonRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const { isVisible } = useDisplay(); // using context to check if the component is visible
  const isMobile = /Android|webOS|iPhone|iPad|iPad Pro|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isIpad = window.matchMedia("(min-device-width: 830px) and (max-device-width: 1024px)").matches;
  
  useEffect(() => {
    // Example animation tied to the visibility of the section
    if (isVisible) {

      
      
        if (isMobile || isIpad) 
        {
          // Simpler animation for mobile devices
          gsap.to('.page', { autoAlpha: isVisible ? 1 : 0, duration: 0.5 });
        } else 
        {
          
            const timeline = gsap.timeline({defaults: {duration: 1, ease: 'power2.out'}});
            timeline
              .fromTo('.page', {autoAlpha: 0, scale: 0.5}, {autoAlpha: 1, scale: 1})
              .fromTo('.page', {rotationY: -90}, {rotationY: 0, ease: 'back.out(1.7)'}, '<')
              .fromTo('.page *', {autoAlpha: 0, y: 20}, {autoAlpha: 1, y: 0, stagger: 0.1}, '-=0.5');

          
        }
    }
  }, [isVisible]);
  

  if (isMobile || isIpad) 
  {
    useEffect(() => {
      if (isVisible) {
        gsap.fromTo(aboutSectionRef.current, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1 });
      }
    }, [isVisible]);

  }
  
  useEffect(() => {
    // Button hover animations
    const scaleUp = () => gsap.to(buttonRef.current, { scale: 1.2, duration: 0.3 });
    const scaleDown = () => gsap.to(buttonRef.current, { scale: 1, duration: 0.3 });

    buttonRef.current.addEventListener('mouseenter', scaleUp);
    buttonRef.current.addEventListener('mouseleave', scaleDown);

    // Cleanup function for button event listeners
    return () => {
      // Safely remove event listeners only if buttonRef.current is not null
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('mouseenter', scaleUp);
        buttonRef.current.removeEventListener('mouseleave', scaleDown);
      }
    };
  }, []);

  if (isMobile || isIpad) 
  {
    useEffect(() => {
      // Only trigger the GSAP timeline when the section is visible
      if (isVisible) {
        const tl = gsap.timeline();
        tl.fromTo(
          aboutSectionRef.current, 
          { autoAlpha: 0, y: 50 }, 
          { autoAlpha: 1, y: 0, duration: 1, ease: "power1.out" }
        );
      }
    }, [isVisible]); // Depend on isVisible to re-trigger the animation*/

  }
  const scaleUp = (e) => gsap.to(e.currentTarget, { scale: 1.2, duration: 0.3 });
 const scaleDown = (e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });

  return (
    <>
    
      <div className="page">
        <button ref={buttonRef} onClick={hideOverlay}>
          <h1>Back</h1>
        </button>
        <div className="Format">
          <div className="Section aboutSection" ref={aboutSectionRef}>
            <div className="aboutMe">

            
            <h1>About Me</h1>
              <p>Hello, my name is <b>William</b> I am a <b>Gameplay Programmer</b> and a <b>Front-End Developer</b>. My interests in both stem from my immense satisfaction 
                from translating thoughts into playable realities.
              </p>
              <p>
              I love to solve problems and make the journey fun while doing so. I believe in consistent learning and sharing knowledge while maintaining 
              a sense of joy in the process. 
              Collaborating on ambitious projects to bring functionality to life is a pursuit I thoroughly enjoy. It is my aspiration to contribute my skills 
                and passion to create clean, well organized systems while
                collaborating with a like-minded team, to produce innovative games and websites that players can appreciate.
              </p>

              <p>
                I just released a <b>plugin for Unreal Engine</b>. The plugin is called <b>Visual Save</b> and its main purpose is to encode 
                Save Game data into images, allowing for players to load, share and save their progress via images. The plugin presented a lot of challenges and enlightening moments that I had to solve and learn. Go check it out in my portfolio section.
              </p>
            <a href="https://docs.google.com/document/d/12GtkKixHYPvFlJCWfXx_4etS_pKIu5v70eESW6R86J4/export?format=pdf" download title="Download Resume" className="resumeButton">
              <button onMouseEnter={scaleUp} onMouseLeave={scaleDown}>
                Download Resume
              </button>
            
          </a>
            
          
          <p>Here are some of my skills</p>
                <div className="aboutSkills">
                  <div className="WebDevelopment">
                  <ul>
                      <li style={{ listStyleType: 'none' }}><u><b>Front-End Development</b></u></li>
                      <li>React - ☆☆☆☆</li>
                      <li>React-Three-Fiber - ☆☆</li>
                      <li>GSAP - ☆☆☆☆</li>
                      <li>THREE.js - ☆☆☆☆</li>
                      <li>Javascript - ☆☆☆☆</li>
                      <li>Typescript - ☆☆</li>
                      <li>HTML - ☆☆☆☆</li>
                      <li>CSS - ☆☆☆☆</li>
                    </ul>
                  </div>
                </div>
                  <div className="GameProgramming">
                    <ul>
                      
                    <li style={{ listStyleType: 'none' }}><u><b>Game Development</b></u></li>
                      <li> Knowledge of Unreal Engine 5 - ☆☆☆☆</li>
                      <li> C++ - ☆☆☆☆☆</li>
                      <li> C - ☆☆☆☆☆</li>
                      <li> C# - ☆☆☆</li>
                      <li>Computer Graphics - ☆☆</li>
                      <li>Game physics and mathematics - ☆☆☆</li>
                      <li> AI programming within Unreal Engine - ☆☆☆</li>
                    </ul>
                  </div>

            
            </div>
            <div className='aboutModel'>
              <img src="/static/Billy.png" alt="Billy" />
          </div>
          </div>
            
          
        </div>
      </div>
      
      
    </>
  );
};

export default About;
