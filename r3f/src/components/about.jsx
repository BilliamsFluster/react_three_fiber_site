import React from 'react';
import Button from './ui/button';

const focusAreas = [
  'Real-time market dashboards',
  'AI-assisted user journeys',
  'Secure brokerage integrations',
  'Automation & testing'
];

const skillColumns = [
  {
    title: 'Front-end',
    items: ['React & Next.js', 'TypeScript & JavaScript', 'React Three Fiber / Three.js', 'GSAP animation systems', 'Responsive design systems'],
  },
  {
    title: 'Back-end',
    items: ['Node.js & Express APIs', 'FastAPI microservices', 'MongoDB & Mongoose', 'WebSockets & streaming data', 'OAuth 2.0 flows'],
  },
  {
    title: 'Data & AI',
    items: ['Python (pandas, NumPy)', 'AI/ML assisted product features', 'Speech recognition & TTS', 'Strategy & backtesting engines', 'Git-based collaboration'],
  },
];

const impactHighlights = [
  'Orchestrated a multi-service trading stack that links a Next.js UI, Node/Express API, and FastAPI trading engine for live execution.',
  'Implemented Charles Schwab OAuth with AES-256-GCM token vaulting and broker account verification inside MongoDB pipelines.',
  'Built a Jarvis voice assistant loop that streams SpeechRecognition into LLM prompts and TTS playback for hands-free trading.',
  'Engineered a configurable backtesting and momentum strategy framework with ATR stops, slippage modelling, and performance metrics.',
];

const About = ({ onClose }) => {
  return (
    <div className="section-wrapper">
      <div className="section-header">
        <div className="section-header__meta">
          <div>
            <p className="section-eyebrow">About</p>
            <h2 className="section-title">Designing intelligent web products</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Back to scene
          </Button>
        </div>
        <p className="section-lead">
          Full-stack junior developer experienced in building AI-driven trading platforms that blend real-time market
          data, automated strategies, and voice-enabled assistants across modern web and Python services.
        </p>
      </div>

      <div className="section-grid section-grid--about">
        <div className="section-card section-card--primary">
          <h3 className="section-card__title">How I build</h3>
          <p className="project-card__body">
            I translate complex financial workflows into approachable web applications. My focus is pairing reliable
            engineering practices with purposeful motion and storytelling, so every screen balances clarity, trust, and
            delight.
          </p>
          <div className="skill-tag-list">
            {focusAreas.map((area) => (
              <span key={area} className="skill-tag">
                {area}
              </span>
            ))}
          </div>
          <Button variant="default" asChild>
            <a href="https://docs.google.com/document/d/12GtkKixHYPvFlJCWfXx_4etS_pKIu5v70eESW6R86J4/export?format=pdf" download>
              Download résumé
            </a>
          </Button>
        </div>

        <div className="section-card">
          <h3 className="section-card__title">Recent impact</h3>
          <p className="section-card__meta">Stock Bot Web Application</p>
          <ul className="section-list">
            {impactHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>

        <div className="section-card">
          <h3 className="section-card__title">Skill snapshot</h3>
          <p className="section-card__meta">Tooling I reach for when shaping web platforms.</p>
          <div className="skill-columns">
            {skillColumns.map((column) => (
              <ul key={column.title}>
                <li>
                  <strong>{column.title}</strong>
                </li>
                {column.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div className="section-card about-portrait">
          <img src="/static/Billy.png" alt="Portrait of William Wapniarek" />
        </div>
      </div>
    </div>
  );
};

About.displayName = 'About';

export default About;
