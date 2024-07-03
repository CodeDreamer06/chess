import './app.css';
import { useReducer, useRef, useEffect, useCallback } from 'react'
import { reducer } from './reducer/reducer'
import Board from './components/Board/Board';
import { initGameState } from './data/constants';
import AppContext from './contexts/Context'
import Control from './layouts/Control';
import TakeBack from './components/Control/TakeBack';
import MovesList from './components/Control/MovesList';
import BoardSettings from './components/settings/BoardSettings';
import Sidebar from './components/Sidebar/Sidebar';
import { flipBoard, initializeSettings } from './reducer/actions/game';
import ControlIcons from './components/ControlIcons';

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
      localStorage.getItem('settings')
    
    useEffect(() => {
        if (localStorage.getItem('settings'))
            dispatch(initializeSettings(JSON.parse(localStorage.getItem('settings'))))
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
                <ControlIcons dialogRef={dialogRef}/>
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