import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Github } from "lucide-react";
import { SectionHeader } from "../components/ui/SectionHeader.tsx";
import { PageTransition } from "../components/ui/PageTransition.tsx";
import { sendContact, apiGetPageContent } from "../utils/api.ts";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ───────────────────────── PARTICLES ─────────────────────────
const ParticleDots = () => {
  const groupRef = useRef<THREE.Group>(null);

  const particles = useState(() =>
    Array.from({ length: 80 }, () => ({
      position: [
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 6,
      ] as [number, number, number],
      speed: Math.random() * 0.15 + 0.05,
      offset: Math.random() * Math.PI * 2,
      size: Math.random() * 0.04 + 0.02,
    }))
  )[0];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.008;
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <SingleParticle key={i} {...p} />
      ))}
    </group>
  );
};

const SingleParticle = ({ position, speed, offset, size }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.position.y =
      position[1] + Math.sin(clock.getElapsedTime() * speed + offset) * 0.4;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 6, 6]} />
      <meshStandardMaterial color="#7c3aed" emissive="#6d28d9" emissiveIntensity={0.8} transparent opacity={0.5} />
    </mesh>
  );
};

const ContactParticles = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 5, 5]} color="#d946ef" />
      <ParticleDots />
    </Canvas>
  </div>
);

// ───────────────────────── MAIN ─────────────────────────
export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    projectType: "",
    budget: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await apiGetPageContent("contact");
        const contentMap = response.data.reduce((acc: any, item: any) => {
          acc[item.key] = item.value;
          return acc;
        }, {});
        setContent(contentMap);
      } catch (error) {
        console.error(error);
      }
    };
    fetchContent();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await sendContact(formData);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        message: "",
        projectType: "",
        budget: "",
      });
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong.");
    }
  };

  const contactInfo = [
    { icon: <Mail />, label: "Email", value: content.email || "hello@portfolio.com" },
    { icon: <Phone />, label: "Phone", value: content.phone || "+923XXXXXXXXX" },
    { icon: <MapPin />, label: "Location", value: content.location || "Pakistan" },
  ];

  return (
    <PageTransition>
      <section className="pt-32 pb-20 bg-slate-950 min-h-screen relative overflow-hidden">

        <ContactParticles />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

          <SectionHeader
            title="Get In Touch"
            subtitle="Let’s build something amazing together"
          />

          {/* 🔥 Availability */}
          <div className="mb-10">
            <span className="bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm">
              🟢 Available for freelance work
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* LEFT */}
            <div>
              <div className="space-y-6 mb-8">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="p-6 bg-slate-900 rounded-2xl border border-white/5"
                  >
                    <div className="flex gap-4 items-center text-white">
                      {info.icon}
                      <div>
                        <p className="font-bold">{info.label}</p>
                        <p className="text-slate-400">{info.value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* 🔥 Quick Contact */}
              <div className="flex gap-4">
                <a href="mailto:your@email.com" className="p-4 bg-white/5 rounded-xl"><Mail /></a>
                <a href="https://github.com/" className="p-4 bg-white/5 rounded-xl"><Github /></a>
                <a href="https://wa.me/923XXXXXXXXX" className="p-4 bg-white/5 rounded-xl"><Phone /></a>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="p-8 bg-slate-900/60 rounded-3xl border border-white/10">

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div key="success" className="text-center py-12">
                    <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
                    <h3 className="text-white text-xl">Message Sent!</h3>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">

                    <input placeholder="Name" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input" />

                    <input placeholder="Email" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input" />

                    {/* 🔥 NEW */}
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="input"
                    >
                      <option value="">Project Type</option>
                      <option>Portfolio</option>
                      <option>E-commerce</option>
                      <option>3D Website</option>
                    </select>

                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="input"
                    >
                      <option value="">Budget</option>
                      <option>$50-$100</option>
                      <option>$100-$300</option>
                      <option>$300+</option>
                    </select>

                    <textarea placeholder="Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input h-32" />

                    {status === "error" && <p className="text-red-400">{errorMessage}</p>}

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl text-white"
                    >
                      {status === "loading" ? "Sending..." : "Send Message"}
                    </motion.button>

                  </motion.form>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};