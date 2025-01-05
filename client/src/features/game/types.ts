export type GameOptionsResponse =
  | {
      success: true;
      games: { name: string; description: string }[];
    }
  | {
      success: false;
    };

export type GameState = {
  mode: string | null;
  state: "active" | "finished" | "waiting";
};
