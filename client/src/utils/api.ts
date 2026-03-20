import axios from "axios";

const BASE_URL = "https://abdus-portfolio-production.up.railway.app/api"; // ✅ FIXED

const api = axios.create({
  baseURL: BASE_URL,
});

const authApi = axios.create({
  baseURL: BASE_URL,
});

authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Projects
export const apiGetProjects = () => api.get("/projects");
export const apiCreateProject = (data: any) => authApi.post("/projects", data);
export const apiUpdateProject = (id: string, data: any) => authApi.put(`/projects/${id}`, data);
export const apiDeleteProject = (id: string) => authApi.delete(`/projects/${id}`);

// Contact
export const sendContact = (data: any) => api.post("/contact", data);
export const apiGetContacts = () => authApi.get("/contact");
export const apiDeleteContact = (id: string) => authApi.delete(`/contact/${id}`);

// Content
export const apiGetPageContent = (page: string) => api.get(`/content/${page}`);
export const apiUpdateContent = (data: any) => authApi.put("/content", data);

// Upload
export const apiUploadImage = (formData: FormData) =>
  authApi.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// Skills
export const apiGetSkills = () => api.get("/skills");
export const apiCreateSkill = (data: any) => authApi.post("/skills", data);
export const apiUpdateSkill = (id: string, data: any) => authApi.put(`/skills/${id}`, data);
export const apiDeleteSkill = (id: string) => authApi.delete(`/skills/${id}`);

// Auth
export const loginAdmin = (data: any) => api.post("/admin/login", data);

export default api;