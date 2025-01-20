import { io } from "../index.js";
import { ServerMessageType } from "../types.js";

export default function sendServerNotification(code: string, content: string) {
  const message: ServerMessageType = {
    content,
    serverNotification: true,
  };
  io.to(code).emit("chat:receiveMessage", message);
}
