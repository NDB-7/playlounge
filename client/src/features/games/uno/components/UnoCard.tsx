import socket from "@/lib/socket";
import { CardFace, WildCardFace } from "../types";
import { SessionType } from "@/types";
import { useContext } from "react";
import ColorSelectorContext from "../context/ColorSelectorContext";

export default function UnoCard({
  color,
  face,
  session,
  colorSelect,
  illegal,
}: {
  color: string;
  face: CardFace | WildCardFace;
  session?: SessionType;
  colorSelect?: boolean;
  illegal?: boolean;
}) {
  const setColorSelector = useContext(ColorSelectorContext)[1];

  function clickHandler() {
    if (session && !illegal) {
      if (color === "none") setColorSelector(face);
      else if (colorSelect) {
        socket.emit(
          "uno:placeCard",
          session,
          {
            color: "none",
            face,
          },
          color
        );
        setColorSelector(null);
      } else socket.emit("uno:placeCard", session, { color, face });
    }
  }

  return (
    <div
      className={`${
        color === "red"
          ? "bg-red-500"
          : color === "blue"
          ? "bg-blue-600"
          : color === "green"
          ? "bg-green-500"
          : color === "yellow"
          ? "bg-yellow-400"
          : "bg-black"
      } uno-card transition-all shadow ${
        session && !illegal && "cursor-pointer hover:-translate-y-2"
      } ${illegal && "brightness-75"}`}
      onClick={clickHandler}
    >
      <div className="rounded-full w-2/3 h-2/3 bg-white flex items-center justify-center">
        <span className="text-xl lg:text-2xl xl:text-3xl font-bold select-none">
          {face === "none"
            ? "*"
            : face === "reverse"
            ? "↻"
            : face === "skip"
            ? "⃠"
            : face}
        </span>
      </div>
    </div>
  );
}
