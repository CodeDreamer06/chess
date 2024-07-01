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

const Board = () => {
    const ranks = Array(8).fill().map((x,i) => 8-i)
    const files = Array(8).fill().map((x,i) => i+1)

    const { appState, dispatch } = useAppContext();
    const position = appState.position[appState.position.length - 1];
    // dispatch(highlightSquare(2, 2, "blue"));
    const checkTile = (() => {
        const isInCheck =  (arbiter.isPlayerInCheck({
            positionAfterMove : position,
            player : appState.turn
        }))

        if (isInCheck) return getKingPosition(position, appState.turn)
        return null
    })()

    const getClassName = (i, j) => {
        let c = 'tile'
        c+= (i+j) % 2 === 0 ? ' tile--dark ' : ' tile--light '
        if (appState.candidateMoves?.find(m => m[0] === i && m[1] === j)){
            if (position[i][j])
                c += ' attacking'
            else
                c += ' highlight'
        }

        if(checkTile && checkTile[0] === i && checkTile[1] === j) 
            c += ' checked'

        if(appState.highlightedSquares[i][j])
            c += ' ' + appState.highlightedSquares[i][j]

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

    return <div className='board'>
        <Ranks ranks={ranks}/>
        <div className='tiles'>
            {ranks.map((rank, i) => 
                files.map((file, j) => 
                    <div 
                        key={file + '' + rank}
                        onContextMenu={onContextMenu}
                        onClick={onClick}
                        i={i}
                        j={j}
                        className={`${getClassName(7-i,j)}`}
                        theme={appState.theme}>
                    </div>
            ))}
        </div>

        <Pieces/>
        <Popup>
            <PromotionBox />
            <GameEnds />
        </Popup>

        <Files files={files}/>

    </div>
    
}

export default Board