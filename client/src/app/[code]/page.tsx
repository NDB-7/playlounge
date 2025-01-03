"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import GameLoading from "@/features/info/components/GameLoading";
import { SessionInUse } from "@/features/info/components/SessionInUse";
import SetNameDialog from "@/features/room/components/SetNameDialog";
import InputBox from "@/features/chat/components/InputBox";
import { Sidebar } from "@/features/chat/components/Sidebar";
import RoomInfo from "@/features/room/components/RoomInfo";
import useRoomInfo from "@/features/room/hooks/useRoomInfo";
import useSession from "@/features/room/hooks/useSession";
import useOnlineUsers from "@/features/room/hooks/useOnlineUsers";
import GameSelector from "@/features/game/components/GameSelector";
import useOwner from "@/features/room/hooks/useOwner";

export default function RoomPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);

  const [currentUser, setCurrentUser] = useState("");

  const roomInfo = useRoomInfo(code);
  const onlineUsers = useOnlineUsers();
  const { sessionInUse, session, setSession } = useSession(
    setCurrentUser,
    code
  );
  const owner = useOwner();

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

  return (
    <div className="fixed flex w-full h-full">
      <title>{`${roomInfo.name} | QuickRoom`}</title>
      <div className="blur-overlay" />
      <RoomInfo roomInfo={roomInfo} code={code} />
      <main className="relative h-full flex-grow overflow-hidden pt-12">
        <GameSelector isOwner={owner === currentUser} />
      </main>
      <Sidebar onlineUsers={onlineUsers} currentUser={currentUser}>
        {session && <InputBox session={session} />}
      </Sidebar>
    </div>
  );
}
