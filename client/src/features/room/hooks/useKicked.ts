import { useEffect, useState } from "react";
import socket from "../../../lib/socket";

export default function useKicked() {
  const [kicked, setKicked] = useState(false);

  useEffect(() => {
    socket.on("room:kicked", callback => {
      localStorage.removeItem("session");
      setKicked(true);
      callback();
    });

    return () => {
      socket.off("room:kicked");
    };
  }, []);

  return kicked;
}
