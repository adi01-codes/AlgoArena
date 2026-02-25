export function isFullySorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) return false;
  }
  return true;
}

/* ========================
   BUBBLE SORT VALIDATION
   ======================== */

export function validateBubbleMove(prev, next) {
  let diff = [];

  for (let i = 0; i < prev.length; i++) {
    if (prev[i] !== next[i]) diff.push(i);
  }

  if (diff.length !== 2)
    return { valid: false, message: "You must swap two elements." };

  const [i, j] = diff;

  if (Math.abs(i - j) !== 1)
    return { valid: false, message: "Bubble sort swaps adjacent elements only." };

  if (prev[i] <= prev[j])
    return { valid: false, message: "Swap only if left element is greater." };

  return { valid: true };
}

/* ========================
   SELECTION SORT
   ======================== */

export function validateSelectionMove(prev, next, state) {
  let diff = [];

  for (let i = 0; i < prev.length; i++) {
    if (prev[i] !== next[i]) diff.push(i);
  }

  if (diff.length !== 2)
    return { valid: false, message: "Selection sort swaps two elements." };

  const min = Math.min(...prev.slice(state.sortedIndex));
  const minIndex = prev.indexOf(min);

  if (!diff.includes(state.sortedIndex) || !diff.includes(minIndex)) {
    return {
      valid: false,
      message: "Swap current position with the minimum element."
    };
  }

  return { valid: true };
}

/* ========================
   INSERTION SORT
   ======================== */

export function validateInsertionMove(prev, next) {
  let diff = [];

  for (let i = 0; i < prev.length; i++) {
    if (prev[i] !== next[i]) diff.push(i);
  }

  if (diff.length === 0)
    return { valid: false, message: "Invalid insertion move." };

  return { valid: true };
}