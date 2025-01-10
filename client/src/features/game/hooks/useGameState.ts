import { useEffect, useState } from "react";
import { GameState } from "../types";
import socket from "@/lib/socket";

export default function useGameState() {
  const [gameState, setGameState] = useState<GameState>();

  useEffect(() => {
    socket.on("game:gameStateChanged", (state: GameState) => {
      setGameState(state);
    });

    return () => {
      socket.off("game:gameStateChanged");
    };
  }, []);

  return gameState;
}
