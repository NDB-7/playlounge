import Link from "next/link";

export default function RoomNotFound() {
  return (
    <div className="flex flex-col mt-8 text-2xl items-center text-center">
      <h1>
        This room doesn't exist, or is inactive.{" "}
        <Link href="/" className="underline hover:text-gray-600">
          Return to home.
        </Link>
      </h1>
    </div>
  );
}
