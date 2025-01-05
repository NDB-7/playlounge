import { UnoGameData } from "./games/uno/types.js";

export type ActiveRoomType = {
  data: {
    name: string;
    createdAt: number;
  };
  sessionToUsersMap: Map<string, User>;
  activeSessionsMap: Map<string, string>;
  game: Game;
};

type Game = {
  mode: string | null;
  state: "active" | "finished" | "waiting";
  gameData: null | UnoGameData;
};

export type User = {
  name: string;
  role: UserRole;
};

export type UserRole = "player" | "owner" | "spectator";

export type ServerMessageType = {
  sender?: string;
  content: string;
  serverNotification: boolean;
  sentAt?: number;
};
