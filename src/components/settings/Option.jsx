import { useAppContext }from '../../contexts/Context'
import { changeSettings } from '../../reducer/actions/game';
import { BoardSettingOptions } from '../../data/constants';

const Option = ({ children, name }) => {
    const { appState, dispatch } = useAppContext();
    const { boardSettings } = appState;
    const options = BoardSettingOptions[name];

    return <div className="option">
        <p>{children}</p>
        <select
            name="option"
            defaultValue={options[boardSettings[name]]}
            id={children}
            onChange={({ target }) => dispatch(changeSettings(name, options.indexOf(target.value)))}>
            {options.map((option, i) => <option key={option + i}>{option}</option>)}
        </select>
    </div>
}
 
export default Option;