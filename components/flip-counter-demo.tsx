"use client";

import { useEffect, useState } from "react";
import { FlipCounter } from "@/components/flip-counter";

export function FlipCounterDemo() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return <FlipCounter value={count} minDigits={4} />;
}
