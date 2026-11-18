import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import { profile } from "@/content/profile";
import { ProjectVisual } from "@/components/project-visual";
import { Architecture } from "@/components/architecture";
import { Icon } from "@/components/icon";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) return {};
  return pageMetadata(
    project.title,
    project.outcome,
    `/projects/${project.slug}`,
  );
}

const sections = [
  { id: "problem", title: "Problem" },
  { id: "role", title: "My Role" },
  { id: "architecture", title: "Architecture" },
  { id: "debugging", title: "Engineering Decisions" },
  { id: "results", title: "Results" },
  { id: "stack", title: "Stack" },
  { id: "links", title: "Links" },
];

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <article className="case-study container">
      <Link className="back-link" href="/projects">
        <span aria-hidden="true">←</span> All projects
      </Link>
      <header className="case-header">
        <p className="eyebrow">
          Case study {project.number} / {project.category}
        </p>
        <h1>{project.title}</h1>
        <p className="case-subtitle">{project.shortTitle}</p>
        <p className="case-outcome">{project.outcome}</p>
        <ul className="tag-list" aria-label="Project technologies">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </header>
      <div className="case-cover">
        <ProjectVisual variant={project.visual} />
      </div>
      <div className="case-layout">
        <aside className="case-toc">
          <p className="eyebrow">In this case study</p>
          <nav aria-label="Case study sections">
            {sections.map((section, index) => (
              <a key={section.id} href={`#${section.id}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {project.group === "Client" && section.id === "role"
                  ? "My Role & AI Delivery"
                  : project.group === "Client" && section.id === "stack"
                    ? "Tools & Capabilities"
                    : section.title}
              </a>
            ))}
          </nav>
        </aside>
        <div className="case-body">
          <section id="problem">
            <p className="eyebrow">01 / Context</p>
            <h2>Problem</h2>
            {project.problem.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <section id="role">
            <p className="eyebrow">02 / Ownership</p>
            <h2>{project.group === "Client" ? "My Role & AI Delivery" : "My Role"}</h2>
            {project.role.map((paragraph) => (
              <p
                className={paragraph.startsWith("TODO:") ? "todo-note" : ""}
                key={paragraph}
              >
                {paragraph}
              </p>
            ))}
          </section>
          <section id="architecture">
            <p className="eyebrow">03 / System design</p>
            <h2>Architecture</h2>
            <Architecture
              steps={project.architecture}
              note={project.architectureNote}
            />
          </section>
          <section id="debugging">
            <p className="eyebrow">04 / Engineering decisions</p>
            <h2>
              {project.challenge.confirmed
                ? "What Went Wrong & How I Fixed It"
                : "Engineering Decisions"}
            </h2>
            <div className="engineering-callout">
              <h3>{project.challenge.title}</h3>
              {project.challenge.paragraphs.map((paragraph) => (
                <p
                  className={paragraph.startsWith("TODO:") ? "todo-note" : ""}
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
          <section id="results">
            <p className="eyebrow">05 / Evidence</p>
            <h2>Results</h2>
            <div className="result-grid">
              {project.results.map((result) => (
                <div key={result.label}>
                  <strong>{result.value}</strong>
                  <span>{result.label}</span>
                </div>
              ))}
            </div>
            <p className="result-note">{project.resultNote}</p>
          </section>
          <section id="stack">
            <p className="eyebrow">06 / Tools & capabilities</p>
            <h2>{project.group === "Client" ? "Tools & Capabilities" : "Stack"}</h2>
            <ul className="tag-list stack-list">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </section>
          <section id="links">
            <p className="eyebrow">07 / Explore further</p>
            <h2>Links</h2>
            <div className="case-links">
              {project.links.map((link) => (
                <a
                  className="button"
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                  <Icon name="external" />
                </a>
              ))}
              <a
                className="text-link"
                href={`mailto:${profile.email}?subject=${encodeURIComponent(`About ${project.title}`)}`}
              >
                Discuss this project
                <Icon name="arrow" />
              </a>
            </div>
            {project.linkNote && (
              <p
                className={
                  project.linkNote.startsWith("TODO:")
                    ? "todo-note"
                    : "fine-print"
                }
              >
                {project.linkNote}
              </p>
            )}
          </section>
        </div>
      </div>
      <Link className="next-project" href={`/projects/${next.slug}`}>
        <div>
          <span className="eyebrow">Next case study</span>
          <h2>{next.title}</h2>
        </div>
        <Icon name="arrow" />
      </Link>
    </article>
  );
}
