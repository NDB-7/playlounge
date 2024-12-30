import { useEffect, useState } from "react";
import { GameInfoType } from "../types";

export default function useGameInfo(code: string) {
  const [gameInfo, setGameInfo] = useState<GameInfoType>();

  useEffect(() => {
    const abortController = new AbortController();

    const getGameInfo = async () => {
      try {
        const resString = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + `/rooms/${code}`,
          {
            signal: abortController.signal,
          }
        );
        const resData: GameInfoType = await resString.json();
        setGameInfo(resData);
      } catch {
        setGameInfo({ success: false });
      }
    };

    getGameInfo();

    return () => {
      abortController.abort();
    };
  }, [code]);

  return gameInfo;
}
