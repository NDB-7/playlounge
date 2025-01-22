import { RoomInfoType } from "../types";
import LeaveRoom from "./LeaveRoom";

export default function RoomInfo({
  roomInfo,
  code,
  children,
}: {
  roomInfo: RoomInfoType;
  code: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="fixed bg-background w-full border-b-2 py-2 px-4 flex items-center justify-between z-10">
      <div>
        <h1 className="text-2xl font-bold">
          {roomInfo.success && roomInfo.name}
          <span className="text-xs font-normal text-gray-500 ml-2 blur-sm hover:blur-none transition-[filter] duration-300">
            ({code})
          </span>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        {children}
        <LeaveRoom />
      </div>
    </header>
  );
}
