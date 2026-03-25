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
          perspective: "1200px", // ✅ FIX: required for proper 3D rendering
        }}
      >

        {/* GLOW BACKGROUND */}
        <div className="absolute w-[420px] h-[420px] bg-fuchsia-600/20 blur-[120px] rounded-full pointer-events-none" />

        {/* ───────── 3D ROTATING HOLDER ───────── */}
        <motion.div
          ref={cardRef}

          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}

          style={{
            rotateX,
            rotateY,
            transformPerspective: 1200,
            transformStyle: "preserve-3d", // ✅ FIX: stabilize 3D transforms
            willChange: "transform", // ✅ FIX: smooth rendering on Vercel
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

          className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900"
        >

          {/* INNER LIGHT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-purple-500/10 z-10 pointer-events-none" />

          {/* IMAGE CONTENT */}
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Hero"
              className="w-full h-full object-cover"
              draggable={false} // ✅ FIX: prevents weird drag flicker
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-slate-500">
              Upload Image from Admin Panel
            </div>
          )}

        </motion.div>

      </div>
    </div>
  );
};