import React, { useEffect, useState } from 'react'
import { words, words_for_matching_pairs } from '../data/db'
import { shuffleArray } from '../utilities/shuffleArray'

const FirstMethod = () => {
  const [pairs, setPairs] = useState({leftValue: '', rightValue: ''})
  const [leftClick, setLeftClick] = useState(null)
  const [rightClick, setRightClick] = useState(null)
  const [events, setEvents] = useState({e1: '', e2: ''})
  const [foundedWords, setFoundedWords] = useState([])


  const handleClick = (side, e, index) => {
    if (side === 'left') {
      setEvents({...events, e1: e})
      setLeftClick(index)
      setPairs({...pairs, leftValue: e.target.innerText})
    } else {
      setEvents({...events, e2: e})
      setRightClick(index)
      setPairs({...pairs, rightValue: e.target.innerText})
      }
    }


  useEffect(() => {
    if (pairs.leftValue !== '' && pairs.rightValue !== '') {
      if (words_for_matching_pairs.left_side.indexOf(pairs.leftValue) === words_for_matching_pairs.right_side.indexOf(pairs.rightValue)) {
        setFoundedWords([...foundedWords, pairs.leftValue, pairs.rightValue])
        events.e1.target.disabled = true
        events.e2.target.disabled = true
        pairs.leftValue = ''
        pairs.rightValue = ''
      } else {
        pairs.leftValue = ''
        pairs.rightValue = ''
        events.e1.target.classList.add('bg-red-500')
        events.e2.target.classList.add('bg-red-500')
        setTimeout(() => {
          events.e1.target.classList.replace('bg-red-500', 'bg-white')
          events.e2.target.classList.replace('bg-red-500', 'bg-white')
        }, 500);
      }
    }
  }, [pairs])


  useEffect(() => {
    if (foundedWords.length === words_for_matching_pairs.left_side.length + words_for_matching_pairs.right_side.length) {
      alert('Done')
      location.reload()
    }
  }, [foundedWords])

  for (let key in words) {
    console.log(key, words[key]);
  }

  
  return (
    <>
        <div className='grid gap-2'>
          {
            words_for_matching_pairs.left_side.map((item, index) => (
              <button key={item} onClick={(e) => handleClick('left', e, index)} className={`py-2 px-4 border rounded-md disabled:opacity-50 disabled:bg-stone-500 ${leftClick === index && 'bg-green-300'}`}>{item}</button>
            ))
          }
        </div>
        <div className='grid gap-2'>
          {
            words_for_matching_pairs.right_side.map((item, index) => (
              <button key={item} onClick={(e) => handleClick('right', e, index)} className={`py-2 px-4 border rounded-md disabled:opacity-50 disabled:bg-stone-500 ${rightClick === index && 'bg-green-300'}`}>{item}</button>
            ))
          }
        </div>
    </>
  )
}

export default FirstMethod