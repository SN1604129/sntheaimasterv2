import { useId } from "react";

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
  const id = useId();
  return (
    <span className="master-brand">
      <svg
        viewBox="108 148 505 184"
        width="220"
        height="80"
        role="img"
        aria-label="SN The AI Master — Sudipta Nath, AI Engineer"
      >
        <defs>
          <clipPath id={`${id}-mark`}>
            <rect x="116" y="156" width="168" height="168" rx="40" />
          </clipPath>
          <filter id={`${id}-lettering`} colorInterpolationFilters="sRGB">
            <feColorMatrix type="luminanceToAlpha" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="-1.14" intercept="1.14" />
            </feComponentTransfer>
          </filter>
          <mask
            id={`${id}-wordmark`}
            maskUnits="userSpaceOnUse"
            x="308"
            y="200"
            width="305"
            height="84"
            style={{ maskType: "alpha" }}
          >
            <image href={logoSource} width="720" height="480" filter={`url(#${id}-lettering)`} />
          </mask>
        </defs>
        <image href={logoSource} width="720" height="480" clipPath={`url(#${id}-mark)`} />
        <rect x="308" y="200" width="305" height="84" fill="currentColor" mask={`url(#${id}-wordmark)`} />
      </svg>
    </span>
  );
}
