import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { GoldenDust, AtmosphericMist, SunWithGodRays } from './SolarEnvironment';

/* ═══════════════════════════════════════════════════════
   CSS VOLUMETRIC SUN — Pure DOM, no sphere-edge artifacts.
   Desktop: bottom-right, massive (45vw).
   Mobile: bottom-center.
   Multi-layer radial gradient with NO sharp rings:
   bright white-gold center → champagne haze → fully transparent.
   ═══════════════════════════════════════════════════════ */
function CssSun({ theme }) {
  const isDark = theme === 'dark';

  return (
    <>
      {/* Primary sun glow — large, soft, hazy */}
      <div
        aria-hidden="true"
        className="css-sun-primary"
        style={{
          position: 'fixed',
          bottom: '-12%',
          right: '-8%',
          width: 'clamp(380px, 45vw, 680px)',
          height: 'clamp(380px, 45vw, 680px)',
          borderRadius: '50%',
          background: isDark
            ? `radial-gradient(circle at center,
                rgba(255,245,204,0.95) 0%,
                rgba(255,220,80,0.7)  12%,
                rgba(255,180,40,0.45) 25%,
                rgba(255,150,20,0.22) 40%,
                rgba(212,140,0,0.10)  55%,
                rgba(180,100,0,0.04)  70%,
                transparent 88%)`
            : `radial-gradient(circle at center,
                rgba(255,255,255,0.98) 0%,
                rgba(255,250,220,0.80) 10%,
                rgba(255,230,100,0.50) 22%,
                rgba(255,210,60,0.28)  38%,
                rgba(255,190,30,0.12)  55%,
                rgba(255,170,0,0.04)   72%,
                transparent 90%)`,
          filter: isDark
            ? 'blur(8px)'
            : 'blur(12px)',
          transition: 'background 0.8s ease, filter 0.8s ease',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      {/* Secondary atmospheric haze — much larger, very faint */}
      <div
        aria-hidden="true"
        className="css-sun-haze"
        style={{
          position: 'fixed',
          bottom: '-25%',
          right: '-20%',
          width: 'clamp(500px, 65vw, 950px)',
          height: 'clamp(500px, 65vw, 950px)',
          borderRadius: '50%',
          background: isDark
            ? `radial-gradient(circle at center,
                rgba(255,180,40,0.15)  0%,
                rgba(212,175,55,0.08)  30%,
                rgba(180,120,20,0.03)  55%,
                transparent 80%)`
            : `radial-gradient(circle at center,
                rgba(255,220,60,0.18)  0%,
                rgba(255,200,40,0.08)  35%,
                rgba(255,180,20,0.02)  60%,
                transparent 82%)`,
          filter: 'blur(40px)',
          transition: 'background 0.8s ease',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </>
  );
}

function SolarScene({ theme }) {
  return (
    <>
      <ambientLight intensity={0.04} />
      <pointLight position={[5, -5, 0]} intensity={0.3} color="#D4AF37" distance={30} />
      {/* Atmospheric mist — gives light something to "hit" */}
      <AtmosphericMist theme={theme} />
      {/* Real Sun Mesh with Postprocessing GodRays and Bloom */}
      <SunWithGodRays theme={theme} />
      {/* Floating golden dust */}
      <GoldenDust theme={theme} />
    </>
  );
}

export default function SolarBackground({ theme }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      {/* CSS sun — perfectly smooth, no artifacts */}
      <CssSun theme={theme} />

      {/* Three.js canvas — rays, bloom, fog, particles */}
      {ready ? (
        <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        style={{ position: 'fixed', zIndex: -1, top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.4;
        }}
      >
        <Suspense fallback={null}>
          <SolarScene theme={theme} />
        </Suspense>
      </Canvas>
      ) : null}
    </div>
  );
}
