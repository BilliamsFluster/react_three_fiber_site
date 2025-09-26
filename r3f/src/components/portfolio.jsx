import React from 'react';
import Button from './ui/button';

const portfolioWorks = [
  {
    title: 'Prime Pastures Meat',
    role: 'Farm-to-table eCommerce storefront',
    summary:
      'Direct-to-consumer experience for a regenerative farm co-op featuring subscription boxes, seasonal drops, and story-driven merchandising.',
    highlights: [
      'Crafted conversion-focused landing flows that surface sourcing standards, fulfilment windows, and bundle savings.',
      'Synced product data, add-to-cart states, and waitlists so the team can manage inventory surges without developer intervention.',
      'Wove brand photography with earthy gradients for a premium but grounded feel that mirrors the in-person farm tour.',
    ],
    image: '/static/portfolio/primepastures-preview.svg',
    links: [{ label: 'Visit website', href: 'https://primepasturesmeat.com/', variant: 'default' }],
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
    image: '/static/portfolio/stockbot-preview.svg',
    links: [
      { label: 'Visit website', href: 'https://stock-bot.dev/', variant: 'default' },
      {
        label: 'Read architecture notes',
        href: 'https://docs.google.com/document/d/12GtkKixHYPvFlJCWfXx_4etS_pKIu5v70eESW6R86J4',
        variant: 'outline',
      },
    ],
  },
  {
    title: 'Immersive Portfolio World',
    role: 'Interactive 3D showcase',
    summary:
      'Playable React Three Fiber experience that introduces my services through cinematic lighting, guided camera paths, and responsive UI overlays.',
    highlights: [
      'Balances performant shaders, bloom, and post-processing with accessibility-minded controls and focus states.',
      'Coordinates GSAP timelines with scroll cues so each section reveals context and calls-to-action at the right pace.',
      'Bundles all data-driven sections—About, Portfolio, Contact—into JSON-friendly arrays for rapid content refreshes.',
    ],
    image: '/static/portfolio/immersive-portfolio-preview.svg',
    links: [{ label: 'Visit website', href: 'https://bwap.netlify.app/', variant: 'default' }],
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
