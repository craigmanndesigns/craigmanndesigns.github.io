import { useCallback, useEffect, useState } from 'react';

type UseScrollState = {
  lastScrollTop: number;
  bodyOffset?: number;
  scrollY: number;
  scrollX: number;
  scrollDirection: 'down' | 'up' | '';
};

export default function useScroll(): UseScrollState {
  const [state, setState] = useState<UseScrollState>({
    lastScrollTop: 0,
    bodyOffset: 0,
    scrollY: 0,
    scrollX: 0,
    scrollDirection: '',
  });

  const handleScrollEvent = useCallback((e) => {
    setState((prevState) => {
      const prevLastScrollTop = prevState.lastScrollTop;
      const bodyOffset = document.body.getBoundingClientRect();

      return {
        setBodyOffset: bodyOffset,
        scrollY: -bodyOffset.top,
        scrollX: bodyOffset.left,
        scrollDirection: prevLastScrollTop > -bodyOffset.top ? 'down' : 'up',
        lastScrollTop: -bodyOffset.top,
      };
    });
  }, []);

  useEffect(() => {
    const scrollListener = (e: any) => {
      handleScrollEvent(e);
    };
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [handleScrollEvent]);

  return { ...state };
}
