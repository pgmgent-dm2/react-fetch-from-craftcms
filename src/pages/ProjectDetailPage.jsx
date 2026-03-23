import { useEffect, useState } from "react";
import { fetchProjectBySlug } from "../api";

export default function ProjectDetailPage({ slug, onBack }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProject() {
      setLoading(true);
      setError("");

      try {
        const detail = await fetchProjectBySlug(slug);
        setProject(detail);
      } catch (err) {
        setError(err.message || "Onbekende fout");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [slug]);

  if (loading) return <p>Laden...</p>;
  if (error) return <p className="error">Fout: {error}</p>;
  if (!project) return <p>Project niet gevonden.</p>;

  return (
    <section className="project-detail">
      <button type="button" onClick={onBack}>
        Terug
      </button>
      <h2>{project.title}</h2>
      <p>{project.slug}</p>
      {project.imageUrl ? <img src={project.imageUrl} alt={project.title} /> : <p>Geen thumbnail</p>}
    </section>
  );
}
