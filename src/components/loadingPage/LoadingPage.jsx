import './loading.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { isLoading } from '../../blink'
import { useSignal } from '@preact/signals-react'

const LoadingPage = () => {
  const loadingSignal = useSignal(isLoading)

  return (
    <div className='loading-container'>
      <FontAwesomeIcon icon={faSpinner} spin size='6x'style={{animationDuration: '1.5s'}}/>
      <p>Carregando...</p>
    </div>
  )
}

export default LoadingPage