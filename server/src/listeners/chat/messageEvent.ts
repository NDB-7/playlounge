import { Socket } from "socket.io";
import activeRoomsMap from "../../config/activeRoomsMap.js";
import { z } from "zod";
import { ServerMessageType } from "../../types.js";
import { io } from "../../index.js";
import rateLimit from "../../middleware/rateLimit.js";

const messageSchema = z.string().min(1).max(150);

export default function messageEvent(socket: Socket) {
  const id = socket.id;

  socket.on("chat:sendMessage", (messageText: string, session, callback) => {
    rateLimit(id, callback, () => {
      if (session) {
        const { sessionToUsersMap } = activeRoomsMap.get(session.room);
        if (sessionToUsersMap.has(session.id)) {
          const { success, data } = messageSchema.safeParse(messageText.trim());
          if (success) {
            const { name } = sessionToUsersMap.get(session.id);
            console.log(`User ${id} (${name}) said ${data}`);
            const message: ServerMessageType = {
              sender: name,
              content: data,
              serverNotification: false,
              sentAt: Date.now(),
            };
            io.to(session.room).emit("chat:receiveMessage", message);
          }
        }
      }
    });
  });
}
