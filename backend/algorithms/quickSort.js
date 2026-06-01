function quickSort(arr) {
  const steps = [];
  const a = [...arr];

  function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  steps.push({
    array: [...a],
    activeRange: [],
    pivotIndex: null,
    comparing: [],
    swappedIndexes: [],
    sortedIndexes: [],
    message: "Initial array",
  });

  function partition(low, high) {
    const pivot = a[high];
    let i = low - 1;

    steps.push({
      array: [...a],
      activeRange: range(low, high),
      pivotIndex: high,
      comparing: [],
      swappedIndexes: [],
      sortedIndexes: [],
      message: `Partitioning range ${low}-${high}. Pivot is ${pivot}`,
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...a],
        activeRange: range(low, high),
        pivotIndex: high,
        comparing: [j, high],
        swappedIndexes: [],
        sortedIndexes: [],
        message: `Comparing ${a[j]} with pivot ${pivot}`,
      });

      if (a[j] < pivot) {
        i++;

        if (i !== j) {
          [a[i], a[j]] = [a[j], a[i]];

          steps.push({
            array: [...a],
            activeRange: range(low, high),
            pivotIndex: high,
            comparing: [],
            swappedIndexes: [i, j],
            sortedIndexes: [],
            message: `Swapped ${a[j]} and ${a[i]}`,
          });
        } else {
          steps.push({
            array: [...a],
            activeRange: range(low, high),
            pivotIndex: high,
            comparing: [j],
            swappedIndexes: [],
            sortedIndexes: [],
            message: `${a[j]} is already on the correct side of pivot`,
          });
        }
      }
    }

    if (i + 1 !== high) {
      [a[i + 1], a[high]] = [a[high], a[i + 1]];

      steps.push({
        array: [...a],
        activeRange: range(low, high),
        pivotIndex: i + 1,
        comparing: [],
        swappedIndexes: [i + 1, high],
        sortedIndexes: [i + 1],
        message: `Moved pivot ${a[i + 1]} to index ${i + 1}`,
      });
    } else {
      steps.push({
        array: [...a],
        activeRange: range(low, high),
        pivotIndex: high,
        comparing: [],
        swappedIndexes: [],
        sortedIndexes: [high],
        message: `Pivot ${pivot} is already in the correct position`,
      });
    }

    return i + 1;
  }

  function quickSortRecursive(low, high, sortedIndexes = []) {
    if (low > high) return;

    if (low === high) {
      sortedIndexes.push(low);

      steps.push({
        array: [...a],
        activeRange: [low],
        pivotIndex: null,
        comparing: [],
        swappedIndexes: [],
        sortedIndexes: [...sortedIndexes],
        message: `Single element ${a[low]} is sorted`,
      });

      return;
    }

    const pi = partition(low, high);

    if (!sortedIndexes.includes(pi)) {
      sortedIndexes.push(pi);
    }

    steps.push({
      array: [...a],
      activeRange: range(low, high),
      pivotIndex: pi,
      comparing: [],
      swappedIndexes: [],
      sortedIndexes: [...sortedIndexes],
      message: `Pivot fixed at index ${pi}`,
    });

    quickSortRecursive(low, pi - 1, sortedIndexes);
    quickSortRecursive(pi + 1, high, sortedIndexes);
  }

  quickSortRecursive(0, a.length - 1, []);

  steps.push({
    array: [...a],
    activeRange: range(0, a.length - 1),
    pivotIndex: null,
    comparing: [],
    swappedIndexes: [],
    sortedIndexes: range(0, a.length - 1),
    sorted: true,
    message: "Array sorted",
  });

  return {
    steps,
    sorted: a,
  };
}

module.exports = quickSort;
