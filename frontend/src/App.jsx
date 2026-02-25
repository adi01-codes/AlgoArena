import { useState } from "react";
import SortingGame from "./components/SortingGame";
import { sortingLevels } from "./levels/sortingLevels";

export default function App() {
  const [currentLevel, setCurrentLevel] = useState(0);

  const handleNext = () => {
    if (currentLevel < sortingLevels.length - 1) {
      setCurrentLevel(prev => prev + 1);
    }
  };

  return (
    <SortingGame
      level={sortingLevels[currentLevel]}
      onNext={handleNext}
    />
  );
}