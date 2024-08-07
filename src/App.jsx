import './app.css';
import { useReducer, useRef, useEffect, useCallback } from 'react'
import { reducer } from './reducer/reducer'
import Board from './components/Board/Board';
import Ranks from './components/Board/bits/Ranks'
import Files from './components/Board/bits/Files'
import AppContext from './contexts/Context'
import Control from './layouts/Control';
import MovesList from './components/Control/MovesList';
import BoardSettings from './components/settings/BoardSettings';
import Sidebar from './components/Sidebar/Sidebar';
import { flipBoard } from './reducer/actions/game';
import ControlIcons from './components/ControlIcons';
import { getInitialGameState } from './utils/setup';
import { DraggableComponent } from './testy';
import PromotionBox from './components/Popup/PromotionBox/PromotionBox';

function App() {
    const [appState, dispatch] = useReducer(reducer, getInitialGameState());
    const dialogRef = useRef(null);
    const providerState = { appState, dispatch }
    const ranks = Array(8).fill().map((x,i) => 8-i)
    const files = Array(8).fill().map((x,i) => i+1)

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
                <Ranks ranks={ranks} show={appState.boardSettings.coordinates === 2}/>
                <div>
                    <Board/>
                    <Files files={files} show={appState.boardSettings.coordinates === 2}/>
                </div>
                <ControlIcons dialogRef={dialogRef}/>
            </div>
            <Control>
                <Sidebar />
                <MovesList/>
                <BoardSettings reference={dialogRef} />
            </Control>
            {/* <DraggableComponent /> */}
        </div>
    </AppContext.Provider>
}

export default App;