import CheckText from "./CheckText";
import { H1, H2 } from "./Headings";
import Image from "next/image";
import CreateRoom from "./CreateRoom";

export default function Hero() {
  return (
    <div className="mt-16 flex flex-col items-center px-6">
      <H1 className="mt-12 header-anim relative">
        Instant chatrooms, just a code away
      </H1>
      <p className="mt-6 text-center text-lg text-gray-700 max-w-3xl leading-relaxed subheader-anim">
        Create a chatroom in seconds with just a 4-digit code. Share it with
        your friends and start chatting instantly—no login required.
      </p>
      <CreateRoom />
      <div className="mt-24 flex flex-col items-center lg:flex-row lg:items-start lg:pl-16 gap-12 lg:gap-24 max-w-5xl w-full fade-left">
        <Image
          src="/images/imac.png"
          alt="Chatroom Example"
          width={468}
          height={387}
        />
        <div className="fade-right">
          <H2 className="mt-8">Getting started</H2>
          <div className="space-y-4 mt-6 lg:mt-8 sm:grid grid-cols-2 grid-rows-2 gap-x-8 lg:block">
            <CheckText text="Enter your chatroom name above." />
            <CheckText text="Click the button to get a link." />
            <CheckText text="Share it with your friends." />
            <CheckText text="Start chatting!" />
          </div>
        </div>
      </div>
      <img
        src="/images/big-gradient.svg"
        alt=""
        className="mt-[50rem] sm:mt-[36rem] md:mt-[30rem] lg:mt-32 -z-10 absolute"
      />
      <div className="absolute mt-72 w-full -z-10">
        <div className="bg-pattern h-80" />
        <div className="bg-pattern h-80" />
        <div className="bg-pattern h-80" />
      </div>
    </div>
  );
}
