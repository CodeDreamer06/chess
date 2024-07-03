import arbiter from '../../arbiter/arbiter';
import { useAppContext }from '../../contexts/Context'
import { generateCandidates, clearHighlights, clearCandidates, setCandidateSquare } from '../../reducer/actions/move';

const Piece = ({ rank, file, piece }) => {
    const { appState, dispatch } = useAppContext();
    const { turn, castleDirection, position : currentPosition, candidateSquare } = appState

    const onDragStart = e => {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain",`${piece},${rank},${file}`)
        setTimeout(() => {
            e.target.style.display = 'none'
        },0)

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
    const onDragEnd = e => e.target.style.display = 'block';

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
 
    return (
        <div 
            className={`piece ${piece} p-${file}${rank}`}
            draggable={true}   
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={onClick}
        />)
}

export default Piece