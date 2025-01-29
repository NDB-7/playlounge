import { UnoClientState } from "../types";
import UnoCard from "./UnoCard";
import checkLegalMove from "../utils/checkLegalMove";
import { useEffect, useRef } from "react";
import TurnCountdown from "./TurnCountdown";
import { playAudio } from "@/utils/playAudio";
import { AnimatePresence } from "motion/react";

export default function YourHand({
  unoState,
  isTurn,
}: {
  unoState: UnoClientState;
  isTurn: boolean;
}) {
  const yourTurnRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const drawHandAudio = new Audio("/sounds/uno/draw-hand.mp3");
    drawHandAudio.play();

    return () => {
      if (drawHandAudio) {
        drawHandAudio.pause();
        drawHandAudio.src = "";
      }
    };
  }, []);

  useEffect(() => {
    if (isTurn) {
      playAudio(yourTurnRef.current);
    }
  }, [yourTurnRef, isTurn]);

  useEffect(() => {
    const audio = new Audio("/sounds/game/your-turn.mp3");
    yourTurnRef.current = audio;
  }, []);

  return (
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-3/4">
      <div className="flex gap-4 justify-center">
        <p
          className={`text-center mb-2 text-xl text-gray-700 animate-fade-in ${
            isTurn && "font-bold text-black"
          }`}
        >
          You
        </p>
        {isTurn && <TurnCountdown duration={10} />}
      </div>
      <div className="flex justify-center gap-1 max-w-[100%] flex-wrap mb-12 lg:mb-16 xl:mb-24 animate-hand">
        <AnimatePresence>
          {unoState.cards.map(card => (
            <UnoCard
              {...card}
              key={card.id}
              illegal={!isTurn || !checkLegalMove(card, unoState.lastCard)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
