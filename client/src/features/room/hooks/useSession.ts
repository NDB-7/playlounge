import React, { SetStateAction, useEffect, useState } from "react";
import { SessionType } from "@/types";
import socket from "../../../lib/socket";
import { RejoinResponse } from "../types";
import { useSessionStore } from "@/lib/store";

export default function useSession(
  setCurrentUser: React.Dispatch<SetStateAction<string>>,
  code: string
) {
  const [sessionInUse, setSessionInUse] = useState<string>();
  const setSession = useSessionStore(state => state.setSession);

  useEffect(() => {
    const sessionString = localStorage.getItem("session");
    const parsedSession: SessionType =
      sessionString && JSON.parse(sessionString);

    if (parsedSession && parsedSession.room === code) {
      socket.emit("room:rejoin", parsedSession, (response: RejoinResponse) => {
        if (response.success) {
          setCurrentUser(response.name);
          setSession(parsedSession);
        } else {
          if (response.message) {
            setSessionInUse(response.message);
          }
          if (response.inactive) {
            localStorage.removeItem("session");
          }
        }
      });
    }
  }, [code, setCurrentUser]);

  return sessionInUse;
}
