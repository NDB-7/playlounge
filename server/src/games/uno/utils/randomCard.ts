import e from "cors";
import { Card, CardFace, Colors, WildCard } from "../types.js";

const COLORS: Colors[] = ["red", "blue", "green", "yellow"];

export default function randomCard(allowWildCards: boolean) {
  const isWildCard = Math.floor(Math.random() * 27) < 2;

  if (isWildCard && allowWildCards) {
    const isPlusFour = Math.floor(Math.random() * 2) < 1;
    const cardToReturn: WildCard = {
      id: crypto.randomUUID(),
      color: "none",
      face: isPlusFour ? "+4" : "none",
    };

    return cardToReturn;
  } else {
    const cardColor = COLORS[Math.floor(Math.random() * 4)];
    const randomInt = Math.floor(Math.random() * 25);
    let cardFace: CardFace;

    if (randomInt > 9 && randomInt < 19) cardFace = randomInt - 9;
    else if (randomInt >= 19) {
      switch (randomInt) {
        case 19:
        case 20:
          cardFace = "skip";
          break;
        case 21:
        case 22:
          cardFace = "reverse";
          break;
        default:
          cardFace = "+2";
          break;
      }
    } else cardFace = randomInt as CardFace;

    const cardToReturn: Card = {
      id: crypto.randomUUID(),
      color: cardColor,
      face: cardFace,
    };

    return cardToReturn;
  }
}
