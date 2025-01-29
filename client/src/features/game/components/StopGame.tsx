import { Button } from "@/components/ui/button";
import socket from "@/lib/socket";
import { useSessionStore } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";

export default function StopGame() {
  const session = useSessionStore(useShallow(state => state.session));

  return (
    <Button
      variant="destructive"
      onClick={() => {
        socket.emit("game:stopGame", session);
      }}
    >
      Stop Game
    </Button>
  );
}
