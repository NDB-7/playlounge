import activeRoomsMap from "../config/activeRoomsMap.js";
export default function createRoom(code, name, isPrivate) {
    activeRoomsMap.set(code, {
        data: {
            name,
            code,
            createdAt: Date.now(),
        },
        isPrivate,
        sessionToUsersMap: new Map(),
        activeSessionsMap: new Map(),
        game: {
            mode: null,
            state: "waiting",
            gameData: null,
        },
    });
}
//# sourceMappingURL=createRoom.js.map