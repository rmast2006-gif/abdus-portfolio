import React, { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

// ─────────────────────────────────────────────
// Props Type (FIXED)
// ─────────────────────────────────────────────
type Props = {
  imageUrl?: string;
};

// ─────────────────────────────────────────────
// HeroScene Component (3D IMAGE HOLDER)
// ─────────────────────────────────────────────
export const HeroScene = ({ imageUrl }: Props) => {

  // ─────────────────────────────────────────
  // Refs & Motion Values
  // ─────────────────────────────────────────
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // ─────────────────────────────────────────
  // Mouse Move Interaction (3D Tilt)
  // ─────────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const midX = rect.width / 2;
    const midY = rect.height / 2;

    rotateY.set((x - midX) / 15);
    rotateX.set(-(y - midY) / 15);
  };

  // ─────────────────────────────────────────
  // Reset Tilt
  // ─────────────────────────────────────────
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  // ─────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────
  return (
    <div className="w-full min-h-screen flex items-center justify-center overflow-hidden">

      {/* OUTER WRAPPER */}
      <div
        className="relative flex items-center justify-center"
        style={{
          perspective: "1200px",
        }}
      >

        {/* 🔥 PREMIUM MULTI-LAYER GREEN GLOW */}
        <div className="absolute w-[420px] h-[420px] bg-green-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute w-[300px] h-[300px] bg-emerald-400/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute w-[500px] h-[500px] bg-green-600/10 blur-[160px] rounded-full pointer-events-none" />

        {/* ───────── 3D ROTATING HOLDER ───────── */}
        <motion.div
          ref={cardRef}

          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}

          style={{
            rotateX,
            rotateY,
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}

          // Continuous rotation
          animate={{
            rotateY: [0, 360],
          }}

          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}

          className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-3xl overflow-hidden border border-green-500/20 shadow-2xl bg-slate-900/80 backdrop-blur-xl"
        >

          {/* 🔥 INNER PREMIUM OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-emerald-500/10 to-green-600/10 z-10 pointer-events-none" />

          {/* 🔥 EDGE LIGHT EFFECT */}
          <div className="absolute inset-0 rounded-3xl border border-green-400/20 pointer-events-none" />

          {/* 🔥 SOFT INNER SHADOW */}
          <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(34,197,94,0.15)] pointer-events-none" />

          {/* IMAGE CONTENT */}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Hero"
              className="w-full h-full object-cover"
              draggable={false}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-slate-500">
              Upload Image from Admin Panel
            </div>
          )}

          {/* 🔥 PREMIUM SHINE EFFECT */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-700 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

        </motion.div>

      </div>
    </div>
  );
};