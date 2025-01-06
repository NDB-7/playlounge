import { Socket } from "socket.io";
import activeRoomsMap from "../../config/activeRoomsMap.js";
import gameOptions from "../../config/gameOptions.js";
import startGame from "../../game/startGame.js";

export default function startGameEvent(socket: Socket) {
  const id = socket.id;

  socket.on("game:startGame", (session, gamemode: string) => {
    if (session) {
      const code = session.room;
      const { sessionToUsersMap, activeSessionsMap } = activeRoomsMap.get(code);
      const user = sessionToUsersMap.get(session.id);

      if (
        user?.role === "owner" &&
        gameOptions.some(item => item.name === gamemode) &&
        activeSessionsMap.size >= 1
      ) {
        console.log(
          `User ${id} (${user.name}) started game ${gamemode} in room ${code}`
        );
        startGame(code, gamemode);
      }
    }
  });
}
