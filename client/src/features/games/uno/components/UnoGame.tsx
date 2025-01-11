import { SessionType } from "@/types";
import useUnoState from "../hooks/useUnoState";
import OtherHand from "./OtherHand";
import UnoCard from "./UnoCard";
import UnoDummyCard from "./UnoDummyCard";
import YourHand from "./YourHand";
import { useState } from "react";
import ColorSelectorContext from "../context/ColorSelectorContext";
import UnoColorSelector from "./UnoColorSelector";
import { CardFace, WildCardFace } from "../types";

export default function UnoGame({
  currentUser,
  session,
}: {
  currentUser: string;
  session?: SessionType;
}) {
  const unoState = useUnoState();
  const [colorSelector, setColorSelector] = useState<
    CardFace | WildCardFace | ""
  >("");

  if (unoState)
    return (
      <ColorSelectorContext.Provider
        value={{ colorSelector, setColorSelector }}
      >
        {colorSelector && unoState.whoseTurn === currentUser && (
          <UnoColorSelector session={session} />
        )}
        <div
          className={`absolute game-bg w-full h-full pb-12 transition-[filter] 
            ${colorSelector && "blur-md"}
          `}
        >
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
              playerCount={unoState.otherPlayers.length}
              key={index}
            />
          ))}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 pb-32 scale-in">
            <UnoCard {...unoState.lastCard} />
            <UnoDummyCard
              session={session}
              isTurn={currentUser === unoState.whoseTurn}
            />
            <div className="absolute -z-10 rotate-6 translate-y-1">
              <UnoDummyCard />
            </div>
          </div>
        </div>
      </ColorSelectorContext.Provider>
    );
}
