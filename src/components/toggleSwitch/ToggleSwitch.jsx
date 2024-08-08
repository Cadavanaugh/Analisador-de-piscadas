import './toggleSwitch.css'

const ToggleSwitch = () => {
  return (
    <div className='toggle-switch'>
        <div className="col col--dark">
            <label>
                <span className="switch">
                    <input className="switch__input" type="checkbox" role="switch"></input>
                    <span className="switch__surface">
                        <span className="switch__surface-glare"></span>
                    </span>
                    <span className="switch__inner-shadow"></span>
                    <span className="switch__inner">
                        <span className="switch__inner-glare"></span>
                    </span>
                    <span className="switch__rocker-shadow"></span>
                    <span className="switch__rocker-sides">
                        <span className="switch__rocker-sides-glare"></span>
                    </span>
                    <span className="switch__rocker">
                        <span className="switch__rocker-glare"></span>
                    </span>
                    <span className="switch__light">
                        <span className="switch__light-inner"></span>
                    </span>
                </span>
                <span className="sr">Dark Switch</span>
            </label>
        </div>
        <p>Chroma Key</p>
    </div>
    
  )
}

export default ToggleSwitch