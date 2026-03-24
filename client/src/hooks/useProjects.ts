import { useState, useEffect } from "react";
import { apiGetProjects } from "../utils/api.ts";
import { Project } from "../types.ts";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const { data } = await apiGetProjects();

        // ✅ ONLY real data (NO fallback)
        setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("❌ Failed to fetch projects:", err);

        // ❌ NO fallback
        setProjects([]);
        setError("Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    getProjects();
  }, []);

  return { projects, loading, error, setProjects };
};