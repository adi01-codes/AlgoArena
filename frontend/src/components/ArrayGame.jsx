import { useState } from "react";

function ArrayGame() {
  const [array, setArray] = useState([5, 2, 9, 1]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [message, setMessage] = useState("");

  function handleClick(index) {
    if (selectedIndex === null) {
      setSelectedIndex(index);
      setMessage("");
      return;
    }

    // If same box clicked → deselect
    if (selectedIndex === index) {
      setSelectedIndex(null);
      return;
    }

    // Check adjacency
    if (Math.abs(selectedIndex - index) !== 1) {
      setMessage("❌ You can only swap adjacent elements!");
      setSelectedIndex(null);
      return;
    }

    const leftIndex = Math.min(selectedIndex, index);
    const rightIndex = Math.max(selectedIndex, index);

    // Bubble sort condition
    if (array[leftIndex] > array[rightIndex]) {
      const newArray = [...array];
      const temp = newArray[leftIndex];
      newArray[leftIndex] = newArray[rightIndex];
      newArray[rightIndex] = temp;

      setArray(newArray);
      setMessage("✅ Correct swap!");
    } else {
      setMessage("❌ Wrong move! Left element is already smaller.");
    }

    setSelectedIndex(null);
  }

  return (
    <div>
      <h2>Bubble Sort Simulator</h2>

      <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
        {array.map((num, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            style={{
              width: "60px",
              height: "60px",
              backgroundColor:
                selectedIndex === index ? "#FF9800" : "#4CAF50",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontWeight: "bold",
              borderRadius: "8px",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            {num}
          </div>
        ))}
      </div>

      <p style={{ marginTop: "20px", fontWeight: "bold" }}>{message}</p>
    </div>
  );
}

export default ArrayGame;