import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionHeader } from "../components/ui/SectionHeader.tsx";
import { PageTransition } from "../components/ui/PageTransition.tsx";
import { User, Code, Palette, Terminal, Globe, Award } from "lucide-react";
import { apiGetPageContent } from "../utils/api.ts";
import { AboutFloatingOrb } from "../components/3d/AboutFloatingOrb.tsx";

export const About = () => {
  const [content, setContent] = useState<any>({});

  const avatarRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const avatarY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await apiGetPageContent("about");
        const transformed = response.data.reduce((acc: any, item: any) => {
          if (!acc[item.section]) acc[item.section] = {};
          acc[item.section][item.key] = item.value;
          return acc;
        }, {});
        setContent(transformed);
      } catch (error) {
        console.error("Error fetching about content:", error);
      }
    };
    fetchContent();
  }, []);

  const bio = {
    name: content.bio?.name || "Abdus Samie Tahir",
    role: content.bio?.role || "Full Stack Developer",
    paragraph1:
      content.bio?.paragraph1 ||
      "With over 5 years of experience in the industry...",
    paragraph2:
      content.bio?.paragraph2 ||
      "My expertise lies in React, Three.js...",
    paragraph3:
      content.bio?.paragraph3 ||
      "I believe that code is a creative tool...",
    avatarImage:
      content.bio?.avatarImage ||
      content.bio?.avatar ||
      content.bio?.image ||
      content.bio?.profileImage ||
      "",
  };

  const stats = [
    {
      label: "Years Experience",
      value: "5+",
      icon: <Award className="text-green-400" size={32} />,
    },
    {
      label: "Projects Completed",
      value: "50+",
      icon: <Code className="text-green-500" size={32} />,
    },
    {
      label: "Happy Clients",
      value: "30+",
      icon: <User className="text-green-300" size={32} />,
    },
    {
      label: "Countries Served",
      value: "10+",
      icon: <Globe className="text-green-600" size={32} />,
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!avatarRef.current) return;
    const rect = avatarRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    avatarRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!avatarRef.current) return;
    avatarRef.current.style.transform =
      "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <PageTransition>
      <section
        ref={sectionRef}
        className="pt-32 pb-20 bg-[#021a12] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <SectionHeader
            title="About Me"
            subtitle={`I'm ${bio.name}, a ${bio.role} dedicated to building high-quality digital experiences.`}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            
            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ y: avatarY }}
              className="relative group"
            >
              <div className="absolute -inset-6 bg-green-600/20 rounded-3xl blur-3xl" />

              <div
                ref={avatarRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative transition-all duration-500"
              >
                <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-green-900/30 relative">

                  {/* ✅ 3D BACKGROUND */}
                  <div className="absolute inset-0 pointer-events-none opacity-80">
                    <AboutFloatingOrb />
                  </div>

                  {/* ✅ FIXED IMAGE (PERFECTLY FIT INSIDE ORB) */}
                  {bio.avatarImage && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-[72%] h-[72%] rounded-full overflow-hidden flex items-center justify-center
                                      shadow-[0_0_60px_rgba(0,255,150,0.25)]">
                        <img
                          src={`${bio.avatarImage}?t=${Date.now()}`}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-white mb-6">
                I bridge the gap between{" "}
                <span className="text-gradient">design</span> and{" "}
                <span className="text-gradient">technology</span>.
              </h3>

              <p className="text-lg text-slate-400 mb-6">{bio.paragraph1}</p>
              <p className="text-lg text-slate-400 mb-6">{bio.paragraph2}</p>
              <p className="text-lg text-slate-400 mb-12">{bio.paragraph3}</p>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5">
                  <Palette className="text-green-400 mb-4" size={32} />
                  <h4 className="text-white font-bold">Design Focused</h4>
                </div>

                <div className="p-6 bg-slate-900/50 rounded-2xl border border-white/5">
                  <Terminal className="text-green-500 mb-4" size={32} />
                  <h4 className="text-white font-bold">Code Quality</h4>
                </div>
              </div>
            </motion.div>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-8 bg-slate-900/30 rounded-3xl text-center"
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <h4 className="text-4xl font-bold text-white">
                  {stat.value}
                </h4>
                <p className="text-slate-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </PageTransition>
  );
};