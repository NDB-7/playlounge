import { useEffect, useState } from "react";
import { RoomInfoType } from "../types";

export default function useRoomInfo(code: string) {
  const [roomInfo, setRoomInfo] = useState<RoomInfoType>();

  useEffect(() => {
    const abortController = new AbortController();

    const getRoomInfo = async () => {
      try {
        const resString = await fetch(
          process.env.NEXT_PUBLIC_SERVER_URL + `/rooms/${code}`,
          {
            signal: abortController.signal,
          }
        );
        const resData: RoomInfoType = await resString.json();
        setRoomInfo(resData);
      } catch {
        setRoomInfo({ success: false });
      }
    };

    getRoomInfo();

    return () => {
      abortController.abort();
    };
  }, [code]);

  return roomInfo;
}
