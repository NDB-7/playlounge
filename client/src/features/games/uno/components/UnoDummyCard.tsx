import socket from "@/lib/socket";
import { SessionType } from "@/types";

export default function UnoDummyCard({ session }: { session?: SessionType }) {
  function clickHandler() {
    if (session) {
      socket.emit("uno:drawCard", session);
    }
  }

  return (
    <div
      className={`bg-black uno-card border-white border-4 flex items-center justify-center ${
        session && "cursor-pointer hover:scale-105 transition-transform"
      }`}
      onClick={clickHandler}
    >
      <div className="rounded-full w-2/3 h-2/3 bg-white flex items-center justify-center">
        <span className="font-bold text-2xl -rotate-45 select-none">UNO</span>
      </div>
    </div>
  );
}
