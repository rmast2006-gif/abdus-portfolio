import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Save, Loader2, Plus, Trash2, ExternalLink, Github, Star, Edit2, X } from "lucide-react";
import { apiGetProjects, apiUpdateProject, apiDeleteProject, apiCreateProject } from "../../utils/api.ts";
import { useAdminAuth } from "../../hooks/useAdminAuth.ts";
import ImageUpload from "../../components/admin/ImageUpload.tsx";

const EditProjects = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAdminAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ FIX 1: Centralized fetch function
  const fetchProjects = async () => {
    try {
      const response = await apiGetProjects();
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // ✅ FIX 2: Clean useEffect
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    const loadData = async () => {
      await fetchProjects();
      setLoading(false);
    };

    loadData();
  }, [isAuthenticated, navigate]);

  const handleOpenModal = (project: any = null) => {
    if (project) {
      setEditingProject({ ...project });
    } else {
      setEditingProject({
        title: "",
        description: "",
        image: "",
        githubLink: "",
        liveLink: "",
        tags: "",
        featured: false,
        order: projects.length,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  // ✅ FIX 3: Refetch after update
  const handleSaveProject = async () => {
    setSaving(true);
    try {
      if (editingProject._id) {
        await apiUpdateProject(editingProject._id, editingProject);

        // ✅ IMPORTANT FIX
        await fetchProjects();

      } else {
        const response = await apiCreateProject(editingProject);
        setProjects(prev => [...prev, response.data]);
      }

      handleCloseModal();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await apiDeleteProject(id);

      // optional but better
      await fetchProjects();

      alert("Project deleted successfully.");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="text-fuchsia-500 animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/dashboard"
              className="p-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-4xl font-bold text-white">Manage Projects</h1>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl text-white font-bold hover:opacity-90 transition-opacity"
          >
            <Plus size={18} />
            Add New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              layout
              key={project._id}
              className="glass rounded-2xl border border-white/10 overflow-hidden flex flex-col"
            >
              <div className="aspect-video relative overflow-hidden bg-white/5">
                
                {/* ✅ FIX 4: IMAGE CACHE FIX */}
                <img
                  src={`${project.image || "https://picsum.photos/seed/project/800/450"}?t=${Date.now()}`}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />

                {project.featured && (
                  <div className="absolute top-4 right-4 p-2 bg-fuchsia-600 rounded-lg text-white shadow-lg">
                    <Star size={16} fill="white" />
                  </div>
                )}
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-3 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {(typeof project.tags === 'string' ? project.tags.split(',') : project.tags).map((tag: string, i: number) => (
                    <span key={i} className="text-[10px] uppercase tracking-wider font-bold text-fuchsia-400 bg-fuchsia-400/10 px-2 py-1 rounded-md">
                      {tag.trim()}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-fuchsia-400"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project._id)}
                      className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex gap-3">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer">
                        <Github size={18} />
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noreferrer">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal (UNCHANGED) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            {/* Modal content same as your original */}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditProjects;