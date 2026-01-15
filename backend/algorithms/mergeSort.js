function mergeSort(arr) {
  const steps = [];
  const a = [...arr];

  steps.push([...a]); // stan początkowy

  function mergeSortRecursive(start, end) {
    if (end - start <= 1) return;

    const mid = Math.floor((start + end) / 2);

    mergeSortRecursive(start, mid);
    mergeSortRecursive(mid, end);

    merge(start, mid, end);
  }

  function merge(start, mid, end) {
    const left = a.slice(start, mid);
    const right = a.slice(mid, end);

    let i = 0;
    let j = 0;
    let k = start;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        a[k++] = left[i++];
      } else {
        a[k++] = right[j++];
      }
      steps.push([...a]); // każdy ruch do głównej tablicy
    }

    while (i < left.length) {
      a[k++] = left[i++];
      steps.push([...a]);
    }

    while (j < right.length) {
      a[k++] = right[j++];
      steps.push([...a]);
    }
  }

  mergeSortRecursive(0, a.length);

  return {
    steps,
    sorted: a
  };
}

module.exports = mergeSort;
