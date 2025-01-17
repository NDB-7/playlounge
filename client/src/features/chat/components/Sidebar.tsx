import { useRef } from "react";
import MessageList from "./MessageList";

export function Sidebar({
  onlineUsers,
  currentUser,
  children,
  mobileChat,
}: {
  onlineUsers: string[];
  currentUser: string;
  children: React.ReactNode;
  mobileChat: boolean;
}) {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <aside
      className={`${
        mobileChat ? "absolute right-0 w-72 shadow-xl" : "hidden"
      } md:w-60 lg:w-72 h-full bg-gray-50 border-r-2 md:block md:relative md:shadow-none border-l-2`}
    >
      <div
        className="p-4 space-y-4 overflow-y-scroll overflow-x-hidden h-full pb-20"
        ref={mainRef}
      >
        <MessageList
          currentUser={currentUser}
          onlineUsers={onlineUsers}
          mainRef={mainRef}
        />
      </div>
      {children}
    </aside>
  );
}
