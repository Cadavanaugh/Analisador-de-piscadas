import './StatsCard.css'

const StatsCard = ({text, icon, data}) => {
  return (
    <div className='stats-card'>
        <h3>{text}</h3>
        <p>{data}</p>
        <img src={icon} alt="Card image icon"/>
    </div>
  )
}

export default StatsCard