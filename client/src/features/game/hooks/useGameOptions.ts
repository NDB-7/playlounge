import { GameOptionsResponse } from "../types";
import { useQuery } from "@tanstack/react-query";

async function fetchGames() {
  const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/games");
  const data: GameOptionsResponse = await res.json();
  return data;
}

export default function useGameOptions() {
  const { data, isError } = useQuery({
    queryKey: ["gameOptions"],
    queryFn: fetchGames,
  });

  if (isError)
    return {
      gameOptions: { success: false } as GameOptionsResponse,
      fetchGames,
    };
  else return { gameOptions: data, fetchGames };
}
