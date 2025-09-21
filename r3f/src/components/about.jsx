import React from 'react';
import Button from './ui/button';

const frontEndSkills = [
  { label: 'React', level: '☆☆☆☆' },
  { label: 'React Three Fiber', level: '☆☆☆' },
  { label: 'GSAP', level: '☆☆☆☆' },
  { label: 'Three.js', level: '☆☆☆☆' },
  { label: 'JavaScript', level: '☆☆☆☆' },
  { label: 'TypeScript', level: '☆☆' },
  { label: 'HTML & CSS', level: '☆☆☆☆' },
];

const gameDevSkills = [
  { label: 'Unreal Engine 5', level: '☆☆☆☆' },
  { label: 'C++', level: '☆☆☆☆☆' },
  { label: 'C', level: '☆☆☆☆☆' },
  { label: 'C#', level: '☆☆☆' },
  { label: 'Computer Graphics', level: '☆☆' },
  { label: 'Game Math & Physics', level: '☆☆☆' },
  { label: 'AI Programming', level: '☆☆☆' },
];

const About = ({ onClose }) => {
  return (
    <div className="section-wrapper">
      <div className="section-header">
        <div className="section-header__meta">
          <div>
            <p className="section-eyebrow">About</p>
            <h2 className="section-title">Engineering playful, technical experiences</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Back to scene
          </Button>
        </div>
        <p className="section-lead">
          I&apos;m William, a gameplay programmer and front-end developer who loves translating ideas into interactive
          realities. I thrive when I can mix creative storytelling with reliable systems design to craft experiences that
          feel polished, playful, and personal.
        </p>
      </div>

      <div className="section-grid">
        <div className="section-card">
          <h3 className="section-card__title">What I&apos;m focused on</h3>
          <p className="project-card__body">
            I enjoy solving complex problems with a human touch. Whether it&apos;s prototyping a new mechanic, polishing
            interface details, or optimising a pipeline, I love creating spaces where people feel curious and in control.
            Recent work includes <strong>Visual Save</strong>, an Unreal Engine plugin that encodes save game data into
            images so players can store and share their progress creatively.
          </p>
          <div className="skill-tag-list">
            <span className="skill-tag">Gameplay Programming</span>
            <span className="skill-tag">Front-End UI</span>
            <span className="skill-tag">Technical Art</span>
            <span className="skill-tag">Systems Design</span>
          </div>
          <Button variant="default" asChild>
            <a href="https://docs.google.com/document/d/12GtkKixHYPvFlJCWfXx_4etS_pKIu5v70eESW6R86J4/export?format=pdf" download>
              Download resume
            </a>
          </Button>
        </div>

        <div className="section-card">
          <h3 className="section-card__title">Skill snapshot</h3>
          <p className="section-card__meta">A blend of web technology and game engine expertise.</p>
          <div className="skill-columns">
            <ul>
              <li>
                <strong>Front-End</strong>
              </li>
              {frontEndSkills.map((skill) => (
                <li key={skill.label}>
                  {skill.label} – {skill.level}
                </li>
              ))}
            </ul>
            <ul>
              <li>
                <strong>Game Development</strong>
              </li>
              {gameDevSkills.map((skill) => (
                <li key={skill.label}>
                  {skill.label} – {skill.level}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section-card about-portrait">
          <img src="/static/Billy.png" alt="William portrait" />
        </div>
      </div>
    </div>
  );
};

About.displayName = 'About';

export default About;
