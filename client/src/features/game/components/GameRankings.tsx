import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";
import socket from "@/lib/socket";
import { SessionType } from "@/types";

export default function GameRankings({
  isOwner,
  session,
}: {
  isOwner: boolean;
  session?: SessionType;
}) {
  return (
    <div className="px-8 pt-8 space-y-6 absolute">
      <div className="space-y-2">
        <div className="flex gap-3 items-center text-2xl">
          <h2 className="font-bold">The game has ended!</h2>
          <span>🎮</span>
        </div>
        <p className="text-gray-700">
          {isOwner
            ? "Are you ready for another game?"
            : "Please wait for the owner to return to the game selector."}
        </p>
      </div>
      {isOwner && (
        <Button onClick={() => socket.emit("game:reset", session)}>
          Return to Game Selector <Gamepad2 />
        </Button>
      )}
    </div>
  );
}
