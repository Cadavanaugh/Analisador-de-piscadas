import { useRef } from 'react'
import './App.css'
import Webcam from 'react-webcam'
import {init, blinkCount} from './blink.js'
import { useSignal } from '@preact/signals-react'

function App() {
  const blinkCountSignal = useSignal(blinkCount)
  const webcamRef = useRef(null)
  window.onload = () => init()

  return (
    <div className="App">
      <Webcam ref={webcamRef} className='webcam'/>
      <section>
        <div>Número de piscadas: {blinkCountSignal.value}</div>
      </section>
    </div>
  )
}

export default App
