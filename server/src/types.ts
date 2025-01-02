export type ActiveRoomType = {
  data: {
    name: string;
    createdAt: number;
  };
  sessionToUsersMap: Map<string, string>;
  activeSessionsMap: Map<string, string>;
};

export type ServerMessageType = {
  sender?: string;
  content: string;
  serverNotification: boolean;
  sentAt?: number;
};
