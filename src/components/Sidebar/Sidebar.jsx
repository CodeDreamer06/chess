import { useState, useEffect } from 'react';
import './Sidebar.sass'

const Sidebar = () => {
    const [seconds, setSeconds] = useState(0);
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000)
    
      return () => clearInterval(intervalId);
    }, [seconds]);

    const getFormattedTime = durationInSeconds => {
        const minutes = Math.floor(durationInSeconds / 60);
        const secondsLeft = durationInSeconds - minutes * 60;
        return `${minutes}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`
    }

    return <section className="sidebar">
        <div>
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
                    <div className="circular-progress" style={{ "--percentage": "60" }}></div>
                    {getFormattedTime(seconds)}
                </div>
            </div>
        </div>
        <div className="sidebar__bottom">
            <button className="hint">
                <span className="hint-icon"></span>
                Hint
            </button>
            <div className="bottom-buttons">
                <button className="gear-icon control-icon"></button>
                <div>
                    <button className="chevron-icon control-icon"></button>
                    <button className="chevron-icon control-icon"></button>
                </div>
            </div>
        </div>
    </section>
}
 
export default Sidebar;