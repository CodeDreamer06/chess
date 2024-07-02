import './app.css';
import { useReducer, useRef  } from 'react'
import { reducer } from './reducer/reducer'
import Board from './components/Board/Board';
import { initGameState } from './constants';
import AppContext from './contexts/Context'
import Control from './components/Control/Control';
import TakeBack from './components/Control/bits/TakeBack';
import MovesList from './components/Control/bits/MovesList';
import ThemeDropdown from './components/Theme';
import BoardSettings from './components/settings/BoardSettings';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
    initGameState["theme"] = localStorage.getItem('theme');
    const [appState, dispatch] = useReducer(reducer, initGameState);
    const dialogRef = useRef(null);

    const providerState = {
        appState,
        dispatch
    }

    return <AppContext.Provider value={providerState} >
        <div className="App">
            <Board/>
            <Control>
                <Sidebar />
                <MovesList/>
                <TakeBack/>
                <ThemeDropdown />
                <BoardSettings reference={dialogRef} />
                <button onClick={e => dialogRef.current.showModal()}>Board settings</button>
            </Control>
        </div>
    </AppContext.Provider>
}

export default App;