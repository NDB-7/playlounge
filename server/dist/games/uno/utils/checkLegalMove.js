export default function checkLegalMove(card, lastCard) {
    if (card.color === "none" ||
        card.color === lastCard.color ||
        card.face === lastCard.face)
        return true;
    return false;
}
//# sourceMappingURL=checkLegalMove.js.map