import socket from "@/lib/socket";
import { SessionType } from "@/types";
import { playAudio } from "@/utils/playAudio";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";

export default function UnoDummyCard({
  session,
  isTurn,
  online,
}: {
  session?: SessionType;
  isTurn?: boolean;
  online?: boolean;
}) {
  const drawCardRef = useRef<HTMLAudioElement>(null);

  function clickHandler() {
    if (session && isTurn) {
      socket.emit("uno:drawCard", session);
      playAudio(drawCardRef.current);
    }
  }

  useEffect(() => {
    let drawCardAudio: HTMLAudioElement;
    if (session) {
      drawCardAudio = new Audio("/sounds/uno/draw-card.mp3");
      drawCardRef.current = drawCardAudio;
    }

    return () => {
      if (drawCardAudio) {
        drawCardAudio.pause();
        drawCardAudio.src = "";
      }
    };
  }, [session]);

  return (
    <motion.div
      className={`bg-gray-300 uno-card border-white border-4 flex items-center justify-center  transition-all shadow overflow-hidden ${
        session && "cursor-pointer hover:scale-105"
      } ${!isTurn && (online === false ? "brightness-50" : "brightness-75")}`}
      onClick={clickHandler}
      exit={{ opacity: 0, y: -100, transition: { duration: 0.15 } }}
    >
      <img
        className="w-full h-full border-white rounded select-none"
        src="/textures/uno/card-back.svg"
        draggable={false}
      />
    </motion.div>
  );
}
