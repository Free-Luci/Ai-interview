import { useEffect, useState } from "react";

const useRotatingMessage = (messages, interval = 3000) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, interval);

    return () => clearInterval(timer);
  }, [messages, interval]);

  return messages[index];
};

export default useRotatingMessage;
