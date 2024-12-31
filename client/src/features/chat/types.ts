export type ClientMessageType =
  | {
      sentByMe: true;
      sender: string;
      content: string;
      serverNotification?: undefined;
      sentAt: number;
    }
  | {
      sentByMe: false;
      sender: string;
      content: string;
      serverNotification: false;
      sentAt: number;
    }
  | {
      sentByMe?: undefined;
      sender?: undefined;
      content: string;
      serverNotification: true;
      sentAt?: undefined;
    };

export type ServerMessageType =
  | {
      sender?: undefined;
      content: string;
      serverNotification: true;
      sentAt?: undefined;
      cache?: boolean;
    }
  | {
      sender: string;
      content: string;
      serverNotification: false;
      sentAt: number;
      cache?: boolean;
    };
