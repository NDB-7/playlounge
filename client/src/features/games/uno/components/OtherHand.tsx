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
    <div className="absolute top-4 left-1/2 -translate-x-1/2 rotate-180">
      <p
        className={`text-center mb-4 text-xl ${
          whoseTurn === name && "font-bold"
        }`}
      >
        {name}
      </p>
      <div className="flex gap-2">
        {Array.from({ length: cardCount }).map((_, cardIndex) => (
          <UnoDummyCard key={cardIndex} />
        ))}
      </div>
    </div>
  );
}
