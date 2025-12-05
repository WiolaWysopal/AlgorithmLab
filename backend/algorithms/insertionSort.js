function insertionSort(arr) {
  const steps = [];
  const a = [...arr];

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;

    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
      steps.push([...a]); // zapisujemy stan tablicy po każdej zamianie
    }
    a[j + 1] = key;
    steps.push([...a]); // zapisujemy stan po wstawieniu klucza
  }

  return { steps, sorted: a };
}

module.exports = insertionSort;
