import { playAudio } from "@/utils/playAudio";
import { RefObject, useEffect, useRef } from "react";
import { CardFace, WildCardFace } from "../types";

const IMAGES_PATH = "/textures/uno/";

export default function useCardAnimation<T>(
  ref: RefObject<HTMLDivElement | null>,
  dependencies: T[],
  face?: CardFace | WildCardFace
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

      if (
        face === "+2" ||
        face === "+4" ||
        face === "none" ||
        face === "reverse" ||
        face === "skip"
      ) {
        const unoCenter: HTMLImageElement | null =
          document.querySelector("#uno-center-effect");
        if (unoCenter) {
          switch (face) {
            case "+2":
              unoCenter.src = IMAGES_PATH + "plus-two.svg";
              break;
            case "+4":
              unoCenter.src = IMAGES_PATH + "plus-four.svg";
              break;
            case "none":
              unoCenter.src = IMAGES_PATH + "wildcard.svg";
              break;
            case "reverse":
            case "skip":
              unoCenter.src = IMAGES_PATH + face + ".svg";
              break;
          }
          unoCenter.animate(
            [
              {
                opacity: 0.75,
                translate: "0 0",
              },
              { opacity: 0, translate: "0 -3rem" },
            ],
            {
              duration: 750,
            }
          );
        }
      }
    }
    previousDependencies.current = dependencies;
  }, [dependencies, ref, face]);
}
