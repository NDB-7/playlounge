import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { useState } from "react";
import GameOption from "./GameOption";

export default function GameSelector() {
  const [selectedGame, setSelectedGame] = useState("");

  return (
    <div className="px-8 pt-8 space-y-6">
      <div className="space-y-2">
        <div className="flex gap-3 items-center text-2xl">
          <h2 className="font-bold">What would you like to play?</h2>
          <span>🎮</span>
        </div>
        <p className="text-gray-700">Select a game to begin playing!</p>
      </div>
      <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
        <GameOption
          name="UNO"
          description="A classic card game. Whoever clears their hand first wins, but don't
        forget to declare UNO!"
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
        />
      </ul>
      {selectedGame && (
        <Button>
          Start Game <Rocket />
        </Button>
      )}
    </div>
  );
}
