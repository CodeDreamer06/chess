const ToggleSwitch = ({ children }) => {
    return <div className="toggle">
        {children}
        <label className="switch">
        <input type="checkbox"/>
        <span className="slider round"></span>
        </label>
    </div>
}
 
export default ToggleSwitch;