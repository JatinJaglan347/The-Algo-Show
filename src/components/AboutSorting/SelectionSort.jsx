import React, { useState } from "react";

const SelectionSort = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Java");

  const codeSnippets = {
    Java: `public class SelectionSort {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}`,
    "C++": `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        std::swap(arr[i], arr[minIndex]);
    }
}`,
    Python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_index]:
                min_index = j
        arr[i], arr[min_index] = arr[min_index], arr[i]`,
    JavaScript: `function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
}`,
    C: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
}`,
  };

  return (
    <div className="bg-black  flex items-center justify-center lg:p-4  w-[90%] box-border">
      <div className="bg-zinc-800 p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-full  max-w-[1440px]  box-border ">
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-300 mb-4 text-center">Selection Sort Algorithm</h1>
     
        <div className="bg-zinc-900 p-4 md:p-6 rounded-md shadow-md">
          <p className="text-gray-300 mb-4">
            Selection Sort is an in-place comparison-based sorting algorithm. It works by dividing the array into two parts: a sorted section and an unsorted section. It repeatedly selects the smallest (or largest, depending on the sorting order) element from the unsorted section and swaps it with the leftmost unsorted element.
          </p>
          <h2 className="text-lg md:text-xl font-semibold text-gray-300 mb-2">Key Points:</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>Selection Sort divides the array into a sorted and an unsorted section.</li>
            <li>The smallest element from the unsorted section is selected and swapped with the first unsorted element.</li>
            <li>This process is repeated until the entire array is sorted.</li>
            <li>It is not the most efficient algorithm for large datasets, as it performs O(n²) comparisons.</li>
          </ul>
        </div>

        <h2 className="text-lg md:text-xl font-semibold text-gray-300 mt-6 mb-2">How Does Selection Sort Work?</h2>
        <p className="text-gray-300">
          Consider an array of elements. Starting from the beginning of the array:
        </p>
        <ul className="list-decimal list-inside text-gray-300 space-y-2 pl-4 mt-2">
          <li>Find the smallest element in the unsorted section of the array.</li>
          <li>Swap it with the leftmost unsorted element.</li>
          <li>Move the boundary of the sorted section to the right by one element.</li>
          <li>Repeat the process until the array is fully sorted.</li>
        </ul>
        <p className="text-gray-300 mt-4">After completing all passes, the array will be sorted.</p>

        <div className="mt-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-300 mb-4">View Code in:</h2>
          <select
            className="bg-zinc-900 text-gray-300 p-2 rounded-md w-full mb-4"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            {Object.keys(codeSnippets).map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>

          <div className="bg-zinc-900 p-4 md:p-6 rounded-md shadow-md">
            <pre className="bg-black p-4 rounded-md overflow-x-auto text-sm md:text-base text-gray-300">
              {codeSnippets[selectedLanguage]}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionSort;
