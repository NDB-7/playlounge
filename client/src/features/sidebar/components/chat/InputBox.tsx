import { useState } from "react";
import { SessionType } from "../../../../types";
import socket from "../../../../lib/socket";
import { SendHorizontal } from "lucide-react";

export default function InputBox({ session }: { session: SessionType }) {
  const [messageInput, setMessageInput] = useState("");
  const [rateLimited, setRateLimited] = useState(false);

  function handleMessageInput() {
    if (messageInput !== "")
      socket.emit(
        "chat:sendMessage",
        messageInput,
        session,
        (rateLimited: boolean) => setRateLimited(rateLimited)
      );
    setMessageInput("");
  }

  if (rateLimited)
    return (
      <div className="sticky bottom-0 w-full p-2">
        <div className="flex items-center h-10 rounded-md bg-gray-50 justify-between border-2 border-gray-200">
          <div className="ml-4 bg-transparent w-full outline-none pr-2 text-gray-700">
            Don&apos;t spam!
          </div>
          <button
            className="bg-cyan-500 h-5/6 aspect-square rounded-md px-2 text-white mr-1 flex items-center justify-center hover:scale-105 transition-transform"
            onClick={() => setRateLimited(false)}
          >
            OK
          </button>
        </div>
      </div>
    );

  return (
    <div className="sticky bottom-0 w-full p-2">
      <form
        className="flex items-center h-10 rounded-full bg-gray-50 justify-between border-2 border-gray-200"
        onSubmit={e => e.preventDefault()}
      >
        <input
          className="ml-4 bg-transparent w-full outline-none pr-2"
          placeholder="Type to chat..."
          aria-label="Message input box"
          maxLength={150}
          value={messageInput}
          onChange={e => setMessageInput(e.target.value)}
        />
        <button
          className="bg-cyan-500 h-5/6 aspect-square rounded-full mr-1 flex items-center justify-center hover:scale-105 transition-transform"
          onClick={handleMessageInput}
        >
          <SendHorizontal className="w-7/12 h-7/12 stroke-white" />
        </button>
      </form>
    </div>
  );
}
