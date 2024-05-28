import { useEffect, useState } from 'react'
import { words } from '../data/db'
import { shuffleArray } from '../utilities/shuffleArray'

const FourthMethod = () => {
  const [pairs, setPairs] = useState({leftValue: '', rightValue: ''})
  const [leftClick, setLeftClick] = useState(null)
  const [rightClick, setRightClick] = useState(null)
  const [events, setEvents] = useState({e1: '', e2: ''})
  const [foundedWords, setFoundedWords] = useState([])
  const [leftSideWords, setLeftSideWords] = useState(shuffleArray(Object.keys(words)))
  const [rightSideWords, setRightSideWords] = useState(shuffleArray(Object.values(words)))


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
      if (words[pairs.leftValue] === pairs.rightValue) {
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
          setLeftClick(null)
          setRightClick(null)
          events.e1.target.classList.remove('bg-red-500')
          events.e2.target.classList.remove('bg-red-500')
        }, 500);
      }
    }
  }, [pairs])


  useEffect(() => {
    if (foundedWords.length === Object.keys(words).length + Object.values(words).length) {
      alert('Done')
      location.reload()
    }
  }, [foundedWords])

  
  return (
    <>
        <div className='grid gap-2'>
          {
            leftSideWords.map((item, index) => (
              <button key={item} onClick={(e) => handleClick('left', e, index)} className={`py-2 px-4 border rounded-md disabled:opacity-50 disabled:bg-stone-500 ${leftClick === index && 'border-green-300'} disabled:border-transparent`}>{item}</button>
            ))
          }
        </div>
        <div className='grid gap-2'>
          {
            rightSideWords.map((item, index) => (
              <button key={item} onClick={(e) => handleClick('right', e, index)} className={`py-2 px-4 border rounded-md disabled:opacity-50 disabled:bg-stone-500 ${rightClick === index && 'border-green-300'} disabled:border-transparent`}>{item}</button>
            ))
          }
        </div>
    </>
  )
}

export default FourthMethod