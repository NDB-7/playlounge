import socket from "@/lib/socket";
import { CardFace, WildCardFace } from "../types";
import { SessionType } from "@/types";
import { RefObject, useContext } from "react";
import ColorSelectorContext from "../context/ColorSelectorContext";

export default function UnoCard({
  color,
  face,
  id,
  session,
  colorSelect,
  illegal,
  ref,
}: {
  color: string;
  face: CardFace | WildCardFace;
  id: string;
  session?: SessionType;
  colorSelect?: boolean;
  illegal?: boolean;
  ref?: RefObject<HTMLDivElement | null>;
}) {
  const { setColorSelector } = useContext(ColorSelectorContext);

  const faceIcon =
    face === "none"
      ? "*"
      : face === "reverse"
      ? "↻"
      : face === "skip"
      ? "⃠"
      : face;
  let iconFile = "";

  switch (face) {
    case "none":
      iconFile = "wildcard.svg";
      break;
    case "reverse":
      iconFile = "reverse.svg";
      break;
    case "skip":
      iconFile = "skip.svg";
      break;
    case "+2":
      iconFile = "plus-two.svg";
      break;
    case "+4":
      iconFile = "plus-four.svg";
      break;
    default:
      iconFile = "";
  }

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
            id,
          },
          color
        );
        setColorSelector("");
      } else socket.emit("uno:placeCard", session, { color, face, id });
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
      } uno-card ${
        session && !illegal && "cursor-pointer hover:-translate-y-2"
      } ${illegal && "brightness-75"}`}
      onClick={clickHandler}
      ref={!session ? ref : null}
    >
      <div className="absolute top-0 left-1 text-white drop-shadow-[0_0_1px_rgba(0,0,0,1)] font-bold text-xs lg:text-sm xl:text-md select-none">
        {faceIcon}
      </div>
      <div className="rounded-full w-2/3 h-2/3 bg-white flex items-center justify-center">
        {iconFile ? (
          <img
            src={`/textures/uno/${iconFile}`}
            className="w-3/4 select-none"
            draggable={false}
            alt={String(face)}
          />
        ) : (
          <span className="text-xl lg:text-2xl xl:text-3xl font-bold select-none">
            {faceIcon}
          </span>
        )}
      </div>
      <div className="absolute bottom-0 right-1 text-white drop-shadow-[0_0_1px_rgba(0,0,0,1)] font-bold rotate-180 text-xs lg:text-sm xl:text-md select-none">
        {faceIcon}
      </div>
    </div>
  );
}
