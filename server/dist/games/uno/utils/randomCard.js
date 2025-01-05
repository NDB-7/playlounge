const COLORS = ["red", "blue", "green", "yellow"];
export default function randomCard(allowWildCards) {
    const isWildCard = Math.floor(Math.random() * 27) < 2;
    if (isWildCard && allowWildCards) {
        const isPlusFour = Math.floor(Math.random() * 2) < 1;
        const cardToReturn = {
            color: "none",
            face: isPlusFour ? "+4" : "none",
        };
        return cardToReturn;
    }
    else {
        const cardColor = COLORS[Math.floor(Math.random() * 4)];
        const randomInt = Math.floor(Math.random() * 25);
        let cardFace;
        if (randomInt > 9 && randomInt < 19)
            cardFace = randomInt - 9;
        else if (randomInt > 19) {
            switch (randomInt) {
                case 20:
                case 21:
                    cardFace = "skip";
                    break;
                case 22:
                case 23:
                    cardFace = "reverse";
                    break;
                default:
                    cardFace = "+2";
                    break;
            }
        }
        const cardToReturn = {
            color: cardColor,
            face: cardFace,
        };
        return cardToReturn;
    }
}
//# sourceMappingURL=randomCard.js.map