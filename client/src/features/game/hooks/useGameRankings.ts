import { useEffect, useState } from "react";
import socket from "@/lib/socket";

export default function useGameRankings() {
  const [rankings, setRankings] = useState({ winner: "", mode: "" });

  useEffect(() => {
    socket.on("game:rankings", (winner: string, mode: string) => {
      setRankings({ winner, mode });
    });

    return () => {
      socket.off("game:rankings");
    };
  }, []);

  return rankings;
}
