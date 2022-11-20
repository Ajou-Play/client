import { useState } from 'react';

export const useStep = ({ count }: { count: number }) => {
  const [step, setStep] = useState(0);

  const setPrev = () => setStep((v) => Math.max(0, v - 1));

  const setNext = () => setStep((v) => Math.min(count, v + 1));

  return {
    step,
    setPrev,
    setNext,
  };
};
