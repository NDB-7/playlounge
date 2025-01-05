import activeRoomsMap from "../../config/activeRoomsMap.js";
import randomCard from "./utils/randomCard.js";
import syncClientState from "./utils/syncClientState.js";
export default function initUno(code) {
    const { game, activeSessionsMap } = activeRoomsMap.get(code);
    const players = [];
    activeSessionsMap.forEach((name, id) => {
        const cards = [];
        cards.fill(randomCard(true), 0, 6);
        players.push({ name, id, cards });
    });
    const gameData = {
        players,
        lastCard: randomCard(false),
        turn: 0,
    };
    game.gameData = gameData;
    syncClientState(code);
}
//# sourceMappingURL=initUno.js.map