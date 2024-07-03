import './BoardSettings.sass';
import Button from '../Button';
import Option from './Option';
import ToggleSwitch from './ToggleSwitch';

const options = {
    pieces: 'Pieces',
    board: 'Board',
    soundTheme: 'Sound Theme',
    coordinates: 'Coordinates',
    pieceNotation: 'Piece Notation',
    moveClassificationStyle: 'Move Classification Style',
    pieceAnimations: 'Piece Animations',
    moveMethod: 'Move Method',
}

const BoardSettings = ({ reference }) => {
    return <dialog id="board-settings" ref={reference} className="modal">
        <div className="modal__inner">
            {Object.keys(options).map(key => <Option name={key}>{options[key]}</Option>)}
            <ToggleSwitch>Highlight Moves</ToggleSwitch>
            <ToggleSwitch>Show Legal Moves</ToggleSwitch>
        </div>
        <div className="modal__bottom">
            <Button onClick={e => reference.current.close()}>Cancel</Button>
            <Button isPrimary={true}>Save</Button>
        </div>
    </dialog>
}
 
export default BoardSettings;