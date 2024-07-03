import './BoardSettings.sass';
import Button from '../Button';
import Option from './Option';
import ToggleSwitch from './ToggleSwitch';

const BoardSettings = ({ reference }) => {
    return <dialog id="board-settings" ref={reference} className="modal">
        <div className="modal__inner">
            <Option name="pieces">Pieces</Option>
            <Option name="board">Board</Option>
            <Option name="soundTheme">Sound Theme</Option>
            <Option name="coordinates">Coordinates</Option>
            <Option name="pieceNotation">Piece Notation</Option>
            <Option name="moveClassificationStyle">Move Classification Style</Option>
            <Option name="pieceAnimations">Piece Animations</Option>
            <Option name="moveMethod">Move Method</Option>
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