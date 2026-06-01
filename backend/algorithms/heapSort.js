function heapSort(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;

  steps.push({
    array: [...a],
    comparing: [],
    swappedIndexes: [],
    sortedIndexes: [],
    message: "Initial array",
  });

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    steps.push({
      array: [...a],
      comparing: [i],
      swappedIndexes: [],
      sortedIndexes: [],
      message: `Building max heap from index ${i}`,
    });

    heapify(n, i, []);
  }

  const sortedIndexes = [];

  for (let i = n - 1; i > 0; i--) {
    swap(0, i);

    sortedIndexes.push(i);

    steps.push({
      array: [...a],
      comparing: [],
      swappedIndexes: [0, i],
      sortedIndexes: [...sortedIndexes],
      message: `Moved max value ${a[i]} to sorted position`,
    });

    heapify(i, 0, sortedIndexes);
  }

  sortedIndexes.push(0);

  steps.push({
    array: [...a],
    comparing: [],
    swappedIndexes: [],
    sortedIndexes: [...sortedIndexes],
    sorted: true,
    message: "Array sorted",
  });

  function heapify(size, root, sortedIndexes) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    const compared = [root];

    if (left < size) compared.push(left);
    if (right < size) compared.push(right);

    steps.push({
      array: [...a],
      comparing: compared,
      swappedIndexes: [],
      sortedIndexes: [...sortedIndexes],
      message: `Comparing root ${a[root]} with its children`,
    });

    if (left < size && a[left] > a[largest]) {
      largest = left;
    }

    if (right < size && a[right] > a[largest]) {
      largest = right;
    }

    if (largest !== root) {
      swap(root, largest);

      steps.push({
        array: [...a],
        comparing: [],
        swappedIndexes: [root, largest],
        sortedIndexes: [...sortedIndexes],
        message: `Swapped ${a[largest]} with ${a[root]}`,
      });

      heapify(size, largest, sortedIndexes);
    }
  }

  function swap(i, j) {
    [a[i], a[j]] = [a[j], a[i]];
  }

  return {
    steps,
    sorted: a,
  };
}

module.exports = heapSort;
