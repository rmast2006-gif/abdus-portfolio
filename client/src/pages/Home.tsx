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
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#021a12]">

        {/* 🔥 MULTI-LAYER PREMIUM BACKGROUND SYSTEM */}
        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/20 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-400/15 blur-[120px] rounded-full" />
          <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-600/10 blur-[120px] rounded-full" />

        </div>

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
                <span className="inline-block px-5 py-2 bg-green-600/10 text-green-400 text-sm font-bold rounded-full border border-green-500/20 mb-6 tracking-widest uppercase shadow-lg shadow-green-500/10 backdrop-blur-md">
                  Creative Developer & 3D Expert
                </span>
              </motion.div>

              {/* HEADING */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : -60 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-[1.05] tracking-tight">

                  {/* 🔥 TEXT GLOW LAYER */}
                  <span className="absolute blur-2xl opacity-20 text-green-400">
                    {hero.heading}
                  </span>

                  <span className="relative">
                    I'm <span className="text-gradient">{hero.heading}</span>
                  </span>

                  <br />
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

                {/* PRIMARY BUTTON */}
                <Link
                  to="/projects"
                  className="group relative flex items-center justify-center gap-3 px-8 py-4 btn-premium rounded-full text-lg font-bold overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {hero.cta_primary}
                    <ArrowRight size={20} />
                  </span>

                  {/* 🔥 SHINE EFFECT */}
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </Link>

                {/* SECONDARY BUTTON */}
                <Link
                  to="/contact"
                  className="relative flex items-center justify-center gap-3 px-8 py-4 bg-slate-900/80 backdrop-blur-xl text-white text-lg font-bold rounded-full border border-green-500/10 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all overflow-hidden"
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
                  <motion.div
                    key={i}
                    whileHover={{ y: -6, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex items-center gap-4 group p-4 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-white/5 hover:border-green-500/20 transition-all"
                  >
                    <div className="p-3 bg-slate-900/80 rounded-2xl border border-green-500/10 group-hover:border-green-500/30 transition-all shadow-inner shadow-green-500/5">
                      <Icon size={24} className="text-green-400" />
                    </div>

                    <div>
                      <h4 className="text-white font-bold text-lg">
                        {stats[`stat${i + 1}_value`]}
                      </h4>
                      <p className="text-slate-500 text-sm">
                        {stats[`stat${i + 1}_label`]}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

            </div>

            {/* RIGHT SIDE — 3D IMAGE HOLDER */}
            <div className="relative w-full h-[550px] flex items-center justify-center">

              {/* EXTRA GLOW BEHIND 3D */}
              <div className="absolute w-[400px] h-[400px] bg-green-500/20 blur-[120px] rounded-full" />

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