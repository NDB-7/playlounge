import { SessionType } from "@/types";
import { UnoClientState } from "../types";
import UnoCard from "./UnoCard";

export default function YourHand({
  unoState,
  isTurn,
  session,
}: {
  unoState: UnoClientState;
  isTurn: boolean;
  session?: SessionType;
}) {
  return (
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
      <p className={`text-center mb-2 text-xl ${isTurn && "font-bold"}`}>You</p>
      <div className="flex gap-2">
        {unoState.cards.map((card, index) => (
          <UnoCard
            color={card.color}
            face={card.face}
            key={index}
            session={session}
          />
        ))}
      </div>
    </div>
  );
}
