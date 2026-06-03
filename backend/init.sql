CREATE TABLE IF NOT EXISTS algorithms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT NOT NULL
);

INSERT INTO algorithms (name, description)
VALUES
  ('BubbleSort', 'Bubble Sort compares adjacent elements and swaps them if they are in the wrong order.'),
  ('InsertionSort', 'Insertion Sort builds the sorted array one element at a time.'),
  ('SelectionSort', 'Selection Sort repeatedly finds the minimum element and moves it to the beginning.'),
  ('MergeSort', 'Merge Sort divides the array into smaller parts and merges them back in sorted order.'),
  ('QuickSort', 'Quick Sort selects a pivot and partitions the array around it.'),
  ('HeapSort', 'Heap Sort builds a heap and repeatedly extracts the maximum element.')
ON CONFLICT (name) DO NOTHING;