'use client';

import { useEffect, useRef, useState } from 'react';

export type CountdownTimerLeft = {
  hours: number;
  minutes: number;
  seconds: number;
};

export function useCountdownTimer(initialSeconds = 120) {
  const [timerLeft, setTimerLeft] = useState<CountdownTimerLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const targetTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const calculateTimeLeft = (targetTime: number) => {
    const diff = targetTime - Date.now();

    if (diff <= 0) {
      setTimerLeft({ hours: 0, minutes: 0, seconds: 0 });
      setIsCompleted(true);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    setTimerLeft({ hours, minutes, seconds });
    setIsCompleted(false);
  };

  const startCountdown = (seconds = initialSeconds) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const targetTime = Date.now() + seconds * 1000;
    targetTimeRef.current = targetTime;
    setIsCompleted(false);

    calculateTimeLeft(targetTime);
    intervalRef.current = setInterval(() => calculateTimeLeft(targetTime), 1000);
  };

  const resetCountdown = () => startCountdown(initialSeconds);

  useEffect(() => {
    startCountdown(initialSeconds);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [initialSeconds]);

  return {
    timerLeft,
    isCompleted,
    resetCountdown,
  };
}
