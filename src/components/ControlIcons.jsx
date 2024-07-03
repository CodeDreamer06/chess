import { useAppContext } from '../contexts/Context'
import { flipBoard } from '../reducer/actions/game';

const ControlIcons = ({ dialogRef }) => {
	const { dispatch } = useAppContext();

	return <div className="control-icons">
		<button className="gear-icon control-icon" onClick={e => dialogRef.current.showModal()}></button>
		<button className="flip-icon control-icon" id="show" onClick={e => dispatch(flipBoard())}></button>
		<button className="smiley-icon control-icon" id="show"></button>
	</div>
}

export default ControlIcons;