import { useRef } from "react";
import MessageList from "../main/MessageList";

export function Sidebar({
  onlineUsers,
  currentUser,
  children,
}: {
  onlineUsers: string[];
  currentUser: string;
  children: React.ReactNode;
}) {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <aside className="hidden md:w-60 lg:w-72 h-full bg-gray-50 border-r-2 md:block relative border-l-2">
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
