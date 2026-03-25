import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { SectionHeader } from "../components/ui/SectionHeader.tsx";
import { PageTransition } from "../components/ui/PageTransition.tsx";
import { sendContact, apiGetPageContent } from "../utils/api.ts";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* =========================
   3D PARTICLE BACKGROUND
========================= */
const ParticleDots = () => {
  const groupRef = useRef<THREE.Group>(null);

  const particles = useState(() =>
    Array.from({ length: 70 }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 6,
      ] as [number, number, number],
      speed: Math.random() * 0.1 + 0.05,
      offset: Math.random() * Math.PI * 2,
      size: Math.random() * 0.03 + 0.02,
    }))
  )[0];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshStandardMaterial
            color="#9333ea"
            emissive="#6d28d9"
            emissiveIntensity={0.6}
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

const ContactParticles = () => (
  <div className="absolute inset-0 z-0 pointer-events-none">
    <Canvas camera={{ position: [0, 0, 10] }} dpr={[1, 1]}>
      <ambientLight intensity={0.4} />
      <ParticleDots />
    </Canvas>
  </div>
);

/* =========================
   MAIN COMPONENT
========================= */
export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [content, setContent] = useState<any>({});

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await apiGetPageContent("contact");
        const map = res.data.reduce((acc: any, item: any) => {
          acc[item.key] = item.value;
          return acc;
        }, {});
        setContent(map);
      } catch (err) {
        console.error(err);
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
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong.");
    }
  };

  const contactInfo = [
    { icon: <Mail />, label: "Email", value: content.email || "hello@mail.com" },
    { icon: <Phone />, label: "Phone", value: content.phone || "+92..." },
    { icon: <MapPin />, label: "Location", value: content.location || "Pakistan" },
  ];

  return (
    <PageTransition>
      <section className="pt-32 pb-20 bg-slate-950 min-h-screen relative overflow-hidden">
        <ContactParticles />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader
            title="Get In Touch"
            subtitle="Open to freelance work and all opportunities"
          />

          <div className="grid lg:grid-cols-2 gap-16">

            {/* LEFT */}
            <div>
              <h3 className="text-3xl text-white mb-6 font-bold">
                Let’s work together 🚀
              </h3>

              <div className="space-y-6">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 5 }}
                    className="flex gap-4 p-5 bg-slate-900/60 rounded-xl border border-white/10"
                  >
                    <div className="text-fuchsia-400">{item.icon}</div>
                    <div>
                      <p className="text-white font-semibold">{item.label}</p>
                      <p className="text-slate-400">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT FORM */}
            <motion.div
              className="p-8 bg-slate-900/70 rounded-3xl border border-white/10 backdrop-blur-xl shadow-xl"
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                  >
                    <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
                    <h2 className="text-white text-xl font-bold">Message Sent!</h2>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* NAME */}
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-4 rounded-xl bg-slate-800 border border-white/10 text-white focus:ring-2 focus:ring-fuchsia-500"
                    />

                    {/* EMAIL */}
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-4 rounded-xl bg-slate-800 border border-white/10 text-white focus:ring-2 focus:ring-fuchsia-500"
                    />

                    {/* MESSAGE */}
                    <textarea
                      rows={5}
                      placeholder="Your Message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 rounded-xl bg-slate-800 border border-white/10 text-white focus:ring-2 focus:ring-fuchsia-500"
                    />

                    {/* ERROR */}
                    {status === "error" && (
                      <div className="text-red-400 flex gap-2">
                        <AlertCircle size={18} /> {errorMessage}
                      </div>
                    )}

                    {/* BUTTON */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-fuchsia-600 to-purple-600 rounded-xl text-white font-bold flex justify-center gap-2"
                    >
                      {status === "loading" ? "Sending..." : "Send Message"}
                      <Send size={18} />
                    </motion.button>

                  </form>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
};