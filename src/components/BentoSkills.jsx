import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Code2, Database, Layers, Wrench } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 26, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.05 * i, duration: 0.55, ease: 'easeOut' },
  }),
};

const BentoSkills = ({ theme }) => {
  const getChipClass = () =>
    `inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-mono transition-all duration-300 ${
      theme === 'light'
        ? 'bg-white/60 text-slate-800 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 font-bold backdrop-blur-sm'
        : 'bg-white/5 text-slate-200 border-[#D4AF37]/15 hover:border-[#D4AF37]/50 hover:shadow-[0_0_10px_rgba(212,175,55,0.2)] backdrop-blur-sm'
    }`;

  const getCardClass = () =>
    `border-beam-container relative rounded-3xl p-6 flex flex-col gap-4 h-full transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] solar-card-glow ${
      theme === 'light' ? 'solar-glass-light' : 'solar-glass-dark'
    }`;

  const renderBorderBeam = () => <div className="border-beam" />;

  const categories = [
    {
      icon: <Code2 className="w-5 h-5" />,
      title: 'Frontend',
      skills: ['React', 'Framer Motion', 'Tailwind CSS', 'Bootstrap', 'HTML5', 'CSS3'],
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: 'Backend',
      skills: ['Java', 'Spring Boot', 'Hibernate', 'Node.js', 'Express', 'REST APIs', 'Auth'],
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: 'Database',
      skills: ['MySQL', 'SQL', 'MongoDB', 'Mongoose'],
    },
    {
      icon: <Wrench className="w-5 h-5" />,
      title: 'Tooling',
      skills: ['IntelliJ IDEA', 'Git & GitHub', 'Postman', 'VS Code', 'Figma'],
    },
  ];

  return (
    <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((cat, idx) => (
        <Tilt key={cat.title} tiltMaxAngleX={12} tiltMaxAngleY={12} transitionSpeed={2000} className="magnetic-target">
          <motion.article
            custom={idx}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={getCardClass()}
          >
            {renderBorderBeam()}
            <div className="flex items-center gap-4">
              <span className="h-10 w-10 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                {cat.icon}
              </span>
              <h3 className={`text-lg font-bold ${theme === 'light' ? 'text-slate-950' : 'text-slate-50'}`}>
                {cat.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {cat.skills.map((skill) => (
                <span key={skill} className={getChipClass()}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.article>
        </Tilt>
      ))}
    </div>
  );
};

export default BentoSkills;
