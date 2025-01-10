import { useEffect, useState } from "react";
import { GameOptionsResponse } from "../types";

export default function useGameOptions() {
  const [gameOptions, setGameOptions] = useState<GameOptionsResponse>();

  function fetchGames() {
    const abortController = new AbortController();

    const getGameOptions = async () => {
      try {
        const resString = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + "/games",
          {
            signal: abortController.signal,
          }
        );
        const resData: GameOptionsResponse = await resString.json();
        setGameOptions(resData);
      } catch {
        setGameOptions({ success: false });
      }
    };

    getGameOptions();

    return () => {
      abortController.abort();
    };
  }

  useEffect(fetchGames, []);

  return { gameOptions, fetchGames };
}
