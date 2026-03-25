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
  const [content, setContent] = useState<any>({});

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

  // 🔥 Upload to Cloudinary
  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // 🔁 replace
      formData.append("resource_type", "auto");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/auto/upload", // 🔁 replace
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!data.secure_url) throw new Error("Upload failed");

      // ✅ Save URL in your system
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
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <Link to="/admin/dashboard">
              <ArrowLeft className="text-white" />
            </Link>
            <h1 className="text-3xl text-white font-bold">Edit Home Page</h1>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-fuchsia-600 text-white rounded-xl"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Save
          </button>
        </div>

        {/* Hero Section */}
        <div className="bg-white/5 p-8 rounded-xl border border-white/10 space-y-6">

          <input
            type="text"
            placeholder="Heading"
            value={content.hero?.heading || ""}
            onChange={(e) => handleChange("hero", "heading", e.target.value)}
            className="w-full input"
          />

          <input
            type="text"
            placeholder="Subheading"
            value={content.hero?.subheading || ""}
            onChange={(e) => handleChange("hero", "subheading", e.target.value)}
            className="w-full input"
          />

          <textarea
            placeholder="Bio"
            value={content.hero?.bio || ""}
            onChange={(e) => handleChange("hero", "bio", e.target.value)}
            className="w-full input"
          />

          {/* 🔥 DRAG & DROP 3D MODEL */}
          <div>
            <p className="text-slate-400 mb-2">3D Model Upload (.glb)</p>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) handleFileUpload(file);
              }}
              className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center text-slate-400 hover:border-fuchsia-500 cursor-pointer"
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
        </div>

      </div>
    </div>
  );
};

export default EditHome;