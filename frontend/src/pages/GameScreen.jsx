import { useState, useEffect } from "react";
import { isSorted } from "../engine/sortingEngine";

export default function GameScreen({ level }) {
  const [array, setArray] = useState(level.array);
  const [time, setTime] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => t + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isSorted(array)) {
      setCompleted(true);
    }
  }, [array]);

  return (
    <div>
      <h2>{level.name}</h2>
      <p>Time: {time}s</p>

      <div style={{ display: "flex", gap: "10px" }}>
        {array.map((num, i) => (
          <div key={i}>{num}</div>
        ))}
      </div>

      {completed && <h3>Level Complete!</h3>}
    </div>
  );
}