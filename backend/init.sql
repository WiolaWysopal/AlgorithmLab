CREATE TABLE IF NOT EXISTS algorithms (
  id INTEGER PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL
);

INSERT INTO algorithms (id, created_at, name, description, category)
VALUES
  (1, '2025-12-08 14:17:17.208697+00', 'InsertionSort', 'Insertion Sort is a method of sorting a list by gradually building a sorted section at the beginning. You look at each item in the list one by one and compare it with the items that are already sorted. If it is smaller than the items before it, you move it backward until it fits in the right place. You repeat this process for each item, so the sorted section grows until the whole list is in order. It’s similar to how you might sort playing cards in your hand, sliding each new card into the correct position among the cards you already hold.', 'Sorting'),
  (2, '2026-01-09 16:00:20.667013+00', 'BubbleSort', 'Bubble Sort is a simple and intuitive sorting algorithm that works by repeatedly comparing adjacent elements and swapping them if they are in the wrong order. With each pass through the list, the largest values gradually move to the end, which is why the algorithm is called “bubble” sort. While it is easy to understand and implement, Bubble Sort is not efficient for large datasets and is mainly used for learning purposes.', 'Sorting'),
  (3, '2026-01-14 10:48:32.009561+00', 'SelectionSort', 'Selection Sort is a simple sorting algorithm that works by finding the smallest element in the unsorted part of the array and swapping it with the first element of that part, then treating this element as sorted and repeating the process for the remaining elements until the entire array is sorted.', 'Sorting'),
  (4, '2026-01-15 11:44:20.648316+00', 'MergeSort', 'Merge Sort is a sorting algorithm that works by dividing the array into smaller and smaller parts until each part contains only one element, then merging these parts back together in the correct order by comparing elements, which results in a fully sorted array.', 'Sorting'),
  (5, '2026-01-16 11:39:41.747017+00', 'QuickSort', 'Quick Sort is a sorting algorithm that works by choosing one element as a pivot, then splitting the array into two parts: elements smaller than the pivot and elements greater than the pivot, and repeating this process for each part until the entire array is sorted.', 'Sorting'),
  (6, '2026-01-19 10:00:25.394868+00', 'HeapSort', 'Heap Sort is a sorting algorithm that works by first organizing the array into a heap, where the largest element is always at the top, and then repeatedly moving this largest element to the end of the array and rebuilding the heap until the entire array is sorted.', 'Sorting')
ON CONFLICT (name) DO UPDATE SET
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  created_at = EXCLUDED.created_at;