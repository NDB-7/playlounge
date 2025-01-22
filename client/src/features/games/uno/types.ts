type Colors = "red" | "blue" | "green" | "yellow";
export type CardFace =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | "skip"
  | "reverse"
  | "+2";
export type WildCardFace = "+4" | "none";

export type Card = {
  id: string;
  color: Colors;
  face: CardFace;
};

export type WildCard = {
  id: string;
  color: Colors | "none";
  face: WildCardFace;
};

export type UnoClientState = {
  otherPlayers: {
    name: string;
    cardCount: number;
  }[];
  lastCard: Card | WildCard;
  cards: (Card | WildCard)[];
  whoseTurn: string;
};

export type UnoSpectatorState = {
  players: {
    name: string;
    cardCount: number;
  }[];
  lastCard: Card | WildCard;
  whoseTurn: string;
};
