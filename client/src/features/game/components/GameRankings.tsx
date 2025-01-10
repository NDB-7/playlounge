import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";
import socket from "@/lib/socket";
import { SessionType } from "@/types";
import useGameRankings from "../hooks/useGameRankings";
import { useReward } from "react-rewards";
import { useEffect } from "react";

export default function GameRankings({
  isOwner,
  session,
  currentUser,
}: {
  isOwner: boolean;
  session?: SessionType;
  currentUser: string;
}) {
  const { winner, mode } = useGameRankings() || {};
  const { reward } = useReward("confetti", "confetti", {
    lifetime: 1000,
    spread: 100,
  });
  const won = winner === currentUser;

  useEffect(() => {
    if (won) reward();
  }, [won]);

  return (
    <>
      <div className="px-8 pt-8 space-y-6 absolute">
        <div className="space-y-2">
          <div className="flex gap-3 items-center text-2xl">
            <h2 className="font-bold">
              {won
                ? "You won the game!"
                : winner
                ? `${winner} has won the ${mode} match!`
                : "The game has ended!"}
            </h2>
            <span id="confetti">🎮</span>
          </div>
          <p className="text-gray-700">
            {isOwner
              ? won
                ? "Good work! Are you ready for another game?"
                : "Are you ready for another game?"
              : won
              ? "Good work! Please wait for the owner to return to the game selector."
              : "Please wait for the owner to return to the game selector."}
          </p>
        </div>
        {isOwner && (
          <Button onClick={() => socket.emit("game:reset", session)}>
            Return to Game Selector <Gamepad2 />
          </Button>
        )}
      </div>
    </>
  );
}
