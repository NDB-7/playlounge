import { LogOut } from "lucide-react";
import Link from "next/link";

export default function LeaveRoom({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      onClick={() => localStorage.removeItem("session")}
      aria-label="Leave Room"
      className={className}
    >
      <LogOut />
    </Link>
  );
}
