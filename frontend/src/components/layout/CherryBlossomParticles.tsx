"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rotation: number;
  opacity: number;
}

export function CherryBlossomParticles({ count = 15 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated: Petal[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 10 + 8,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 12,
      drift: (Math.random() - 0.5) * 200,
      rotation: Math.random() * 720 - 360,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setPetals(generated);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-0 select-none"
          style={{
            left: `${petal.x}%`,
            fontSize: petal.size,
            opacity: petal.opacity,
          }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, petal.drift],
            rotate: [0, petal.rotation],
            opacity: [0, petal.opacity, petal.opacity, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
}

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 400,
          height: 400,
          top: "-100px",
          right: "-100px",
          background: "radial-gradient(circle, rgba(212,112,138,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 300,
          height: 300,
          bottom: "100px",
          left: "-50px",
          background: "radial-gradient(circle, rgba(139,127,199,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [1, 0.6, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full blur-3xl"
        style={{
          width: 250,
          height: 250,
          bottom: "30%",
          right: "20%",
          background: "radial-gradient(circle, rgba(107,191,135,0.06) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.3, 1], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
