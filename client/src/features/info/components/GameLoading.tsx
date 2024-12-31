import { LoaderCircle } from "lucide-react";

export default function GameLoading() {
  return (
    <div className="flex flex-col mt-8 text-2xl items-center">
      <h1>Loading your game...</h1>
      <LoaderCircle className="animate-spin mt-6" width={48} height={48} />
    </div>
  );
}
