import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Rocket, Zap } from "lucide-react";
import { HeroScene } from "../components/3d/HeroScene.tsx";
import { PageTransition } from "../components/ui/PageTransition.tsx";
import { apiGetPageContent } from "../utils/api.ts";

// ─────────────────────────────────────────────
// Home Page Component
// ─────────────────────────────────────────────
export const Home = () => {

  // ─────────────────────────────────────────
  // STATE MANAGEMENT
  // ─────────────────────────────────────────
  const [content, setContent] = useState<any>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // ─────────────────────────────────────────
  // FETCH CONTENT FROM API
  // ─────────────────────────────────────────
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
        setIsLoaded(true);
      }
    };

    fetchContent();

  }, []);

  // ─────────────────────────────────────────
  // FALLBACK CONTENT (SAFE DEFAULTS)
  // ─────────────────────────────────────────
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

  // ─────────────────────────────────────────
  // MODEL URL FROM ADMIN PANEL (CRITICAL)
  // ─────────────────────────────────────────
  const modelUrl = content.hero?.model3d;

  // ─────────────────────────────────────────
  // RENDER START
  // ─────────────────────────────────────────
  return (
    <PageTransition>

      {/* ───────────────────────────────────────── */}
      {/* MAIN HERO SECTION */}
      {/* ───────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">

        {/* Decorative Background Glow (NEW — does not affect layout) */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuchsia-600/20 blur-[120px] rounded-full pointer-events-none" />

        {/* ───────────────────────────────────────── */}
        {/* MAIN CONTAINER */}
        {/* ───────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">

          {/* ───────────────────────────────────────── */}
          {/* GRID LAYOUT (LEFT CONTENT + RIGHT 3D) */}
          {/* ───────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

            {/* ───────────────────────────────────────── */}
            {/* LEFT SIDE CONTENT */}
            {/* ───────────────────────────────────────── */}
            <div className="relative z-10">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -30 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 bg-fuchsia-600/10 text-fuchsia-400 text-sm font-bold rounded-full border border-fuchsia-500/20 mb-6 tracking-widest uppercase">
                  Creative Developer & 3D Expert
                </span>
              </motion.div>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                  I'm <span className="text-gradient">{hero.heading}</span> <br />
                  {hero.subheading}
                </h1>
              </motion.div>

              {/* Bio */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl font-medium"
              >
                {hero.bio}
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <Link
                  to="/projects"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-lg font-bold rounded-full hover:from-fuchsia-500 hover:to-purple-500 transition-all shadow-xl shadow-fuchsia-500/20 hover:scale-105 active:scale-95"
                >
                  {hero.cta_primary}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white text-lg font-bold rounded-full hover:bg-slate-800 transition-all border border-white/5 hover:scale-105 active:scale-95"
                >
                  {hero.cta_secondary}
                </Link>
              </motion.div>

              {/* ───────────────────────────────────────── */}
              {/* STATS SECTION */}
              {/* ───────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
              >

                {/* Stat 1 */}
                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-slate-900/80 backdrop-blur-sm rounded-2xl group-hover:bg-emerald-600 transition-all border border-white/5 shadow-lg group-hover:scale-110">
                    <Zap size={24} className="text-emerald-400 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{stats.stat1_value}</h4>
                    <p className="text-slate-500 text-sm">{stats.stat1_label}</p>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-slate-900/80 backdrop-blur-sm rounded-2xl group-hover:bg-fuchsia-600 transition-all border border-white/5 shadow-lg group-hover:scale-110">
                    <Rocket size={24} className="text-fuchsia-400 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{stats.stat2_value}</h4>
                    <p className="text-slate-500 text-sm">{stats.stat2_label}</p>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex items-center gap-4 group">
                  <div className="p-3 bg-slate-900/80 backdrop-blur-sm rounded-2xl group-hover:bg-amber-600 transition-all border border-white/5 shadow-lg group-hover:scale-110">
                    <Code2 size={24} className="text-amber-400 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{stats.stat3_value}</h4>
                    <p className="text-slate-500 text-sm">{stats.stat3_label}</p>
                  </div>
                </div>

              </motion.div>

            </div>

            {/* ───────────────────────────────────────── */}
            {/* RIGHT SIDE — 3D MODEL HOLDER */}
            {/* ───────────────────────────────────────── */}
            <div className="relative w-full h-[500px] lg:h-[650px] flex items-center justify-center">

              {/* Wrapper for better alignment */}
              <div className="w-full h-full max-w-[600px]">

                {/* 3D SCENE */}
                <HeroScene modelUrl={modelUrl} />

              </div>

            </div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
};