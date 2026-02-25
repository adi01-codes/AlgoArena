import React, { useState, useEffect } from "react";

export default function App() {
  const [array, setArray] = useState([5, 3, 8, 1]);
  const [tempSlot, setTempSlot] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [time, setTime] = useState(0);

  // ✅ Timer Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (t) => {
    const minutes = Math.floor(t / 60);
    const seconds = t % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const resetGame = () => {
    setArray([5, 3, 8, 1]);
    setTempSlot(null);
    setTime(0);
  };

  const handleDragStart = (item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (target) => {
    if (!draggedItem) return;

    let newArray = [...array];

    // Drag from array
    if (draggedItem.type === "array") {
      const value = array[draggedItem.index];

      if (target.type === "array") {
        const temp = newArray[target.index];
        newArray[target.index] = value;
        newArray[draggedItem.index] = temp;
      }

      if (target.type === "temp") {
        setTempSlot(value);
        newArray[draggedItem.index] = null;
      }
    }

    // ✅ Drag from temp (fixed swap logic)
    if (draggedItem.type === "temp") {
      if (target.type === "array") {
        const targetValue = newArray[target.index];
        newArray[target.index] = tempSlot;
        setTempSlot(targetValue);
      }
    }

    setArray(newArray);
    setDraggedItem(null);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#1e1e1e",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        color: "white",
        position: "relative",
      }}
    >
      {/* Top Right Controls */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>
          ⏱ {formatTime(time)}
        </div>

        <button
          onClick={resetGame}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#2e7d32",
            color: "white",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      {/* Center Game Box */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "60px",
        }}
      >
        <h2>Bubble Sort Level</h2>

        {/* Array */}
        <div style={{ display: "flex", gap: "15px" }}>
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
                width: "80px",
                height: "80px",
                borderRadius: "10px",
                backgroundColor: num === null ? "#333" : "#4CAF50",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                fontWeight: "bold",
                color: "white",
                cursor: num !== null ? "grab" : "default",
              }}
            >
              {num}
            </div>
          ))}
        </div>

        {/* Temp Slot */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
              width: "90px",
              height: "90px",
              borderRadius: "12px",
              backgroundColor: tempSlot === null ? "#555" : "#4CAF50",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "26px",
              fontWeight: "bold",
              color: "white",
              border: "2px dashed #777",
              cursor: tempSlot !== null ? "grab" : "default",
            }}
          >
            {tempSlot}
          </div>
        </div>
      </div>
    </div>
  );
}