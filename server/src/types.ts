export type ActiveRoomType = {
  data: {
    name: string;
    createdAt: number;
  };
  sessionToUsersMap: Map<string, User>;
  activeSessionsMap: Map<string, string>;
  game?: Game;
};

type Game =
  | {
      mode: string;
      state: "active" | "finished";
    }
  | { mode: null; state: "waiting" };

export type User = {
  name: string;
  role: "player" | "owner" | "spectator";
};

export type ServerMessageType = {
  sender?: string;
  content: string;
  serverNotification: boolean;
  sentAt?: number;
};
