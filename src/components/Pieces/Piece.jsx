import arbiter from '../../arbiter/arbiter';
import { useAppContext } from '../../contexts/Context'
import { generateCandidates, clearHighlights, clearCandidates, setCandidateSquare } from '../../reducer/actions/move';
import { getPieceImage } from '../../services/pieceGenerator';

const Piece = ({ rank, file, piece }) => {
    const { appState, dispatch } = useAppContext();
    const { turn, castleDirection, position : currentPosition, candidateSquare, boardSettings } = appState

    const onDragStart = ({ target, dataTransfer }) => {
        dataTransfer.effectAllowed = 'move';
        dataTransfer.dropEffect = 'move';
        dataTransfer.setData("text/plain",`${piece},${rank},${file}`)
        setTimeout(() => {
            target.style.display = 'none'
        }, 0)

        dispatch(clearHighlights())

        if (turn === piece[0]){
            const candidateMoves = 
                arbiter.getValidMoves({
                    position : currentPosition[currentPosition.length - 1],
                    prevPosition : currentPosition[currentPosition.length - 2],
                    castleDirection : castleDirection[turn],
                    piece,
                    file,
                    rank
                })
            dispatch(generateCandidates({candidateMoves}))
        }

    }

    const onDragEnd = ({ target }) => target.style.display = 'block';

    const onClick = e => {
        if (turn === piece[0]) {
            if(candidateSquare.file === file && candidateSquare.rank === rank) {
                dispatch(clearCandidates())
                return;
            }

            const candidateMoves =
                arbiter.getValidMoves({
                    position : currentPosition[currentPosition.length - 1],
                    prevPosition : currentPosition[currentPosition.length - 2],
                    castleDirection : castleDirection[turn],
                    piece,
                    file,
                    rank
                })
            
            dispatch(generateCandidates({ candidateMoves }))
            dispatch(setCandidateSquare({ file, rank }))
        }
    }
 
    return <div
        className={`piece ${piece} p-${file}${rank}`}
        style={{ backgroundImage: getPieceImage(piece, boardSettings.pieces) }}
        draggable={true}
        onDragStart={onDragStart}
        // onDragEnter={onDragEnter}
        onDragEnd={onDragEnd}
        onClick={onClick}/>
}

export default Piece;