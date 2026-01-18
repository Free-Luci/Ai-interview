import { useEffect, useState } from "react";

export default function useTypingEffect(
  messages,
  speed = 80,
  pause = 1400
) {
  const [text, setText] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = messages[msgIndex];

    if (charIndex < current.length) {
      const t = setTimeout(() => {
        setText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const p = setTimeout(() => {
        setCharIndex(0);
        setText("");
        setMsgIndex((m) => (m + 1) % messages.length);
      }, pause);
      return () => clearTimeout(p);
    }
  }, [charIndex, msgIndex, messages, speed, pause]);

  return text;
}
