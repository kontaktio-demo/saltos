import type { SVGProps } from 'react';

/**
 * SALTOS hexagonal pixel-art mascot logo (uproszczona wersja vector).
 * Inspirowany identyfikacją parku trampolin SALTOS Srebrzyńska.
 */
export function SaltosLogo({
  className,
  ...props
}: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Hexagon outline */}
      <path
        d="M32 4 L56 18 L56 46 L32 60 L8 46 L8 18 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* Pixel-art jumping figure inside */}
      <g fill="currentColor">
        <rect x="29" y="18" width="6" height="6" />
        <rect x="26" y="24" width="3" height="3" />
        <rect x="29" y="24" width="6" height="6" />
        <rect x="35" y="24" width="3" height="3" />
        <rect x="22" y="27" width="3" height="3" />
        <rect x="38" y="27" width="3" height="3" />
        <rect x="29" y="30" width="6" height="6" />
        <rect x="26" y="36" width="3" height="6" />
        <rect x="35" y="36" width="3" height="6" />
        <rect x="22" y="42" width="3" height="3" />
        <rect x="38" y="42" width="3" height="3" />
      </g>
    </svg>
  );
}
