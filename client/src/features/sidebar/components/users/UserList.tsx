import { SessionType } from "@/types";
import User from "./User";

export default function UserList({
  onlineUsers,
  currentUser,
  owner,
  session,
  hidden,
}: {
  onlineUsers: string[];
  currentUser: string;
  owner: string;
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
            currentUser={currentUser}
            owner={owner}
            session={session}
          />
        );
      })}
    </ul>
  );
}
