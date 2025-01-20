import { fetchGameIcon } from "@/utils/fetchGameIcon";

export default function GameOptionStatic({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <li className="rounded-md border-2 p-4 bg-gray-50">
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
