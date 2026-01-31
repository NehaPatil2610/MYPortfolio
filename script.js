// Particle System
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    this.maxParticles = 50;
    
    this.resize();
    this.init();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  init() {
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach((particle, i) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Mouse interaction
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        particle.vx += dx * 0.0001;
        particle.vy += dy * 0.0001;
      }
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 210, 255, ${particle.opacity})`;
      this.ctx.fill();
      
      // Draw connections
      this.particles.slice(i + 1).forEach(p2 => {
        const dx = particle.x - p2.x;
        const dy = particle.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(0, 210, 255, ${0.1 * (1 - distance / 150)})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      });
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Spotlight Effect
function initSpotlight() {
  const spotlight = document.getElementById('spotlight');
  
  document.addEventListener('mousemove', (e) => {
    spotlight.style.setProperty('--x', e.clientX + 'px');
    spotlight.style.setProperty('--y', e.clientY + 'px');
  });
  
  // Hide spotlight on mobile
  if (window.innerWidth <= 768) {
    spotlight.style.opacity = '0';
  }
}

// Scroll Progress
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.transform = `scaleX(${scrolled / 100})`;
  });
}

// Scroll Reveal Animation
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealElements = () => {
    reveals.forEach((el) => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('active');
      }
    });
  };
  
  window.addEventListener('scroll', revealElements);
  revealElements(); // Initial check
}

// 3D Card Tilt Effect
function init3DCards() {
  const cards = document.querySelectorAll('.project-card-3d, .edu-item-3d, .profile-card-3d');
  
  cards.forEach(card => {
    if (window.innerWidth <= 768) return; // Disable on mobile
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.top-nav');
  
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        toggle.classList.remove('active');
        nav.classList.remove('active');
      }
    });
  }
}

// Console Terminal
function initConsole() {
  const term = document.getElementById('term');
  const output = document.getElementById('output');
  
  if (!term || !output) return;
  
  const commands = {
    hello: () => "> Hello! Nice to meet you. Type 'help' for commands.",
    help: () => "> Available commands: hello, about, contact, clear",
    about: () => "> I'm a Software Developer passionate about building amazing applications.",
    contact: () => {
      output.innerHTML = "> Opening mail client...";
      setTimeout(() => {
        window.location.href = 'mailto:nehapatil26102002@gmail.com';
      }, 1000);
      return "";
    },
    clear: () => {
      output.innerHTML = "";
      return "";
    }
  };
  
  term.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const input = term.value.trim().toLowerCase();
      term.value = '';
      
      if (input === 'contact' || input === 'email') {
        output.innerHTML = "> Initializing mail client...";
        setTimeout(() => {
          window.location.href = `mailto:nehapatil26102002@gmail.com?body=${encodeURIComponent(input)}`;
          output.innerHTML = "> Mail client opened.";
        }, 1000);
        return;
      }
      
      if (commands[input]) {
        const result = commands[input]();
        if (result) {
          output.innerHTML = result;
        }
      } else if (input) {
        output.innerHTML = `> Command not found: "${input}". Type 'help' for available commands.`;
      }
    }
  });
  
  // Focus input on console click
  const consoleElement = document.querySelector('.console-3d');
  if (consoleElement) {
    consoleElement.addEventListener('click', () => {
      term.focus();
    });
  }
}

// Smooth Scroll for Back to Top
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Parallax Effect for Sidebar
function initParallax() {
  if (window.innerWidth <= 1200) return; // Disable on mobile/tablet
  
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    sidebar.style.transform = `translateY(${rate}px)`;
  });
}

// Loading Screen
function initLoader() {
  const loader = document.getElementById('loader');
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.add('loaded');
    }, 1500);
  });
}

// Typing Animation
function initTypingAnimation() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;
  
  const text = 'Software Developer';
  let index = 0;
  
  function type() {
    if (index < text.length) {
      typingElement.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }
  
  // Start typing after loader
  setTimeout(() => {
    typingElement.textContent = '';
    type();
  }, 2000);
}

// Animated Counters
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    updateCounter();
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

// Animated Skill Rings (Orbital Design)
function initSkillBars() {
  const skillItems = document.querySelectorAll('.skill-orbital-item');
  
  const animateSkillRing = (item) => {
    const progress = item.getAttribute('data-level');
    const progressCircle = item.querySelector('.skill-ring-progress');
    
    if (progressCircle) {
      const circumference = 2 * Math.PI * 45; // radius = 45
      const offset = circumference - (circumference * progress / 100);
      
      progressCircle.style.setProperty('--progress', progress);
      progressCircle.style.strokeDashoffset = offset;
      item.classList.add('active');
    }
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillRing(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  skillItems.forEach(item => observer.observe(item));
  
  // Pause animation on hover for better interaction
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.animationPlayState = 'paused';
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.animationPlayState = 'running';
    });
  });
}

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  let isDark = true;
  
  themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    document.body.classList.toggle('light-theme');
    themeToggle.querySelector('span').textContent = isDark ? '🌙' : '☀️';
  });
}


// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize loader
  initLoader();
  
  // Initialize particle system
  const canvas = document.getElementById('particles');
  if (canvas) {
    new ParticleSystem(canvas);
  }
  
  // Initialize all features
  initSpotlight();
  initScrollProgress();
  initScrollReveal();
  init3DCards();
  initMobileMenu();
  initConsole();
  initSmoothScroll();
  initParallax();
  initTypingAnimation();
  initAnimatedCounters();
  initSkillBars();
  initThemeToggle();

  
  // Hide navigation on scroll down, show on scroll up
  let lastScroll = 0;
  const nav = document.querySelector('.top-nav');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      nav.classList.remove('hidden');
      return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      nav.classList.add('hidden');
    } else {
      nav.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
  });
  
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    // Reinitialize 3D cards on resize
    init3DCards();
    initParallax();
  }, 250);
});
