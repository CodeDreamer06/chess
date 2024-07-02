const Button = ({ children, onClick, isPrimary }) => {
    return <button onClick={onClick} className={`button ${isPrimary ? 'button--primary' : ''}`}>{children}</button>;
}
 
export default Button;