import React from 'react';
import { motion } from 'framer-motion';

/* ─── Graduation Cap SVG Icon ─── */
const GraduationCap = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.15"/>
    <path d="M2 17C2 17 2 12 2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 10V17C6 17 8 20 12 20C16 20 18 17 18 17V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="2" cy="17" r="1" fill="currentColor"/>
  </svg>
);

const cardVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.97 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

const degrees = [
  {
    level: 'Post Graduate',
    degree: 'Master of Computer Applications',
    short: 'MCA',
    college: 'K.B Joshi Institute of Information Technology',
    timeline: '2024 – 2026',
    cgpa: '8.81',
    pursuing: true,
  },
  {
    level: 'Under Graduate',
    degree: 'Bachelor of Computer Applications',
    short: 'BCA',
    college: 'K.K Wagh Arts, Science & Computer Science College',
    timeline: '2021 – 2024',
    cgpa: '7.84',
    pursuing: false,
  },
];

export default function Education({ theme }) {
  return (
    <section id="education" className="relative py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
            Education
          </h2>
          <div className="h-[2px] w-[80px] bg-gradient-to-r from-[#D4AF37] to-transparent mt-4 rounded-full" />
        </motion.div>

        {/* Timeline container */}
        <div className="relative flex flex-col gap-6">
          {/* Vertical golden timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4AF37]/60 via-[#D4AF37]/20 to-transparent ml-6 hidden sm:block" />

          {degrees.map((edu, i) => (
            <motion.article
              key={edu.short}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className={`education-card group relative sm:ml-16 rounded-2xl p-6 border-l-4 border-[#D4AF37] transition-all duration-500
                hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-[0.99]
                backdrop-blur-3xl
                ${theme === 'dark'
                  ? 'bg-white/[0.03] border border-[#D4AF37]/15 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
                  : 'bg-black/[0.03] border border-[#D4AF37]/20 shadow-[0_8px_32px_rgba(0,0,0,0.06)]'
                }`}
            >
              {/* Timeline dot (visible on sm+) */}
              <div className="absolute -left-[2.55rem] top-6 hidden sm:flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/20 ring-4 ring-[#D4AF37]/10">
                <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                {/* Left: icon + text */}
                <div className="flex items-start gap-4">
                  {/* Graduation cap icon */}
                  <span className="flex-shrink-0 h-11 w-11 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                    <GraduationCap className="w-6 h-6" />
                  </span>

                  <div className="space-y-1">
                    {/* Level label */}
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                      {edu.level}
                    </p>

                    {/* Degree title */}
                    <h3 className={`text-lg sm:text-xl font-bold leading-tight ${
                      theme === 'light' ? 'text-slate-900' : 'text-slate-50'
                    }`}>
                      {edu.degree}
                      <span className={`ml-2 text-sm font-mono ${
                        theme === 'light' ? 'text-slate-500' : 'text-slate-400'
                      }`}>
                        ({edu.short})
                      </span>
                    </h3>

                    {/* College */}
                    <p className={`text-sm leading-relaxed ${
                      theme === 'light' ? 'text-slate-700' : 'text-slate-300'
                    }`}>
                      {edu.college}
                    </p>
                  </div>
                </div>

                {/* Right: badges */}
                <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 flex-shrink-0">
                  {/* Timeline */}
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-mono font-semibold border ${
                    theme === 'dark'
                      ? 'bg-white/5 border-[#D4AF37]/20 text-slate-300'
                      : 'bg-black/5 border-[#D4AF37]/20 text-slate-700'
                  }`}>
                    <svg className="w-3 h-3 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {edu.timeline}
                  </span>

                  {/* CGPA */}
                  <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-mono font-bold border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37]">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    CGPA: {edu.cgpa}
                  </span>

                  {/* Pursuing badge */}
                  {edu.pursuing && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>
                      Pursuing
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
