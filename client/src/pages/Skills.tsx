import React, { useState, useEffect, Suspense } from "react";
import { motion } from "motion/react";
import { SectionHeader } from "../components/ui/SectionHeader.tsx";
import { SkillsOrb } from "../components/3d/SkillsOrb.tsx";
import { SkillBar } from "../components/ui/SkillBar.tsx";
import { PageTransition } from "../components/ui/PageTransition.tsx";
import { apiGetSkills } from "../utils/api.ts";

export const Skills = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await apiGetSkills();
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const categories = ["Frontend", "Backend", "Tools", "Other"];

  const featureCards = [
    {
      title: "Architecture",
      text: "Designing scalable and maintainable system architectures using modern patterns and best practices.",
      hoverColor: "hover:bg-green-600/10",
      shadowColor: "hover:shadow-green-500/5",
      glowColor: "from-green-600 to-green-700",
    },
    {
      title: "3D Interaction",
      text: "Creating immersive 3D environments using Three.js and React Three Fiber.",
      hoverColor: "hover:bg-green-700/10",
      shadowColor: "hover:shadow-green-500/5",
      glowColor: "from-green-700 to-green-800",
    },
    {
      title: "Full-Stack",
      text: "Building robust backends and seamless frontends with modern tech stacks.",
      hoverColor: "hover:bg-green-500/10",
      shadowColor: "hover:shadow-green-500/5",
      glowColor: "from-green-500 to-green-600",
    },
  ];

  return (
    <PageTransition>
      <section className="pt-32 pb-20 bg-[#021a12] min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          <SectionHeader
            title="My Skills"
            subtitle="Technologies I use to build modern applications"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-white mb-8">
                Technical <span className="text-gradient">Expertise</span>
              </h3>

              <p className="text-lg text-slate-400 mb-12">
                I specialize in building interactive 3D experiences and scalable
                full-stack applications with performance and UX in mind.
              </p>

              <div className="space-y-12">
                {categories.map((category, index) => {
                  const categorySkills = skills.filter(
                    (s) => s.category === category
                  );

                  if (categorySkills.length === 0) return null;

                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center text-xs font-mono shadow-lg"
                        >
                          0{index + 1}
                        </motion.span>
                        {category}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-2">
                        {categorySkills.map((skill) => (
                          <SkillBar
                            key={skill._id}
                            name={skill.name}
                            level={skill.level}
                          />
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-green-600/10 rounded-full blur-3xl" />

              <h4 className="text-white text-lg mb-4 text-center">
                Interactive Skills Visualization
              </h4>

              <Suspense
                fallback={
                  <div className="h-[500px] flex items-center justify-center text-slate-400">
                    Loading 3D Skills...
                  </div>
                }
              >
                <SkillsOrb skills={skills} />
              </Suspense>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 280, damping: 20 },
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className={`relative p-8 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/5 text-center group ${card.hoverColor} hover:border-white/10 hover:shadow-xl ${card.shadowColor} transition-colors overflow-hidden`}
              >
                <div
                  className={`absolute top-0 left-8 right-8 h-px bg-gradient-to-r ${card.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <h4 className="text-2xl font-bold text-white mb-4">
                  {card.title}
                </h4>
                <p className="text-slate-400 text-sm">{card.text}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </PageTransition>
  );
};