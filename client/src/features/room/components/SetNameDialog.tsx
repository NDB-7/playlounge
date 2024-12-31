import { FormEvent, useState } from "react";
import { SessionType } from "../../../types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import socket from "../../../lib/socket";
import { SetNameResponse } from "../types";

export default function SetNameDialog({
  setCurrentUser,
  setSession,
  room,
}: {
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
  setSession: React.Dispatch<React.SetStateAction<SessionType | undefined>>;
  room: string;
}) {
  const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (nameInput !== "") {
      socket.emit(
        "room:setName",
        nameInput,
        room,
        (response: SetNameResponse) => {
          if (response.success === false) {
            setNameError(response.message);
          } else {
            const { room, id } = response.session;
            const sessionString = JSON.stringify({
              room,
              id,
            });
            localStorage.setItem("session", sessionString);
            setSession({ room, id });
            setCurrentUser(nameInput.trim());
          }
        }
      );
    }
  }

  return (
    <Dialog open={true}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set your name</DialogTitle>
          <DialogDescription>
            You&apos;re currently joining a game. What name would you like to
            play under?
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-2" onSubmit={onSubmit}>
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={nameInput}
            maxLength={20}
            className="col-span-3"
            onChange={e => setNameInput(e.target.value)}
          />
          {nameError && <p className="text-destructive text-sm">{nameError}</p>}
          <DialogFooter>
            <Button type="submit" className="mt-4">
              Join game
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
