import React from 'react';

export const autoCollapseSize = 600;

export function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState<number>(0);

  React.useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);

  return windowSize;
}