import './Board.sass'
import { useAppContext }from '../../contexts/Context'

import Ranks from './bits/Ranks'
import Files from './bits/Files'
import Pieces from '../Pieces/Pieces'
import PromotionBox from '../Popup/PromotionBox/PromotionBox'
import Popup from '../Popup/Popup'
import GameEnds from '../Popup/GameEnds/GameEnds'

import arbiter from '../../arbiter/arbiter'
import { getKingPosition } from '../../arbiter/getMoves'
import { clearCandidates } from '../../reducer/actions/move';
import { BoardSettingOptions } from '../../constants';

const Board = () => {
    const ranks = Array(8).fill().map((x,i) => 8-i)
    const files = Array(8).fill().map((x,i) => i+1)

    const { appState, dispatch } = useAppContext();
    const { turn, highlightedSquares, boardSettings } = appState
    const { board: theme, coordinates } = boardSettings
    const position = appState.position[appState.position.length - 1];
    // dispatch(highlightSquare(2, 2, "blue"));
    const checkTile = (() => {
        const isInCheck =  (arbiter.isPlayerInCheck({
            positionAfterMove : position,
            player : turn
        }))

        if (isInCheck) return getKingPosition(position, turn)
        return null
    })()

    const getClassName = (i, j) => {
        let c = 'tile'
        c += (i + j) % 2 === 0 ? ' tile--dark ' : ' tile--light '

        if (appState.candidateMoves?.find(m => m[0] === i && m[1] === j)) {
            if (position[i][j])
                c += ' attacking'
            else
                c += ' highlight'
        }

        if(checkTile && checkTile[0] === i && checkTile[1] === j) 
            c += ' checked'

        if(highlightedSquares[i][j])
            c += ' ' + highlightedSquares[i][j]

        return c
    }

    // FIXME this function is not called for some reason
    const onContextMenu = e => {
        e.preventDefault()
        dispatch(clearCandidates());
        // dispatch(highlightSquare())
        console.log("highlight some square");
        console.log(e);
    }

    const onClick = e => {
        e.preventDefault()
        console.log(e)
    }

    const getMarkers = (i, j, orientation) => {
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        if (orientation === 'files') if(i === 7) return files[j]
        if (orientation === 'ranks') if(j === 0) return 8 - i
    }

    const generateMarkerClasses = (i, j, kind) => `markers markers--${kind} markers--${(i + j) % 2 === 0 ? 'dark' : 'light'}-text`;

    const themeClass = BoardSettingOptions.board[theme].toLowerCase().split(' ').join('-');

return <div className='board'>
        <Ranks ranks={ranks} show={coordinates === 2}/>
        <div className='tiles'>
            {ranks.map((rank, i) =>
                files.map((file, j) =>
                    <div
                        key={file + '' + rank}
                        onContextMenu={onContextMenu}
                        onClick={onClick}
                        i={i}
                        j={j}
                        className={`${getClassName(7 - i, j)}`}
                        theme={themeClass}>
                        {coordinates === 1 &&
                            <><span className={generateMarkerClasses(i, j, 'files')} theme={themeClass}>{getMarkers(i, j, 'files')}</span>
                            <span className={generateMarkerClasses(i, j, 'ranks')} theme={themeClass}>{getMarkers(i, j, 'ranks')}</span></>}
                    </div>
            ))}
        </div>

        <Pieces/>
        <Popup>
            <PromotionBox />
            <GameEnds />
        </Popup>

        <Files files={files} show={coordinates === 2}/>
    </div>    
}

export default Board