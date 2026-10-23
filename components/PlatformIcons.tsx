'use client';

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export function AppleLogo({ className = 'w-6 h-6', size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 5.35c.57-.69.96-1.65.85-2.61-.84.04-1.85.56-2.45 1.25-.53.6-1 1.56-.87 2.5 0 .02.02.04.04.04.94.07 1.91-.48 2.43-1.18z" />
    </svg>
  );
}

export function WindowsLogo({ className = 'w-4 h-4', size }: IconProps) {
  return (
    <svg
      viewBox="0 0 88 88"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 12.402l35.688-4.86.016 34.423-35.67.243L0 12.402z" />
      <path d="M.034 45.981l35.67.243-.016 34.423-35.67-4.86.016-29.806z" />
      <path d="M39.98 6.818L87.314 0v41.527l-47.334.332V6.818z" />
      <path d="M39.98 46.046l47.334.332V88L39.98 81.182V46.046z" />
    </svg>
  );
}
