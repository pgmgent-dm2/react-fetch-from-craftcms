export default function ProjectCard({ project, onOpen }) {
  return (
    <li className="project-item">
      <h2>{project.title}</h2>
      <p>{project.slug}</p>
      {project.imageUrl ? <img src={project.imageUrl} alt={project.title} /> : <p>Geen thumbnail</p>}
      <p>
        <a
          href={`/projects/${project.slug}`}
          onClick={(event) => {
            event.preventDefault();
            onOpen(project.slug);
          }}
        >
          Bekijk detail
        </a>
      </p>
    </li>
  );
}
