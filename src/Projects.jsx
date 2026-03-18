import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 40, rotateX: 6 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const hoverTransform = {
  rotateX: -6,
  rotateY: 6,
  scale: 1.03,
};

const Projects = () => {
  return (
    <>
      <motion.div
        className="project-card-3d reveal"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        whileHover={hoverTransform}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      >
        <div className="card-inner">
          <div className="card-front">
            <div className="project-header">
              <div className="project-icon">🚀</div>
              <div className="project-status">LIVE</div>
            </div>
            <h4>Forum Flow</h4>
            <p>
              A dynamic student discussion portal designed to bridge
              communication gaps. Developed a secure environment for real-time
              exchange and resource sharing.
            </p>
            <div className="project-features">
              <span className="feature-badge">JWT Auth</span>
              <span className="feature-badge">Multer</span>
              <span className="feature-badge">Real-time</span>
            </div>
            <div className="project-actions">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="btn tertiary live-demo-btn"
              >
                Live Demo
              </a>
              <a
                href="https://github.com/NehaPatil2610"
                target="_blank"
                rel="noreferrer"
                className="btn secondary github-btn"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="project-card-3d reveal"
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        whileHover={hoverTransform}
        transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      >
        <div className="card-inner">
          <div className="card-front">
            <div className="project-header">
              <div className="project-icon">🎬</div>
              <div className="project-status">LIVE</div>
            </div>
            <h4>FlickFinder</h4>
            <p>
              An intuitive movie discovery engine that aggregates global
              cinematic data. Focuses on speed, responsiveness, and clean UI/UX.
            </p>
            <div className="project-features">
              <span className="feature-badge">TMDB API</span>
              <span className="feature-badge">React Hooks</span>
              <span className="feature-badge">Responsive</span>
            </div>
            <div className="project-actions">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="btn tertiary live-demo-btn"
              >
                Live Demo
              </a>
              <a
                href="https://github.com/NehaPatil2610"
                target="_blank"
                rel="noreferrer"
                className="btn secondary github-btn"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Projects;

