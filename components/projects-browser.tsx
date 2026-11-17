"use client";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/content/projects";
import { ProjectVisual } from "./project-visual";
import { Icon } from "./icon";

export type ProjectSummary = Pick<
  Project,
  "slug" | "title" | "outcome" | "tags" | "visual" | "group"
>;

export function ProjectsBrowser({ projects }: { projects: ProjectSummary[] }) {
  const [group, setGroup] = useState("All work");
  const filtered = projects.filter(
    (project) => group === "All work" || project.group === group,
  );
  return (
    <>
      <div className="project-index-tools">
        <div
          className="topic-filters"
          role="group"
          aria-label="Filter projects"
        >
          {["All work", "University", "Industry", "Client"].map((option) => (
            <button
              type="button"
              key={option}
              aria-pressed={group === option}
              onClick={() => setGroup(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <p className="article-count" role="status">
          {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        </p>
      </div>
      <div className="project-index-grid">
        {filtered.map((project) => (
          <article key={project.slug}>
            <Link
              className="project-image-link"
              href={`/projects/${project.slug}`}
              tabIndex={-1}
              aria-hidden="true"
            >
              <ProjectVisual variant={project.visual} />
            </Link>
            <div className="featured-copy">
              <p className="eyebrow">{project.group}</p>
              <h2>
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              </h2>
              <p className="project-outcome">{project.outcome}</p>
              <ul className="tag-list" aria-label="Technologies">
                {project.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <Link href={`/projects/${project.slug}`} className="text-link">
                Explore case study
                <Icon name="arrow" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
