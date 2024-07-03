import './app.css';
import { useReducer, useRef, useEffect, useCallback } from 'react'
import { reducer } from './reducer/reducer'
import Board from './components/Board/Board';
import { initGameState } from './constants';
import AppContext from './contexts/Context'
import Control from './components/Control/Control';
import TakeBack from './components/Control/bits/TakeBack';
import MovesList from './components/Control/bits/MovesList';
import BoardSettings from './components/settings/BoardSettings';
import Sidebar from './components/Sidebar/Sidebar';
import { flipBoard } from './reducer/actions/game';

function App() {
    const [appState, dispatch] = useReducer(reducer, initGameState);
    const dialogRef = useRef(null);

    const providerState = {
        appState,
        dispatch
    }

    const handleKeyPress = useCallback(e => {
        console.log(`Key pressed: ${e.key}`);
        if(e.key === 'f') dispatch(flipBoard())
      }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        }
    }, [handleKeyPress]);

    return <AppContext.Provider value={providerState} >
        <div className="App">
            <div className="board-wrapper">
                <Board/>
                <div className="control-icons">
                    <button className="gear-icon control-icon" onClick={e => dialogRef.current.showModal()}></button>
                    <button className="flip-icon control-icon" id="show" onClick={e => dispatch(flipBoard())}></button>
                    <button className="smiley-icon control-icon" id="show"></button>
                </div>
            </div>
            <Control>
                <Sidebar />
                <MovesList/>
                <TakeBack/>
                <BoardSettings reference={dialogRef} />
            </Control>
        </div>
    </AppContext.Provider>
}

export default App;