import { RoomInfoType } from "../types";
import { useQuery } from "@tanstack/react-query";

function fetchRoomInfo(code: string) {
  return async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_SERVER_URL + `/rooms/${code}`
    );
    const data: RoomInfoType = await res.json();
    return data;
  };
}

export default function useRoomInfo(code: string) {
  const { data, isError } = useQuery({
    queryKey: ["roomInfo", code],
    queryFn: fetchRoomInfo(code),
  });

  if (isError) return { success: false } as RoomInfoType;
  else return data;
}
