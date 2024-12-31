import { LogOut } from "lucide-react";
import Link from "next/link";

export default function LeaveRoom() {
  return (
    <Link
      href="/"
      onClick={() => localStorage.removeItem("session")}
      aria-label="Leave Room"
      className="hover:scale-105 transition-transform"
    >
      <LogOut />
    </Link>
  );
}
