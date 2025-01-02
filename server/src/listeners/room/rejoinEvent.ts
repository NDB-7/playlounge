import { Socket } from "socket.io";
import activeRoomsMap from "../../config/activeRoomsMap.js";
import updateUserListForClients from "../../rooms/updateUserListForClients.js";
import { io } from "../../index.js";
import { ServerMessageType } from "../../types.js";

export default function rejoinEvent(socket: Socket) {
  const id = socket.id;

  socket.on("room:rejoin", (session, callback) => {
    if (activeRoomsMap.has(session.room)) {
      const { sessionToUsersMap, activeSessionsMap } = activeRoomsMap.get(
        session.room
      );
      if (activeSessionsMap.size >= 4) {
        callback({
          success: false,
          expired: false,
          message: "This game is full.",
        });
        sessionToUsersMap.delete(session.id);
      } else if (sessionToUsersMap.has(session.id)) {
        if (new Set(activeSessionsMap.values()).has(session.id))
          callback({
            success: false,
            expired: false,
            message:
              "You already have an active session in this browser, please close it before attempting to open the game again.",
          });
        else {
          activeSessionsMap.set(id, session.id);
          socket.join(session.room);
          updateUserListForClients(session.room);
          callback({
            success: true,
            name: sessionToUsersMap.get(session.id),
          });
          const message: ServerMessageType = {
            content: `${sessionToUsersMap.get(session.id)} rejoined the game.`,
            serverNotification: true,
          };
          io.to(session.room).emit("chat:receiveMessage", message);
        }
      } else {
        callback({ success: false });
      }
    } else {
      callback({
        success: false,
        expired: true,
        message: "This game has expired.",
      });
    }
  });
}
