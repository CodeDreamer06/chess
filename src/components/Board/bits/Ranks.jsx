import './Ranks.sass'

const Ranks = ({ ranks, show }) =>
    <div className="ranks" style={{ display: show ? 'flex' : 'none' }}>
        {ranks.map(rank => <span key={rank}>{rank}</span>)}
    </div>

export default Ranks;