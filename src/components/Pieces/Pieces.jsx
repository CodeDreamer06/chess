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
    const canvasRef = useRef(null);

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
        const arrowsContext = canvasRef.current.getContext('2d');
        dispatch(clearHighlights())
        arrowsContext.clearRect(0, 0, 800, 800);
    }
    
    const onDragOver = e => {
        const arrowsContext = canvasRef.current.getContext('2d');
        e.preventDefault()
        arrowsContext.clearRect(0, 0, 800, 800);
    }

    const onMouseDown = e => {
        if (e.button === 2) setArrowStart(calculateCoords(e));
    }

    const onMouseUp = e => {
        const coords = calculateCoords(e);
        if (e.button === 2 && !isEqual(arrowStart, coords))
            drawArrow(arrowStart.y * 100 + 50, (7 - arrowStart.x) * 100 + 15, coords.y * 100 + 50, (7 - coords.x) * 100 + 50, 22, 50, 35)
    }

    const transform = (xy, angle, xy0) => {
        // put x and y relative to x0 and y0 so we can rotate around that
        const rel_x = xy[0] - xy0[0];
        const rel_y = xy[1] - xy0[1];
    
        // compute rotated relative points
        const new_rel_x = Math.cos(angle) * rel_x - Math.sin(angle) * rel_y;
        const new_rel_y = Math.sin(angle) * rel_x + Math.cos(angle) * rel_y;
    
        return [xy0[0] + new_rel_x, xy0[1] + new_rel_y];
    }
    
    const drawArrow = (x0, y0, x1, y1, width, head_width, head_length) => { 
        const context = canvasRef.current.getContext('2d');;
        context.fillStyle = "rgba(255, 170, 0, 0.65)";
        const length = Math.sqrt((x1 - x0) * (x1 - x0) +(y1 - y0) * (y1 - y0))
        let angle  = Math.atan2(y1 - y0, x1 - x0);
        angle -= Math.PI / 2;
    
        let p0 = [x0,y0];
    
        // order will be: p1 -> p3 -> p5 -> p7 -> p6 -> p4 -> p2
        // formulate the two base points
        let p1 = [x0 + width / 2, y0];
        let p2 = [x0 - width / 2, y0];
    
        // formulate the upper base points which connect the pointy end with the lengthy thing
        let p3 = [x0 + width / 2, y0 + length - head_length];
        let p4 = [x0 - width / 2, y0 + length - head_length];
    
        // formulate the outer points of the triangle
        let p5 = [x0 + head_width / 2, y0 + length - head_length];
        let p6 = [x0 - head_width / 2, y0 + length - head_length];
    
        // end point of the arrow
        let p7 = [x0, y0 + length];
    
        p1 = transform(p1,angle,p0);
        p2 = transform(p2,angle,p0);
        p3 = transform(p3,angle,p0);
        p4 = transform(p4,angle,p0);
        p5 = transform(p5,angle,p0);
        p6 = transform(p6,angle,p0)
        p7 = transform(p7,angle,p0);
    
        context.moveTo(p1[0], p1[1]);
        context.beginPath();
        context.lineTo(p3[0], p3[1]);
        context.lineTo(p5[0], p5[1]);
        context.lineTo(p7[0], p7[1]);
        context.lineTo(p6[0], p6[1]);
        context.lineTo(p4[0], p4[1]);
        context.lineTo(p2[0], p2[1]);
        context.lineTo(p1[0], p1[1]);
        context.closePath();
        context.fill();
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
        <canvas
            ref={canvasRef}
            id="arrowCanvas"
            width={800}
            height={800}
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
        />
    </div>
}

export default Pieces;