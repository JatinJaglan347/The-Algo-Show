import React from 'react'

function Bar({ barWidth, barHeight, backgroundColor, transition }) {
    console.log("barHegight" + barHeight)
    console.log("barWidth"+ barWidth)
    
  return (
    <>
          
                {/* <div className='  flex items-end ' style={{ width: `${barWidth}%` , height:`100%` }}> */}
                    <div className=' bg-slate-600 flex justify-center items-end rounded-t-md w-full' style={{ width: `${barWidth}%`, height:`${barHeight}%` ,background: `${backgroundColor} ` , transition}}>
                        <div className=' font-bold text-white'>
                            {barHeight}
                        </div>
                    </div>

      
    </>
  )
}

export default Bar