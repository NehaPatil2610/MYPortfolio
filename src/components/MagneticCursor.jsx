import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagneticCursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useMotionValue(0.5);
  const opacity = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.4 });
  const smoothY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.4 });
  const smoothScale = useSpring(scale, { stiffness: 260, damping: 26, mass: 0.4 });
  const smoothOpacity = useSpring(opacity, { stiffness: 260, damping: 30, mass: 0.4 });

  useEffect(() => {
    const handleMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      opacity.set(1);
    };

    const handleLeave = () => {
      opacity.set(0);
    };

    const handleEnterMagnetic = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      x.set(cx);
      y.set(cy);
      scale.set(1.6);
    };

    const handleLeaveMagnetic = () => {
      scale.set(0.9);
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseleave', handleLeave);

    const magneticTargets = document.querySelectorAll('.magnetic-target');
    magneticTargets.forEach((el) => {
      el.addEventListener('mouseenter', handleEnterMagnetic);
      el.addEventListener('mouseleave', handleLeaveMagnetic);
    });

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseleave', handleLeave);
      magneticTargets.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnterMagnetic);
        el.removeEventListener('mouseleave', handleLeaveMagnetic);
      });
    };
  }, [x, y, scale, opacity]);

  return (
    <motion.div
      className="pointer-events-none fixed z-50 hidden md:block"
      style={{
        translateX: smoothX,
        translateY: smoothY,
        scale: smoothScale,
        opacity: smoothOpacity,
      }}
    >
      <div className="relative -translate-x-1/2 -translate-y-1/2">
        <div className="h-8 w-8 rounded-full border border-cyan-300/70 bg-cyan-300/10 shadow-[0_0_25px_rgba(56,189,248,0.6)]" />
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl" />
      </div>
    </motion.div>
  );
};

export default MagneticCursor;

