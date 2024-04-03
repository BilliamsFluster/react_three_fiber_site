import React, { useRef, useEffect } from 'react';

import { Canvas } from '@react-three/fiber'
import SimpleModel from '../threeComponents/model';
import { gsap } from 'gsap';
import { useDisplay } from '../threeComponents/DisplayContextManager';
import TypingEffectParagraph from '../threeComponents/TypingText';
import CameraController from '../threeComponents/SimpleCameraController';
import Lenis from '@studio-freight/lenis';
import ScrollTrigger from 'gsap/src/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = ({ hideOverlay }) => {
  const buttonRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const { isVisible } = useDisplay(); // using context to check if the component is visible
  
  useEffect(() => {
    // Example animation tied to the visibility of the section
    if (isVisible) {
      gsap.fromTo(aboutSectionRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power1.out" });
    }
  }, [isVisible]);
  


  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(aboutSectionRef.current, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1 });
    }
  }, [isVisible]);
  
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
  }, [isVisible]); // Depend on isVisible to re-trigger the animation


  return (
    <>
    
      <div className="page">
        <button ref={buttonRef} onClick={hideOverlay}>
          <h1>WW</h1>
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
            Collaborating on ambitious projects to bring game functionality to life is a pursuit I thoroughly enjoy. It is my aspiration to contribute my skills and passion to a AAA game studio, 
              collaborating with a like-minded team, to produce innovative games and websites that players can appreciate.
            </p>

            <p>
              I just released a <b>innovative plugin for Unreal Engine</b>. The plugin is called <b>Visual Save</b> and its main purpose is to encode 
              Save Game data into images, allowing for players to load, share and save their progress via images.
            </p>
            
          
            <p>Here are some of my skills</p>
            <div className="aboutSkills">
              <div className="GameProgramming">
                <ul>
                  
                <li><u><b>Game Development</b></u></li>
                  <li>Advanced knowledge of Unreal Engine 5</li>
                  <li>Proficent in C++</li>
                  <li>Computer Graphics</li>
                  <li>Deep understanding of game physics and mathematics</li>
                  <li>Familiarity with AI programming within Unreal Engine</li>
                </ul>
              </div>
              <div className="WebDevelopment">
              <ul>
                  <li><u><b>Front-End Development</b></u></li>
                  <li>React</li>
                  <li>React-Three-Fiber</li>
                  <li>GSAP</li>
                  <li>THREE.js</li>
                  <li>JavaScript</li>
                </ul>
              </div>
            </div>
            
            </div>
            <div className='aboutModel'>
            <Canvas style={{ width: '100%', height: '100%'}}>
              <CameraController enableZoom = {false}/>
            <SimpleModel
              model="../models/Laptop.glb"
              scale = {[1.5,1.5,1.5]}
              position={[0, 0, 1]} 
              rotation={[0, -Math.PI / 1, 0]}
            />
            </Canvas>
          </div>
          </div>
            
          
        </div>
      </div>
      
      
    </>
  );
};

export default About;
