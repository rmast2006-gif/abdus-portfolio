import { ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, Suspense, lazy, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components/layout/Navbar.tsx";
import { Footer } from "./components/layout/Footer.tsx";
import { Home } from "./pages/Home.tsx";
import { About } from "./pages/About.tsx";
import { Projects } from "./pages/Projects.tsx";
import { Skills } from "./pages/Skills.tsx";
import { Contact } from "./pages/Contact.tsx";
import { Cursor } from "./components/ui/Cursor.tsx";
import { useScrollProgress } from "./hooks/useScrollProgress.ts";
import { motion } from "framer-motion";
import { PageTransition } from "./components/ui/PageTransition.tsx";
import ProtectedRoute from "./components/ui/ProtectedRoute.tsx";
import Loader from "./components/ui/Loader.tsx";

// Lazy load admin pages
const AdminLogin = lazy(() => import("./pages/AdminLogin.tsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.tsx"));
const EditHome = lazy(() => import("./pages/admin/EditHome.tsx"));
const EditAbout = lazy(() => import("./pages/admin/EditAbout.tsx"));
const EditProjects = lazy(() => import("./pages/admin/EditProjects.tsx"));
const EditSkills = lazy(() => import("./pages/admin/EditSkills.tsx"));
const EditContact = lazy(() => import("./pages/admin/EditContact.tsx"));
const EditGlobal = lazy(() => import("./pages/admin/EditGlobal.tsx"));
const Messages = lazy(() => import("./pages/admin/Messages.tsx"));

const AppContent = () => {
  const location = useLocation();
  const scrollProgress = useScrollProgress();
  const isAdminPage = location.pathname.startsWith("/admin");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // ✅ FIX: Force reflow after route change
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 50);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  // ✅ GLOBAL FIX: remove caret from entire user panel
  useEffect(() => {
    if (!isAdminPage) {
      const style = document.createElement("style");
      style.setAttribute("data-no-caret", "true");

      style.innerHTML = `
        *:not(input):not(textarea):not([contenteditable="true"]) {
          caret-color: transparent !important;
        }
      `;

      document.head.appendChild(style);

      return () => {
        const existing = document.querySelector('style[data-no-caret="true"]');
        if (existing) {
          document.head.removeChild(existing);
        }
      };
    }
  }, [isAdminPage]);

  const renderWithTransition = (Component: ReactNode) => {
    return <PageTransition>{Component}</PageTransition>;
  };

  return (
    <div className="relative bg-[#021a12] min-h-screen w-full overflow-x-hidden text-slate-200 selection:bg-green-500/30 selection:text-green-200">

      {/* 🔥 GLOBAL BACKGROUND GLOW SYSTEM */}
      {!isAdminPage && (
        <>
          <div className="fixed inset-0 -z-10 pointer-events-none">

            {/* MAIN RADIAL LIGHT */}
            <div className="absolute top-[-200px] left-[10%] w-[600px] h-[600px] bg-green-500/10 blur-[160px] rounded-full" />

            {/* SECONDARY LIGHT */}
            <div className="absolute bottom-[-200px] right-[10%] w-[500px] h-[500px] bg-emerald-400/10 blur-[140px] rounded-full" />

            {/* CENTER GLOW */}
            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-green-600/5 blur-[120px] rounded-full" />

          </div>
        </>
      )}

      {!isAdminPage && <Cursor />}
      {!isAdminPage && <Navbar />}

      {/* 🔥 PREMIUM SCROLL PROGRESS BAR */}
      {!isAdminPage && (
        <>
          <motion.div
            className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-green-400 via-green-500 to-emerald-500 z-[6000] origin-left shadow-[0_0_20px_rgba(34,197,94,0.6)]"
            style={{ scaleX: scrollProgress }}
          />

          {/* GLOW LINE UNDER */}
          <motion.div
            className="fixed top-0 left-0 h-[6px] bg-green-500/20 blur-md z-[5999] origin-left"
            style={{ scaleX: scrollProgress }}
          />
        </>
      )}

      {/* MAIN CONTENT WRAPPER */}
      <div className="w-full min-h-screen relative">

        {/* ✅ KEY: enable first transition + route transitions */}
        <AnimatePresence mode="wait">
          <Suspense
            fallback={
              <div className="h-screen w-full flex items-center justify-center bg-[#021a12]">

                {/* 🔥 PREMIUM LOADER */}
                <div className="relative flex items-center justify-center">

                  <div className="w-16 h-16 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin" />

                  {/* GLOW RING */}
                  <div className="absolute w-16 h-16 rounded-full bg-green-500/20 blur-xl" />

                </div>

              </div>
            }
          >
            {/* ✅ IMPORTANT: keep this EXACT */}
            <Routes location={location} key={location.pathname}>

              <Route path="/" element={renderWithTransition(<Home />)} />

              <Route path="/about" element={renderWithTransition(<About />)} />

              <Route path="/projects" element={renderWithTransition(<Projects />)} />

              <Route path="/skills" element={renderWithTransition(<Skills />)} />

              <Route path="/contact" element={renderWithTransition(<Contact />)} />

              {/* Admin Routes */}
              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

              <Route path="/admin/login" element={<AdminLogin />} />

              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/edit/home"
                element={
                  <ProtectedRoute>
                    <EditHome />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/edit/about"
                element={
                  <ProtectedRoute>
                    <EditAbout />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/edit/projects"
                element={
                  <ProtectedRoute>
                    <EditProjects />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/edit/skills"
                element={
                  <ProtectedRoute>
                    <EditSkills />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/edit/contact"
                element={
                  <ProtectedRoute>
                    <EditContact />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/edit/global"
                element={
                  <ProtectedRoute>
                    <EditGlobal />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/messages"
                element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                }
              />

            </Routes>
          </Suspense>
        </AnimatePresence>
      </div>

      {!isAdminPage && <Footer />}

    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {!loading && (
        <Router>
          <AppContent />
        </Router>
      )}
    </>
  );
}