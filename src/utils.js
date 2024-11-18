export const RandomNumGen = (arrRange)=>{
    const randomArray = [];
    for (let i=0 ; i<arrRange ; i++){
        const randomNum = (Math.floor(Math.random()*100));

        randomArray.push(randomNum);
    }

    return randomArray;
}

export function delay (ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

// const arr = [5, 2, 8, 1, 9];

// const n = arr.length;

// for (let i=0 ; i<n ; i++){
//     let min_indx = i ;

//     for (let j= i+1 ; j<n ; j++){
//         if (arr[j] < arr[min_indx]){
//             min_indx = j;
//         }

//     }

//     let temp = arr[i];
//         arr[i] = arr[min_indx];
//         arr[min_indx] = temp;

       
// }
// console.log(arr)
