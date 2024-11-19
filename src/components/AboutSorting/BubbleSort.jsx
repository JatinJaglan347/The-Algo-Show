import React, { useState } from "react";

const BubbleSort = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Java");

  const codeSnippets = {
    Java: `public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}`,
    "C++": `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
    Python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]`,
    JavaScript: `function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}`,
    C: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
  };

  return (
    <div className="bg-black  flex items-center justify-center lg:p-4  w-[90%] box-border">
      <div className="bg-zinc-800 p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-full  max-w-[1440px]  box-border ">
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-300 mb-4 text-center">Bubble Sort Algorithm</h1>
     

       
        <div className="bg-zinc-900 p-4 md:p-6 rounded-md shadow-md">
          <p className="text-gray-300 mb-4">
            Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping
            the adjacent elements if they are in the wrong order. This algorithm is not
            suitable for large data sets as its average and worst-case time complexity are
            quite high.
          </p>
          <h2 className="text-lg md:text-xl font-semibold text-gray-300 mb-2">Key Points:</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>Multiple passes are used to sort the array.</li>
            <li>After each pass, the largest unsorted element moves to its correct position.</li>
            <li>In each pass, only unsorted elements are considered.</li>
            <li>If adjacent elements are in the wrong order, they are swapped.</li>
            <li>The process continues until all elements are sorted.</li>
          </ul>
        </div>

        <h2 className="text-lg md:text-xl font-semibold text-gray-300 mt-6 mb-2">How Does Bubble Sort Work?</h2>
        <p className="text-gray-300">
          Consider an array of elements. Starting from the beginning of the array:
        </p>
        <ul className="list-decimal list-inside text-gray-300 space-y-2 pl-4 mt-2">
          <li>Compare the first two elements. If the first is greater than the second, swap them.</li>
          <li>Move to the next pair and repeat the comparison and swap process.</li>
          <li>Continue this process until the last pair of elements in the current pass.</li>
          <li>Repeat the process for all elements except the ones already sorted in previous passes.</li>
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

export default BubbleSort;
