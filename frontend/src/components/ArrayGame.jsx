import { useState } from "react";

function ArrayGame() {
  const initialArray = [5, 2, 9, 1];

  const [array, setArray] = useState(initialArray);
  const [tempSlot, setTempSlot] = useState(null);
  const [dragSource, setDragSource] = useState(null);

  function handleDragStart(source) {
    setDragSource(source);
  }

  function handleDragOver(e) {
    e.preventDefault(); // REQUIRED to allow drop
  }

  function handleDrop(target) {
    if (!dragSource) return;

    const newArray = [...array];
    let newTemp = tempSlot;

    // Dragging from array
    if (dragSource.type === "array") {
      const value = array[dragSource.index];

      if (target.type === "temp") {
        if (tempSlot !== null) return; // temp already full

        newTemp = value;
        newArray[dragSource.index] = null;
      }

      if (target.type === "array") {
        if (array[target.index] !== null) return;

        newArray[target.index] = value;
        newArray[dragSource.index] = null;
      }
    }

    // Dragging from temp
    if (dragSource.type === "temp") {
      if (target.type === "array" && array[target.index] === null) {
        newArray[target.index] = tempSlot;
        newTemp = null;
      }
    }

    setArray(newArray);
    setTempSlot(newTemp);
    setDragSource(null);
  }

  return (
    <div>
      <h2>Bubble Sort Level</h2>

      {/* Array */}
      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        {array.map((num, index) => (
          <div
            key={index}
            draggable={num !== null}
            onDragStart={() =>
              handleDragStart({ type: "array", index })
            }
            onDragOver={handleDragOver}
            onDrop={() =>
              handleDrop({ type: "array", index })
            }
            style={{
              width: "70px",
              height: "70px",
              border: "2px solid black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "22px",
              backgroundColor: num === null ? "#f5f5f5" : "#4CAF50",
              color: "white",
              cursor: num !== null ? "grab" : "default",
            }}
          >
            {num}
          </div>
        ))}
      </div>

      {/* Temp Slot */}
      <div style={{ marginTop: "40px" }}>
        <h3>Temp Slot</h3>
        <div
          draggable={tempSlot !== null}
          onDragStart={() =>
            handleDragStart({ type: "temp" })
          }
          onDragOver={handleDragOver}
          onDrop={() =>
            handleDrop({ type: "temp" })
          }
          style={{
            width: "70px",
            height: "70px",
            border: "2px dashed black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "22px",
            backgroundColor: "#eee",
            cursor: tempSlot !== null ? "grab" : "default",
          }}
        >
          {tempSlot}
        </div>
      </div>
    </div>
  );
}

export default ArrayGame;