const ToggleSwitch = ({ children }) => {
    return <div className="toggle">
        {children}
        <label class="switch">
        <input type="checkbox"/>
        <span class="slider round"></span>
        </label>
    </div>
}
 
export default ToggleSwitch;