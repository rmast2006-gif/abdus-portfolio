import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Rocket, Zap } from "lucide-react";
import { HeroScene } from "../components/3d/HeroScene.tsx";
import { PageTransition } from "../components/ui/PageTransition.tsx";
import { apiGetPageContent } from "../utils/api.ts";

// ─────────────────────────────────────────────
// Home Page — FULL VERSION (NO REDUCTION)
// ─────────────────────────────────────────────
export const Home = () => {

  // ───────────────── STATE ─────────────────
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // ───────────────── FETCH DATA ─────────────────
  useEffect(() => {

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
        console.error("Error fetching home content:", error);
      } finally {
        setLoading(false);
        setMounted(true);
      }
    };

    fetchContent();

  }, []);

  // ───────────────── FALLBACKS ─────────────────
  const hero = content.hero || {
    heading: "Abdus Samie Tahir",
    subheading: "(RMAST)",
    bio: "I build high-performance, interactive web applications that combine cutting-edge 3D technology with seamless user experiences.",
    cta_primary: "View My Work",
    cta_secondary: "Let's Talk",
  };

  const stats = content.stats || {
    stat1_value: "Fast",
    stat1_label: "Performance",
    stat2_value: "Modern",
    stat2_label: "Tech",
    stat3_value: "Clean",
    stat3_label: "Code",
  };

  // ───────────────── IMAGE FROM ADMIN ─────────────────
  const imageUrl = content.hero?.hero_image;

  // ───────────────── RENDER ─────────────────
  return (
    <PageTransition>

      {/* MAIN SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">

        {/* BACKGROUND GLOW */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-fuchsia-600/20 blur-[140px] rounded-full pointer-events-none" />

        {/* GRID CONTAINER */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">

            {/* LEFT SIDE */}
            <div className="relative z-10">

              {/* BADGE */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -40 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 bg-fuchsia-600/10 text-fuchsia-400 text-sm font-bold rounded-full border border-fuchsia-500/20 mb-6 tracking-widest uppercase">
                  Creative Developer & 3D Expert
                </span>
              </motion.div>

              {/* HEADING */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -60 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                  I'm <span className="text-gradient">{hero.heading}</span> <br />
                  {hero.subheading}
                </h1>
              </motion.div>

              {/* BIO */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: mounted ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl font-medium"
              >
                {hero.bio}
              </motion.p>

              {/* BUTTONS */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 30 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <Link
                  to="/projects"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-lg font-bold rounded-full hover:scale-105"
                >
                  {hero.cta_primary}
                  <ArrowRight size={20} />
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white text-lg font-bold rounded-full border border-white/5 hover:scale-105"
                >
                  {hero.cta_secondary}
                </Link>
              </motion.div>

              {/* STATS */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 50 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
              >
                {[Zap, Rocket, Code2].map((Icon, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="p-3 bg-slate-900/80 rounded-2xl border border-white/5">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">
                        {stats[`stat${i + 1}_value`]}
                      </h4>
                      <p className="text-slate-500 text-sm">
                        {stats[`stat${i + 1}_label`]}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>

            </div>

            {/* RIGHT SIDE — 3D IMAGE HOLDER */}
            <div className="relative w-full h-[550px] flex items-center justify-center">

              {/* WRAPPER FOR ALIGNMENT */}
              <div className="w-full h-full max-w-[500px] flex items-center justify-center">

                {/* 3D HOLDER */}
                <HeroScene imageUrl={imageUrl} />

              </div>

            </div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
};