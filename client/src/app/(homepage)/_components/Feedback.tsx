"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, SendHorizontal } from "lucide-react";
import { H2 } from "./Headings";
import { FormEvent, useState, useTransition } from "react";
import sendFeedback from "@/app/_actions/sendFeedback";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function submitHandler(e: FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const response = await sendFeedback(feedback);
      if (response.success === true) setSubmitted(true);
      else if (response.success === false) setError(response.error);
    });
  }

  return (
    <div
      className="-translate-y-24 rounded-2xl border-gray-200 border-2 py-8 px-8 sm:px-12 lg:px-16 xl:px-20 bg-white mx-8"
      id="contact"
    >
      <H2 className="text-center">Feedback</H2>
      <p className="text-gray-700 mt-4 text-center">
        We&apos;d love to hear your feedback, feel free to report any bugs or
        give suggestions here! 😄
      </p>
      {submitted ? (
        <div className="mt-4 text-center">
          Thanks for submitting your feedback! We'll be sure to review it! 😉
        </div>
      ) : (
        <form className="mt-6" onSubmit={submitHandler}>
          <div className="space-y-2">
            <Textarea
              name="feedback"
              placeholder="Type your comments here"
              aria-label="Feedback box"
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              maxLength={500}
              required
            />
          </div>
          <Button type="submit" className="mt-8">
            {pending ? (
              <>
                <Loader2 className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <SendHorizontal />
                Submit feedback
              </>
            )}
          </Button>
          {error && <p className="mt-4 text-destructive text-sm">{error}</p>}
        </form>
      )}
    </div>
  );
}
