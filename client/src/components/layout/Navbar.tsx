import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Code2 } from "lucide-react";
import { NAV_LINKS } from "../../utils/constants.ts";
import { apiGetPageContent } from "../../utils/api.ts";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [content, setContent] = useState<any>({});
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await apiGetPageContent("global");
        const transformed = response.data.reduce((acc: any, item: any) => {
          if (!acc[item.section]) acc[item.section] = {};
          acc[item.section][item.key] = item.value;
          return acc;
        }, {});
        setContent(transformed);
      } catch (error) {
        console.error("Error fetching navbar content:", error);
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navbar = content.navbar || {
    name: "Abdus Samie Tahir",
    subheading: "(RMAST)",
    logo: "https://picsum.photos/seed/abdul/100/100"
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[5000] transition-all duration-500 ${
        scrolled
          ? "bg-[#021a12]/80 backdrop-blur-2xl border-b border-green-500/10 py-4 shadow-lg shadow-green-900/10"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

        {/* LOGO + NAME */}
        <div className="flex items-center gap-3 group">
          <Link
            to="/"
            className="w-10 h-10 rounded-xl overflow-hidden border-2 border-green-500/40 group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-400/40 hover:scale-105"
          >
            <img
              src={navbar.logo}
              alt={navbar.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </Link>

          <Link to="/admin/login" className="flex flex-col">
            <span className="text-lg font-bold text-white tracking-tight leading-none">
              {navbar.name}
            </span>

            {/* PREMIUM GREEN SUBHEADING */}
            <span className="text-[10px] font-bold text-green-400 tracking-[0.25em] mt-1 drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]">
              {navbar.subheading}
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? "text-green-400"
                  : "text-slate-400 hover:text-green-300"
              }`}
            >
              {/* TEXT */}
              <span className="relative z-10">{link.name}</span>

              {/* PREMIUM UNDERLINE EFFECT */}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300 ${
                  location.pathname === link.path
                    ? "w-full opacity-100"
                    : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                }`}
              />
            </Link>
          ))}

          {/* PREMIUM GREEN BUTTON */}
          <Link
            to="/contact"
            className="relative px-6 py-2.5 text-white text-sm font-bold rounded-full transition-all duration-300 overflow-hidden group"
          >
            {/* BACKGROUND */}
            <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 group-hover:from-green-500 group-hover:to-green-600 transition-all duration-300" />

            {/* GLOW */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl bg-green-500/40 transition-all duration-300" />

            {/* TEXT */}
            <span className="relative z-10">Hire Me</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-white hover:bg-green-500/10 rounded-xl transition-all duration-300 hover:scale-105"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#021a12]/95 backdrop-blur-2xl border-b border-green-500/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-2xl font-bold transition-all duration-300 ${
                    location.pathname === link.path
                      ? "text-green-400"
                      : "text-slate-400 hover:text-green-300"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {/* PREMIUM MOBILE BUTTON */}
              <Link
                to="/contact"
                className="relative w-full py-4 text-white text-center font-bold rounded-2xl overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 group-hover:from-green-500 group-hover:to-green-600 transition-all duration-300" />
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl bg-green-500/40 transition-all duration-300" />
                <span className="relative z-10">Hire Me</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};