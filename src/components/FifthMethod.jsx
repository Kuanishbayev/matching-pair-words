import { useEffect, useRef, useState } from 'react'
import { words } from '../data/db'
import { shuffleArray } from '../utilities/shuffleArray'
import wrongSound from '../assets/sounds/wrong-47985.mp3'
import correctSound from '../assets/sounds/mixkit-achievement-bell-600.wav'
import winSound from '../assets/sounds/mixkit-animated-small-group-applause-523.wav'
import ConfettiExplosion from 'react-confetti-explosion'

const FifthMethod = () => {
  const [pairs, setPairs] = useState({leftValue: '', rightValue: ''})
  const [leftClick, setLeftClick] = useState(null)
  const [rightClick, setRightClick] = useState(null)
  const [events, setEvents] = useState({e1: '', e2: ''})
  const [foundedWords, setFoundedWords] = useState([])
  const [leftSideWords, setLeftSideWords] = useState(shuffleArray(Object.keys(words)))
  const [rightSideWords, setRightSideWords] = useState(shuffleArray(Object.values(words)))
  let wrong = new Audio(wrongSound)
  let correct = new Audio(correctSound)
  let win = new Audio(winSound)
  const [isExploding, setExploding] = useState(false)
  


  const handleClick = (side, e, index, item) => {
    if (side === 'left') {
      setEvents({...events, e1: e})
      setLeftClick(index)
      setPairs({...pairs, leftValue: item})
    } else {
      setEvents({...events, e2: e})
      setRightClick(index)
      setPairs({...pairs, rightValue: item})
      }
    }


  useEffect(() => {
    if (pairs.leftValue !== '' && pairs.rightValue !== '') {
      if (words[pairs.leftValue] === pairs.rightValue) {
        setFoundedWords([...foundedWords, pairs.leftValue, pairs.rightValue])
        correct.play()
        events.e1.target.classList.add('true')
        events.e2.target.classList.add('true')
        setTimeout(() => {
          events.e1.target.classList.remove('true')
          events.e2.target.classList.remove('true')
          events.e1.target.disabled = true
          events.e2.target.disabled = true
        }, 500);
      } else {
          wrong.play()
          events.e1.target.classList.add('wrong')
          events.e2.target.classList.add('wrong')
          setTimeout(() => {
              setLeftClick(null)
              setRightClick(null)
              events.e1.target.classList.remove('wrong')
              events.e2.target.classList.remove('wrong')
            }, 500);
        }
        pairs.leftValue = ''
        pairs.rightValue = ''
    }
  }, [pairs])


  useEffect(() => {
    if (foundedWords.length === Object.keys(words).length + Object.values(words).length) {
      setTimeout(() => {
        win.play()
        setExploding(true)
      }, 100);
    }
  }, [foundedWords])
  
  const complete = () => {
    alert('Task Completed!')
    location.reload()
  }

  
  return (
    <>
      <div className='grid gap-6'>
        {
          leftSideWords.map((item, index) => (
              <button key={item} onClick={(e) => handleClick('left', e, index, item)} className={`w-40 h-16 text-white font-bold text-lg bg-blue-500 cursor-pointer select-none transition-all duration-150 rounded-full border border-blue-400 ${leftClick === index ? 'clicked translate-y-2' : foundedWords.includes(item) ? 'translate-y-2' : '[box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]'} disabled:clicked disabled:opacity-50`}>
                  {item}
              </button>
          ))
        }
      </div>
      <div className='grid gap-6'>
        {
          rightSideWords.map((item, index) => (
              <button key={item} onClick={(e) => handleClick('right', e, index, item)} className={`w-40 h-16 text-white font-bold text-lg bg-blue-500 cursor-pointer select-none transition-all duration-150 rounded-full border border-blue-400 ${rightClick === index ? 'clicked translate-y-2' : foundedWords.includes(item) ? 'translate-y-2' : '[box-shadow:0_10px_0_0_#1b6ff8,0_15px_0_0_#1b70f841]'} disabled:clicked disabled:opacity-50`}>
                  {item}
              </button>
          ))
        }
      </div>
      {
        isExploding && (
          <ConfettiExplosion
            className='absolute top-1/4 left-1/2 -translate-x-1/2'
            onComplete={complete}
            duration={3000}
            force={0.8}
            particleCount={250}
            width={1600} />
        )
      }
    </>
  )
}

export default FifthMethod