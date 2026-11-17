import type { ReactNode } from "react";

export function SectionHeading({
  id,
  number,
  label,
  title,
  description,
  action,
}: {
  id?: string;
  number: string;
  label: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number}</span> {label}
        </p>
        <h2 id={id}>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
      {action}
    </div>
  );
}
