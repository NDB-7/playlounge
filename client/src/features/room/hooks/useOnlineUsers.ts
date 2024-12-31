import { useEffect, useState } from "react";
import socket from "../../../lib/socket";

export default function useOnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.on("room:updateUserList", onlineUserList => {
      setOnlineUsers(onlineUserList);
    });

    return () => {
      socket.off("room:updateUserList");
    };
  }, []);

  return onlineUsers;
}
