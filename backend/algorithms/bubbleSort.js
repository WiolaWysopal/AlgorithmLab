function bubbleSort(arr) {
  const steps = [];
  const a = [...arr];

  steps.push({
    array: [...a],
    comparing: [],
    swapped: false,
    message: "Initial array",
  });

  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        swapped: false,
        message: `Comparing ${a[j]} and ${a[j + 1]}`,
      });

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];

        steps.push({
          array: [...a],
          comparing: [],
          swapped: true,
          swappedIndexes: [j, j + 1],
          message: `Swapped ${a[j]} and ${a[j + 1]}`,
        });
      }
    }
  }

  steps.push({
    array: [...a],
    comparing: [],
    swapped: false,
    sorted: true,
    message: "Array sorted",
  });

  return { steps, sorted: a };
}

module.exports = bubbleSort;