'use client';

import { useState, useEffect } from 'react';

/**
 * 현재 브라우저 창 너비를 반환하는 훅.
 * SSR 환경에서는 1200(desktop fallback)을 반환한다.
 */
export function useWindowWidth(): number {
  const [width, setWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200,
  );

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return width;
}
