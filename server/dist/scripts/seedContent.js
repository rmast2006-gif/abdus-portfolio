"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const SiteContent_1 = __importDefault(require("../models/SiteContent"));
const db_1 = require("../config/db");
dotenv_1.default.config();
const content = [
    // Home Page
    { page: "home", section: "hero", key: "heading", value: "I'm Abdus Samie Tahir", type: "text" },
    { page: "home", section: "hero", key: "subheading", value: "(RMAST)", type: "text" },
    { page: "home", section: "hero", key: "bio", value: "I build high-performance, interactive web applications that combine cutting-edge 3D technology with seamless user experiences.", type: "text" },
    { page: "home", section: "hero", key: "cta_primary", value: "View My Work", type: "text" },
    { page: "home", section: "hero", key: "cta_secondary", value: "Hire Me", type: "text" },
    { page: "home", section: "stats", key: "stat1_value", value: "5+", type: "text" },
    { page: "home", section: "stats", key: "stat1_label", value: "Years Experience", type: "text" },
    { page: "home", section: "stats", key: "stat2_value", value: "50+", type: "text" },
    { page: "home", section: "stats", key: "stat2_label", value: "Projects Completed", type: "text" },
    { page: "home", section: "stats", key: "stat3_value", value: "20+", type: "text" },
    { page: "home", section: "stats", key: "stat3_label", value: "Happy Clients", type: "text" },
    // About Page
    { page: "about", section: "bio", key: "name", value: "Abdus Samie Tahir", type: "text" },
    { page: "about", section: "bio", key: "role", value: "Full-Stack Developer & 3D Enthusiast", type: "text" },
    { page: "about", section: "bio", key: "paragraph1", value: "I am a passionate developer with a deep interest in creating immersive digital experiences.", type: "text" },
    { page: "about", section: "bio", key: "paragraph2", value: "With expertise in React, Three.js, and Node.js, I bridge the gap between design and technology.", type: "text" },
    { page: "about", section: "bio", key: "paragraph3", value: "My goal is to build applications that are not only functional but also visually stunning.", type: "text" },
    { page: "about", section: "bio", key: "avatar", value: "https://picsum.photos/seed/abdul/400/400", type: "image" },
    { page: "about", section: "timeline", key: "job1_year", value: "2023 - Present", type: "text" },
    { page: "about", section: "timeline", key: "job1_role", value: "Senior Developer", type: "text" },
    { page: "about", section: "timeline", key: "job1_place", value: "Tech Solutions", type: "text" },
    { page: "about", section: "timeline", key: "job1_desc", value: "Leading the frontend team in developing high-performance web apps.", type: "text" },
    { page: "about", section: "timeline", key: "job2_year", value: "2021 - 2023", type: "text" },
    { page: "about", section: "timeline", key: "job2_role", value: "Full-Stack Developer", type: "text" },
    { page: "about", section: "timeline", key: "job2_place", value: "Creative Agency", type: "text" },
    { page: "about", section: "timeline", key: "job2_desc", value: "Developed interactive 3D websites for various clients.", type: "text" },
    { page: "about", section: "timeline", key: "job3_year", value: "2019 - 2021", type: "text" },
    { page: "about", section: "timeline", key: "job3_role", value: "Junior Developer", type: "text" },
    { page: "about", section: "timeline", key: "job3_place", value: "StartUp Inc", type: "text" },
    { page: "about", section: "timeline", key: "job3_desc", value: "Assisted in building and maintaining company websites.", type: "text" },
    // Contact Page
    { page: "contact", section: "info", key: "heading", value: "Let's Start a Conversation", type: "text" },
    { page: "contact", section: "info", key: "subheading", value: "I'm always open to new opportunities and collaborations.", type: "text" },
    { page: "contact", section: "info", key: "email", value: "abdu.ssamietahir2006@gmail.com", type: "text" },
    { page: "contact", section: "info", key: "linkedin", value: "https://linkedin.com", type: "text" },
    { page: "contact", section: "info", key: "github", value: "https://github.com", type: "text" },
    { page: "contact", section: "info", key: "twitter", value: "https://twitter.com", type: "text" },
    { page: "contact", section: "availability", key: "status", value: "Available for Hire", type: "text" },
    { page: "contact", section: "availability", key: "message", value: "I'm currently looking for new projects and opportunities.", type: "text" },
    // Global (Navbar & Footer)
    { page: "global", section: "navbar", key: "name", value: "Abdus Samie Tahir", type: "text" },
    { page: "global", section: "navbar", key: "subheading", value: "(RMAST)", type: "text" },
    { page: "global", section: "navbar", key: "logo", value: "https://picsum.photos/seed/abdul/100/100", type: "image" },
    { page: "global", section: "footer", key: "bio", value: "Building digital experiences that combine technical precision with creative design. Let's build something extraordinary together.", type: "text" },
    { page: "global", section: "footer", key: "email", value: "hello@portfolio.com", type: "text" },
    { page: "global", section: "footer", key: "location", value: "San Francisco, CA", type: "text" },
    { page: "global", section: "footer", key: "availability", value: "Open for new projects", type: "text" },
];
const seedContent = async () => {
    try {
        await (0, db_1.connectDB)();
        for (const item of content) {
            await SiteContent_1.default.findOneAndUpdate({ page: item.page, section: item.section, key: item.key }, { value: item.value, type: item.type }, { upsert: true, new: true });
            console.log(`Seeded: ${item.page} - ${item.section} - ${item.key}`);
        }
        console.log("Content seeded successfully");
        process.exit(0);
    }
    catch (error) {
        console.error("Error seeding content:", error);
        process.exit(1);
    }
};
seedContent();
