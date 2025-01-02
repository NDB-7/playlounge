import { Button } from "@/components/ui/button";
import { Rocket, RotateCw } from "lucide-react";
import { useState } from "react";
import GameOption from "./GameOption";
import useGameOptions from "../hooks/useGameOptions";

export default function GameSelector() {
  const [selectedGame, setSelectedGame] = useState("");
  const { gameOptions, fetchGames } = useGameOptions();

  return (
    <div className="px-8 pt-8 space-y-6">
      <div className="space-y-2">
        <div className="flex gap-3 items-center text-2xl">
          <h2 className="font-bold">What would you like to play?</h2>
          <span>🎮</span>
        </div>
        <p className="text-gray-700">Select a game to begin playing!</p>
      </div>
      {gameOptions?.success ? (
        <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
          {gameOptions.games.map(({ name, description }) => (
            <GameOption
              name={name}
              description={description}
              selected={name === selectedGame}
              setSelectedGame={setSelectedGame}
              key={name}
            />
          ))}
        </ul>
      ) : (
        <>
          <p className="text-destructive">
            Games could not be fetched from the server, try again later.
          </p>
          <Button>
            Try again <RotateCw />
          </Button>
        </>
      )}
      {selectedGame && (
        <Button>
          Start Game <Rocket />
        </Button>
      )}
    </div>
  );
}
