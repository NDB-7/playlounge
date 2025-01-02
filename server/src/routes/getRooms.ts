import activeRoomsMap from "../config/activeRoomsMap.js";

export default function getRooms(req, res) {
  const room = activeRoomsMap.get(req.params.code);

  if (room) {
    res.send({
      success: true,
      name: room.data.name,
      gamemode: room.data.gamemode,
    });
  } else {
    res.status(404).send({ success: false });
  }
}
