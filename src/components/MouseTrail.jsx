import React, { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════
   LIQUID GOLD MOUSE TRAIL
   Golden comet (#D4AF37) with 0.15s lag, tapered tail.
   Velocity-aware: fades when the mouse stops moving.
   blur-3xl feel via multi-layer radial gradients.
   ═══════════════════════════════════════════════════════ */

const TRAIL  = 32;
const GOLD   = { r: 212, g: 175, b: 55  }; // #D4AF37
const CHAMP  = { r: 255, g: 245, b: 204 }; // #FFF5CC (champagne)
const LAG    = 0.15;

export default function MouseTrail() {
  const canvasRef  = useRef(null);
  const mouse      = useRef({ x: -300, y: -300 });
  const prevMouse  = useRef({ x: -300, y: -300 });
  const trail      = useRef(Array.from({ length: TRAIL }, () => ({ x: -300, y: -300 })));
  const raf        = useRef(null);
  const velocity   = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      prevMouse.current = { ...mouse.current };
      mouse.current     = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    let last = performance.now();

    const draw = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* ── Physics ── */
      const dx = mouse.current.x - prevMouse.current.x;
      const dy = mouse.current.y - prevMouse.current.y;
      const spd = Math.sqrt(dx*dx + dy*dy);
      velocity.current += (spd - velocity.current) * 0.15;
      const vel = Math.min(velocity.current, 60);

      /* Head point follows mouse with LAG */
      const lag = 1 - Math.pow(LAG, dt * 60);
      trail.current[0].x += (mouse.current.x - trail.current[0].x) * lag;
      trail.current[0].y += (mouse.current.y - trail.current[0].y) * lag;

      /* Each subsequent point chases the one ahead */
      for (let i = 1; i < TRAIL; i++) {
        const ease = Math.max(0.32 - i * 0.008, 0.04);
        trail.current[i].x += (trail.current[i-1].x - trail.current[i].x) * ease;
        trail.current[i].y += (trail.current[i-1].y - trail.current[i].y) * ease;
      }

      const fade = Math.min(vel / 4, 1); // 0→still, 1→moving fast
      if (fade < 0.01) { raf.current = requestAnimationFrame(draw); return; }

      /* ── Draw trail — back to front ── */
      for (let i = TRAIL - 1; i >= 0; i--) {
        const prog  = 1 - i / TRAIL;          // 1 at head, 0 at tail
        const taper = Math.pow(prog, 1.7);
        const r     = (13 * taper + 1) * (0.3 + fade * 0.7);
        const alpha = taper * 0.6 * fade;
        if (alpha < 0.004) continue;

        const pt = trail.current[i];

        /* outer glow — wide, blurry (blur-3xl feel) */
        const gr = r * 3.5;
        const grd = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, gr);
        grd.addColorStop(0,   `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha*0.55})`);
        grd.addColorStop(0.25,`rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha*0.28})`);
        grd.addColorStop(0.6, `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha*0.08})`);
        grd.addColorStop(1,   `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0)`);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, gr, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        /* bright champagne core (visible on front half of trail) */
        if (prog > 0.18) {
          const cr  = r * 0.9;
          const crd = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, cr);
          crd.addColorStop(0,   `rgba(${CHAMP.r},${CHAMP.g},${CHAMP.b},${alpha*0.95})`);
          crd.addColorStop(0.45,`rgba(${GOLD.r},${GOLD.g},${GOLD.b},${alpha*0.45})`);
          crd.addColorStop(1,   `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0)`);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, cr, 0, Math.PI * 2);
          ctx.fillStyle = crd;
          ctx.fill();
        }
      }

      /* ── Comet head flare ── */
      if (fade > 0.08) {
        const h = trail.current[0];
        const hg = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, 22);
        hg.addColorStop(0,    `rgba(255,255,248,${fade*0.7})`);
        hg.addColorStop(0.18, `rgba(${CHAMP.r},${CHAMP.g},${CHAMP.b},${fade*0.45})`);
        hg.addColorStop(0.5,  `rgba(${GOLD.r},${GOLD.g},${GOLD.b},${fade*0.18})`);
        hg.addColorStop(1,    `rgba(${GOLD.r},${GOLD.g},${GOLD.b},0)`);
        ctx.beginPath();
        ctx.arc(h.x, h.y, 22, 0, Math.PI * 2);
        ctx.fillStyle = hg;
        ctx.fill();
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  );
}
