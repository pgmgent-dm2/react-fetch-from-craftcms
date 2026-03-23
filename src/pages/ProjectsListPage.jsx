import { useEffect, useState } from "react";
import projectsData from "../data/projects.json";
import ProjectCard from "../components/ProjectCard";

export default function ProjectsListPage({ onOpenProject }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      setError("");

      try {
        // TODO: Replace with fetchProjects() from api.js when connected to Craft CMS
        // const list = await fetchProjects();
        const list = projectsData;
        setProjects(list);
      } catch (err) {
        setError(err.message || "Onbekende fout");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) return <p>Laden...</p>;
  if (error) return <p className="error">Fout: {error}</p>;

  return (
    <ul className="project-list">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onOpen={onOpenProject} />
      ))}
    </ul>
  );
}
