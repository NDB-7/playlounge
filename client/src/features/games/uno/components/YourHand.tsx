import { SessionType } from "@/types";
import { UnoClientState } from "../types";
import UnoCard from "./UnoCard";
import checkLegalMove from "../utils/checkLegalMove";
import { useEffect } from "react";

export default function YourHand({
  unoState,
  isTurn,
  session,
}: {
  unoState: UnoClientState;
  isTurn: boolean;
  session?: SessionType;
}) {
  useEffect(() => {
    let drawHandAudio: HTMLAudioElement;
    if (session) {
      drawHandAudio = new Audio("/sounds/uno/draw-hand.mp3");
      drawHandAudio.play();
    }

    return () => {
      if (drawHandAudio) {
        drawHandAudio.pause();
        drawHandAudio.src = "";
      }
    };
  }, [session]);

  return (
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-3/4">
      <p
        className={`text-center mb-2 text-xl text-gray-700 animate-fade-in ${
          isTurn && "font-bold text-black"
        }`}
      >
        You
      </p>
      <div className="flex justify-center gap-1 max-w-[100%] flex-wrap mb-12 lg:mb-16 xl:mb-24 animate-hand">
        {unoState.cards.map((card, index) => (
          <UnoCard
            {...card}
            key={index}
            session={session}
            illegal={!isTurn || !checkLegalMove(card, unoState.lastCard)}
          />
        ))}
      </div>
    </div>
  );
}
