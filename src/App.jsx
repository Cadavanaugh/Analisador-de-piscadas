import { useEffect, useState, useRef } from 'react'
import Webcam from 'react-webcam'
import {init, blinkCount, isLoading} from './blink.js'
import './index.css'
import LoadingPage from './components/loadingPage/LoadingPage.jsx'
import StatsCard from './components/StatsCard/StatsCard.jsx'
import formatTime from './utils/formatTime.js'
import { averageBlinksPerMinute, longestIntervalWithoutBlinking, maxBlinksInOneMinute } from './utils/blinkStatistics.js'
import imgClock from '/images/clock.png'
import img123 from '/images/123.png'
import imgEye from '/images/eye.png'
import imgStopwatch from '/images/stopwatch.png'
import imgFire from '/images/fire.png'
import ToggleSwitch from './components/toggleSwitch/ToggleSwitch.jsx'

function App() {
  const webcamRef = useRef(null)

  const [time, setTime] = useState(0);
  useEffect(() => {
    let timerId;

    const startTimer = async () => {
      await init();
      timerId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    };

    return () => {
      startTimer();
      clearInterval(timerId);
    };
  }, []);


  // Bloquear scroll durante o carregamento
  useEffect(() => {
    document.body.style.overflow = isLoading.v ? 'hidden' : 'initial'
  }, [isLoading.v])
  
  // Chroma key toggle switch
  const checkbox = document.querySelector('.switch__input')
  useEffect(() => {
    if(checkbox){
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) document.body.style.backgroundColor = '#04F404'
        else document.body.style.backgroundColor = '#383838'
      })
    }
  }, [checkbox])
  

  return (
    <div className="App">
      <header>
        <h1>Analisador de piscadas</h1>
        <ToggleSwitch/>
      </header>
      <main>
        <section className='cam'>
          {isLoading.v ? <LoadingPage/> : null}
          <Webcam ref={webcamRef} className='webcam' mirrored={true}/>
        </section>
        <section className='stats'>
          <StatsCard text='Tempo decorrido'  data={formatTime(time)} icon={imgClock}/>
          <div className='metrics'>
            <StatsCard text='Piscadas totais' data={blinkCount.v.length} icon={img123}/>
            <StatsCard text='Piscadas por minuto' data={averageBlinksPerMinute(blinkCount.v)} icon={imgEye}/>
            <StatsCard text='Maior tempo sem piscar' data={longestIntervalWithoutBlinking(blinkCount.v)} icon={imgStopwatch}/>
            <StatsCard text='Máximo em 1min' data={maxBlinksInOneMinute(blinkCount.v)} icon={imgFire}/>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
