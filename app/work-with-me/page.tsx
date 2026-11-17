import Link from "next/link";
import { workPage as copy } from "@/content/pages";
import { services, process, enquiry } from "@/content/services";
import { profile } from "@/content/profile";
import { EnquiryForm } from "@/components/enquiry-form";
import { ProjectVisual } from "@/components/project-visual";
import { Icon } from "@/components/icon";
import { SectionHeading } from "@/components/section-heading";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Work with me",
  "AI-powered websites, custom AI assistants, agents and scoped prototypes for businesses. Work directly with Sudipta Nath, an AI Engineer in Sydney.",
  "/work-with-me",
);

export default async function WorkWithMePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const requested = (await searchParams).service;
  const initialService =
    typeof requested === "string" && enquiry.serviceOptions.includes(requested)
      ? requested
      : "";

  return (
    <>
      <section className="page-hero container">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>
          {copy.headline.lead}
          <br />
          <span>{copy.headline.accent}</span>
        </h1>
        <p>{copy.introduction}</p>
        <a className="button button-primary" href="#enquiry">
          Tell me about your project <Icon name="arrow" />
        </a>
        <span className="hero-side-note">{copy.note}</span>
      </section>
      <section
        className="container section services-page"
        aria-labelledby="offer-heading"
      >
        <SectionHeading
          id="offer-heading"
          number="01"
          label={copy.services.label}
          title={copy.services.title}
        />
        <div className="service-detail-grid">
          {services.map((service) => (
            <article key={service.title} className="service-detail">
              <div className="service-number">
                <span>{service.number}</span>
                <Icon name={service.icon} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <h4>What you get</h4>
              <ul>
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable}>
                    <Icon name="check" />
                    {deliverable}
                  </li>
                ))}
              </ul>
              <Link
                className="text-link"
                href={`/work-with-me?service=${encodeURIComponent(service.formValue)}#enquiry`}
              >
                Start a project <Icon name="arrow" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="process-section">
        <div className="container section">
          <SectionHeading
            number="02"
            label={copy.process.label}
            title={copy.process.title}
          />
          <ol className="process-grid">
            {process.map((step, index) => (
              <li key={step.title}>
                <span className="process-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="container section client-example">
        <div>
          <p className="eyebrow">A real business example</p>
          <h2>
            {copy.example.lead}
            <br />
            {copy.example.end}
          </h2>
          <h3>{copy.example.title}</h3>
          <p>{copy.example.description}</p>
          <div className="client-example-links">
            <Link href="/projects/stix-eatery" className="text-link">
              Read case study <Icon name="arrow" />
            </Link>
            <a
              href="https://stixeatery.com.au"
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Visit Stix Eatery <Icon name="external" />
            </a>
          </div>
        </div>
        <ProjectVisual variant="stix" />
      </section>
      <section
        className="enquiry-section"
        id="enquiry"
        aria-labelledby="enquiry-heading"
      >
        <div className="container enquiry-layout">
          <div className="enquiry-intro">
            <p className="eyebrow">03 / Start a conversation</p>
            <h2 id="enquiry-heading">
              {copy.enquiry.lead}
              <br />
              {copy.enquiry.end}
            </h2>
            <p>{copy.enquiry.description}</p>
            <p>{copy.enquiry.note}</p>
            <div className="enquiry-contact">
              <Icon name="mail" />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
            <p className="fine-print">{copy.enquiry.budgetNote}</p>
          </div>
          <EnquiryForm initialService={initialService} />
        </div>
      </section>
    </>
  );
}
