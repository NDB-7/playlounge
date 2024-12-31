"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import GameLoading from "./_components/info/GameLoading";
import { SessionInUse } from "./_components/info/SessionInUse";
import SetNameDialog from "./_components/dialogs/SetNameDialog";
import InputBox from "./_components/chat/main/InputBox";
import { Sidebar } from "./_components/chat/info/Sidebar";
import GameInfo from "./_components/chat/info/GameInfo";
import useGameInfo from "./hooks/useGameInfo";
import useSession from "./hooks/useSession";
import useOnlineUsers from "./hooks/useOnlineUsers";

export default function RoomPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);

  const [currentUser, setCurrentUser] = useState("");

  const gameInfo = useGameInfo(code);
  const onlineUsers = useOnlineUsers();
  const { sessionInUse, session, setSession } = useSession(
    setCurrentUser,
    code
  );

  if (!gameInfo) return <GameLoading />;
  if (sessionInUse) return <SessionInUse>{sessionInUse}</SessionInUse>;
  if (!gameInfo.success) return notFound();
  if (currentUser === "")
    return (
      <SetNameDialog
        setCurrentUser={setCurrentUser}
        setSession={setSession}
        room={code}
      />
    );

  return (
    <div className="fixed flex w-full h-full">
      <title>{`${gameInfo.name} | QuickRoom`}</title>
      <div className="blur-overlay" />
      <GameInfo gameInfo={gameInfo} code={code} />
      <main className="relative h-full flex-grow overflow-y-scroll overflow-x-hidden"></main>
      <Sidebar onlineUsers={onlineUsers} currentUser={currentUser}>
        {session && <InputBox session={session} />}
      </Sidebar>
    </div>
  );
}
