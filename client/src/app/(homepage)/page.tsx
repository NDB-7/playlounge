import Navbar from "./_components/Navbar";
import Image from "next/image";
import { H2, H3 } from "./_components/Headings";
import Hero from "./_components/Hero";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="w-full mt-24 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1440"
            height="54"
            viewBox="0 0 1440 54"
            fill="none"
          >
            <path
              d="M378.346 26.3353C448.43 31.6241 516.29 41.1038 586.18 46.8534C685.734 55.0489 789.409 55.544 888.807 47.0446C985.401 38.805 1085.56 18.7083 1181.01 8.49828C1265.65 -0.559911 1358.06 -4.29004 1440 7.02779V54H-10V40.5941C113.813 21.5492 248.116 16.6181 378.346 26.3353Z"
              fill="white"
            />
          </svg>
        </div>
        <section className="bg-white flex flex-col items-center px-6">
          <H2 className="mt-12">What makes us unique?</H2>
          <p className="mt-4 text-gray-700 text-center">
            We offer the smoothest and safest chatting experience on the web.
          </p>
          <div className="mt-12 grid xl:grid-cols-3 md:grid-cols-2 gap-12">
            <div className="h-80 w-80 rounded-2xl border-gray-200 border-2 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-50 hover:border-gray-300">
              <H3>Effortless Sharing</H3>
              <p className="text-gray-700 mt-4">
                Share short, simple links to invite anyone into your chatroom.
                No signups or extra steps—just click and chat.
              </p>
              <Image
                src="/images/sharing.svg"
                alt="sharing"
                className="mt-7 mx-auto drop-shadow"
                width={227}
                height={87}
              />
            </div>
            <div className="h-80 w-80 rounded-2xl border-gray-200 border-2 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-50 hover:border-gray-300">
              <H3>Complete Privacy</H3>
              <p className="text-gray-700 mt-4">
                Your conversations stay yours. All data is automatically erased
                when the chatroom expires, protecting your privacy.
              </p>
              <Image
                src="/images/shield.svg"
                alt="privacy"
                className="mt-4 mx-auto drop-shadow"
                width={101}
                height={114}
              />
            </div>
            <div
              className="h-80 w-80 rounded-2xl border-gray-200 border-2 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-50 hover:border-gray-300"
              id="features"
            >
              <H3>Easy Rejoining</H3>
              <p className="text-gray-700 mt-4">
                Accidentally closed the tab? No problem. Rejoin the same
                chatroom instantly with seamless tab recovery.
              </p>
              <Image
                src="/images/chatting.svg"
                alt="connection"
                className="mt-2 mx-auto drop-shadow"
                width={203}
                height={111}
              />
            </div>
          </div>
        </section>
        <div className="w-full mt-24 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1440"
            height="54"
            viewBox="0 0 1440 54"
            fill="none"
          >
            <path
              d="M378.346 26.3353C448.43 31.6241 516.29 41.1038 586.18 46.8534C685.734 55.0489 789.409 55.544 888.807 47.0446C985.401 38.805 1085.56 18.7083 1181.01 8.49828C1265.65 -0.559911 1358.06 -4.29004 1440 7.02779V54H-10V40.5941C113.813 21.5492 248.116 16.6181 378.346 26.3353Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
        <section
          className="bg-gray-50 flex flex-col items-center px-6 pb-48"
          id="faq"
        >
          <H2 className="mt-12">Frequently Asked Questions</H2>
          <p className="mt-4 text-gray-700">
            Any other questions? Feel free to contact us.
          </p>
          <div className="mt-12 grid xl:grid-cols-3 md:grid-cols-2 gap-12">
            <div className="h-80 w-80 rounded-2xl border-gray-200 border-2 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-50 hover:border-gray-300">
              <H3>How long does a chatroom stay active?</H3>
              <p className="text-gray-700 mt-4">
                Each chatroom stays active for an hour. This lightens the load
                on our servers and protects your privacy.
              </p>
              <div className="flex justify-between mx-5 items-center">
                <Image
                  src="/images/clock.svg"
                  alt="clock"
                  className="mt-5 drop-shadow"
                  width={100}
                  height={100}
                />
                <H3 className="text-4xl text-cyan-700">1 hour</H3>
              </div>
            </div>
            <div className="h-80 w-80 rounded-2xl border-gray-200 border-2 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-50 hover:border-gray-300">
              <H3>What happens when the chatroom expires?</H3>
              <p className="text-gray-700 mt-4">
                All users are removed from the chatroom; user data and messages
                are erased from our servers.
              </p>
              <Image
                src="/images/deletion.svg"
                alt="deletion"
                className="mt-4 mx-auto drop-shadow"
                width={291}
                height={105}
              />
            </div>
            <div
              className="h-80 w-80 rounded-2xl border-gray-200 border-2 p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-50 hover:border-gray-300"
              id="features"
            >
              <H3>Do I need to create an account?</H3>
              <p className="text-gray-700 mt-4">
                Not at all! Just enter the chatroom link, pick a name, and begin
                chatting away!
              </p>
              <Image
                src="/images/account.svg"
                alt="account"
                className="mt-6 mx-auto drop-shadow"
                width={169}
                height={95}
              />
            </div>
          </div>
        </section>
        <div className="w-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1440"
            height="54"
            viewBox="0 0 1440 54"
            fill="none"
          >
            <path
              d="M378.346 27.6647C448.43 22.3759 516.29 12.8962 586.18 7.1466C685.734 -1.0489 789.409 -1.544 888.807 6.9554C985.401 15.195 1085.56 35.2917 1181.01 45.5017C1265.65 54.5599 1358.06 58.29 1440 46.9722V3.8147e-06H-10V13.4059C113.813 32.4508 248.116 37.3819 378.346 27.6647Z"
              fill="#F9FAFB"
            />
          </svg>
        </div>
        <section className="bg-cyan-600 -mt-12 -z-10 flex flex-col items-center">
          <div
            className="-translate-y-24 rounded-2xl border-gray-200 border-2 py-8 px-8 sm:px-12 lg:px-16 xl:px-20 bg-white mx-8"
            id="contact"
          >
            <H2 className="text-center">Contact Us</H2>
            <p className="text-gray-700 mt-4 text-center">
              If you have any feedback, we&apos;re more than happy to hear you
              out.
            </p>
            <form className="mt-8">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Doe"
                    maxLength={30}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="mail@example.com"
                    maxLength={50}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="feedback">Feedback</Label>
                  <Textarea
                    name="feedback"
                    id="feedback"
                    placeholder="Type your comments here"
                    maxLength={500}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="mt-8">
                <SendHorizontal />
                Submit feedback
              </Button>
            </form>
          </div>
          <footer className="mb-4 text-white">© 2024 QuickRoom</footer>
        </section>
      </main>
    </>
  );
}
