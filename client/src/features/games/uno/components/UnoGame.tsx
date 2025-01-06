import { SessionType } from "@/types";
import useUnoState from "../hooks/useUnoState";
import OtherHand from "./OtherHand";
import UnoCard from "./UnoCard";
import UnoDummyCard from "./UnoDummyCard";
import YourHand from "./YourHand";

export default function UnoGame({
  currentUser,
  session,
}: {
  currentUser: string;
  session?: SessionType;
}) {
  const unoState = useUnoState();

  if (unoState)
    return (
      <div className="absolute bg-teal-400 w-full h-full pb-12">
        <YourHand
          unoState={unoState}
          isTurn={currentUser === unoState.whoseTurn}
          session={session}
        />
        {unoState.otherPlayers.map((player, index) => (
          <OtherHand
            {...player}
            whoseTurn={unoState.whoseTurn}
            index={index}
            playerCount={unoState.otherPlayers.length + 1}
            key={index}
          />
        ))}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
          <UnoCard
            color={unoState.lastCard.color}
            face={unoState.lastCard.face}
          />
          <UnoDummyCard session={session} />
          <div className="absolute -z-10 rotate-6 translate-y-1">
            <UnoDummyCard />
          </div>
        </div>
      </div>
    );
}
