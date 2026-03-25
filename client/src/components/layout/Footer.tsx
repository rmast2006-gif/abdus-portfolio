import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Code2, Heart } from "lucide-react";
import { SOCIALS, NAV_LINKS } from "../../utils/constants.ts";
import { apiGetPageContent } from "../../utils/api.ts";

export const Footer = () => {
  const [content, setContent] = useState<any>({});

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
        console.error("Error fetching footer content:", error);
      }
    };
    fetchContent();
  }, []);

  const navbar = content.navbar || {
    name: "Abdus Samie Tahir",
    subheading: "(RMAST)",
    logo: "https://picsum.photos/seed/abdul/100/100"
  };

  const footer = content.footer || {
    bio: "Building digital experiences that combine technical precision with creative design. Let's build something extraordinary together.",
    email: "hello@portfolio.com",
    location: "San Francisco, CA",
    availability: "Open for new projects"
  };

  return (
    <footer className="relative bg-[#021a12] border-t border-green-500/10 pt-20 pb-10 overflow-hidden">

      {/* 🔥 PREMIUM BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-400/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 relative z-10">

        {/* LEFT SECTION */}
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-3 mb-6 group">

            {/* LOGO */}
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-green-500/40 group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-400/40 hover:scale-105">
              <img 
                src={navbar.logo} 
                alt={navbar.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* NAME */}
            <div className="flex flex-col">
              <span className="text-lg font-bold text-white tracking-tight leading-none">
                {navbar.name}
              </span>

              {/* PREMIUM SUBHEADING */}
              <span className="text-[10px] font-bold text-green-400 tracking-[0.25em] mt-1 drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]">
                {navbar.subheading}
              </span>
            </div>
          </Link>

          {/* BIO */}
          <p className="text-slate-400 max-w-md text-lg leading-relaxed mb-8">
            {footer.bio}
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-3 bg-slate-900/60 backdrop-blur-xl rounded-full text-slate-400 hover:text-white transition-all duration-300 border border-white/5 hover:-translate-y-1 group overflow-hidden"
              >
                {/* GLOW EFFECT */}
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl bg-green-500/30 transition-all duration-300" />

                {/* ICON */}
                <span className="relative z-10">
                  {social.name === "GitHub" && <Github size={20} />}
                  {social.name === "LinkedIn" && <Linkedin size={20} />}
                  {social.name === "Twitter" && <Twitter size={20} />}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-slate-400 hover:text-green-400 transition-all duration-300 text-sm font-medium relative group"
                >
                  <span className="relative z-10">{link.name}</span>

                  {/* UNDERLINE EFFECT */}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-400 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">
            Contact Info
          </h4>
          <ul className="flex flex-col gap-4">

            <li className="text-slate-400 text-sm">
              <span className="block text-green-400 font-medium mb-1">
                Email
              </span>
              {footer.email}
            </li>

            <li className="text-slate-400 text-sm">
              <span className="block text-green-400 font-medium mb-1">
                Location
              </span>
              {footer.location}
            </li>

            <li className="text-slate-400 text-sm">
              <span className="block text-green-400 font-medium mb-1">
                Availability
              </span>
              {footer.availability}
            </li>

          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 border-t border-green-500/10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">

        <p className="text-slate-500 text-sm font-mono uppercase tracking-widest">
          © {new Date().getFullYear()} {navbar.name}. ALL RIGHTS RESERVED.
        </p>

        <p className="text-slate-500 text-sm flex items-center gap-1 font-mono">
          MADE WITH 
          <Heart size={14} className="text-green-500 fill-green-500 drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]" /> 
          BY CREATIVE DEV
        </p>

      </div>
    </footer>
  );
};