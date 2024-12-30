import React, { SetStateAction, useEffect, useState } from "react";
import { RejoinResponse, SessionType } from "../types";
import socket from "../socket";

export default function useSession(
  setCurrentUser: React.Dispatch<SetStateAction<string>>,
  code: string
) {
  const [sessionInUse, setSessionInUse] = useState<string>();
  const [session, setSession] = useState<SessionType>();

  useEffect(() => {
    const sessionString = localStorage.getItem("session");
    const parsedSession: SessionType =
      sessionString && JSON.parse(sessionString);

    if (parsedSession && parsedSession.room === code) {
      socket.emit("rejoin", parsedSession, (response: RejoinResponse) => {
        if (response.success) {
          setCurrentUser(response.name);
          setSession(parsedSession);
        } else {
          if (response.message) {
            setSessionInUse(response.message);
          }
          if (response.expired) {
            localStorage.removeItem("session");
          }
        }
      });
    }
  }, [code, setCurrentUser]);

  return { sessionInUse, session, setSession };
}
