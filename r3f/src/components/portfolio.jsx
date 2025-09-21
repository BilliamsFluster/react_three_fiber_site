/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useDisplay } from '../threeComponents/DisplayContextManager';
import Card from '../threeComponents/PortfolioCard';

gsap.registerPlugin(ScrollTrigger);

const projectGroups = [
  {
    heading: 'Featured Build',
    subheading: 'Production web apps that orchestrate services, automation, and responsive UI.',
    projects: [
      {
        image: '/static/Website.png',
        title: 'Stock Bot Web Application',
        description: (
          <>
            <p>
              Real-time trading cockpit that connects a Next.js interface with Node.js/Express
              services and a FastAPI trading engine.
            </p>
          </>
        ),
        tags: ['Next.js', 'Express', 'FastAPI', 'WebSockets', 'OAuth2'],
        readMoreContent: (
          <ul>
            <li>
              Streamed live market data, orders, and alerts into the dashboard through resilient
              WebSocket channels.
            </li>
            <li>
              Implemented Charles Schwab OAuth with AES-256-GCM token vaulting and MongoDB
              persistence for brokerage integrations.
            </li>
            <li>
              Embedded a Jarvis-style voice assistant loop (SpeechRecognition → LLM → TTS) for
              hands-free portfolio walkthroughs.
            </li>
            <li>
              Delivered configurable backtesting analytics with ATR-based risk management and
              performance reporting for traders.
            </li>
          </ul>
        ),
        links: [
          {
            href: 'https://github.com/BilliamsFluster',
            label: 'Repository',
            icon: '/static/Github.png',
            tooltip: 'Explore related GitHub work',
          },
        ],
      },
    ],
  },
  {
    heading: 'Supporting Web Projects',
    subheading: 'Experiments that explore new interaction patterns and data-driven UX.',
    projects: [
      {
        image: '/static/Website.png',
        title: 'Immersive Portfolio Platform',
        description: (
          <>
            <p>
              Story-driven recruiting experience blending React Three Fiber scenes with overlay
              narratives and GSAP timelines.
            </p>
          </>
        ),
        tags: ['React', 'React Three Fiber', 'GSAP', 'Vite'],
        readMoreContent: (
          <ul>
            <li>
              Synced 3D camera choreography with overlay components to highlight each chapter of the
              story without losing immersion.
            </li>
            <li>
              Implemented a DisplayContext system that locks scene controls while overlays are
              active, keeping the focus on content.
            </li>
            <li>
              Crafted micro-interactions with GSAP to provide hover feedback, entry animations, and
              smooth transitions between sections.
            </li>
          </ul>
        ),
        links: [
          {
            href: 'https://bwap.netlify.app/',
            label: 'Live site',
            icon: '/static/Website.png',
            tooltip: 'Open the live portfolio',
          },
          {
            href: 'https://github.com/BilliamsFluster',
            label: 'Code',
            icon: '/static/Github.png',
            tooltip: 'View source control work',
          },
        ],
      },
      {
        image: '/static/Website.png',
        title: 'Movie Discovery Dashboard',
        description: (
          <>
            <p>
              Responsive catalog for browsing films via a third-party API with rich search and
              filtering.
            </p>
          </>
        ),
        tags: ['React', 'REST APIs', 'Responsive UI'],
        readMoreContent: (
          <ul>
            <li>
              Integrated remote movie data with reusable React hooks for fetching, error handling,
              and loading states.
            </li>
            <li>
              Designed card-based layouts that adapt to mobile, tablet, and desktop breakpoints to
              keep discovery fast.
            </li>
            <li>
              Applied modular component patterns to extend filters and featured views without
              rewriting state management.
            </li>
          </ul>
        ),
        links: [
          {
            href: 'https://github.com/BilliamsFluster/react_film_site',
            label: 'Repository',
            icon: '/static/Github.png',
            tooltip: 'Inspect the React codebase',
          },
        ],
      },
    ],
  },
];

const Portfolio = ({ hideOverlay }) => {
  const buttonRef = useRef(null);
  const portfolioSectionRef = useRef(null);
  const { isVisible } = useDisplay();
  const timelineRef = useRef();

  useEffect(() => {
    if (!isVisible || !portfolioSectionRef.current) {
      return;
    }

    const sectionEl = portfolioSectionRef.current;
    timelineRef.current = gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top center+=80',
          toggleActions: 'play none none none',
        },
      })
      .fromTo(
        sectionEl,
        { autoAlpha: 0, y: 60 },
        { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }
      )
      .fromTo(
        sectionEl.querySelectorAll('.card'),
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power1.out',
        },
        '-=0.4'
      );

    return () => {
      timelineRef.current?.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
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

  return (
    <div className="page">
      <button ref={buttonRef} onClick={hideOverlay}>
        <h1>Back</h1>
      </button>
      <div className="Format">
        <div className="Section portfolioContainer" ref={portfolioSectionRef}>
          <span className="eyebrow">Works</span>
          <h1>Web Projects</h1>
          <p className="portfolioIntro">
            A curated look at the web experiences I build—from production trading platforms that
            blend AI, automation, and security to supporting prototypes that explore new UI ideas.
          </p>
          {projectGroups.map(({ heading, subheading, projects }) => (
            <section className="portfolioGroup" key={heading}>
              <div className="portfolioGroupHeader">
                <h2>{heading}</h2>
                {subheading && <p>{subheading}</p>}
              </div>
              <div className="portfolioSection">
                {projects.map((project) => (
                  <Card key={project.title} {...project} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

