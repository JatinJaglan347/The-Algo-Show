import React, { useState } from "react";

const MergeSort = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Java");

  const codeSnippets = {
    Java: `public class MergeSort {
    public static void mergeSort(int[] arr, int left, int right) {
        if (left < right) {
            int mid = (left + right) / 2;
            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    private static void merge(int[] arr, int left, int mid, int right) {
        int n1 = mid - left + 1;
        int n2 = right - mid;

        int[] leftArray = new int[n1];
        int[] rightArray = new int[n2];

        System.arraycopy(arr, left, leftArray, 0, n1);
        System.arraycopy(arr, mid + 1, rightArray, 0, n2);

        int i = 0, j = 0, k = left;
        while (i < n1 && j < n2) {
            if (leftArray[i] <= rightArray[j]) {
                arr[k] = leftArray[i];
                i++;
            } else {
                arr[k] = rightArray[j];
                j++;
            }
            k++;
        }

        while (i < n1) {
            arr[k] = leftArray[i];
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = rightArray[j];
            j++;
            k++;
        }
    }
}`,
    "C++": `void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = (left + right) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    int leftArray[n1], rightArray[n2];

    for (int i = 0; i < n1; i++) {
        leftArray[i] = arr[left + i];
    }
    for (int j = 0; j < n2; j++) {
        rightArray[j] = arr[mid + 1 + j];
    }

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            i++;
        } else {
            arr[k] = rightArray[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = leftArray[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = rightArray[j];
        j++;
        k++;
    }
}`,
    Python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        left_half = arr[:mid]
        right_half = arr[mid:]

        merge_sort(left_half)
        merge_sort(right_half)

        i = j = k = 0

        while i < len(left_half) and j < len(right_half):
            if left_half[i] < right_half[j]:
                arr[k] = left_half[i]
                i += 1
            else:
                arr[k] = right_half[j]
                j += 1
            k += 1

        while i < len(left_half):
            arr[k] = left_half[i]
            i += 1
            k += 1

        while j < len(right_half):
            arr[k] = right_half[j]
            j += 1
            k += 1`,
    JavaScript: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    return result.concat(left.slice(i), right.slice(j));
}`,
    C: `void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = (left + right) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

void merge(int arr[], int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    int leftArray[n1], rightArray[n2];

    for (int i = 0; i < n1; i++) {
        leftArray[i] = arr[left + i];
    }
    for (int j = 0; j < n2; j++) {
        rightArray[j] = arr[mid + 1 + j];
    }

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (leftArray[i] <= rightArray[j]) {
            arr[k] = leftArray[i];
            i++;
        } else {
            arr[k] = rightArray[j];
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = leftArray[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = rightArray[j];
        j++;
        k++;
    }
}`,
  };

  return (
    <div className="bg-black  flex items-center justify-center lg:p-4 w-[90%] box-border">
      <div className="bg-zinc-800 p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-full  max-w-[1440px]  box-border ">
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-300 mb-4 text-center">Merge Sort Algorithm</h1>
     
        <div className="bg-zinc-900 p-4 md:p-6 rounded-md shadow-md box-border">
          <p className="text-gray-300 mb-4">
            Merge Sort is a divide-and-conquer algorithm. It divides the input array into two halves, recursively sorts the two halves, and then merges the two sorted halves. This algorithm is efficient with a time complexity of O(n log n).
          </p>
          <h2 className="text-lg md:text-xl font-semibold text-gray-300 mb-2">Key Points:</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2 pl-4">
            <li>Merge Sort divides the array into two halves.</li>
            <li>Each half is sorted recursively.</li>
            <li>The two halves are merged together in sorted order.</li>
            <li>It is a stable sort and has a time complexity of O(n log n).</li>
            <li>Merge Sort is very efficient for large datasets but requires additional space for the temporary arrays.</li>
          </ul>
        </div>

        <h2 className="text-lg md:text-xl font-semibold text-gray-300 mt-6 mb-2">How Does Merge Sort Work?</h2>
        <p className="text-gray-300">
          The process of Merge Sort can be broken down into the following steps:
        </p>
        <ul className="list-decimal list-inside text-gray-300 space-y-2 pl-4 mt-2">
          <li>Divide the array into two halves until each sub-array has one element.</li>
          <li>Merge the sub-arrays by comparing the elements and placing them in sorted order.</li>
          <li>Continue merging until the entire array is sorted.</li>
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

export default MergeSort;
