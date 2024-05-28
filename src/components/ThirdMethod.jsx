import React, { useEffect } from 'react'
import { words } from '../data/db'

const ThirdMethod = () => {
    useEffect(() => {
        for (let [key, value] in Object.entries(words)) {
            console.log(key, value);
        }
    }, [])
  return (
    // for (key in words) {

    // }
    <>
        {/* <div className='grid gap-2'>
          {
            words.left_side.map((item, index) => (
              <button key={item} onClick={(e) => handleClick('left', e, index)} className={`py-2 px-4 border rounded-md disabled:bg-gray-600 ${leftClick === index && 'bg-green-300'}`}>{item}</button>
            ))
          }
        </div>
        <div className='grid gap-2'>
          {
            words.right_side.map((item, index) => (
              <button key={item} onClick={(e) => handleClick('right', e, index)} className={`py-2 px-4 border rounded-md disabled:bg-gray-600 ${rightClick === index && 'bg-green-300'}`}>{item}</button>
            ))
          }
        </div> */}
    </>
  )
}

export default ThirdMethod