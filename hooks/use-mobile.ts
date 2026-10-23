import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const checkIsMobile = () => {
      setIsMobile(mql.matches);
    };
    mql.addEventListener('change', checkIsMobile);
    const raf = requestAnimationFrame(checkIsMobile);
    return () => {
      cancelAnimationFrame(raf);
      mql.removeEventListener('change', checkIsMobile);
    };
  }, []);

  return isMobile;
}
