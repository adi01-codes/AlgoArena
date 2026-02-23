import { useState } from "react";

function ArrayGame() {
  const [array, setArray] = useState([5, 2, 9, 1]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  function handleClick(index) {
    // If nothing selected → select first box
    if (selectedIndex === null) {
      setSelectedIndex(index);
    } 
    // If clicking same box → deselect
    else if (selectedIndex === index) {
      setSelectedIndex(null);
    } 
    // If another box clicked → swap
    else {
      const newArray = [...array];

      // swap values
      const temp = newArray[selectedIndex];
      newArray[selectedIndex] = newArray[index];
      newArray[index] = temp;

      setArray(newArray);
      setSelectedIndex(null);
    }
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
    </div>
  );
}

export default ArrayGame;