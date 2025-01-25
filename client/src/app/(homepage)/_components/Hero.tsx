import { H1 } from "./Headings";
import CreateRoom from "./CreateRoom";

export default function Hero() {
  return (
    <div className="mt-12 flex flex-col items-center px-6">
      <H1 className="mt-12 header-anim relative">Welcome to PlayLounge! 👋</H1>
      <p className="mt-4 text-center text-gray-700 max-w-4xl leading-relaxed subheader-anim">
        Start playing a variety of free party games with your friends online, no
        sign-up required! 😄
      </p>
      <CreateRoom />
    </div>
  );
}
