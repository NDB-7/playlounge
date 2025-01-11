import { RefObject, useEffect } from "react";

export default function useCardAnimation<T>(
  ref: RefObject<HTMLDivElement | null>,
  dependencies: T[]
) {
  useEffect(() => {
    ref.current?.animate(
      [
        { transform: "translate(0.25rem, -1.5rem) rotate(15deg) scale(1.2)" },
        { transform: "translate(0, 0) rotate(0) scale(1)" },
      ],
      {
        duration: 150,
      }
    );
  }, [...dependencies, ref]);
}
