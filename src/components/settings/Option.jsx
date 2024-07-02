const Option = ({ children, options }) => {
    return <div className="option">
        <p>{children}</p>
        <select name="option" id={children}>
            {options.map((option) => <option>{option}</option>)}
        </select>
    </div>
}
 
export default Option;