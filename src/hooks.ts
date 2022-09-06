import React from 'react';
import { clearTimeout, setTimeout } from 'timers';

export const useDeferredCallback = (
  mutation: VoidFunction,
  delayInMs = 500,
) => {
  const timerRef = React.useRef<NodeJS.Timeout | null>();

  return () => {
    let currentTimer = timerRef.current;
    if (currentTimer) {
      console.debug('cleared timer');
      clearTimeout(currentTimer);
    }

    currentTimer = setTimeout(() => mutation(), delayInMs);
    timerRef.current = currentTimer;
    console.debug('setted up new timer');
  };
};
