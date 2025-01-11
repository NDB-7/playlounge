import { useContext } from "react";
import UnoCard from "./UnoCard";
import ColorSelectorContext from "../context/ColorSelectorContext";
import { SessionType } from "@/types";

export default function UnoColorSelector({
  session,
}: {
  session?: SessionType;
}) {
  const { colorSelector, setColorSelector } = useContext(ColorSelectorContext);

  if (colorSelector)
    return (
      <div
        className="absolute bg-black w-full h-full z-20 bg-opacity-50"
        onClick={() => setColorSelector("")}
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
    );
}
