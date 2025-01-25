import { fetchGameIcon } from "@/utils/fetchGameIcon";
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
      className={`rounded-xl border-2 p-4 transition-[border] cursor-pointer ${
        selected
          ? "border-orange-400 shadow-md bg-orange-100"
          : "hover:border-orange-300 bg-orange-50"
      }`}
      role="button"
      aria-label={`Select game ${name}`}
      tabIndex={0}
      onClick={() => setSelectedGame(name)}
    >
      <div className="flex items-center gap-5">
        <img
          src={`/gameicons/${fetchGameIcon(name)}`}
          alt=""
          className="h-20"
        />
        <div>
          <h3 className="font-bold text-lg items-center">{name}</h3>
          <p className="text-gray-800 ml-auto">{description}</p>
        </div>
      </div>
    </li>
  );
}
