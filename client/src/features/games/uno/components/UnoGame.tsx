import useUnoState from "../hooks/useUnoState";
import UnoCard from "./UnoCard";

export default function UnoGame() {
  const unoState = useUnoState();

  if (unoState)
    return (
      <div className="absolute bg-teal-400 w-full h-full pb-12">
        <div className="absolute bottom-16 flex left-1/2 -translate-x-1/2 gap-2">
          {unoState.cards.map((card, index) => (
            <UnoCard color={card.color} face={card.face} key={index} />
          ))}
        </div>
      </div>
    );
}
