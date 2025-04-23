import React, { useState, useContext } from 'react';
import { FaCode, FaClipboard, FaClipboardCheck, FaInfoCircle, FaArrowRight } from 'react-icons/fa';
import { ThemeContext } from '../../App';

function InsertionSort() {
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
        javascript: `function insertionSort(arr) {
    const n = arr.length;
    
    for (let i = 1; i < n; i++) {
        // Store the current element to be inserted
        let current = arr[i];
        
        // Find the position where current should be inserted
        let j = i - 1;
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert current at the correct position
        arr[j + 1] = current;
    }
    
    return arr;
}`,
        python: `def insertion_sort(arr):
    n = len(arr)
    
    for i in range(1, n):
        # Store the current element to be inserted
        current = arr[i]
        
        # Find position where current should be inserted
        j = i - 1
        while j >= 0 and arr[j] > current:
            arr[j + 1] = arr[j]
            j -= 1
            
        # Insert current at the correct position
        arr[j + 1] = current
        
    return arr`,
        java: `public static void insertionSort(int[] arr) {
    int n = arr.length;
    
    for (int i = 1; i < n; i++) {
        // Store the current element to be inserted
        int current = arr[i];
        
        // Find position where current should be inserted
        int j = i - 1;
        while (j >= 0 && arr[j] > current) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        // Insert current at the correct position
        arr[j + 1] = current;
    }
}`
    };

    return (
        <div className={`${isDarkMode ? 'text-gray-100' : 'text-gray-800'} w-full max-w-4xl mx-auto`}>
            {/* Title and Description */}
            <div className={`${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-blue-200'} rounded-lg shadow-lg border p-6 mb-6`}>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} flex items-center gap-2`}>
                    <FaInfoCircle /> Insertion Sort
                </h2>
                <p className="mb-4">
                    Insertion Sort is a simple sorting algorithm that builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms but can be efficient for small data sets, especially if they are nearly sorted.
                </p>
                <div className={`${isDarkMode ? 'bg-zinc-900' : 'bg-gray-100'} p-4 rounded-lg`}>
                    <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>Key Characteristics:</h3>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><span className="font-semibold">Time Complexity:</span> O(n²) in worst and average cases, O(n) in best case (when array is already sorted)</li>
                        <li><span className="font-semibold">Space Complexity:</span> O(1) - only requires a constant amount of additional memory space</li>
                        <li><span className="font-semibold">Stability:</span> Stable - does not change the relative order of elements with equal values</li>
                        <li><span className="font-semibold">Adaptive:</span> Yes - works well for nearly sorted arrays</li>
                    </ul>
                </div>
            </div>

            {/* How It Works */}
            <div className={`${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-blue-200'} rounded-lg shadow-lg border p-6 mb-6`}>
                <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} flex items-center gap-2`}>
                    <FaArrowRight /> How It Works
                </h2>
                <ol className="list-decimal pl-6 space-y-3">
                    <li>Start with the second element (assume the first element is already sorted).</li>
                    <li>Compare the current element with the previous elements.</li>
                    <li>If the previous element is greater than the current element, move the previous element to the next position.</li>
                    <li>Repeat step 3 as long as the previous element is greater than the current element.</li>
                    <li>Place the current element in the correct position.</li>
                    <li>Repeat steps 2-5 for all elements in the array.</li>
                </ol>
                <div className={`mt-4 ${isDarkMode ? 'bg-zinc-900 text-gray-300' : 'bg-gray-100 text-gray-700'} p-4 rounded-lg`}>
                    <p className="italic">
                        The algorithm is similar to how most people sort playing cards in their hands - picking up one card at a time and inserting it into the correct position.
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

export default InsertionSort;
