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
    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-3/4">
      <p className={`text-center mb-2 text-xl ${isTurn && "font-bold"}`}>You</p>
      <div className="flex justify-center gap-1 max-w-[100%] flex-wrap mb-16">
        {unoState.cards.map((card, index) => (
          <UnoCard {...card} key={index} session={session} />
        ))}
      </div>
    </div>
  );
}
