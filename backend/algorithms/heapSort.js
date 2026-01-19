function heapSort(arr) {
  const steps = [];
  const a = [...arr];

  steps.push([...a]); // stan początkowy

  const n = a.length;

  // --- budowanie max-heap ---
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // --- wyciąganie elementów z kopca ---
  for (let i = n - 1; i > 0; i--) {
    swap(0, i);        // największy element na koniec
    heapify(i, 0);     // naprawa kopca
  }

  function heapify(size, root) {
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    if (left < size && a[left] > a[largest]) {
      largest = left;
    }

    if (right < size && a[right] > a[largest]) {
      largest = right;
    }

    if (largest !== root) {
      swap(root, largest);
      heapify(size, largest);
    }
  }

  function swap(i, j) {
    [a[i], a[j]] = [a[j], a[i]];
    steps.push([...a]); // zapis po KAŻDYM swapie
  }

  return {
    steps,
    sorted: a
  };
}

module.exports = heapSort;
