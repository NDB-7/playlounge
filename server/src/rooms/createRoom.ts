import activeRoomsMap from "../config/activeRoomsMap.js";

export default function createRoom(code: string, name: string) {
  activeRoomsMap.set(code, {
    data: {
      name,
      createdAt: Date.now(),
      gamemode: null,
    },
    sessionToUsersMap: new Map<string, string>(),
    activeSessionsMap: new Map<string, string>(),
  });
}
