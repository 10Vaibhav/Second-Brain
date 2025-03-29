import { useEffect, RefObject } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

export default function useOutsideClick(
  ref: RefObject<HTMLElement| null>,
  handler: Handler
): void {
  useEffect(() => {
    function listener(event: MouseEvent | TouchEvent): void {

      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    }

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler, ref]);
}
