import { ActiveRoomType } from "../../../types.js";
import mapHasValue from "../../../utils/mapHasValue.js";
import { Card, WildCard } from "../types.js";
import syncClientState from "./syncClientState.js";

let timeout: NodeJS.Timeout | undefined;

export default function findNextTurn(
  room: ActiveRoomType,
  card?: Card | WildCard,
  turn?: number,
  checkedPlayers: number = 0
) {
  const {
    game: { gameData },
    activeSessionsMap,
  } = room;

  if (!gameData) return;

  const playerCount = gameData.players.length;
  const oldTurn = turn || gameData.turn;
  let newTurn: number;

  // Find next turn based on last card
  switch (card?.face) {
    case "reverse":
      if (playerCount === 2) {
        newTurn = oldTurn;
      } else {
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

  // Stay within range of player count
  if (newTurn >= playerCount) {
    newTurn -= playerCount;
  } else if (newTurn < 0) {
    newTurn += playerCount;
  }

  // Skip disconnected users
  if (
    activeSessionsMap.size > 0 &&
    !mapHasValue(activeSessionsMap, gameData.players[newTurn].id)
  ) {
    checkedPlayers++;
    if (checkedPlayers >= playerCount) return;
    return findNextTurn(room, undefined, newTurn, checkedPlayers);
  }

  // Reset timeout if turn is valid
  if (newTurn !== oldTurn) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      findNextTurn(room);
      syncClientState(room.data.code);
    }, 10000);
  }

  gameData.turn = newTurn;
}
