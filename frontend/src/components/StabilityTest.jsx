// src/StabilityTest.jsx
import { useEffect, useState } from "react";

export default function StabilityTest() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((c) => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h1 className="text-xl font-bold">Stability Test</h1>
      <p>This counter should increment smoothly every second:</p>
      <div className="text-2xl font-mono">{counter}</div>
      <p className="text-sm text-gray-500">
        If this keeps resetting, auto-reload is happening
      </p>
    </div>
  );
}
