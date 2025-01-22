import { useEffect, useState } from "react";
import socket from "@/lib/socket";
import { UnoClientState, UnoSpectatorState } from "../types";

export default function useUnoState() {
  const [unoState, setUnoState] = useState<UnoClientState>();
  const [spectatorState, setSpectatorState] = useState<UnoSpectatorState>();

  useEffect(() => {
    socket.on("uno:updateState", (state: UnoClientState) => {
      setUnoState(state);
    });
    socket.on("uno:updateSpectator", (state: UnoSpectatorState) => {
      setSpectatorState(state);
    });

    return () => {
      socket.off("uno:updateState");
      socket.off("uno:updateSpectator");
    };
  }, []);

  return { unoState, spectatorState };
}
