import { Check } from "lucide-react";

export default function CheckText({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="inline-block rounded-full bg-cyan-500 w-6 h-6">
        <Check className="text-white p-1" />
      </div>
      <span className="leading-relaxed text-gray-700">{text}</span>
    </div>
  );
}
