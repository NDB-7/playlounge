import socket from "@/lib/socket";
import { SessionType } from "@/types";

export default function UnoDummyCard({
  session,
  isTurn,
}: {
  session?: SessionType;
  isTurn?: boolean;
}) {
  function clickHandler() {
    if (session && isTurn) {
      socket.emit("uno:drawCard", session);
    }
  }

  return (
    <div
      className={`bg-gray-300 uno-card border-white border-4 flex items-center justify-center  transition-all shadow overflow-hidden ${
        session && "cursor-pointer hover:scale-105"
      } ${!isTurn && "brightness-75"}`}
      onClick={clickHandler}
    >
      <img
        className="w-full h-full border-white rounded select-none"
        src="/textures/uno/card-back.svg"
        draggable={false}
      />
      {/* <div className="rounded-full w-2/3 h-2/3 bg-white flex items-center justify-center">
        <span className="font-bold text-2xl -rotate-45 select-none">UNO</span>
      </div> */}
    </div>
  );
}
