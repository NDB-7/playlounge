"use client";

import { Button } from "@/components/ui/button";
import { Globe2, LoaderCircle, Lock, Pencil, Rocket } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { H3 } from "./Headings";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

async function createRoom(data: { name: string; isPrivate: boolean }) {
  const { name, isPrivate } = data;
  const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, isPrivate }),
  });

  const { success, code } = await response.json();
  if (success) return code;
  else throw new Error("Failed to create room");
}

export default function CreateRoom() {
  const [nameInput, setNameInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const router = useRouter();

  const { data, isError, isPending, mutate } = useMutation({
    mutationFn: createRoom,
  });

  function submitHandler(e: FormEvent) {
    e.preventDefault();
    mutate({ name: nameInput, isPrivate });
  }

  if (!data)
    return (
      <div className="home-input w-full flex items-center flex-col">
        <div className="space-y-1 w-[45rem] max-w-full mt-10">
          <div className="space-y-4">
            <H3 className="text-center">Create your own room</H3>
            <form className="mt-10 relative" onSubmit={submitHandler}>
              <Input
                type="text"
                maxLength={30}
                placeholder="Enter chatroom name here"
                className="bg-white rounded-full py-2 px-6 shadow-sm w-full transition-all h-10 md:text-base"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                required
              />
              <div className="flex gap-1 absolute right-1 top-1 h-8">
                <Button
                  className="rounded-full h-full bg-green-500 hover:bg-green-400"
                  disabled={isPending}
                  type="button"
                  onClick={() => setIsPrivate(prev => !prev)}
                >
                  {isPrivate ? (
                    <>
                      <Lock />
                      <span className="hidden sm:inline">Private</span>
                    </>
                  ) : (
                    <>
                      <Globe2 />
                      <span className="hidden sm:inline">Public</span>
                    </>
                  )}
                </Button>
                <Button className="rounded-full h-full" disabled={isPending}>
                  {isPending ? (
                    <>
                      <LoaderCircle className="animate-spin" />
                      <span className="hidden sm:inline">Creating...</span>
                    </>
                  ) : (
                    <>
                      <Pencil />
                      <span className="hidden sm:inline">Create</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
          {isError && (
            <div className="text-destructive pl-6">
              Error creating your room, try again.
            </div>
          )}
        </div>
        <p className="mt-6 text-gray-500 tracking-wider text-center">OR</p>
        <div className="space-y-1 w-[25rem] max-w-full mt-4">
          <div className="space-y-4">
            <H3 className="text-center">Join a private room</H3>
            <form
              className="mt-10 relative"
              onSubmit={e => {
                e.preventDefault();
                const url = new URL(window.location.href);
                url.hash = "";
                router.push(url.href + codeInput.toUpperCase());
              }}
            >
              <Input
                type="text"
                maxLength={4}
                placeholder="Enter room code here"
                className="bg-white rounded-full py-2 px-6 shadow-sm w-full transition-all h-10 md:text-base uppercase placeholder-shown:normal-case"
                value={codeInput}
                onChange={e => setCodeInput(e.target.value)}
                required
              />
              <Button className="absolute right-1 top-1 rounded-full h-8">
                <Rocket />
                Join
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  else {
    const url = new URL(window.location.href);
    url.hash = "";

    return (
      <p className="mt-10 bg-white border-orange-300 border-2 rounded-md scale-125 py-2 px-6 shadow-lg shadow-orange-100 mx-8">
        <span className="block">Here&apos;s your room!</span>
        <Link href={`/${data}`} className="underline">
          {url.href}
          <wbr />
          {data}
        </Link>
      </p>
    );
  }
}
