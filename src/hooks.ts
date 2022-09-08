import React from 'react';
import { clearTimeout, setTimeout } from 'timers';

export const useDeferredCallback = (
  callback: (...args: any[]) => void,
  delayInMs = 500,
) => {
  const timerRef = React.useRef<NodeJS.Timeout | null>();

  return () => {
    let currentTimer = timerRef.current;
    if (currentTimer) clearTimeout(currentTimer);

    currentTimer = setTimeout(() => callback(), delayInMs);
    timerRef.current = currentTimer;
  };
};
