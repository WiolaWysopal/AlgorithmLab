function quickSort(arr) {
  const steps = [];
  const a = [...arr];

  steps.push([...a]); // stan początkowy

  function partition(low, high) {
    const pivot = a[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (a[j] < pivot) {
        i++;
        if (i !== j) {
          [a[i], a[j]] = [a[j], a[i]];
          steps.push([...a]); // snapshot po zamianie
        }
      }
    }

    if (i + 1 !== high) {
      [a[i + 1], a[high]] = [a[high], a[i + 1]];
      steps.push([...a]); // pivot na właściwym miejscu
    }

    return i + 1;
  }

  function quickSortRecursive(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortRecursive(low, pi - 1);
      quickSortRecursive(pi + 1, high);
    }
  }

  quickSortRecursive(0, a.length - 1);

  return {
    steps,
    sorted: a
  };
}

module.exports = quickSort;