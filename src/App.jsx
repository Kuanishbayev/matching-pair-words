import Button from './components/Button.jsx'
import FifthMethod from './components/FifthMethod.jsx'
import FirstMethod from './components/FirstMethod'
import FourthMethod from './components/FourthMethod.jsx'
import RadioInput from './components/RadioInput'
import ThirdMethod from './components/ThirdMethod'

function App() {
  


  return (
    <div className='h-screen grid place-content-center'>
      <div className='grid grid-cols-2 gap-2'>
        {/* <FirstMethod /> */}
        {/* <RadioInput /> */}
        {/* <ThirdMethod /> */}
        {/* <FourthMethod /> */}
        {/* <Button /> */}
        <FifthMethod />
      </div>
    </div>
  )
}

export default App