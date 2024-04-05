import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useDisplay } from '../threeComponents/DisplayContextManager';
import ScrollTrigger from 'gsap/src/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = ({ hideOverlay }) => {
  const buttonRef = useRef(null);
  const contactSectionRef = useRef(null);
  const formRef = useRef(null);
  const { isVisible } = useDisplay(); // using context to check if the component is visible
  

  useEffect(() => {
    if(!isVisible) return;
    // Animation with GSAP
    gsap.set(formRef.current.children, { y: 50, opacity: 0 });

    // Intersection Observer setup
    const observer = new IntersectionObserver(
      (entries) => {
        // Loop over the entries
        entries.forEach(entry => {
          // If the element is visible
          if (entry.isIntersecting) {
            // Animate the form elements
            gsap.to(formRef.current.children, {
              y: 0,
              opacity: 1,
              stagger: 0.2, // Stagger the animation of each child by 0.2 seconds
              ease: 'power1.out',
              duration: 1,
            });
            // Unobserve the element after the animation
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5, // Trigger when at least 50% of the element is visible
      }
    );

    // Observe the form
    observer.observe(formRef.current);

    // Cleanup
    return () => observer.disconnect();
  }, [isVisible]);




  useEffect(() => {
    // Example animation tied to the visibility of the section
    if (isVisible) {
      gsap.fromTo(contactSectionRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power1.out" });
    }
  }, [isVisible]);
  


  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(contactSectionRef.current, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1 });
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
        contactSectionRef.current, 
        { autoAlpha: 0, y: 50 }, 
        { autoAlpha: 1, y: 0, duration: 1, ease: "power1.out" }
      );
    }
  }, [isVisible]); // Depend on isVisible to re-trigger the animation
 // Button hover animations
 const scaleUp = (e) => gsap.to(e.currentTarget, { scale: 1.2, duration: 0.3 });
 const scaleDown = (e) => gsap.to(e.currentTarget, { scale: 1, duration: 0.3 });

  return (
    <>
        <div className="page">
            
            <button ref={buttonRef} onClick={hideOverlay}>
            <h1>WW</h1>
            </button>
            
            <div className="Format">
                <div className="Section contactSection" ref={contactSectionRef}>
                    <div className="contact-container">
                        <div className="contactTitle">
                            <h4>CONTACT</h4>
                            <h1>Get In Touch</h1>
                            
                        </div>
                    </div>
                    <div className='contactBox'>
                        <div className='leftContactSection'>
                            <p>Questions? Reach out to me and i'll get back to you shortly</p> 
                            <div className='leftContactMail'>
                                <a href="mailto:ww27hockey@icloud.com">
                                    <img onMouseEnter={scaleUp} onMouseLeave={scaleDown} className='leftContactImages' src="/static/Mail.png" alt="" />
                                </a>
                                <p> 
                                    <a href="mailto:ww27hockey@icloud.com">
                                    ww27hockey@icloud.com
                                    </a> 
                                </p>
                            </div>
                            <div className='leftContactGithub'>
                                <a href="https://github.com/BilliamsFluster">
                                    <img onMouseEnter={scaleUp} onMouseLeave={scaleDown} className='leftContactImages' src="/static/Github.png" alt="" />
                                </a>
                                <p> 
                                    <a href="https://github.com/BilliamsFluster">
                                        Check out my Github
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className='rightContactSection' >
                            <form className="contact-form" ref = {formRef} action="https://formspree.io/f/xknekdrg" method="POST">
                                <input type="text" id="name" name="name" placeholder="Your Name" required />
                                <input type="email" id="email" name="email" placeholder="Your Email" required />
                                <input type="text" id="subject" name="subject" placeholder="Your Subject" required />
                                <textarea id="message" name="message" placeholder="Your Message" required></textarea>
                                <div>
                                    <button onMouseEnter={scaleUp} onMouseLeave={scaleDown} type="submit">SUBMIT</button>
                                </div>
                            </form> 
                        </div>
                    </div>
                    
                </div>
            
            </div>
        </div>
        </>
  );
};

export default Contact;
