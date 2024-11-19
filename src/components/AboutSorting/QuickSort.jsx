import React, { useState } from "react";

const QuickSort = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Java");

  const codeSnippets = {
    Java: `public class QuickSort {
    public static void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pivotIndex = partition(arr, low, high);
            quickSort(arr, low, pivotIndex - 1);
            quickSort(arr, pivotIndex + 1, high);
        }
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);

        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }

        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
}`,
    "C++": `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }

    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}`,
    Python: `def quick_sort(arr, low, high):
    if low < high:
        pivot_index = partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    JavaScript: `function quickSort(arr, low, high) {
    if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;}`,
    C: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }
}

int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }

    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
  };

  return (
    <div className="bg-black flex items-center justify-center lg:p-4  w-[90%] box-border">
      <div className="bg-zinc-800 p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-full  max-w-[1440px]  box-border ">
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-300 mb-4 text-center">Quick Sort Algorithm</h1>
     
        <div className="bg-zinc-900 p-4 md:p-6 rounded-md shadow-md">
          <p className="text-gray-300 mb-4">
            Quick Sort is an efficient divide-and-conquer algorithm. It works by selecting a "pivot" element from the array and partitioning the other elements into two sub-arrays: one with elements smaller than the pivot and one with elements greater than the pivot. These sub-arrays are recursively sorted.
          </p>
          <h2 className="text-lg md:text-xl font-semibold text-gray-300 mb-2">Key Points:</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>Quick Sort is a divide-and-conquer algorithm.</li>
            <li>The array is divided into smaller sub-arrays around a pivot element.</li>
            <li>The pivot element is placed in its correct position in the array.</li>
            <li>The process is recursively repeated for the left and right sub-arrays.</li>
            <li>Its average time complexity is O(n log n), making it very efficient for large datasets.</li>
          </ul>
        </div>

        <h2 className="text-lg md:text-xl font-semibold text-gray-300 mt-6 mb-2">How Does Quick Sort Work?</h2>
        <p className="text-gray-300">
          Quick Sort works by the following steps:
        </p>
        <ul className="list-decimal list-inside text-gray-300 space-y-2 pl-4 mt-2">
          <li>Pick a pivot element from the array (commonly the last element).</li>
          <li>Partition the array into two sub-arrays: one with elements smaller than the pivot, and one with elements greater than the pivot.</li>
          <li>Recursively apply the same steps to the left and right sub-arrays until the entire array is sorted.</li>
        </ul>
        <p className="text-gray-300 mt-4">After completing all recursive calls, the array will be sorted.</p>

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

export default QuickSort;
