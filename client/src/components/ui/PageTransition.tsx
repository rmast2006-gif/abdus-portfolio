import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <div className="w-full relative overflow-hidden">

      {/* 🔥 DIAGONAL DARK CURTAIN (TOP) */}
      <motion.div
        className="fixed inset-0 bg-[#021a12] z-[9999] pointer-events-none"
        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 60%)" }}
        animate={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
        exit={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 60%)" }}
        transition={{
          duration: 0.9,
          ease: [0.76, 0, 0.24, 1],
        }}
      />

      {/* 🔥 DIAGONAL GREEN CURTAIN (BOTTOM) */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-tr from-green-600 via-emerald-500 to-green-400 z-[9998] pointer-events-none"
        initial={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }}
        animate={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
        exit={{ clipPath: "polygon(0 60%, 100% 0, 100% 100%, 0 100%)" }}
        transition={{
          duration: 0.9,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.08,
        }}
      />

      {/* 🔥 SOFT GLOW LAYER */}
      <motion.div
        className="fixed inset-0 bg-green-500/20 backdrop-blur-2xl z-[9997] pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        exit={{ opacity: 1 }}
        transition={{
          duration: 1,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.12,
        }}
      />

      {/* 🔥 TOP LIGHT SWEEP EFFECT */}
      <motion.div
        className="fixed inset-0 z-[9996] pointer-events-none bg-gradient-to-b from-white/10 via-transparent to-transparent"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: 0.2,
        }}
      />

      {/* 🔥 PAGE CONTENT */}
      <motion.div
        initial={{
          opacity: 0,
          y: -120,
          scale: 0.98,
          filter: "blur(10px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          y: 120,
          scale: 0.98,
          filter: "blur(10px)",
        }}
        transition={{
          duration: 0.9,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.25,
        }}
        className="w-full will-change-transform"
      >
        {children}
      </motion.div>

      {/* 🔥 BOTTOM SHADOW */}
      <motion.div
        className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-[9995]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      />

    </div>
  );
};