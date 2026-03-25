import { motion } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "../../types.ts";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, scale: 1.01 }}
      transition={{ duration: 0.4 }}

      /* 🔥 PREMIUM GLASS CARD (UPGRADED) */
      className="group relative bg-slate-900/60 backdrop-blur-2xl border border-green-500/10 rounded-3xl overflow-hidden cursor-pointer shadow-2xl shadow-green-500/5 hover:shadow-green-500/25 hover:border-green-500/30 transition-all duration-500"

      onClick={onClick}
    >

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute -inset-10 opacity-0 group-hover:opacity-100 transition duration-700">
        <div className="w-full h-full bg-green-500/10 blur-[80px]" />
      </div>

      <div className="relative h-56 overflow-hidden">

        {/* IMAGE */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />

        {/* 🔥 PREMIUM MULTI-LAYER OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#021a12] via-[#021a12]/70 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-400/10 opacity-60" />

        {/* 🔥 TOP EDGE LIGHT */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-green-400/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

        {/* ICON BUTTONS */}
        <div className="absolute top-4 right-4 flex gap-2">

          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-900/80 backdrop-blur-md rounded-full text-white hover:bg-green-500/80 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-110"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={18} />
          </a>

          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-slate-900/80 backdrop-blur-md rounded-full text-white hover:bg-green-500/80 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 hover:scale-110"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={18} />
          </a>

        </div>

        {/* 🔥 SHINE EFFECT */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

      </div>

      <div className="p-6 relative z-10">

        {/* TITLE */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
          {project.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-slate-400 text-sm line-clamp-2 mb-4">
          {project.description}
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}

              /* 🔥 PREMIUM TAG STYLE */
              className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-mono rounded-full border border-green-500/20 hover:bg-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>

      {/* 🔥 BOTTOM GLOW LINE */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-green-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* 🔥 INNER BORDER GLOW */}
      <div className="absolute inset-0 rounded-3xl border border-green-400/0 group-hover:border-green-400/20 transition duration-500 pointer-events-none" />

    </motion.div>
  );
};