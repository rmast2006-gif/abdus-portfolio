import axios from "axios";

const BASE_URL = "https://abdus-portfolio-production.up.railway.app/api";

const api = axios.create({
  baseURL: BASE_URL,
});

const authApi = axios.create({
  baseURL: BASE_URL,
});

// ✅ Attach token
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =======================
// 🔥 PROJECTS (FIXED)
// =======================

// GET
export const apiGetProjects = () => api.get("/projects");

// CREATE (FIXED for file upload)
export const apiCreateProject = (formData: FormData) =>
  authApi.post("/projects", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// UPDATE (FIXED for file upload)
export const apiUpdateProject = (id: string, formData: FormData) =>
  authApi.put(`/projects/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// DELETE
export const apiDeleteProject = (id: string) =>
  authApi.delete(`/projects/${id}`);

// =======================
// CONTACT
// =======================

export const sendContact = (data: any) => api.post("/contact", data);
export const apiGetContacts = () => authApi.get("/contact");
export const apiDeleteContact = (id: string) =>
  authApi.delete(`/contact/${id}`);

// =======================
// CONTENT
// =======================

export const apiGetPageContent = (page: string) =>
  api.get(`/content/${page}`);

export const apiUpdateContent = (data: any) =>
  authApi.put("/content", data);

// =======================
// UPLOAD (ALREADY OK)
// =======================

export const apiUploadImage = (formData: FormData) =>
  authApi.post("/upload", formData);

// =======================
// SKILLS
// =======================

export const apiGetSkills = () => api.get("/skills");

export const apiCreateSkill = (data: any) =>
  authApi.post("/skills", data);

export const apiUpdateSkill = (id: string, data: any) =>
  authApi.put(`/skills/${id}`, data);

export const apiDeleteSkill = (id: string) =>
  authApi.delete(`/skills/${id}`);

// =======================
// AUTH
// =======================

export const loginAdmin = (data: any) =>
  api.post("/admin/login", data);

export default api;