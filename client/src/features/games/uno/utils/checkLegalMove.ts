import { Card, WildCard } from "../types";

export default function checkLegalMove(
  card: Card | WildCard,
  lastCard: Card | WildCard
) {
  if (
    card.color === "none" ||
    card.color === lastCard.color ||
    card.face === lastCard.face
  )
    return true;
  return false;
}
