function mergeSort(arr) {
  const steps = [];
  const a = [...arr];

  steps.push({
    array: [...a],
    activeRange: [],
    leftRange: [],
    rightRange: [],
    comparing: [],
    overwrittenIndex: null,
    sorted: false,
    message: "Initial array",
  });

  function range(start, end) {
    return Array.from({ length: end - start }, (_, index) => start + index);
  }

  function mergeSortRecursive(start, end) {
    if (end - start <= 1) return;

    const mid = Math.floor((start + end) / 2);

    steps.push({
      array: [...a],
      activeRange: range(start, end),
      leftRange: range(start, mid),
      rightRange: range(mid, end),
      comparing: [],
      overwrittenIndex: null,
      sorted: false,
      message: `Splitting range ${start}-${end - 1}`,
    });

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

    steps.push({
      array: [...a],
      activeRange: range(start, end),
      leftRange: range(start, mid),
      rightRange: range(mid, end),
      comparing: [],
      overwrittenIndex: null,
      sorted: false,
      message: `Merging ranges ${start}-${mid - 1} and ${mid}-${end - 1}`,
    });

    while (i < left.length && j < right.length) {
      const leftIndex = start + i;
      const rightIndex = mid + j;

      steps.push({
        array: [...a],
        activeRange: range(start, end),
        leftRange: range(start, mid),
        rightRange: range(mid, end),
        comparing: [leftIndex, rightIndex],
        overwrittenIndex: k,
        sorted: false,
        message: `Comparing ${left[i]} and ${right[j]}`,
      });

      if (left[i] <= right[j]) {
        a[k] = left[i];

        steps.push({
          array: [...a],
          activeRange: range(start, end),
          leftRange: range(start, mid),
          rightRange: range(mid, end),
          comparing: [leftIndex],
          overwrittenIndex: k,
          sorted: false,
          message: `Placed ${left[i]} at index ${k}`,
        });

        i++;
      } else {
        a[k] = right[j];

        steps.push({
          array: [...a],
          activeRange: range(start, end),
          leftRange: range(start, mid),
          rightRange: range(mid, end),
          comparing: [rightIndex],
          overwrittenIndex: k,
          sorted: false,
          message: `Placed ${right[j]} at index ${k}`,
        });

        j++;
      }

      k++;
    }

    while (i < left.length) {
      a[k] = left[i];

      steps.push({
        array: [...a],
        activeRange: range(start, end),
        leftRange: range(start, mid),
        rightRange: range(mid, end),
        comparing: [start + i],
        overwrittenIndex: k,
        sorted: false,
        message: `Copied remaining ${left[i]} to index ${k}`,
      });

      i++;
      k++;
    }

    while (j < right.length) {
      a[k] = right[j];

      steps.push({
        array: [...a],
        activeRange: range(start, end),
        leftRange: range(start, mid),
        rightRange: range(mid, end),
        comparing: [mid + j],
        overwrittenIndex: k,
        sorted: false,
        message: `Copied remaining ${right[j]} to index ${k}`,
      });

      j++;
      k++;
    }

    steps.push({
      array: [...a],
      activeRange: range(start, end),
      leftRange: [],
      rightRange: [],
      comparing: [],
      overwrittenIndex: null,
      sorted: false,
      message: `Merged range ${start}-${end - 1}`,
    });
  }

  mergeSortRecursive(0, a.length);

  steps.push({
    array: [...a],
    activeRange: range(0, a.length),
    leftRange: [],
    rightRange: [],
    comparing: [],
    overwrittenIndex: null,
    sorted: true,
    message: "Array sorted",
  });

  return {
    steps,
    sorted: a,
  };
}

module.exports = mergeSort;
