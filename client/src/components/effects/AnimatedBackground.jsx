import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PARTICLE_COUNT = 22;

const AnimatedBackground = () => {
  const reduce = useReducedMotion();

  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 8,
        drift: Math.random() * 40 - 20,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      {/* Animated gradient mesh */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 10%, rgba(79,140,255,0.18), transparent 60%), radial-gradient(55% 45% at 85% 15%, rgba(123,97,255,0.16), transparent 60%), radial-gradient(50% 50% at 50% 100%, rgba(0,212,255,0.12), transparent 60%)",
        }}
      />

      {/* Floating blurred blobs */}
      {!reduce && (
        <>
          <motion.div
            className="absolute -left-32 top-10 h-[28rem] w-[28rem] rounded-full bg-accent/20 blur-[120px]"
            animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[-10rem] top-1/3 h-[26rem] w-[26rem] rounded-full bg-accent-secondary/20 blur-[130px]"
            animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-8rem] left-1/3 h-[22rem] w-[22rem] rounded-full bg-accent-highlight/10 blur-[120px]"
            animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Animated grid */}
      <div
        className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_55%,transparent_100%)]"
        style={{ backgroundSize: "56px 56px" }}
      />

      {/* Tiny moving particles */}
      {!reduce &&
        particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-white/40"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{ y: [0, -90], x: [0, p.drift], opacity: [0, 0.8, 0] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-[0.035] mix-blend-soft-light" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />
    </div>
  );
};

export default AnimatedBackground;
