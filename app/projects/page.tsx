import { projects, featuredProjects, moreProjects } from "@/content/projects";
import { ProjectsBrowser } from "@/components/projects-browser";
import { Icon } from "@/components/icon";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Projects — LLMs, NLP & robotics",
  "Explore Sudipta Nath’s university projects in language models, healthcare NLP and ROS2 robotics, alongside industry document forensics and client software.",
  "/projects",
);

export default function ProjectsPage() {
  const ordered = [
    ...featuredProjects,
    ...projects.filter((project) => !project.featured),
  ].map(({ slug, title, outcome, tags, visual, group }) => ({
    slug,
    title,
    outcome,
    tags,
    visual,
    group,
  }));
  return (
    <div className="container projects-page">
      <header className="page-hero">
        <p className="eyebrow">
          Selected engineering / University · Industry · Client
        </p>
        <h1>
          The work.
          <br />
          <span>And what is behind it.</span>
        </h1>
        <p>
          University projects in LLMs, applied NLP and physical robotics lead
          the selection. Industry and client work show how that engineering
          extends into other settings.
        </p>
      </header>
      <ProjectsBrowser projects={ordered} />
      <section
        className="project-research-more"
        aria-labelledby="project-research-title"
      >
        <div className="subsection-heading">
          <h2 id="project-research-title">Further research & explorations.</h2>
        </div>
        <div className="more-projects">
          {moreProjects.map((project) => (
            <article className="small-project" key={project.title}>
              <div className="small-project-top">
                <p className="eyebrow">{project.category}</p>
                {project.status && (
                  <span className="status-tag">{project.status}</span>
                )}
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a
                className="text-link"
                href={project.href}
                target="_blank"
                rel="noreferrer"
              >
                {project.linkLabel}
                <Icon name="external" />
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
