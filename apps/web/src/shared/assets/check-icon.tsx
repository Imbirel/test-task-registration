import type { SVGProps } from 'react';

export function CheckIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="9"
      height="7"
      viewBox="0 0 9 7"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.20711 1.70711C8.59763 1.31658 8.59763 0.683418 8.20711 0.292893C7.81658 -0.0976311 7.18342 -0.0976311 6.79289 0.292893L3 4.08579L1.70711 2.79289C1.31658 2.40237 0.683417 2.40237 0.292893 2.79289C-0.097631 3.18342 -0.097631 3.81658 0.292893 4.20711L2.29289 6.20711C2.68342 6.59763 3.31658 6.59763 3.70711 6.20711L8.20711 1.70711Z"
        fill="white"
      />
    </svg>
  );
}
