import './Sidebar.sass'

const Sidebar = props => {
    return <section className="sidebar">
        <div className="sidebar__top">
            <div className="perspective-turn"></div>
            <p>White to Move</p>
        </div>
        <div className="sidebar__current">
            <div className="profile">
                <img src="https://images.chesscomfiles.com/uploads/v1/user/170264201.0d2b24bf.100x100o.ac9bc68ecd24.jpg" alt="profile"/>
                <h2>2811</h2>
            </div>
            <div className="time">
                <div className="circular_progress"></div>
                2:35
            </div>
        </div>
        <div className="sidebar__bottom">
            <button>Hint</button>
            <div className="bottom-buttons">
                
            </div>
        </div>
    </section>
}
 
export default Sidebar;