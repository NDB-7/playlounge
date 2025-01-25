import Navbar from "./_components/Navbar";
import { H2, H4 } from "./_components/Headings";
import Hero from "./_components/Hero";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";
import RoomList from "./_components/RoomList";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="w-full mt-16 overflow-hidden">
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
        <section className="bg-gray-50 flex flex-col items-center px-6 pb-48">
          <H2 className="mt-12">Join a public room</H2>
          <p className="mt-4 text-gray-700">
            Click on any room that interests you to start playing! 🎮
          </p>
          <RoomList />
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
        <section className="bg-green-600 -mt-12 -z-10 flex flex-col items-center">
          <div
            className="-translate-y-24 rounded-2xl border-gray-200 border-2 py-8 px-8 sm:px-12 lg:px-16 xl:px-20 bg-white mx-8"
            id="contact"
          >
            <H2 className="text-center">Feedback</H2>
            <p className="text-gray-700 mt-4 text-center">
              We&apos;d love to hear your feedback! Feel free to report any bugs
              or give suggestions here 😄
            </p>
            <form className="mt-8">
              <div className="space-y-4">
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
          <footer className="mb-4 text-white">© 2024 PlayLounge</footer>
        </section>
      </main>
    </>
  );
}
