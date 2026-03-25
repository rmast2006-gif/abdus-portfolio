import { motion } from "motion/react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export const SectionHeader = ({ title, subtitle, align = "left" }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {/* ✅ FIX: prevent text cursor */}
      <h2
        className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight select-none cursor-default"
        style={{ userSelect: "none" }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="text-lg text-slate-400 max-w-2xl mx-auto md:mx-0 select-none cursor-default"
          style={{ userSelect: "none" }}
        >
          {subtitle}
        </p>
      )}

      <div
        className={`h-1.5 w-24 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 rounded-full mt-6 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
    </motion.div>
  );
};