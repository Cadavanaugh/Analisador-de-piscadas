import { useEffect, useState, useRef } from 'react'
import Webcam from 'react-webcam'
import {init, blinkCount, isLoading} from './blink.js'
import './index.css'
import LoadingPage from './components/loadingPage/LoadingPage.jsx'
import StatsCard from './components/StatsCard/StatsCard.jsx'
import formatTime from './utils/formatTime.js'
import { averageBlinksPerMinute, longestIntervalWithoutBlinking, maxBlinksInOneMinute } from './utils/blinkStatistics.js'

function App() {
  const webcamRef = useRef(null)

  const [time, setTime] = useState(0);
  useEffect(() => {
    init()

    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000)
    return () => clearInterval(interval);
  }, [])


  useEffect(() => {
    document.body.style.overflow = isLoading.v ? 'hidden' : 'initial'
  }, [isLoading.v])
  
  return (
    <div className="App">
      <header>
        <h1>Analisador de piscadas</h1>
      </header>
      <main>
        <section className='cam'>
          {isLoading.v ? <LoadingPage/> : null}
          <Webcam ref={webcamRef} className='webcam' mirrored={true}/>
        </section>
        <section className='stats'>
          <StatsCard text='Tempo decorrido'  data={formatTime(time)} icon='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcreazilla-store.fra1.digitaloceanspaces.com%2Ficons%2F3430540%2Fclock-icon-md.png&f=1&nofb=1&ipt=2f2cc673390f1a9def7b489d2f22a5b1191292d8238deef682da4e82a09dcde6&ipo=images'/>
          <div className='metrics'>
            <StatsCard text='Piscadas totais' data={blinkCount.v.length} icon='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shareicon.net%2Fdata%2F2015%2F12%2F28%2F694274_numbers_512x512.png&f=1&nofb=1&ipt=ab4706d86f30f2a51f137d2e2ab749ed020c3662220d037a78e3f24a09a4fb3b&ipo=images'/>
            <StatsCard text='Piscadas por minuto' data={averageBlinksPerMinute(blinkCount.v)} icon='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F009%2F393%2F680%2Fnon_2x%2Feye-icon-sign-symbol-design-free-png.png&f=1&nofb=1&ipt=b2ec1b8b87449656441c066143ec78e0252b9a3c83ea76989ded64926b1b6eac&ipo=images'/>
            <StatsCard text='Maior tempo sem piscar' data={longestIntervalWithoutBlinking(blinkCount.v)} icon='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Ypjq8yjyRKSZ6-BM1TTjkgHaHa%26pid%3DApi&f=1&ipt=a5edd2e5a38a7ff9a39b13966e760528b9842ab22777085cbcc11b216a2f7049&ipo=images'/>
            <StatsCard text='Máximo em 1min' data={maxBlinksInOneMinute(blinkCount.v)} icon='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F019%2F787%2F026%2Foriginal%2Ffire-icon-on-transparent-background-free-png.png&f=1&nofb=1&ipt=abf1d131eabc555fdf0c52be5dce9da14a82ae33dac2488eb3ec0e1582a63e01&ipo=images'/>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
