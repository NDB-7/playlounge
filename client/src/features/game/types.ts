export type GameOptionsResponse =
  | {
      success: true;
      games: { name: string; description: string }[];
    }
  | {
      success: false;
    };
