import { useAppContext } from '../../../contexts/Context'
import { copyPosition, getNewMoveNotation } from '../../../utils/position';
import { makeNewMove , clearCandidates } from '../../../reducer/actions/move';
import './PromotionBox.sass'
import { getPieceImage } from '../../../services/pieceGenerator';

const PromotionBox = ({ onClosePopup }) => {
    const { appState , dispatch } = useAppContext();
    const { promotionSquare, position, boardSettings } = appState;

    if (!promotionSquare)
        return null

    const color = promotionSquare.x === 7 ? 'w' : 'b'
    const options = ['q','r','b','n']

    const getPromotionBoxPosition = () => {
        let style = {}

        if (promotionSquare.x === 7) {
            style.top = '-12.5%'
        }
        else{
            style.top = '97.5%'
        }

        if (promotionSquare.y <= 1){
            style.left = '0%'
        }
        else if (promotionSquare.y >= 5){
            style.right = '0%'
        }
        else {
            style.left = `${12.5*promotionSquare.y - 20}%`
        }

        return style
    }

    const onClick = option => {
        onClosePopup()
        const newPosition = copyPosition (position[position.length - 1])
        
        newPosition[promotionSquare.rank][promotionSquare.file] = ''
        newPosition[promotionSquare.x][promotionSquare.y] = color+option
        const newMove = getNewMoveNotation({
            ...appState.selectedPiece,
            x : promotionSquare.rank,
            y : promotionSquare.file,
            position:position[position.length - 1],
            promotesTo : option
        })
        dispatch(clearCandidates())
        dispatch(makeNewMove({newPosition, newMove}))

    }

    return <div className="promotion-choices" style={getPromotionBoxPosition()}>
        {options.map(option => <div key={option} style={{ backgroundImage: getPieceImage('bq', boardSettings.pieces) }}/>)}
            {/* <div key={option} */}
                 {/* onClick = {() => onClick(option)}
                 className={`promotion-piece`}/>)} */}
                {/* ${color}${option} */}
    </div>

}

export default PromotionBox