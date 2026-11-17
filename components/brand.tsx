export const logoSource = "/brand/sn-the-ai-master-8e01cfc7.png";

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`brand-symbol ${className}`}
      viewBox="116 156 168 168"
      width="44"
      height="44"
      aria-hidden="true"
    >
      <image href={logoSource} width="720" height="480" />
    </svg>
  );
}

export function Brand() {
  return (
    <span className="master-brand">
      <svg
        viewBox="108 148 505 184"
        width="220"
        height="80"
        role="img"
        aria-label="SN The AI Master — Sudipta Nath, AI Engineer"
      >
        <image href={logoSource} width="720" height="480" />
      </svg>
    </span>
  );
}
