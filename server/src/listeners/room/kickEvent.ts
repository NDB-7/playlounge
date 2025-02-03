import { Socket } from "socket.io";
import activeRoomsMap from "../../config/activeRoomsMap.js";
import { io } from "../../index.js";
import updateUserListForClients from "../../rooms/updateUserListForClients.js";
import sendServerNotification from "../../rooms/sendServerNotification.js";

export default function kickEvent(socket: Socket) {
  socket.on("room:kickUser", (session, name: string) => {
    const { room: code } = session;

    if (activeRoomsMap.has(code)) {
      const { sessionToUsersMap, activeSessionsMap } = activeRoomsMap.get(code);
      const owner = sessionToUsersMap.get(session.id);

      if (owner?.role === "owner") {
        sessionToUsersMap.forEach((victim, victimId) => {
          if (victim.name === name) {
            activeSessionsMap.forEach((sessionId, victimSocketId) => {
              if (sessionId === victimId) {
                activeSessionsMap.delete(victimSocketId);
                sessionToUsersMap.delete(sessionId);
                updateUserListForClients(code);

                const victimSocket = io.sockets.sockets.get(victimSocketId);
                victimSocket.emit("room:kicked", () => {
                  victimSocket.disconnect();
                });
                sendServerNotification(
                  code,
                  `${name} was kicked from the room.`
                );
              }
            });
          }
        });
      }
    }
  });
}
