import { useEffect, useState } from "react";
import socket from "../../../lib/socket";

export default function useOwner() {
  const [owner, setOwner] = useState("");

  useEffect(() => {
    socket.on("room:ownerChange", (ownerName: string) => {
      setOwner(ownerName);
    });

    return () => {
      socket.off("room:ownerChange");
    };
  }, []);

  return owner;
}
