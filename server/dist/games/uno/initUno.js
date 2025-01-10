import activeRoomsMap from "../../config/activeRoomsMap.js";
import randomCard from "./utils/randomCard.js";
import syncClientState from "./utils/syncClientState.js";
export default function initUno(code) {
    const { game, activeSessionsMap, sessionToUsersMap } = activeRoomsMap.get(code);
    const players = [];
    activeSessionsMap.forEach((id) => {
        const { name } = sessionToUsersMap.get(id);
        const cards = new Array(7).fill(null).map(_ => randomCard(true));
        players.push({ id, name, cards, justDrewCard: false });
    });
    const gameData = {
        players,
        lastCard: randomCard(false),
        turn: 0,
        reversed: false,
    };
    game.gameData = gameData;
    syncClientState(code);
}
//# sourceMappingURL=initUno.js.map