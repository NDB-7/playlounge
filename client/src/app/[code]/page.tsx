"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import GameLoading from "@/features/info/components/GameLoading";
import { SessionInUse } from "@/features/info/components/SessionInUse";
import SetNameDialog from "@/features/room/components/SetNameDialog";
import InputBox from "@/features/sidebar/components/chat/InputBox";
import { Sidebar } from "@/features/sidebar/components/Sidebar";
import RoomInfo from "@/features/room/components/RoomInfo";
import useRoomInfo from "@/features/room/hooks/useRoomInfo";
import useSession from "@/features/room/hooks/useSession";
import useOnlineUsers from "@/features/room/hooks/useOnlineUsers";
import GameSelector from "@/features/game/components/GameSelector";
import useOwner from "@/features/room/hooks/useOwner";
import useGameState from "@/features/game/hooks/useGameState";
import UnoGame from "@/features/games/uno/components/UnoGame";
import GameRankings from "@/features/game/components/GameRankings";
import { Button } from "@/components/ui/button";
import socket from "@/lib/socket";
import { MessageSquareMore } from "lucide-react";
import useKicked from "@/features/room/hooks/useKicked";
import KickedDialog from "@/features/room/components/KickedDialog";

export default function RoomPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);

  const [currentUser, setCurrentUser] = useState("");
  const [mobileChat, setMobileChat] = useState(false);

  const roomInfo = useRoomInfo(code);
  const { sessionInUse, session, setSession } = useSession(
    setCurrentUser,
    code
  );
  const onlineUsers = useOnlineUsers();
  const owner = useOwner();
  const gameState = useGameState();
  const kicked = useKicked();
  const gameComponents: { [key: string]: React.ReactNode | null } = {
    UNO: (
      <UnoGame
        currentUser={currentUser}
        session={session}
        onlineUsers={onlineUsers}
      />
    ),
  };

  if (!roomInfo) return <GameLoading />;
  if (sessionInUse) return <SessionInUse>{sessionInUse}</SessionInUse>;
  if (!roomInfo.success) return notFound();
  if (currentUser === "")
    return (
      <SetNameDialog
        setCurrentUser={setCurrentUser}
        setSession={setSession}
        room={code}
      />
    );
  if (kicked) return <KickedDialog />;

  return (
    <div className="fixed flex w-full h-full">
      <title>{`${roomInfo.name} | QuickRoom`}</title>
      <div className="blur-overlay" />
      <RoomInfo roomInfo={roomInfo} code={code}>
        {gameState?.state === "active" && owner === currentUser && (
          <Button
            variant="destructive"
            onClick={() => {
              socket.emit("game:stopGame", session);
            }}
          >
            Stop Game
          </Button>
        )}
        <button
          onClick={() => setMobileChat(!mobileChat)}
          aria-label="Toggle Chat"
          className="hover:scale-105 transition-transform md:hidden"
        >
          <MessageSquareMore />
        </button>
      </RoomInfo>
      <main className="relative h-full flex-grow overflow-hidden pt-12">
        {session && gameState?.state === "waiting" ? (
          <GameSelector isOwner={owner === currentUser} session={session} />
        ) : gameState?.state === "active" ? (
          gameState?.mode && gameComponents[gameState.mode]
        ) : (
          <GameRankings
            isOwner={owner === currentUser}
            session={session}
            currentUser={currentUser}
          />
        )}
      </main>
      <Sidebar
        onlineUsers={onlineUsers}
        currentUser={currentUser}
        mobileChat={mobileChat}
        owner={owner}
        session={session}
      >
        {session && <InputBox session={session} />}
      </Sidebar>
    </div>
  );
}
