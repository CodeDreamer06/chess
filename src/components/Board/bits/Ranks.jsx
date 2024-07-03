import './Ranks.sass'

const Ranks = ({ ranks, hide }) =>
    <div className="ranks">
        {ranks.map(rank => <span key={rank} style={{ display: hide ? 'none' : 'block' }}>{rank}</span>)}
    </div>

export default Ranks;