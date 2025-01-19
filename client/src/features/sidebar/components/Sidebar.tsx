import { useRef, useState } from "react";
import MessageList from "./chat/MessageList";
import { MessageSquareMore, Users2 } from "lucide-react";
import { SessionType } from "@/types";
import UserList from "./users/UserList";

export function Sidebar({
  onlineUsers,
  currentUser,
  children,
  mobileChat,
  isOwner,
  session,
}: {
  onlineUsers: string[];
  currentUser: string;
  children: React.ReactNode;
  mobileChat: boolean;
  isOwner: boolean;
  session: SessionType | undefined;
}) {
  const mainRef = useRef<HTMLDivElement>(null);
  const [sidebarMode, setSidebarMode] = useState<"chat" | "users">("chat");

  return (
    <aside
      className={`${
        mobileChat ? "absolute right-0 w-72 shadow-xl" : "hidden"
      } md:w-60 lg:w-72 h-full bg-gray-50 border-r-2 md:block md:relative md:shadow-none border-l-2`}
    >
      <div className="w-full mt-12 h-12 bg-white border-2 border-x-0 absolute flex">
        <button
          className={`flex-grow border-r-2 flex items-center justify-center cursor-pointer hover:bg-gray-50 ${
            sidebarMode === "chat" && "shadow-inner"
          }`}
          onClick={() => setSidebarMode("chat")}
        >
          <MessageSquareMore />
        </button>
        <button
          className={`flex-grow flex items-center justify-center cursor-pointer hover:bg-gray-50 ${
            sidebarMode === "users" && "shadow-inner"
          }`}
          onClick={() => setSidebarMode("users")}
        >
          <Users2 />
        </button>
      </div>
      <div
        className="pt-16 space-y-4 overflow-y-scroll overflow-x-hidden h-full pb-20"
        ref={mainRef}
      >
        <MessageList
          currentUser={currentUser}
          onlineUsers={onlineUsers}
          mainRef={mainRef}
          hidden={sidebarMode !== "chat"}
        />
        <UserList
          onlineUsers={onlineUsers}
          isOwner={isOwner}
          session={session}
          hidden={sidebarMode !== "users"}
        />
      </div>
      {sidebarMode === "chat" && children}
    </aside>
  );
}
