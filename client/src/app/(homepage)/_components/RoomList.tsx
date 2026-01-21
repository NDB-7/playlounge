"use client";

import { Button } from "@/components/ui/button";
import { H4 } from "./Headings";
import { RefreshCw } from "lucide-react";
import Link from "next/link";
import { fetchGameIcon } from "@/utils/fetchGameIcon";
import { useQuery } from "@tanstack/react-query";

async function fetchPublicRooms() {
  const res = await fetch("/api/rooms");
  const data: PublicRoomType[] = await res.json();
  return data;
}

type PublicRoomType = {
  name: string;
  mode: string;
  users: number;
  code: string;
};

export default function RoomList() {
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["publicRooms"],
    queryFn: fetchPublicRooms,
  });

  return (
    <>
      <Button className="mt-6" onClick={() => refetch()} disabled={isLoading}>
        <RefreshCw className={isLoading ? "animate-spin" : ""} />
        <span>{isLoading ? "Refreshing..." : "Refresh"}</span>
      </Button>
      {isError ? (
        <p className="text-destructive mt-8">
          Error fetching public rooms, please try again.
        </p>
      ) : data && data.length > 0 ? (
        <ul className="mt-8 grid xl:grid-cols-3 md:grid-cols-2 gap-8 max-w-6xl">
          {data.map(room => (
            <Room {...room} key={room.code} />
          ))}
        </ul>
      ) : (
        <p className="text-center place-self-center mt-8 font-bold">
          Looks like there&apos;s no public rooms at the moment. Go ahead and
          make your own!
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
          alt=""
        />
      </li>
    </Link>
  );
}
