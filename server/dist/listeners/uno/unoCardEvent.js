import activeRoomsMap from "../../config/activeRoomsMap.js";
import syncClientState from "../../games/uno/utils/syncClientState.js";
import findNextTurn from "../../games/uno/utils/findNextTurn.js";
import finishGame from "../../game/finishGame.js";
import randomCard from "../../games/uno/utils/randomCard.js";
import checkLegalMove from "../../games/uno/utils/checkLegalMove.js";
export default function unoCardEvent(socket) {
    socket.on("uno:placeCard", (session, card, newColor) => {
        if (session) {
            const code = session.room;
            const room = activeRoomsMap.get(code);
            const { activeSessionsMap, game: { mode, state, gameData }, } = room;
            if (state === "active" && mode === "UNO") {
                const { players } = gameData;
                let player;
                players.forEach(plr => {
                    if (plr.id === session.id)
                        player = plr;
                });
                if (player) {
                    const cardIndex = findPlayerCard(player, !newColor
                        ? card
                        : { face: card.face, color: "none" });
                    if (players[gameData.turn] === player &&
                        cardIndex >= 0 &&
                        checkLegalMove(card, gameData.lastCard)) {
                        player.cards.splice(cardIndex, 1);
                        if (player.cards.length === 0) {
                            finishGame(code, player.name);
                        }
                        else {
                            if (card.color === "none") {
                                if (newColor && isColor(newColor))
                                    card.color = newColor;
                                else
                                    card.color = "red";
                            }
                            gameData.lastCard = card;
                            player.justDrewCard = false;
                            findNextTurn(room, card);
                            if (card.face === "+2" || card.face === "+4") {
                                const victim = players[gameData.turn];
                                victim.cards.push(...Array.from({ length: card.face === "+2" ? 2 : 4 }, () => randomCard(true)));
                                findNextTurn(room, card);
                            }
                            syncClientState(code);
                        }
                    }
                }
            }
        }
    });
}
function findPlayerCard(player, card) {
    let cardIndex = -1;
    player.cards.forEach((currentCard, index) => {
        if (currentCard.face === card.face && currentCard.color === card.color) {
            cardIndex = index;
        }
    });
    return cardIndex;
}
function isColor(newColor) {
    return ["red", "blue", "green", "yellow"].includes(newColor);
}
//# sourceMappingURL=unoCardEvent.js.map