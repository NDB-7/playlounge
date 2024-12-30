import { GameInfoType } from "../../../types";
import LeaveRoom from "./LeaveRoom";

export function ChatroomInfo({
  chatroomInfo,
  code,
}: {
  chatroomInfo: GameInfoType;
  code: string;
}) {
  return (
    <header className="fixed bg-white w-full border-b-2 py-2 px-4 flex items-center justify-between z-10">
      <div>
        <h1 className="text-2xl font-bold">
          {chatroomInfo.success && chatroomInfo.name}
          <span className="text-xs font-normal text-gray-500 ml-2 blur-sm hover:blur-none transition-[filter] duration-300">
            ({code})
          </span>
        </h1>
      </div>
      <LeaveRoom />
    </header>
  );
}
