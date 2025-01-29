import { create } from "zustand";

export const useSessionStore = create<{
  session: {
    id: string;
    room: string;
  };
  setSession: ({ id, room }: { id: string; room: string }) => void;
}>(set => ({
  session: {
    id: "",
    room: "",
  },
  setSession: ({ id, room }: { id: string; room: string }) =>
    set(() => ({ session: { id, room } })),
}));
