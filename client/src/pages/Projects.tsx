import { useState } from "react";
import { LayoutGrid, Box } from "lucide-react";
import { SectionHeader } from "../components/ui/SectionHeader.tsx";
import { ProjectCard } from "../components/ui/ProjectCard.tsx";
import { ProjectsScene } from "../components/3d/ProjectsScene.tsx";
import { useProjects } from "../hooks/useProjects.ts";

export const Projects = () => {
  const { projects, loading } = useProjects();
  const [viewMode, setViewMode] = useState<"grid" | "3d">("grid");

  return (
    <section className="pt-32 pb-20 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        <SectionHeader title="Projects" subtitle="My work" />

        {/* 🔥 BUTTONS WITH TEXT */}
        <div className="flex gap-4 mb-10">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              viewMode === "grid"
                ? "bg-fuchsia-600 text-white"
                : "bg-white/10 text-white"
            }`}
          >
            <LayoutGrid size={16} />
            Grid View
          </button>

          <button
            onClick={() => setViewMode("3d")}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              viewMode === "3d"
                ? "bg-fuchsia-600 text-white"
                : "bg-white/10 text-white"
            }`}
          >
            <Box size={16} />
            3D View
          </button>
        </div>

        {loading ? (
          <p className="text-white">Loading...</p>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-3 gap-6">
            {projects.map((p: any) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </div>
        ) : (
          <ProjectsScene projects={projects} />
        )}
      </div>
    </section>
  );
};