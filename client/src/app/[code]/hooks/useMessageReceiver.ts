import { RefObject, useEffect, useRef, useState } from "react";
import socket from "../socket";
import { ClientMessageType, ServerMessageType } from "../types";
import { playAudio } from "@/utils/playAudio";

export default function useMessageReceiver(
  currentUser: string,
  mainRef: RefObject<HTMLDivElement | null>
) {
  const [messages, setMessages] = useState<ClientMessageType[]>([]);
  const sendAudioRef = useRef<HTMLAudioElement>(null);
  const receiveAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    sendAudioRef.current = new Audio("/sounds/send.mp3");
    receiveAudioRef.current = new Audio("/sounds/receive.mp3");
  }, []);

  useEffect(() => {
    socket.on("receiveMessage", (message: ServerMessageType) => {
      let newMessage: ClientMessageType;
      const { sender, content, serverNotification, sentAt, cache } = message;
      if (sender === currentUser) {
        newMessage = { sentByMe: true, sender, content, sentAt };
        if (!cache) playAudio(sendAudioRef.current);
      } else {
        if (!serverNotification)
          newMessage = {
            sentByMe: false,
            sender,
            content,
            serverNotification,
            sentAt,
          };
        else
          newMessage = {
            content,
            serverNotification,
          };
        if (!cache) playAudio(receiveAudioRef.current);
      }
      setMessages(prevState => [...prevState, newMessage]);
      if (!cache)
        mainRef.current?.scrollTo({
          top: mainRef.current.scrollHeight,
          behavior: "smooth",
        });
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [currentUser, mainRef]);

  return { messages, mainRef };
}
