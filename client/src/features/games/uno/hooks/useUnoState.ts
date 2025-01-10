import { useEffect, useState } from "react";
import socket from "@/lib/socket";
import { UnoClientState } from "../types";

export default function useUnoState() {
  const [unoState, setUnoState] = useState<UnoClientState>();

  useEffect(() => {
    socket.on("uno:updateState", (state: UnoClientState) => {
      setUnoState(state);
    });

    return () => {
      socket.off("uno:updateState");
    };
  }, []);

  return unoState;
}
