import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Trash2,
  ExternalLink,
  Github,
  Star,
  Edit2,
  X,
} from "lucide-react";
import {
  apiGetProjects,
  apiUpdateProject,
  apiDeleteProject,
  apiCreateProject,
} from "../../utils/api.ts";
import { useAdminAuth } from "../../hooks/useAdminAuth.ts";

const EditProjects = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAdminAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await apiGetProjects();
      setProjects(res.data || []);
    } catch (err) {
      console.error("❌ Fetch error:", err);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    const load = async () => {
      await fetchProjects();
      setLoading(false);
    };

    load();
  }, [isAuthenticated, navigate]);

  // ✅ OPEN MODAL
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
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  // ✅ SAVE PROJECT (FIXED)
  const handleSaveProject = async () => {
    console.log("🔥 SAVE CLICKED", editingProject);

    setSaving(true);
    try {
      const payload = {
        ...editingProject,
        tags:
          typeof editingProject.tags === "string"
            ? editingProject.tags.split(",").map((t: string) => t.trim())
            : editingProject.tags || [],
      };

      if (editingProject._id) {
        await apiUpdateProject(editingProject._id, payload);
        await fetchProjects();
      } else {
        const res = await apiCreateProject(payload);
        setProjects((prev) => [res.data, ...prev]);
      }

      handleCloseModal();
    } catch (err) {
      console.error("❌ Save error:", err);
      alert("Failed to save project");
    } finally {
      setSaving(false);
    }
  };

  // ✅ DELETE
  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await apiDeleteProject(id);
      await fetchProjects();
    } catch (err) {
      console.error("❌ Delete error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="animate-spin text-fuchsia-500" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <ArrowLeft />
            </Link>
            <h1 className="text-3xl text-white font-bold">
              Manage Projects
            </h1>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="bg-fuchsia-600 px-6 py-2 rounded text-white flex gap-2"
          >
            <Plus size={18} />
            Add Project
          </button>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div key={p._id} className="bg-white/5 p-4 rounded-xl">
              <img
                src={p.image || "https://picsum.photos/300"}
                className="rounded mb-4"
              />
              <h3 className="text-white font-bold">{p.title}</h3>

              <div className="flex justify-between mt-4">
                <button onClick={() => handleOpenModal(p)}>
                  <Edit2 />
                </button>
                <button onClick={() => handleDeleteProject(p._id)}>
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
            <motion.div className="bg-slate-900 p-6 rounded-xl w-full max-w-lg">
              
              <h2 className="text-white text-xl mb-4">
                {editingProject?._id ? "Edit Project" : "Add Project"}
              </h2>

              {/* INPUTS */}
              <input
                placeholder="Title"
                value={editingProject.title}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    title: e.target.value,
                  })
                }
                className="w-full mb-3 p-2 rounded bg-white/10 text-white"
              />

              <textarea
                placeholder="Description"
                value={editingProject.description}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    description: e.target.value,
                  })
                }
                className="w-full mb-3 p-2 rounded bg-white/10 text-white"
              />

              <input
                placeholder="Image URL"
                value={editingProject.image}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    image: e.target.value,
                  })
                }
                className="w-full mb-3 p-2 rounded bg-white/10 text-white"
              />

              <input
                placeholder="Tags (comma separated)"
                value={editingProject.tags}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    tags: e.target.value,
                  })
                }
                className="w-full mb-4 p-2 rounded bg-white/10 text-white"
              />

              {/* ACTIONS */}
              <div className="flex justify-end gap-3">
                <button onClick={handleCloseModal}>
                  <X />
                </button>

                <button
                  onClick={handleSaveProject} // 🔥 FIXED
                  disabled={saving}
                  className="bg-fuchsia-600 px-4 py-2 rounded text-white flex gap-2"
                >
                  {saving ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Save size={16} />
                  )}
                  Save
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditProjects;