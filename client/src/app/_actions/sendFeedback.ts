"use server";

type ResponseType =
  | {
      success: true;
    }
  | { success: false; error: string };

export default async function sendFeedback(feedback: string) {
  if (feedback.length < 501 && process.env.WEBHOOK_URL) {
    fetch(process.env.WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: feedback }),
    });
    const response: ResponseType = { success: true };
    return response;
  } else {
    const response: ResponseType = {
      success: false,
      error: "There was an error submitting feedback, try again.",
    };
    return response;
  }
}
