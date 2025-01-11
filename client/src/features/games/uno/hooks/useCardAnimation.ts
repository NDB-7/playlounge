import { playAudio } from "@/utils/playAudio";
import { RefObject, useEffect, useRef } from "react";

export default function useCardAnimation<T>(
  ref: RefObject<HTMLDivElement | null>,
  dependencies: T[]
) {
  const placeCardRef = useRef<HTMLAudioElement>(null);
  const drawCardRef = useRef<HTMLAudioElement>(null);
  const previousDependencies = useRef<T[]>(dependencies);

  useEffect(() => {
    const placeCardAudio = new Audio("/sounds/uno/place-card.mp3");
    placeCardRef.current = placeCardAudio;
    const drawCardAudio = new Audio("/sounds/uno/draw-card.mp3");
    drawCardRef.current = drawCardAudio;

    return () => {
      placeCardAudio.pause();
      placeCardAudio.src = "";
      drawCardAudio.pause();
      drawCardAudio.src = "";
    };
  }, []);

  useEffect(() => {
    const hasChanged = dependencies.some(
      (dependency, index) => dependency !== previousDependencies.current[index]
    );

    if (hasChanged) {
      ref.current?.animate(
        [
          {
            transform: "translate(0.25rem, -1.5rem) rotate(15deg) scale(1.2)",
          },
          { transform: "translate(0, 0) rotate(0) scale(1)" },
        ],
        {
          duration: 150,
        }
      );
      playAudio(placeCardRef.current);
    }
    previousDependencies.current = dependencies;
  }, [dependencies, ref]);
}
