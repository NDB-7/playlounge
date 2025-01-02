import { SetStateAction } from "react";

export default function GameOption({
  name,
  description,
  selected,
  setSelectedGame,
}: {
  name: string;
  description: string;
  selected: boolean;
  setSelectedGame: React.Dispatch<SetStateAction<string>>;
}) {
  return (
    <li
      className={`rounded-md border-2 p-4 hover:bg-gray-100 cursor-pointer ${
        selected ? "bg-gray-100 border-gray-400 shadow-md" : "bg-gray-50"
      }`}
      role="button"
      aria-label={`Select game ${name}`}
      tabIndex={0}
      onClick={() => setSelectedGame(name)}
    >
      <div className="flex gap-2">
        <h3 className="font-bold text-lg items-center">{name}</h3>
      </div>
      <p className="text-gray-800">{description}</p>
    </li>
  );
}
