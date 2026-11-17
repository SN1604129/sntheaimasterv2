import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icon";
import { ProjectVisual } from "@/components/project-visual";
import { SectionHeading } from "@/components/section-heading";
import { home } from "@/content/pages";
import { profile, skills, timeline } from "@/content/profile";
import {
  featuredProjects,
  industryProject,
  moreProjects,
} from "@/content/projects";
import { publications, research } from "@/content/research";
import { listedPosts } from "@/content/blog";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "AI Engineer in Sydney",
  "Sudipta Nath builds LLM, RAG and multimodal systems. Explore a tested document-forensics pipeline, a live cafe platform, multilingual AI and research.",
  "/",
);

export default function HomePage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: profile.url,
    jobTitle: profile.role,
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sydney",
      addressCountry: "AU",
    },
    sameAs: [profile.github, ...(profile.linkedin ? [profile.linkedin] : [])],
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "Macquarie University" },
      {
        "@type": "CollegeOrUniversity",
        name: "Chittagong University of Engineering and Technology (CUET)",
      },
    ],
    knowsAbout: [
      "Large language models",
      "Retrieval-augmented generation",
      "Multimodal AI",
      "Machine learning",
      "Python",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
      <section
        className="hero recruiter-hero container"
        aria-labelledby="hero-heading"
      >
        <div className="hero-topline">
          <p className="availability">
            <span />
            Sydney · {profile.availability}
          </p>
          <span className="hero-coordinate">33.87° S / 151.21° E</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{home.eyebrow}</p>
            <h1 id="hero-heading">
              <span className="hero-role">{home.headline.lead}</span>
              <span>{home.headline.accent}</span>
            </h1>
            <p className="hero-description">{home.description}</p>
            <p className="hero-qualification">
              Master of IT (AI) · Macquarie University · Completed July 2026
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/#projects">
                View Projects <Icon name="arrow" />
              </Link>
              <a className="button" href={profile.resume} download>
                Download Resume <Icon name="download" />
              </a>
            </div>
            <Link className="hero-client-link" href="/work-with-me">
              Have a project in mind? Work with me <Icon name="external" />
            </Link>
          </div>
          <div className="hero-evidence">
            <ProjectVisual variant="forensics" hero />
            <p className="hero-visual-note">
              <span className="tiny-cross">+</span> Model behaviour is a system
              problem.
              <br />
              <span>Inputs. Decision logic. Evaluation.</span>
            </p>
          </div>
        </div>
        <div className="hero-proof">
          <span className="proof-label">
            <Icon name="check" />
            EVIDENCE, UP FRONT
          </span>
          <div>
            <p>{profile.proof}</p>
            <span>{profile.proofNote}</span>
          </div>
          <Link
            href="/projects/truuth-document-forensics"
            aria-label="Read the Truuth document-forensics case study"
          >
            <Icon name="external" />
          </Link>
        </div>
      </section>

      <section
        className="section container"
        id="projects"
        aria-labelledby="projects-heading"
      >
        <SectionHeading
          id="projects-heading"
          number="01"
          label={home.selected.label}
          title={home.selected.title}
          description={home.selected.description}
          action={
            <Link className="text-link" href="/projects">
              All projects <Icon name="arrow" />
            </Link>
          }
        />
        <div className="featured-grid">
          {featuredProjects.map((project, index) => (
            <article
              className={`featured-project ${index === 0 ? "featured-lead" : ""} reveal`}
              key={project.slug}
            >
              <Link
                className="project-image-link"
                href={`/projects/${project.slug}`}
                tabIndex={-1}
                aria-hidden="true"
              >
                <ProjectVisual variant={project.visual} />
              </Link>
              <div className="featured-copy">
                <p className="project-category">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {project.category}
                </p>
                <h3>
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>
                <p className="project-outcome">{project.outcome}</p>
                <p className="project-summary">{project.summary}</p>
                <ul
                  className="tag-list"
                  aria-label={`${project.title} technologies`}
                >
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <Link className="text-link" href={`/projects/${project.slug}`}>
                  Read case study <Icon name="arrow" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="container industry-proof"
        aria-labelledby="industry-proof-heading"
      >
        <div>
          <p className="eyebrow">Industry experience / Truuth</p>
          <h2 id="industry-proof-heading">
            When the model missed it,
            <br />
            <span>I investigated why.</span>
          </h2>
          <p>
            The vision encoder diluted small tampering signals. I changed the
            inputs and decision logic, then benchmarked the pipeline across 12
            versions.
          </p>
          <Link
            className="text-link"
            href={`/projects/${industryProject.slug}`}
          >
            Read the engineering story <Icon name="arrow" />
          </Link>
        </div>
        <div className="industry-results">
          <div>
            <strong>40/40</strong>
            <span>modified documents detected</span>
          </div>
          <div>
            <strong>0</strong>
            <span>false positives in final evaluation</span>
          </div>
          <p>{profile.proofNote}</p>
        </div>
      </section>

      <section
        className="section section-tight container"
        aria-labelledby="more-heading"
      >
        <div className="subsection-heading">
          <h2 id="more-heading">{home.more.title}</h2>
          <span>{home.more.description}</span>
        </div>
        <div className="more-projects">
          {moreProjects.map((project) => (
            <article className="small-project reveal" key={project.title}>
              <div className="small-project-top">
                <p className="eyebrow">{project.category}</p>
                {project.status && (
                  <span className="status-tag">{project.status}</span>
                )}
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="small-project-bottom">
                <ul className="inline-tags" aria-label="Technologies">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.linkLabel} for ${project.title}`}
                >
                  {project.linkLabel}
                  <Icon name="external" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="research-section"
        id="research"
        aria-labelledby="research-heading"
      >
        <div className="section container">
          <SectionHeading
            id="research-heading"
            number="02"
            label={home.research.label}
            title={home.research.title}
            description={home.research.description}
          />
          <div className="research-layout">
            <article className="research-feature">
              <p className="eyebrow">Research project</p>
              <h3>
                {research.title}
                <span>{research.expansion}</span>
              </h3>
              <p>{research.description}</p>
              <div className="research-methods">
                <span>Neurosymbolic reasoning</span>
                <span>LTL / SAT verification</span>
              </div>
              <p className="research-supervision">{research.supervision}</p>
              <p className="fine-print">{research.note}</p>
            </article>
            <div className="publications">
              <p className="eyebrow">Published work</p>
              {publications.map((publication) => (
                <article className="publication" key={publication.year}>
                  <span className="publication-year">{publication.year}</span>
                  <div>
                    <p className="publication-venue">{publication.publisher}</p>
                    <h3>
                      {publication.href ? (
                        <a
                          href={publication.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {publication.title} <Icon name="external" />
                        </a>
                      ) : (
                        publication.title
                      )}
                    </h3>
                    <p>{publication.description}</p>
                  </div>
                </article>
              ))}
              <p className="fine-print publication-footnote">
                Descriptive paper titles. TODO: Exact citations and DOI links.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section container"
        id="about"
        aria-labelledby="about-heading"
      >
        <SectionHeading
          id="about-heading"
          number="03"
          label={home.about.label}
          title={home.about.title}
        />
        <div className="about-layout">
          <figure className="about-portrait">
            <Image
              src="/images/sudipta-nath-about.jpeg"
              alt="Sudipta Nath outdoors wearing headphones"
              width={2316}
              height={3088}
              sizes="(max-width: 320px) calc(100vw - 40px), 280px"
            />
          </figure>
          <div className="about-copy">
            <p className="about-lead">{profile.introduction}</p>
            <p>{profile.philosophy}</p>
            <a className="text-link" href={profile.resume} download>
              Download my resume <Icon name="download" />
            </a>
            <div className="skills-groups">
              {skills.map((group) => (
                <div key={group.label}>
                  <h3>{group.label}</h3>
                  <p>{group.items.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
          <ol className="timeline">
            {timeline.map((item) => (
              <li key={item.title}>
                <span className="timeline-dot" />
                <p className="timeline-date">{item.date}</p>
                <h3>{item.title}</h3>
                <p className="timeline-org">{item.organisation}</p>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="container home-journal"
        aria-labelledby="home-journal-title"
      >
        <div>
          <p className="eyebrow">The blog / Engineering notes</p>
          <h2 id="home-journal-title">
            What happens
            <br />
            <span>inside the build.</span>
          </h2>
          <p>
            Practical notes on the experiments, decisions and failures behind AI
            systems.
          </p>
          <Link href="/blog" className="text-link">
            Explore the blog <Icon name="arrow" />
          </Link>
        </div>
        <div>
          {listedPosts.slice(0, 2).map((post) => (
            <article key={post.slug}>
              {post.image && (
                <Image
                  className="home-journal-cover"
                  src={post.image.src}
                  alt={post.image.alt}
                  width={post.image.width}
                  height={post.image.height}
                  sizes="(max-width: 800px) calc(100vw - 40px), 550px"
                />
              )}
              <div className="post-meta">
                <span>{post.category}</span>
                <span>{post.readingTime}</span>
                {!post.published && (
                  <span className="status-tag">Draft preview</span>
                )}
              </div>
              <h3>
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>{post.description}</p>
              <Link href={`/blog/${post.slug}`} className="text-link">
                {post.published ? "Read article" : "Preview draft"}
                <Icon name="arrow" />
              </Link>
            </article>
          ))}
          {listedPosts.length === 0 && (
            <div className="journal-coming">
              <Icon name="rss" />
              <h3>New field notes are on the way.</h3>
              <p>Follow the feed for new articles as they are published.</p>
              <a href="/blog/feed.xml" className="text-link">
                Follow via RSS <Icon name="external" />
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="services-teaser" aria-labelledby="services-heading">
        <div className="section container">
          <SectionHeading
            id="services-heading"
            number="04"
            label={home.services.label}
            title={home.services.title}
            description={home.services.description}
            action={
              <Link className="text-link" href="/work-with-me">
                Explore services <Icon name="arrow" />
              </Link>
            }
          />
          <div className="service-teaser-grid">
            {services.map((service) => (
              <article key={service.title}>
                <Icon name={service.icon} />
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
                <Link
                  href={`/work-with-me?service=${encodeURIComponent(service.formValue)}#enquiry`}
                  className="text-link"
                >
                  Start a project <Icon name="arrow" />
                </Link>
              </article>
            ))}
          </div>
          <p className="client-proof-line">
            <span className="node-indicator" />
            Real business, real platform:{" "}
            <Link href="/projects/stix-eatery">
              Stix Eatery, Miranda NSW <Icon name="external" />
            </Link>
          </p>
        </div>
      </section>

      <section
        className="contact-strip container"
        aria-labelledby="contact-heading"
      >
        <div>
          <p className="eyebrow">Let’s talk</p>
          <h2 id="contact-heading">
            {home.contact.lead}
            <br />
            {home.contact.end}
          </h2>
          <p>{home.contact.description}</p>
        </div>
        <a className="contact-email" href={`mailto:${profile.email}`}>
          <span>Say hello</span>
          {profile.email}
          <Icon name="external" />
        </a>
      </section>
    </>
  );
}
