import activeRoomsMap from "../config/activeRoomsMap.js";

function roomCleanup() {
  activeRoomsMap.forEach((room, code) => {
    const {
      activeSessionsMap,
      data: { createdAt },
    } = room;
    const now = Date.now();
    // Clear unused rooms after 5 minutes
    if (now - createdAt > 300000 && activeSessionsMap.size === 0) {
      activeRoomsMap.delete(code);
      console.log(`Deleted unused room (${code})`);
    }
  });
}

setInterval(roomCleanup, 5000);
