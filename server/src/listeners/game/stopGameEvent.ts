import { Socket } from "socket.io";
import activeRoomsMap from "../../config/activeRoomsMap.js";
import finishGame from "../../game/finishGame.js";

export default function stopGameEvent(socket: Socket) {
  const id = socket.id;

  socket.on("game:stopGame", session => {
    if (session) {
      const code = session.room;
      const { sessionToUsersMap } = activeRoomsMap.get(code);
      const user = sessionToUsersMap.get(session.id);

      if (user?.role === "owner") {
        console.log(`User ${id} (${user.name}) stopped game in room ${code}`);
        finishGame(code, null);
      }
    }
  });
}
