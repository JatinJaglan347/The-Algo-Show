import React ,{useState , useEffect , useRef} from 'react'
import Bar from '../bar/bar';
import { RandomNumGen  , delay } from '../../utils';
import { TfiReload } from "react-icons/tfi";

import { ImCross } from "react-icons/im";
import BubbleSort from '../AboutSorting/BubbleSort';
import SelectionSort from '../AboutSorting/SelectionSort';
import InsertionSort from '../AboutSorting/InsertionSort';
import MergeSort from '../AboutSorting/MergeSort';
import QuickSort from '../AboutSorting/QuickSort';
import NavBar from '../NavBar/NavBar';
import Contact from '../Contact/Contact';
import Review from '../Reviews/Reviews';
import Footer from '../Footer/Footer';


function Hero() {
    const [arrRange , setArrRange] = useState(20);
    const [randomArr , setRandomArr] = useState([]);
    const [SortArr , setSortArr] = useState([]);
    const [delayTime , setDelayTime]= useState(0);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [nextIndex, setNextIndex] = useState(null);
    const [swapCount , setSwapCount] = useState(0);
    const [selectedAlgo, setSelectedAlgo] = useState("");
    const [isSorting, setIsSorting] = useState(false);
    // const [stop , setStop]= useState(false);
    const barWidth = 100;
    const stopSortingRef = useRef(false);

   

   const getArrRange = (event)=>{
        setArrRange(Number(event.target.value));
       const result= RandomNumGen(event.target.value);
       setRandomArr(result);
   }
   const regenArrRange = ()=>{
        setRandomArr(RandomNumGen(arrRange))
   } 
   console.log(randomArr);


   const delayTimeVal = (event) =>{ 
    setDelayTime((event.target.value)*1000);
   }

   function handleSortChange(event) {
    setSelectedAlgo(event.target.value);

}

function handleSortButtonClick() {
    if (isSorting) return; 
    stopSortingRef.current = false;
    

    switch (selectedAlgo) {
        case "bubbleSort":
            callBubbleSort();
            break;
        case "selectionSort":
            callSelectionSort();
            break;
        case "insertionSort":
            callInsertionSort();
            break;
        case "mergeSort":
            callMergeSort();
            break;
        case "quickSort":
            callQuickSort();
            break;
        default:
            alert("Please select a sorting algorithm");
            break;
    }
}


const resetSorting = () => {
    stopSortingRef.current = true;
    setSortArr([]); // Clear the sorted array
    setSwapCount(0); // Reset the swap count
    setCurrentIndex(null); // Clear current index highlight
    setNextIndex(null); // Clear next index highlight
    setIsSorting(false); // Reset sorting state

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







   useEffect(()=>{
   },[SortArr])




    
  return (
   <>
    <div className=' flex flex-col bg-black gap-5 '>
        <div className=' flex flex-col w-[90%] max-w-[1440px] justify-center items-center m-auto'>
            <div className=' flex flex-col lg:flex-row w-full gap-6 lg:p-4'>
                <div className='lg:w-1/2  w-full rounded-lg overflow-hidden flex flex-col gap-1'>

                    <div className='w-full min-h-20 bg-zinc-800 p-1 flex flex-col lg:flex-row justify-between px-2 lg:items-center'>
                        <div className=' text-gray-300 w-full md:w-1/2 '>
                            <h1 className=' font-bold'>Array Length :</h1>
                            <div className=' flex  gap-5 w-full justify-between'>
                                <input className=' w-[80%]'  type="range" max={20} min={3}  onChange={getArrRange}/>
                                <div className=' border p-1 px-2 rounded-md'>{arrRange}</div>
                            </div>
                        </div>
                        <div className=' flex flex-col lg:flex-row lg:justify-center justify-start items-start lg:items-center text-center'>
                            <button className=' text-gray-300 flex justify-start lg:justify-center items-center text-center gap-2 border rounded-md px-5 py-2' onClick={regenArrRange}>Regenerate <TfiReload /></button>
                        </div>
                    </div>

                    <div className='w-full h-80 bg-zinc-900 overflow-x-auto flex flex-col justify-end'>
                        <div className='flex gap-1 h-[90%] '>
                            {randomArr.map((item, i) => (
                                <div className=' text-yellow-300 h-full flex items-end flex-grow' key={i}>
                                    <Bar   barHeight= {item}/> 
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className=' w-full min-h-10 bg-zinc-800 p-1 px-2 flex gap-2'>
                        <h1 className=' text-gray-300 font-bold'>UnSorted: </h1><div className='text-red-400 flex flex-wrap font-bold '>[ {randomArr.join(', ')} ]</div>
                    </div>
                </div>
                <div className='lg:w-1/2 w-full rounded-lg overflow-hidden flex flex-col gap-1'>


                    <div className='w-full min-h-20 bg-zinc-800 p-1 flex flex-col lg:flex-row justify-between px-2 lg:items-center'>
                        <div className=' text-gray-300 w-full md:w-1/2 '>
                            <h1 className=' font-bold'>Sorting Speed :</h1>
                            <div className=' flex  gap-5 w-full justify-between'>
                                <input className=' w-[70%]' type="range" defaultValue={0} max={3} min={0} step={0.25}  onChange={delayTimeVal}/>
                                <div className=' border p-1 px-2 rounded-md flex'>{delayTime ? delayTime / 1000 : 0} sec</div>
                            </div>
                        </div>
                        <div className='flex flex-row lg:justify-center justify-start items-start lg:items-center text-center gap-3'>
                            <select name="sortinAlgo" id="sortinAlgo" onChange={handleSortChange} defaultValue="" className=' bg-transparent text-gray-300 rounded-md border px-5 py-2 flex justify-center items-center'>
                            <option  value="" disabled>Sorting Algo</option>
                                <option style={{ color: "black" }} value="bubbleSort">Bubble Sort</option>
                                <option style={{ color: "black" }} value="selectionSort">Selection Sort</option>
                                <option style={{ color: "black" }} value="insertionSort">Insertion Sort</option>
                                <option style={{ color: "black" }} value="mergeSort">Merge Sort</option>
                                <option style={{ color: "black" }} value="quickSort">Quick Sort</option>
                            </select>
                            <button onClick={handleSortButtonClick}  className={`  text-gray-300 justify-center items-center text-center gap-2 border rounded-md px-3 md:px-5 py-2 ${isSorting ?  'hidden' : 'flex'}`} disabled={isSorting}>Sort Array</button> 
                            <button className={` text-red-600 text-xl ${isSorting ?  'flex' : 'hidden'}`} disabled={!isSorting}  onClick={resetSorting} ><ImCross/></button>
                        </div>


                    </div>
                    <div className=' w-full h-80 bg-zinc-900 overflow-x-auto '>
                    <div className=' w-full flex justify-end text-yellow-300'> Total swaps: {swapCount}</div> 
                        <div className='flex gap-1 h-[90%]'>
                            {SortArr.map((item, i) => (
                                <div className={`text-yellow-300  h-full flex items-end flex-grow`} key={i}>
                                    <Bar barWidth={barWidth} barHeight={item} backgroundColor={i === currentIndex || i === nextIndex ? '#1884B5' : '#A36A6A'} transition={`all ${delayTime / 1000}s ease`}/> 
                                </div>
                            ))}
                        </div> 
                    </div>
                    <div className=' w-full min-h-10 bg-zinc-800 p-1 px-2 flex gap-2'>
                        <h1 className=' text-gray-300 font-bold'>Sorted: </h1><div className='text-green-400 flex flex-wrap font-bold '>[ {SortArr.join(', ')} ]</div>
                    </div>
                </div>
                
                
            </div>
           
        </div>
        <div className={`w-auto box-border flex justify-center items-center ${selectedAlgo === "bubbleSort" ? 'flex' : 'hidden'}`}><BubbleSort /></div>
        <div className={`w-auto box-border flex justify-center items-center ${selectedAlgo === "selectionSort" ? 'flex' : 'hidden'}`}><SelectionSort /></div>
        <div className={`w-auto box-border flex justify-center items-center ${selectedAlgo === "insertionSort" ? 'flex' : 'hidden'}`}><InsertionSort /></div>
        <div className={` w-auto box-border flex justify-center items-center ${selectedAlgo === "mergeSort" ? 'flex' : 'hidden'}`}><MergeSort /></div>
        <div className={`w-auto box-border flex justify-center items-center ${selectedAlgo === "quickSort" ? 'flex' : 'hidden'}`}><QuickSort /></div>

    </div>

    
   </>
  )
}

export default Hero