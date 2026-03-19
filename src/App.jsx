import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, Copy, Sun, Moon, Download, Eye, Check } from 'lucide-react';
import MagneticCursor from './components/MagneticCursor.jsx';
import BentoSkills from './components/BentoSkills.jsx';
import ProjectsGrid from './components/ProjectsGrid.jsx';
import Education from './components/Education.jsx';
import LenisProvider from './components/LenisProvider.jsx';
import SolarBackground from './components/SolarBackground.jsx';
import MouseTrail from './components/MouseTrail.jsx';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Canvas Error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ position: 'fixed', top: '50px', left: '10px', zIndex: 9999, color: 'red', background: 'black', padding: '10px' }}>
          <h2>WebGL Crash</h2>
          <pre style={{ fontSize: '10px' }}>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}


const RippleEffect = () => {
  React.useEffect(() => {
    const handleClick = (e) => {
      const ripple = document.createElement('div');
      ripple.className = 'ripple-effect';
      const size = 60;
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - size / 2}px`;
      ripple.style.top = `${e.clientY - size / 2}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };
    window.addEventListener('click', handleClick, true);
    return () => window.removeEventListener('click', handleClick, true);
  }, []);
  return null;
};

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#F1E5AC] to-[#D4AF37] origin-left z-50"
      style={{ scaleX }}
    />
  );
}

const Hero = ({ onViewWork, theme }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-start justify-center gap-10">
          <div className="space-y-8 text-left relative z-20 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 to-transparent px-3 py-1 text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.1)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D4AF37] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D4AF37]" />
              </span>
              Available for innovative projects
            </motion.div>

            <div className="space-y-4 relative z-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-1"
              >
                <motion.h1
                  whileHover={{ scale: 1.05 }}
                  className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#F1E5AC] to-[#D4AF37] transition-all duration-300 hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                >
                  Neha Patil
                </motion.h1>
                <p className={`text-lg sm:text-xl font-medium tracking-wide ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                  Software Developer
                </p>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className={`max-w-xl text-lg sm:text-xl font-normal leading-relaxed relative z-20 ${
                theme === 'light' ? 'text-slate-800' : 'text-slate-200'
              }`}
            >
              Passionate Full-Stack Developer dedicated to creating seamless user experiences and robust server-side architectures. With a focus on scalability and performance, I transform complex technical requirements into elegant, production-ready applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={onViewWork}
                className="group relative magnetic-target overflow-hidden rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F1E5AC] to-[#D4AF37] px-8 py-3.5 text-sm font-bold text-black shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-all hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">View Work</span>
              </button>

              {/* View Resume — glass */}
              <a
                href="/Neha_Patil_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className={`magnetic-target inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-bold backdrop-blur-md transition-all hover:scale-105 active:scale-95 ${
                  theme === 'light'
                    ? 'border-slate-400/40 bg-white/20 text-slate-800 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]'
                    : 'border-white/20 bg-white/5 text-slate-200 hover:border-[#D4AF37]/60 hover:text-[#D4AF37]'
                }`}
              >
                <Eye className="w-4 h-4" />
                <span>View Resume</span>
              </a>

              {/* Download CV — Sun-Catcher shimmer button */}
              <a
                href="/Neha_Patil_Resume.pdf"
                download
                className="btn-shimmer magnetic-target inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-bold text-black shadow-[0_4px_18px_rgba(212,175,55,0.45)] transition-all hover:scale-105 hover:shadow-[0_6px_28px_rgba(212,175,55,0.6)] active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SocialNav = ({ theme, onToggleTheme }) => {
  return (
    <nav className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl"
      >
        <div
          className={`flex items-center justify-between rounded-3xl px-4 py-2.5 sm:px-5 sm:py-3 backdrop-blur-xl transition-all duration-300 border shadow-sm ${
            theme === 'dark'
              ? 'bg-black/40 border-[#D4AF37]/25 text-slate-100 shadow-[0_4px_20px_rgba(212,175,55,0.1)]'
              : 'bg-white/40 border-[#D4AF37]/25 text-slate-900 shadow-sm'
          }`}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="magnetic-target inline-flex items-center gap-2 group transition-all hover:scale-105 active:scale-95"
          >
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.2em] transition-colors ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border border-[#D4AF37]/40 text-slate-300'
                  : 'bg-slate-100 border border-[#D4AF37]/40 text-slate-900'
              }`}
            >
              {'{   NP   }'}
            </span>
            <span
              className={`hidden sm:inline-block text-xs font-medium transition-all duration-300 hover:text-[#D4AF37] hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] cursor-default ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-900'
              }`}
            >
              Neha Patil • Software Developer
            </span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#projects"
              className={`hidden sm:inline-flex text-[11px] font-mono uppercase tracking-[0.2em] transition hover:text-[#D4AF37] hover:scale-105 active:scale-95 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}
            >
              Work
            </a>
            <a
              href="#skills"
              className={`hidden sm:inline-flex text-[11px] font-mono uppercase tracking-[0.2em] transition hover:text-[#D4AF37] hover:scale-105 active:scale-95 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}
            >
              Skills
            </a>
            <a
              href="#education"
              className={`hidden sm:inline-flex text-[11px] font-mono uppercase tracking-[0.2em] transition hover:text-[#D4AF37] hover:scale-105 active:scale-95 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}
            >
              Education
            </a>
            <a
              href="#contact"
              className={`hidden sm:inline-flex text-[11px] font-mono uppercase tracking-[0.2em] transition hover:text-[#D4AF37] hover:scale-105 active:scale-95 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}
            >
              Contact
            </a>
            <button
              type="button"
              onClick={onToggleTheme}
              className={`magnetic-target inline-flex h-8 w-8 items-center justify-center rounded-full border transition hover:scale-110 active:scale-90 ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-[#D4AF37]/30 text-slate-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/80'
                  : 'bg-slate-100 border-[#D4AF37]/30 text-slate-900 hover:text-[#D4AF37] hover:border-[#D4AF37]/80'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5" />
              ) : (
                <Moon className="w-3.5 h-3.5" />
              )}
            </button>
            <span
              className={`hidden sm:inline-block h-5 w-[1px] mx-1 ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'
              }`}
            />
            <div className="flex items-center gap-1.5">
              <a
                href="mailto:nehapatil26102002@gmail.com"
                className={`magnetic-target inline-flex h-8 w-8 items-center justify-center rounded-full border transition hover:scale-110 active:scale-90 ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-[#D4AF37]/30 text-slate-300 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'bg-slate-100 border-[#D4AF37]/30 text-slate-900 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                }`}
                aria-label="Email"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://github.com/NehaPatil2610"
                target="_blank"
                rel="noreferrer"
                className={`magnetic-target inline-flex h-8 w-8 items-center justify-center rounded-full border transition hover:scale-110 active:scale-90 ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-[#D4AF37]/30 text-slate-300 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'bg-slate-100 border-[#D4AF37]/30 text-slate-900 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                }`}
                aria-label="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/neha-patil-aba7632b4"
                target="_blank"
                rel="noreferrer"
                className={`magnetic-target inline-flex h-8 w-8 items-center justify-center rounded-full border transition hover:scale-110 active:scale-90 ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-[#D4AF37]/30 text-slate-300 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'bg-slate-100 border-[#D4AF37]/30 text-slate-900 hover:text-black hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                }`}
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </nav>
  )
}

function FinalSection({ theme }) {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          id="contact"
          className={`w-full rounded-3xl py-16 px-8 text-center space-y-8 relative overflow-hidden transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] ${
            theme === 'dark' ? 'solar-glass-dark' : 'solar-glass-light'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 to-transparent animate-pulse pointer-events-none" />
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter leading-tight"
          >
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#F1E5AC] to-[#D4AF37]"
            >
              Thank you for visiting!
            </span>
            <br />
            <span
              className={`block mt-4 text-xl sm:text-2xl font-light tracking-widest leading-loose ${
                theme === 'light' ? 'text-slate-800' : 'text-[#F1E5AC]/80'
              }`}
            >
              Let's build something extraordinary together.
            </span>
          </h2>

          <div className="flex items-center justify-center gap-6 pt-4">
            <a
              href="https://github.com/NehaPatil2610"
              target="_blank"
              rel="noreferrer"
              className={`group flex items-center gap-3 rounded-full border px-6 py-3 transition-all hover:scale-105 active:scale-95 ${
                theme === 'light' 
                  ? 'bg-transparent border-[#D4AF37]/50 text-slate-800 hover:border-[#D4AF37] hover:text-[#D4AF37]' 
                  : 'bg-transparent border-[#D4AF37]/50 text-slate-300 hover:border-[#D4AF37] hover:text-[#D4AF37]'
              }`}
            >
              <Github className="w-5 h-5" />
              <span className="font-mono text-sm uppercase tracking-widest">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/neha-patil-aba7632b4"
              target="_blank"
              rel="noreferrer"
              className={`group flex items-center gap-3 rounded-full border px-6 py-3 transition-all hover:scale-105 active:scale-95 ${
                theme === 'light'
                  ? 'bg-transparent border-[#D4AF37]/50 text-slate-800 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                  : 'bg-transparent border-[#D4AF37]/50 text-slate-300 hover:border-[#D4AF37] hover:text-[#D4AF37]'
              }`}
            >
              <Linkedin className="w-5 h-5" />
              <span className="font-mono text-sm uppercase tracking-widest">LinkedIn</span>
            </a>
          </div>
        </motion.div>

        <div className="mt-20 border-t border-[#D4AF37]/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-2">
            <span className={`font-mono text-[11px] uppercase tracking-[0.2em] ${theme === 'light' ? 'text-slate-700' : 'text-slate-500'}`}>
              © {new Date().getFullYear()} Neha Patil • Software Developer
            </span>
            <span className={`text-[10px] font-mono ${theme === 'light' ? 'text-slate-700' : 'text-slate-600'}`}>
              Crafting digital excellence with code.
            </span>
          </div>

          <EmailButton theme={theme} />
        </div>
      </div>
    </section>
  );
}

function EmailButton({ theme }) {
  const [copied, setCopied] = React.useState(false);
  const email = 'nehapatil26102002@gmail.com';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {}
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`email-btn-gold-bloom group magnetic-target relative flex items-center gap-3 rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 active:scale-95 ${
        theme === 'light'
          ? 'bg-slate-200/80 backdrop-blur-sm text-slate-800 border border-slate-300 shadow-sm'
          : 'bg-slate-900 text-slate-300 border border-slate-700'
      }`}
    >
      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
      <span className="font-mono text-sm uppercase tracking-widest">
        {copied ? 'Copied!' : 'Copy Email'}
      </span>
    </button>
  );
}

function App() {
  const [theme, setTheme] = React.useState('dark');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  React.useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleViewWork = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-10">
      <LenisProvider>
        <MagneticCursor />
        <RippleEffect />
        <ScrollProgressBar />
        <MouseTrail />
        <ErrorBoundary>
          {mounted && <SolarBackground theme={theme} />}
        </ErrorBoundary>
        <main
          id="home"
          className={`relative z-10 min-h-screen transition-colors duration-500 ${
            theme === 'dark' ? 'bg-black/20' : 'bg-white/10'
          }`}
        >
          <SocialNav theme={theme} onToggleTheme={toggleTheme} />
          <div className="pt-20 sm:pt-24">
            <Hero onViewWork={handleViewWork} theme={theme} />
            
            <section id="skills" className="relative py-16 sm:py-24">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
                    Technical Skills
                  </h2>
                  <div className="h-[2px] w-[80px] bg-gradient-to-r from-[#D4AF37] to-transparent mt-4 rounded-full" />
                </div>
                <BentoSkills theme={theme} />
              </div>
            </section>

            {/* ── Education (between Skills and Projects) ── */}
            <Education theme={theme} />

            <section id="projects" className="relative py-16 sm:py-24">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                  <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent">
                    Selected Work
                  </h2>
                  <div className="h-[2px] w-[80px] bg-gradient-to-r from-[#D4AF37] to-transparent mt-4 rounded-full" />
                </div>
                <ProjectsGrid theme={theme} />
              </div>
            </section>

            <FinalSection theme={theme} />
          </div>
        </main>
      </LenisProvider>
    </div>
  );
}

export default App;
