import { useAppContext }from '../contexts/Context';
import { changeTheme } from '../reducer/actions/theme';

const ThemeDropdown = () => {
  const { appState, dispatch } = useAppContext();

  const handleChange = e => dispatch(changeTheme(e.target.value))

  return <div>
    <label htmlFor="theme-select">Theme</label>
    <select id="theme-select" value={appState.theme} onChange={handleChange}>
      <option value="green">Green</option>
      <option value="brown">Brown</option>
      <option value="blue">Blue</option>
      <option value="pink">Pink</option>
    </select>
  </div>
};

export default ThemeDropdown;
