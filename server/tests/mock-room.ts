import { User, ActiveRoomType } from "../src/types";

const mockRoom: ActiveRoomType = {
  data: {
    name: "Testing room",
    code: "TEST",
    createdAt: Date.now(),
  },
  isPrivate: false,
  sessionToUsersMap: new Map<string, User>(),
  activeSessionsMap: new Map<string, string>(),
  game: {
    mode: null,
    state: "waiting",
    gameData: null,
  },
};

export default mockRoom;
