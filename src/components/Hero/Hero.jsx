import React ,{useState , useEffect} from 'react'
import Bar from '../bar/bar';
import { RandomNumGen  , delay } from '../../utils';
import { TfiReload } from "react-icons/tfi";

function Hero() {
    const [arrRange , setArrRange] = useState(20);
    const [randomArr , setRandomArr] = useState([]);
    const [SortArr , setSortArr] = useState([]);
    const [delayTime , setDelayTime]= useState(3000);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [nextIndex, setNextIndex] = useState(null);
    const [swapCount , setSwapCount] = useState(0);
    const barWidth = 100;
    
   

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
    const selectedValue = event.target.value;

    if (selectedValue === "bubbleSort") {
        callBubbleSort();
    } else if (selectedValue === "selectionSort") {
        callSelectionSort();
    }else if (selectedValue === "insertionSort"){
        callInsertionSort();
    }
}


// BUBBLE SORT
    async function callBubbleSort() {
        const arrToSort = [...randomArr];
        let count =0;
        for (let i = 0; i < arrToSort.length; i++) {
            for (let j = 0; j < arrToSort.length - i - 1; j++) {
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
    }


// SELECTION SORT
async function callSelectionSort() {
    const arrToSort = [...randomArr];
    let count=0 ;
    for (let i=0 ; i<arrToSort.length; i++){
        let min_idx = i ;
        setCurrentIndex(i);
        for (let j=i+1; j<arrToSort.length ; j++){
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
}


// INSERTION SORT
async function callInsertionSort() {
    const arrToSort = [...randomArr];
    let count = 0;
    for (let i = 1; i < arrToSort.length; i++) {
        let key = arrToSort[i];
        let j = i - 1;
        setCurrentIndex(i);  
        setNextIndex(j);     
        while (j >= 0 && arrToSort[j] > key) {
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
}





   useEffect(()=>{
   },[SortArr])




    
  return (
   <>
    <div className=' bg-black'>
        <div className=' h-40'></div>

        <div className=' flex justify-center items-center '>
            <div className=' flex w-[90%] gap-6'>
                <div className='w-1/2 rounded-lg overflow-hidden flex flex-col gap-1'>

                    <div className='w-full h-20 bg-zinc-800 p-1 flex justify-between px-2 items-center'>
                        <div className=' text-gray-300 w-1/2'>
                            <h1 className=' font-bold'>Array Length :</h1>
                            <div className=' flex  gap-5 w-full justify-between'>
                                <input className=' w-[80%]'  type="range" max={20} min={3}  onChange={getArrRange}/>
                                <div className=' border p-1 px-2 rounded-md'>{arrRange}</div>
                            </div>
                        </div>
                        <div className='flex justify-center items-center text-center'>
                            <button className=' text-gray-300 flex justify-center items-center text-center gap-2 border rounded-md px-5 py-2' onClick={regenArrRange}>Regenerate <TfiReload /></button>
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
                <div className='w-1/2 rounded-lg overflow-hidden flex flex-col gap-1'>


                    <div className='w-full h-20 bg-zinc-800 p-1 flex justify-between px-2 items-center'>
                        <div className=' text-gray-300 w-1/2 '>
                            <h1 className=' font-bold'>Sorting Speed :</h1>
                            <div className=' flex  gap-5 w-full justify-between'>
                                <input className=' w-[70%]' type="range"  max={3} min={0} step={0.25}  onChange={delayTimeVal}/>
                                <div className=' border p-1 px-2 rounded-md flex'>{delayTime ? delayTime / 1000 : 0} sec</div>
                            </div>
                        </div>
                        <div className='flex justify-center items-center text-center'>
                            <button onClick={callSelectionSort} className='  text-gray-300 flex justify-center items-center text-center gap-2 border rounded-md px-5 py-2'>Bubble Sort</button> 
                            
                            <select name="sortinAlgo" id="sortinAlgo" onChange={handleSortChange} defaultValue="">
                            <option value="" disabled>
                                Choose Sorting Algorithm
                                </option>
                                <option value="bubbleSort">Bubble Sort</option>
                                <option value="selectionSort">Selection Sort</option>
                                <option value="insertionSort">Insertion Sort</option>
                            </select>
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
        
    </div>
   </>
  )
}

export default Hero