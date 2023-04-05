import round from "helpers/shared/round";
import { useEffect, useRef } from "react";

const useWPM = () => {
  const startTimeRef = useRef<number | null>(null);
  const numberOfLettersTypedRef = useRef(0);

  const countLetters = () => {
    numberOfLettersTypedRef.current += 1;
  };

  useEffect(() => {
    window.addEventListener("keypress", countLetters);
    return () => window.removeEventListener("keypress", countLetters);
  }, []);

  const startMeasuringWPM = () => {
    startTimeRef.current = Date.now();
  };

  const getWPM = (): number => {
    if (!startTimeRef.current) return 0;

    const minutesElapsed = (Date.now() - startTimeRef.current) / 1000 / 60;
    const numberOfWords = numberOfLettersTypedRef.current / 5;
    return round(numberOfWords / minutesElapsed);
  };

  return { getWPM, startMeasuringWPM };
};

export default useWPM;
