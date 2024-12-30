import { useEffect, useState } from "react";
import socket from "../socket";

export default function useOnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.on("updateUserList", onlineUserList => {
      setOnlineUsers(onlineUserList);
    });

    return () => {
      socket.off("updateUserList");
    };
  }, []);

  return onlineUsers;
}
