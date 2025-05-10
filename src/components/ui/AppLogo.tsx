import type { SVGProps } from 'react';

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 10h-4V8a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H4l-1.33 4.67A documentos .5.5 0 0 0 3 15.5V18a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2.5a.5.5 0 0 0-.33-.46L20 10z" />
      <circle cx="7" cy="15" r="2" />
      <circle cx="17" cy="15" r="2" />
      <path d="M8 10V5" />
      <path d="M16 10V5" />
    </svg>
  );
}
