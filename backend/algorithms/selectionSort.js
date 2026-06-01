function selectionSort(arr) {
  const steps = [];
  const a = [...arr];

  steps.push({
    array: [...a],
    comparing: [],
    minIndex: null,
    currentIndex: null,
    swappedIndexes: [],
    sortedIndexes: [],
    message: "Initial array",
  });

  for (let i = 0; i < a.length - 1; i++) {
    let minIndex = i;

    steps.push({
      array: [...a],
      comparing: [],
      minIndex,
      currentIndex: i,
      swappedIndexes: [],
      sortedIndexes: Array.from({ length: i }, (_, index) => index),
      message: `Starting pass from index ${i}`,
    });

    for (let j = i + 1; j < a.length; j++) {
      steps.push({
        array: [...a],
        comparing: [j, minIndex],
        minIndex,
        currentIndex: i,
        swappedIndexes: [],
        sortedIndexes: Array.from({ length: i }, (_, index) => index),
        message: `Comparing ${a[j]} with current minimum ${a[minIndex]}`,
      });

      if (a[j] < a[minIndex]) {
        minIndex = j;

        steps.push({
          array: [...a],
          comparing: [j],
          minIndex,
          currentIndex: i,
          swappedIndexes: [],
          sortedIndexes: Array.from({ length: i }, (_, index) => index),
          message: `New minimum found: ${a[minIndex]} at index ${minIndex}`,
        });
      }
    }

    if (minIndex !== i) {
      [a[i], a[minIndex]] = [a[minIndex], a[i]];

      steps.push({
        array: [...a],
        comparing: [],
        minIndex: i,
        currentIndex: i,
        swappedIndexes: [i, minIndex],
        sortedIndexes: Array.from({ length: i + 1 }, (_, index) => index),
        message: `Swapped minimum ${a[i]} into position ${i}`,
      });
    } else {
      steps.push({
        array: [...a],
        comparing: [],
        minIndex: i,
        currentIndex: i,
        swappedIndexes: [],
        sortedIndexes: Array.from({ length: i + 1 }, (_, index) => index),
        message: `${a[i]} is already in the correct position`,
      });
    }
  }

  steps.push({
    array: [...a],
    comparing: [],
    minIndex: null,
    currentIndex: null,
    swappedIndexes: [],
    sortedIndexes: Array.from({ length: a.length }, (_, index) => index),
    sorted: true,
    message: "Array sorted",
  });

  return {
    steps,
    sorted: a,
  };
}

module.exports = selectionSort;
