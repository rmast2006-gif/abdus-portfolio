import { motion } from "motion/react";
import { useMousePosition } from "../../hooks/useMousePosition.ts";

export const Cursor = () => {
  const { x, y } = useMousePosition();

  return (
    <>
      {/* 🔥 OUTER RING */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-green-500/60 pointer-events-none z-[9999] hidden md:block backdrop-blur-sm"
        animate={{ x: x - 20, y: y - 20 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 180,
          mass: 0.6,
        }}
      />

      {/* 🔥 INNER CORE DOT */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-green-400 pointer-events-none z-[9999] hidden md:block shadow-[0_0_12px_rgba(34,197,94,0.9)]"
        animate={{ x: x - 5, y: y - 5 }}
        transition={{
          type: "spring",
          damping: 18,
          stiffness: 320,
          mass: 0.25,
        }}
      />

      {/* 🔥 SOFT GLOW AURA */}
      <motion.div
        className="fixed top-0 left-0 w-20 h-20 rounded-full bg-green-500/10 pointer-events-none z-[9998] hidden md:block blur-2xl"
        animate={{ x: x - 40, y: y - 40 }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 120,
          mass: 1,
        }}
      />

      {/* 🔥 TRAIL FOLLOW (SMOOTH LAGGING EFFECT) */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-green-400/20 pointer-events-none z-[9997] hidden md:block"
        animate={{ x: x - 12, y: y - 12 }}
        transition={{
          type: "spring",
          damping: 50,
          stiffness: 90,
          mass: 1.2,
        }}
      />

      {/* 🔥 EXTRA MICRO DOT (PRECISION POINTER) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[9999] hidden md:block opacity-70"
        animate={{ x: x - 3, y: y - 3 }}
        transition={{
          type: "spring",
          damping: 15,
          stiffness: 400,
          mass: 0.15,
        }}
      />
    </>
  );
};