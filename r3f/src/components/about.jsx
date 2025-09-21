/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useDisplay } from '../threeComponents/DisplayContextManager';

const highlights = [
  'Architect web platforms that connect Next.js frontends with Express and FastAPI services for live trading data.',
  'Design secure brokerage workflows using Charles Schwab OAuth, encrypted token storage, and auditable API layers.',
  'Build voice-enabled automation loops that stream SpeechRecognition → LLM → TTS interactions across WebSockets.',
  'Instrument analytics and backtesting modules so traders can make confident, data-backed decisions.',
];

const skillGroups = [
  {
    title: 'Frontend Engineering',
    items: ['React & Next.js', 'TypeScript / JavaScript', 'GSAP & animation systems', 'Three.js & R3F scenes'],
  },
  {
    title: 'Services & Data',
    items: ['Node.js & Express APIs', 'FastAPI & Python workflows', 'MongoDB & Mongoose', 'REST APIs & WebSockets'],
  },
  {
    title: 'Intelligence & Automation',
    items: ['AI/ML integrations', 'pandas & NumPy analytics', 'Speech recognition & TTS', 'Trading API orchestration'],
  },
  {
    title: 'Collaboration',
    items: ['Git & CI-ready repos', 'Product discovery & user journeys', 'Technical documentation', 'Rapid iteration with feedback'],
  },
];

const experiencePoints = [
  'Scoped and shipped an AI-assisted trading platform linking Next.js, Express, and FastAPI services.',
  'Wrapped Alpaca & Schwab endpoints in reusable providers that expose unified portfolio data to the UI.',
  'Launched a React authentication context that manages refresh tokens, protected routes, and session lifecycle.',
  'Partnered with stakeholders to prioritize releases, track impact metrics, and document architectural decisions.',
];

const workflowValues = [
  'Start with user flows, then layer in components and services that support the journey.',
  'Prototype quickly, validate with instrumentation, and harden solutions with automated checks.',
  'Share knowledge across the team through pairing, documentation, and thoughtful code reviews.',
];

const About = ({ hideOverlay }) => {
  const buttonRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const { isVisible } = useDisplay();

  useEffect(() => {
    if (!isVisible || !aboutSectionRef.current) {
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    if (prefersReducedMotion || isTouchDevice) {
      gsap.fromTo(
        aboutSectionRef.current,
        { autoAlpha: 0, y: 40 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power1.out' }
      );
      return;
    }

    const tl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });
    tl.fromTo('.page', { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1 })
      .fromTo(
        aboutSectionRef.current,
        { autoAlpha: 0, y: 60 },
        { autoAlpha: 1, y: 0 }
      )
      .fromTo(
        aboutSectionRef.current.querySelectorAll('.aboutCard, .aboutPrimary'),
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, stagger: 0.12 },
        '-=0.4'
      );

    return () => tl.kill();
  }, [isVisible]);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const scaleUp = () => gsap.to(button, { scale: 1.12, duration: 0.25 });
    const scaleDown = () => gsap.to(button, { scale: 1, duration: 0.25 });

    button.addEventListener('mouseenter', scaleUp);
    button.addEventListener('mouseleave', scaleDown);

    return () => {
      button.removeEventListener('mouseenter', scaleUp);
      button.removeEventListener('mouseleave', scaleDown);
    };
  }, []);

  const handleScaleUp = (event) => gsap.to(event.currentTarget, { scale: 1.12, duration: 0.25 });
  const handleScaleDown = (event) => gsap.to(event.currentTarget, { scale: 1, duration: 0.25 });

  return (
    <div className="page">
      <button ref={buttonRef} onClick={hideOverlay}>
        <h1>Back</h1>
      </button>
      <div className="Format">
        <section className="Section aboutSection" ref={aboutSectionRef}>
          <div className="aboutPrimary">
            <span className="eyebrow">About</span>
            <h1>Web experiences powered by real-time data</h1>
            <p className="aboutSummary">
              Full-stack junior developer experienced in building AI-driven trading platforms that blend
              real-time market data, automated strategies, and voice-enabled assistants across modern web
              and Python services.
            </p>
            <p>
              I specialize in translating complex workflows into approachable web products. Whether it’s
              connecting streaming market data, automating brokerage tasks, or layering in AI assistants,
              I focus on reliable systems and clean UX that feel effortless to use.
            </p>
            <div className="aboutHighlights">
              <h2>Where I create value</h2>
              <ul>
                {highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div className="aboutActions">
              <a
                href="https://docs.google.com/document/d/12GtkKixHYPvFlJCWfXx_4etS_pKIu5v70eESW6R86J4/export?format=pdf"
                download
                title="Download Resume"
                className="resumeButton"
              >
                <button onMouseEnter={handleScaleUp} onMouseLeave={handleScaleDown}>
                  Download Resume
                </button>
              </a>
              <p>Open to collaborating on ambitious, human-centered web platforms.</p>
            </div>
          </div>
          <aside className="aboutSecondary">
            <div className="aboutCard">
              <h2>Core Skills</h2>
              <div className="aboutSkillsGrid">
                {skillGroups.map(({ title, items }) => (
                  <div className="skillGroup" key={title}>
                    <h3>{title}</h3>
                    <ul>
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="aboutCard">
              <h2>Experience Snapshot</h2>
              <p className="aboutExperienceTitle">Stock Bot Web Application — Developer</p>
              <ul>
                {experiencePoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="aboutCard">
              <h2>How I work</h2>
              <ul>
                {workflowValues.map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
            <div className="aboutCard aboutPhotoCard">
              <img src="/static/Billy.png" alt="William Wapniarek" />
              <div className="aboutEducation">
                <h2>Education</h2>
                <p>
                  <strong>University of Advancing Technology</strong>
                </p>
                <p>B.S. Computer Science — 2024</p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default About;

