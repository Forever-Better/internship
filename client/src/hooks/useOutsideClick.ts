import { useEffect } from 'react';

import { useLatest } from './useLatestOutsideClick';

export const useOutsideClick = (elementRef: any, handler: any, attached = true) => {
  const latestHandler = useLatest(handler);

  useEffect(() => {
    if (!attached) return;

    const handleClick = (e: MouseEvent) => {
      if (!elementRef.current) return;
      if (!elementRef.current.contains(e.target)) {
        latestHandler.current();
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [elementRef, latestHandler, attached]);
};
