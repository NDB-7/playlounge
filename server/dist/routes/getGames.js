import gameOptions from "../config/gameOptions.js";
export default function getGames(_, res) {
    res.send({ success: true, games: gameOptions });
}
//# sourceMappingURL=getGames.js.map