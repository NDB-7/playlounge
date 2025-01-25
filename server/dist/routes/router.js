import express from "express";
import getRoom from "./getRoom.js";
import postRoom from "./postRoom.js";
import getGames from "./getGames.js";
import getRooms from "./getRooms.js";
const router = express.Router();
router.get("/rooms/:code", getRoom);
router.get("/rooms", getRooms);
router.post("/rooms", postRoom);
router.get("/games", getGames);
export default router;
//# sourceMappingURL=router.js.map