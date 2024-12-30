"use client";

import { useState, use, useRef } from "react";
import { notFound } from "next/navigation";
import ChatroomLoading from "./_components/info/GameLoading";
import { SessionInUse } from "./_components/info/SessionInUse";
import SetNameDialog from "./_components/dialogs/SetNameDialog";
import InputBox from "./_components/chat/main/InputBox";
import { Sidebar } from "./_components/chat/info/Sidebar";
import { ChatroomInfo } from "./_components/chat/info/GameInfo";
import useChatroomInfo from "./hooks/useGameInfo";
import useSession from "./hooks/useSession";
import useOnlineUsers from "./hooks/useOnlineUsers";

export default function RoomPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);

  const [currentUser, setCurrentUser] = useState("");

  const chatroomInfo = useChatroomInfo(code);
  const onlineUsers = useOnlineUsers();
  const { sessionInUse, session, setSession } = useSession(
    setCurrentUser,
    code
  );

  if (!chatroomInfo) return <ChatroomLoading />;
  if (sessionInUse) return <SessionInUse>{sessionInUse}</SessionInUse>;
  if (!chatroomInfo.success) return notFound();
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
      <title>{`${chatroomInfo.name} | QuickRoom`}</title>
      <div className="blur-overlay" />
      <ChatroomInfo chatroomInfo={chatroomInfo} code={code} />
      <main className="relative h-full flex-grow overflow-y-scroll overflow-x-hidden"></main>
      <Sidebar onlineUsers={onlineUsers} currentUser={currentUser}>
        {session && <InputBox session={session} />}
      </Sidebar>
    </div>
  );
}
