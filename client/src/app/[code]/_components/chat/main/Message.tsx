import formatTime from "@/utils/formatTime";
import { ClientMessageType } from "../../../types";

export function Message({
  sentByMe,
  sender,
  content,
  hideName,
  sentAt,
  onlineUsers,
  serverNotification,
}: ClientMessageType & { hideName: boolean; onlineUsers: string[] }) {
  if (serverNotification === true) {
    return (
      <li className="text-center mt-4 text-gray-600 text-sm">{content}</li>
    );
  } else
    return (
      <li className={`space-y-1 ${hideName ? "mt-2" : "mt-4"}`}>
        {!hideName &&
          (sentByMe ? (
            <p className="text-gray-800">
              You <TimeText sentAt={sentAt} />
            </p>
          ) : (
            <p
              className={
                onlineUsers.includes(sender)
                  ? "text-gray-600"
                  : "text-gray-500 italic"
              }
            >
              {sender} <TimeText sentAt={sentAt} />
            </p>
          ))}
        <p
          className={`${
            sentByMe ? "bg-cyan-100" : "bg-gray-50"
          } rounded-lg max-w-xl text-wrap break-all inline-block py-1 px-2 shadow-sm animate-pop-in`}
        >
          {content}
        </p>
      </li>
    );
}

function TimeText({ sentAt }: { sentAt: number }) {
  return (
    <span className="text-xs text-gray-500 ml-1 not-italic">
      {formatTime(sentAt)}
    </span>
  );
}
