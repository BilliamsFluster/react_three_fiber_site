import React from 'react';
import Button from './ui/button';

const portfolioWorks = [
  {
    title: 'Prime Pastures Meat',
    role: 'Business website',
    summary:
      'Customer-facing site for a regenerative farm co-op, built to showcase seasonal offerings, provide pickup details, and connect the community with the farm’s values.',
    highlights: [
      'Designed clear flows that highlight product availability, pickup windows, and subscription options.',
      'Structured content so staff can update seasonal offerings and announcements without dev involvement.',
      'Blended photography, natural tones, and modern layout to reflect the farm’s premium yet approachable identity.',
    ],
    image: '/static/PrimePastures.png',
    links: [{ label: 'Visit site', href: 'https://primepasturesmeat.com/', variant: 'default' }],
  },

  {
    title: 'Stock Bot Web Application',
    role: 'AI-assisted trading platform',
    summary:
      'Unified trading cockpit where equities data, broker operations, and a Jarvis-style voice assistant sit behind one responsive interface.',
    highlights: [
      'Streams real-time quotes, automated strategies, and alerts into a single watchlist that syncs across desktop and mobile sessions.',
      'Secures brokerage access with Schwab OAuth, encrypted token vaulting, and verification routines that reduce onboarding friction.',
      'Pairs LLM prompts with speech recognition and text-to-speech so traders can run backtests or place trades without touching the keyboard.',
    ],
    image: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjFoZHlpeWl2NXBwajRueHprd256Mm10dDloN3dqOWFic3czanlzciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/N6YZ7FuLTeTHxm9wd7/giphy.gif',
    links: [
      { label: 'Visit github', href: 'https://github.com/BilliamsFluster/StockBotWebApp', variant: 'default' }
      
    ],
  },
  {
    title: 'Pinnacle Gaming Studios',
    role: 'Game studio website',
    summary:
      'Official company site for Pinnacle Gaming Studios, an indie team building a post-apocalyptic survival RPG in Unreal Engine 5. The site introduces the studio, upcoming projects, and team roles through immersive visuals and interactive motion design.',
    highlights: [
      'Developed an interactive landing page with cinematic transitions and layered video backgrounds to reflect the studio’s narrative focus.',
      'Implemented scroll-based GSAP animations and guided camera paths that give the site a polished, game-inspired flow.',
      'Structured content for games, team members, and updates in a modular, data-driven format for easy refresh and scalability.',
    ],
    image: '/static/PinnacleGamingStudios.png',
    links: [{ label: 'Visit website', href: 'https://pinnaclegamingstudios.netlify.app/', variant: 'default' }],
  }

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
          showcase pairs visuals with the exact impact delivered so new prospects can explore how I solve their challenges.
        </p>
      </div>

      <section className="works-section">
        <header className="section-subheader">
          <h3 className="section-subtitle">Live web builds</h3>
          <p className="section-card__meta">Each card pairs a live link with context and visuals for clients.</p>
        </header>
        <div className="projects-grid projects-grid--feature">
          {portfolioWorks.map((work) => (
            <article key={work.title} className="project-card project-card--spotlight">
              <div className="project-card__media">
                <img src={work.image} alt={`${work.title} website preview`} />
              </div>
              <div className="project-card__content">
                <div className="project-card__header">
                  <div>
                    <h3 className="project-card__title">{work.title}</h3>
                    <p className="section-card__meta">{work.role}</p>
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
