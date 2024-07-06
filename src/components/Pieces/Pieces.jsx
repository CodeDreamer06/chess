import './Pieces.sass'
import Piece from './Piece'
import { useRef, useState } from 'react'
import { useAppContext }from '../../contexts/Context'
import { openPromotion } from '../../reducer/actions/popup'
import { getCastlingDirections } from '../../arbiter/getMoves'
import { updateCastling, detectStalemate, detectInsufficientMaterial, detectCheckmate} from '../../reducer/actions/game'
import { makeNewMove, clearCandidates, highlightSquare, clearHighlights } from '../../reducer/actions/move'
import { getNewMoveNotation } from '../../utils/position'
import playSounds from '../../utils/sound'
import arbiter from '../../arbiter/arbiter'
import { isEqual } from '../../utils/general'

const Pieces = () => {
    const { appState , dispatch } = useAppContext();
    const currentPosition = appState.position[appState.position.length - 1]
    const [arrowStart, setArrowStart] = useState(null);
    const ref = useRef()

    const updateCastlingState = ({piece, file, rank}) => {
        const direction = getCastlingDirections({
            castleDirection: appState.castleDirection,
            piece,
            file,
            rank
        })

        if (direction) dispatch(updateCastling(direction))
    }

    const openPromotionBox = ({rank, file, x, y}) => {
        dispatch(openPromotion({
            rank: Number(rank),
            file: Number(file),
            x,
            y
        }))
    }

    const calculateCoords = e => {
        const { top, left, width } = ref.current.getBoundingClientRect()
        const size = width / 8
        const y = Math.floor((e.clientX - left) / size) 
        const x = 7 - Math.floor((e.clientY - top) / size)
        return { x, y }
    }

    const move = e => {
        const { x, y } = calculateCoords(e)
        const [piece, rank, file] = e.dataTransfer.getData("text").split(',')

        if(appState.candidateMoves.find(m => m[0] === x && m[1] === y)){
            const opponent = piece.startsWith('b') ? 'w' : 'b'
            const castleDirection = appState.castleDirection[`${piece.startsWith('b') ? 'white' : 'black'}`]

            if ((piece ==='wp' && x === 7) || (piece==='bp' && x === 0)){
                openPromotionBox({rank, file, x, y})
                return
            }
            if (piece.endsWith('r') || piece.endsWith('k')){
                updateCastlingState({piece, file, rank})
            }
            const newPosition = arbiter.performMove({
                position: currentPosition,
                piece, rank, file,
                x,y
            })
            
            const newMove = getNewMoveNotation({
                piece,
                rank,
                file,
                x,
                y,
                position: currentPosition,
            })

            dispatch(makeNewMove({newPosition, newMove}))
            playSounds(newMove, newPosition, opponent, appState.boardSettings.soundTheme);

            if (arbiter.insufficientMaterial(newPosition))
                dispatch(detectInsufficientMaterial())
            else if (arbiter.isStalemate(newPosition, opponent, castleDirection)) {
                dispatch(detectStalemate())
            }
            else if (arbiter.isCheckMate(newPosition, opponent, castleDirection)) {
                dispatch(detectCheckmate(piece[0]))
            }
        }

        dispatch(clearCandidates())
    }

    const onDrop = e => {
        e.preventDefault()
        move(e);
    }

    const onContextMenu = e => {
        let color = 'red';
        e.preventDefault()
        dispatch(clearCandidates());

        const { x, y } = calculateCoords(e)
        if(!isEqual(arrowStart, {x, y})) return;
        if (e.shiftKey) color = 'green'
        else if (e.ctrlKey) color = 'orange'
        else if (e.altKey) color = 'blue'
        dispatch(highlightSquare(x, y, color));
    }

    const onClick = e => {
        dispatch(clearHighlights())
    }
    
    const onDragOver = e => {e.preventDefault()}

    const onMouseDown = e => {
        if (e.button === 2) setArrowStart(calculateCoords(e));
    }

    const onMouseUp = e => {
        const coords = calculateCoords(e);
        if (e.button === 2 && !isEqual(arrowStart, coords))
            console.log(`draw arrow from (${arrowStart.x}, ${arrowStart.y}) to (${coords.x}, ${coords.y})`)
    }

    return <div
        className='pieces'
        ref={ref}
        onDrop={onDrop}
        onContextMenu={onContextMenu}
        onClick={onClick}
        onDragOver={onDragOver}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}>
        {currentPosition.map((r, rank) =>
            r.map((_, file) => 
                currentPosition[rank][file] &&
                <Piece
                    key={rank + '-' + file} 
                    rank={rank}
                    file={file}
                    piece={currentPosition[rank][file]}/>))}
    </div>
}

export default Pieces;