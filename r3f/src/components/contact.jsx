import React from 'react';
import Button from './ui/button';

const Contact = ({ onClose }) => {
  return (
    <div className="section-wrapper">
      <div className="section-header">
        <div className="section-header__meta">
          <div>
            <p className="section-eyebrow">Contact</p>
            <h2 className="section-title">Let&apos;s build something memorable</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Back to scene
          </Button>
        </div>
        <p className="section-lead">
          Have a question, a collaboration in mind, or a cool idea you want to explore? Drop me a message and I&apos;ll get back
          to you soon. I&apos;m always open to chatting about gameplay systems, front-end adventures, or inventive tools.
        </p>
      </div>

      <div className="contact-panel">
        <div className="contact-links">
          <a className="contact-link" href="mailto:ww27hockey@icloud.com">
            <span className="skill-tag">Email</span>
            <span>ww27hockey@icloud.com</span>
          </a>
          <a className="contact-link" href="https://github.com/BilliamsFluster" target="_blank" rel="noreferrer">
            <span className="skill-tag">GitHub</span>
            <span>github.com/BilliamsFluster</span>
          </a>
        </div>

        <form
          className="contact-form"
          action="https://formspree.io/f/xknekdrg"
          method="POST"
        >
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" type="text" placeholder="Jane Doe" required />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="jane@example.com" required />

          <label htmlFor="subject">Subject</label>
          <input id="subject" name="subject" type="text" placeholder="Let&apos;s talk about..." required />

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" placeholder="Share a little about your idea." required />

          <div>
            <Button type="submit">Send message</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

Contact.displayName = 'Contact';

export default Contact;
