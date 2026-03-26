import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Github } from "lucide-react";
import { Project } from "../../types.ts";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-slate-800/80 backdrop-blur-md rounded-full text-white hover:bg-fuchsia-500 transition-colors z-10"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col md:flex-row">
            
            {/* ✅ FIXED IMAGE */}
            <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
              <img
                src={
                  project.image?.startsWith("http")
                    ? project.image
                    : `https://abdus-portfolio-production.up.railway.app${project.image}`
                }
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e: any) => {
                  e.target.src = "https://picsum.photos/seed/error/400/400";
                }}
              />
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {project.title}
              </h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-fuchsia-500/10 text-fuchsia-400 text-xs font-mono rounded-full border border-fuchsia-500/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="flex gap-4">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 transition-colors font-medium border border-white/5"
                >
                  <Github size={20} />
                  GitHub Code
                </a>
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white rounded-full hover:from-fuchsia-500 hover:to-purple-500 transition-all font-medium shadow-lg shadow-fuchsia-500/20"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </a>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};