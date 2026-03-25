import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { apiGetPageContent, apiUpdateContent } from "../../utils/api.ts";
import { useAdminAuth } from "../../hooks/useAdminAuth.ts";

// ─────────────────────────────────────────────
// ADMIN EDIT HOME — FULL LENGTH VERSION
// ─────────────────────────────────────────────
const EditHome = () => {

  const navigate = useNavigate();
  const { isAuthenticated } = useAdminAuth();

  // STATES
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [content, setContent] = useState<any>({});

  // FETCH DATA
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
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();

  }, [isAuthenticated, navigate]);

  // CHANGE HANDLER
  const handleChange = (section: string, key: string, value: string) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  // UPLOAD HANDLER
  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "YOUR_UPLOAD_PRESET");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.secure_url) throw new Error("Upload failed");

      handleChange("hero", "hero_image", data.secure_url);

    } catch (error) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // SAVE
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
      alert("Saved successfully!");

    } catch (error) {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="animate-spin text-fuchsia-500" size={40} />
      </div>
    );
  }

  // UI
  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 px-6">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">

          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <ArrowLeft className="text-white" />
            </Link>
            <h1 className="text-3xl text-white font-bold">Edit Home Page</h1>
          </div>

          <button onClick={handleSave} className="btn-primary">
            {saving ? <Loader2 className="animate-spin" /> : <Save />}
            Save Changes
          </button>

        </div>

        {/* HERO SECTION */}
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-6">

          <h2 className="text-xl text-white font-bold">Hero Section</h2>

          <input
            type="text"
            placeholder="Heading"
            value={content.hero?.heading || ""}
            onChange={(e) => handleChange("hero", "heading", e.target.value)}
            className="input"
          />

          <input
            type="text"
            placeholder="Subheading"
            value={content.hero?.subheading || ""}
            onChange={(e) => handleChange("hero", "subheading", e.target.value)}
            className="input"
          />

          <textarea
            rows={4}
            placeholder="Bio"
            value={content.hero?.bio || ""}
            onChange={(e) => handleChange("hero", "bio", e.target.value)}
            className="input"
          />

          {/* IMAGE UPLOAD */}
          <div>
            <p className="text-slate-400 mb-2">Hero Image (3D Holder)</p>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) handleFileUpload(file);
              }}
              className="border-2 border-dashed border-white/20 rounded-xl p-10 text-center text-slate-400 hover:border-fuchsia-500 cursor-pointer"
            >
              {uploading ? "Uploading..." : "Drag & Drop Image Here"}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
              className="mt-4 text-white"
            />

            {content.hero?.hero_image && (
              <p className="text-green-400 mt-2">Image uploaded ✔</p>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default EditHome;