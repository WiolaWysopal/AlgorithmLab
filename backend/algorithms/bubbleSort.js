function bubbleSort(arr) {
  const steps = [];
  const a = [...arr];

  steps.push([...a]); // stan początkowy

  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push([...a]);

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
  }

  return { steps, sorted: a };
}

module.exports = bubbleSort;
