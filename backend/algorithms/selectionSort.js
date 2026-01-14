function selectionSort(arr) {
  const steps = [];
  const a = [...arr];

  steps.push([...a]); // stan początkowy

  for (let i = 0; i < a.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < a.length; j++) {
      // porównanie
      if (a[j] < a[minIndex]) {
        minIndex = j;
      }

      // zapisujemy krok porównania
      steps.push([...a]);
    }

    // zamiana po znalezieniu minimum
    if (minIndex !== i) {
      [a[i], a[minIndex]] = [a[minIndex], a[i]];
      steps.push([...a]); // zapis po zamianie
    }
  }

  return {
    steps,
    sorted: a
  };
}

module.exports = selectionSort;
