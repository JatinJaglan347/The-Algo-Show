import React, { useState } from "react";

const InsertionSort = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Java");

  const codeSnippets = {
    Java: `public class InsertionSort {
    public static void insertionSort(int[] arr) {
        int n = arr.length;
        for (int i = 1; i < n; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
        }
    }
}`,
    "C++": `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
    Python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`,
    JavaScript: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
    C: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
  };

  return (
    <div className="bg-black  flex items-center justify-center lg:p-4  w-[90%] box-border">
      <div className="bg-zinc-800 p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-full  max-w-[1440px]  box-border ">
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-300 mb-4 text-center">Insertion Sort Algorithm</h1>
     
        <div className="bg-zinc-900 p-4 md:p-6 rounded-md shadow-md">
          <p className="text-gray-300 mb-4">
            Insertion Sort is a simple sorting algorithm that builds the final sorted array one element at a time. It is much like sorting a hand of playing cards. It works by taking one element at a time and placing it in its correct position relative to the already sorted elements.
          </p>
          <h2 className="text-lg md:text-xl font-semibold text-gray-300 mb-2">Key Points:</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>Insertion Sort works by building a sorted section one element at a time.</li>
            <li>In each step, the current element is compared to the elements in the sorted section, and it is placed in the correct position.</li>
            <li>It is efficient for small datasets, but has a time complexity of O(n²) for larger datasets.</li>
            <li>It is adaptive, meaning it performs better when the array is nearly sorted.</li>
          </ul>
        </div>

        <h2 className="text-lg md:text-xl font-semibold text-gray-300 mt-6 mb-2">How Does Insertion Sort Work?</h2>
        <p className="text-gray-300">
          Consider an array of elements. Starting from the second element (index 1), the algorithm compares it to the elements before it. The steps are as follows:
        </p>
        <ul className="list-decimal list-inside text-gray-300 space-y-2 pl-4 mt-2">
          <li>Take the next element in the unsorted section (starting with the second element).</li>
          <li>Compare it to the elements in the sorted section (to the left of it) and shift the larger elements one position to the right.</li>
          <li>Insert the current element into the correct position in the sorted section.</li>
          <li>Repeat the process for each remaining element in the unsorted section.</li>
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

export default InsertionSort;
