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

  // 🔥 from admin panel
  const modelUrl = content.hero?.model3d;

  return (
    <PageTransition>
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">

        {/* 3D Background */}
        <HeroScene modelUrl={modelUrl} />

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
          <div className="max-w-3xl">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-8">
                I'm <span className="text-gradient">{hero.heading}</span>
              </h1>

              <p className="text-xl text-slate-400 mb-12">
                {hero.bio}
              </p>

              <div className="flex gap-6">
                <Link to="/projects" className="btn-primary">
                  {hero.cta_primary}
                  <ArrowRight size={20} />
                </Link>

                <Link to="/contact" className="btn-secondary">
                  {hero.cta_secondary}
                </Link>
              </div>
            </motion.div>

            <div className="mt-20 grid grid-cols-3 gap-8">
              {[Zap, Rocket, Code2].map((Icon, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Icon />
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
            </div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
};