export default function GameOptionStatic({
  name,
  description,
}: {
  name: string;
  description: string;
}) {
  return (
    <li className="rounded-md border-2 p-4 bg-gray-50">
      <div className="flex gap-2">
        <h3 className="font-bold text-lg items-center">{name}</h3>
      </div>
      <p className="text-gray-800">{description}</p>
    </li>
  );
}
