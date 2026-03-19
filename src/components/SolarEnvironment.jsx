import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, GodRays, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

/* ═══════════════════════════════════════════════════════
   GOD RAYS — Custom fullscreen shader, GPU-safe
   Soft, champagne-gold beams that stretch across the screen.
   Dark  mode → more visible (opacity 0.28)
   Light mode → subtle       (opacity 0.10)
   ═══════════════════════════════════════════════════════ */
export function GodRaysShader({ theme }) {
  const meshRef = useRef();
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  const sunPos = useMemo(() => {
    return isMobile
      ? [0, -viewport.height / 2, -3.5]
      : [viewport.width / 2, -viewport.height / 2, -3.5];
  }, [viewport.width, viewport.height, isMobile]);

  const u = useRef({
    uTime:    { value: 0 },
    uColor:   { value: new THREE.Color(theme === 'dark' ? '#D4AF37' : '#FFF5CC') },
    uOpacity: { value: theme === 'dark' ? 0.28 : 0.10 },
    uDensity: { value: 0.96 },
    uWeight:  { value: 0.45 },
  });

  useEffect(() => {
    u.current.uColor.value.set(theme === 'dark' ? '#D4AF37' : '#FFF5CC');
    u.current.uOpacity.value = theme === 'dark' ? 0.28 : 0.10;
  }, [theme]);

  useFrame((state) => {
    u.current.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} position={sunPos}>
      <planeGeometry args={[viewport.width * 4, viewport.height * 4]} />
      <shaderMaterial
        uniforms={u.current}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3  uColor;
          uniform float uOpacity;
          uniform float uDensity;
          uniform float uWeight;
          varying vec2 vUv;

          void main() {
            vec2  c    = vec2(0.5);
            float dist = length(vUv - c) * 2.0;
            float ang  = atan(vUv.y - c.y, vUv.x - c.x);

            /* 6-layer ray pattern — complex, organic light field */
            float r1 = sin(ang *  5.0 + uTime * 0.18) * 0.5 + 0.5;
            float r2 = sin(ang *  9.0 - uTime * 0.12) * 0.5 + 0.5;
            float r3 = sin(ang * 14.0 + uTime * 0.08) * 0.5 + 0.5;
            float r4 = sin(ang * 19.0 - uTime * 0.06) * 0.5 + 0.5;
            float r5 = sin(ang * 23.0 + uTime * 0.04) * 0.5 + 0.5;
            float r6 = sin(ang *  3.0 - uTime * 0.10) * 0.5 + 0.5;
            float rays = r1*0.25 + r2*0.22 + r3*0.18 + r4*0.15 + r5*0.10 + r6*0.10;
            rays = pow(rays, 0.65);  /* softer, more diffuse */

            /* Very gentle radial falloff — rays stretch far */
            float falloff = 1.0 - smoothstep(0.0, uDensity, dist);
            falloff = pow(falloff, 0.9);  /* gentler = longer rays */

            /* Low-power streaks for soft beams */
            float streaks = pow(rays, 1.4) * falloff;

            /* Wide, soft halo */
            float halo = exp(-dist * 0.9) * 0.4;

            float alpha = (streaks * uWeight + halo) * uOpacity;

            gl_FragColor = vec4(uColor, alpha);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════
   BLOOM GLOW — Intense (2.0) multi-ring soft bloom
   Makes the sun "bleed" light into UI elements.
   ═══════════════════════════════════════════════════════ */
export function BloomGlow({ theme }) {
  const meshRef = useRef();
  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  const pos = useMemo(() => {
    return isMobile
      ? [0, -viewport.height / 2, -3.8]
      : [viewport.width / 2, -viewport.height / 2, -3.8];
  }, [viewport.width, viewport.height, isMobile]);

  const u = useRef({
    uTime:      { value: 0 },
    uColor:     { value: new THREE.Color(theme === 'dark' ? '#FFA030' : '#FFD700') },
    uIntensity: { value: theme === 'dark' ? 0.50 : 0.70 }, /* Bloom 2.0 equivalent */
  });

  useEffect(() => {
    u.current.uColor.value.set(theme === 'dark' ? '#FFA030' : '#FFD700');
    u.current.uIntensity.value = theme === 'dark' ? 0.50 : 0.70;
  }, [theme]);

  useFrame((state) => {
    u.current.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} position={pos}>
      <planeGeometry args={[viewport.width * 3, viewport.height * 3]} />
      <shaderMaterial
        uniforms={u.current}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3  uColor;
          uniform float uIntensity;
          varying vec2 vUv;
          void main() {
            float d = length(vUv - 0.5) * 2.0;
            /* 4-ring bloom for more aggressive light bleed */
            float b1 = exp(-d * 1.2);        /* very wide */
            float b2 = exp(-d * 2.8) * 0.6;
            float b3 = exp(-d * 5.5) * 0.4;
            float b4 = exp(-d * 10.0) * 0.25;
            float b = (b1 + b2 + b3 + b4) * uIntensity;
            b *= 1.0 + sin(uTime * 0.4) * 0.06;
            gl_FragColor = vec4(uColor * b, b * 0.7);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════
   ATMOSPHERIC MIST — Subtle fog/haze effect
   Gives the light something to "hit" for realism.
   Rendered as a large fullscreen quad with noise-based
   density variation.
   ═══════════════════════════════════════════════════════ */
export function AtmosphericMist({ theme }) {
  const meshRef = useRef();
  const { viewport } = useThree();

  const u = useRef({
    uTime:    { value: 0 },
    uColor:   { value: new THREE.Color(theme === 'dark' ? '#D4AF37' : '#FFF5CC') },
    uOpacity: { value: theme === 'dark' ? 0.04 : 0.025 },
  });

  useEffect(() => {
    u.current.uColor.value.set(theme === 'dark' ? '#D4AF37' : '#FFF5CC');
    u.current.uOpacity.value = theme === 'dark' ? 0.04 : 0.025;
  }, [theme]);

  useFrame((state) => {
    u.current.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -4]}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
      <shaderMaterial
        uniforms={u.current}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3  uColor;
          uniform float uOpacity;
          varying vec2 vUv;

          /* Simple noise function for organic mist */
          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
          }
          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);
            float a = hash(i);
            float b = hash(i + vec2(1,0));
            float c = hash(i + vec2(0,1));
            float d = hash(i + vec2(1,1));
            return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
          }

          void main() {
            /* Flowing noise for organic mist movement */
            float n1 = noise(vUv * 3.0 + uTime * 0.08);
            float n2 = noise(vUv * 6.0 - uTime * 0.05);
            float mist = (n1 * 0.6 + n2 * 0.4);

            /* Stronger near the bottom-right (where sun is) */
            float sunInfluence = 1.0 - length(vUv - vec2(0.9, 0.1));
            sunInfluence = max(sunInfluence, 0.0);
            sunInfluence = pow(sunInfluence, 0.8);

            float alpha = mist * uOpacity * (0.3 + sunInfluence * 0.7);

            gl_FragColor = vec4(uColor, alpha);
          }
        `}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/* ═══════════════════════════════════════════════════════
   GOLDEN DUST PARTICLES
   ═══════════════════════════════════════════════════════ */
export function GoldenDust({ theme }) {
  const ref   = useRef();
  const count = 250;

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i*3]   = (Math.random() - 0.5) * 25;
      p[i*3+1] = (Math.random() - 0.5) * 18;
      p[i*3+2] = (Math.random() - 0.5) * 12;
    }
    return p;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.008;
    ref.current.rotation.x = t * 0.004;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={theme === 'light' ? '#DAA520' : '#F1E5AC'}
        size={0.03}
        transparent
        opacity={theme === 'light' ? 0.3 : 0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════
   SUN WITH GOD RAYS (postprocessing)
   Implements a null check to avoid crashes on slow load
   ═══════════════════════════════════════════════════════ */
export function SunWithGodRays({ theme }) {
  const sunRef = useRef(null);
  const [ready, setReady] = useState(false);
  
  useEffect(() => {
    // Ensure we trigger a re-render after the mesh ref is attached
    setReady(true);
  }, []);

  const { viewport } = useThree();
  const isMobile = viewport.width < 6;

  const sunPos = useMemo(() => {
    return isMobile
      ? [0, -viewport.height / 2, -3.5]
      : [viewport.width / 2, -viewport.height / 2, -3.5];
  }, [viewport.width, viewport.height, isMobile]);

  return (
    <>
      <mesh
        ref={sunRef}
        position={sunPos}
      >
        <sphereGeometry args={[1, 32, 32]} />
        {/* Make the sphere material basically invisible so it doesn't show a hard edge, 
            but GodRays still use it to occlude and generate rays */}
        <meshBasicMaterial color={theme === 'dark' ? '#D4AF37' : '#FFD700'} transparent opacity={0.01} />
      </mesh>

      {sunRef.current && (
        <EffectComposer disableNormalPass>
          <GodRays
            sun={sunRef.current}
            blendFunction={BlendFunction.SCREEN}
            samples={60}
            density={0.96}
            decay={0.9}
            weight={0.4}
            exposure={0.6}
            clampMax={1}
            width={isMobile ? 360 : 720}
            height={isMobile ? 360 : 720}
            kernelSize={5}
            blur={true}
          />
          <Bloom
            blendFunction={BlendFunction.ADD}
            intensity={theme === 'dark' ? 1.5 : 2.5}
            width={isMobile ? 360 : 720}
            height={isMobile ? 360 : 720}
            kernelSize={5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      )}
    </>
  );
}
