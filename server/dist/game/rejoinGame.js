import UNO_syncClientState from "../games/uno/utils/syncClientState.js";
export default function rejoinGame(code, gamemode) {
    if (gamemode === "UNO")
        UNO_syncClientState(code);
}
//# sourceMappingURL=rejoinGame.js.map