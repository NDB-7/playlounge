import { SessionType } from "@/types";
import { MoreHorizontal } from "lucide-react";

export default function User({
  name,
  isOwner,
  session,
}: {
  name: string;
  isOwner: boolean;
  session: SessionType | undefined;
}) {
  return (
    <div className="bg-white border-b-2 w-full text-left h-12 px-4 flex items-center justify-between">
      <span>{name}</span>
      {isOwner && <MoreHorizontal aria-label={name} />}
    </div>
  );
}
