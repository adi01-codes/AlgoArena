import { useState, useEffect } from "react";

function ArrayGame() {
  const initialArray = [5, 2, 9, 1];

  const [array, setArray] = useState(initialArray);
  const [tempSlot, setTempSlot] = useState(null);
  const [dragSource, setDragSource] = useState(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // TIMER
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  function handleDragStart(source) {
    setDragSource(source);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(target) {
    if (!dragSource) return;

    const newArray = [...array];
    let newTemp = tempSlot;

    // From array
    if (dragSource.type === "array") {
      const value = array[dragSource.index];

      if (target.type === "temp" && tempSlot === null) {
        newTemp = value;
        newArray[dragSource.index] = null;
      }

      if (target.type === "array" && array[target.index] === null) {
        newArray[target.index] = value;
        newArray[dragSource.index] = null;
      }
    }

    // From temp
    if (dragSource.type === "temp") {
      if (target.type === "array" && array[target.index] === null) {
        newArray[target.index] = tempSlot;
        newTemp = null;
      }
    }

    setArray(newArray);
    setTempSlot(newTemp);
    setDragSource(null);

    checkSorted(newArray);
  }

  function checkSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === null || arr[i + 1] === null) return;
      if (arr[i] > arr[i + 1]) return;
    }
    setIsRunning(false);
  }

  function resetGame() {
    setArray(initialArray);
    setTempSlot(null);
    setDragSource(null);
    setTime(0);
    setIsRunning(true);
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#1e1e1e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        color: "white",
      }}
    >
      {/* Top Left Controls */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
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

      {/* Game Area */}
      <div
        style={{
          marginTop: "120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ marginBottom: "40px" }}>Bubble Sort Level</h2>

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
            marginTop: "70px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span style={{ marginBottom: "10px" }}>Temp Slot</span>

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
              backgroundColor:
                tempSlot === null ? "#555" : "#4CAF50",
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
export default ArrayGame;