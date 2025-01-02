import express from "express";
import getRooms from "./getRooms.js";
import postRoom from "./postRoom.js";
import getGames from "./getGames.js";
const router = express.Router();
router.get("/rooms/:code", getRooms);
router.post("/rooms", postRoom);
router.get("/games", getGames);
export default router;
//# sourceMappingURL=router.js.map