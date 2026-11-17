import resume from "@/content/resume.json";
import { profile } from "@/content/profile";
import { Icon } from "@/components/icon";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Resume",
  "Download Sudipta Nath’s resume: AI engineering experience at Truuth, applied LLM projects, research and education in Sydney.",
  "/resume",
);

export default function ResumePage() {
  return (
    <div className="container resume-page">
      <header className="page-hero">
        <p className="eyebrow">Experience / Resume</p>
        <h1>
          {resume.name}
          <br />
          <span>{resume.title}.</span>
        </h1>
        <p>{resume.summary}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={profile.resume} download>
            Download Resume <Icon name="download" />
          </a>
          <a
            className="button"
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
          >
            View PDF <Icon name="external" />
          </a>
        </div>
      </header>
      <div className="resume-content">
        <section>
          <h2>Experience</h2>
          {resume.experience.map((item) => (
            <article key={item.role}>
              <p className="eyebrow">{item.date}</p>
              <h3>
                {item.role} · {item.organisation}
              </h3>
              <ul>
                {item.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
        <section>
          <h2>Education</h2>
          {resume.education.map((item) => (
            <article key={item.degree}>
              <p className="eyebrow">{item.date}</p>
              <h3>{item.degree}</h3>
              <p>{item.institution}</p>
            </article>
          ))}
        </section>
        <section>
          <h2>Selected projects</h2>
          {resume.projects.map((project) => (
            <article key={project.name}>
              <h3>{project.name}</h3>
              <p>{project.detail}</p>
              {project.link && (
                <a
                  className="text-link"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  View project <Icon name="external" />
                </a>
              )}
            </article>
          ))}
        </section>
        <section>
          <h2>Skills</h2>
          <ul className="tag-list">
            {resume.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
