function insertionSort(arr) {
  const steps = [];
  const a = [...arr];

  steps.push({
    array: [...a],
    comparing: [],
    shiftedIndexes: [],
    insertedIndex: null,
    sortedIndexes: [0],
    message: "Initial array",
  });

  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;

    steps.push({
      array: [...a],
      comparing: [i],
      shiftedIndexes: [],
      insertedIndex: i,
      sortedIndexes: Array.from({ length: i }, (_, index) => index),
      message: `Selected key ${key}`,
    });

    while (j >= 0) {
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        shiftedIndexes: [],
        insertedIndex: j + 1,
        sortedIndexes: Array.from({ length: i }, (_, index) => index),
        message: `Comparing ${a[j]} with key ${key}`,
      });

      if (a[j] <= key) break;

      a[j + 1] = a[j];

      steps.push({
        array: [...a],
        comparing: [],
        shiftedIndexes: [j, j + 1],
        insertedIndex: j + 1,
        sortedIndexes: Array.from({ length: i }, (_, index) => index),
        message: `Shifted ${a[j]} to the right`,
      });

      j--;
    }

    a[j + 1] = key;

    steps.push({
      array: [...a],
      comparing: [],
      shiftedIndexes: [],
      insertedIndex: j + 1,
      sortedIndexes: Array.from({ length: i + 1 }, (_, index) => index),
      message: `Inserted key ${key} at index ${j + 1}`,
    });
  }

  steps.push({
    array: [...a],
    comparing: [],
    shiftedIndexes: [],
    insertedIndex: null,
    sortedIndexes: Array.from({ length: a.length }, (_, index) => index),
    sorted: true,
    message: "Array sorted",
  });

  return { steps, sorted: a };
}

module.exports = insertionSort;
