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
            color="#22c55e"               // ✅ GREEN
            emissive="#16a34a"            // ✅ GREEN GLOW
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
      <section className="pt-32 pb-20 bg-[#021a12] min-h-screen relative overflow-hidden">
        <ContactParticles />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* HEADER */}
          <div className="text-center mb-16">

            <SectionHeader
              title="Get In Touch"
              subtitle=""
            />

            {/* ✅ ACTIVE STATUS */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mt-4"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>

              <p className="text-green-400 font-medium">
                Open to freelance work and all opportunities
              </p>
            </motion.div>

          </div>

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
                    <div className="text-green-400">{item.icon}</div> {/* ✅ FIX */}
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

                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-4 rounded-xl bg-slate-800 border border-white/10 text-white focus:ring-2 focus:ring-green-500"
                    />

                    <input
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-4 rounded-xl bg-slate-800 border border-white/10 text-white focus:ring-2 focus:ring-green-500"
                    />

                    <textarea
                      rows={5}
                      placeholder="Your Message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 rounded-xl bg-slate-800 border border-white/10 text-white focus:ring-2 focus:ring-green-500"
                    />

                    {status === "error" && (
                      <div className="text-red-400 flex gap-2">
                        <AlertCircle size={18} /> {errorMessage}
                      </div>
                    )}

                    {/* ✅ BUTTON GREEN */}
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 rounded-xl text-white font-bold flex justify-center gap-2 hover:from-green-500 hover:to-green-600 transition-all shadow-lg shadow-green-500/20"
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