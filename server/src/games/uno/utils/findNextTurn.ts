import { ActiveRoomType } from "../../../types.js";
import mapHasValue from "../../../utils/mapHasValue.js";
import { Card, UnoGameData, WildCard } from "../types.js";
import syncClientState from "./syncClientState.js";

let timeout: NodeJS.Timeout | undefined;

export default function findNextTurn(
  room: ActiveRoomType,
  card?: Card | WildCard,
  turn?: number
) {
  const {
    game: { gameData },
    activeSessionsMap,
  } = room;

  if (!gameData) return;

  const playerCount = gameData.players.length;
  const oldTurn = turn || gameData.turn;
  let newTurn: number;

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

  if (newTurn >= playerCount) {
    newTurn -= playerCount;
  } else if (newTurn < 0) {
    newTurn += playerCount;
  }

  if (
    activeSessionsMap.size > 0 &&
    !mapHasValue(activeSessionsMap, gameData.players[newTurn].id)
  )
    return findNextTurn(room, undefined, newTurn);

  if (newTurn !== oldTurn) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      findNextTurn(room);
      syncClientState(room.data.code);
    }, 10000);
  }

  gameData.turn = newTurn;
}
