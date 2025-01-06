import { CardFace, WildCardFace } from "../types";

export default function UnoCard({
  color,
  face,
}: {
  color: string;
  face: CardFace | WildCardFace;
}) {
  return (
    <div
      className={`bg-${color}-500 h-36 w-24 rounded-2xl border-white border-4 flex items-center justify-center`}
    >
      <div className="rounded-full w-2/3 h-2/3 bg-white flex items-center justify-center">
        <span className="text-4xl font-bold select-none">
          {face === "none" ? "" : face}
        </span>
      </div>
    </div>
  );
}
