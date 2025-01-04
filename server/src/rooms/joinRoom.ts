import { Socket } from "socket.io";
import activeRoomsMap from "../config/activeRoomsMap.js";
import { io } from "../index.js";
import { ServerMessageType, User } from "../types.js";
import updateUserListForClients from "./updateUserListForClients.js";

export default function joinRoom(
  name: string,
  code: string,
  socket: Socket,
  sessionId: string
) {
  const { id } = socket;
  const room = activeRoomsMap.get(code);
  const { sessionToUsersMap, activeSessionsMap } = room;

  const role = activeSessionsMap.size === 0 ? "owner" : "player";

  sessionToUsersMap.set(sessionId, { name, role });
  activeSessionsMap.set(id, sessionId);
  socket.join(code);

  if (role === "owner") io.to(code).emit("room:ownerChange", name);
  console.log(`${name} joined as ${role} in room ${code}`);
  updateUserListForClients(code);

  const message: ServerMessageType = {
    content: `${name} joined the game.`,
    serverNotification: true,
  };
  io.to(code).emit("chat:receiveMessage", message);

  const { state, mode } = room.game;
  socket.emit("game:gameStateChanged", { state, mode });
}
