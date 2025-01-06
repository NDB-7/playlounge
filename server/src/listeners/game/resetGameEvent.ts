import { Socket } from "socket.io";
import activeRoomsMap from "../../config/activeRoomsMap.js";
import resetGame from "../../game/resetGame.js";

export default function resetGameEvent(socket: Socket) {
  socket.on("game:reset", (session, gamemode: string) => {
    if (session) {
      const code = session.room;
      const { sessionToUsersMap, activeSessionsMap } = activeRoomsMap.get(code);
      const user = sessionToUsersMap.get(session.id);

      if (user?.role === "owner") {
        resetGame(code);
      }
    }
  });
}
