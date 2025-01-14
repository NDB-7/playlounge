export default function findNextTurn(gameData, card) {
    const playerCount = gameData.players.length;
    const turn = gameData.turn;
    let newTurn;
    switch (card?.face) {
        case "reverse":
            if (playerCount === 2) {
                newTurn = turn;
            }
            else {
                gameData.reversed = !gameData.reversed;
                newTurn = gameData.reversed ? turn - 1 : turn + 1;
            }
            break;
        case "skip":
            newTurn = gameData.reversed ? turn - 2 : turn + 2;
            break;
        default:
            newTurn = gameData.reversed ? turn - 1 : turn + 1;
    }
    if (newTurn >= playerCount) {
        newTurn -= playerCount;
    }
    else if (newTurn < 0) {
        newTurn += playerCount;
    }
    return newTurn;
}
//# sourceMappingURL=findNextTurn.js.map