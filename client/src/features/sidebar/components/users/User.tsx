import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import socket from "@/lib/socket";
import { useSessionStore } from "@/lib/store";
import { Crown, MoreHorizontal, UserIcon } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

export default function User({
  name,
  currentUser,
  owner,
}: {
  name: string;
  currentUser: string;
  owner: string;
}) {
  const session = useSessionStore(useShallow(state => state.session));

  return (
    <div className="border-b-2 w-full text-left h-12 px-3 flex items-center justify-between bg-background">
      <div className="flex gap-3">
        {name === owner ? <Crown /> : <UserIcon />}
        <span>{name}</span>
      </div>
      {owner === currentUser && name !== currentUser && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal aria-label={name} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <button
                className="h-full w-full text-left text-destructive"
                onClick={() => socket.emit("room:ownerTransfer", session, name)}
              >
                Make Owner
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <button
                className="h-full w-full text-left text-destructive"
                onClick={() => socket.emit("room:kickUser", session, name)}
              >
                Kick
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
