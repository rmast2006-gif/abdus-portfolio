import { useState } from "react";
import { LayoutGrid, Box } from "lucide-react";
import { SectionHeader } from "../components/ui/SectionHeader.tsx";
import { ProjectCard } from "../components/ui/ProjectCard.tsx";
import ProjectsScene from "../components/3d/ProjectsScene";
import { useProjects } from "../hooks/useProjects.ts";

export const Projects = () => {
  const { projects, loading } = useProjects();
  const [viewMode, setViewMode] = useState<"grid" | "3d">("grid");

  // ✅ CLICK HANDLER
  const handleProjectClick = (project: any) => {
    if (project.liveLink) {
      window.open(project.liveLink, "_blank");
    } else if (project.githubLink) {
      window.open(project.githubLink, "_blank");
    }
  };

  return (
    <section className="pt-32 pb-20 bg-[#021a12] min-h-screen relative overflow-hidden">

      {/* ✅ GREEN BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-green-600/20 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <SectionHeader title="Projects" subtitle="My work" />

        {/* 🔥 VIEW TOGGLE BUTTONS */}
        <div className="flex gap-4 mb-10">

          {/* GRID BUTTON */}
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold ${
              viewMode === "grid"
                ? "btn-green glow-green text-white"
                : "bg-white/5 text-slate-300 hover:bg-green-500/10 border border-green-500/10"
            }`}
          >
            <LayoutGrid size={16} className={viewMode === "grid" ? "text-white" : "text-green-400"} />
            Grid View
          </button>

          {/* 3D BUTTON */}
          <button
            onClick={() => setViewMode("3d")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 font-semibold ${
              viewMode === "3d"
                ? "btn-green glow-green text-white"
                : "bg-white/5 text-slate-300 hover:bg-green-500/10 border border-green-500/10"
            }`}
          >
            <Box size={16} className={viewMode === "3d" ? "text-white" : "text-green-400"} />
            3D View
          </button>

        </div>

        {loading ? (
          <p className="text-green-400 animate-pulse">Loading...</p>
        ) : (
          <>
            {/* ✅ GRID VIEW */}
            <div className={viewMode === "grid" ? "block" : "hidden"}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {projects.map((p: any) => (
                  <div
                    key={p._id}
                    className="transition-all duration-300 hover:scale-[1.02]"
                  >
                    <ProjectCard
                      project={p}
                      onClick={() => handleProjectClick(p)}
                    />
                  </div>
                ))}

              </div>
            </div>

            {/* ✅ 3D VIEW (PRELOADED — NO DELAY) */}
            <div className={viewMode === "3d" ? "block" : "hidden"}>
              <div className="rounded-3xl border border-green-500/10 bg-[#021a12]/60 backdrop-blur-xl p-4 shadow-lg shadow-green-500/10">
                <ProjectsScene projects={projects} />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};