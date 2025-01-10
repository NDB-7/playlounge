import activeRoomsMap from "../../config/activeRoomsMap.js";
import { UnoGameData, UnoPlayer } from "./types.js";
import randomCard from "./utils/randomCard.js";
import syncClientState from "./utils/syncClientState.js";

export default function initUno(code: string) {
  const { game, activeSessionsMap, sessionToUsersMap } =
    activeRoomsMap.get(code);
  const players: UnoPlayer[] = [];

  activeSessionsMap.forEach((id: string) => {
    const { name } = sessionToUsersMap.get(id);
    const cards = new Array(7).fill(null).map(_ => randomCard(true));
    players.push({ id, name, cards, justDrewCard: false });
  });

  const gameData: UnoGameData = {
    players,
    lastCard: randomCard(false),
    turn: 0,
    reversed: false,
  };

  game.gameData = gameData;

  syncClientState(code);

  // Just in case any clients missed the syncing
  setTimeout(() => syncClientState(code), 1000);
}
