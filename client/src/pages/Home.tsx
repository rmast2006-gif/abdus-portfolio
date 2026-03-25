import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Rocket, Zap } from "lucide-react";
import { HeroScene } from "../components/3d/HeroScene.tsx";
import { PageTransition } from "../components/ui/PageTransition.tsx";
import { apiGetPageContent } from "../utils/api.ts";

export const Home = () => {
  const [content, setContent] = useState<any>({});

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
      }
    };
    fetchContent();
  }, []);

  const hero = content.hero || {
    heading: "Abdus Samie Tahir",
    subheading: "(RMAST)",
    bio: "I build high-performance, interactive web applications...",
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

  // ✅ 3D MODEL FROM ADMIN PANEL
  const modelUrl = content.hero?.model3d || "";

  return (
    <PageTransition>
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">

        {/* 🔥 PASS MODEL TO 3D SCENE */}
        <HeroScene modelUrl={modelUrl} />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
          <div className="max-w-3xl">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 bg-fuchsia-600/10 text-fuchsia-400 text-sm font-bold rounded-full border border-fuchsia-500/20 mb-6 tracking-widest uppercase">
                Creative Developer & 3D Expert
              </span>

              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                I'm <span className="text-gradient">{hero.heading}</span> <br />
                {hero.subheading}
              </h1>

              <p className="text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl font-medium">
                {hero.bio}
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  to="/projects"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white text-lg font-bold rounded-full hover:scale-105"
                >
                  {hero.cta_primary}
                  <ArrowRight size={20} />
                </Link>

                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white text-lg font-bold rounded-full hover:bg-slate-800 border border-white/5 hover:scale-105"
                >
                  {hero.cta_secondary}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8"
            >
              {[1, 2, 3].map((num, i) => {
                const icons = [Zap, Rocket, Code2];
                const Icon = icons[i];

                return (
                  <div key={num} className="flex items-center gap-4">
                    <div className="p-3 bg-slate-900/80 rounded-2xl">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold">
                        {stats[`stat${num}_value`]}
                      </h4>
                      <p className="text-slate-500 text-sm">
                        {stats[`stat${num}_label`]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
};