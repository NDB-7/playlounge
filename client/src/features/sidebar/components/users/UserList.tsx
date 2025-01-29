import User from "./User";

export default function UserList({
  onlineUsers,
  currentUser,
  owner,
  hidden,
}: {
  onlineUsers: string[];
  currentUser: string;
  owner: string;
  hidden?: boolean;
}) {
  return (
    <ul
      className={`pt-4 h-full ${hidden && "hidden"}`}
      aria-label="User list"
      aria-live="polite"
      tabIndex={0}
    >
      {onlineUsers.map(name => {
        return (
          <User
            key={name}
            name={name}
            currentUser={currentUser}
            owner={owner}
          />
        );
      })}
    </ul>
  );
}
