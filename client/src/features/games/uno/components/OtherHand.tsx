import TurnCountdown from "./TurnCountdown";
import UnoDummyCard from "./UnoDummyCard";
import { AnimatePresence } from "motion/react";

export default function OtherHand({
  name,
  cardCount,
  whoseTurn,
  index,
  playerCount,
  online,
}: {
  name: string;
  cardCount: number;
  whoseTurn: string;
  index: number;
  playerCount: number;
  online: boolean;
}) {
  return (
    <div
      className={`absolute -translate-x-1/2 ${
        playerCount === 2
          ? "top-4 left-1/2 w-3/4 rotate-180"
          : playerCount > 2 &&
            (index === 0
              ? "left-20 -translate-y-1/2 top-[47%] w-1/2 rotate-90"
              : index === 1
              ? "top-4 left-1/2 w-3/4 rotate-180"
              : "left-[94%] -translate-y-1/2 top-[47%] w-1/2 rotate-[270deg]")
      }`}
    >
      <div className="flex gap-4 justify-center">
        <p
          className={`text-center mb-4 text-xl ${
            online ? "text-gray-700" : "text-gray-500 italic"
          } transition-all animate-fade-in ${
            whoseTurn === name &&
            (online ? "font-bold text-black" : "font-bold")
          }`}
        >
          {name}
        </p>
        {whoseTurn === name && <TurnCountdown duration={10} />}
      </div>
      <div className="flex justify-center gap-1 max-w-[100%] flex-wrap mb-12 lg:mb-16 xl:mb-24 animate-hand">
        <AnimatePresence>
          {Array.from({ length: cardCount }).map((_, cardIndex) => (
            <UnoDummyCard
              key={cardIndex}
              isTurn={whoseTurn === name}
              online={online}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
