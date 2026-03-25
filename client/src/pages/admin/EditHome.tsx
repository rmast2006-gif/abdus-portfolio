import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { apiGetPageContent, apiUpdateContent } from "../../utils/api.ts";
import { useAdminAuth } from "../../hooks/useAdminAuth.ts";

const EditHome = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAdminAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
              className="p-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-4xl font-bold text-white">
              Edit Home Page
            </h1>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Save size={18} />
            )}
            Save All Changes
          </button>
        </div>

        <div className="space-y-12">
          {/* ================= HERO SECTION ================= */}
          <section className="glass p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/5 pb-4">
              Hero Section
            </h2>

            <div className="space-y-6">
              {/* Heading */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Main Heading
                </label>
                <input
                  type="text"
                  value={content.hero?.heading || ""}
                  onChange={(e) =>
                    handleChange("hero", "heading", e.target.value)
                  }
                  className="w-full input"
                />
              </div>

              {/* Subheading */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Sub Heading
                </label>
                <input
                  type="text"
                  value={content.hero?.subheading || ""}
                  onChange={(e) =>
                    handleChange("hero", "subheading", e.target.value)
                  }
                  className="w-full input"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Bio
                </label>
                <textarea
                  rows={4}
                  value={content.hero?.bio || ""}
                  onChange={(e) =>
                    handleChange("hero", "bio", e.target.value)
                  }
                  className="w-full input resize-none"
                />
              </div>

              {/* 3D MODEL FIELD (🔥 ADDED) */}
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  3D Model / Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://your-model-link.glb or image url"
                  value={content.hero?.model3d || ""}
                  onChange={(e) =>
                    handleChange("hero", "model3d", e.target.value)
                  }
                  className="w-full input"
                />
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Primary Button"
                  value={content.hero?.cta_primary || ""}
                  onChange={(e) =>
                    handleChange("hero", "cta_primary", e.target.value)
                  }
                  className="input"
                />

                <input
                  type="text"
                  placeholder="Secondary Button"
                  value={content.hero?.cta_secondary || ""}
                  onChange={(e) =>
                    handleChange("hero", "cta_secondary", e.target.value)
                  }
                  className="input"
                />
              </div>
            </div>
          </section>

          {/* ================= STATS SECTION ================= */}
          <section className="glass p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-8 border-b border-white/5 pb-4">
              Stats Section
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((num) => (
                <div key={num}>
                  <input
                    type="text"
                    placeholder="Value"
                    value={content.stats?.[`stat${num}_value`] || ""}
                    onChange={(e) =>
                      handleChange(
                        "stats",
                        `stat${num}_value`,
                        e.target.value
                      )
                    }
                    className="input mb-2"
                  />

                  <input
                    type="text"
                    placeholder="Label"
                    value={content.stats?.[`stat${num}_label`] || ""}
                    onChange={(e) =>
                      handleChange(
                        "stats",
                        `stat${num}_label`,
                        e.target.value
                      )
                    }
                    className="input"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EditHome;