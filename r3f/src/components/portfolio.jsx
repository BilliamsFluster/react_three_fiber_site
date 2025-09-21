import React from 'react';
import Button from './ui/button';

const projects = [
  {
    title: 'Immersive Portfolio',
    tags: ['React', 'R3F', 'GSAP'],
    summary:
      'A personal world built with React Three Fiber to showcase work through a playable scene and animated storytelling.',
    challenge:
      'Learning the R3F ecosystem pushed me to blend Three.js, GSAP timelines, and component-driven UI patterns in a cohesive way.',
    links: [{ label: 'Visit site', href: 'https://bwap.netlify.app/', variant: 'default' }],
  },
  {
    title: 'Film Explorer',
    tags: ['React', 'REST APIs'],
    summary:
      'A movie discovery experience that consumes a film API, presenting curated watchlists with responsive search and filtering.',
    challenge:
      'Integrating a third-party API taught me how to plan data flows, normalise payloads, and build resilient loading states.',
    links: [{ label: 'View GitHub', href: 'https://github.com/BilliamsFluster/react_film_site', variant: 'outline' }],
  },
  {
    title: 'Visual Save Plugin',
    tags: ['Unreal Engine', 'C++', 'Tools'],
    summary:
      'Marketplace plugin that encodes save-game data into images so players can store, share, and load progress from visual files.',
    challenge:
      'Reverse-engineering Unreal’s save pipeline and Slate UI required meticulous system design and a creative approach to data.',
    links: [
      {
        label: 'Marketplace page',
        href: 'https://www.unrealengine.com/marketplace/en-US/product/visual-save-plugin',
        variant: 'default',
      },
    ],
  },
  {
    title: 'BLU Game Engine',
    tags: ['C++', 'Engine Architecture'],
    summary:
      'A hobby engine exploring rendering layers, event dispatching, and editor tooling with a focus on extensibility.',
    challenge:
      'Designing the event and rendering systems meant breaking large problems into smaller primitives that could evolve safely.',
    links: [{ label: 'View GitHub', href: 'https://github.com/BilliamsFluster/Blu', variant: 'outline' }],
  },
  {
    title: 'Survive The Enemies',
    tags: ['Unreal Engine', 'Gameplay'],
    summary:
      'Action prototype featuring modular weapons, enemy AI, and inventory systems tuned for fast iteration in Unreal.',
    challenge:
      'Refactoring the weapon system into a single data-driven actor made future balancing easier for designers and teammates.',
    links: [{ label: 'Watch demo', href: 'https://youtu.be/qUgCkX0peI4', variant: 'default' }],
  },
];

const Portfolio = ({ onClose }) => {
  return (
    <div className="section-wrapper">
      <div className="section-header">
        <div className="section-header__meta">
          <div>
            <p className="section-eyebrow">Portfolio</p>
            <h2 className="section-title">Selected builds & experiments</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Back to scene
          </Button>
        </div>
        <p className="section-lead">
          A mix of shipped work and personal explorations that helped me grow as a programmer, designer, and collaborator.
          Each project strengthened my ability to prototype quickly while still keeping codebases approachable.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article key={project.title} className="project-card">
            <div className="project-card__header">
              <h3 className="project-card__title">{project.title}</h3>
              <div className="project-card__tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-card__tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="project-card__body">{project.summary}</p>
            <p className="section-card__meta">{project.challenge}</p>
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
    </div>
  );
};

Portfolio.displayName = 'Portfolio';

export default Portfolio;
