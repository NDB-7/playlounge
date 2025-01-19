import { RefObject } from "react";
import { Message } from "../chat/Message";
import useMessageReceiver from "../../hooks/useMessageReceiver";
import { SessionType } from "@/types";
import User from "./User";

export default function UserList({
  onlineUsers,
  isOwner,
  session,
  hidden,
}: {
  onlineUsers: string[];
  isOwner: boolean;
  session: SessionType | undefined;
  hidden?: boolean;
}) {
  return (
    <ul
      className={`pt-4 h-full ${hidden && "hidden"}`}
      aria-label="User list"
      aria-live="polite"
      tabIndex={0}
    >
      {onlineUsers.map((name, nameIndex) => {
        return (
          <User
            key={nameIndex}
            name={name}
            isOwner={isOwner}
            session={session}
          />
        );
      })}
    </ul>
  );
}
