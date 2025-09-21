import React from 'react';
import Button from './ui/button';

const featuredWorks = [
  {
    title: 'Stock Bot Web Application',
    summary:
      'AI-assisted trading platform that combines a Next.js front-end, Node/Express orchestration layer, and a Python trading engine.',
    highlights: [
      'Unified real-time market data, automated strategies, and broker operations into a single portfolio dashboard.',
      'Delivered Schwab OAuth onboarding with AES-256-GCM token storage and brokerage account verification using Mongoose hooks.',
      'Built a Jarvis voice assistant loop that streams SpeechRecognition into LLM prompts and TTS playback for hands-free trade execution.',
      'Shipped a backtesting toolkit with momentum strategies, ATR-based risk controls, and slippage modelling for accurate performance insights.',
    ],
    stack: ['Next.js', 'Express', 'FastAPI', 'MongoDB', 'WebSockets', 'LLMs', 'GSAP'],
    links: [
      {
        label: 'View architecture notes',
        href: 'https://docs.google.com/document/d/12GtkKixHYPvFlJCWfXx_4etS_pKIu5v70eESW6R86J4',
        variant: 'default',
      },
    ],
  },
];

const supportingProjects = [
  {
    title: 'Immersive Portfolio',
    description:
      'Interactive personal site where visitors explore projects inside a playable React Three Fiber world layered with GSAP storytelling.',
    impact:
      'Reinforced my ability to blend creative direction, shader-driven visuals, and accessible UI states within a single codebase.',
    stack: ['React', 'React Three Fiber', 'GSAP'],
    links: [{ label: 'Visit site', href: 'https://bwap.netlify.app/', variant: 'default' }],
  },
  {
    title: 'Film Explorer',
    description:
      'Responsive web app that surfaces curated watchlists by orchestrating third-party film APIs with debounced search and filter states.',
    impact: 'Showcased pragmatic data modelling, resilient error states, and reusable UI primitives for content-heavy experiences.',
    stack: ['React', 'REST APIs', 'CSS Modules'],
    links: [{ label: 'View GitHub', href: 'https://github.com/BilliamsFluster/react_film_site', variant: 'outline' }],
  },
  {
    title: 'Strategy Sandbox',
    description:
      'Configurable analysis suite that lets traders prototype momentum ideas, tweak ATR-based stops, and visualise returns before deploying.',
    impact:
      'Extended my backtesting engine with reusable hooks, clear data visualisation contracts, and export-ready performance reports.',
    stack: ['Python', 'FastAPI', 'pandas', 'NumPy'],
    links: [{ label: 'Explore code', href: 'https://github.com/BilliamsFluster/strategy-sandbox', variant: 'outline' }],
  },
];

const Portfolio = ({ onClose }) => {
  return (
    <div className="section-wrapper">
      <div className="section-header">
        <div className="section-header__meta">
          <div>
            <p className="section-eyebrow">Portfolio</p>
            <h2 className="section-title">Web works & product experiments</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Back to scene
          </Button>
        </div>
        <p className="section-lead">
          A collection of web-first builds that highlight how I design, integrate, and ship full-stack experiences. Each
          project is structured to make future iterations simple to add—drop a new card into the data arrays and it will
          slot neatly into the layout.
        </p>
      </div>

      <section className="works-section">
        <header className="section-subheader">
          <h3 className="section-subtitle">Featured work</h3>
          <p className="section-card__meta">Deep dives into end-to-end product deliveries.</p>
        </header>
        <div className="featured-works">
          {featuredWorks.map((work) => (
            <article key={work.title} className="project-card project-card--featured">
              <div className="project-card__header">
                <h3 className="project-card__title">{work.title}</h3>
                <div className="project-card__tags">
                  {work.stack.map((tag) => (
                    <span key={tag} className="project-card__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="project-card__body">{work.summary}</p>
              <ul className="project-card__list">
                {work.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <div className="project-card__footer">
                {work.links.map((link) => (
                  <Button key={link.href} variant={link.variant} size="sm" asChild>
                    <a href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="works-section">
        <header className="section-subheader">
          <h3 className="section-subtitle">Additional builds</h3>
          <p className="section-card__meta">Compact snapshots that show range across the stack.</p>
        </header>
        <div className="projects-grid projects-grid--supporting">
          {supportingProjects.map((project) => (
            <article key={project.title} className="project-card">
              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__body">{project.description}</p>
              <p className="section-card__meta">{project.impact}</p>
              <div className="project-card__tags">
                {project.stack.map((tag) => (
                  <span key={tag} className="project-card__tag">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-card__footer">
                {project.links.map((link) => (
                  <Button key={link.href} variant={link.variant} size="sm" asChild>
                    <a href={link.href} target="_blank" rel="noreferrer">
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

Portfolio.displayName = 'Portfolio';

export default Portfolio;
