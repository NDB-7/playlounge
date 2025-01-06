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

type Card = {
  color: Colors;
  face: CardFace;
};

type WildCard = {
  color: Colors & "none";
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
