import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { apiGetPageContent, apiUpdateContent } from "../../utils/api.ts";
import { useAdminAuth } from "../../hooks/useAdminAuth.ts";
import ImageUpload from "../../components/admin/ImageUpload.tsx";

// ─────────────────────────────────────────────
// ADMIN EDIT HOME — FINAL STABLE VERSION (FIXED)
// ─────────────────────────────────────────────
const EditHome = () => {

  const navigate = useNavigate();
  const { isAuthenticated } = useAdminAuth();

  // STATES
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-10">

          <h2 className="text-xl text-white font-bold">Hero Section</h2>

          {/* TEXT */}
          <div className="flex flex-col gap-6 w-full">

            <h3 className="text-white font-semibold">Text Content</h3>

            <input
              type="text"
              placeholder="Heading"
              value={content.hero?.heading || ""}
              onChange={(e) => handleChange("hero", "heading", e.target.value)}
              className="input w-full"
            />

            <input
              type="text"
              placeholder="Subheading"
              value={content.hero?.subheading || ""}
              onChange={(e) => handleChange("hero", "subheading", e.target.value)}
              className="input w-full"
            />

            <textarea
              rows={4}
              placeholder="Bio"
              value={content.hero?.bio || ""}
              onChange={(e) => handleChange("hero", "bio", e.target.value)}
              className="input w-full resize-none"
            />

          </div>

          {/* IMAGES */}
          <div className="flex flex-col gap-8">

            <h3 className="text-white font-semibold">Flip Card Images</h3>

            {/* FRONT IMAGE */}
            <div>
              <p className="text-slate-400 mb-2">Front Image</p>

              <ImageUpload
                currentImage={content.hero?.front_image}
                onUploadSuccess={(url: string) =>
                  handleChange("hero", "front_image", url)
                }
              />

              {content.hero?.front_image && (
                <img
                  src={content.hero.front_image}
                  className="mt-3 w-32 rounded"
                />
              )}
            </div>

            {/* BACK IMAGE */}
            <div>
              <p className="text-slate-400 mb-2">Back Image</p>

              <ImageUpload
                currentImage={content.hero?.back_image}
                onUploadSuccess={(url: string) =>
                  handleChange("hero", "back_image", url)
                }
              />

              {content.hero?.back_image && (
                <img
                  src={content.hero.back_image}
                  className="mt-3 w-32 rounded"
                />
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default EditHome;