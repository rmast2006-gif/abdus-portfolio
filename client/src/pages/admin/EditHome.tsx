import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { apiGetPageContent, apiUpdateContent } from "../../utils/api.ts";
import { useAdminAuth } from "../../hooks/useAdminAuth.ts";

const EditHome = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAdminAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [content, setContent] = useState<any>({
    hero: {
      heading: "",
      subheading: "",
      bio: "",
      cta_primary: "",
      cta_secondary: "",
      model3d: ""
    },
    stats: {}
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    const fetchContent = async () => {
      try {
        const response = await apiGetPageContent("home");

        const transformed = response.data.reduce((acc: any, item: any) => {
          if (!acc[item.section]) acc[item.section] = {};
          acc[item.section][item.key] = item.value;
          return acc;
        }, {});

        setContent(transformed);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [isAuthenticated, navigate]);

  const handleChange = (section: string, key: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  // 🔥 FILE UPLOAD (ONLY ADDITION — nothing removed)
  const handleFileUpload = async (file: File) => {
    try {
      if (!file.name.endsWith(".glb") && !file.name.endsWith(".gltf")) {
        alert("Only .glb or .gltf files allowed");
        return;
      }

      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "YOUR_UPLOAD_PRESET");
      formData.append("resource_type", "auto");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/auto/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.secure_url) throw new Error("Upload failed");

      handleChange("hero", "model3d", data.secure_url);

    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const promises = [];

      for (const section in content) {
        for (const key in content[section]) {
          promises.push(
            apiUpdateContent({
              page: "home",
              section,
              key,
              value: content[section][key],
              type: "text",
            })
          );
        }
      }

      await Promise.all(promises);
      alert("All changes saved successfully!");
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
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
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/dashboard"
              className="p-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-4xl font-bold text-white">Edit Home Page</h1>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl text-white font-bold"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save All Changes
          </button>
        </div>

        {/* Hero Section */}
        <section className="glass p-8 rounded-2xl border border-white/10 space-y-6">

          <input
            type="text"
            value={content.hero?.heading || ""}
            onChange={(e) => handleChange("hero", "heading", e.target.value)}
            className="w-full input"
            placeholder="Heading"
          />

          <input
            type="text"
            value={content.hero?.subheading || ""}
            onChange={(e) => handleChange("hero", "subheading", e.target.value)}
            className="w-full input"
            placeholder="Subheading"
          />

          <textarea
            value={content.hero?.bio || ""}
            onChange={(e) => handleChange("hero", "bio", e.target.value)}
            className="w-full input"
            placeholder="Bio"
          />

          {/* 🔥 DRAG & DROP — ADDED, NOTHING REMOVED */}
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              3D Model Upload (.glb)
            </label>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) handleFileUpload(file);
              }}
              className="w-full border-2 border-dashed border-white/20 rounded-xl p-8 text-center text-slate-400 hover:border-fuchsia-500 cursor-pointer"
            >
              {uploading
                ? "Uploading..."
                : "Drag & Drop your .glb file here"}
            </div>

            <input
              type="file"
              accept=".glb,.gltf"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
              className="mt-4 text-white"
            />

            {content.hero?.model3d && (
              <p className="text-green-400 mt-2">Model uploaded ✔</p>
            )}
          </div>

        </section>

      </div>
    </div>
  );
};

export default EditHome;