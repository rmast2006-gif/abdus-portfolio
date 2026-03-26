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
import ImageUpload from "../../components/admin/ImageUpload.tsx";

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
      setEditingProject({
        ...project,
        languages: "",
        stack: "",
      });
    } else {
      setEditingProject({
        title: "",
        description: "",
        image: "",
        githubLink: "",
        liveLink: "",
        languages: "",
        stack: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  // ✅ FULL SAVE FUNCTION (FIXED)
  const handleSaveProject = async () => {
    setSaving(true);

    try {
      // ✅ CREATE FORMDATA
      const formData = new FormData();

      formData.append("title", editingProject.title || "");
      formData.append("description", editingProject.description || "");
      formData.append("image", editingProject.image || "");
      formData.append("githubLink", editingProject.githubLink || "");
      formData.append("liveLink", editingProject.liveLink || "");

      // ✅ TAGS FIX
      const tags = [
        ...(editingProject.languages
          ? editingProject.languages
              .split(",")
              .map((t: string) => t.trim())
              .filter((t: string) => t !== "")
          : []),

        ...(editingProject.stack
          ? editingProject.stack
              .split(",")
              .map((t: string) => t.trim())
              .filter((t: string) => t !== "")
          : []),
      ];

      formData.append("tags", JSON.stringify(tags));

      console.log("🚀 Sending FormData...");

      // ✅ UPDATE / CREATE
      if (editingProject._id) {
        await apiUpdateProject(editingProject._id, formData);
        await fetchProjects();
      } else {
        const res = await apiCreateProject(formData);
        setProjects((prev) => [res.data, ...prev]);
      }

      handleCloseModal();
    } catch (error) {
      console.error("❌ Save error:", error);
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
              <ArrowLeft className="text-white" />
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
                  <Edit2 className="text-white" />
                </button>

                <button onClick={() => handleDeleteProject(p._id)}>
                  <Trash2 className="text-red-400" />
                </button>
              </div>

              <div className="flex gap-3 mt-3">
                {p.githubLink && (
                  <a href={p.githubLink} target="_blank">
                    <Github />
                  </a>
                )}
                {p.liveLink && (
                  <a href={p.liveLink} target="_blank">
                    <ExternalLink />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <motion.div className="bg-slate-900 p-6 rounded-xl w-full max-w-lg">

              <h2 className="text-white text-xl mb-4">
                {editingProject?._id ? "Edit Project" : "Add Project"}
              </h2>

              {/* FORM */}

              <input
                placeholder="Title"
                value={editingProject.title}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, title: e.target.value })
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

              {/* ✅ FIXED IMAGE UPLOAD */}
              <ImageUpload
                currentImage={editingProject.image}
                onUploadSuccess={(url: string) =>
                  setEditingProject({ ...editingProject, image: url })
                }
              />

              <input
                placeholder="GitHub Link"
                value={editingProject.githubLink}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    githubLink: e.target.value,
                  })
                }
                className="w-full mb-3 p-2 rounded bg-white/10 text-white"
              />

              <input
                placeholder="Live Link"
                value={editingProject.liveLink}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    liveLink: e.target.value,
                  })
                }
                className="w-full mb-3 p-2 rounded bg-white/10 text-white"
              />

              <input
                placeholder="Languages (comma separated)"
                value={editingProject.languages}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    languages: e.target.value,
                  })
                }
                className="w-full mb-3 p-2 rounded bg-white/10 text-white"
              />

              <input
                placeholder="Tech Stack (comma separated)"
                value={editingProject.stack}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    stack: e.target.value,
                  })
                }
                className="w-full mb-4 p-2 rounded bg-white/10 text-white"
              />

              {/* ACTIONS */}
              <div className="flex justify-end gap-3">
                <button onClick={handleCloseModal}>
                  <X className="text-white" />
                </button>

                <button
                  onClick={handleSaveProject}
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