CREATE TABLE IF NOT EXISTS algorithms (
  id INTEGER PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL
);

ALTER TABLE algorithms
ADD COLUMN IF NOT EXISTS embedding JSONB;

INSERT INTO algorithms (id, created_at, name, description, category)
VALUES
  (
    1,
    '2025-12-08 14:17:17.208697+00',
    'InsertionSort',
    'Algorithm: Insertion Sort. Type: comparison-based, in-place, stable, adaptive sorting algorithm. Best for: small datasets, nearly sorted arrays, almost sorted data, mostly sorted input, online sorting. Best-case time complexity: O(n). Average time complexity: O(n^2). Worst-case time complexity: O(n^2). Space complexity: O(1). Key characteristics: adaptive, stable, in-place, simple, efficient when the input is already sorted or nearly sorted. Insertion Sort builds a sorted section one element at a time by inserting each new element into the correct position in the already sorted part of the array. It is commonly recommended when the array is small or nearly sorted because it can avoid unnecessary work in best-case scenarios.',
    'Sorting'
  ),
  (
    2,
    '2026-01-09 16:00:20.667013+00',
    'BubbleSort',
    'Algorithm: Bubble Sort. Type: comparison-based, stable sorting algorithm. Best for: learning sorting basics, visualizing comparisons and swaps, educational demonstrations. Best-case time complexity: O(n) only when optimized with an early-stop swapped flag and the array is already sorted. Average time complexity: O(n^2). Worst-case time complexity: O(n^2). Space complexity: O(1). Key characteristics: stable, simple, easy to understand, inefficient for large datasets, can detect already sorted input if optimized, but generally not the best choice for nearly sorted arrays compared to Insertion Sort. Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order, causing larger elements to move toward the end of the array after each pass.',
    'Sorting'
  ),
  (
    3,
    '2026-01-14 10:48:32.009561+00',
    'SelectionSort',
    'Algorithm: Selection Sort. Type: comparison-based, in-place sorting algorithm. Best for: educational examples, understanding selection-based sorting, cases where minimizing the number of swaps matters. Best-case time complexity: O(n^2). Average time complexity: O(n^2). Worst-case time complexity: O(n^2). Space complexity: O(1). Key characteristics: not adaptive, usually not stable, in-place, simple, does not benefit from nearly sorted input, does not have O(n) best-case behavior, not efficient for large datasets. Selection Sort repeatedly finds the smallest element in the unsorted part of the array and swaps it with the first element of that unsorted section.',
    'Sorting'
  ),
  (
    4,
    '2026-01-15 11:44:20.648316+00',
    'MergeSort',
    'Algorithm: Merge Sort. Type: comparison-based, stable, divide-and-conquer sorting algorithm. Best for: large datasets, stable sorting, predictable performance, linked lists, external sorting. Best-case time complexity: O(n log n). Average time complexity: O(n log n). Worst-case time complexity: O(n log n). Space complexity: O(n). Key characteristics: stable, predictable, not in-place in the typical array implementation, reliable for large inputs, not adaptive to nearly sorted arrays in the standard implementation. Merge Sort recursively divides the array into smaller parts until each part contains one element, then merges those parts back together in sorted order.',
    'Sorting'
  ),
  (
    5,
    '2026-01-16 11:39:41.747017+00',
    'QuickSort',
    'Algorithm: Quick Sort. Type: comparison-based, divide-and-conquer sorting algorithm. Best for: general-purpose in-memory sorting, average-case fast performance, large datasets when good pivot selection is used. Best-case time complexity: O(n log n). Average time complexity: O(n log n). Worst-case time complexity: O(n^2). Space complexity: O(log n) on average because of recursion. Key characteristics: usually very fast in practice, not stable by default, can be in-place, performance depends on pivot selection, may degrade on already sorted input if poor pivots are chosen. Quick Sort chooses a pivot, partitions the array into elements smaller and greater than the pivot, and recursively sorts each partition.',
    'Sorting'
  ),
  (
    6,
    '2026-01-19 10:00:25.394868+00',
    'HeapSort',
    'Algorithm: Heap Sort. Type: comparison-based, in-place sorting algorithm using a binary heap. Best for: predictable worst-case performance, memory-efficient sorting, situations requiring O(1) extra space. Best-case time complexity: O(n log n). Average time complexity: O(n log n). Worst-case time complexity: O(n log n). Space complexity: O(1). Key characteristics: in-place, not stable by default, predictable O(n log n) performance, low memory usage, not adaptive to nearly sorted arrays. Heap Sort first transforms the array into a max heap, repeatedly swaps the root with the last unsorted element, and rebuilds the heap until the array is sorted.',
    'Sorting'
  )
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  created_at = EXCLUDED.created_at,
  embedding = NULL;

UPDATE algorithms
SET embedding = NULL;

CREATE TABLE IF NOT EXISTS ai_conversations (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sources JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);