import './BoardSettings.sass';
import Button from '../Button';
import Option from './Option';
import ToggleSwitch from './ToggleSwitch';

const BoardSettings = ({ reference }) => {
    return <dialog id="board-settings" ref={reference} className="modal">
        <div className="modal__inner">
            <Option options={['Neo', 'Game Room', 'Wood', 'Glass', 'Gothic', 'Classic', 'Metal', 'Bases', 'Neo-Wood', 'Icy', 'Sea', 'Club', 'Ocean', 'Newspaper', 'Blindfold', 'Space', 'Cases', 'Condal', '3D - ChessKid', '8-Bit', 'Marble', 'Book', 'Alpha', 'Bubblegum', 'Dash', 'Graffiti', 'Light', 'Lolz', 'Luca', 'Maya', 'Modern', 'Nature', 'Neon', 'Sky', 'Tigers', 'Tournament', 'Vintage', '3D - Wood', '3D - Staunton', '3D - Plastic', 'Real 3D' ]}>Pieces</Option>
            <Option options={['Green', 'Dark', 'Wood', 'Glass', 'Brown', 'Icy', 'Sea', 'Newspaper', 'Walnut', 'Sky', 'Lolz', 'Stone', 'Bases', '8-Bit', 'Marble', 'Purple', 'Translucent', 'Metal', 'Tournament', 'Dash', 'Burled', 'Wood', 'Blue', 'Bubblegum', 'Checkers', 'Graffiti', 'Light', 'Neon', 'Orange', 'Overlay', 'Parchment', 'Red', 'Sand', 'Tan']}>Board</Option>
            <Option options={['None', 'Default', 'Nature', 'Metal', 'Marble', 'Space', 'Beat', 'Silly', 'Lolz', 'Newspaper']}>Sound Theme</Option>
            <Option options={['None', 'Inside', 'Outside']}>Coordinates</Option>
            <Option options={['Text', 'Figurine']}>Piece Notation</Option>
            <Option options={['Default', 'Traditional']}>Move Classification Style</Option>
            <Option options={['None', 'Slow', 'Medium (Default)', 'Fast', 'Natural', 'Arcade']}>Piece Animations</Option>
            <Option options={['Drag or Click', 'Click Squares', 'Drag Pieces']}>Move Method</Option>
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