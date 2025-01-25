import activeRoomsMap from "../config/activeRoomsMap.js";
export default function getRooms(req, res) {
    const rooms = [];
    activeRoomsMap.forEach(room => {
        if (!room.isPrivate)
            rooms.push({
                name: room.data.name,
                mode: room.game.mode || "Game Selector",
                users: room.activeSessionsMap.size,
                code: room.data.code,
            });
    });
    res.send(rooms);
}
//# sourceMappingURL=getRooms.js.map