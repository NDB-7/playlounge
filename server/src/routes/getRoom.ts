import activeRoomsMap from "../config/activeRoomsMap.js";

export default function getRoom(req, res) {
  const room = activeRoomsMap.get(req.params.code);

  if (room) {
    res.send({
      success: true,
      name: room.data.name,
    });
  } else {
    res.status(404).send({ success: false });
  }
}
