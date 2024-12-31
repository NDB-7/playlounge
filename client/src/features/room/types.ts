export type RoomInfoType =
  | {
      success: true;
      name: string;
    }
  | {
      success: false;
    };

export type RejoinResponse =
  | {
      success: true;
      name: string;
    }
  | {
      success: false;
      expired: boolean;
      message?: string;
    };

export type SetNameResponse =
  | {
      success: true;
      session: { room: string; id: string };
    }
  | {
      success: false;
      message: string;
    };
