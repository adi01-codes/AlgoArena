import React, { useState, useEffect } from "react";
import {
  isFullySorted,
  validateBubbleMove,
  validateSelectionMove,
  validateInsertionMove
} from "../engine/sortingEngine";

export default function SortingGame({ level, onNext }) {
  const [array, setArray] = useState([...level.array]);
  const [tempSlot, setTempSlot] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [time, setTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [algorithmState, setAlgorithmState] = useState({
    sortedIndex: 0,
  });

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    if (isFullySorted(array) && !array.includes(null)) {
      setGameOver(true);
      setShowModal(true);
    }
  }, [array]);

  const resetGame = () => {
    setArray([...level.array]);
    setTempSlot(null);
    setTime(0);
    setGameOver(false);
    setShowModal(false);
    setMessage("");
    setAlgorithmState({ sortedIndex: 0 });
  };

  const handleDragStart = (item) => {
    if (gameOver) return;
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (target) => {
    if (!draggedItem || gameOver) return;

    let newArray = [...array];

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

    if (draggedItem.type === "temp") {
      if (target.type === "array") {
        const targetValue = newArray[target.index];
        newArray[target.index] = tempSlot;
        setTempSlot(targetValue);
      }
    }

    let result = { valid: true };

    if (level.algorithm === "bubble") {
      result = validateBubbleMove(array, newArray);
    }

    if (level.algorithm === "selection") {
      result = validateSelectionMove(array, newArray, algorithmState);
      if (result.valid) {
        setAlgorithmState(prev => ({
          sortedIndex: prev.sortedIndex + 1
        }));
      }
    }

    if (level.algorithm === "insertion") {
      result = validateInsertionMove(array, newArray);
    }

    if (!result.valid) {
      setMessage(result.message);
      return;
    }

    setMessage("");
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
      {/* Timer */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontWeight: "bold"
        }}
      >
        ⏱ {time}s
      </div>

      <div style={{ textAlign: "center" }}>
        <h2>{level.name}</h2>

        {message && (
          <div style={{ color: "#ff5252", marginBottom: "10px" }}>
            {message}
          </div>
        )}

        {/* Array */}
        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          {array.map((num, index) => (
            <div
              key={index}
              draggable={num !== null}
              onDragStart={() => handleDragStart({ type: "array", index })}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop({ type: "array", index })}
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
                cursor: num !== null ? "grab" : "default",
              }}
            >
              {num}
            </div>
          ))}
        </div>

        {/* Temp Slot */}
        <div
          draggable={tempSlot !== null}
          onDragStart={() => handleDragStart({ type: "temp" })}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop({ type: "temp" })}
          style={{
            width: "90px",
            height: "90px",
            margin: "30px auto",
            borderRadius: "12px",
            backgroundColor: tempSlot === null ? "#555" : "#4CAF50",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "26px",
            border: "2px dashed #777",
          }}
        >
          {tempSlot}
        </div>
      </div>

      {/* Completion Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#2e7d32",
              padding: "40px",
              borderRadius: "20px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              width: "300px"
            }}
          >
            <h2>🎉 Level Complete</h2>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button onClick={resetGame}>🔄</button>
              <button onClick={onNext}>➡</button>
              <button onClick={resetGame}>🏠</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}