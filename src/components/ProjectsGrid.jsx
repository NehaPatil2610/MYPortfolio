import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, duration: 0.6, ease: 'easeOut' },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const ProjectsGrid = ({ theme }) => {
  const getBadge = (status) => (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-2.5 py-1 text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider">
      <div className="pulse-badge scale-75">
        <span className="pulse-badge-inner bg-[#D4AF37]" />
        <span className="pulse-badge-dot bg-[#D4AF37]" />
      </div>
      {status}
    </span>
  );

  const renderBorderBeam = () => <div className="border-beam" />;

  const getCardClass = () =>
    `border-beam-container relative h-full rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] solar-card-glow ${
      theme === 'light' ? 'solar-glass-light' : 'solar-glass-dark'
    }`;

  const getSmallCardClass = () =>
    `border-beam-container relative h-full rounded-[2rem] p-6 flex flex-col gap-4 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] solar-card-glow ${
      theme === 'light' ? 'solar-glass-light' : 'solar-glass-dark'
    }`;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="grid gap-6 lg:gap-10 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)]"
    >
      <motion.div variants={cardVariants} className="h-full">
        <Tilt
          glareEnable
          glareMaxOpacity={0.15}
          glareColor="#D4AF37"
          glarePosition="all"
          tiltMaxAngleX={8}
          tiltMaxAngleY={8}
          transitionSpeed={2000}
          className="magnetic-target h-full"
        >
          <div className={getCardClass()}>
            {renderBorderBeam()}
            <div className="relative p-6 sm:p-8 flex flex-col gap-6 flex-1">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-1">
                    Featured Project
                  </p>
                  <h3 className={`text-2xl sm:text-3xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-slate-50'}`}>
                    BusScape • Smart Tracking
                  </h3>
                </div>
                {getBadge('LIVE')}
              </div>

              <p className={`text-base leading-relaxed ${theme === 'light' ? 'text-slate-800' : 'text-slate-300'}`}>
                Real‑time bus tracking platform that helps students and commuters know exactly where their bus is.
                Designed with a focus on reliability, predictable updates, and a calm, resilient user interface.
              </p>

              <div className="flex flex-wrap gap-2.5">
                {['React', 'Node.js', 'MongoDB', 'JWT'].map((tech) => (
                  <span key={tech} className={`rounded-lg px-3 py-1 text-[11px] font-mono font-bold backdrop-blur-sm ${
                    theme === 'light'
                      ? 'bg-white/60 text-slate-700 border border-[#D4AF37]/15'
                      : 'bg-white/5 text-[#D4AF37] border border-[#D4AF37]/20'
                  }`}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-4 flex items-center gap-4">
                <a
                  href="https://github.com/NehaPatil2610"
                  target="_blank"
                  rel="noreferrer"
                  className={`group/btn magnetic-target flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold transition-all hover:scale-105 active:scale-95 ${
                    theme === 'light'
                      ? 'border-slate-800 text-slate-900 hover:border-[#D4AF37] hover:text-[#D4AF37] bg-white/60 backdrop-blur-sm'
                      : 'border-slate-600 text-slate-100 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                  }`}
                  title="Source Code"
                >
                  <Github className="w-4 h-4" />
                  <span>Repository</span>
                </a>
              </div>
            </div>
          </div>
        </Tilt>
      </motion.div>

      <div className="flex flex-col gap-6">
        <motion.div variants={cardVariants} className="flex-1">
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} transitionSpeed={2000} className="magnetic-target h-full">
            <div className={getSmallCardClass()}>
              {renderBorderBeam()}
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold ${theme === 'light' ? 'text-slate-900' : 'text-slate-50'}`}>
                  ForumFlow
                </h3>
                {getBadge('LIVE')}
              </div>
              <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-slate-800' : 'text-slate-400'}`}>
                Secure student discussion portal with structured threads and role‑based access.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {['Express', 'Multer', 'Postman'].map(t => (
                  <span key={t} className={`text-[10px] font-mono font-bold ${theme === 'light' ? 'text-[#D4AF37]' : 'text-[#D4AF37]/70'}`}>#{t}</span>
                ))}
              </div>
            </div>
          </Tilt>
        </motion.div>

        <motion.div variants={cardVariants} className="flex-1">
          <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} transitionSpeed={2000} className="magnetic-target h-full">
            <div className={getSmallCardClass()}>
              {renderBorderBeam()}
              <div className="flex items-center justify-between">
                <h3 className={`text-lg font-bold ${theme === 'light' ? 'text-slate-900' : 'text-slate-50'}`}>
                  FlickFinder
                </h3>
                {getBadge('LIVE')}
              </div>
              <p className={`text-sm leading-relaxed ${theme === 'light' ? 'text-slate-800' : 'text-slate-400'}`}>
                Fast movie discovery experience powered by TMDB, focused on performance and clean UX.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {['React', 'TMDB', 'API'].map(t => (
                  <span key={t} className={`text-[10px] font-mono font-bold ${theme === 'light' ? 'text-[#D4AF37]' : 'text-[#D4AF37]/70'}`}>#{t}</span>
                ))}
              </div>
            </div>
          </Tilt>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectsGrid;
