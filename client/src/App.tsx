import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { AnimatePresence } from "motion/react";
import { Navbar } from "./components/layout/Navbar.tsx";
import { Footer } from "./components/layout/Footer.tsx";
import { Home } from "./pages/Home.tsx";
import { About } from "./pages/About.tsx";
import { Projects } from "./pages/Projects.tsx";
import { Skills } from "./pages/Skills.tsx";
import { Contact } from "./pages/Contact.tsx";
import { Cursor } from "./components/ui/Cursor.tsx";
import { useScrollProgress } from "./hooks/useScrollProgress.ts";
import { motion } from "motion/react";
import { PageTransition } from "./components/ui/PageTransition.tsx";
import ProtectedRoute from "./components/ui/ProtectedRoute.tsx";

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

  // ✅ FIX: Force reflow after route change (prevents blue screen / delayed render)
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

  return (
    <div className="bg-slate-950 min-h-screen w-full overflow-x-hidden text-slate-200 selection:bg-fuchsia-500/30 selection:text-fuchsia-200">
      {!isAdminPage && <Cursor />}
      {!isAdminPage && <Navbar />}
      
      {/* Scroll Progress Bar */}
      {!isAdminPage && (
        <motion.div
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 z-[6000] origin-left"
          style={{ scaleX: scrollProgress }}
        />
      )}

      {/* ✅ FIX: wrapper to stabilize layout + prevent shifting */}
      <div className="w-full min-h-screen relative">
        <AnimatePresence mode="wait" initial={false}>
          <Suspense
            fallback={
              <div className="h-screen w-full flex items-center justify-center bg-slate-950">
                <div className="w-12 h-12 border-4 border-fuchsia-500/20 border-t-fuchsia-500 rounded-full animate-spin" />
              </div>
            }
          >
            <Routes location={location} key={location.pathname}>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />
              <Route
                path="/about"
                element={
                  <PageTransition>
                    <About />
                  </PageTransition>
                }
              />
              <Route
                path="/projects"
                element={
                  <PageTransition>
                    <Projects />
                  </PageTransition>
                }
              />
              <Route
                path="/skills"
                element={
                  <PageTransition>
                    <Skills />
                  </PageTransition>
                }
              />
              <Route
                path="/contact"
                element={
                  <PageTransition>
                    <Contact />
                  </PageTransition>
                }
              />

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
  return (
    <Router>
      <AppContent />
    </Router>
  );
}