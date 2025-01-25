"use client";

import { Button } from "@/components/ui/button";
import { H4 } from "./Headings";
import { RefreshCw } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchGameIcon } from "@/utils/fetchGameIcon";

type PublicRoomType = {
  name: string;
  mode: string;
  users: number;
  code: string;
};

export default function RoomList() {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState(false);
  const [roomList, setRoomList] = useState<PublicRoomType[]>();

  function getPublicRooms() {
    startTransition(async () => {
      try {
        const resString = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + "/rooms"
        );
        const resData: PublicRoomType[] = await resString.json();
        setRoomList(resData);
      } catch {
        setError(true);
      }
    });
  }

  useEffect(getPublicRooms, []);

  return (
    <>
      <Button className="mt-6" onClick={getPublicRooms} disabled={pending}>
        <RefreshCw className={pending ? "animate-spin" : ""} />
        <span>{pending ? "Refreshing..." : "Refresh"}</span>
      </Button>
      {error ? (
        <p className="text-destructive mt-8">
          Error fetching public rooms, please try again.
        </p>
      ) : roomList && roomList.length > 0 ? (
        <ul className="mt-8 grid xl:grid-cols-3 md:grid-cols-2 gap-8 max-w-6xl">
          {roomList.map(room => (
            <Room {...room} key={room.code} />
          ))}
        </ul>
      ) : (
        <p className="text-center place-self-center mt-8 font-bold">
          Looks like there's no public rooms at the moment. Go ahead and make
          your own!
        </p>
      )}
    </>
  );
}

function Room({ name, mode, users, code }: PublicRoomType) {
  const url = new URL(window.location.href);
  url.hash = "";

  return (
    <Link href={`/${code}`}>
      <li
        className="rounded-2xl bg-white border-orange-200 border-2 p-6 transition-all duration-200 hover:-translate-y-1 shadow-md shadow-orange-50 hover:shadow-lg hover:shadow-green-100 hover:border-orange-300 cursor-pointer flex justify-between items-center gap-8"
        aria-label={`Join room ${"roomName"}`}
      >
        <div className="space-y-1">
          <H4 className="break-all">{name}</H4>
          <p className="text-gray-700">{mode}</p>
          <p>
            {`👤 ${users}/4 `}
            <span className="text-gray-500 text-sm">{`(${code})`}</span>
          </p>
        </div>
        <img
          src={`/gameicons/${fetchGameIcon(mode) || "selector-icon.svg"}`}
          className="h-24"
        />
      </li>
    </Link>
  );
}
