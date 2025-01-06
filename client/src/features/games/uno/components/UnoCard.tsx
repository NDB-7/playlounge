import socket from "@/lib/socket";
import { CardFace, WildCardFace } from "../types";
import { SessionType } from "@/types";

export default function UnoCard({
  color,
  face,
  session,
}: {
  color: string;
  face: CardFace | WildCardFace;
  session?: SessionType;
}) {
  function clickHandler() {
    if (session) {
      socket.emit("uno:placeCard", session, { color, face });
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
        session && "cursor-pointer hover:-translate-y-2 transition-transform"
      }`}
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
