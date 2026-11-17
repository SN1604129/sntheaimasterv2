import type { ArchitectureStep } from "@/content/projects";
import { Icon } from "./icon";

export function Architecture({
  steps,
  note,
}: {
  steps: ArchitectureStep[];
  note: string;
}) {
  return (
    <figure className="architecture-figure">
      <ol className="architecture-flow">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span className="architecture-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong>{step.title}</strong>
            <p>{step.detail}</p>
            {index < steps.length - 1 && (
              <Icon name="arrow" className="architecture-arrow" />
            )}
          </li>
        ))}
      </ol>
      <figcaption>{note}</figcaption>
    </figure>
  );
}
