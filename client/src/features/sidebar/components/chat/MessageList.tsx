import { RefObject } from "react";
import { Message } from "./Message";
import useMessageReceiver from "../../hooks/useMessageReceiver";

export default function MessageList({
  currentUser,
  onlineUsers,
  mainRef,
  hidden,
}: {
  currentUser: string;
  onlineUsers: string[];
  mainRef: RefObject<HTMLDivElement | null>;
  hidden?: boolean;
}) {
  const { messages } = useMessageReceiver(currentUser, mainRef);

  return (
    <ul
      className={`pt-8 min-h-[90vh] pb-6 px-4 ${hidden && "hidden"}`}
      aria-label="Chat conversation"
      aria-live="polite"
      tabIndex={0}
    >
      {messages.map((msg, msgIndex) => {
        let hideName = false;
        if (msgIndex > 0 && messages[msgIndex - 1].sender === msg.sender)
          hideName = true;
        return (
          <Message
            {...msg}
            key={msgIndex}
            hideName={hideName}
            onlineUsers={onlineUsers}
          />
        );
      })}
    </ul>
  );
}
