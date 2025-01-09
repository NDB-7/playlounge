import { SessionType } from "@/types";
import useUnoState from "../hooks/useUnoState";
import OtherHand from "./OtherHand";
import UnoCard from "./UnoCard";
import UnoDummyCard from "./UnoDummyCard";
import YourHand from "./YourHand";
import { useState } from "react";
import { WildCardFace } from "../types";
import ColorSelectorContext from "../context/ColorSelectorContext";

export default function UnoGame({
  currentUser,
  session,
}: {
  currentUser: string;
  session?: SessionType;
}) {
  const unoState = useUnoState();
  const [colorSelector, setColorSelector] = useState<WildCardFace | null>(null);

  if (unoState)
    return (
      <ColorSelectorContext.Provider value={[colorSelector, setColorSelector]}>
        {colorSelector && unoState.whoseTurn === currentUser && (
          <div
            className="absolute bg-black w-full h-full z-20 bg-opacity-50"
            onClick={() => setColorSelector(null)}
          >
            <p className="absolute text-3xl font-bold text-white left-1/2 -translate-x-1/2 mt-6">
              Pick a color
            </p>
            <div className="absolute left-1/2 -translate-x-1/2 pt-28 pb-64 h-full flex flex-col justify-between">
              <UnoCard
                face={colorSelector}
                color="red"
                session={session}
                colorSelect
              />
              <UnoCard
                face={colorSelector}
                color="green"
                session={session}
                colorSelect
              />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 flex gap-40 -translate-y-1/2 top-1/2 pb-36 px-64">
              <UnoCard
                face={colorSelector}
                color="blue"
                session={session}
                colorSelect
              />
              <UnoCard
                face={colorSelector}
                color="yellow"
                session={session}
                colorSelect
              />
            </div>
          </div>
        )}
        <div
          className={`absolute bg-teal-400 w-full h-full pb-12 transition-[filter] 
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
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4 pb-32">
            <UnoCard {...unoState.lastCard} />
            <UnoDummyCard session={session} />
            <div className="absolute -z-10 rotate-6 translate-y-1">
              <UnoDummyCard />
            </div>
          </div>
        </div>
      </ColorSelectorContext.Provider>
    );
}
