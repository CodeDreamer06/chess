import './Ranks.sass'

const Ranks = ({ ranks, show }) =>
    <div className="ranks">
        {ranks.map(rank => <span key={rank} style={{ display: show ? 'block' : 'none' }}>{rank}</span>)}
    </div>

export default Ranks;