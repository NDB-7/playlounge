import UnoDummyCard from "./UnoDummyCard";

export default function OtherHand({
  name,
  cardCount,
  whoseTurn,
  index,
  playerCount,
}: {
  name: string;
  cardCount: number;
  whoseTurn: string;
  index: number;
  playerCount: number;
}) {
  return (
    <div
      className={`absolute -translate-x-1/2 ${
        playerCount === 2
          ? "top-4 left-1/2 w-3/4 rotate-180"
          : playerCount > 2 &&
            (index === 0
              ? "left-20 -translate-y-1/2 top-[47%] w-1/2 rotate-90"
              : index === 1
              ? "top-4 left-1/2 w-3/4 rotate-180"
              : "left-[94%] -translate-y-1/2 top-[47%] w-1/2 rotate-[270deg]")
      }`}
    >
      <p
        className={`text-center mb-4 text-xl text-gray-700 transition-all ${
          whoseTurn === name && "font-bold text-black"
        }`}
      >
        {name}
      </p>
      <div className="flex justify-center gap-1 max-w-[100%] flex-wrap mb-12 lg:mb-16 xl:mb-24">
        {Array.from({ length: cardCount }).map((_, cardIndex) => (
          <UnoDummyCard key={cardIndex} isTurn={whoseTurn === name} />
        ))}
      </div>
    </div>
  );
}
