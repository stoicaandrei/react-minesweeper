import React, { useEffect, useRef } from 'react';

type IntervalFunction = () => unknown | void;

export default function useInterval(callback: IntervalFunction, ms: number) {
  const savedCallback = useRef<IntervalFunction | null>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  });

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current !== null) {
        savedCallback.current();
      }
    }

    const id = setInterval(tick, ms);
    return () => clearInterval(id);
  }, [ms]);
}
