import UNO_syncClientState from "../games/uno/utils/syncClientState.js";

export default function rejoinGame(code: string, gamemode: string) {
  if (gamemode === "UNO") UNO_syncClientState(code);
}
