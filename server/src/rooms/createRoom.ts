import activeRoomsMap from "../config/activeRoomsMap.js";
import { User } from "../types.js";

export default function createRoom(
  code: string,
  name: string,
  isPrivate: boolean
) {
  activeRoomsMap.set(code, {
    data: {
      name,
      code,
      createdAt: Date.now(),
    },
    isPrivate,
    sessionToUsersMap: new Map<string, User>(),
    activeSessionsMap: new Map<string, string>(),
    game: {
      mode: null,
      state: "waiting",
      gameData: null,
    },
  });
}
