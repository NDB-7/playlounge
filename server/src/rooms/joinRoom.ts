import { Socket } from "socket.io";
import activeRoomsMap from "../config/activeRoomsMap.js";
import { io } from "../index.js";
import { ServerMessageType, User } from "../types.js";
import updateUserListForClients from "./updateUserListForClients.js";
import sendServerNotification from "./sendServerNotification.js";

export default function joinRoom(
  name: string,
  code: string,
  socket: Socket,
  sessionId: string
) {
  const { id } = socket;
  const room = activeRoomsMap.get(code);
  const { sessionToUsersMap, activeSessionsMap, game } = room;

  const role = activeSessionsMap.size === 0 ? "owner" : "player";

  sessionToUsersMap.set(sessionId, { name, role });
  activeSessionsMap.set(id, sessionId);
  socket.join(code);

  if (role === "owner") io.to(code).emit("room:ownerChange", name);
  else {
    // Tells the user who the owner is, if they aren't the owner themself
    let owner = "";
    sessionToUsersMap.forEach(user => {
      if (user.role === "owner") owner = user.name;
    });
    socket.emit("room:ownerChange", owner);
  }

  console.log(`${name} joined as ${role} in room ${code}`);
  updateUserListForClients(code);
  sendServerNotification(code, `${name} joined the game.`);

  const { state, mode } = room.game;
  if (game.state === "active") {
    const isRejoining = game.gameData.players.some(
      player => player.id === sessionId
    );
    if (!isRejoining) game.gameData.spectators.push(id);
  }
  socket.emit("game:gameStateChanged", { state, mode });
}
