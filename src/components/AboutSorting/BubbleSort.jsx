import React, { useState, useContext } from 'react';
import { FaCode, FaClipboard, FaClipboardCheck, FaInfoCircle, FaArrowRight } from 'react-icons/fa';
import { ThemeContext } from '../../App';

function BubbleSort() {
    const [currentLanguage, setCurrentLanguage] = useState('javascript');
    const [copied, setCopied] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);

    const handleCopyCode = () => {
        const code = codeSnippets[currentLanguage];
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const codeSnippets = {
        javascript: `function bubbleSort(arr) {
    const n = arr.length;
    let swapped;
    
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap elements
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
    } while (swapped);
    
    return arr;
}`,
        python: `def bubble_sort(arr):
    n = len(arr)
    
    for i in range(n):
        swapped = False
        
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                # Swap elements
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
                
        # If no swapping occurred in this pass, array is sorted
        if not swapped:
            break
            
    return arr`,
        java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    boolean swapped;
    
    do {
        swapped = false;
        for (int i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                // Swap elements
                int temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}`
    };

    return (
        <div className={`${isDarkMode ? 'text-gray-100' : 'text-gray-800'} w-full max-w-4xl mx-auto`}>
            {/* Title and Description */}
            <div className={`${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-blue-200'} rounded-lg shadow-lg border p-6 mb-6`}>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} flex items-center gap-2`}>
                    <FaInfoCircle /> Bubble Sort
                </h2>
                <p className="mb-4">
                    Bubble Sort is a simple comparison-based sorting algorithm. It works by repeatedly stepping through the list, comparing adjacent elements, and swapping them if they are in the wrong order. The pass through the list is repeated until the list is sorted.
                </p>
                <div className={`${isDarkMode ? 'bg-zinc-900' : 'bg-gray-100'} p-4 rounded-lg`}>
                    <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>Key Characteristics:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><span className="font-semibold">Time Complexity:</span> O(n²) in worst and average cases, O(n) in best case (when array is already sorted)</li>
                        <li><span className="font-semibold">Space Complexity:</span> O(1) - only requires a constant amount of additional memory space</li>
                        <li><span className="font-semibold">Stability:</span> Stable - does not change the relative order of elements with equal values</li>
                        <li><span className="font-semibold">Adaptive:</span> Yes - can terminate early if list becomes sorted</li>
                    </ul>
                </div>
            </div>

            {/* How It Works */}
            <div className={`${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-blue-200'} rounded-lg shadow-lg border p-6 mb-6`}>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} flex items-center gap-2`}>
                    <FaArrowRight /> How It Works
                </h2>
                <ol className="list-decimal pl-6 space-y-3">
                    <li>Start at the beginning of the array and compare the first two elements.</li>
                    <li>If the first element is greater than the second, swap them.</li>
                    <li>Move to the next pair of elements and repeat step 2.</li>
                    <li>After reaching the end of the array, start again from the beginning.</li>
                    <li>Continue this process until a complete pass is made with no swaps (array is sorted).</li>
                </ol>
                <div className={`mt-4 ${isDarkMode ? 'bg-zinc-900 text-gray-300' : 'bg-gray-100 text-gray-700'} p-4 rounded-lg`}>
                    <p className="italic">
                        The algorithm gets its name because smaller elements "bubble" to the top of the array (beginning) with each iteration.
                    </p>
                </div>
            </div>

            {/* Code Implementation */}
            <div className={`${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-blue-200'} rounded-lg shadow-lg border p-6`}>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} flex items-center gap-2`}>
                    <FaCode /> Implementation
                </h2>
                
                {/* Language Tabs */}
                <div className="flex border-b mb-4">
                    {Object.keys(codeSnippets).map(language => (
                        <button
                            key={language}
                            onClick={() => setCurrentLanguage(language)}
                            className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                                currentLanguage === language 
                                    ? isDarkMode 
                                        ? 'bg-zinc-700 text-blue-400 border-b-2 border-blue-500' 
                                        : 'bg-blue-100 text-blue-800 border-b-2 border-blue-500' 
                                    : isDarkMode 
                                        ? 'text-gray-400 hover:text-gray-200 hover:bg-zinc-700' 
                                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                            }`}
                        >
                            {language.charAt(0).toUpperCase() + language.slice(1)}
                        </button>
                    ))}
                </div>
                
                {/* Code Block */}
                <div className="relative">
                    <pre className={`${isDarkMode ? 'bg-zinc-900' : 'bg-gray-100'} p-4 rounded-lg overflow-x-auto`}>
                        <code className={`${isDarkMode ? 'text-gray-100' : 'text-gray-800'} font-mono`}>
                            {codeSnippets[currentLanguage]}
                        </code>
                    </pre>
                    <button 
                        onClick={handleCopyCode}
                        className={`absolute top-2 right-2 p-2 rounded ${
                            isDarkMode 
                                ? 'bg-zinc-700 hover:bg-zinc-600 text-blue-400' 
                                : 'bg-gray-200 hover:bg-gray-300 text-blue-600'
                        } transition-colors`}
                    >
                        {copied ? <FaClipboardCheck /> : <FaClipboard />}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BubbleSort;
