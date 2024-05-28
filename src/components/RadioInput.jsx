import React from 'react'
import { words_for_matching_pairs } from '../data/db'

const RadioInput = () => {
  return (
    <>
        <div className='grid gap-2'>
          {
            words_for_matching_pairs.left_side.map(item => (
                <label className='checked:text-green'>
                    {item}
                    <input type='radio' key={item} className={`py-2 px-4 border rounded-md checked:bg-green-300`} value={item} name='left' />
                </label>
            ))
          }
        </div>
        <div className='grid gap-2'>
          {
            words_for_matching_pairs.right_side.map(item => (
                <input type='radio' key={item} className={`py-2 px-4 border rounded-md`} value={item} name='right' />
            ))
          }
        </div>
    </>
  )
}

export default RadioInput