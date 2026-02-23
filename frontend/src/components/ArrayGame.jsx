import { useState } from "react";

function ArrayGame() {
  const [array, setArray] = useState([5, 2, 9, 1]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [pass, setPass] = useState(0);

  const n = array.length;

  function handleClick(index) {
    // Block clicks on sorted (locked) elements
    if (index >= n - pass) {
      setMessage("🔒 This element is already sorted");
      return;
    }

    if (selectedIndex === null) {
      setSelectedIndex(index);
      setMessage("");
      return;
    }

    if (selectedIndex === index) {
      setSelectedIndex(null);
      return;
    }

    // Must be adjacent
    if (Math.abs(selectedIndex - index) !== 1) {
      setMessage("❌ Only adjacent swaps allowed");
      setSelectedIndex(null);
      return;
    }

    const left = Math.min(selectedIndex, index);
    const right = Math.max(selectedIndex, index);

    if (array[left] > array[right]) {
      const newArray = [...array];
      [newArray[left], newArray[right]] = [
        newArray[right],
        newArray[left],
      ];

      setArray(newArray);
      setMessage("✅ Correct swap");
    } else {
      setMessage("❌ Wrong bubble step");
    }

    setSelectedIndex(null);
  }

  function nextPass() {
    setPass(pass + 1);
    setSelectedIndex(null);
    setMessage(`➡️ Pass ${pass + 1} completed`);
  }

  const isSorted = pass === n - 1;

  return (
    <div>
      <h2>Bubble Sort Simulator</h2>
      <p>Pass: {pass}</p>

      <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
        {array.map((num, index) => {
          const locked = index >= n - pass;

          return (
            <div
              key={index}
              onClick={() => handleClick(index)}
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: locked
                  ? "#9E9E9E"
                  : selectedIndex === index
                  ? "#FF9800"
                  : "#4CAF50",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontWeight: "bold",
                borderRadius: "8px",
                fontSize: "20px",
                cursor: locked ? "not-allowed" : "pointer",
              }}
            >
              {num}
            </div>
          );
        })}
      </div>

      <p style={{ marginTop: "15px", fontWeight: "bold" }}>{message}</p>

      {!isSorted && (
        <button
          onClick={nextPass}
          style={{ marginTop: "20px", padding: "10px 20px" }}
        >
          Next Pass →
        </button>
      )}

      {isSorted && (
        <h3 style={{ color: "green", marginTop: "20px" }}>
          🎉 Array Sorted Successfully!
        </h3>
      )}
    </div>
  );
}

export default ArrayGame;