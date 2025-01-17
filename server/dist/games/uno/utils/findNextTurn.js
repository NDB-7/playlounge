import mapHasValue from "../../../utils/mapHasValue.js";
export default function findNextTurn(gameData, activeSessionsMap, card, turn) {
    const playerCount = gameData.players.length;
    const oldTurn = turn || gameData.turn;
    let newTurn;
    switch (card?.face) {
        case "reverse":
            if (playerCount === 2) {
                newTurn = oldTurn;
            }
            else {
                gameData.reversed = !gameData.reversed;
                newTurn = gameData.reversed ? oldTurn - 1 : oldTurn + 1;
            }
            break;
        case "skip":
            newTurn = gameData.reversed ? oldTurn - 2 : oldTurn + 2;
            break;
        default:
            newTurn = gameData.reversed ? oldTurn - 1 : oldTurn + 1;
    }
    if (newTurn >= playerCount) {
        newTurn -= playerCount;
    }
    else if (newTurn < 0) {
        newTurn += playerCount;
    }
    if (activeSessionsMap.size > 0 &&
        !mapHasValue(activeSessionsMap, gameData.players[newTurn].id))
        return findNextTurn(gameData, activeSessionsMap, undefined, newTurn);
    return newTurn;
}
//# sourceMappingURL=findNextTurn.js.map