import activeRoomsMap from "../config/activeRoomsMap.js";
export default function createRoom(code, name) {
    activeRoomsMap.set(code, {
        data: {
            name,
            createdAt: Date.now(),
        },
        sessionToUsersMap: new Map(),
        activeSessionsMap: new Map(),
        game: {
            mode: null,
            state: "waiting",
        },
    });
}
//# sourceMappingURL=createRoom.js.map