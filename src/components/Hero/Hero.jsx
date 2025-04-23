import React, { useState, useEffect, useRef, useContext } from 'react'
import Bar from '../Bar/Bar';
import { RandomNumGen, delay } from '../../utils';
import { TfiReload } from "react-icons/tfi";
import { ImCross } from "react-icons/im";
import { FaPlay, FaRandom, FaCode, FaInfoCircle, FaChartBar, FaStepForward, FaCompressArrowsAlt, FaSortAmountDown, FaSortAmountUp, FaRulerVertical, FaRandom as FaShuffleIcon, FaDownload } from "react-icons/fa";
import BubbleSort from '../AboutSorting/BubbleSort';
import SelectionSort from '../AboutSorting/SelectionSort';
import InsertionSort from '../AboutSorting/InsertionSort';
import MergeSort from '../AboutSorting/MergeSort';
import QuickSort from '../AboutSorting/QuickSort';
import { ThemeContext } from '../../App';

function Hero() {
    const [arrRange, setArrRange] = useState(20);
    const [randomArr, setRandomArr] = useState([]);
    const [SortArr, setSortArr] = useState([]);
    const [delayTime, setDelayTime] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [nextIndex, setNextIndex] = useState(null);
    const [swapCount, setSwapCount] = useState(0);
    const [selectedAlgo, setSelectedAlgo] = useState("");
    const [isSorting, setIsSorting] = useState(false);
    const barWidth = 100;
    const stopSortingRef = useRef(false);
    const { isDarkMode } = useContext(ThemeContext);

    // New state variables
    const [arrayType, setArrayType] = useState("random");
    const [comparisonMode, setComparisonMode] = useState(false);
    const [secondAlgo, setSecondAlgo] = useState("");
    const [secondSortArr, setSecondSortArr] = useState([]);
    const [secondSwapCount, setSecondSwapCount] = useState(0);
    const [secondCurrentIndex, setSecondCurrentIndex] = useState(null);
    const [secondNextIndex, setSecondNextIndex] = useState(null);
    const [showStats, setShowStats] = useState(false);
    const [stats, setStats] = useState({
        firstAlgo: { time: 0, swaps: 0 },
        secondAlgo: { time: 0, swaps: 0 }
    });
    const [isStepMode, setIsStepMode] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [maxArraySize, setMaxArraySize] = useState(50); // Maximum array size allowed
    const [customArrayInput, setCustomArrayInput] = useState('');
    const [showCustomArrayInput, setShowCustomArrayInput] = useState(false);

    // Initialize with random array on component mount
    useEffect(() => {
        generateArray(arrayType);
    }, []);

    const generateArray = (type) => {
        let result = [];
        switch (type) {
            case "random":
                result = RandomNumGen(arrRange);
                break;
            case "nearly-sorted":
                result = RandomNumGen(arrRange).sort((a, b) => a - b);
                // Swap a few elements to make it nearly sorted
                for (let i = 0; i < Math.floor(arrRange * 0.2); i++) {
                    const idx1 = Math.floor(Math.random() * arrRange);
                    const idx2 = Math.floor(Math.random() * arrRange);
                    [result[idx1], result[idx2]] = [result[idx2], result[idx1]];
                }
                break;
            case "reversed":
                result = RandomNumGen(arrRange).sort((a, b) => b - a);
                break;
            case "few-unique":
                const uniqueValues = [25, 50, 75, 100];
                result = Array(arrRange).fill(0).map(() => uniqueValues[Math.floor(Math.random() * uniqueValues.length)]);
                break;
            case "custom":
                result = randomArr;
                break;
            default:
                result = RandomNumGen(arrRange);
        }
        setRandomArr(result);
        setArrayType(type);
        resetSorting();
    };

    const getArrRange = (event) => {
        const value = Number(event.target.value);
        if (value <= maxArraySize) {
            setArrRange(value);
            generateArray(arrayType);
        }
    };
    
    const regenArrRange = () => {
        generateArray(arrayType);
    };

    const delayTimeVal = (event) => {
        setDelayTime((event.target.value) * 1000);
    };

   function handleSortChange(event) {
    setSelectedAlgo(event.target.value);
    }

    function handleSecondSortChange(event) {
        setSecondAlgo(event.target.value);
    }

    function toggleComparisonMode() {
        setComparisonMode(!comparisonMode);
        if (!comparisonMode) {
            setSecondSortArr([]);
            setSecondSwapCount(0);
            setSecondCurrentIndex(null);
            setSecondNextIndex(null);
        }
        // Reset visualization when toggling modes
        resetSorting();
}

    function handleSortButtonClick() {
        if (isSorting) return; 
        stopSortingRef.current = false;
        
        // Reset the swap count at the beginning of a new sort
        setSwapCount(0);
        setSecondSwapCount(0);
        
        // Reset stats
        setStats({
            firstAlgo: { time: 0, swaps: 0 },
            secondAlgo: { time: 0, swaps: 0 }
        });
        
        setShowStats(false);
        
        // If in step mode, just prepare the arrays but don't start automatically
        if (isStepMode) {
            setIsSorting(true);
            prepareAlgorithms();
            return;
        }
        
        const startTime = performance.now();
        let sortPromises = [];

        // Start first algorithm
        let firstPromise;
        switch (selectedAlgo) {
            case "bubbleSort":
                firstPromise = callBubbleSort();
                break;
            case "selectionSort":
                firstPromise = callSelectionSort();
                break;
            case "insertionSort":
                firstPromise = callInsertionSort();
                break;
            case "mergeSort":
                firstPromise = callMergeSort();
                break;
            case "quickSort":
                firstPromise = callQuickSort();
                break;
            default:
                alert("Please select a sorting algorithm");
                return;
        }
        sortPromises.push(
            firstPromise.then(() => {
                const endTime = performance.now();
                setStats(prev => ({
                    ...prev,
                    firstAlgo: { 
                        time: (endTime - startTime) / 1000, 
                        swaps: swapCount 
                    }
                }));
            })
        );

        // Start second algorithm if in comparison mode
        if (comparisonMode && secondAlgo) {
            const secondStartTime = performance.now();
            let secondPromise;
            switch (secondAlgo) {
                case "bubbleSort":
                    secondPromise = callSecondBubbleSort();
                    break;
                case "selectionSort":
                    secondPromise = callSecondSelectionSort();
                    break;
                case "insertionSort":
                    secondPromise = callSecondInsertionSort();
                    break;
                case "mergeSort":
                    secondPromise = callSecondMergeSort();
                    break;
                case "quickSort":
                    secondPromise = callSecondQuickSort();
                    break;
            }
            sortPromises.push(
                secondPromise.then(() => {
                    const endTime = performance.now();
                    setStats(prev => ({
                        ...prev,
                        secondAlgo: { 
                            time: (endTime - secondStartTime) / 1000, 
                            swaps: secondSwapCount 
                        }
                    }));
                })
            );
        }

        // Show stats when all algorithms are done
        Promise.all(sortPromises).then(() => {
            setShowStats(true);
            setIsSorting(false);
        });
}

// Helper function for step mode preparation
const prepareAlgorithms = () => {
    setSortArr([...randomArr]);
    if (comparisonMode) {
        setSecondSortArr([...randomArr]);
    }
    setCurrentStep(0);
};

// Function to execute a single step in step mode
const executeStep = async () => {
    if (!isStepMode || !isSorting) return;
    
    const stepExecuted = await executeAlgorithmStep(selectedAlgo, currentStep);
    
    if (comparisonMode && secondAlgo) {
        await executeSecondAlgorithmStep(secondAlgo, currentStep);
    }
    
    if (stepExecuted) {
        setCurrentStep(prev => prev + 1);
    } else {
        // All steps completed
        setIsSorting(false);
        setShowStats(true);
    }
};

// Helper function to execute a single step of a specific algorithm
const executeAlgorithmStep = async (algo, step) => {
    const arrToStep = [...SortArr];
    let executed = false;
    
    switch (algo) {
        case "bubbleSort":
            executed = await executeBubbleSortStep(arrToStep, step);
            break;
        case "selectionSort":
            executed = await executeSelectionSortStep(arrToStep, step);
            break;
        case "insertionSort":
            executed = await executeInsertionSortStep(arrToStep, step);
            break;
        case "mergeSort":
            executed = await executeMergeSortStep(arrToStep, step);
            break;
        case "quickSort":
            executed = await executeQuickSortStep(arrToStep, step);
            break;
        // Add other algorithms as needed
    }
    
    return executed;
};

// Helper function to execute a single step of a specific algorithm for the second visualizer
const executeSecondAlgorithmStep = async (algo, step) => {
    const arrToStep = [...secondSortArr];
    let executed = false;
    
    switch (algo) {
        case "bubbleSort":
            executed = await executeSecondBubbleSortStep(arrToStep, step);
            break;
        case "selectionSort":
            executed = await executeSecondSelectionSortStep(arrToStep, step);
            break;
        case "insertionSort":
            executed = await executeSecondInsertionSortStep(arrToStep, step);
            break;
        case "mergeSort":
            executed = await executeSecondMergeSortStep(arrToStep, step);
            break;
        case "quickSort":
            executed = await executeSecondQuickSortStep(arrToStep, step);
            break;
        // Add other algorithms as needed
    }
    
    return executed;
};

// Implement step functions for each algorithm (example for Bubble Sort)
const executeBubbleSortStep = async (arr, step) => {
    // Calculate i and j from the step count
    const n = arr.length;
    let totalComparisons = 0;
    let currentI = 0;
    let currentJ = 0;
    
    // Calculate which i and j we should be at based on step count
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (totalComparisons === step) {
                currentI = i;
                currentJ = j;
                
                // Execute this step
                setCurrentIndex(j);
                setNextIndex(j + 1);
                
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setSwapCount((prev) => prev + 1);
                }
                
                setSortArr([...arr]);
                return true;
            }
            totalComparisons++;
        }
    }
    
    // If we've reached this point, all steps are complete
    setCurrentIndex(null);
    setNextIndex(null);
    return false;
};

const executeSelectionSortStep = async (arr, step) => {
    const n = arr.length;
    let totalSteps = 0;
    
    for (let i = 0; i < n; i++) {
        let min_idx = i;
        setCurrentIndex(i);
        
        for (let j = i + 1; j < n; j++) {
            if (totalSteps === step) {
                setNextIndex(j);
                
                if (arr[j] < arr[min_idx]) {
                    min_idx = j;
                }
                
                setSortArr([...arr]);
                return true;
            }
            totalSteps++;
        }
        
        // Swap elements (this is a separate step)
        if (totalSteps === step) {
            if (min_idx !== i) {
                [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
                setSwapCount((prev) => prev + 1);
            }
            setSortArr([...arr]);
            setCurrentIndex(null);
            setNextIndex(null);
            return true;
        }
        totalSteps++;
    }
    
    // If we've reached this point, all steps are complete
    setCurrentIndex(null);
    setNextIndex(null);
    return false;
};

const executeInsertionSortStep = async (arr, step) => {
    const n = arr.length;
    let totalSteps = 0;
    
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            if (totalSteps === step) {
                setCurrentIndex(j);
                setNextIndex(j + 1);
                
                arr[j + 1] = arr[j];
                setSortArr([...arr]);
                return true;
            }
            totalSteps++;
            j--;
        }
        
        // Place key in its correct position (separate step)
        if (totalSteps === step) {
            arr[j + 1] = key;
            setSwapCount((prev) => prev + 1);
            setSortArr([...arr]);
            return true;
        }
        totalSteps++;
    }
    
    // If we've reached this point, all steps are complete
    setCurrentIndex(null);
    setNextIndex(null);
    return false;
};

const executeMergeSortStep = async (arr, step) => {
    const n = arr.length;
    let totalSteps = 0;
    
    const mergeSortStep = async (arr, left, right) => {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            
            await mergeSortStep(arr, left, mid);
            await mergeSortStep(arr, mid + 1, right);
            
            await merge(arr, left, mid, right);
        }
    };
    
    const merge = async (arr, left, mid, right) => {
        let count = swapCount;
        const n1 = mid - left + 1;
        const n2 = right - mid;
        
        let leftArr = new Array(n1);
        let rightArr = new Array(n2);
        
        for (let i = 0; i < n1; i++) {
            leftArr[i] = arr[left + i];
        }
        for (let j = 0; j < n2; j++) {
            rightArr[j] = arr[mid + 1 + j];
        }
        
        let i = 0, j = 0, k = left;
        
        while (i < n1 && j < n2) {
            if (totalSteps === step) {
                setCurrentIndex(left + i);
                setNextIndex(mid + 1 + j); 
                
                if (leftArr[i] <= rightArr[j]) {
                    arr[k] = leftArr[i];
                    i++;
                } else {
                    arr[k] = rightArr[j];
                    j++;
                    count++;
                }
                setSwapCount(count);
                setSortArr([...arr]); 
                return true;
            }
            totalSteps++;
            k++;
        }
        
        while (i < n1) {
            if (totalSteps === step) {
                setCurrentIndex(left + i);
                
                arr[k] = leftArr[i];
                i++;
                k++;
                setSortArr([...arr]);
                return true;
            }
            totalSteps++;
        }
        
        while (j < n2) {
            if (totalSteps === step) {
                setNextIndex(mid + 1 + j);
                
                arr[k] = rightArr[j];
                j++;
                k++;
                setSortArr([...arr]);
                return true;
            }
            totalSteps++;
        }
        
        setCurrentIndex(null); 
        setNextIndex(null);
        return false;
    };
    
    await mergeSortStep(arr, 0, n - 1);
    
    // If we've reached this point, all steps are complete
    setCurrentIndex(null);
    setNextIndex(null);
    return false;
};

const executeQuickSortStep = async (arr, step) => {
    const n = arr.length;
    let totalSteps = 0;
    
    const partition = async (arr, low, high) => {
        let pivot = arr[high];
        let i = low - 1;
        setCurrentIndex(high);
        
        for (let j = low; j < high; j++) {
            if (totalSteps === step) {
                setNextIndex(j);
                
                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    setSwapCount((count) => count + 1);
                }
                
                setSortArr([...arr]);
                return true;
            }
            totalSteps++;
        }
        
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        setSwapCount((count) => count + 1);
        setSortArr([...arr]);
        
        setCurrentIndex(null);
        setNextIndex(null);
        return i + 1;
    };
    
    const quickSortStep = async (arr, low, high) => {
        if (low < high) {
            const pi = await partition(arr, low, high);
            await quickSortStep(arr, low, pi - 1);
            await quickSortStep(arr, pi + 1, high);
        }
    };
    
    await quickSortStep(arr, 0, n - 1);
    
    // If we've reached this point, all steps are complete
    setCurrentIndex(null);
    setNextIndex(null);
    return false;
};

const executeSecondBubbleSortStep = async (arr, step) => {
    const n = arr.length;
    let totalComparisons = 0;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (totalComparisons === step) {
                setSecondCurrentIndex(j);
                setSecondNextIndex(j + 1);
                
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setSecondSwapCount((prev) => prev + 1);
                }
                
                setSecondSortArr([...arr]);
                return true;
            }
            totalComparisons++;
        }
    }
    
    setSecondCurrentIndex(null);
    setSecondNextIndex(null);
    return false;
};

const executeSecondSelectionSortStep = async (arr, step) => {
    const n = arr.length;
    let totalSteps = 0;
    
    for (let i = 0; i < n; i++) {
        let min_idx = i;
        setSecondCurrentIndex(i);
        
        for (let j = i + 1; j < n; j++) {
            if (totalSteps === step) {
                setSecondNextIndex(j);
                
                if (arr[j] < arr[min_idx]) {
                    min_idx = j;
                }
                
                setSecondSortArr([...arr]);
                return true;
            }
            totalSteps++;
        }
        
        if (totalSteps === step) {
            if (min_idx !== i) {
                [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
                setSecondSwapCount((prev) => prev + 1);
            }
            setSecondSortArr([...arr]);
            setSecondCurrentIndex(null);
            setSecondNextIndex(null);
            return true;
        }
        totalSteps++;
    }
    
    setSecondCurrentIndex(null);
    setSecondNextIndex(null);
    return false;
};

const executeSecondInsertionSortStep = async (arr, step) => {
    const n = arr.length;
    let totalSteps = 0;
    
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > key) {
            if (totalSteps === step) {
                setSecondCurrentIndex(j);
                setSecondNextIndex(j + 1);
                
                arr[j + 1] = arr[j];
                setSecondSortArr([...arr]);
                return true;
            }
            totalSteps++;
            j--;
        }
        
        if (totalSteps === step) {
            arr[j + 1] = key;
            setSecondSwapCount((prev) => prev + 1);
            setSecondSortArr([...arr]);
            return true;
        }
        totalSteps++;
    }
    
    setSecondCurrentIndex(null);
    setSecondNextIndex(null);
    return false;
};

const executeSecondMergeSortStep = async (arr, step) => {
    const n = arr.length;
    let totalSteps = 0;
    
    const mergeSortStep = async (arr, left, right) => {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            
            await mergeSortStep(arr, left, mid);
            await mergeSortStep(arr, mid + 1, right);
            
            await merge(arr, left, mid, right);
        }
    };
    
    const merge = async (arr, left, mid, right) => {
        let count = secondSwapCount;
        const n1 = mid - left + 1;
        const n2 = right - mid;
        
        let leftArr = new Array(n1);
        let rightArr = new Array(n2);
        
        for (let i = 0; i < n1; i++) {
            leftArr[i] = arr[left + i];
        }
        for (let j = 0; j < n2; j++) {
            rightArr[j] = arr[mid + 1 + j];
        }
        
        let i = 0, j = 0, k = left;
        
        while (i < n1 && j < n2) {
            if (totalSteps === step) {
                setSecondCurrentIndex(left + i);
                setSecondNextIndex(mid + 1 + j); 
                
                if (leftArr[i] <= rightArr[j]) {
                    arr[k] = leftArr[i];
                    i++;
                } else {
                    arr[k] = rightArr[j];
                    j++;
                    count++;
                }
                setSecondSwapCount(count);
                setSecondSortArr([...arr]); 
                return true;
            }
            totalSteps++;
            k++;
        }
        
        while (i < n1) {
            if (totalSteps === step) {
                setSecondCurrentIndex(left + i);
                
                arr[k] = leftArr[i];
                i++;
                k++;
                setSecondSortArr([...arr]);
                return true;
            }
            totalSteps++;
        }
        
        while (j < n2) {
            if (totalSteps === step) {
                setSecondNextIndex(mid + 1 + j);
                
                arr[k] = rightArr[j];
                j++;
                k++;
                setSecondSortArr([...arr]);
                return true;
            }
            totalSteps++;
        }
        
        setSecondCurrentIndex(null); 
        setSecondNextIndex(null);
        return false;
    };
    
    await mergeSortStep(arr, 0, n - 1);
    
    // If we've reached this point, all steps are complete
    setSecondCurrentIndex(null);
    setSecondNextIndex(null);
    return false;
};

const executeSecondQuickSortStep = async (arr, step) => {
    const n = arr.length;
    let totalSteps = 0;
    
    const partition = async (arr, low, high) => {
        let pivot = arr[high];
        let i = low - 1;
        setSecondCurrentIndex(high);
        
        for (let j = low; j < high; j++) {
            if (totalSteps === step) {
                setSecondNextIndex(j);
                
                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    setSecondSwapCount((count) => count + 1);
                }
                
                setSecondSortArr([...arr]);
                return true;
            }
            totalSteps++;
        }
        
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        setSecondSwapCount((count) => count + 1);
        setSecondSortArr([...arr]);
        
        setSecondCurrentIndex(null);
        setSecondNextIndex(null);
        return i + 1;
    };
    
    const quickSortStep = async (arr, low, high) => {
        if (low < high) {
            const pi = await partition(arr, low, high);
            await quickSortStep(arr, low, pi - 1);
            await quickSortStep(arr, pi + 1, high);
        }
    };
    
    await quickSortStep(arr, 0, n - 1);
    
    // If we've reached this point, all steps are complete
    setSecondCurrentIndex(null);
    setSecondNextIndex(null);
    return false;
};

const resetSorting = () => {
    stopSortingRef.current = true;
        setSortArr([]);
        setSecondSortArr([]);
        setSwapCount(0);
        setSecondSwapCount(0);
        setCurrentIndex(null);
        setNextIndex(null);
        setSecondCurrentIndex(null);
        setSecondNextIndex(null);
        setIsSorting(false);
        setShowStats(false);
        setIsStepMode(false);
        setCurrentStep(0);
    };

// BUBBLE SORT
    async function callBubbleSort() {
        setIsSorting(true); 
        const arrToSort = [...randomArr];
        let count =0;
        for (let i = 0; i < arrToSort.length; i++) {
            if(stopSortingRef.current){
                return ;
            }
            for (let j = 0; j < arrToSort.length - i - 1; j++) {
                if(stopSortingRef.current){
                    return ;
                }
                setCurrentIndex(j);
                setNextIndex(j + 1);
                if (arrToSort[j] > arrToSort[j + 1]) { 
                    [arrToSort[j], arrToSort[j + 1]] = [arrToSort[j + 1], arrToSort[j]];
                    count++;
                    setSwapCount(count);
                }
                setSortArr([...arrToSort]);
                await delay(delayTime); 
            }
            setCurrentIndex(null); 
            setNextIndex(null);
        }
        setIsSorting(false);
        
    }

// SELECTION SORT
async function callSelectionSort() {
    setIsSorting(true); 
    const arrToSort = [...randomArr];
    let count=0 ;
    for (let i=0 ; i<arrToSort.length; i++){
        if(stopSortingRef.current){
            return ;
        }
        let min_idx = i ;
        setCurrentIndex(i);
        for (let j=i+1; j<arrToSort.length ; j++){
            if(stopSortingRef.current){
                return ;
            }
            setNextIndex(j);
            if (arrToSort[j]<arrToSort[min_idx]){
               min_idx=j; 
               setNextIndex(min_idx);
            }
            setSortArr([...arrToSort]);
            await delay(delayTime);
        }
        if (min_idx !== i) {
            [arrToSort[i], arrToSort[min_idx]] = [arrToSort[min_idx], arrToSort[i]];
            count++;
            setSwapCount(count); // Update swap count
        }
        setCurrentIndex(null); 
        setNextIndex(null);
    }
    setIsSorting(false);
}

// INSERTION SORT
async function callInsertionSort() {
    setIsSorting(true); 
    const arrToSort = [...randomArr];
    let count = 0;
    for (let i = 1; i < arrToSort.length; i++) {
        if(stopSortingRef.current){
            return ;
        }
        let key = arrToSort[i];
        let j = i - 1;
        setCurrentIndex(i);  
        setNextIndex(j);     
        while (j >= 0 && arrToSort[j] > key) {
            if(stopSortingRef.current){
                return ;
            }
            arrToSort[j + 1] = arrToSort[j];
            setSortArr([...arrToSort]);  
            await delay(delayTime);  
            j = j - 1; 
            setCurrentIndex(j);
            setNextIndex(j + 1);
        }
        arrToSort[j + 1] = key;
        count++;
        setSwapCount(count);  
        setSortArr([...arrToSort]);  
        await delay(delayTime);  
        setCurrentIndex(null);  
        setNextIndex(null);     
    }
    setIsSorting(false);
}

// MERGE SORT
async function callMergeSort() {
    setIsSorting(true); 
    const arrToSort = [...randomArr];
    await mergeSort(arrToSort, 0, arrToSort.length - 1);
    setSortArr([...arrToSort]); 
    setIsSorting(false);
}
async function merge(arr, left, mid, right) {
    let count = swapCount;
    const n1 = mid - left + 1;
    const n2 = right - mid;

    
    let leftArr = new Array(n1);
    let rightArr = new Array(n2);

    for (let i = 0; i < n1; i++) {
        if(stopSortingRef.current){
            return ;
        }
        leftArr[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
        if(stopSortingRef.current){
            return ;
        }
        rightArr[j] = arr[mid + 1 + j];
    }

    let i = 0,
        j = 0,
        k = left;

    while (i < n1 && j < n2) {
        if(stopSortingRef.current){
            return ;
        }
        setCurrentIndex(left + i);
        setNextIndex(mid + 1 + j); 
        await delay(delayTime);

        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
            count++;
        }
        setSwapCount(count);
        setSortArr([...arr]); 
        k++;
    }
    while (i < n1) {
        if(stopSortingRef.current){
            return ;
        }
        setCurrentIndex(left + i);
        arr[k] = leftArr[i];
        i++;
        k++;
        setSortArr([...arr]);
        await delay(delayTime);
    }

    while (j < n2) {
        if(stopSortingRef.current){
            return ;
        }
        setNextIndex(mid + 1 + j);
        arr[k] = rightArr[j];
        j++;
        k++;
        setSortArr([...arr]);
        await delay(delayTime);
    }

    setCurrentIndex(null); 
    setNextIndex(null);
    
}

async function mergeSort(arr, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);

        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);

       
        await merge(arr, left, mid, right);
    }
    
}

// QUICK SORT
async function callQuickSort() {
    setIsSorting(true); 
    const arrToSort = [...randomArr];
    await quickSort(arrToSort, 0, arrToSort.length - 1);
    setSortArr([...arrToSort]); // Final sorted array
    setIsSorting(false);
}

// Helper function to partition the array
async function partition(arr, low, high) {
    let pivot = arr[high]; // Choose the last element as pivot
    let i = low - 1; // Index of the smaller element
    setCurrentIndex(high); // Highlight the pivot index

    for (let j = low; j < high; j++) {
        if(stopSortingRef.current){
            return ;
        }
        setNextIndex(j); // Highlight the current index being compared
        await delay(delayTime);

        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap if element is smaller than pivot
            setSwapCount((count) => count + 1); // Increment swap count
        }

        setSortArr([...arr]); // Update visualization
    }

    // Swap the pivot element with the element at i+1
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setSwapCount((count) => count + 1); // Increment swap count
    setSortArr([...arr]); // Update visualization

    setCurrentIndex(null); // Clear highlights
    setNextIndex(null);
    return i + 1; // Return the partition index
    
}

// Recursive Quick Sort function
async function quickSort(arr, low, high) {
    if (low < high) {
        const pi = await partition(arr, low, high); // Get the partition index

        // Recursively sort elements before and after partition
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
    
}

    // Second set of sorting algorithms for comparison mode
    async function callSecondBubbleSort() {
        setIsSorting(true); 
        const arrToSort = [...randomArr];
        let count = 0;
        for (let i = 0; i < arrToSort.length; i++) {
            if(stopSortingRef.current){
                return;
            }
            for (let j = 0; j < arrToSort.length - i - 1; j++) {
                if(stopSortingRef.current){
                    return;
                }
                setSecondCurrentIndex(j);
                setSecondNextIndex(j + 1);
                if (arrToSort[j] > arrToSort[j + 1]) { 
                    [arrToSort[j], arrToSort[j + 1]] = [arrToSort[j + 1], arrToSort[j]];
                    count++;
                    setSecondSwapCount(count);
                }
                setSecondSortArr([...arrToSort]);
                await delay(delayTime); 
            }
            setSecondCurrentIndex(null); 
            setSecondNextIndex(null);
        }
    }
    
    async function callSecondSelectionSort() {
        setIsSorting(true); 
        const arrToSort = [...randomArr];
        let count = 0;
        for (let i = 0; i < arrToSort.length; i++) {
            if(stopSortingRef.current){
                return;
            }
            let min_idx = i;
            setSecondCurrentIndex(i);
            for (let j = i + 1; j < arrToSort.length; j++) {
                if(stopSortingRef.current){
                    return;
                }
                setSecondNextIndex(j);
                if (arrToSort[j] < arrToSort[min_idx]) {
                    min_idx = j; 
                    setSecondNextIndex(min_idx);
                }
                setSecondSortArr([...arrToSort]);
                await delay(delayTime);
            }
            if (min_idx !== i) {
                [arrToSort[i], arrToSort[min_idx]] = [arrToSort[min_idx], arrToSort[i]];
                count++;
                setSecondSwapCount(count);
            }
            setSecondCurrentIndex(null); 
            setSecondNextIndex(null);
        }
    }
    
    async function callSecondInsertionSort() {
        setIsSorting(true); 
        const arrToSort = [...randomArr];
        let count = 0;
        for (let i = 1; i < arrToSort.length; i++) {
            if(stopSortingRef.current){
                return;
            }
            let key = arrToSort[i];
            let j = i - 1;
            setSecondCurrentIndex(i);  
            setSecondNextIndex(j);     
            while (j >= 0 && arrToSort[j] > key) {
                if(stopSortingRef.current){
                    return;
                }
                arrToSort[j + 1] = arrToSort[j];
                setSecondSortArr([...arrToSort]);  
                await delay(delayTime);  
                j = j - 1; 
                setSecondCurrentIndex(j);
                setSecondNextIndex(j + 1);
            }
            arrToSort[j + 1] = key;
            count++;
            setSecondSwapCount(count);  
            setSecondSortArr([...arrToSort]);  
            await delay(delayTime);  
            setSecondCurrentIndex(null);  
            setSecondNextIndex(null);     
        }
    }
    
    async function callSecondMergeSort() {
        setIsSorting(true); 
        const arrToSort = [...randomArr];
        await secondMergeSort(arrToSort, 0, arrToSort.length - 1);
        setSecondSortArr([...arrToSort]); 
    }
    
    async function secondMerge(arr, left, mid, right) {
        let count = secondSwapCount;
        const n1 = mid - left + 1;
        const n2 = right - mid;
        
        let leftArr = new Array(n1);
        let rightArr = new Array(n2);
        
        for (let i = 0; i < n1; i++) {
            if(stopSortingRef.current){
                return;
            }
            leftArr[i] = arr[left + i];
        }
        for (let j = 0; j < n2; j++) {
            if(stopSortingRef.current){
                return;
            }
            rightArr[j] = arr[mid + 1 + j];
        }
        
        let i = 0, j = 0, k = left;
        
        while (i < n1 && j < n2) {
            if(stopSortingRef.current){
                return;
            }
            setSecondCurrentIndex(left + i);
            setSecondNextIndex(mid + 1 + j); 
            await delay(delayTime);
            
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
                count++;
            }
            setSecondSwapCount(count);
            setSecondSortArr([...arr]); 
            k++;
        }
        
        while (i < n1) {
            if(stopSortingRef.current){
                return;
            }
            setSecondCurrentIndex(left + i);
            arr[k] = leftArr[i];
            i++;
            k++;
            setSecondSortArr([...arr]);
            await delay(delayTime);
        }
        
        while (j < n2) {
            if(stopSortingRef.current){
                return;
            }
            setSecondNextIndex(mid + 1 + j);
            arr[k] = rightArr[j];
            j++;
            k++;
            setSecondSortArr([...arr]);
            await delay(delayTime);
        }
        
        setSecondCurrentIndex(null); 
        setSecondNextIndex(null);
    }
    
    async function secondMergeSort(arr, left, right) {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);
            await secondMergeSort(arr, left, mid);
            await secondMergeSort(arr, mid + 1, right);
            await secondMerge(arr, left, mid, right);
        }
    }
    
    async function callSecondQuickSort() {
        setIsSorting(true); 
        const arrToSort = [...randomArr];
        await secondQuickSort(arrToSort, 0, arrToSort.length - 1);
        setSecondSortArr([...arrToSort]); 
    }
    
    async function secondPartition(arr, low, high) {
        let pivot = arr[high];
        let i = low - 1;
        setSecondCurrentIndex(high);
        
        for (let j = low; j < high; j++) {
            if(stopSortingRef.current){
                return;
            }
            setSecondNextIndex(j);
            await delay(delayTime);
            
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
                setSecondSwapCount((count) => count + 1);
            }
            
            setSecondSortArr([...arr]);
        }
        
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        setSecondSwapCount((count) => count + 1);
        setSecondSortArr([...arr]);
        
        setSecondCurrentIndex(null);
        setSecondNextIndex(null);
        return i + 1;
    }
    
    async function secondQuickSort(arr, low, high) {
        if (low < high) {
            const pi = await secondPartition(arr, low, high);
            await secondQuickSort(arr, low, pi - 1);
            await secondQuickSort(arr, pi + 1, high);
        }
    }
    
    const exportData = () => {
        // Create data for export including algorithm name, array size, time, and swaps
        const exportDataRows = [];
        exportDataRows.push(['Algorithm', 'Array Size', 'Array Type', 'Time (s)', 'Swaps']);
        
        if (selectedAlgo) {
            exportDataRows.push([
                selectedAlgo,
                arrRange,
                arrayType,
                stats.firstAlgo.time.toFixed(3),
                stats.firstAlgo.swaps
            ]);
        }
        
        if (comparisonMode && secondAlgo) {
            exportDataRows.push([
                secondAlgo,
                arrRange,
                arrayType,
                stats.secondAlgo.time.toFixed(3),
                stats.secondAlgo.swaps
            ]);
        }
        
        // Convert data to CSV format
        const csvContent = exportDataRows.map(row => row.join(',')).join('\n');
        
        // Create a blob and download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `sorting-results-${new Date().toISOString().slice(0, 10)}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCustomArrayInput = (e) => {
        setCustomArrayInput(e.target.value);
    };
    
    const applyCustomArray = () => {
        try {
            // Parse the input string to array of numbers
            const customArray = customArrayInput.split(',')
                .map(item => Number(item.trim()))
                .filter(num => !isNaN(num));
            
            if (customArray.length > 0) {
                setRandomArr(customArray);
                setArrRange(customArray.length);
                setArrayType('custom');
                resetSorting();
                setShowCustomArrayInput(false);
            }
        } catch (error) {
            console.error("Error parsing custom array:", error);
        }
    };

    // Update swap counts in stats whenever they change
    useEffect(() => {
        if (isSorting) {
            setStats(prevStats => ({
                ...prevStats,
                firstAlgo: {
                    ...prevStats.firstAlgo,
                    swaps: swapCount
                }
            }));
        }
    }, [swapCount, isSorting]);

    useEffect(() => {
        if (isSorting && comparisonMode) {
            setStats(prevStats => ({
                ...prevStats,
                secondAlgo: {
                    ...prevStats.secondAlgo,
                    swaps: secondSwapCount
                }
            }));
        }
    }, [secondSwapCount, isSorting, comparisonMode]);

    function bubbleSort(arr, compare, setCount, setCurrentIdx, setNextIdx, isSecondAlgo = false) {
        return (async () => {
            let sorted = false;
            let n = arr.length;
            let tempArr = [...arr];
            
            while (!sorted) {
                sorted = true;
                for (let i = 0; i < n - 1; i++) {
                    // Stop sorting if requested
                    if (stopSortingRef.current) {
                        return tempArr;
                    }
                    
                    setCurrentIdx(i);
                    setNextIdx(i + 1);
                    
                    // await a delay to visualize sorting
                    await delay(delayTime);
                    
                    if (compare(tempArr[i], tempArr[i + 1])) {
                        // Perform swap
                        [tempArr[i], tempArr[i + 1]] = [tempArr[i + 1], tempArr[i]];
                        sorted = false;
                        setCount(prev => prev + 1);
                        
                        // Update the stats object directly
                        if (isSecondAlgo) {
                            setStats(prevStats => ({
                                ...prevStats,
                                secondAlgo: {
                                    ...prevStats.secondAlgo,
                                    swaps: prevStats.secondAlgo.swaps + 1
                                }
                            }));
                        } else {
                            setStats(prevStats => ({
                                ...prevStats,
                                firstAlgo: {
                                    ...prevStats.firstAlgo,
                                    swaps: prevStats.firstAlgo.swaps + 1
                                }
                            }));
                        }
                    }
                }
                n--;
            }
            
            // Clear indicators after sorting
            setCurrentIdx(null);
            setNextIdx(null);
            
            return tempArr;
        })();
    }

  return (
   <>
            <div className='flex flex-col gap-8 py-6'>
                {/* Title Section */}
                <div className='text-center mb-2'>
                    <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-3'>Algorithm Visualizer</h1>
                    <p className='text-gray-400 max-w-2xl mx-auto'>Watch sorting algorithms in action and understand how they work</p>
                </div>

                {/* Control Panel */}
                <div className='w-[95%] max-w-[1440px] mx-auto'>
                    <div className={`bg-gradient-to-r from-zinc-900 to-zinc-800 rounded-lg p-4 shadow-lg mb-6 border border-zinc-700`}>
                        <div className='flex flex-wrap gap-4 justify-between items-center'>
                            {/* Array Configuration */}
                            <div className='flex-1 min-w-[280px]'>
                                <h3 className='text-gray-200 font-semibold mb-2 flex items-center gap-2'>
                                    <FaRandom className="text-blue-400" /> Array Configuration
                                </h3>
                                <div className='flex flex-wrap gap-3'>
                                    <button 
                                        onClick={() => generateArray("random")}
                                        className={`px-3 py-1.5 rounded text-sm flex items-center gap-1 transition-colors ${
                                            arrayType === "random" 
                                                ? "bg-blue-600 text-white" 
                                                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                                        }`}
                                    >
                                        <FaShuffleIcon /> Random
                                    </button>
                                    <button 
                                        onClick={() => generateArray("nearly-sorted")}
                                        className={`px-3 py-1.5 rounded text-sm flex items-center gap-1 transition-colors ${
                                            arrayType === "nearly-sorted" 
                                                ? "bg-blue-600 text-white" 
                                                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                                        }`}
                                    >
                                        <FaSortAmountUp /> Nearly Sorted
                                    </button>
                                    <button 
                                        onClick={() => generateArray("reversed")}
                                        className={`px-3 py-1.5 rounded text-sm flex items-center gap-1 transition-colors ${
                                            arrayType === "reversed" 
                                                ? "bg-blue-600 text-white" 
                                                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                                        }`}
                                    >
                                        <FaSortAmountDown /> Reversed
                                    </button>
                                    <button 
                                        onClick={() => generateArray("few-unique")}
                                        className={`px-3 py-1.5 rounded text-sm flex items-center gap-1 transition-colors ${
                                            arrayType === "few-unique" 
                                                ? "bg-blue-600 text-white" 
                                                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                                        }`}
                                    >
                                        <FaRulerVertical /> Few Unique
                                    </button>
                                    <button 
                                        onClick={() => setShowCustomArrayInput(true)}
                                        className={`px-3 py-1.5 rounded text-sm flex items-center gap-1 transition-colors ${
                                            arrayType === "custom" 
                                                ? "bg-blue-600 text-white" 
                                                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                                        }`}
                                    >
                                        <FaCode /> Custom
                                    </button>
                                </div>
                                {showCustomArrayInput && (
                                    <div className='flex flex-col gap-2 mt-4'>
                                        <input 
                                            type="text" 
                                            value={customArrayInput} 
                                            onChange={handleCustomArrayInput} 
                                            className='bg-zinc-800 text-gray-300 rounded-md border border-zinc-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                                        />
                                        <button 
                                            onClick={applyCustomArray} 
                                            className='bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2 transition-colors duration-300 text-white'
                                        >
                                            Apply Custom Array
                                        </button>
                                    </div>
                                )}
                            </div>
                            
                            {/* Visualization Mode */}
                            <div className='flex-1 min-w-[280px]'>
                                <h3 className='text-gray-200 font-semibold mb-2 flex items-center gap-2'>
                                    <FaCompressArrowsAlt className="text-blue-400" /> Visualization Mode
                                </h3>
                                <div className='flex flex-wrap items-center gap-3'>
                                    <button 
                                        onClick={toggleComparisonMode}
                                        className={`px-4 py-2 rounded text-sm flex items-center gap-2 transition-colors ${
                                            comparisonMode 
                                                ? "bg-indigo-600 text-white" 
                                                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                                        }`}
                                    >
                                        <FaCompressArrowsAlt /> 
                                        {comparisonMode ? "Comparison Mode" : "Single Algorithm"}
                                    </button>
                                    
                                    <button 
                                        onClick={() => setIsStepMode(!isStepMode)}
                                        className={`px-4 py-2 rounded text-sm flex items-center gap-2 transition-colors ${
                                            isStepMode 
                                                ? "bg-green-600 text-white" 
                                                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
                                        }`}
                                    >
                                        <FaStepForward /> 
                                        {isStepMode ? "Step Mode" : "Continuous"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className='flex flex-col w-[95%] max-w-[1440px] justify-center items-center mx-auto'>
                    <div className='flex flex-col lg:flex-row w-full gap-6'>
                        {/* First Algorithm Visualizer */}
                        <div className={`lg:w-1/2 w-full rounded-lg overflow-hidden flex flex-col gap-1 shadow-lg ${isDarkMode ? 'shadow-blue-900/20' : 'shadow-blue-300/40'}`}>
                            <div className={`w-full ${isDarkMode ? 'bg-gradient-to-r from-zinc-800 to-zinc-900 border-zinc-700' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'} p-4 flex flex-col lg:flex-row justify-between gap-4 lg:items-center border-b`}>
                                <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} w-full md:w-1/2`}>
                                    <h1 className='font-bold flex items-center gap-2'><FaChartBar className="text-blue-400" /> Array Length</h1>
                                    <div className='flex gap-4 w-full justify-between items-center mt-2'>
                                        <input 
                                            className='w-[80%] accent-blue-500 cursor-pointer' 
                                            type="range" 
                                            max={maxArraySize} 
                                            min={3} 
                                            onChange={getArrRange}
                                            value={arrRange}
                                        />
                                        <div className={`border ${isDarkMode ? 'border-zinc-600 bg-zinc-800 text-blue-400' : 'border-blue-300 bg-white text-blue-600'} p-1 px-3 rounded-md font-medium`}>{arrRange}</div>
                                    </div>
                                </div>
                                <div className='flex lg:justify-center justify-start items-center text-center'>
                                    <button 
                                        className={`${isDarkMode ? 'text-gray-300 bg-blue-600 hover:bg-blue-700' : 'text-white bg-blue-500 hover:bg-blue-600'} flex justify-center items-center text-center gap-2 transition-colors duration-300 rounded-md px-5 py-2 w-full`} 
                                        onClick={regenArrRange}
                                    >
                                        <FaRandom /> Regenerate
                                    </button>
                                </div>
                            </div>

                            <div className={`w-full h-80 ${isDarkMode ? 'bg-gradient-to-b from-zinc-900 to-black' : 'bg-gradient-to-b from-gray-50 to-white'} overflow-x-auto flex flex-col justify-end p-4 relative`}>
                                <div className={`absolute top-3 left-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Unsorted Array</div>
                                <div className='flex gap-1 h-[90%] justify-center'>
                                    {randomArr.map((item, i) => (
                                        <div className='text-yellow-300 h-full flex items-end flex-grow' key={i}>
                                            <Bar barHeight={item} barWidth={barWidth} /> 
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={`w-full ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'} p-3 flex gap-2 items-center overflow-x-auto`}>
                                <h1 className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-bold whitespace-nowrap`}>Array:</h1>
                                <div className={`${isDarkMode ? 'text-amber-400' : 'text-amber-600'} flex flex-wrap font-mono`}>[ {randomArr.join(', ')} ]</div>
                            </div>
                        </div>

                        {/* Second Algorithm Visualizer (conditionally rendered) */}
                        {comparisonMode ? (
                            <div className={`lg:w-1/2 w-full rounded-lg overflow-hidden flex flex-col gap-1 shadow-lg ${isDarkMode ? 'shadow-indigo-900/20' : 'shadow-indigo-300/40'}`}>
                                <div className={`w-full ${isDarkMode ? 'bg-gradient-to-r from-zinc-800 to-zinc-900 border-zinc-700' : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'} p-4 flex flex-col lg:flex-row justify-between gap-4 lg:items-center border-b`}>
                                    <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} w-full md:w-1/2`}>
                                        <h1 className='font-bold flex items-center gap-2'><FaInfoCircle className="text-indigo-400" /> Sorting Speed</h1>
                                        <div className='flex gap-4 w-full justify-between items-center mt-2'>
                                            <input 
                                                className='w-[70%] accent-indigo-500 cursor-pointer' 
                                                type="range" 
                                                defaultValue={0} 
                                                max={3} 
                                                min={0} 
                                                step={0.25} 
                                                onChange={delayTimeVal}
                                            />
                                            <div className={`border ${isDarkMode ? 'border-zinc-600 bg-zinc-800 text-indigo-400' : 'border-indigo-300 bg-white text-indigo-600'} p-1 px-3 rounded-md font-medium`}>{delayTime ? delayTime / 1000 : 0} sec</div>
                                        </div>
                                    </div>
                                    <div className="control-buttons">
                                        <select 
                                            name="sortinAlgo" 
                                            id="sortinAlgo" 
                                            onChange={handleSortChange} 
                                            defaultValue="" 
                                            className={`${isDarkMode ? 'bg-zinc-800 text-gray-300 border-zinc-600' : 'bg-white text-gray-700 border-gray-300'} rounded-md border px-4 py-2 flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        >
                                            <option value="" disabled>Sorting Algorithm</option>
                                            <option value="bubbleSort">Bubble Sort</option>
                                            <option value="selectionSort">Selection Sort</option>
                                            <option value="insertionSort">Insertion Sort</option>
                                            <option value="mergeSort">Merge Sort</option>
                                            <option value="quickSort">Quick Sort</option>
                                        </select>
                                        <select 
                                            name="secondSortinAlgo" 
                                            id="secondSortinAlgo" 
                                            onChange={handleSecondSortChange} 
                                            defaultValue="" 
                                            className={`${isDarkMode ? 'bg-zinc-800 text-gray-300 border-zinc-600' : 'bg-white text-gray-700 border-gray-300'} rounded-md border px-4 py-2 flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                        >
                                            <option value="" disabled>Second Algorithm</option>
                                            <option value="bubbleSort">Bubble Sort</option>
                                            <option value="selectionSort">Selection Sort</option>
                                            <option value="insertionSort">Insertion Sort</option>
                                            <option value="mergeSort">Merge Sort</option>
                                            <option value="quickSort">Quick Sort</option>
                                        </select>
                                        <button 
                                            onClick={handleSortButtonClick} 
                                            className={`text-white justify-center items-center text-center gap-2 rounded-md px-4 py-2 transition-all duration-300 ${isSorting ? 'hidden' : 'flex bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'}`} 
                                            disabled={isSorting}
                                        >
                                            <FaPlay /> Start Sorting
                                        </button>
                                        <button 
                                            className={`text-white bg-red-600 hover:bg-red-700 rounded-md px-4 py-2 transition-colors duration-300 ${isSorting ? 'flex items-center gap-2' : 'hidden'}`} 
                                            disabled={!isSorting} 
                                            onClick={resetSorting}
                                        >
                                            <ImCross /> Stop
                                        </button>
                                        {isStepMode && (
                                            <button 
                                                onClick={executeStep} 
                                                className={`text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2 transition-colors duration-300 ${isSorting ? 'flex items-center gap-2' : 'hidden'}`} 
                                                disabled={!isSorting} 
                                            >
                                                <FaStepForward /> Next Step
                                            </button>
                                        )}
                                        <button 
                                            onClick={exportData} 
                                            className={`text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2 transition-colors duration-300 ${isSorting ? 'hidden' : 'flex items-center gap-2'}`} 
                                            disabled={isSorting}
                                        >
                                            <FaDownload /> Export Data
                                        </button>
                                    </div>
                                </div>

                                <div className={`w-full h-80 ${isDarkMode ? 'bg-gradient-to-b from-zinc-900 to-black' : 'bg-gradient-to-b from-indigo-50 to-white'} overflow-x-auto p-4 relative`}>
                                    <div className={`absolute top-3 right-3 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-600'} font-mono text-sm`}>
                                        Swaps: <span className="font-bold">{secondSwapCount}</span>
                                    </div>
                                    <div className={`absolute top-3 left-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Visualization</div>
                                    <div className='flex gap-1 h-[90%] justify-center'>
                                        {secondSortArr.map((item, i) => (
                                            <div className={`h-full flex items-end flex-grow`} key={i}>
                                                <Bar 
                                                    barWidth={barWidth} 
                                                    barHeight={item} 
                                                    backgroundColor={
                                                        i === secondCurrentIndex 
                                                            ? 'linear-gradient(180deg, #60a5fa 0%, #2563eb 100%)' 
                                                            : i === secondNextIndex 
                                                                ? 'linear-gradient(180deg, #f97316 0%, #c2410c 100%)' 
                                                                : null
                                                    } 
                                                    transition={`height 0.3s ease`}
                                                    isActive={i === secondCurrentIndex}
                                                    isComparing={i === secondNextIndex}
                                                    isSecondAlgo={true}
                                                    value={item}
                                                    index={i}
                                                /> 
                                            </div>
                                        ))}
                                    </div> 
                                </div>
                                <div className={`w-full ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'} p-3 flex gap-2 items-center overflow-x-auto`}>
                                    <h1 className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-bold whitespace-nowrap`}>Result:</h1>
                                    <div className={`${isDarkMode ? 'text-green-400' : 'text-green-600'} flex flex-wrap font-mono`}>[ {secondSortArr.join(', ')} ]</div>
                                </div>
                            </div>
                        ) : (
                            <div className={`lg:w-1/2 w-full rounded-lg overflow-hidden flex flex-col gap-1 shadow-lg ${isDarkMode ? 'shadow-blue-900/20' : 'shadow-blue-300/40'}`}>
                                <div className={`w-full ${isDarkMode ? 'bg-gradient-to-r from-zinc-800 to-zinc-900 border-zinc-700' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'} p-4 flex flex-col lg:flex-row justify-between gap-4 lg:items-center border-b`}>
                                    <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} w-full md:w-1/2`}>
                                        <h1 className='font-bold flex items-center gap-2'><FaInfoCircle className="text-blue-400" /> Sorting Speed</h1>
                                        <div className='flex gap-4 w-full justify-between items-center mt-2'>
                                            <input 
                                                className='w-[70%] accent-blue-500 cursor-pointer' 
                                                type="range" 
                                                defaultValue={0} 
                                                max={3} 
                                                min={0} 
                                                step={0.25} 
                                                onChange={delayTimeVal}
                                            />
                                            <div className={`border ${isDarkMode ? 'border-zinc-600 bg-zinc-800 text-blue-400' : 'border-blue-300 bg-white text-blue-600'} p-1 px-3 rounded-md font-medium`}>{delayTime ? delayTime / 1000 : 0} sec</div>
                                        </div>
                                    </div>
                                    <div className="control-buttons">
                                        <select 
                                            name="sortinAlgo" 
                                            id="sortinAlgo" 
                                            onChange={handleSortChange} 
                                            defaultValue="" 
                                            className={`${isDarkMode ? 'bg-zinc-800 text-gray-300 border-zinc-600' : 'bg-white text-gray-700 border-gray-300'} rounded-md border px-4 py-2 flex justify-center items-center focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        >
                                            <option value="" disabled>Sorting Algorithm</option>
                                            <option value="bubbleSort">Bubble Sort</option>
                                            <option value="selectionSort">Selection Sort</option>
                                            <option value="insertionSort">Insertion Sort</option>
                                            <option value="mergeSort">Merge Sort</option>
                                            <option value="quickSort">Quick Sort</option>
                                        </select>
                                        <button 
                                            onClick={handleSortButtonClick} 
                                            className={`text-white justify-center items-center text-center gap-2 rounded-md px-4 py-2 transition-all duration-300 ${isSorting ? 'hidden' : 'flex bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'}`} 
                                            disabled={isSorting}
                                        >
                                            <FaPlay /> Start Sorting
                                        </button>
                                        <button 
                                            className={`text-white bg-red-600 hover:bg-red-700 rounded-md px-4 py-2 transition-colors duration-300 ${isSorting ? 'flex items-center gap-2' : 'hidden'}`} 
                                            disabled={!isSorting} 
                                            onClick={resetSorting}
                                        >
                                            <ImCross /> Stop
                                        </button>
                                        {isStepMode && (
                                            <button 
                                                onClick={executeStep} 
                                                className={`text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2 transition-colors duration-300 ${isSorting ? 'flex items-center gap-2' : 'hidden'}`} 
                                                disabled={!isSorting} 
                                            >
                                                <FaStepForward /> Next Step
                                            </button>
                                        )}
                                        <button 
                                            onClick={exportData} 
                                            className={`text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2 transition-colors duration-300 ${isSorting ? 'hidden' : 'flex items-center gap-2'}`} 
                                            disabled={isSorting}
                                        >
                                            <FaDownload /> Export Data
                                        </button>
                                    </div>
                                </div>

                                <div className={`w-full h-80 ${isDarkMode ? 'bg-gradient-to-b from-zinc-900 to-black' : 'bg-gradient-to-b from-gray-50 to-white'} overflow-x-auto p-4 relative`}>
                                    <div className={`absolute top-3 right-3 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-600'} font-mono text-sm`}>
                                        Swaps: <span className="font-bold">{swapCount}</span>
                                    </div>
                                    <div className={`absolute top-3 left-3 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Visualization</div>
                                    <div className='flex gap-1 h-[90%] justify-center'>
                                        {SortArr.map((item, i) => (
                                            <div className={`h-full flex items-end flex-grow`} key={i}>
                                                <Bar 
                                                    barWidth={barWidth} 
                                                    barHeight={item} 
                                                    backgroundColor={
                                                        i === currentIndex 
                                                            ? 'linear-gradient(180deg, #60a5fa 0%, #2563eb 100%)' 
                                                            : i === nextIndex 
                                                                ? 'linear-gradient(180deg, #f97316 0%, #c2410c 100%)' 
                                                                : null
                                                    } 
                                                    transition={`height 0.3s ease`}
                                                    isActive={i === currentIndex}
                                                    isComparing={i === nextIndex}
                                                    isSecondAlgo={false}
                                                    value={item}
                                                    index={i}
                                                /> 
                                            </div>
                                        ))}
                                    </div> 
                                </div>
                                <div className={`w-full ${isDarkMode ? 'bg-zinc-800' : 'bg-gray-100'} p-3 flex gap-2 items-center overflow-x-auto`}>
                                    <h1 className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} font-bold whitespace-nowrap`}>Result:</h1>
                                    <div className={`${isDarkMode ? 'text-green-400' : 'text-green-600'} flex flex-wrap font-mono`}>[ {SortArr.join(', ')} ]</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Stats Display (conditionally rendered) */}
                {showStats && (
                    <div className='w-[95%] max-w-[1440px] mx-auto'>
                        <div className={`rounded-lg p-6 shadow-lg mb-8 border ${isDarkMode ? 'bg-gradient-to-r from-zinc-900 to-zinc-950 border-zinc-700' : 'bg-white border-blue-200'}`}>
                            <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                <FaInfoCircle className="text-yellow-400" /> Performance Results
                            </h3>
                            <div className='flex flex-col md:flex-row gap-6'>
                                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'} md:flex-1`}>
                                    <h4 className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} font-semibold mb-2`}>
                                        {selectedAlgo.charAt(0).toUpperCase() + selectedAlgo.slice(1)}
                                    </h4>
                                    <div className='grid grid-cols-2 gap-4'>
                                        <div>
                                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Time Elapsed</p>
                                            <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{stats.firstAlgo.time.toFixed(3)}s</p>
                                        </div>
                                        <div>
                                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Swaps</p>
                                            <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{swapCount}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {comparisonMode && (
                                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-zinc-800/50' : 'bg-gray-100'} md:flex-1`}>
                                        <h4 className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} font-semibold mb-2`}>
                                            {secondAlgo.charAt(0).toUpperCase() + secondAlgo.slice(1)}
                                        </h4>
                                        <div className='grid grid-cols-2 gap-4'>
                                            <div>
                                                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Time Elapsed</p>
                                                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{stats.secondAlgo.time.toFixed(3)}s</p>
                                            </div>
                                            <div>
                                                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Swaps</p>
                                                <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{secondSwapCount}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Comparison Winner (if in comparison mode) */}
                                {comparisonMode && (
                                    <div className="mt-8 pt-8 border-t border-zinc-700">
                                        <div className='flex items-center gap-3 mb-4'>
                                            <FaCode className="text-green-400 text-2xl" />
                                            <h2 className='text-xl font-bold text-white'>Winner</h2>
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className={`p-3 rounded ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
                                                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>By Time</p>
                                                <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                    {stats.firstAlgo.time === stats.secondAlgo.time 
                                                        ? "Tie" 
                                                        : stats.firstAlgo.time < stats.secondAlgo.time 
                                                            ? selectedAlgo.charAt(0).toUpperCase() + selectedAlgo.slice(1)
                                                            : secondAlgo.charAt(0).toUpperCase() + secondAlgo.slice(1)}
                                                </p>
                                            </div>
                                            <div className={`p-3 rounded ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
                                                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>By Swaps</p>
                                                <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                                    {swapCount === secondSwapCount
                                                        ? "Tie" 
                                                        : swapCount < secondSwapCount
                                                            ? selectedAlgo.charAt(0).toUpperCase() + selectedAlgo.slice(1)
                                                            : secondAlgo.charAt(0).toUpperCase() + secondAlgo.slice(1)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Comparison visualization summary - add after stats display */}
                {comparisonMode && showStats && (
                    <div className="w-[95%] max-w-[1440px] mx-auto mt-4 mb-8">
                        <div className={`${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-white border-blue-200'} rounded-lg shadow-lg p-4 border`}>
                            <h2 className={`text-lg font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Performance Visualization</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Time Comparison */}
                                <div className={`${isDarkMode ? 'bg-zinc-900' : 'bg-gray-50'} p-3 rounded-lg`}>
                                    <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Time Comparison</h3>
                                    <div className="flex gap-2 overflow-hidden rounded-lg">
                                        <div 
                                            className="h-8 bg-blue-500 flex items-center justify-end px-2 text-white text-sm font-medium"
                                            style={{ 
                                                width: `${(stats.firstAlgo.time / (stats.firstAlgo.time + stats.secondAlgo.time)) * 100}%`,
                                                minWidth: '40px'
                                            }}
                                        >
                                            {stats.firstAlgo.time.toFixed(3)}s
                                        </div>
                                        <div 
                                            className="h-8 bg-indigo-500 flex items-center px-2 text-white text-sm font-medium"
                                            style={{ 
                                                width: `${(stats.secondAlgo.time / (stats.firstAlgo.time + stats.secondAlgo.time)) * 100}%`,
                                                minWidth: '40px'
                                            }}
                                        >
                                            {stats.secondAlgo.time.toFixed(3)}s
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-1 text-xs">
                                        <div className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{selectedAlgo}</div>
                                        <div className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{secondAlgo}</div>
                                    </div>
                                </div>
                                
                                {/* Swap Comparison */}
                                <div className={`${isDarkMode ? 'bg-zinc-900' : 'bg-gray-50'} p-3 rounded-lg`}>
                                    <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>Swap Comparison</h3>
                                    <div className="flex gap-2 overflow-hidden rounded-lg">
                                        <div 
                                            className="h-8 bg-blue-500 flex items-center justify-end px-2 text-white text-sm font-medium"
                                            style={{ 
                                                width: `${(swapCount / (swapCount + secondSwapCount || 1)) * 100}%`,
                                                minWidth: '40px'
                                            }}
                                        >
                                            {swapCount}
                                        </div>
                                        <div 
                                            className="h-8 bg-indigo-500 flex items-center px-2 text-white text-sm font-medium"
                                            style={{ 
                                                width: `${(secondSwapCount / (swapCount + secondSwapCount || 1)) * 100}%`,
                                                minWidth: '40px'
                                            }}
                                        >
                                            {secondSwapCount}
                                        </div>
                                    </div>
                                    <div className="flex justify-between mt-1 text-xs">
                                        <div className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>{selectedAlgo}</div>
                                        <div className={`${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{secondAlgo}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Algorithm Description Section */}
                <div className='w-[95%] max-w-[1440px] mx-auto mt-8 mb-12'>
                    <div className={`${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-blue-200'} rounded-lg shadow-lg p-6 border`}>
                        <div className='flex items-center gap-3 mb-6'>
                            <FaCode className={`${isDarkMode ? 'text-blue-400' : 'text-blue-600'} text-2xl`} />
                            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Algorithm Details</h2>
                        </div>

                        {/* Display algorithms side by side in comparison mode */}
                        {comparisonMode ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* First Algorithm */}
                                <div className={`${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-200'} p-4 rounded-lg border`}>
                                    <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                        {selectedAlgo.charAt(0).toUpperCase() + selectedAlgo.slice(1)}
                                    </h3>
                                    {selectedAlgo === "bubbleSort" && <BubbleSort />}
                                    {selectedAlgo === "selectionSort" && <SelectionSort />}
                                    {selectedAlgo === "insertionSort" && <InsertionSort />}
                                    {selectedAlgo === "mergeSort" && <MergeSort />}
                                    {selectedAlgo === "quickSort" && <QuickSort />}
                                </div>

                                {/* Second Algorithm */}
                                <div className={`${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-200'} p-4 rounded-lg border`}>
                                    <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                                        {secondAlgo.charAt(0).toUpperCase() + secondAlgo.slice(1)}
                                    </h3>
                                    {secondAlgo === "bubbleSort" && <BubbleSort />}
                                    {secondAlgo === "selectionSort" && <SelectionSort />}
                                    {secondAlgo === "insertionSort" && <InsertionSort />}
                                    {secondAlgo === "mergeSort" && <MergeSort />}
                                    {secondAlgo === "quickSort" && <QuickSort />}
                                </div>
                            </div>
                        ) : (
                            /* Single algorithm display */
                            <div>
                                {selectedAlgo === "bubbleSort" && <BubbleSort />}
                                {selectedAlgo === "selectionSort" && <SelectionSort />}
                                {selectedAlgo === "insertionSort" && <InsertionSort />}
                                {selectedAlgo === "mergeSort" && <MergeSort />}
                                {selectedAlgo === "quickSort" && <QuickSort />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
    </>
  )
}

export default Hero